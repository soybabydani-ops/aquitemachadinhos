const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.aquitemachadinhos.com.br';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

console.log('=== GENERATE SITEMAP (White Hat Dynamic) ===');

try {
  const cities = JSON.parse(fs.readFileSync('./cities-list.json', 'utf8')).cities;
  
  let urls = [];

  // Core pages
  urls.push({ loc: `${BASE_URL}/`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' });
  urls.push({ loc: `${BASE_URL}/cidades.html`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' });
  urls.push({ loc: `${BASE_URL}/classificados.html`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' });
  urls.push({ loc: `${BASE_URL}/vagas.html`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' });

  // All tenant city pages
  cities.forEach(city => {
    const lastmod = new Date().toISOString();
    urls.push({
      loc: `${BASE_URL}/${city.slug}-home.html`,
      lastmod,
      changefreq: 'daily',
      priority: '0.9'
    });
    urls.push({
      loc: `${BASE_URL}/${city.slug}/clima`,
      lastmod,
      changefreq: 'hourly',
      priority: '0.8'
    });
  });

  // Articles
  const articles = [
    'manual-eficiencia-energetica',
    'analise-tendencias-utilidades-domesticas',
    'guia-hardware-tecnologia'
  ];
  articles.forEach(slug => {
    urls.push({
      loc: `${BASE_URL}/artigos/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');

  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log(`   Saved to: ${OUTPUT_PATH}`);
  return { success: true, count: urls.length };
} catch (e) {
  console.error('Error generating sitemap:', e.message);
  process.exit(1);
}
