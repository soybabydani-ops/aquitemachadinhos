/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES CJ AFFILIATE (ULTRA LUXURY & HIGH-TICKET VIP)
 * Focado em Suítes Presidenciais com Heliponto, Malas Samsonite/TUMI e Resorts 5 Estrelas Internacionais.
 * Carregamento Mobile < 0.2s, Monetização Dupla (Adsterra Zone 5975392 + PropellerAds + CJ Affiliate USD).
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'luxo-vip');

const CJ_BASE_LINK_MARRIOTT = "https://www.anrdoezrs.net/click-101143576-15783291";
const CJ_BASE_LINK_SAMSONITE = "https://www.jdoqocy.com/click-101143576-15894320";
const CJ_BASE_LINK_BOOKING = "https://www.anrdoezrs.net/click-101143576-15982104";
const IMPACT_PUBLISHER_ID = "1101l435760";

// Inventário de Alto Luxo & Suítes Presidenciais
const LUXURY_COLLECTION = [
  {
    categoria: "Suíte Presidencial & Heliponto",
    titulo: "Suíte Presidencial 5 Estrelas com Heliponto Homologado e Concierge 24h",
    de: "R$ 12.500,00/noite",
    por: "R$ 3.750,00/noite",
    desconto: "70% OFF",
    area: "350 m² com Vista Panorâmica",
    servicos: ["Heliponto com autorização ANAC e transfer em pista", "Chef de cozinha privativo e mordomo exclusivo", "Acesso VIP a lounges executivos e spa privativo"],
    link: CJ_BASE_LINK_MARRIOTT
  },
  {
    categoria: "Malas de Alto Padrão Samsonite & TUMI",
    titulo: "Mala de Bordo TUMI Alpha 3 Continental & Samsonite Black Label Alumínio",
    de: "R$ 4.850,00",
    por: "R$ 1.455,00",
    desconto: "70% OFF",
    area: "Alumínio Aeroespacial & Nylon Balístico FXT",
    servicos: ["Rodas duplas multidirecionais 360° ultra-silenciosas", "Cadeado TSA integrado e placa de identificação rastreável", "Garantia mundial vitalícia com suporte em aeroportos"],
    link: CJ_BASE_LINK_SAMSONITE
  },
  {
    categoria: "Luxury Villas & 5-Star Allocation",
    titulo: "Villas Privativas com Piscina Infinita Aquecida e Segurança Armada 24h",
    de: "R$ 8.900,00/diária",
    por: "R$ 2.670,00/diária",
    desconto: "70% OFF",
    area: "Terreno Privativo de 1.200 m² em Condomínio Fechado",
    servicos: ["Piscina climatizada com borda infinita e sauna", "Garagem subterrânea para veículos blindados", "Privacidade absoluta com cancelamento flexível"],
    link: CJ_BASE_LINK_BOOKING
  },
  {
    categoria: "Fretamento de Jatos & Traslados VIP",
    titulo: "Fretamento Aéreo Executivo de Jatos Citation / Learjet e Helicópteros Bi-Turbina",
    de: "R$ 18.000,00",
    por: "R$ 5.400,00",
    desconto: "70% OFF",
    area: "Capacidade para 6 a 12 Passageiros VIP",
    servicos: ["Embarque direto em terminal executivo privado", "Catering gourmet personalizado e champagne francês", "Voos sob demanda ponto a ponto sem conexões"],
    link: CJ_BASE_LINK_MARRIOTT
  }
];

const SPECIAL_LUXURY_HUBS_PT = [
  {
    slug: "reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo",
    titulo: "Reservas de Suítes Presidenciais e Resorts de Luxo com Heliponto em São Paulo — CJ VIP",
    h1: "Reservas de Suítes Presidenciais e Resorts de Luxo com Heliponto em São Paulo",
    metaDesc: "Desbloqueie tarifas exclusivas em suítes presidenciais, hotéis 5 estrelas e resorts de altíssimo luxo com heliponto em São Paulo. Descontos de até 70% na rede Marriott e IHG.",
    badge: "🚁 HELIPONTO & SUÍTES PRESIDENCIAIS SP",
    lang: "pt",
    cidadeKey: "sao-paulo"
  },
  {
    slug: "melhores-malas-bordo-alta-resistencia-samsonite-tumi-promocao",
    titulo: "Melhores Malas de Bordo de Alta Resistência Samsonite e TUMI em Promoção — CJ Luxury",
    h1: "Melhores Malas de Bordo de Alta Resistência Samsonite e TUMI em Promoção",
    metaDesc: "Guia exclusivo de bagagens de luxo para executivos e passageiros frequentes. Compre malas Samsonite e TUMI com até 70% de desconto oficial.",
    badge: "🧳 MALAS TUMI & SAMSONITE OFICIAL",
    lang: "pt",
    cidadeKey: "sao-paulo"
  },
  {
    slug: "fretamento-jato-executivo-helicoptero-helipontos",
    titulo: "Fretamento de Jatos Executivos e Helicópteros com Acesso a Helipontos VIP",
    h1: "Fretamento de Jatos Executivos e Helicópteros para Bilionários e Investidores",
    metaDesc: "Cotações de fretamento aéreo corporativo sob demanda. Jatos executivos e helicópteros bi-turbina com acesso a helipontos privados em SP, Rio, Trancoso e Angra.",
    badge: "✈️ JATOS EXECUTIVOS & VIP CHARTER",
    lang: "pt",
    cidadeKey: "sao-paulo"
  },
  {
    slug: "hoteis-5-estrelas-marriott-ihg-intercontinental",
    titulo: "Hotéis 5 Estrelas Marriott, JW Marriott e IHG InterContinental — Tarifas Secretas",
    h1: "Hotéis 5 Estrelas Marriott & IHG InterContinental com até 70% OFF",
    metaDesc: "Reserve nos hotéis mais prestigiados do mundo através da rede oficial CJ Affiliate com garantia de upgrade de quarto e check-in prioritário.",
    badge: "⭐ REDE MARRIOTT & IHG VIP",
    lang: "pt",
    cidadeKey: "sao-paulo"
  },
  {
    slug: "resorts-luxo-villas-privativas-piscina-aquecida",
    titulo: "Resorts de Luxo e Villas Privativas com Piscina Aquecida e Segurança Total",
    h1: "Resorts de Luxo e Villas Privativas com Piscina Aquecida no Brasil e Exterior",
    metaDesc: "Hospedagens ultra-exclusivas para famílias e investidores com serviços de concierge, chef particular e total discrição.",
    badge: "🏰 VILLAS & MANSÕES PRIVATIVAS",
    lang: "pt",
    cidadeKey: "sao-paulo"
  }
];

const INTERNATIONAL_BILLIONAIRES_HUBS_EN = [
  {
    slug: "last-minute-luxury-villas-5-star-hotel-allocation-open-now",
    titulo: "Last-Minute Luxury Villas and 5-Star Hotel Allocation Open Now — CJ Affiliate VIP",
    h1: "Last-Minute Luxury Villas & 5-Star Hotel Allocation Worldwide",
    metaDesc: "Exclusive last-minute allocation in world-renowned luxury hotels and private villas. Save up to 70% on Marriott, IHG, and Booking Luxury.",
    badge: "💎 GLOBAL LUXURY ALLOCATION",
    lang: "en",
    destName: "Global Destinations"
  },
  {
    slug: "presidential-suites-private-helipad-luxury-resorts-booking",
    titulo: "Presidential Suites and Private Helipad Luxury Resorts Booking Worldwide",
    h1: "Presidential Suites & Private Helipad Luxury Resorts Booking",
    metaDesc: "Direct reservations for presidential penthouse suites and helipad-certified luxury estates in top financial capitals.",
    badge: "🚁 HELIPAD PRESIDENTIAL SUITES",
    lang: "en",
    destName: "Worldwide Penthouse Hub"
  },
  {
    slug: "samsonite-tumi-luxury-spinner-luggage-deals",
    titulo: "Samsonite and TUMI Luxury Spinner Luggage Deals for Frequent Flyers",
    h1: "Samsonite & TUMI Luxury Carry-On and Checked Spinner Luggage Deals",
    metaDesc: "Engineered for executive first-class travel. Premium ballistic nylon and aircraft-grade aluminum carry-ons with lifetime warranty.",
    badge: "🧳 TUMI & SAMSONITE VIP",
    lang: "en",
    destName: "Worldwide Luggage"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-dubai",
    titulo: "Luxury 5-Star Hotels & Presidential Suites in Dubai Palm Jumeirah",
    h1: "Ultra-Luxury 5-Star Hotels & Presidential Suites in Dubai (UAE)",
    metaDesc: "Experience bespoke 7-star luxury at Palm Jumeirah and Downtown Dubai with private butler service and super-car transfers.",
    badge: "🇦🇪 DUBAI LUXURY (DXB)",
    lang: "en",
    destName: "Dubai Palm Jumeirah"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-monaco",
    titulo: "Luxury 5-Star Hotels & Suites in Monaco Monte Carlo — Billionaires Row",
    h1: "Luxury 5-Star Hotels & Grand Prix Suites in Monaco Monte Carlo",
    metaDesc: "Overlooking the Port Hercule yacht marina and Casino de Monte-Carlo. Exclusive penthouse bookings for high-net-worth guests.",
    badge: "🇲🇨 MONACO MONTE CARLO",
    lang: "en",
    destName: "Monaco Monte Carlo"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-paris",
    titulo: "Luxury 5-Star Palace Hotels & Suites in Paris Place Vendôme",
    h1: "Luxury 5-Star Palace Hotels & Suites in Paris Place Vendôme",
    metaDesc: "Stay near Place Vendôme and Champs-Élysées with private Eiffel Tower views and Michelin-starred dining allocations.",
    badge: "🇫🇷 PARIS PLACE VENDÔME",
    lang: "en",
    destName: "Paris Place Vendôme"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-tokyo",
    titulo: "Luxury 5-Star Penthouse Hotels in Tokyo Ginza & Shinjuku",
    h1: "Luxury 5-Star Penthouse Hotels & Executive Suites in Tokyo Ginza",
    metaDesc: "Modern Japanese luxury with panoramic skyline views of Mount Fuji and Tokyo Tower. Seamless CJ Affiliate booking.",
    badge: "🇯🇵 TOKYO GINZA (HND)",
    lang: "en",
    destName: "Tokyo Ginza"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-new-york",
    titulo: "Luxury 5-Star Presidential Suites on New York 5th Avenue & Central Park",
    h1: "Presidential Suites & 5-Star Luxury Hotels on New York 5th Avenue",
    metaDesc: "Central Park penthouse suites and 5th Avenue historic luxury residences with private terrace and white-glove concierge.",
    badge: "🇺🇸 NEW YORK 5TH AVENUE",
    lang: "en",
    destName: "New York 5th Avenue"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-london",
    titulo: "Luxury 5-Star Historic Hotels in London Mayfair & Knightsbridge",
    h1: "Luxury 5-Star Hotels & Presidential Suites in London Mayfair",
    metaDesc: "Prestigious Mayfair and Hyde Park suites with royal heritage service, chauffeur-driven Rolls-Royce, and afternoon tea.",
    badge: "🇬🇧 LONDON MAYFAIR",
    lang: "en",
    destName: "London Mayfair"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-beverly-hills",
    titulo: "Luxury 5-Star Estate Suites in Beverly Hills Rodeo Drive",
    h1: "Luxury 5-Star Mansions & Suites in Beverly Hills Rodeo Drive",
    metaDesc: "Private villas and legendary luxury bungalows in Beverly Hills with private pool cabanas and Rodeo Drive VIP shopping access.",
    badge: "🇺🇸 BEVERLY HILLS (LAX)",
    lang: "en",
    destName: "Beverly Hills"
  },
  {
    slug: "luxury-5star-hotels-presidential-suites-maldives",
    titulo: "Ultra-Luxury Overwater Villas & Private Islands in the Maldives",
    h1: "Ultra-Luxury Overwater Villas & Private Island Resorts in the Maldives",
    metaDesc: "Seaplane arrivals, underwater wine cellars, and private infinity pools over crystal turquoise lagoons in the Maldives.",
    badge: "🇲🇻 MALDIVES PRIVATE ATOLL",
    lang: "en",
    destName: "Maldives Private Islands"
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA LUXURY HIGH-CPM CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/30 p-2 bg-slate-900/80 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-amber-400 uppercase tracking-widest font-semibold mb-1">Exclusive Private Aviation &amp; High-Ticket Luxury Sponsor</div>
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

function renderLuxuryCards(isEn = false) {
  return LUXURY_COLLECTION.map(item => {
    const ctaText = isEn ? "👉 Check VIP Allocation & Rates on CJ Partner →" : "👉 Acessar Alocação VIP & Tarifas na Rede CJ →";
    const fromTableText = isEn ? "Published Rack Rate:" : "De Tabela:";
    const promoText = isEn ? "Private Member Rate:" : "Tarifa Membro VIP:";

    const services = item.servicos.map(s => `
      <li class="flex items-center gap-2 text-xs text-slate-300">
        <span class="text-amber-400 font-bold">✓</span>
        <span>${s}</span>
      </li>
    `).join('');

    return `
    <div class="bg-slate-900/90 border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-5 md:p-6 shadow-2xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px]">${item.categoria}</span>
          <span class="text-amber-300 font-black text-xs px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">${item.desconto}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white mb-1.5 leading-snug">${item.titulo}</h3>
        <div class="p-2 rounded-xl bg-black/50 border border-slate-800 text-[11px] text-amber-200/90 mb-3">
          <span>📐 ${item.area}</span>
        </div>
        <ul class="space-y-1.5 mb-4">
          ${services}
        </ul>
      </div>

      <div class="pt-3 border-t border-slate-800">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">${fromTableText}</span>
            <span class="text-xs text-slate-500 line-through">${item.de}</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase text-amber-400 font-bold block">${promoText}</span>
            <span class="text-xl font-black text-amber-400">${item.por}</span>
          </div>
        </div>

        <a href="${item.link}" data-cj="true" data-luxury="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs md:text-sm rounded-xl text-center shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>${ctaText}</span>
        </a>
      </div>
    </div>
    `;
  }).join('\n');
}

function renderLuxuryVIPPage({ slug, title, h1, metaDesc, badge, lang = "pt", cityName = "", uf = "", cidadeKey = "" }) {
  const isEn = lang === "en";
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/luxo-vip/${slug}`;
  
  const geoData = REAL_CITY_DATA[cidadeKey] || null;

  const tarjaText = "💎 EXCLUSIVE ALLOCATION — SUÍTES PRESIDENCIAIS, RESORTS 5★ & MALAS TUMI • CJ NETWORK";
  const bannerScarcity = isEn
    ? "🏷️ PROMOTIONAL VIP ALLOCATION: MARRIOTT, IHG, TUMI & SAMSONITE GLOBAL LUXURY NETWORK"
    : "🏷️ ALOCAÇÃO EXCLUSIVA DE ALTO PADRÃO: REDE GLOBAL MARRIOTT, IHG, TUMI E SAMSONITE";

  const ctaHeroText = isEn ? "👉 UNLOCK PRIVATE HIGH-TICKET RATES ON CJ AFFILIATE →" : "👉 DESBLOQUEAR ALOCAÇÃO VIP NA REDE CJ AFFILIATE →";
  const guaranteesText = isEn
    ? `<span>🔒 100% Certified 5-Star Partner</span><span>⚡ Direct White-Glove Confirmation</span><span>🛡️ 24/7 Dedicated Concierge</span>`
    : `<span>🔒 Parceiro Oficial 5 Estrelas</span><span>⚡ Confirmação VIP Imediata</span><span>🛡️ Concierge &amp; Atendimento Exclusivo</span>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": h1,
    "description": metaDesc,
    "provider": {
      "@type": "Organization",
      "name": "CJ Affiliate Luxury / AQUITEM High-Ticket",
      "url": "https://www.aquitemachadinhos.com.br"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": isEn ? "USD" : "BRL",
      "price": isEn ? "750.00" : "3750.00",
      "availability": "https://schema.org/InStock",
      "url": CJ_BASE_LINK_MARRIOTT
    }
  };

  const luxuryCardsHtml = renderLuxuryCards(isEn);

  // Seção Geo-Localizada Exclusiva para Alta Renda
  let localGeoSection = "";
  if (geoData && cityName) {
    localGeoSection = `
    <div class="bg-slate-900/80 border border-amber-500/40 rounded-3xl p-6 md:p-8 mb-8">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">🚁</span>
        <h3 class="text-lg md:text-xl font-bold text-white">Infraestrutura VIP &amp; Acessos Executivos em ${cityName} - ${uf}</h3>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-5 bg-black/40 p-4 rounded-2xl border border-slate-800">
        <b>Panorama de Alto Padrão em ${cityName}:</b> ${geoData.perfilEditorial || ''}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-amber-400 font-bold mb-1">✈️ Aeroportos Executivos &amp; Helipontos</div>
          <p class="leading-relaxed">${geoData.aeroporto}. Pistas homologadas para jatos privados e helipontos corporativos.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-amber-400 font-bold mb-1">🛣️ Vias Rápidas &amp; Deslocamento Blindado</div>
          <p class="leading-relaxed">${geoData.rodovias}. Rotas seguras para traslados executivos e frotas de alto padrão.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-amber-400 font-bold mb-1">🏢 Bairros Nobres &amp; Centros Financeiros</div>
          <p class="leading-relaxed">${geoData.polosComerciais}. Concentração de hotelaria 5 estrelas e centros empresariais.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-amber-400 font-bold mb-1">📞 Concierge &amp; Atendimento Exclusivo (DDD ${geoData.ddd})</div>
          <p class="leading-relaxed">Reservas antecipadas na rede Marriott e IHG garantem acesso a suítes presidenciais e upgrades exclusivos em ${cityName}.</p>
        </div>
      </div>
    </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'pt-BR'}" class="dark">
<head>
  <!-- ULTRA HIGH-SPEED PRELOADS & PERIMETRAL MONETIZATION (< 10ms) -->
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="dns-prefetch" href="//p2pdh.com" />
  <link rel="preconnect" href="//p2pdh.com" crossorigin />
  <link rel="dns-prefetch" href="//www.anrdoezrs.net" />
  <link rel="preconnect" href="//www.anrdoezrs.net" crossorigin />
  <link rel="dns-prefetch" href="//www.jdoqocy.com" />
  <link rel="preconnect" href="//www.jdoqocy.com" crossorigin />
  <link rel="dns-prefetch" href="https://efvuzxdhsirpvxclgdfg.supabase.co" />
  <link rel="preconnect" href="https://efvuzxdhsirpvxclgdfg.supabase.co" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>
  <script src="/assets/affiliate-tracker.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  <meta name="partnerize-publisher-id" content="${IMPACT_PUBLISHER_ID}" />
  <meta name="partnerize" content="${IMPACT_PUBLISHER_ID}" />
  ${PROPELLERADS_SNIPPET}

  <title>${title} | AQUITEM CJ Luxury VIP</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="alternate" hreflang="pt-BR" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en" href="${canonicalUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://www.aquitemachadinhos.com.br/assets/og-image.png">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #03050C; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .glass-gold-vip { background: rgba(15, 23, 42, 0.92); border: 1px solid rgba(245, 158, 11, 0.4); box-shadow: 0 0 40px rgba(245, 158, 11, 0.15); }
    .gold-text-glow { text-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-amber-400 selection:text-black">

  <!-- TOP STRIP: CJ LUXURY ALLOCATION -->
  <div class="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    ${tarjaText}
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/95 border-b border-amber-500/30 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/luxo-vip" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center font-black text-xs shadow-md">💎</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| CJ Luxury High-Ticket</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/" class="hidden sm:inline-block text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">${isEn ? 'Home' : 'Início'}</a>
        <span class="text-[11px] px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
          ${isEn ? 'CJ Affiliate VIP' : 'Rede CJ Affiliate VIP'}
        </span>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    
    <!-- TARJA DE TRANSPARÊNCIA E DISPONIBILIDADE REAL -->
    <div class="mb-6 p-3.5 bg-amber-950/60 border border-amber-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200 shadow-xl">
      <div class="flex items-center gap-2 font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        <span>${bannerScarcity}</span>
      </div>
      <div class="text-[11px] text-slate-300 bg-black/50 px-3 py-1 rounded-xl border border-amber-500/30">
        <span>Atualização em Tempo Real • Vagas sob Demanda</span>
      </div>
    </div>

    <!-- BANNER TOPO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- CARD HERO COM TÍTULO E GATILHOS -->
    <div class="mb-8 rounded-3xl glass-gold-vip p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 uppercase tracking-wider">
          ${badge}
        </span>
        <span class="text-amber-300 font-semibold text-xs">${isEn ? '⚡ 5-Star Concierge • Private Helipad Access' : '⚡ Concierge 5★ • Heliponto Privado Homologado'}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight gold-text-glow">
        ${h1}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${metaDesc} ${isEn ? 'Direct access to presidential penthouses, high-security luxury estates, and Samsonite/TUMI executive collections with white-glove support.' : 'Acesso direto a suítes presidenciais, condomínios fechados de altíssimo luxo e coleções executivas Samsonite e TUMI com atendimento personalizado.'}
      </p>

      <!-- DESTAQUES RÁPIDOS -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div class="p-3 bg-black/60 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Max Discount' : 'Desconto Máximo'}</span>
          <span class="text-base font-black text-amber-400">Até 70% OFF</span>
        </div>
        <div class="p-3 bg-black/60 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Tier Standard' : 'Padrão'}</span>
          <span class="text-base font-black text-white">Ultra-VIP 5★</span>
        </div>
        <div class="p-3 bg-black/60 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Partners' : 'Parceiros'}</span>
          <span class="text-base font-black text-amber-300">Marriott / TUMI</span>
        </div>
        <div class="p-3 bg-black/60 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Concierge' : 'Atendimento'}</span>
          <span class="text-base font-black text-yellow-400">24/7 White-Glove</span>
        </div>
      </div>

      <!-- BOTÃO DE AÇÃO DIRETO COM CJ AFFILIATE -->
      <div class="pt-2">
        <a href="${CJ_BASE_LINK_MARRIOTT}" data-cj="true" data-luxury="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-amber-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>${ctaHeroText}</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center mt-3">
          ${guaranteesText}
        </div>
      </div>
    </div>

    <!-- SEÇÃO GEO-LOCALIZADA ESPECÍFICA -->
    ${localGeoSection}

    <!-- GRADE DE PRODUTOS E EXPERIÊNCIAS HIGH-TICKET -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg md:text-2xl font-black text-white">${isEn ? 'Exclusive High-Ticket Portfolio & Allocations' : 'Portfólio Exclusivo de Alto Padrão & Experiências VIP'}</h2>
        <span class="text-xs text-amber-400 font-bold">${isEn ? 'CJ Affiliate Network' : 'Rede CJ Affiliate'}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${luxuryCardsHtml}
      </div>
    </div>

    <!-- BANNER MEIO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- SEÇÃO DE VANTAGENS DO ALTO LUXO -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
      <h3 class="text-lg font-bold text-white mb-4">${isEn ? 'Why Book High-Ticket Luxury via CJ Network & AQUITEM?' : 'Por que Reservar Experiências High-Ticket através do AQUITEM?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">💎 ${isEn ? 'Direct Tier Allocations' : 'Alocações Diretas de Membro'}</div>
          <p>${isEn ? 'Direct integration with Marriott Luxury Brands, IHG InterContinental, and TUMI with verified inventory.' : 'Conexão direta com as maiores redes hoteleiras 5 estrelas do planeta e fabricantes premium de bagagem.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">🛡️ ${isEn ? 'Privacy & Security' : 'Privacidade &amp; Segurança Total'}</div>
          <p>${isEn ? 'Private helipads, armored transport coordination, and strict privacy protocols for high-net-worth travelers.' : 'Protocolos rigorosos para investidores, traslados com heliponto e total discrição.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">✈️ ${isEn ? 'Executive Travel Gear' : 'Bagagens de Alta Performance'}</div>
          <p>${isEn ? 'Samsonite Black Label and TUMI Alpha 3 collections built with aerospace aluminum and lifetime warranty.' : 'Malas TUMI e Samsonite com garantia vitalícia e resistência máxima para viagens frequentes.'}</p>
        </div>
      </div>
    </div>

    <!-- NAVEGAÇÃO DE ROTAS VIP -->
    <div class="mt-8 pt-6 border-t border-slate-800">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">${isEn ? 'Explore Worldwide Billionaire & Investor Hubs:' : 'Explore Outros Destinos de Alto Luxo & Suítes Presidenciais:'}</h4>
      <div class="flex flex-wrap gap-2 text-xs">
        <a href="/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">São Paulo Helipontos</a>
        <a href="/luxo-vip/melhores-malas-bordo-alta-resistencia-samsonite-tumi-promocao.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Malas TUMI &amp; Samsonite</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-dubai.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Dubai Palm Jumeirah</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-monaco.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Monaco Monte Carlo</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-paris.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Paris Place Vendôme</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-new-york.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">New York 5th Ave</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-london.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">London Mayfair</a>
        <a href="/luxo-vip/luxury-5star-hotels-presidential-suites-maldives.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Maldives Islands</a>
      </div>
    </div>

  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — High-Ticket Luxury, Suítes Presidenciais &amp; CJ Affiliate Partner.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa de programas de afiliados oficiais da CJ Affiliate (Marriott, IHG, Samsonite, TUMI, Booking). Ao reservar ou adquirir através dos nossos links, podemos receber comissões sem qualquer custo adicional para você.
      </p>
      <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
        <a href="/sobre.html" class="hover:text-white underline">Sobre &amp; Curadoria</a>
        <span>•</span>
        <a href="/termos.html" class="hover:text-white underline">Termos de Uso</a>
        <span>•</span>
        <a href="/politica-de-privacidade.html" class="hover:text-white underline">Privacidade</a>
        <span>•</span>
        <a href="/contato.html" class="hover:text-white underline">Contato</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function renderLuxuryHub() {
  const specialCards = SPECIAL_LUXURY_HUBS_PT.map(r => `
    <a href="/luxo-vip/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/70 transition group flex flex-col justify-between shadow-xl">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-amber-400 font-semibold">
        <span>Desbloquear Alocação VIP</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const intlCards = INTERNATIONAL_BILLIONAIRES_HUBS_EN.map(r => `
    <a href="/luxo-vip/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/70 transition group flex flex-col justify-between shadow-xl">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-amber-400 font-semibold">
        <span>Book High-Ticket Suite</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const cityLuxuryLinks = Object.entries(CITIES_INFO).map(([key, city]) => `
    <a href="/luxo-vip/suites-presidenciais-hoteis-5-estrelas-heliponto-${key}.html" class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between">
      <span>💎 ${city.name} (${city.uf})</span>
      <span class="text-amber-400 font-mono text-[11px]">VIP</span>
    </a>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <!-- ULTRA HIGH-SPEED PRELOADS & PERIMETRAL MONETIZATION (< 10ms) -->
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="dns-prefetch" href="//p2pdh.com" />
  <link rel="preconnect" href="//p2pdh.com" crossorigin />
  <link rel="dns-prefetch" href="//www.anrdoezrs.net" />
  <link rel="preconnect" href="//www.anrdoezrs.net" crossorigin />
  <link rel="dns-prefetch" href="//www.jdoqocy.com" />
  <link rel="preconnect" href="//www.jdoqocy.com" crossorigin />
  <link rel="dns-prefetch" href="https://efvuzxdhsirpvxclgdfg.supabase.co" />
  <link rel="preconnect" href="https://efvuzxdhsirpvxclgdfg.supabase.co" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>
  <script src="/assets/affiliate-tracker.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  <meta name="partnerize-publisher-id" content="${IMPACT_PUBLISHER_ID}" />
  <meta name="partnerize" content="${IMPACT_PUBLISHER_ID}" />
  ${PROPELLERADS_SNIPPET}

  <title>💎 Suítes Presidenciais, Hotéis 5 Estrelas & Malas TUMI/Samsonite | AQUITEM CJ VIP</title>
  <meta name="description" content="Portal exclusivo de alto luxo, suítes presidenciais com heliponto, resorts 5 estrelas e malas Samsonite e TUMI na rede CJ Affiliate.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/luxo-vip">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #03050C; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <div class="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    💎 EXCLUSIVE ALLOCATION — SUÍTES PRESIDENCIAIS, RESORTS 5★ &amp; MALAS TUMI • CJ NETWORK
  </div>

  <header class="sticky top-0 z-40 bg-black/95 border-b border-amber-500/30 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/luxo-vip" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-xs shadow-md">💎</span>
        <span>AQUITEM LUXO VIP</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-3xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">Rede Global CJ Affiliate High-Ticket</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Suítes Presidenciais, Resorts 5★ &amp; Bagagens TUMI</h1>
      <p class="text-slate-400 text-xs md:text-sm">Experiências exclusivas com heliponto homologado, atendimento concierge 24h e malas executivas de alta resistência.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Experiências e Suítes em Destaque Nacional</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${specialCards}
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Worldwide Billionaire &amp; Investor Hubs (CJ Network)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${intlCards}
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-slate-800">
      <h2 class="text-lg md:text-xl font-bold text-white mb-2">Suítes Presidenciais &amp; Hotéis 5★ por Cidade</h2>
      <p class="text-xs text-slate-400 mb-6">Selecione sua cidade para acessar o guia de hotelaria executiva e helipontos:</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${cityLuxuryLinks}
      </div>
    </div>
  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — High-Ticket Luxury, Suítes Presidenciais &amp; CJ Affiliate Partner.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa de programas de afiliados oficiais. Ao reservar através dos nossos links, podemos receber comissões sem qualquer custo adicional para você.
      </p>
      <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
        <a href="/sobre.html" class="hover:text-white underline">Sobre &amp; Curadoria</a>
        <span>•</span>
        <a href="/termos.html" class="hover:text-white underline">Termos de Uso</a>
        <span>•</span>
        <a href="/politica-de-privacidade.html" class="hover:text-white underline">Privacidade</a>
        <span>•</span>
        <a href="/contato.html" class="hover:text-white underline">Contato</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

async function generateAllCJLuxuryPages() {
  console.log("=======================================================");
  console.log("💎 GERANDO MOTOR PROGRAMÁTICO CJ AFFILIATE LUXURY VIP");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];

  // 1. Hubs Nacionais de Alto Luxo
  for (const r of SPECIAL_LUXURY_HUBS_PT) {
    const html = renderLuxuryVIPPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang,
      cidadeKey: r.cidadeKey
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/luxo-vip/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Nacional VIP] /luxo-vip/${r.slug}.html`);
  }

  // 2. Hubs Internacionais em Inglês
  for (const r of INTERNATIONAL_BILLIONAIRES_HUBS_EN) {
    const html = renderLuxuryVIPPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/luxo-vip/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Internacional EN] /luxo-vip/${r.slug}.html`);
  }

  // 3. Páginas Multicidade (64 Cidades x 2 Variações High-Ticket)
  for (const [key, city] of Object.entries(CITIES_INFO)) {
    // 3.1 "Suítes presidenciais e hotéis 5 estrelas com heliponto em [Nome_da_Cidade]"
    const slugSuites = `suites-presidenciais-hoteis-5-estrelas-heliponto-${key}`;
    const htmlSuites = renderLuxuryVIPPage({
      slug: slugSuites,
      title: `Suítes Presidenciais e Hotéis 5 Estrelas com Heliponto em ${city.name} - ${city.uf}`,
      h1: `Suítes Presidenciais e Hotéis 5 Estrelas com Heliponto em ${city.name} (${city.uf})`,
      metaDesc: `Reserve suítes presidenciais, penthouses e hotéis de alto luxo com heliponto homologado em ${city.name} (${city.uf}). Descontos exclusivos na rede Marriott e IHG via CJ Affiliate.`,
      badge: `🚁 HELIPONTO & SUÍTES EM ${city.name.toUpperCase()}`,
      lang: "pt",
      cidadeKey: key,
      cityName: city.name,
      uf: city.uf
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugSuites}.html`), htmlSuites, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/luxo-vip/${slugSuites}`);

    // 3.2 "Malas Samsonite e TUMI para viagens executivas em [Nome_da_Cidade]"
    const slugMalas = `malas-samsonite-tumi-viagens-executivas-${key}`;
    const htmlMalas = renderLuxuryVIPPage({
      slug: slugMalas,
      title: `Malas Samsonite e TUMI de Alta Resistência para Viagens Executivas em ${city.name} - ${city.uf}`,
      h1: `Malas Samsonite e TUMI de Alta Resistência em ${city.name} (${city.uf})`,
      metaDesc: `Compre malas de bordo em alumínio e policarbonato Samsonite e TUMI em ${city.name} - ${city.uf}. Garantia vitalícia e desconto oficial na rede CJ.`,
      badge: `🧳 MALAS EXECUTIVAS EM ${city.name.toUpperCase()}`,
      lang: "pt",
      cidadeKey: key,
      cityName: city.name,
      uf: city.uf
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugMalas}.html`), htmlMalas, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/luxo-vip/${slugMalas}`);
  }

  // 4. Central Hub Index (/luxo-vip)
  const hubHtml = renderLuxuryHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push('https://www.aquitemachadinhos.com.br/luxo-vip');

  console.log("\n=======================================================");
  console.log(`🏆 TOTAL: ${generatedUrls.length} PÁGINAS DE ALTO LUXO CJ GERADAS COM SUCESSO!`);
  console.log("=======================================================\n");

  return generatedUrls;
}

if (require.main === module) {
  generateAllCJLuxuryPages().catch(console.error);
}

module.exports = { generateAllCJLuxuryPages, LUXURY_COLLECTION, SPECIAL_LUXURY_HUBS_PT, INTERNATIONAL_BILLIONAIRES_HUBS_EN, CJ_BASE_LINK_MARRIOTT };
