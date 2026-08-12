/**
 * AQUITEM ACHADINHOS — ARBITRAGEM DE INFRAESTRUTURA FINANCEIRA E HEDGE GLOBAL (EN / DE / JA)
 * Páginas focadas em diretores financeiros, family offices e seguros de frotas corporativas.
 */

const fs = require('fs');
const path = require('path');
const { HEDGE_GLOBAL } = require('./seeder-high-ticket-b2b-suite');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'hedge');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA TIER-1 FINANCIAL CPM CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/30 p-2 bg-slate-900/80 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold mb-1">Global Institutional Finance Sponsor</div>
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

function renderHedgePage(item) {
  const pageTitle = `🏛️ INSTITUTIONAL HEDGE: ${item.titulo_servico} | AQUITEM Global Finance`;
  const metaDesc = `${item.descricao_compliance} High-volume compliance, regulated escrow rails, and corporate liability coverage.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/hedge/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": item.titulo_servico,
    "description": metaDesc,
    "url": canonicalUrl,
    "provider": { "@type": "Organization", "name": "AQUITEM Institutional Finance", "url": "https://www.aquitemachadinhos.com.br" }
  };

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
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
    body { background-color: #050811; color: #F8FAFC; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
    .glass-fin { background: rgba(10, 15, 29, 0.9); border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 0 35px rgba(16, 185, 129, 0.1); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">

  <!-- HEADER HEDGE -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/hedge" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-widest uppercase">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">🏛️</span>
        <span>AQUITEM <span class="text-slate-300 font-light">| Institutional Hedge &amp; Compliance</span></span>
      </a>
      <a href="/hedge" class="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-semibold uppercase">
        Solutions
      </a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- CARD INSTITUTIONAL -->
    <div class="mb-8 rounded-3xl glass-fin p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-4 text-emerald-400">
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 uppercase tracking-widest">
          ✓ Tier-1 Regulated Compliance
        </span>
        <span class="text-slate-400">JURISDICTION: GLOBAL / CROSS-BORDER</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
        ${item.titulo_servico}
      </h1>

      <div class="bg-black/60 rounded-2xl border border-emerald-500/20 p-5 my-6 space-y-3 text-xs leading-relaxed text-slate-200">
        <p class="text-sm font-semibold text-emerald-300">${item.descricao_compliance}</p>
        <p>• <strong>Enterprise Fleet Coverage:</strong> Customized multi-aircraft liability, hull war risks, and cross-border flight crew protection.</p>
        <p>• <strong>Direct Liquidity Rails:</strong> Regulated multi-currency settlement channels ensuring fast execution and strict AML/KYC conformance.</p>
      </div>

      <!-- BOTÃO DE AÇÃO HIGH-TICKET -->
      <div class="pt-2">
        <a href="/ir.html?url=${encodeURIComponent(item.link_afiliado_high_ticket)}&origem=hedge_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-xl transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>🏛️ ACCESS INSTITUTIONAL COMPLIANCE PORTAL →</span>
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Global Institutional Financial Network.</p>
  </footer>
</body>
</html>`;
}

function renderHedgeHub() {
  const cardsHtml = HEDGE_GLOBAL.map(item => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${item.ativo_classe}</span>
          <span class="text-slate-400">Jurisdiction: ${item.pais_origem}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2 leading-snug">${item.titulo_servico}</h3>
        <p class="text-xs text-slate-300 mb-4 line-clamp-3">${item.descricao_compliance}</p>
      </div>
      <a href="/hedge/${item.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl text-center transition">
        Review Infrastructure &amp; Coverage →
      </a>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}
  <title>🏛️ Institutional Financial Infrastructure &amp; Global Hedge | AQUITEM</title>
  <meta name="description" content="Tier-1 corporate jet fleet insurance, international high-volume capital transfer compliance, and cross-border fiduciary trust validation.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/hedge">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #050811; color: #F8FAFC; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/hedge" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-widest uppercase">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">🏛️</span>
        <span>AQUITEM GLOBAL FINANCE</span>
      </a>
      <a href="/b2b" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">B2B Portal</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">Global Hedge &amp; Institutional Compliance</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Institutional Infrastructure &amp; Fleet Protection</h1>
      <p class="text-slate-400 text-xs md:text-sm">High-volume liquidity rails, cross-border corporate fleet liability, and family office asset protection frameworks.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Institutional Financial Network.</p>
  </footer>
</body>
</html>`;
}

async function generateAllHedgePages() {
  console.log("🚀 Gerando páginas de Hedge Financeiro e Frotas Globais...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const h of HEDGE_GLOBAL) {
    const html = renderHedgePage(h);
    const outPath = path.join(OUTPUT_DIR, `${h.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/hedge/${h.slug}`);
    console.log(`✓ [Hedge] Gerada: /hedge/${h.slug}.html`);
  }

  // Hub index
  const hubHtml = renderHedgeHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/hedge');

  console.log(`🏆 Total de ${urls.length} rotas de hedge global geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllHedgePages().catch(console.error);
}

module.exports = { generateAllHedgePages };
