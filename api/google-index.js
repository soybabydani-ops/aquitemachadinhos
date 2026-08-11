// ============================================================
// AQUITEM — Google Indexing API Integration (Vercel Serverless)
// Submete URLs em tempo real para indexação rápida no Googlebot.
// Suporta Webhooks do Supabase e chamadas em lote.
// ============================================================

const crypto = require('crypto');

/**
 * Gera JWT para autenticação com Service Account do Google sem dependências pesadas
 */
function createGoogleJWT(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Claim = Buffer.from(JSON.stringify(claimSet)).toString('base64url');
  const unsignedToken = `${base64Header}.${base64Claim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const signature = signer.sign(privateKey, 'base64url');

  return `${unsignedToken}.${signature}`;
}

/**
 * Obtém OAuth2 Access Token do Google
 */
async function getAccessToken(clientEmail, privateKey) {
  const jwt = createGoogleJWT(clientEmail, privateKey);
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.error_description || data.error || 'Erro ao obter Google Access Token');
  }
  return data.access_token;
}

/**
 * Notifica a Google Indexing API
 */
async function notifyGoogle(url, action, token) {
  const resp = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url,
      type: action // 'URL_UPDATED' ou 'URL_DELETED'
    })
  });

  const result = await resp.json();
  return { status: resp.status, ok: resp.ok, result };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ready',
      endpoint: '/api/google-index',
      service: 'Google Indexing API & Programmatic SEO Dispatcher',
      quota_daily_limit: 200,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    let urlsToProcess = [];

    // Formato 1: Webhook do Supabase (INSERT/UPDATE/DELETE)
    if (body.table && body.record) {
      const table = body.table;
      const record = body.record;
      const oldRecord = body.old_record;
      const type = body.type; // 'INSERT', 'UPDATE', 'DELETE'

      let action = 'URL_UPDATED';
      if (type === 'DELETE' || (record && record.status === 'inativo')) {
        action = 'URL_DELETED';
      }

      let targetUrl = '';
      let entityType = 'listing';
      let entityId = record.id || (oldRecord && oldRecord.id) || '';

      if (table === 'listings') {
        targetUrl = `https://www.aquitemachadinhos.com.br/anuncio.html?id=${encodeURIComponent(entityId)}`;
        entityType = 'listing';
      } else if (table === 'stores') {
        targetUrl = `https://www.aquitemachadinhos.com.br/loja.html?id=${encodeURIComponent(entityId)}`;
        entityType = 'store';
      } else if (table === 'cities') {
        targetUrl = `https://www.aquitemachadinhos.com.br/${record.slug}-home.html`;
        entityType = 'city';
      }

      if (targetUrl) {
        urlsToProcess.push({ url: targetUrl, action, entityType, entityId });
      }
    } 
    // Formato 2: Lista direta de URLs { urls: [...], action: 'URL_UPDATED' }
    else if (Array.isArray(body.urls)) {
      const defaultAction = body.action || 'URL_UPDATED';
      urlsToProcess = body.urls.map(u => ({
        url: typeof u === 'string' ? u : u.url,
        action: (u && u.action) || defaultAction,
        entityType: (u && u.entityType) || 'custom',
        entityId: (u && u.entityId) || 'batch'
      }));
    } else if (body.url) {
      urlsToProcess.push({
        url: body.url,
        action: body.action || 'URL_UPDATED',
        entityType: body.entityType || 'custom',
        entityId: body.entityId || 'single'
      });
    }

    if (!urlsToProcess.length) {
      return res.status(400).json({ error: 'Nenhuma URL válida fornecida para indexação.' });
    }

    // Configuração Google Service Account
    let clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (process.env.GOOGLE_SERVICE_ACCOUNT) {
      try {
        const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
        clientEmail = sa.client_email;
        privateKey = sa.private_key;
      } catch (e) {}
    }

    // Normaliza private key (quebras de linha em variáveis de ambiente)
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    const results = [];
    let token = null;

    if (clientEmail && privateKey) {
      token = await getAccessToken(clientEmail, privateKey);
    }

    for (const item of urlsToProcess) {
      let dispatchResult = null;
      let statusLog = 'pending';
      let httpCode = 200;

      if (token) {
        try {
          const apiRes = await notifyGoogle(item.url, item.action, token);
          httpCode = apiRes.status;
          statusLog = apiRes.ok ? 'submitted' : 'error';
          dispatchResult = apiRes.result;
        } catch (err) {
          statusLog = 'error';
          dispatchResult = { error: err.message };
        }
      } else {
        dispatchResult = { simulated: true, message: 'Google Service Account credentials pending in env.' };
        statusLog = 'queued';
      }

      // Log no Supabase se houver Service Role
      const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
      const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

      if (SERVICE_KEY) {
        fetch(`${SUPABASE_URL}/rest/v1/seo_indexation_log`, {
          method: 'POST',
          headers: {
            apikey: SERVICE_KEY,
            Authorization: `Bearer ${SERVICE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({
            url: item.url,
            entity_type: item.entityType,
            entity_id: String(item.entityId),
            action: item.action,
            status: statusLog,
            http_status: httpCode,
            response_payload: dispatchResult,
            last_submitted_at: new Date().toISOString()
          })
        }).catch(() => {});
      }

      results.push({
        url: item.url,
        action: item.action,
        status: statusLog,
        http_status: httpCode,
        response: dispatchResult
      });
    }

    return res.status(200).json({
      success: true,
      processed_count: results.length,
      credentials_active: Boolean(token),
      results
    });

  } catch (err) {
    console.error('[Google Indexing API Handler Error]:', err);
    return res.status(500).json({ error: err.message });
  }
};
