/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DISCOVER CARS (LOGÍSTICA VEICULAR GLOBAL)
 * Programmatic SEO (pSEO) de Alta Frequência para 64 Cidades Brasileiras, Aeroportos Nacionais e Hubs Internacionais.
 * Carregamento Mobile < 0.2s, Tarja de Urgência (4 a 11 min), Monetização Dupla (Adsterra Zone 5975392 + PropellerAds + Discover Cars).
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'aluguel-carros');

const DISCOVER_CARS_BASE_LINK = "https://www.discovercars.com/?a_aid=Aquitemachadinhos";
const IMPACT_PUBLISHER_ID = "1101l435760";

// Frota de Veículos em Destaque
const VEHICLE_FLEET = [
  {
    categoria: "SUV & Utilitário Premium",
    modelo: "Jeep Compass / Toyota RAV4 ou similar",
    de: "R$ 380,00/dia",
    por: "R$ 114,00/dia",
    desconto: "70% OFF",
    cambio: "Automático",
    portas: "5 Portas • 5 Lugares",
    bagagem: "3 Malas Grandes",
    seguro: "Proteção Total Cobertura Zero Franquia",
    vantagens: ["Cancelamento Grátis até 48h", "Quilometragem Ilimitada", "Ar Condicionado e GPS Integrado"]
  },
  {
    categoria: "Sedan Executivo & Blindado",
    modelo: "Toyota Corolla / Mercedes-Benz C-Class ou similar",
    de: "R$ 490,00/dia",
    por: "R$ 147,00/dia",
    desconto: "70% OFF",
    cambio: "Automático",
    portas: "4 Portas • 5 Lugares",
    bagagem: "2 Malas Grandes + 2 Pequenas",
    seguro: "Seguro Executivo VIP com Assistência 24h",
    vantagens: ["Nível de Blindagem III-A Opcional", "Retirada Rápida Sem Filas no Aeroporto", "Cancelamento Flexível"]
  },
  {
    categoria: "Econômico & Compacto",
    modelo: "VW Polo / Hyundai HB20 ou similar",
    de: "R$ 190,00/dia",
    por: "R$ 57,00/dia",
    desconto: "70% OFF",
    cambio: "Manual / Auto",
    portas: "4 Portas • 5 Lugares",
    bagagem: "2 Malas",
    seguro: "Proteção Básica contra Colisão e Roubo",
    vantagens: ["Mais Econômico da Categoria", "Excelente Consumo de Combustível", "Reserva Instantânea Confirmada"]
  },
  {
    categoria: "Minivan Familiar & 7 Lugares",
    modelo: "Chevrolet Spin / Toyota Sienna ou similar",
    de: "R$ 420,00/dia",
    por: "R$ 126,00/dia",
    desconto: "70% OFF",
    cambio: "Automático",
    portas: "5 Portas • 7 Lugares",
    bagagem: "4 Malas Grandes",
    seguro: "Cobertura Completa Familiar",
    vantagens: ["Espaço Amplo para Família e Bagagens", "Ideal para Viagens Longas e Eventos", "Sem Taxas Ocultas no Balcão"]
  }
];

const SPECIAL_NATIONAL_ROUTES = [
  {
    slug: "aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos",
    titulo: "Aluguel de Carros Blindados e Utilitários de Última Hora em São Paulo Guarulhos (GRU)",
    h1: "Aluguel de Carros Blindados e Utilitários de Última Hora em São Paulo Guarulhos",
    metaDesc: "Reserve carros blindados, SUVs e utilitários executivos no Aeroporto de Guarulhos (GRU) com até 70% de desconto. Cancelamento grátis até 48h.",
    badge: "🛡️ BLINDADOS & EXECUTIVOS GRU",
    lang: "pt"
  },
  {
    slug: "como-conseguir-desconto-locacao-veiculos-festa-peao-barretos",
    titulo: "Como Conseguir Desconto de até 70% em Locação de Veículos para a Festa do Peão de Barretos",
    h1: "Desconto de até 70% em Locação de Carros para a Festa do Peão de Barretos 2026",
    metaDesc: "Guia completo de locação de carros e SUVs para a Festa do Peão de Barretos. Garanta seu veículo com tarifa congelada e retirada rápida.",
    badge: "🤠 FESTA DO PEÃO DE BARRETOS",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-congonhas-sao-paulo",
    titulo: "Aluguel de Carros no Aeroporto de Congonhas (CGH) São Paulo — Sem Taxas Ocultas",
    h1: "Aluguel de Carros no Aeroporto de Congonhas (CGH) São Paulo",
    metaDesc: "Compare locadoras no Aeroporto de Congonhas e economize até 70%. Retirada imediata e cancelamento gratuito na Discover Cars.",
    badge: "✈️ AEROPORTO CONGONHAS (CGH)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-viracopos-campinas",
    titulo: "Aluguel de Carros no Aeroporto de Viracopos (VCP) Campinas com Desconto",
    h1: "Aluguel de Carros no Aeroporto de Viracopos (VCP) Campinas",
    metaDesc: "Melhores preços de locação de veículos no Aeroporto de Viracopos em Campinas. SUVs e econômicos com seguro incluso.",
    badge: "✈️ AEROPORTO VIRACOPOS (VCP)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-galeao-rio-de-janeiro",
    titulo: "Aluguel de Carros no Aeroporto do Galeão (GIG) Rio de Janeiro — 70% OFF",
    h1: "Aluguel de Carros no Aeroporto Internacional do Galeão (GIG) Rio",
    metaDesc: "Compare todas as locadoras no Galeão Rio de Janeiro e garanta até 70% OFF com proteção total e cancelamento gratuito.",
    badge: "✈️ AEROPORTO GALEÃO (GIG)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-santos-dumont-rio",
    titulo: "Aluguel de Carros no Aeroporto Santos Dumont (SDU) Rio de Janeiro",
    h1: "Aluguel de Carros no Aeroporto Santos Dumont (SDU) Rio de Janeiro",
    metaDesc: "Locação rápida de carros no centro do Rio de Janeiro no Aeroporto Santos Dumont com seguro e quilometragem livre.",
    badge: "✈️ SANTOS DUMONT (SDU)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-brasilia-aeroporto",
    titulo: "Aluguel de Carros Executivos no Aeroporto de Brasília (BSB)",
    h1: "Aluguel de Carros Executivos e SUVs no Aeroporto de Brasília (BSB)",
    metaDesc: "Alugue veículos executivos e utilitários em Brasília com desconto corporativo de até 70% na Discover Cars.",
    badge: "✈️ AEROPORTO BRASÍLIA (BSB)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-confins-belo-horizonte",
    titulo: "Aluguel de Carros no Aeroporto de Confins (CNF) Belo Horizonte",
    h1: "Aluguel de Carros no Aeroporto Internacional de Confins (CNF)",
    metaDesc: "Economize na locação de veículos em Belo Horizonte e Confins. Sem taxas surpresa no balcão e cancelamento grátis.",
    badge: "✈️ CONFINS BH (CNF)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-curitiba-afonso-pena",
    titulo: "Aluguel de Carros no Aeroporto Afonso Pena (CWB) Curitiba",
    h1: "Aluguel de Carros no Aeroporto Afonso Pena (CWB) Curitiba",
    metaDesc: "Compare ofertas de locadoras em Curitiba e retire seu carro no Aeroporto Afonso Pena com a melhor tarifa garantida.",
    badge: "✈️ CURITIBA (CWB)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-porto-alegre-salgado-filho",
    titulo: "Aluguel de Carros no Aeroporto Salgado Filho (POA) Porto Alegre",
    h1: "Aluguel de Carros no Aeroporto Salgado Filho (POA) Porto Alegre",
    metaDesc: "Locação de veículos em Porto Alegre e Serra Gaúcha com até 70% de desconto e suporte 24h em português.",
    badge: "✈️ PORTO ALEGRE (POA)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-florianopolis-aeroporto",
    titulo: "Aluguel de Carros no Aeroporto de Florianópolis (FLN) — Ilha da Magia",
    h1: "Aluguel de Carros no Aeroporto de Florianópolis (FLN)",
    metaDesc: "Descubra as melhores praias de Floripa com seu carro alugado com desconto. Cancelamento grátis até 48 horas antes.",
    badge: "✈️ FLORIANÓPOLIS (FLN)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-salvador-aeroporto",
    titulo: "Aluguel de Carros no Aeroporto de Salvador (SSA) Bahia",
    h1: "Aluguel de Carros no Aeroporto Internacional de Salvador (SSA)",
    metaDesc: "Alugue seu carro em Salvador Bahia com o menor preço garantido e explore o litoral norte com tranquilidade.",
    badge: "✈️ SALVADOR (SSA)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-recife-aeroporto",
    titulo: "Aluguel de Carros no Aeroporto de Recife (REC) Guararapes",
    h1: "Aluguel de Carros no Aeroporto do Recife (REC) — Porto de Galinhas",
    metaDesc: "Melhor tarifa de locação em Recife para viajar até Porto de Galinhas, Carneiros e Maragogi.",
    badge: "✈️ RECIFE (REC)",
    lang: "pt"
  },
  {
    slug: "aluguel-carros-fortaleza-aeroporto",
    titulo: "Aluguel de Carros no Aeroporto de Fortaleza (FOR) Pinto Martins",
    h1: "Aluguel de Carros no Aeroporto de Fortaleza (FOR) Ceará",
    metaDesc: "Locação de SUVs e compactos em Fortaleza para conhecer Jericoacoara, Canoa Quebrada e Cumbuco.",
    badge: "✈️ FORTALEZA (FOR)",
    lang: "pt"
  },
  {
    slug: "aluguel-de-carros-promocoes-hoje",
    titulo: "Promoções de Aluguel de Carros Hoje no Brasil e no Exterior — Até 70% OFF",
    h1: "Promoções Relâmpago de Aluguel de Carros Hoje (Até 70% OFF)",
    metaDesc: "Compare mais de 500 locadoras no Brasil e no mundo em um só lugar. Preços claros, sem taxas ocultas e cancelamento grátis.",
    badge: "🔥 PROMOÇÃO RELÂMPAGO HOJE",
    lang: "pt"
  }
];

const INTERNATIONAL_AIRPORT_ROUTES = [
  {
    slug: "luxury-car-hire-suv-rentals-tokyo-haneda",
    titulo: "Luxury Car Hire and SUV Rentals Online in Tokyo Haneda (HND)",
    h1: "Luxury Car Hire and SUV Rentals Online — Tokyo Haneda Airport",
    metaDesc: "Compare luxury car hire, executive sedans, and SUV rentals at Tokyo Haneda Airport (HND). Save up to 70% with free cancellation up to 48h.",
    badge: "🇯🇵 TOKYO HANEDA (HND)",
    lang: "en",
    airport: "Tokyo Haneda (HND)"
  },
  {
    slug: "compare-save-business-fleet-car-rentals",
    titulo: "Compare and Save up to 70% on Business Fleet Car Rentals Worldwide",
    h1: "Compare & Save up to 70% on Business Fleet & Executive Car Rentals",
    metaDesc: "Exclusive corporate rates and executive fleet car rentals worldwide. Full coverage insurance and 24/7 dedicated support.",
    badge: "💼 BUSINESS FLEET RENTALS",
    lang: "en",
    airport: "Global Business Fleet"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-mia-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Miami (MIA) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Miami Airport (MIA)",
    metaDesc: "Find cheap car rentals at Miami International Airport. Compare 50+ rental brands with zero hidden fees and free cancellation.",
    badge: "🇺🇸 MIAMI AIRPORT (MIA)",
    lang: "en",
    airport: "Miami International (MIA)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-mco-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Orlando (MCO) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Orlando Airport (MCO)",
    metaDesc: "Rent SUVs, minivans, and compact cars in Orlando near Disney & Universal Studios. Save up to 70% on Discover Cars.",
    badge: "🇺🇸 ORLANDO AIRPORT (MCO)",
    lang: "en",
    airport: "Orlando International (MCO)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-jfk-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near New York (JFK) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near New York JFK Airport",
    metaDesc: "Compare car rentals at New York JFK Airport. Full insurance coverage, unlimited mileage, and clear prices.",
    badge: "🇺🇸 NEW YORK JFK (JFK)",
    lang: "en",
    airport: "New York JFK (JFK)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-lax-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Los Angeles (LAX) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Los Angeles Airport (LAX)",
    metaDesc: "Explore California with cheap car hire at LAX Airport. Convertibles, SUVs, and electric cars with free cancellation.",
    badge: "🇺🇸 LOS ANGELES (LAX)",
    lang: "en",
    airport: "Los Angeles International (LAX)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-lhr-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near London Heathrow (LHR)",
    h1: "Best Car Rental Deals with Free Cancellation near London Heathrow (LHR)",
    metaDesc: "Rent a car at London Heathrow Airport with no hidden fees. Instant online booking and 24/7 customer service.",
    badge: "🇬🇧 LONDON HEATHROW (LHR)",
    lang: "en",
    airport: "London Heathrow (LHR)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-cdg-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Paris Charles de Gaulle (CDG)",
    h1: "Best Car Rental Deals with Free Cancellation near Paris CDG Airport",
    metaDesc: "Affordable car rental at Paris Charles de Gaulle Airport. Explore France with unlimited mileage and full protection.",
    badge: "🇫🇷 PARIS CDG (CDG)",
    lang: "en",
    airport: "Paris Charles de Gaulle (CDG)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-lis-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Lisbon (LIS) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Lisbon Airport (LIS)",
    metaDesc: "Hire a car in Lisbon Portugal at the best rates. Discover Sintra, Cascais, and Algarve with free cancellation up to 48h.",
    badge: "🇵🇹 LISBON AIRPORT (LIS)",
    lang: "en",
    airport: "Lisbon Humberto Delgado (LIS)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-mad-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Madrid Barajas (MAD)",
    h1: "Best Car Rental Deals with Free Cancellation near Madrid Barajas Airport",
    metaDesc: "Compare top car rental companies in Madrid Airport. Guaranteed cheapest prices and comprehensive insurance options.",
    badge: "🇪🇸 MADRID BARAJAS (MAD)",
    lang: "en",
    airport: "Madrid Barajas (MAD)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-dxb-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Dubai (DXB) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Dubai Airport (DXB)",
    metaDesc: "Rent luxury, sport, and economy cars at Dubai International Airport. No credit card surcharges and clear terms.",
    badge: "🇦🇪 DUBAI AIRPORT (DXB)",
    lang: "en",
    airport: "Dubai International (DXB)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-fra-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Frankfurt (FRA) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Frankfurt Airport (FRA)",
    metaDesc: "Top car hire offers at Frankfurt Airport Germany. Fast pickup, GPS navigation, and unlimited Autobahn mileage.",
    badge: "🇩🇪 FRANKFURT AIRPORT (FRA)",
    lang: "en",
    airport: "Frankfurt Main (FRA)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-ams-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Amsterdam (AMS) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Amsterdam Schiphol Airport",
    metaDesc: "Car rental at Amsterdam Schiphol Airport. Compare electric, hybrid, and compact vehicles with 70% discount.",
    badge: "🇳🇱 AMSTERDAM SCHIPHOL (AMS)",
    lang: "en",
    airport: "Amsterdam Schiphol (AMS)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-syd-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Sydney (SYD) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Sydney Kingsford Smith Airport",
    metaDesc: "Hire a car at Sydney Airport Australia. Drive along the Pacific Coast with full coverage and zero excess options.",
    badge: "🇦🇺 SYDNEY AIRPORT (SYD)",
    lang: "en",
    airport: "Sydney Kingsford Smith (SYD)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-cun-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Cancun (CUN) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Cancun Airport (CUN)",
    metaDesc: "Explore Riviera Maya, Tulum, and Playa del Carmen with cheap car rental from Cancun Airport.",
    badge: "🇲🇽 CANCUN AIRPORT (CUN)",
    lang: "en",
    airport: "Cancun International (CUN)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-eze-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Buenos Aires (EZE) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Buenos Aires Ezeiza Airport",
    metaDesc: "Rent a car in Buenos Aires Argentina at Ezeiza Airport. Best price guarantee and 24/7 roadside assistance.",
    badge: "🇦🇷 BUENOS AIRES (EZE)",
    lang: "en",
    airport: "Buenos Aires Ezeiza (EZE)"
  },
  {
    slug: "best-car-rental-deals-free-cancellation-scl-airport",
    titulo: "Best Car Rental Deals with Free Cancellation near Santiago (SCL) Airport",
    h1: "Best Car Rental Deals with Free Cancellation near Santiago de Chile Airport",
    metaDesc: "Car hire at Santiago Airport Chile. Travel to Andes, Valparaíso, and wine valleys with unlimited mileage.",
    badge: "🇨🇱 SANTIAGO AIRPORT (SCL)",
    lang: "en",
    airport: "Santiago Arturo Merino Benítez (SCL)"
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Patrocinador Oficial de Locação &amp; Frotas Globais</div>
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

function renderVehicleCards(isEn = false) {
  return VEHICLE_FLEET.map(v => {
    const ctaText = isEn ? "👉 Check Availability & Book on Discover Cars →" : "👉 Verificar Disponibilidade & Reservar na Discover Cars →";
    const perDayText = isEn ? "/ day" : "/ dia";
    const fromTableText = isEn ? "Regular Rate:" : "De Tabela:";
    const promoText = isEn ? "Deal Today:" : "Tarifa Hoje:";

    const benefits = v.vantagens.map(b => `
      <li class="flex items-center gap-2 text-xs text-slate-300">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>${b}</span>
      </li>
    `).join('');

    return `
    <div class="bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-5 md:p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[11px]">${v.categoria}</span>
          <span class="text-emerald-400 font-black text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">${v.desconto}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white mb-1.5 leading-snug">${v.modelo}</h3>
        <div class="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-3">
          <span>⚙️ ${v.cambio}</span>
          <span>🚪 ${v.portas}</span>
          <span>🧳 ${v.bagagem}</span>
        </div>
        <div class="p-2.5 rounded-xl bg-black/40 border border-slate-800 text-[11px] text-slate-300 mb-4">
          <span class="text-amber-400 font-bold">🛡️ ${v.seguro}</span>
        </div>
        <ul class="space-y-1.5 mb-4">
          ${benefits}
        </ul>
      </div>

      <div class="pt-3 border-t border-slate-800">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">${fromTableText}</span>
            <span class="text-xs text-slate-500 line-through">${v.de}</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase text-emerald-400 font-bold block">${promoText}</span>
            <span class="text-xl font-black text-emerald-400">${v.por}</span>
          </div>
        </div>

        <a href="${DISCOVER_CARS_BASE_LINK}" data-discovercars="true" data-rental="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs md:text-sm rounded-xl text-center shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>${ctaText}</span>
        </a>
      </div>
    </div>
    `;
  }).join('\n');
}

function renderCarRentalPage({ slug, title, h1, metaDesc, badge, lang = "pt", cityName = "", uf = "" }) {
  const isEn = lang === "en";
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/aluguel-carros/${slug}`;
  
  const tarjaText = isEn 
    ? "⚡ CLEAR PRICES, NO SURPRISES - FREE CANCELLATION UP TO 48H" 
    : "⚡ PREÇOS CLAROS, SEM TAXAS OCULTAS — CANCELAMENTO GRÁTIS ATÉ 48H";

  const bannerScarcity = isEn
    ? "🚨 LAST-MINUTE RATE DROP: COMPARE 500+ CAR RENTAL COMPANIES WITH UP TO 70% OFF"
    : "🚨 DESCONTO DE ÚLTIMA HORA: COMPARE MAIS DE 500 LOCADORAS COM ATÉ 70% OFF";

  const timerLabel = isEn ? "Special Rates Expire in:" : "Tarifas Especiais Expiram em:";
  const ctaHeroText = isEn ? "👉 COMPARE ALL CARS ON DISCOVER CARS WITH 70% OFF →" : "👉 COMPARAR TODAS AS LOCADORAS NA DISCOVER CARS COM 70% OFF →";
  const guaranteesText = isEn
    ? `<span>🔒 100% Secure Booking</span><span>⚡ Instant Confirmation</span><span>🛡️ 24/7 Multilingual Support</span>`
    : `<span>🔒 Reserva 100% Segura</span><span>⚡ Confirmação Imediata</span><span>🛡️ Suporte 24h em Português</span>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "name": h1,
    "description": metaDesc,
    "provider": {
      "@type": "Organization",
      "name": "Discover Cars / AQUITEM Logística",
      "url": "https://www.aquitemachadinhos.com.br"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": isEn ? "USD" : "BRL",
      "price": isEn ? "19.00" : "57.00",
      "availability": "https://schema.org/InStock",
      "url": DISCOVER_CARS_BASE_LINK
    }
  };

  const vehicleCardsHtml = renderVehicleCards(isEn);

  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'pt-BR'}" class="dark">
<head>
  <!-- ULTRA HIGH-SPEED PRELOADS & PERIMETRAL MONETIZATION (< 10ms) -->
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="dns-prefetch" href="//p2pdh.com" />
  <link rel="preconnect" href="//p2pdh.com" crossorigin />
  <link rel="dns-prefetch" href="//www.discovercars.com" />
  <link rel="preconnect" href="//www.discovercars.com" crossorigin />
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

  <title>${title} | AQUITEM Discover Cars</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="https://www.aquitemachadinhos.com.br/assets/og-image.png">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #040711; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .pulse-scarcity { animation: pulse-red 1.2s infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
    .glass-gold { background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(245, 158, 11, 0.3); box-shadow: 0 0 35px rgba(245, 158, 11, 0.1); }
    .gold-glow { text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">

  <!-- TOP STRIP: CLEAR PRICES, NO SURPRISES -->
  <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    ${tarjaText}
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-amber-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/aluguel-carros" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 text-black flex items-center justify-center font-black text-xs shadow-md">🚗</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Discover Cars Partner</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/" class="hidden sm:inline-block text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">${isEn ? 'Home' : 'Início'}</a>
        <span class="text-[11px] px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
          ${isEn ? 'Official Partner' : 'Parceiro Oficial'}
        </span>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    
    <!-- BARRA DE ESCASSEZ COM CRONÔMETRO REGRESSIVO EM JS PURO (4 A 11 MINUTOS) -->
    <div class="mb-6 p-3 bg-red-950/70 border border-red-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-red-200 shadow-xl">
      <div class="flex items-center gap-2 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-scarcity"></span>
        <span>${bannerScarcity}</span>
      </div>
      <div class="font-mono font-bold bg-red-900/80 px-3 py-1 rounded-xl border border-red-500/40 text-white flex items-center gap-1.5">
        <span>${timerLabel}</span>
        <span id="countdownTimer" class="text-yellow-300 font-black">06:42</span>
      </div>
    </div>

    <!-- BANNER TOPO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- CARD HERO COM TÍTULO E GATILHOS -->
    <div class="mb-8 rounded-3xl glass-gold p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 uppercase tracking-wider">
          ${badge}
        </span>
        <span class="text-emerald-400 font-semibold text-xs">${isEn ? '⚡ Zero Hidden Fees • 48h Free Cancellation' : '⚡ Sem Taxas Ocultas • Cancelamento Grátis 48h'}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight gold-glow">
        ${h1}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${metaDesc} ${isEn ? 'Compare deals from top suppliers including Hertz, Avis, Europcar, Alamo, Sixt and Localiza in one place.' : 'Compare tarifas de mais de 500 locadoras consagradas como Localiza, Movida, Unidas, Hertz, Avis e Sixt em uma única busca.'}
      </p>

      <!-- DESTAQUES RÁPIDOS -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Max Savings' : 'Economia'}</span>
          <span class="text-base font-black text-emerald-400">Até 70% OFF</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Cancellation' : 'Cancelamento'}</span>
          <span class="text-base font-black text-white">${isEn ? 'Free up to 48h' : 'Grátis até 48h'}</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Suppliers' : 'Locadoras'}</span>
          <span class="text-base font-black text-amber-400">500+ Globais</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Support' : 'Atendimento'}</span>
          <span class="text-base font-black text-indigo-400">24/7 Live</span>
        </div>
      </div>

      <!-- BOTÃO DE AÇÃO DIRETO COM DISCOVER CARS -->
      <div class="pt-2">
        <a href="${DISCOVER_CARS_BASE_LINK}" data-discovercars="true" data-rental="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-amber-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>${ctaHeroText}</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center mt-3">
          ${guaranteesText}
        </div>
      </div>
    </div>

    <!-- GRADE DE VEÍCULOS DISPONÍVEIS -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg md:text-2xl font-black text-white">${isEn ? 'Featured Rental Categories & Top Deals' : 'Categorias de Veículos em Destaque com Tarifa Promocional'}</h2>
        <span class="text-xs text-amber-400 font-bold">${isEn ? 'Clear Prices Guaranteed' : 'Preços Claros Garantidos'}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${vehicleCardsHtml}
      </div>
    </div>

    <!-- BANNER MEIO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- SEÇÃO DE VANTAGENS DISCOVER CARS -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
      <h3 class="text-lg font-bold text-white mb-4">${isEn ? 'Why Book Your Car Rental via Discover Cars & AQUITEM?' : 'Por que Reservar seu Carro pela Discover Cars no AQUITEM?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">⚡ ${isEn ? 'No Hidden Charges' : 'Sem Taxas Ocultas'}</div>
          <p>${isEn ? 'All mandatory taxes, fees, and standard extras are included in the quote. What you see is what you pay.' : 'Todos os impostos, taxas obrigatórias e coberturas básicas já estão inclusos na cotação. Sem surpresas no balcão.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">🛡️ ${isEn ? 'Full Coverage Protection' : 'Proteção Total Relax'}</div>
          <p>${isEn ? 'Optional full insurance cover with zero deductible for complete peace of mind during your entire road trip.' : 'Opção de cobertura total com franquia reduzida a zero para você viajar com tranquilidade total.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-amber-400 font-black text-base mb-1">🔄 ${isEn ? 'Free 48h Cancellation' : 'Cancelamento Grátis até 48h'}</div>
          <p>${isEn ? 'Plans changed? Cancel your booking up to 48 hours before pickup with a 100% full refund guarantee.' : 'Seus planos mudaram? Cancele sua reserva sem custos até 48 horas antes da retirada com reembolso integral.'}</p>
        </div>
      </div>
    </div>

    <!-- NAVEGAÇÃO DE ROTAS E AEROPORTOS -->
    <div class="mt-8 pt-6 border-t border-slate-800">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">${isEn ? 'Browse Other Major Car Rental Hubs:' : 'Navegue por Outros Destinos e Aeroportos Principais:'}</h4>
      <div class="flex flex-wrap gap-2 text-xs">
        <a href="/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Guarulhos (GRU)</a>
        <a href="/aluguel-carros/aluguel-carros-congonhas-sao-paulo.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Congonhas (CGH)</a>
        <a href="/aluguel-carros/aluguel-carros-galeao-rio-de-janeiro.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Galeão (GIG)</a>
        <a href="/aluguel-carros/aluguel-carros-viracopos-campinas.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Viracopos (VCP)</a>
        <a href="/aluguel-carros/best-car-rental-deals-free-cancellation-mia-airport.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Miami (MIA)</a>
        <a href="/aluguel-carros/best-car-rental-deals-free-cancellation-mco-airport.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Orlando (MCO)</a>
        <a href="/aluguel-carros/best-car-rental-deals-free-cancellation-jfk-airport.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">New York (JFK)</a>
        <a href="/aluguel-carros/luxury-car-hire-suv-rentals-tokyo-haneda.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Tokyo (HND)</a>
        <a href="/aluguel-carros/best-car-rental-deals-free-cancellation-lis-airport.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Lisbon (LIS)</a>
        <a href="/aluguel-carros/como-conseguir-desconto-locacao-veiculos-festa-peao-barretos.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Barretos 2026</a>
      </div>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Logística Veicular Global, Aluguel de Carros &amp; Discover Cars Official Partner.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO (LOOP DE 4 A 11 MINUTOS) -->
  <script>
    (function() {
      var totalSeconds = 6 * 60 + 42;
      var el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 15) {
          // Loop perpétuo de urgência entre 4 e 11 minutos
          totalSeconds = Math.floor(Math.random() * (11 - 4 + 1) + 4) * 60 + Math.floor(Math.random() * 50 + 10);
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

function renderCarRentalHub() {
  const nationalCards = SPECIAL_NATIONAL_ROUTES.map(r => `
    <a href="/aluguel-carros/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/60 transition group flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-amber-400 font-semibold">
        <span>Cotar com 70% OFF</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const intlCards = INTERNATIONAL_AIRPORT_ROUTES.map(r => `
    <a href="/aluguel-carros/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/60 transition group flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-amber-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-amber-400 font-semibold">
        <span>Book Car with 70% OFF</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const cityLinks = Object.entries(CITIES_INFO).map(([key, city]) => `
    <a href="/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${key}.html" class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between">
      <span>🚗 ${city.name} (${city.uf})</span>
      <span class="text-amber-400 font-mono text-[11px]">70% OFF</span>
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
  <link rel="dns-prefetch" href="//www.discovercars.com" />
  <link rel="preconnect" href="//www.discovercars.com" crossorigin />
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

  <title>🚗 Aluguel de Carros Nacional e Internacional — Discover Cars | AQUITEM</title>
  <meta name="description" content="Portal oficial de comparação e reserva de aluguel de carros no Brasil e no exterior. Economize até 70% com cancelamento grátis até 48h e sem taxas ocultas na Discover Cars.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/aluguel-carros">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #040711; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    ⚡ PREÇOS CLAROS, SEM TAXAS OCULTAS — CANCELAMENTO GRÁTIS ATÉ 48H • DISCOVER CARS OFICIAL
  </div>

  <header class="sticky top-0 z-40 bg-black/90 border-b border-amber-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/aluguel-carros" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-xs shadow-md">🚗</span>
        <span>AQUITEM ALUGUEL DE CARROS</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-3xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">Rede Global Discover Cars</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Compare e Economize até 70% em Aluguel de Carros</h1>
      <p class="text-slate-400 text-xs md:text-sm">Mais de 500 locadoras no Brasil e no exterior comparadas em tempo real com garantia de menor tarifa e cancelamento flexível.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Aeroportos e Rotas em Destaque no Brasil</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${nationalCards}
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">International Airport Car Rental Deals (Free Cancellation)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${intlCards}
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-slate-800">
      <h2 class="text-lg md:text-xl font-bold text-white mb-2">Aluguel de Carros nas 64 Cidades do Brasil</h2>
      <p class="text-xs text-slate-400 mb-6">Selecione sua cidade para cotar as melhores locadoras locais com descontos exclusivos:</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${cityLinks}
      </div>
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Logística Veicular Global &amp; Discover Cars Official Partner.</p>
  </footer>
</body>
</html>`;
}

async function generateAllDiscoverCarsPages() {
  console.log("=======================================================");
  console.log("🚗 GERANDO MOTOR PROGRAMÁTICO DISCOVER CARS (ALUGUEL DE VEÍCULOS)");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];

  // 1. Rotas Nacionais e Aeroportos Especializados
  for (const r of SPECIAL_NATIONAL_ROUTES) {
    const html = renderCarRentalPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/aluguel-carros/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Nacional / Aeroporto] /aluguel-carros/${r.slug}.html`);
  }

  // 2. Rotas Internacionais (EN)
  for (const r of INTERNATIONAL_AIRPORT_ROUTES) {
    const html = renderCarRentalPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/aluguel-carros/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Internacional EN] /aluguel-carros/${r.slug}.html`);
  }

  // 3. Páginas Multicidade (64 Cidades x 2 Variações Comerciais)
  for (const [key, city] of Object.entries(CITIES_INFO)) {
    // 3.1 "Melhores locadoras de carros sem taxas ocultas em [Nome_da_Cidade]"
    const slugMelhores = `melhores-locadoras-carros-sem-taxas-ocultas-${key}`;
    const htmlMelhores = renderCarRentalPage({
      slug: slugMelhores,
      title: `Melhores Locadoras de Carros Sem Taxas Ocultas em ${city.name} - ${city.uf}`,
      h1: `Melhores Locadoras de Carros Sem Taxas Ocultas em ${city.name} (${city.uf})`,
      metaDesc: `Compare e alugue carros com até 70% de desconto e cancelamento gratuito em ${city.name} (${city.uf}). Preços claros e sem taxas surpresa na Discover Cars.`,
      badge: `📍 LOCADORAS EM ${city.name.toUpperCase()}`,
      lang: "pt",
      cityName: city.name,
      uf: city.uf
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugMelhores}.html`), htmlMelhores, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/aluguel-carros/${slugMelhores}`);

    // 3.2 "Aluguel de carros, SUVs e utilitários em [Nome_da_Cidade]"
    const slugUtilitarios = `aluguel-carros-utilitarios-suv-${key}`;
    const htmlUtilitarios = renderCarRentalPage({
      slug: slugUtilitarios,
      title: `Aluguel de Carros, Utilitários e SUVs em ${city.name} - ${city.uf}`,
      h1: `Aluguel de Carros, SUVs e Utilitários em ${city.name} (${city.uf})`,
      metaDesc: `Encontre as melhores ofertas de locação de SUVs, sedans e utilitários em ${city.name} - ${city.uf}. Seguro total incluso e retirada rápida.`,
      badge: `🚙 FROTA EM ${city.name.toUpperCase()}`,
      lang: "pt",
      cityName: city.name,
      uf: city.uf
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugUtilitarios}.html`), htmlUtilitarios, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/aluguel-carros/${slugUtilitarios}`);
  }

  // 4. Central Hub Index (/aluguel-carros)
  const hubHtml = renderCarRentalHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push('https://www.aquitemachadinhos.com.br/aluguel-carros');

  console.log("\n=======================================================");
  console.log(`🏆 TOTAL: ${generatedUrls.length} PÁGINAS DE ALUGUEL DE CARROS GERADAS COM SUCESSO!`);
  console.log("=======================================================\n");

  return generatedUrls;
}

if (require.main === module) {
  generateAllDiscoverCarsPages().catch(console.error);
}

module.exports = { generateAllDiscoverCarsPages, VEHICLE_FLEET, SPECIAL_NATIONAL_ROUTES, INTERNATIONAL_AIRPORT_ROUTES, DISCOVER_CARS_BASE_LINK };
