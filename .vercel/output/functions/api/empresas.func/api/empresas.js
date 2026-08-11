// ============================================================
// AQUITEM — Empresas & Lojas Serverless Function (/api/empresas)
// Vercel Serverless Nativo em Node.js com Cache Edge & HTTP 304
// ============================================================

const { supabase } = require('./_lib/supabase');
const { getGeoData } = require('./_lib/geo-enrich');

module.exports = async function handler(req, res) {
  // 1. Injeção de Cache Edge de Alta Performance (Vercel CDN)
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, If-Modified-Since');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    // 2. Consulta de Lojas Ativas e Aprovadas no Supabase
    let query = supabase
      .from('stores')
      .select('*', { count: 'exact' })
      .eq('status', 'ativo')
      .eq('status_aprovacao', 'aprovado')
      .order('destaque', { ascending: false })
      .order('criado_em', { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (cidade) {
      query = query.eq('city_slug', cidade.toLowerCase().trim());
    }

    if (categoria) {
      query = query.eq('categoria', categoria.toLowerCase().trim());
    }

    if (plano) {
      query = query.eq('plano', plano.toLowerCase().trim());
    }

    if (busca) {
      query = query.ilike('nome', `%${busca.trim()}%`);
    }

    const { data: stores, count, ok, error } = await query.execute();

    if (!ok) {
      throw new Error(error || 'Erro ao consultar empresas');
    }

    const items = stores || [];

    // 3. Checagem HTTP 304 Condicional
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

    // 4. Dados Geográficos do Município
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
    console.error('[API Empresas Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
