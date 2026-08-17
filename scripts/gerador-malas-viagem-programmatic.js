/**
 * AQUITEM ACHADINHOS — GERADOR DE ACHADINHOS DE MALAS E EQUIPAMENTOS DE VIAGEM
 */

const fs = require('fs');
const path = require('path');
const { TRAVEL_GEAR_DATA } = require('./seeder-global-destinos-travel-gear');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'malas-e-viagem');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Achadinhos de Viagem & Malas Verificados</div>
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

function renderGearPage(gear) {
  const pageTitle = `📦 ALERTA DE PREÇO: Itens Essenciais e Malas de Viagem com até 70% OFF | AQUITEM Viagem`;
  const metaDesc = `Queima de estoque na ${gear.loja}: ${gear.nome} saindo de ${gear.normal} por apenas ${gear.promo} (${gear.desconto}% OFF). Perfeito para viagens e destinos da temporada.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/malas-e-viagem/${gear.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": gear.nome,
    "description": metaDesc,
    "category": gear.cat,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": gear.promo.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'),
      "availability": "https://schema.org/InStock",
      "url": gear.link
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
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
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
      <a href="/malas-e-viagem" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs shadow-md">🧳</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Malas & Viagem</span></span>
      </a>
      <a href="/malas-e-viagem" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Ver Todos os Itens</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- CARD DO PRODUTO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/30 p-5 md:p-8 shadow-2xl relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
          🔥 OFERTA DE TEMPORADA • ${gear.desconto}% OFF
        </span>
        <span class="text-slate-400 font-semibold">${gear.loja}</span>
      </div>

      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-3">
        ${gear.nome}
      </h1>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-400 block">Preço de Tabela:</span>
          <span class="text-slate-400 line-through text-base font-semibold">${gear.normal}</span>
        </div>
        <div>
          <span class="text-xs text-emerald-400 block font-bold">Preço com Desconto:</span>
          <span class="text-emerald-400 text-2xl md:text-3xl font-black">${gear.promo}</span>
        </div>
        <div>
          <span class="text-xs text-amber-400 block font-bold">Categoria:</span>
          <span class="text-white text-sm font-semibold">${gear.cat}</span>
        </div>
      </div>

      <div class="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-xs text-amber-200 mb-6">
        ✈️ <strong>Recomendado para Destinos:</strong> ${gear.destinos}.
      </div>

      <!-- BOTÃO DIRETO DE COMPRA -->
      <div class="space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(gear.link)}&origem=gear_${gear.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-sm md:text-base rounded-xl text-center shadow-xl transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>👉 COMPRAR ITEM COM DESCONTO AGORA NA ${gear.loja.toUpperCase()} →</span>
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Scanner de Malas e Equipamentos de Viagem.</p>
  </footer>
</body>
</html>`;
}

function renderGearHub() {
  const cardsHtml = TRAVEL_GEAR_DATA.map(g => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">-${g.desconto}% OFF</span>
          <span class="text-slate-400">${g.loja}</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${g.nome}</h3>
        <p class="text-xs text-slate-400 mb-3">✈️ ${g.destinos}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-lg font-black text-emerald-400">${g.promo}</span>
          <span class="text-xs text-slate-500 line-through">${g.normal}</span>
        </div>
      </div>
      <a href="/malas-e-viagem/${g.slug}.html" class="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 font-bold text-xs rounded-xl text-center transition">
        Ver Oferta Oficial →
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
  <title>🧳 Scanner Global de Achadinhos e Malas de Viagem 2026 | AQUITEM</title>
  <meta name="description" content="Encontre kits de malas rígidas 360°, mochilas para cabine ANAC, organizadores a vácuo, roupas térmicas e eletrônicos de voo com até 70% de desconto.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/malas-e-viagem">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/malas-e-viagem" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-black text-xs shadow-md">🧳</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Malas & Acessórios</span></span>
      </a>
      <a href="/viagens.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Radar Viagens</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">Equipamentos & Malas Essenciais</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Scanner Global de Achadinhos e Malas de Viagem</h1>
      <p class="text-slate-400 text-xs md:text-sm">Ofertas verificadas em malas de bordo rígidas, organizadores inteligentes, roupas térmicas e carregadores homologados.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Equipamentos de Viagem.</p>
  </footer>
</body>
</html>`;
}

async function generateAllGearPages() {
  console.log("🚀 Gerando páginas de Malas e Equipamentos de Viagem...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const gear of TRAVEL_GEAR_DATA) {
    const html = renderGearPage(gear);
    const outPath = path.join(OUTPUT_DIR, `${gear.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/malas-e-viagem/${gear.slug}`);
    console.log(`✓ [Malas] Gerada: /malas-e-viagem/${gear.slug}.html`);
  }

  // Hub index
  const hubHtml = renderGearHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/malas-e-viagem');

  console.log(`🏆 Total de ${urls.length} rotas de malas geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllGearPages().catch(console.error);
}

module.exports = { generateAllGearPages };
