// ============================================================
// AQUITEM — Empresas & Lojas Serverless Function (/api/empresas)
// Vercel Serverless Nativo em Node.js com Cache Edge & HTTP 304 (GET)
// e Motor de Auto-Avaliação e Auto-Aprovação Inteligente (POST)
// ============================================================

const { supabase, supabaseAdmin, SUPABASE_URL } = require('./_lib/supabase');
const { getGeoData } = require('./_lib/geo-enrich');
const { evaluateStore } = require('./_lib/quality-evaluator');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, If-Modified-Since, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ============================================================
  // POST: Auto-Avaliação, Auto-Aprovação & Publicação Instantânea
  // ============================================================
  if (req.method === 'POST') {
    try {
      const input = req.body || {};
      const evaluation = evaluateStore(input);

      if (!evaluation.approved && evaluation.score === 0) {
        return res.status(400).json({
          success: false,
          auto_approved: false,
          error: evaluation.reason || 'Cadastro reprovado pelas diretrizes de conformidade.'
        });
      }

      const storeData = evaluation.data;

      // Inserção com permissão de serviço no Supabase
      const insertResult = await supabaseAdmin.from('stores').insert([storeData]);
      const createdStore = (insertResult.data && insertResult.data[0]) || storeData;
      const storeId = createdStore.id || `temp-${Date.now()}`;

      const liveUrl = `https://www.aquitemachadinhos.com.br/loja.html?id=${storeId}`;
      const cityGuideUrl = `https://www.aquitemachadinhos.com.br/guia.html?cidade=${storeData.city_slug}`;

      // Disparo em background para Google Indexing API
      const googleIndexingPayload = {
        urls: [
          { url: liveUrl, action: 'URL_UPDATED', entityType: 'store', entityId: storeId },
          { url: cityGuideUrl, action: 'URL_UPDATED', entityType: 'city_hub', entityId: storeData.city_slug }
        ]
      };

      // Dispara indexação assíncrona sem travar a resposta do usuário
      const internalIndexUrl = `https://${req.headers.host || 'www.aquitemachadinhos.com.br'}/api/google-index`;
      fetch(internalIndexUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleIndexingPayload)
      }).catch(() => {});

      return res.status(201).json({
        success: true,
        auto_approved: evaluation.approved,
        quality_score: evaluation.score,
        message: evaluation.message,
        live_url: liveUrl,
        city_guide_url: cityGuideUrl,
        whatsapp_lead_link: storeData.whatsapp_utm_link,
        store: createdStore
      });

    } catch (err) {
      console.error('[API Empresas POST Error]:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============================================================
  // GET: Consulta de Empresas com Cache Edge & HTTP 304
  // ============================================================
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60');

  const {
    cidade = '',
    categoria = '',
    busca = '',
    page = 1,
    limit = 24,
    plano = ''
  } = req.query || {};

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 24));
  const offset = (pageNum - 1) * limitNum;

  try {
    let query = supabase
      .from('stores')
      .select('*', { count: 'exact' })
      .eq('status', 'ativo')
      .eq('status_aprovacao', 'aprovado')
      .order('destaque', { ascending: false })
      .order('criado_em', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (cidade) query = query.eq('city_slug', cidade.toLowerCase().trim());
    if (categoria) query = query.eq('categoria', categoria.toLowerCase().trim());
    if (plano) query = query.eq('plano', plano.toLowerCase().trim());
    if (busca) query = query.ilike('nome', `%${busca.trim()}%`);

    const { data: stores, count, ok, error } = await query.execute();
    if (!ok) throw new Error(error || 'Erro ao consultar empresas');

    const items = stores || [];

    // Checagem HTTP 304 Condicional
    if (items.length > 0) {
      const latestUpdate = items.reduce((latest, item) => {
        const itemDate = new Date(item.atualizado_em || item.criado_em || 0).getTime();
        return itemDate > latest ? itemDate : latest;
      }, 0);

      if (latestUpdate > 0) {
        const lastModifiedDate = new Date(latestUpdate);
        res.setHeader('Last-Modified', lastModifiedDate.toUTCString());

        const ifModifiedSince = req.headers['if-modified-since'];
        if (ifModifiedSince) {
          const reqTime = new Date(ifModifiedSince).getTime();
          if (Math.floor(reqTime / 1000) >= Math.floor(latestUpdate / 1000)) {
            return res.status(304).end();
          }
        }
      }
    }

    const geoInfo = cidade ? getGeoData(cidade) : null;

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count !== null ? count : items.length,
        has_more: count !== null ? (offset + limitNum < count) : (items.length === limitNum)
      },
      filters: {
        cidade: cidade || 'todas',
        categoria: categoria || 'todas',
        plano: plano || 'todos'
      },
      geo: geoInfo,
      cached_at: new Date().toISOString()
    });

  } catch (err) {
    console.error('[API Empresas GET Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
