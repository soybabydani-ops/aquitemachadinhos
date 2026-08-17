// Dynamic sitemap for core, city and verified growth routes.
const { supabase } = require('./_lib/supabase');

const PRIORITY_HUBS = [
  'barretos','sao-paulo','gramado','campos','campinas','santos','ribeirao-preto','sao-jose-do-rio-preto',
  'bebedouro','olimpia','guaira','colombia','franca','sorocaba','piracicaba','rio-de-janeiro','buzios','paraty',
  'belo-horizonte','ouro-preto','uberlandia','juiz-de-fora','montes-claros','curitiba','londrina','maringa',
  'foz-do-iguacu','florianopolis','balneario-camboriu','blumenau','joinville','porto-alegre','caxias-do-sul',
  'salvador','porto','recife','caruaru','noronha','fortaleza','jericoacoara','natal','joao-pessoa','campina-grande',
  'maceio','aracaju','brasilia','goiania','anapolis','rio-verde','caldasnovas','pirenopolis','cuiaba',
  'chapada-guimaraes','campo-grande','bonito','manaus','belem','alter-do-chao','sao-luis','teresina','vitoria',
  'feira-de-santana','lencois','jalapao'
];

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
}
function urlNode(loc, lastmod, changefreq, priority) {
  return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=21600, stale-while-revalidate=3600');
  const baseUrl = 'https://www.aquitemachadinhos.com.br';
  const today = new Date().toISOString().slice(0, 10);
  const page = Math.max(1, Number(req.query && req.query.page) || 1);
  const uf = String((req.query && req.query.uf) || '').toUpperCase().slice(0, 2);

  try {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const core = [
      ['/', 'daily', '1.0'], ['/cidades', 'daily', '0.9'], ['/guias/', 'weekly', '0.9'],
      ['/vagas', 'daily', '0.8'], ['/classificados', 'daily', '0.8'], ['/marcas', 'weekly', '0.7'], ['/anuncie', 'monthly', '0.6']
    ];
    for (const [route, freq, priority] of core) xml += urlNode(`${baseUrl}${route}`, today, freq, priority);
    for (const slug of PRIORITY_HUBS) xml += urlNode(`${baseUrl}/${slug}-home`, today, 'weekly', '0.75');

    // Canonical URLs are stored only after editorial generation and hydration.
    const growthResult = await supabase.from('growth_city_pages').select('canonical_url,updated_at').eq('active', true).limit(1000).execute();
    for (const row of growthResult.data || []) {
      const mod = row.updated_at ? String(row.updated_at).slice(0, 10) : today;
      xml += urlNode(row.canonical_url, mod, 'weekly', '0.72');
    }

    // General municipal registry is paged to stay below sitemap limits.
    const from = (page - 1) * 1000;
    let cityQuery = supabase.from('cities').select('slug,criado_em').eq('ativo', true).range(from, from + 999);
    if (uf) cityQuery = cityQuery.eq('uf', uf);
    const cityResult = await cityQuery.execute();
    for (const city of cityResult.data || []) {
      if (!PRIORITY_HUBS.includes(city.slug)) {
        xml += urlNode(`${baseUrl}/guia.html?cidade=${encodeURIComponent(city.slug)}`, city.criado_em ? String(city.criado_em).slice(0, 10) : today, 'monthly', '0.50');
      }
    }

    xml += '</urlset>\n';
    res.setHeader('Last-Modified', new Date().toUTCString());
    return res.status(200).send(xml);
  } catch (error) {
    console.error('[sitemap]', error);
    return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
};
