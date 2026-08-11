/**
 * AQUI TEM ACHADINHOS - API DE RASTREAMENTO & REDIRECIONAMENTO DE AFILIADOS (v28.0)
 * Registra cliques no Supabase e redireciona para a url_rastreamento oficial.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const destino = req.query.destino || req.query.cidade || 'Barretos';
  const tipo = req.query.tipo || 'Rodoviário';
  const rota = req.query.rota || `${req.query.origem || 'SP'}-${destino}`;
  const redirectMode = req.query.redirect === 'true' || req.query.r === '1';

  try {
    // 1. Busca link correspondente na tabela links_afiliados
    const searchUrl = `${SUPABASE_URL}/rest/v1/links_afiliados?cidade_destino=ilike.${encodeURIComponent(destino)}&tipo_transporte=ilike.${encodeURIComponent(tipo)}&select=*&limit=1`;
    const getRes = await fetch(searchUrl, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    let targetUrl = `https://wa.me/5517991238899?text=${encodeURIComponent(`Olá! Quero emitir minha passagem com desconto para ${destino} via Aqui Tem Achadinhos.`)}`;
    let linkId = null;

    if (getRes.ok) {
      const rows = await getRes.json();
      if (rows && rows.length > 0) {
        targetUrl = rows[0].url_rastreamento;
        linkId = rows[0].id;

        // 2. Incrementa contador de cliques
        fetch(`${SUPABASE_URL}/rest/v1/links_afiliados?id=eq.${linkId}`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            cliques_total: (rows[0].cliques_total || 0) + 1,
            atualizado_em: new Date().toISOString()
          })
        }).catch(() => {});
      }
    }

    // 3. Registra log individual em cliques_afiliados_logs
    fetch(`${SUPABASE_URL}/rest/v1/cliques_afiliados_logs`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        link_afiliado_id: linkId,
        cidade_destino: destino,
        tipo_transporte: tipo,
        rota: rota,
        ip_origem: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'direct',
        user_agent: req.headers['user-agent'] || 'browser',
        criado_em: new Date().toISOString()
      })
    }).catch(() => {});

    // 4. Responde com Redirecionamento 302 ou JSON
    if (redirectMode) {
      return res.redirect(302, targetUrl);
    }

    return res.status(200).json({
      success: true,
      cidade_destino: destino,
      tipo_transporte: tipo,
      rota: rota,
      url_rastreamento: targetUrl,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[TrackAffiliate API Error]:', error);
    const fallbackUrl = `https://wa.me/5517991238899?text=${encodeURIComponent(`Olá! Quero minha passagem promocional para ${destino}.`)}`;
    if (redirectMode) return res.redirect(302, fallbackUrl);
    return res.status(200).json({ success: true, url_rastreamento: fallbackUrl });
  }
};
