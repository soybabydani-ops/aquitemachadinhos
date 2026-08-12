/**
 * AQUITEM ACHADINHOS — GERADOR DE DESTINOS GLOBAIS MULTILÍNGUES (PT / EN / ES)
 * Programmatic SEO Internacional com hreflang bidirecional e monetização global.
 */

const fs = require('fs');
const path = require('path');
const { DESTINOS_MASTER } = require('./seeder-global-destinos-travel-gear');

const REPO_ROOT = path.join(__dirname, '..');
const PT_DIR = path.join(REPO_ROOT, 'destinos');
const EN_DIR = path.join(REPO_ROOT, 'en', 'destinations');
const ES_DIR = path.join(REPO_ROOT, 'es', 'destinos');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA GLOBAL CPM CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-sky-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Global Travel Sponsor & Flight Alerts</div>
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

function renderDestinationPage({ lang, dest }) {
  const isPt = lang === 'PT';
  const isEn = lang === 'EN';
  const isEs = lang === 'ES';

  const ptUrl = `https://www.aquitemachadinhos.com.br/destinos/${dest.slug}-passagens-hoteis-baratos`;
  const enUrl = `https://www.aquitemachadinhos.com.br/en/destinations/${dest.slug}-cheap-flights-hotel-deals`;
  const esUrl = `https://www.aquitemachadinhos.com.br/es/destinos/${dest.slug}-vuelos-baratos-hoteles`;
  const currentCanonical = isPt ? ptUrl : (isEn ? enUrl : esUrl);

  const title = isPt 
    ? `✈️ TARIFA OCULTA: Passagens Aéreas e Hotéis Baratos em ${dest.cidade} - Atualizado Hoje | AQUITEM Destinos`
    : (isEn 
        ? `✈️ SECRET FARE: Last-Minute Flights and Cheap Hotels in ${dest.cidade} - Updated Now | AQUITEM Global`
        : `✈️ TARIFA SECRETA: Vuelos Baratos de Última Hora y Hoteles en ${dest.cidade} - Actualizado Hoy | AQUITEM Global`);

  const metaDesc = isPt ? dest.desc_pt : (isEn ? dest.desc_en : dest.desc_es);

  const badge = isPt 
    ? `RADAR DE VIAGENS GLOBAIS • ${dest.cidade.toUpperCase()} (${dest.pais.toUpperCase()})`
    : (isEn ? `GLOBAL TRAVEL RADAR • ${dest.cidade.toUpperCase()} (${dest.pais.toUpperCase()})` : `RADAR DE VIAJES GLOBALES • ${dest.cidade.toUpperCase()} (${dest.pais.toUpperCase()})`);

  const btnFlights = isPt ? "✈️ VER TARIFAS OCULTAS DE VOOS →" : (isEn ? "✈️ CHECK SECRET FLIGHT DEALS →" : "✈️ VER VUELOS BARATOS AHORA →");
  const btnHotels = isPt ? "🏨 Reservar Hotéis com Desconto" : (isEn ? "🏨 Book Discounted Hotels" : "🏨 Reservar Hoteles Económicos");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": `${dest.cidade}, ${dest.pais}`,
    "description": metaDesc,
    "url": currentCanonical,
    "touristType": ["International Tourism", "Budget Travel", "Sightseeing"]
  };

  return `<!DOCTYPE html>
<html lang="${isPt ? 'pt-BR' : (isEn ? 'en-US' : 'es-ES')}" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}

  <!-- HREFLANG MULTILÍNGUE INDUSTRIAL -->
  <link rel="alternate" hreflang="pt-BR" href="${ptUrl}" />
  <link rel="alternate" hreflang="en" href="${enUrl}" />
  <link rel="alternate" hreflang="es" href="${esUrl}" />
  <link rel="alternate" hreflang="x-default" href="${ptUrl}" />

  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${currentCanonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${currentCanonical}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .pulse-sky { animation: pulse-blue 2s infinite; }
    @keyframes pulse-blue { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white">

  <!-- HEADER COM SELETOR DE IDIOMAS -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="${isPt ? '/viagens.html' : (isEn ? '/en/destinations' : '/es/destinos')}" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md">✈️</span>
        <span>AQUITEM <span class="text-sky-400 font-normal">| Global Travel</span></span>
      </a>
      
      <!-- IDIOMAS -->
      <div class="flex items-center gap-1.5 text-xs">
        <a href="${ptUrl}.html" class="px-2 py-1 rounded ${isPt ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'} border border-slate-700">🇧🇷 PT</a>
        <a href="${enUrl}.html" class="px-2 py-1 rounded ${isEn ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'} border border-slate-700">🇺🇸 EN</a>
        <a href="${esUrl}.html" class="px-2 py-1 rounded ${isEs ? 'bg-sky-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'} border border-slate-700">🇪🇸 ES</a>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- BANNER HERO DESTINO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-sky-950/70 via-slate-900 to-slate-900 border border-sky-500/30 p-5 md:p-8 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-sky-400 pulse-sky"></span>
        <span>${badge}</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-3">
        ${isPt ? `Guia Completo & Tarifas Ocultas: ${dest.cidade}` : (isEn ? `Travel Guide & Secret Fares: ${dest.cidade}` : `Guía de Viaje y Vuelos Baratos: ${dest.cidade}`)}
      </h1>
      
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-4">
        <span class="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">🏷️ ${dest.tarifa}</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">🌎 ${dest.pais}</span>
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">☀️ Temporada: ${dest.sazon}</span>
      </div>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 my-4 space-y-2">
        <p class="text-xs md:text-sm text-slate-200 leading-relaxed font-normal">${metaDesc}</p>
        <p class="text-xs text-slate-400">🏨 <strong>${isPt ? 'Onde Ficar' : (isEn ? 'Where to Stay' : 'Dónde Alojarte')}:</strong> ${dest.hotel}</p>
      </div>

      <!-- BOTÕES DE AÇÃO ADMITAD / BOOKING / VOOS -->
      <div class="flex flex-wrap gap-2 pt-2">
        <a href="/ir.html?url=https%3A%2F%2Fmeli.la%2F1U3rtgV&origem=global_${dest.slug}" target="_blank" rel="noopener noreferrer sponsored" class="px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg transition flex items-center gap-2 transform active:scale-95">
          <span>${btnFlights}</span>
        </a>
        <a href="/ir.html?url=https%3A%2F%2Fmeli.la%2F1U3rtgV&origem=hoteis_${dest.slug}" target="_blank" rel="noopener noreferrer sponsored" class="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs md:text-sm rounded-xl border border-slate-700 transition">
          ${btnHotels}
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- DICAS DE BAGAGEM & CÂMBIO -->
    <div class="my-6 rounded-2xl bg-slate-900/50 border border-slate-800 p-5 space-y-3 text-xs text-slate-300">
      <h3 class="text-sm font-bold text-white flex items-center gap-1.5 text-sky-400">
        <span>💡 ${isPt ? 'Recomendações Essenciais de Viagem' : (isEn ? 'Essential Travel Tips' : 'Consejos Esenciales de Viaje')}</span>
      </h3>
      <p>• <strong>${isPt ? 'Bagagem de Bordo:' : (isEn ? 'Carry-on Luggage:' : 'Equipaje de Mano:')}</strong> ${isPt ? 'Verifique as regras de peso (até 10kg) e dimensões da ANAC / IATA.' : (isEn ? 'Check airline cabin luggage size and weight limits before boarding.' : 'Consulta las medidas oficiales permitidas por la aerolínea.')}</p>
      <p>• <strong>${isPt ? 'Câmbio e Moeda:' : (isEn ? 'Currency & Exchange:' : 'Cambio de Moneda:')}</strong> ${isPt ? 'Utilize contas globais digitais para pagar IOF reduzido e garantir a melhor cotação.' : (isEn ? 'Use digital travel cards to avoid high international transaction fees.' : 'Utiliza tarjetas digitales globales para ahorrar en comisiones.')}</p>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Global Travel Network.</p>
  </footer>
</body>
</html>`;
}

function renderGlobalHub(lang) {
  const isPt = lang === 'PT';
  const isEn = lang === 'EN';
  const title = isPt ? "🌍 Radar Global de Destinos & Passagens Aéreas" : (isEn ? "🌍 Global Destination Radar & Flight Deals" : "🌍 Radar Global de Destinos y Vuelos");
  const desc = isPt ? "Consulte tarifas secretas e hotéis baratos em Orlando, Paris, Miami, Lisboa, Cancun, Gramado e principais polos turísticos do mundo." : "Find cheap flights and hotel deals in top travel destinations worldwide.";

  const cardsHtml = DESTINOS_MASTER.map(d => {
    const slug = isPt ? `${d.slug}-passagens-hoteis-baratos` : (isEn ? `${d.slug}-cheap-flights-hotel-deals` : `${d.slug}-vuelos-baratos-hoteles`);
    const pathPrefix = isPt ? '/destinos/' : (isEn ? '/en/destinations/' : '/es/destinos/');

    return `
      <div class="bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs mb-2">
            <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">${d.pais}</span>
            <span class="text-amber-400 text-[11px]">${d.tarifa}</span>
          </div>
          <h3 class="text-base font-bold text-white mb-2 leading-snug">${d.cidade}</h3>
          <p class="text-xs text-slate-400 mb-4 line-clamp-2">${isPt ? d.desc_pt : (isEn ? d.desc_en : d.desc_es)}</p>
        </div>
        <a href="${pathPrefix}${slug}.html" class="w-full py-2.5 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 font-bold text-xs rounded-xl text-center transition">
          ${isPt ? 'Ver Tarifas & Dicas →' : (isEn ? 'View Deals & Guide →' : 'Ver Ofertas y Guía →')}
        </a>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="${isPt ? 'pt-BR' : (isEn ? 'en-US' : 'es-ES')}" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}
  <title>${title} | AQUITEM</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br${isPt ? '/destinos' : (isEn ? '/en/destinations' : '/es/destinos')}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/viagens.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md">✈️</span>
        <span>AQUITEM <span class="text-sky-400 font-normal">| Global Destinos</span></span>
      </a>
      <a href="/viagens.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Radar Viagens</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 uppercase tracking-wider">Global Travel Index</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">${title}</h1>
      <p class="text-slate-400 text-xs md:text-sm">${desc}</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Conquistador Global de Destinos.</p>
  </footer>
</body>
</html>`;
}

async function generateAllGlobalDestinations() {
  console.log("🚀 Gerando páginas multilíngues de Destinos Globais (PT / EN / ES)...");
  
  if (!fs.existsSync(PT_DIR)) fs.mkdirSync(PT_DIR, { recursive: true });
  if (!fs.existsSync(EN_DIR)) fs.mkdirSync(EN_DIR, { recursive: true });
  if (!fs.existsSync(ES_DIR)) fs.mkdirSync(ES_DIR, { recursive: true });

  const urls = [];

  for (const dest of DESTINOS_MASTER) {
    // 1. PT
    const ptHtml = renderDestinationPage({ lang: 'PT', dest });
    const ptPath = path.join(PT_DIR, `${dest.slug}-passagens-hoteis-baratos.html`);
    fs.writeFileSync(ptPath, ptHtml, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/destinos/${dest.slug}-passagens-hoteis-baratos`);

    // 2. EN
    const enHtml = renderDestinationPage({ lang: 'EN', dest });
    const enPath = path.join(EN_DIR, `${dest.slug}-cheap-flights-hotel-deals.html`);
    fs.writeFileSync(enPath, enHtml, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/en/destinations/${dest.slug}-cheap-flights-hotel-deals`);

    // 3. ES
    const esHtml = renderDestinationPage({ lang: 'ES', dest });
    const esPath = path.join(ES_DIR, `${dest.slug}-vuelos-baratos-hoteles.html`);
    fs.writeFileSync(esPath, esHtml, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/es/destinos/${dest.slug}-vuelos-baratos-hoteles`);

    console.log(`✓ [Destino] Geradas 3 línguas para: ${dest.cidade} (${dest.pais})`);
  }

  // Hubs
  fs.writeFileSync(path.join(PT_DIR, 'index.html'), renderGlobalHub('PT'), 'utf8');
  fs.writeFileSync(path.join(EN_DIR, 'index.html'), renderGlobalHub('EN'), 'utf8');
  fs.writeFileSync(path.join(ES_DIR, 'index.html'), renderGlobalHub('ES'), 'utf8');

  urls.push('https://www.aquitemachadinhos.com.br/destinos');
  urls.push('https://www.aquitemachadinhos.com.br/en/destinations');
  urls.push('https://www.aquitemachadinhos.com.br/es/destinos');

  console.log(`🏆 Total de ${urls.length} rotas globais multilíngues geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllGlobalDestinations().catch(console.error);
}

module.exports = { generateAllGlobalDestinations };
