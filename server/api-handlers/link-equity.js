// ============================================================
// AQUITEM — Internal PageRank Link Equity Pump (Vercel Serverless)
// Seleciona e rotaciona dinamicamente páginas com menor tráfego
// para injetar autoridade e acelerar a indexação no Googlebot.
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || SUPABASE_ANON;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120, stale-while-revalidate=86400');
  if (!SUPABASE_URL || !SUPABASE_ANON || !SERVICE_KEY) {
    return res.status(503).json({ error: 'Supabase is not configured' });
  }

  const limit = parseInt(req.query.limit || '30', 10);

  try {
    // Chama a RPC de PageRank interno no PostgreSQL
    const rpcResp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_link_equity_queue`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ limit_count: limit })
    });

    let items = [];
    if (rpcResp.ok) {
      items = await rpcResp.json();
    }

    // Se o banco ainda não tiver computado a fila, busca as últimas vagas ativas
    if (!items || !items.length) {
      const fallbackResp = await fetch(`${SUPABASE_URL}/rest/v1/listings?select=id,titulo,cidade,city_slug&status=eq.ativo&order=criado_em.desc&limit=${limit}`, {
        headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` }
      });
      if (fallbackResp.ok) {
        const raw = await fallbackResp.json();
        items = raw.map(l => ({
          entity_type: 'listing',
          entity_id: l.id,
          title: l.titulo,
          url: `https://www.aquitemachadinhos.com.br/anuncio.html?id=${l.id}`,
          city_slug: l.city_slug || 'nacional',
          city_name: l.cidade || 'Brasil',
          views_count: 0
        }));
      }
    }

    return res.status(200).json({
      success: true,
      strategy: 'Internal PageRank Equity Pump',
      total_links: items.length,
      links: items
    });

  } catch (err) {
    console.error('[Link Equity Pump Error]:', err);
    return res.status(500).json({ error: err.message });
  }
};
