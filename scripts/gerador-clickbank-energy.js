/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DO ENERGY REVOLUTION SYSTEM (CLICKBANK USD)
 * Páginas internacionais de alta conversão (< 0.2s) em inglês para mercados dos EUA, Reino Unido e Europa.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'energy-system');

const CLICKBANK_BASE_LINK = "https://theenergyrevolution.net/cb_redirect.php?&shield=3c970xyjyfi6b8lztkll2u0r75";

const ENERGY_PAGES = [
  {
    slug: "how-to-lower-electricity-bills-at-home-legally",
    titulo: "How to Lower Electricity Bills at Home Legally This Month",
    subtitulo: "Discover the step-by-step residential power optimization blueprint that has helped over 43,000 homeowners reduce energy dependency and slash electric utility bills by up to 65%.",
    category: "Home Energy Optimization",
    regularPrice: "$149.00",
    flashPrice: "$39.00 (Instant Digital Access)",
    discount: "74% OFF",
    scarcityNotice: "Special promotional pricing valid for today only",
    guarantee: "60-Day 100% Money Back Guarantee",
    highlights: [
      "Complete step-by-step DIY illustrated blueprints anyone can follow",
      "List of readily available materials costing under $100 at local hardware stores",
      "Zero maintenance required — weather-resistant and whisper-quiet design",
      "Immediate digital download with direct author support and video walkthroughs"
    ]
  },
  {
    slug: "special-discount-code-energy-revolution-system",
    titulo: "Special Discount Code for Energy Revolution System by Michael Garnett",
    subtitulo: "Claim your verified promotional coupon for Michael Garnett's breakthrough Energy Revolution System. Unlock the complete generator schematics with lifetime digital updates.",
    category: "Official Discount Portal",
    regularPrice: "$149.00",
    flashPrice: "$39.00 One-Time Payment",
    discount: "74% OFF",
    scarcityNotice: "Limited license keys remaining at this tier",
    guarantee: "Full 60 Days Risk-Free Trial Protection",
    highlights: [
      "Official ClickBank verified checkout with 256-bit SSL encryption",
      "Exclusive bonus manuals: Off-Grid Battery Storage & Emergency Power Hacks",
      "Works in any residential home, apartment, or rural cabin",
      "Instant access on smartphone, tablet, laptop, and printable PDF"
    ]
  },
  {
    slug: "ancient-invention-blueprints-power-on-demand-reviews",
    titulo: "Ancient Invention Blueprints to Generate Power on Demand — Independent Reviews",
    subtitulo: "An in-depth analysis of the lost energy generation principles rediscovered by independent researchers. See why thousands of families are achieving grid independence.",
    category: "Blueprint & Engineering Review",
    regularPrice: "$129.00",
    flashPrice: "Only $39.00 Today",
    discount: "70% OFF",
    scarcityNotice: "Over 850 copies claimed in the last 24 hours",
    guarantee: "Guaranteed Satisfaction or 100% Refund",
    highlights: [
      "Detailed thermal efficiency and wattage output breakdown",
      "Tested against extreme weather conditions, winter blizzards, and summer heatwaves",
      "No specialized electrical knowledge or engineering background required",
      "Proven safety features protecting your home and household appliances"
    ]
  },
  {
    slug: "tesla-forbidden-blueprint-power-grid-independence",
    titulo: "Tesla Forbidden Blueprint for Power Grid Independence — Setup Cost Breakdown",
    subtitulo: "How a forgotten electromagnetic induction concept was refined into a compact, highly efficient home power generator that runs independently from commercial utility companies.",
    category: "Grid Independence & Resilience",
    regularPrice: "$149.00",
    flashPrice: "Special $39.00 Flash Access",
    discount: "74% OFF",
    scarcityNotice: "Server download bandwidth reserved for 10 minutes",
    guarantee: "Ironclad 60-Day Money-Back Policy",
    highlights: [
      "Continuous on-demand energy generation day and night without solar panel reliance",
      "Low footprint — fits easily in a garage, basement, or backyard shed",
      "Full schematic diagrams, parts procurement list, and video build guide",
      "Immediate unlock link sent straight to your email inbox"
    ]
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA TIER-1 GLOBAL CPM CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-sky-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Clean Energy &amp; Home Utility Technology Sponsor</div>
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

function renderEnergyPage(item) {
  const pageTitle = `⚡ FLASH SALE: ${item.titulo} [74% OFF] | Energy Revolution System`;
  const metaDesc = `${item.subtitulo} Download the official DIY power generator blueprints with 60-day money-back guarantee.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/energy-system/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Energy Revolution System — ${item.titulo}`,
    "description": metaDesc,
    "brand": { "@type": "Brand", "name": "Energy Revolution System" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "39.00",
      "availability": "https://schema.org/InStock",
      "url": CLICKBANK_BASE_LINK
    }
  };

  const highlightsHtml = item.highlights.map(h => `
    <li class="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
      <span class="text-sky-400 font-bold text-base leading-none">⚡</span>
      <span>${h}</span>
    </li>
  `).join('\n');

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
  <link rel="dns-prefetch" href="https://theenergyrevolution.net" />
  <link rel="preconnect" href="https://theenergyrevolution.net" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  <meta name="partnerize-publisher-id" content="1101l435760" />
  <meta name="partnerize" content="1101l435760" />
  ${PROPELLERADS_SNIPPET}

  <!-- HREFLANG FOR US, UK & GLOBAL ENGLISH -->
  <link rel="alternate" hreflang="en-US" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="en-GB" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />

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
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
    .pulse-flash { animation: pulse-lightning 1.2s infinite; }
    @keyframes pulse-lightning { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-energy { background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 0 35px rgba(56, 189, 248, 0.1); }
    .sky-glow { text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-black">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-sky-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/energy-system" class="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-black flex items-center justify-center font-black text-xs shadow-md">⚡</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Energy Revolution</span></span>
      </a>
      <span class="text-[11px] px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
        ClickBank Verified
      </span>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- FLASH SALE SCARCITY BAR -->
    <div class="mb-6 p-3 bg-amber-950/70 border border-amber-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200 shadow-xl">
      <div class="flex items-center gap-2 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 pulse-flash"></span>
        <span>⚡ FLASH SALE — ONE-TIME PURCHASE WITH INSTANT ACCESS</span>
      </div>
      <div class="font-mono font-bold bg-amber-900/80 px-3 py-1 rounded-xl border border-amber-500/40 text-white flex items-center gap-1.5">
        <span>Discount Expires in:</span>
        <span id="countdownTimer" class="text-yellow-300 font-black">06:18</span>
      </div>
    </div>

    <!-- MAIN PRODUCT CARD -->
    <div class="mb-8 rounded-3xl glass-energy p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 uppercase tracking-wider">
          ✓ ${item.discount} • INSTANT BLUEPRINT UNLOCK
        </span>
        <span class="text-amber-400 font-semibold">${item.scarcityNotice}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-3 tracking-tight sky-glow">
        ${item.titulo}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${item.subtitulo}
      </p>

      <!-- PRICE MATRIX -->
      <div class="p-5 bg-black/60 rounded-2xl border border-sky-500/20 my-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-400 block uppercase">Standard Price:</span>
          <span class="text-slate-400 line-through text-base font-semibold">${item.regularPrice}</span>
        </div>
        <div>
          <span class="text-xs text-sky-400 block font-bold uppercase">Flash Sale Today:</span>
          <span class="text-sky-400 text-2xl md:text-3xl font-black">${item.flashPrice}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block uppercase">Risk-Free Protection:</span>
          <span class="text-emerald-400 text-xs font-bold">${item.guarantee}</span>
        </div>
      </div>

      <!-- HIGHLIGHTS -->
      <div class="my-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider text-sky-400 mb-3">
          What Is Included in Your Instant Package:
        </h3>
        <ul class="space-y-2.5">
          ${highlightsHtml}
        </ul>
      </div>

      <!-- CTA BUTTON LINKED TO CLICKBANK -->
      <div class="pt-4 space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(CLICKBANK_BASE_LINK)}&origem=clickbank_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-sky-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👉 GET YOUR COPY OF ENERGY REVOLUTION SYSTEM NOW →</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center flex-wrap">
          <span>🔒 256-bit Secure ClickBank Checkout</span>
          <span>⚡ Instant Digital Download Access</span>
          <span>🛡️ 60-Day 100% Money-Back Guarantee</span>
        </div>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Energy Revolution System — Clean Power &amp; Off-Grid Independence Blueprints.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO -->
  <script>
    (function() {
      var totalSeconds = 6 * 60 + 18;
      var el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 20) {
          totalSeconds = 9 * 60 + 50; // continuous scarcity loop
        } else {
          totalSeconds--;
        }
        var m = Math.floor(totalSeconds / 60);
        var s = totalSeconds % 60;
        if (el) el.innerText = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
      }, 1000);
    })();
  </script>
</body>
</html>`;
}

function renderEnergyHub() {
  const cardsHtml = ENERGY_PAGES.map(item => `
    <div class="bg-slate-900/80 border border-sky-500/20 hover:border-sky-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">${item.category}</span>
          <span class="text-amber-400 font-bold">${item.discount}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2 leading-snug">${item.titulo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-3">${item.subtitulo}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-base font-black text-sky-400">${item.flashPrice}</span>
          <span class="text-xs text-slate-500 line-through">${item.regularPrice}</span>
        </div>
      </div>
      <a href="/energy-system/${item.slug}.html" class="w-full py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
        Unlock Blueprints Package →
      </a>
    </div>
  `).join('\n');

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
  <meta name="partnerize-publisher-id" content="1101l435760" />
  <meta name="partnerize" content="1101l435760" />
  ${PROPELLERADS_SNIPPET}

  <title>⚡ Energy Revolution System — Official Blueprints &amp; Discount Portal | AQUITEM</title>
  <meta name="description" content="Discover how to build your own residential power generator and cut electricity bills with the official Energy Revolution System blueprints by Michael Garnett.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/energy-system">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-sky-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/energy-system" class="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-sky-500 text-black flex items-center justify-center font-black text-xs shadow-md">⚡</span>
        <span>AQUITEM ENERGY REVOLUTION</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Home</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 uppercase tracking-wider">Official Blueprints Portal</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Energy Revolution System by Michael Garnett</h1>
      <p class="text-slate-400 text-xs md:text-sm">Proven DIY schematics to achieve home power independence, lower utility bills, and ensure emergency backup power.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Energy Revolution System — Global Clean Power Network.</p>
  </footer>
</body>
</html>`;
}

async function generateAllEnergyPages() {
  console.log("🚀 Gerando páginas do Energy Revolution System (ClickBank USD)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const item of ENERGY_PAGES) {
    const html = renderEnergyPage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/energy-system/${item.slug}`);
    console.log(`✓ [ClickBank Energy] Gerada: /energy-system/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderEnergyHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/energy-system');

  console.log(`🏆 Total de ${urls.length} rotas do Energy Revolution System geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllEnergyPages().catch(console.error);
}

module.exports = { generateAllEnergyPages, ENERGY_PAGES, CLICKBANK_BASE_LINK };
