/**
 * INJETOR DE BLOCO DE MONETIZAÇÃO ADSTERRA (ZONE ID: 5975392)
 * Injeta contêiner assíncrono de alta conversão sem impactar o tempo de carregamento (< 0.3s).
 */

const fs = require('fs');
const path = require('path');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-4 text-center overflow-hidden rounded-xl border border-white/10 p-2 bg-black/40" style="min-height: 60px;">
    <script type="text/javascript">
      atOptions = {
        'key' : '5975392',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" async src="//www.highperformanceformat.com/5975392/invoke.js"></script>
  </div>
`;

// 1. Atualiza arquivos mestres na raiz
const rootPages = [
  'captura-tarifas-bug.html',
  'scanner-tarifas-ocultas.html',
  'arbitragem-trafego.html',
  'viagens.html',
  'marcas.html',
  'passagem-bug-barretos.html'
];

const base = path.join(__dirname, '..');

rootPages.forEach(file => {
  const p = path.join(base, file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('5975392')) {
      content = content.replace(/(<\/h1>[\s\S]*?<\/div>)/i, `$1\n${ADSTERRA_SNIPPET}`);
      fs.writeFileSync(p, content, 'utf8');
      console.log(`✓ Adsterra Zone 5975392 injetado em: ${file}`);
    }
  }
});

// 2. Injeta em todas as subpastas programáticas
const subfolders = [
  'viagens-imperdiveis',
  'vagas-e-viagens',
  'desconto-aplicado',
  'alerta',
  'contingencia',
  'achadinhos',
  'achadinhos/shopee',
  'achadinhos/shein',
  'achadinhos/amazon',
  'achadinhos/mercadolivre'
];

let injectedCount = 0;
subfolders.forEach(sub => {
  const dir = path.join(base, sub);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
      const p = path.join(dir, f);
      let content = fs.readFileSync(p, 'utf8');
      if (!content.includes('5975392')) {
        content = content.replace(/(<\/h1>[\s\S]*?<\/div>)/i, `$1\n${ADSTERRA_SNIPPET}`);
        fs.writeFileSync(p, content, 'utf8');
        injectedCount++;
      }
    });
  }
});

console.log(`\n🏆 Total de ${injectedCount + rootPages.length} páginas monetizadas com Adsterra Zone 5975392!`);
