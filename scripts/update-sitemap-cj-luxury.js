/**
 * AQUITEM ACHADINHOS — SINCRONIZADOR DE SITEMAP COM ROTAS DE ALTO LUXO CJ AFFILIATE
 */

const fs = require('fs');
const path = require('path');
const { generateAllCJLuxuryPages } = require('./gerador-cj-luxury-vip');

const REPO_ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(REPO_ROOT, 'sitemap.xml');

async function syncSitemapWithCJLuxury() {
  const luxuryUrls = await generateAllCJLuxuryPages();
  const today = '2026-08-12';

  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

  // Remove fechamento </urlset>
  sitemapContent = sitemapContent.replace('</urlset>', '').trim();

  let addedCount = 0;
  for (const url of luxuryUrls) {
    if (!sitemapContent.includes(`<loc>${url}</loc>`)) {
      sitemapContent += `\n  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>0.95</priority></url>`;
      addedCount++;
    }
  }

  sitemapContent += '\n</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
  console.log(`✓ Sitemap atualizado com ${addedCount} novas URLs de alto luxo CJ!`);

  // Validação do total de URLs
  const matches = sitemapContent.match(/<loc>/g);
  console.log(`📊 Total consolidado de URLs no sitemap.xml: ${matches ? matches.length : 0}`);
  return matches ? matches.length : 0;
}

if (require.main === module) {
  syncSitemapWithCJLuxury().catch(console.error);
}

module.exports = { syncSitemapWithCJLuxury };
