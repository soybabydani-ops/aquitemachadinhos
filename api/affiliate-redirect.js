// User-initiated, allowlisted affiliate redirects only. No open redirect and no cookie preload.
const { supabaseAdmin } = require('./_lib/supabase');

const PARTNERS = Object.freeze({
  shopee: {
    label: 'Shopee Brasil',
    url: 'https://s.shopee.com.br/30n7ohzzU6'
  },
  shein: {
    label: 'SHEIN Brasil',
    url: 'https://onelink.shein.com/47/5ylqchgphidl'
  },
  'mercado-livre': {
    label: 'Mercado Livre',
    url: 'https://meli.la/1U3rtgV'
  },
  amazon: {
    label: 'Amazon Brasil',
    url: 'https://link.amazon/B0hmLsxcH'
  },
  udemy: {
    label: 'Udemy via Impact',
    url: 'https://udemy.sjv.io/c/1101l435760/aquitem_cursos'
  }
});

function clean(value, max = 100) {
  return String(value || '').replace(/[^a-zA-Z0-9_./-]/g, '').slice(0, max);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'method_not_allowed' });
  }

  const partnerKey = clean(req.query && req.query.partner, 40).toLowerCase();
  const partner = PARTNERS[partnerKey];
  if (!partner) {
    return res.status(404).json({
      success: false,
      error: 'partner_not_configured',
      message: 'O parceiro solicitado ainda não possui URL de rastreamento aprovada no portal.'
    });
  }

  // The request itself is the intentional user click. Logging never blocks the redirect.
  const city = clean(req.query && req.query.city, 80) || 'nacional';
  const source = clean(req.query && req.query.source, 100) || 'growth-page';
  try {
    await supabaseAdmin.from('cliques_afiliados_logs').insert([{
      cidade_destino: city,
      cidade_local: city,
      tipo_transporte: 'web_affiliate',
      rota: source,
      plataforma_afiliado: partner.label,
      url_origem: String(req.headers.referer || 'https://www.aquitemachadinhos.com.br').slice(0, 500),
      user_agent: String(req.headers['user-agent'] || '').slice(0, 500),
      pais_origem: String(req.headers['x-vercel-ip-country'] || 'BR').slice(0, 2),
      comissao_estimada_usd_brl: 0,
      moeda: 'BRL'
    }]);
  } catch (_) {
    // Attribution telemetry is best-effort; the visitor's click remains functional.
  }

  return res.redirect(302, partner.url);
};

module.exports.PARTNERS = PARTNERS;
