#!/usr/bin/env node
/**
 * generate-sitemap-hierarchical.js
 * Master sitemap_index.xml + monthly/niche sitemaps
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.aquitemachadinhos.com.br';
const CITIES = require('../cities-list.json').cities || [];

function generateHierarchicalSitemaps() {
  console.log('=== HIERARCHICAL SITEMAP INDEX ===');

  const publicDir = path.join(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  const now = new Date().toISOString();

  // Master index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Main sitemap
  const mainUrls = [
    `${BASE_URL}/`,
    `${BASE_URL}/cidades.html`,
    `${BASE_URL}/vagas.html`,
    `${BASE_URL}/classificados.html`
  ];

  const mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainUrls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod></url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainXml);

  indexXml += `  <sitemap><loc>${BASE_URL}/sitemap-main.xml</loc><lastmod>${now}</lastmod></sitemap>\n`;

  // City sitemaps (grouped)
  const cityGroups = {};
  CITIES.forEach(c => {
    if (!cityGroups[c.state]) cityGroups[c.state] = [];
    cityGroups[c.state].push(c);
  });

  Object.keys(cityGroups).forEach(state => {
    const cities = cityGroups[state];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cities.map(c => `  <url>
    <loc>${BASE_URL}/${c.slug}-home.html</loc>
    <lastmod>${now}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    const filename = `sitemap-${state.toLowerCase()}-2026.xml`;
    fs.writeFileSync(path.join(publicDir, filename), xml);
    indexXml += `  <sitemap><loc>${BASE_URL}/${filename}</loc><lastmod>${now}</lastmod></sitemap>\n`;
  });

  // EN + ES sitemaps
  ['en', 'es'].forEach(lang => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CITIES.slice(0, 8).map(c => `  <url><loc>${BASE_URL}/${lang}/${c.slug}</loc><lastmod>${now}</lastmod></url>`).join('\n')}
</urlset>`;
    const filename = `sitemap-${lang}-tech.xml`;
    fs.writeFileSync(path.join(publicDir, filename), xml);
    indexXml += `  <sitemap><loc>${BASE_URL}/${filename}</loc><lastmod>${now}</lastmod></sitemap>\n`;
  });

  indexXml += `</sitemapindex>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), indexXml);

  console.log('✅ Generated sitemap_index.xml + multiple niche sitemaps');
  console.log('   Total sitemaps created: ~15');
}

generateHierarchicalSitemaps();