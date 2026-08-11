// ============================================================
// AQUITEM — Dynamic XML Sitemap Generator (/api/sitemap)
// Vercel Serverless Nativo em Node.js com Cache Edge & HTTP 304
// Suporta 5.581 cidades, rotas principais e sitemap index.
// ============================================================

const { supabase } = require('./_lib/supabase');

const PRIORITY_HUBS = [
  'barretos', 'olimpia', 'ribeirao-preto', 'bebedouro', 'colombia', 'guaira',
  'sao-paulo', 'campinas', 'santos', 'sao-jose-do-rio-preto', 'franca', 'sorocaba',
  'piracicaba', 'rio-de-janeiro', 'buzios', 'paraty', 'belo-horizonte', 'uberlandia',
  'juiz-de-fora', 'montes-claros', 'curitiba', 'londrina', 'maringa', 'foz-do-iguacu',
  'florianopolis', 'joinville', 'blumenau', 'balneario-camboriu', 'porto-alegre',
  'caxias-do-sul', 'gramado', 'brasilia', 'goiania', 'anapolis', 'rio-verde',
  'caldas-novas', 'pirenopolis', 'cuiaba', 'campo-grande', 'bonito', 'salvador',
  'feira-de-santana', 'porto-seguro', 'recife', 'caruaru', 'fortaleza', 'jericoacoara',
  'natal', 'joao-pessoa', 'maceio', 'aracaju', 'teresina', 'sao-luis', 'belem',
  'alter-do-chao', 'manaus', 'palmas', 'jalapao'
];

module.exports = async function handler(req, res) {
  // 1. Injeção de Headers XML e Cache Edge
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=3600');

  const { uf, page = 1 } = req.query || {};
  const baseUrl = 'https://www.aquitemachadinhos.com.br';
  const todayStr = new Date().toISOString().split('T')[0];

  // 2. Checagem HTTP 304 Condicional
  const ifModifiedSince = req.headers['if-modified-since'];
  if (ifModifiedSince) {
    const reqDate = new Date(ifModifiedSince).toISOString().split('T')[0];
    if (reqDate === todayStr) {
      return res.status(304).end();
    }
  }

  res.setHeader('Last-Modified', new Date().toUTCString());

  try {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Páginas Principais Nacionais
    const coreRoutes = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/cidades', priority: '0.9', changefreq: 'daily' },
      { loc: '/vagas', priority: '0.9', changefreq: 'hourly' },
      { loc: '/classificados', priority: '0.8', changefreq: 'hourly' },
      { loc: '/marcas', priority: '0.8', changefreq: 'weekly' },
      { loc: '/anuncie', priority: '0.7', changefreq: 'monthly' }
    ];

    for (const route of coreRoutes) {
      xml += `  <url>\n    <loc>${baseUrl}${route.loc}</loc>\n    <lastmod>${todayStr}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
    }

    // Hubs Prioritários com Landing Pages Dedicadas
    for (const hub of PRIORITY_HUBS) {
      xml += `  <url>\n    <loc>${baseUrl}/${hub}-home</loc>\n    <lastmod>${todayStr}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
      xml += `  <url>\n    <loc>${baseUrl}/vagas?cidade=${hub}</loc>\n    <lastmod>${todayStr}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
    }

    // Consulta de Cidades no Supabase para URLs dinâmicas
    let query = supabase.from('cities').select('slug,uf,atualizado_em').limit(1000);
    if (uf) {
      query = query.eq('uf', uf.toUpperCase());
    }

    const { data: cities } = await query.execute();

    if (cities && cities.length > 0) {
      for (const city of cities) {
        if (!PRIORITY_HUBS.includes(city.slug)) {
          const modDate = city.atualizado_em ? city.atualizado_em.split('T')[0] : todayStr;
          xml += `  <url>\n    <loc>${baseUrl}/guia.html?cidade=${city.slug}</loc>\n    <lastmod>${modDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.70</priority>\n  </url>\n`;
        }
      }
    }

    xml += '</urlset>';

    return res.status(200).send(xml);
  } catch (err) {
    console.error('[API Sitemap Error]:', err);
    return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
};
