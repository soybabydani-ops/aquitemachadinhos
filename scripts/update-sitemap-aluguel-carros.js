/**
 * AQUITEM ACHADINHOS — SINCRONIZADOR DE SITEMAP COM ROTAS DE ALUGUEL DE CARROS DISCOVER CARS
 */

const fs = require('fs');
const path = require('path');
const { generateAllDiscoverCarsPages } = require('./gerador-discovercars-aluguel-veiculos');

const REPO_ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(REPO_ROOT, 'sitemap.xml');

async function syncSitemapWithCarRentals() {
  const rentalUrls = await generateAllDiscoverCarsPages();
  const today = '2026-08-12';

  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

  // Remove fechamento </urlset>
  sitemapContent = sitemapContent.replace('</urlset>', '').trim();

  let addedCount = 0;
  for (const url of rentalUrls) {
    if (!sitemapContent.includes(`<loc>${url}</loc>`)) {
      sitemapContent += `\n  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>0.95</priority></url>`;
      addedCount++;
    }
  }

  sitemapContent += '\n</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
  console.log(`✓ Sitemap atualizado com ${addedCount} novas URLs de aluguel de carros!`);

  // Validação do total de URLs
  const matches = sitemapContent.match(/<loc>/g);
  console.log(`📊 Total consolidado de URLs no sitemap.xml: ${matches ? matches.length : 0}`);
  return matches ? matches.length : 0;
}

if (require.main === module) {
  syncSitemapWithCarRentals().catch(console.error);
}

module.exports = { syncSitemapWithCarRentals };
