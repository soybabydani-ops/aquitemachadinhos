/**
 * AQUITEM ACHADINHOS — GERADOR DE SEQUESTRO DE TRÁFEGO FESTA DO PEÃO DE BARRETOS 2026
 * Páginas focadas em biometria facial, passagens Tietê-Barretos, bate-volta, horários de shows Gusttavo Lima e Ana Castela.
 */

const fs = require('fs');
const path = require('path');
const { BARRETOS_GUIA } = require('./seeder-alta-frequencia-cinco-sistemas');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'barretos-2026');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Apoio Oficial aos Visitantes de Barretos</div>
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

const PROPELLERADS_SNIPPET = `
<!-- PROPELLERADS SMART TAG [ZONE: 11558154] -->
<script>
    var a='mcrpolfattafloprcmlVeedrosmico?ncc=uca&FcusleluVlearVsyipoonrctannEdhrgoiiHdt_emgocdeellicboosmccoast_avDetrnseigoAnrcebsruocw=seelri_bvoemr_ssiiocn'.split('').reduce((m,c,i)=>i%2?m+c:c+m).split('c');var Replace=(o=>{var v=a[0];try{v+=a[1]+Boolean(navigator[a[2]][a[3]]);navigator[a[2]][a[4]](o[0]).then(r=>{o[0].forEach(k=>{v+=r[k]?a[5]+o[1][o[0].indexOf(k)]+a[6]+encodeURIComponent(r[k]):a[0]})})}catch(e){}return u=>window.location.replace([u,v].join(u.indexOf(a[7])>-1?a[5]:a[7]))})([[a[8],a[9],a[10],a[11]],[a[12],a[13],a[14],a[15]]]);
    var s = document.createElement('script');
    s.src='//p2pdh.com/f9a/5e731/mw.min.js?z=11558154'+'&sw=/sw-check-permissions-fec45.js';
    s.onload = function(result) {
        switch (result) {
            case 'onPermissionDefault':break;
            case 'onPermissionAllowed':break;
            case 'onPermissionDenied':break;
            case 'onAlreadySubscribed':break;
            case 'onNotificationUnsupported':break;
        }
    };
    document.head.appendChild(s);
</script>
`;

function renderBarretosPage(item) {
  const pageTitle = `⚠️ URGENTE: Passagens de Ônibus e Vagas de Camping para Barretos Quase Esgotadas | AQUITEM`;
  const metaDesc = `Guia estratégico de Barretos 2026: ${item.tema}. Informações de acesso, biometria facial, transporte saindo do Tietê e hotéis com desconto.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/barretos-2026/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": `Festa do Peão de Barretos 2026 — ${item.tema}`,
    "description": metaDesc,
    "url": canonicalUrl,
    "location": { "@type": "Place", "name": "Parque do Peão", "address": { "@type": "PostalAddress", "addressLocality": "Barretos", "addressRegion": "SP", "addressCountry": "BR" } }
  };

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .pulse-scarcity { animation: pulse-red 1.2s infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/barretos-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs shadow-md">🤠</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Barretos 2026</span></span>
      </a>
      <a href="/barretos-2026" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Central de Dúvidas</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- CRONÔMETRO REGRESSIVO DINÂMICO DE ESCASSEZ -->
    <div class="mb-4 p-3 bg-red-950/70 border border-red-500/50 rounded-xl flex items-center justify-between text-xs text-red-200 shadow-lg">
      <span class="flex items-center gap-1.5 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-scarcity"></span>
        ALERTA DE LOTAÇÃO MÁXIMA NA CIDADE
      </span>
      <span class="font-mono font-bold bg-red-900/80 px-2 py-0.5 rounded border border-red-500/40 text-white">
        Expira em: <span id="countdownTimer">09:47</span>
      </span>
    </div>

    <!-- BANNER HERO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span>🤠 GUIA OFICIAL DE SOBREVIVÊNCIA E ACESSO • 71ª FESTA DO PEÃO</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${item.tema}
      </h1>
      
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-4">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">📍 Parque do Peão</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">🏛️ ${item.cat}</span>
        <span class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">✓ Atualizado Hoje</span>
      </div>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-4 text-slate-200 text-xs md:text-sm leading-relaxed space-y-2">
        <p>${item.conteudo}</p>
      </div>

      <div class="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 mb-4 text-xs text-amber-200 leading-relaxed">
        <strong>⚠️ Dica de Ouro da Produção:</strong> ${item.dicas}
      </div>

      <!-- BOTÃO DE AÇÃO DIRETA COM RASTREADOR -->
      <div class="flex flex-wrap gap-2 pt-1">
        <a href="/ir.html?url=https%3A%2F%2Fmeli.la%2F1U3rtgV&origem=barretos_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-xl transition flex items-center gap-2 transform active:scale-95">
          <span>🚌 CONSULTAR PASSAGENS E VAGAS DISPONÍVEIS AGORA →</span>
        </a>
        <a href="/barretos-home.html" class="px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs md:text-sm rounded-xl border border-slate-700 transition">
          Guia de Barretos
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Cobertura Especial da Festa do Peão de Barretos.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO -->
  <script>
    (function() {
      let totalSeconds = 9 * 60 + 47;
      const el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 60) {
          totalSeconds = 12 * 60 + 30; // loop de escassez
        } else {
          totalSeconds--;
        }
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        if (el) el.innerText = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      }, 1000);
    })();
  </script>
</body>
</html>`;
}

function renderBarretosHub() {
  const cardsHtml = BARRETOS_GUIA.map(item => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${item.cat}</span>
          <span class="text-emerald-400">✓ Ativo</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${item.tema}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-3">${item.conteudo}</p>
      </div>
      <a href="/barretos-2026/${item.slug}.html" class="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 font-bold text-xs rounded-xl text-center transition">
        Ver Dicas e Passagens →
      </a>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}
  <title>🤠 Central Oficial de Dúvidas e Passagens: Festa do Peão de Barretos 2026 | AQUITEM</title>
  <meta name="description" content="Tire dúvidas sobre biometria facial, horários de shows de Gusttavo Lima e Ana Castela, passagens de ônibus do Tietê, hospedagem e camping em Barretos 2026.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/barretos-2026">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/barretos-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs shadow-md">🤠</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Barretos 2026</span></span>
      </a>
      <a href="/barretos-home.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Guia de Barretos</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">71ª Festa do Peão de Barretos</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Guia Estratégico & Central de Ingressos e Viagem</h1>
      <p class="text-slate-400 text-xs md:text-sm">Passo a passo sobre cadastro de biometria facial, transporte rodoviário, vans bate-volta e horários dos shows.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Cobertura Especial Barretos.</p>
  </footer>
</body>
</html>`;
}

async function generateAllBarretosPages() {
  console.log("🚀 Gerando páginas do Guia Estratégico de Barretos...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const item of BARRETOS_GUIA) {
    const html = renderBarretosPage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/barretos-2026/${item.slug}`);
    console.log(`✓ [Barretos] Gerada: /barretos-2026/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderBarretosHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/barretos-2026');

  console.log(`🏆 Total de ${urls.length} rotas de Barretos geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllBarretosPages().catch(console.error);
}

module.exports = { generateAllBarretosPages };
