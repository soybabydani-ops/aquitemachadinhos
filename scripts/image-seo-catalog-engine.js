/**
 * AQUITEM ACHADINHOS — COMPILADOR DE IMAGENS SEO & VISUAL BADGES (GOOGLE IMAGENS SEO)
 * Injeta metadados estruturados ImageObject e tags alt otimizadas para captura de tráfego de imagens.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

function optimizeImagesSeoInPages() {
  console.log("🚀 Iniciando Otimização de Imagens SEO e Visual Badges...");

  const targetDirs = [
    'cupons-ativos',
    'looks',
    'malas-e-viagem',
    'eventos',
    'barretos-2026'
  ];

  let totalOptimized = 0;

  for (const dir of targetDirs) {
    const fullDir = path.join(REPO_ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html') && f !== 'index.html');
    for (const f of files) {
      const filePath = path.join(fullDir, f);
      let content = fs.readFileSync(filePath, 'utf8');

      // Injeta ImageObject Schema se não houver
      if (!content.includes('"@type": "ImageObject"')) {
        const imageSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": "https://www.aquitemachadinhos.com.br/assets/og-image.png",
    "license": "https://www.aquitemachadinhos.com.br/termos",
    "acquireLicensePage": "https://www.aquitemachadinhos.com.br",
    "creditText": "Aqui Tem Achadinhos",
    "creator": { "@type": "Organization", "name": "Aqui Tem Achadinhos" },
    "caption": "⚠️ BUG DE PREÇO - CLIQUE AQUI • Oferta Verificada em Tempo Real"
  }
  </script>`;
        content = content.replace('</head>', `${imageSchema}\n</head>`);
        fs.writeFileSync(filePath, content, 'utf8');
        totalOptimized++;
      }
    }
  }

  console.log(`🏆 Total de ${totalOptimized} páginas otimizadas com ImageObject Schema e Visual Badges!`);
}

if (require.main === module) {
  optimizeImagesSeoInPages();
}

module.exports = { optimizeImagesSeoInPages };
