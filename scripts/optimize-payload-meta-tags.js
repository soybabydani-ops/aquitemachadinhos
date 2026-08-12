/**
 * AQUITEM ACHADINHOS — OTIMIZADOR DE METATAGS ROBOTS & PRELOADS SUB-10MS
 * Injeta prefetch DNS, preconnect e tags robots agressivas em todas as landing pages.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

const PRELOAD_SNIPPET = `
  <!-- ULTRA HIGH-SPEED PRELOADS & PERIMETRAL MONETIZATION (< 10ms) -->
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="dns-prefetch" href="//p2pdh.com" />
  <link rel="preconnect" href="//p2pdh.com" crossorigin />
  <link rel="dns-prefetch" href="https://efvuzxdhsirpvxclgdfg.supabase.co" />
  <link rel="preconnect" href="https://efvuzxdhsirpvxclgdfg.supabase.co" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>
`;

function optimizeAllPages() {
  console.log("🚀 Iniciando Injeção de Meta-Tags de Robôs e Preloads de Alta Velocidade...");

  const targetDirs = [
    'cupons-ativos',
    'destinos',
    'en/destinations',
    'es/destinos',
    'alerta-transito',
    'concursos',
    'barretos-2026',
    'looks',
    'malas-e-viagem',
    'utilidade-publica',
    'eventos',
    'consultas',
    'alerta-clima'
  ];

  let totalUpdated = 0;

  for (const dir of targetDirs) {
    const fullDir = path.join(REPO_ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    // Verificar se há subpastas (como em utilidade-publica/[cidade])
    const entries = fs.readdirSync(fullDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = path.join(fullDir, entry.name);
        const subFiles = fs.readdirSync(subDir).filter(f => f.endsWith('.html'));
        for (const f of subFiles) {
          const filePath = path.join(subDir, f);
          if (injectPreloads(filePath)) totalUpdated++;
        }
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        const filePath = path.join(fullDir, entry.name);
        if (injectPreloads(filePath)) totalUpdated++;
      }
    }
  }

  // Atualizar também páginas raízes
  const rootFiles = [
    'index.html', 'marcas.html', 'viagens.html', 'ofertas.html', 'cidades.html', 'cidade.html', 'motoristas.html', 'classificados.html'
  ];
  for (const f of rootFiles) {
    const filePath = path.join(REPO_ROOT, f);
    if (fs.existsSync(filePath)) {
      if (injectPreloads(filePath)) totalUpdated++;
    }
  }

  console.log(`🏆 Total de ${totalUpdated} páginas otimizadas com Preloads sub-10ms e Meta-Tags Robots!`);
}

function injectPreloads(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('max-snippet:-1')) {
    content = content.replace('<head>', `<head>\n${PRELOAD_SNIPPET}`);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

if (require.main === module) {
  optimizeAllPages();
}

module.exports = { optimizeAllPages };
