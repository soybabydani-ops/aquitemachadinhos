// ============================================================
// AQUITEM — Vagas & Classificados Serverless Function (/api/vagas)
// Vercel Serverless Nativo em Node.js com Cache Edge & HTTP 304 (GET)
// e Motor de Auto-Avaliação e Auto-Aprovação Inteligente (POST)
// ============================================================

const { supabase, supabaseAdmin, SUPABASE_URL } = require('./_lib/supabase');
const { getGeoData } = require('./_lib/geo-enrich');
const { evaluateListing } = require('./_lib/quality-evaluator');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, If-Modified-Since, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ============================================================
  // POST: Auto-Avaliação, Auto-Aprovação & Publicação de Vaga
  // ============================================================
  if (req.method === 'POST') {
    try {
      const input = req.body || {};
      const evaluation = evaluateListing(input);

      if (!evaluation.approved && evaluation.score === 0) {
        return res.status(400).json({
          success: false,
          auto_approved: false,
          error: evaluation.reason || 'Vaga reprovada pelas diretrizes de conformidade.'
        });
      }

      const listingData = evaluation.data;

      // Inserção com permissão de serviço no Supabase
      const insertResult = await supabaseAdmin.from('listings').insert([listingData]);
      const createdListing = (insertResult.data && insertResult.data[0]) || listingData;
      const listingId = createdListing.id || `job-${Date.now()}`;

      const liveUrl = `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listingId}`;
      const cityVagasUrl = `https://www.aquitemachadinhos.com.br/vagas?cidade=${listingData.city_slug}`;

      // Disparo para Google Indexing API
      const googleIndexingPayload = {
        urls: [
          { url: liveUrl, action: 'URL_UPDATED', entityType: 'listing', entityId: listingId },
          { url: cityVagasUrl, action: 'URL_UPDATED', entityType: 'city_vagas', entityId: listingData.city_slug }
        ]
      };

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
        city_vagas_url: cityVagasUrl,
        listing: createdListing
      });

    } catch (err) {
      console.error('[API Vagas POST Error]:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============================================================
  // GET: Consulta de Vagas com Cache Edge & HTTP 304
  // ============================================================
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60');

  const {
    cidade = '',
    categoria = '',
    subcategoria = '',
    busca = '',
    page = 1,
    limit = 20,
    destaque_only = 'false'
  } = req.query || {};

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (pageNum - 1) * limitNum;

  try {
    let query = supabase
      .from('listings')
      .select('*', { count: 'exact' })
      .eq('status', 'ativo')
      .order('destaque', { ascending: false })
      .order('criado_em', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (cidade) query = query.eq('city_slug', cidade.toLowerCase().trim());
    if (categoria) query = query.eq('categoria', categoria.toLowerCase().trim());
    if (subcategoria) query = query.eq('subcategoria', subcategoria.toLowerCase().trim());
    if (busca) query = query.ilike('titulo', `%${busca.trim()}%`);
    if (destaque_only === 'true') query = query.eq('destaque', true);

    const { data: listings, count, ok, error } = await query.execute();
    if (!ok) throw new Error(error || 'Erro ao consultar vagas');

    const items = listings || [];

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
        subcategoria: subcategoria || 'todas'
      },
      geo: geoInfo,
      cached_at: new Date().toISOString()
    });

  } catch (err) {
    console.error('[API Vagas GET Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
