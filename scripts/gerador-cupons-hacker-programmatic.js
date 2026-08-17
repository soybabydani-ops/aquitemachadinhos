/**
 * AQUITEM ACHADINHOS — PAINEL HACKER DE CUPONS & BUGS RELÂMPAGO (ESTILO MILITAR / TERMINAL)
 */

const fs = require('fs');
const path = require('path');
const { BUGS_DATA } = require('./seeder-alta-frequencia-cinco-sistemas');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'cupons-ativos');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade Verificada de Apoio ao Consumidor</div>
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

function renderBugPage(bug) {
  const pageTitle = `🚨 BUG DETECTADO: ${bug.nome} com desconto extremo aplicado - Resgatar Cupom | AQUITEM`;
  const metaDesc = `Falha de sistema ou cupom relâmpago detectado na ${bug.loja}: ${bug.nome} saindo de ${bug.normal} por apenas ${bug.bug} (${bug.desconto}% OFF). Resgate antes que corrijam.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/cupons-ativos/${bug.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": bug.nome,
    "description": metaDesc,
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": bug.bug.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'),
      "availability": "https://schema.org/InStock",
      "url": bug.link
    }
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
  
  <!-- OneSignal Web Push SDK -->
  <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
  <script>
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: "1760660e-db11-41d8-bdf9-2b2b24c943b7",
        safari_web_id: "web.onesignal.auto.104278fd-27bf-469b-8be2-fe9f061fe041",
        notifyButton: { enable: false }
      });
    });
  </script>

  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060911; color: #E2E8F0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .scan-line { background: linear-gradient(180deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.15) 50%, rgba(16, 185, 129, 0) 100%); animation: scan 3s linear infinite; }
    @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
    .pulse-radar { animation: radar 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes radar { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
    .glass-terminal { background: rgba(10, 15, 29, 0.9); border: 1px solid rgba(16, 185, 129, 0.25); box-shadow: 0 0 30px rgba(16, 185, 129, 0.1); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">

  <!-- HEADER TERMINAL -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/ofertas.html" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-radar"></span>
        <span>RADAR_BUGS_v2.0 [LIVE]</span>
      </a>
      <a href="/cupons-ativos" class="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
        [VER_TODOS_BUGS]
      </a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- PAINEL MILITAR DE ALERTA DE PREÇO -->
    <div class="mb-6 rounded-2xl glass-terminal p-5 md:p-8 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3 text-emerald-400">
        <span class="font-bold flex items-center gap-1.5">
          <span class="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          STATUS: ANOMALIA_DE_PRECO_ATIVA
        </span>
        <span class="text-slate-400">LOJA: ${bug.loja.toUpperCase()}</span>
      </div>

      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-4 tracking-tight">
        ${bug.nome}
      </h1>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-black/60 rounded-xl border border-emerald-500/20 mb-6">
        <div>
          <span class="text-[11px] text-slate-400 block uppercase">Preço de Tabela</span>
          <span class="text-slate-400 line-through text-sm font-semibold">${bug.normal}</span>
        </div>
        <div>
          <span class="text-[11px] text-emerald-400 block uppercase font-bold">Preço com Bug / Cupom</span>
          <span class="text-emerald-400 text-xl md:text-2xl font-black">${bug.bug}</span>
        </div>
        <div>
          <span class="text-[11px] text-amber-400 block uppercase font-bold">Desconto Real</span>
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-sm">-${bug.desconto}% OFF</span>
        </div>
      </div>

      <!-- BOTÃO DE RESGATE DIRETO -->
      <div class="space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(bug.link)}&origem=bug_${bug.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm md:text-base rounded-xl text-center shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>⚡ APROVEITAR ERRO DE PREÇO NA LOJA OFICIAL →</span>
        </a>
        <p class="text-[11px] text-center text-slate-400">
          ⚠️ Preço sujeito a encerramento imediato pelo departamento de pricing da loja.
        </p>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- INSTRUÇÕES HACKER PARA APLICAR CUPOM -->
    <div class="my-6 rounded-2xl bg-slate-900/40 border border-slate-800 p-5 text-xs text-slate-300 space-y-2">
      <h3 class="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 mb-2">⚙️ Instruções de Aplicação Rápida</h3>
      <p>1. Clique no botão acima para abrir a página oficial da ${bug.loja}.</p>
      <p>2. Adicione o produto ao carrinho antes que o estoque com tarifa bugada se esgote.</p>
      <p>3. O desconto máximo é aplicado automaticamente no checkout ou mediante cupom da loja.</p>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Radar Hacker de Promoções e Descontos.</p>
  </footer>
</body>
</html>`;
}

function renderBugsHub() {
  const cardsHtml = BUGS_DATA.map(b => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">-${b.desconto}% OFF</span>
          <span class="text-slate-400">${b.loja}</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${b.nome}</h3>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-lg font-black text-emerald-400">${b.bug}</span>
          <span class="text-xs text-slate-500 line-through">${b.normal}</span>
        </div>
      </div>
      <a href="/cupons-ativos/${b.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs rounded-xl text-center transition">
        Resgatar Cupom Ativo →
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
  <title>🚨 Painel Hacker de Cupons e Bugs de Preço Relâmpago | AQUITEM</title>
  <meta name="description" content="Acesse descontos extremos de até 80% em Shopee, Mercado Livre, Amazon e SHEIN detectados pelo radar autônomo do Aqui Tem Achadinhos.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/cupons-ativos">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060911; color: #E2E8F0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/ofertas.html" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span>⚡ AQUITEM | PAINEL DE BUGS & CUPONS</span>
      </a>
      <a href="/ofertas.html" class="text-xs px-3 py-1.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">Achadinhos do Dia</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Arbitragem de Varejo em Tempo Real</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Painel Hacker de Cupons & Bugs Relâmpago</h1>
      <p class="text-slate-400 text-xs md:text-sm">Preços com falha de cálculo e cupons de queima de estoque identificados nas últimas horas.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Arbitragem de Ofertas.</p>
  </footer>
</body>
</html>`;
}

async function generateAllBugsPages() {
  console.log("🚀 Gerando páginas de Painel Hacker de Cupons...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const b of BUGS_DATA) {
    const html = renderBugPage(b);
    const outPath = path.join(OUTPUT_DIR, `${b.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/cupons-ativos/${b.slug}`);
    console.log(`✓ [Bugs] Gerada: /cupons-ativos/${b.slug}.html`);
  }

  // Hub index
  const hubHtml = renderBugsHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/cupons-ativos');

  console.log(`🏆 Total de ${urls.length} rotas de cupons geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllBugsPages().catch(console.error);
}

module.exports = { generateAllBugsPages };
