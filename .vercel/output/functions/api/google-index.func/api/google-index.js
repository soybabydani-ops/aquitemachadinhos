// ============================================================
// AQUITEM — Google Indexing API Integration (Vercel Serverless)
// Submete URLs em tempo real para indexação rápida no Googlebot.
// Suporta Webhooks automáticos do Supabase e chamadas em lote.
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
 * Dispara requisição para Google Indexing API (URL_UPDATED / URL_DELETED)
 */
async function notifyGoogle(url, action, token) {
  const resp = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      url,
      type: action // 'URL_UPDATED' ou 'URL_DELETED'
    })
  });

  const data = await resp.json().catch(() => ({}));
  return { ok: resp.ok, status: resp.status, result: data };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ready',
      endpoint: '/api/google-index',
      description: 'Google Indexing API Serverless Dispatcher for Programmatic SEO'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const itemsToProcess = [];

    // 1. Tratamento de Webhooks Nativos do Supabase
    if (body.table && body.record) {
      const { table, record, old_record, type } = body;
      const baseUrl = 'https://www.aquitemachadinhos.com.br';

      if (table === 'listings') {
        const itemUrl = `${baseUrl}/anuncio.html?id=${record.id}`;
        const isDeleteOrInactive = type === 'DELETE' || record.status === 'inativo';
        itemsToProcess.push({
          url: itemUrl,
          action: isDeleteOrInactive ? 'URL_DELETED' : 'URL_UPDATED',
          entityType: 'listing',
          entityId: record.id
        });

        // Indexa também a página da cidade se houver
        if (record.city_slug) {
          itemsToProcess.push({
            url: `${baseUrl}/vagas?cidade=${record.city_slug}`,
            action: 'URL_UPDATED',
            entityType: 'city_hub',
            entityId: record.city_slug
          });
        }
      } else if (table === 'stores') {
        const itemUrl = `${baseUrl}/loja.html?id=${record.id}`;
        const isDeleteOrInactive = type === 'DELETE' || record.status === 'inativo' || record.status_aprovacao === 'rejeitado';
        itemsToProcess.push({
          url: itemUrl,
          action: isDeleteOrInactive ? 'URL_DELETED' : 'URL_UPDATED',
          entityType: 'store',
          entityId: record.id
        });
      }
    }
    // 2. Tratamento de chamadas diretas ou em lote (Batch)
    else if (Array.isArray(body.urls)) {
      for (const item of body.urls) {
        itemsToProcess.push({
          url: typeof item === 'string' ? item : item.url,
          action: (item.action || 'URL_UPDATED').toUpperCase(),
          entityType: item.entityType || 'custom',
          entityId: item.entityId || null
        });
      }
    } else if (body.url) {
      itemsToProcess.push({
        url: body.url,
        action: (body.action || 'URL_UPDATED').toUpperCase(),
        entityType: body.entityType || 'single',
        entityId: body.entityId || null
      });
    }

    if (itemsToProcess.length === 0) {
      return res.status(400).json({ error: 'Nenhuma URL válida informada para indexação.' });
    }

    // 3. Autenticação com Service Account do Google
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    let token = null;
    if (clientEmail && privateKey) {
      try {
        token = await getAccessToken(clientEmail, privateKey);
      } catch (authErr) {
        console.warn('[Google Indexing Auth Warning]:', authErr.message);
      }
    }

    // 4. Disparo assíncrono em lote (Limitado a 50 por request para segurança)
    const results = [];
    const maxBatch = itemsToProcess.slice(0, 50);

    for (const item of maxBatch) {
      let dispatchResult = null;
      let httpCode = 200;
      let statusLog = 'simulated';

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
            entity_id: String(item.entityId || ''),
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
