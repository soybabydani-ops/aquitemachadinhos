/**
 * AQUITEM ACHADINHOS — SINCRONIZADOR DE SITEMAP COM ROTAS DE CURSOS UDEMY
 */

const fs = require('fs');
const path = require('path');
const { generateAllEducationalPages } = require('./gerador-udemy-impact-cursos');

const REPO_ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(REPO_ROOT, 'sitemap.xml');

async function syncSitemapWithCursos() {
  const cursosUrls = await generateAllEducationalPages();
  const today = '2026-08-12';

  let sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

  // Remove o fechamento </urlset>
  sitemapContent = sitemapContent.replace('</urlset>', '').trim();

  let addedCount = 0;
  for (const url of cursosUrls) {
    if (!sitemapContent.includes(`<loc>${url}</loc>`)) {
      sitemapContent += `\n  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>0.95</priority></url>`;
      addedCount++;
    }
  }

  sitemapContent += '\n</urlset>\n';

  fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
  console.log(`✓ Sitemap atualizado com ${addedCount} novas URLs de cursos!`);

  // Validação do total de URLs
  const matches = sitemapContent.match(/<loc>/g);
  console.log(`📊 Total consolidado de URLs no sitemap.xml: ${matches ? matches.length : 0}`);
  return matches ? matches.length : 0;
}

if (require.main === module) {
  syncSitemapWithCursos().catch(console.error);
}

module.exports = { syncSitemapWithCursos };
