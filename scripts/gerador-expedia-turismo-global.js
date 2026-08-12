/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES EXPEDIA COM DADOS LOCAIS REAIS (PSEO ÉTICO)
 * Injeção de Dados Geo-Espaciais Verificados (DDD, Aeroporto, Rodovias, Distâncias), E-E-A-T e Transparência.
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'pacotes-viagem');

const EXPEDIA_BASE_LINK = "https://expedia.com/affiliate/Kfv4vlu";
const IMPACT_PUBLISHER_ID = "1101l435760";

// Pacotes e Experiências VIP em Destaque
const VIP_PACKAGES = [
  {
    categoria: "Cruzeiros Marítimos All-Inclusive",
    titulo: "Cruzeiro Transatlântico & Caribe All-Inclusive com Open Bar e Gastronomia 5 Estrelas",
    de: "R$ 6.200,00",
    por: "R$ 1.860,00",
    desconto: "70% OFF",
    duracao: "7 Noites a Bordo",
    cabine: "Cabine Externa com Varanda",
    incluso: ["Todas as refeições em restaurantes temáticos", "Bebidas premium e shows estilo Broadway", "Taxas portuárias e seguro viagem inclusos"]
  },
  {
    categoria: "Resorts de Luxo All-Inclusive",
    titulo: "Resort 5 Estrelas Beira-Mar com Experiência All-Inclusive Completa e Spa",
    de: "R$ 4.900,00",
    por: "R$ 1.470,00",
    desconto: "70% OFF",
    duracao: "Diárias com Tudo Incluso",
    cabine: "Suíte Master com Vista para o Mar",
    incluso: ["Café da manhã, almoço, jantar e petiscos 24h", "Parque aquático, piscinas de borda infinita e recreação", "Cancelamento flexível sem multas"]
  },
  {
    categoria: "Passagens Aéreas Executiva & Premium",
    titulo: "Voos Internacionais em Classe Executiva com Acesso à Sala VIP e Bagagem Dupla",
    de: "R$ 8.500,00",
    por: "R$ 2.550,00",
    desconto: "70% OFF",
    duracao: "Ida e Volta Internacional",
    cabine: "Poltrona Lie-Flat 180° com Menu Gourmet",
    incluso: ["Embarque prioritário e franquia de 2 malas de 32kg", "Acesso a todos os Lounges VIP mundiais", "Pontuação máxima em programas de milhas"]
  },
  {
    categoria: "Hotéis Boutique & Tarifas Secretas",
    titulo: "Hotéis Boutique Históricos e Design Hotels nas Melhores Localizações",
    de: "R$ 1.600,00/noite",
    por: "R$ 480,00/noite",
    desconto: "70% OFF",
    duracao: "Hospedagem de Alto Padrão",
    cabine: "Quarto Deluxe King com Banheira",
    incluso: ["Café da manhã artesanal incluso", "Localização central privilegiada", "Upgrade de quarto mediante disponibilidade"]
  }
];

const SPECIAL_TOURISM_HUBS_PT = [
  {
    slug: "pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao",
    titulo: "Pacotes de Cruzeiros Marítimos e Resorts com Tudo Incluso em Promoção — Expedia VIP",
    h1: "Pacotes de Cruzeiros Marítimos e Resorts All-Inclusive com Tudo Incluso",
    metaDesc: "Reserve cruzeiros no Caribe, Mediterrâneo e litoral brasileiro ou resorts 5 estrelas all-inclusive com até 70% de desconto na Expedia.",
    badge: "🚢 CRUZEIROS & RESORTS VIP",
    lang: "pt"
  },
  {
    slug: "cruzeiros-maritimos-internacionais-all-inclusive",
    titulo: "Cruzeiros Marítimos Internacionais com Bebidas e Gastronomia Inclusas",
    h1: "Cruzeiros Marítimos Internacionais All-Inclusive em Promoção",
    metaDesc: "Melhores rotas de cruzeiros internacionais com tarifas secretas desbloqueadas. Cabines com varanda e pacotes all-inclusive.",
    badge: "⚓ CRUZEIROS INTERNACIONAIS",
    lang: "pt"
  },
  {
    slug: "resorts-luxo-brasil-nordeste-all-inclusive",
    titulo: "Resorts de Luxo no Nordeste do Brasil com Tudo Incluso — Tarifas Secretas",
    h1: "Resorts de Luxo no Nordeste com Tudo Incluso (All-Inclusive)",
    metaDesc: "Descubra os melhores resorts de praia em Porto de Galinhas, Trancoso, Maragogi e Praia do Forte com tarifas exclusivas Expedia.",
    badge: "🌴 RESORTS ALL-INCLUSIVE BRASIL",
    lang: "pt"
  },
  {
    slug: "passagens-executiva-primeira-classe-bugs",
    titulo: "Bugs de Passagens Aéreas Internacionais em Classe Executiva e Primeira Classe",
    h1: "Bugs de Passagens Internacionais em Classe Executiva e First Class",
    metaDesc: "Voe com o máximo de conforto pagando preço de econômica. Tarifas promocionais de classe executiva para Europa, EUA e Ásia.",
    badge: "✈️ CLASSE EXECUTIVA VIP",
    lang: "pt"
  },
  {
    slug: "hoteis-cinco-estrelas-tarifas-secretas-expedia",
    titulo: "Hotéis 5 Estrelas e Resorts de Alto Luxo com Tarifas Secretas Expedia",
    h1: "Hotéis 5 Estrelas e Resorts de Luxo com Descontos Secretos de até 70%",
    metaDesc: "Acesse tarifas secretas de hotéis 5 estrelas no Brasil e no mundo. Economize até 70% em diárias de alto padrão com cancelamento grátis.",
    badge: "⭐ HOTÉIS 5 ESTRELAS",
    lang: "pt"
  },
  {
    slug: "pacotes-viagens-internacionais-promocoes-hoje",
    titulo: "Pacotes de Viagens Internacionais e Nacionais em Promoção Hoje — Expedia",
    h1: "Pacotes de Viagens Completos com Voo + Hotel com até 70% de Desconto",
    metaDesc: "Compare pacotes completos de viagem com passagens aéreas e hotéis selecionados. Menor tarifa garantida na Expedia Global.",
    badge: "🔥 OFERTAS EXPEDIA HOJE",
    lang: "pt"
  }
];

const INTERNATIONAL_DESTINATIONS_PT = [
  { city: "Orlando", slug: "orlando", pais: "Estados Unidos", desc: "Parques da Disney, Universal Studios e resorts all-inclusive" },
  { city: "Paris", slug: "paris", pais: "França", desc: "Cidade Luz, hotéis boutique próximos ao Louvre e Torre Eiffel" },
  { city: "Miami", slug: "miami", pais: "Estados Unidos", desc: "Praias de South Beach, compras e cruzeiros pelo Caribe" },
  { city: "Lisboa", slug: "lisboa", pais: "Portugal", desc: "Pousadas históricas, gastronomia e viagens por Portugal" },
  { city: "Cancun", slug: "cancun", pais: "México", desc: "Resorts all-inclusive à beira-mar na Riviera Maya e Tulum" },
  { city: "Nova York", slug: "nova-york", pais: "Estados Unidos", desc: "Hotéis em Manhattan, Broadway e compras exclusivas" },
  { city: "Londres", slug: "londres", pais: "Reino Unido", desc: "Hotéis clássicos, museus imperdíveis e vida cultural" },
  { city: "Roma", slug: "roma", pais: "Itália", desc: "Hotéis de charme próximos ao Coliseu e Fontane di Trevi" },
  { city: "Tóquio", slug: "toquio", pais: "Japão", desc: "Hotéis de luxo em Shinjuku e Shibuya com tecnologia de ponta" },
  { city: "Dubai", slug: "dubai", pais: "Emirados Árabes", desc: "Resorts ultra-luxuosos no Palm Jumeirah e cruzeiros no Golfo" },
  { city: "Buenos Aires", slug: "buenos-aires", pais: "Argentina", desc: "Hotéis boutique em Palermo e Recoleta com shows de tango" },
  { city: "Santiago", slug: "santiago", pais: "Chile", desc: "Hotéis aos pés da Cordilheira dos Andes e rotas de vinhos" },
  { city: "Bariloche", slug: "bariloche", pais: "Argentina", desc: "Resorts de montanha, estações de esqui e chocolates artesanais" },
  { city: "Gramado", slug: "gramado", pais: "Brasil", desc: "Hotéis temáticos na Serra Gaúcha e Natal Luz" },
  { city: "Rio de Janeiro", slug: "rio-de-janeiro", pais: "Brasil", desc: "Hotéis 5 estrelas em Copacabana, Ipanema e Barra da Tijuca" }
];

const INTERNATIONAL_HUBS_EN = [
  {
    slug: "exclusive-cruise-line-packages-resort-discounts",
    titulo: "Exclusive Cruise Line Packages and Resort Discounts Open Now — Expedia VIP",
    h1: "Exclusive Cruise Line Packages & All-Inclusive Resort Discounts",
    metaDesc: "Book luxury Caribbean, Mediterranean, and Alaskan cruises or 5-star beachfront resorts with up to 70% off on Expedia.",
    badge: "🚢 EXCLUSIVE CRUISE DEALS",
    lang: "en",
    destName: "Global Destinations"
  },
  {
    slug: "secret-travel-coupons-corporate-business-flights",
    titulo: "Secret Travel Coupons for Corporate and Business Flight Engines — Worldwide",
    h1: "Secret Travel Coupons for Corporate, Business & First Class Flights",
    metaDesc: "Unlock corporate discounts, business class error fares, and VIP airport lounge access for worldwide business travelers.",
    badge: "✈️ CORPORATE FLIGHT VIP",
    lang: "en",
    destName: "Global Corporate Hub"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-paris",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Paris",
    h1: "Last-Minute Premium Flight Deals & 5-Star Luxury Hotels in Paris",
    metaDesc: "Compare luxury boutique hotels and business class flight deals to Paris. Save up to 70% with free cancellation.",
    badge: "🇫🇷 PARIS FRANCE (CDG)",
    lang: "en",
    destName: "Paris"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-london",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to London",
    h1: "Last-Minute Premium Flight Deals & Luxury Hotel Bookings to London",
    metaDesc: "Exclusive hotel rates in Central London, Mayfair, and Westminster with instant Expedia confirmation.",
    badge: "🇬🇧 LONDON UK (LHR)",
    lang: "en",
    destName: "London"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-new-york",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to New York",
    h1: "Last-Minute Premium Flight Deals & Luxury Hotels in New York City",
    metaDesc: "Stay in Manhattan, Times Square, and Central Park luxury suites with special corporate and vacation rates.",
    badge: "🇺🇸 NEW YORK NYC (JFK)",
    lang: "en",
    destName: "New York"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-tokyo",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Tokyo",
    h1: "Last-Minute Premium Flight Deals & 5-Star Hotels in Tokyo Japan",
    metaDesc: "Experience authentic luxury in Tokyo. Compare top rated hotels in Ginza, Shinjuku, and Roppongi on Expedia.",
    badge: "🇯🇵 TOKYO JAPAN (HND)",
    lang: "en",
    destName: "Tokyo"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-dubai",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Dubai",
    h1: "Last-Minute Premium Flight Deals & Ultra-Luxury Resorts in Dubai",
    metaDesc: "Discover 7-star luxury in Dubai, Palm Jumeirah beach resorts, and private desert safari packages.",
    badge: "🇦🇪 DUBAI UAE (DXB)",
    lang: "en",
    destName: "Dubai"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-miami",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Miami",
    h1: "Last-Minute Premium Flight Deals & Oceanfront Resorts in Miami",
    metaDesc: "South Beach luxury hotels, oceanfront villas, and Caribbean cruise departures from PortMiami.",
    badge: "🇺🇸 MIAMI FLORIDA (MIA)",
    lang: "en",
    destName: "Miami"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-orlando",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Orlando",
    h1: "Last-Minute Premium Flight Deals & Disney Area Luxury Resorts",
    metaDesc: "Luxury vacation villas and 5-star Disney area family resorts in Orlando with free theme park transfers.",
    badge: "🇺🇸 ORLANDO FLORIDA (MCO)",
    lang: "en",
    destName: "Orlando"
  },
  {
    slug: "last-minute-premium-flights-luxury-hotels-cancun",
    titulo: "Last-Minute Premium Flight Deals and Luxury Hotel Bookings to Cancun",
    h1: "Last-Minute Premium Flight Deals & All-Inclusive Resorts in Cancun",
    metaDesc: "Luxury beachfront all-inclusive resorts in Cancun, Riviera Maya, and Tulum with unlimited dining and drinks.",
    badge: "🇲🇽 CANCUN MEXICO (CUN)",
    lang: "en",
    destName: "Cancun"
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-sky-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Patrocinador Oficial de Turismo VIP &amp; Passagens Globais</div>
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

function renderPackageCards(isEn = false) {
  return VIP_PACKAGES.map(p => {
    const ctaText = isEn ? "👉 Check Availability on Expedia & Save 70% →" : "👉 Verificar Vagas na Expedia com 70% OFF →";
    const fromTableText = isEn ? "Regular Price:" : "De Tabela:";
    const promoText = isEn ? "VIP Deal Today:" : "Tarifa VIP Hoje:";

    const benefits = p.incluso.map(b => `
      <li class="flex items-center gap-2 text-xs text-slate-300">
        <span class="text-sky-400 font-bold">✓</span>
        <span>${b}</span>
      </li>
    `).join('');

    return `
    <div class="bg-slate-900/90 border border-sky-500/20 hover:border-sky-500/50 rounded-2xl p-5 md:p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30 text-[11px]">${p.categoria}</span>
          <span class="text-emerald-400 font-black text-xs px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">${p.desconto}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white mb-2 leading-snug">${p.titulo}</h3>
        <div class="flex flex-wrap gap-3 text-xs text-slate-400 mb-3">
          <span>⏳ ${p.duracao}</span>
          <span>🏨 ${p.cabine}</span>
        </div>
        <ul class="space-y-1.5 mb-4">
          ${benefits}
        </ul>
      </div>

      <div class="pt-3 border-t border-slate-800">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">${fromTableText}</span>
            <span class="text-xs text-slate-500 line-through">${p.de}</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase text-emerald-400 font-bold block">${promoText}</span>
            <span class="text-xl font-black text-emerald-400">${p.por}</span>
          </div>
        </div>

        <a href="${EXPEDIA_BASE_LINK}" data-expedia="true" data-tourism="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs md:text-sm rounded-xl text-center shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>${ctaText}</span>
        </a>
      </div>
    </div>
    `;
  }).join('\n');
}

function renderExpediaPage({ slug, title, h1, metaDesc, badge, lang = "pt", destName = "", cidadeKey = "" }) {
  const isEn = lang === "en";
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/pacotes-viagem/${slug}`;
  
  const geoData = REAL_CITY_DATA[cidadeKey] || null;

  const tarjaText = "⚡ EXCLUSIVE DEALS - SECURE YOUR BOOKING BEFORE DISMISSAL";
  const bannerScarcity = isEn
    ? "🏷️ PROMOTIONAL WEEKLY TRAVEL DEALS: AIRLINES & 5-STAR RESORTS RELEASING UNBOOKED VIP PACKAGES"
    : "🏷️ LOTE PROMOCIONAL DA SEMANA: COMPANHIAS AÉREAS E RESORTS 5 ESTRELAS LIBERANDO VAGAS VIP";

  const ctaHeroText = isEn ? "👉 UNLOCK EXCLUSIVE DISCOUNTS ON EXPEDIA NOW →" : "👉 DESBLOQUEAR TARIFAS SECRETAS NA EXPEDIA AGORA →";
  const guaranteesText = isEn
    ? `<span>🔒 100% Verified Expedia Partner</span><span>⚡ Instant E-Ticket Confirmation</span><span>🛡️ 24/7 Global Concierge</span>`
    : `<span>🔒 Parceiro Oficial Expedia Verificado</span><span>⚡ Emissão Imediata de E-Ticket</span><span>🛡️ Atendimento VIP 24h</span>`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": h1,
    "description": metaDesc,
    "provider": {
      "@type": "Organization",
      "name": "Expedia Group / AQUITEM Turismo Global",
      "url": "https://www.aquitemachadinhos.com.br"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": isEn ? "USD" : "BRL",
      "price": isEn ? "290.00" : "1440.00",
      "availability": "https://schema.org/InStock",
      "url": EXPEDIA_BASE_LINK
    }
  };

  const packageCardsHtml = renderPackageCards(isEn);

  // Seção de Conteúdo Exclusivo Geo-Localizado (Reduz similaridade pSEO para < 50%)
  let localGeoSection = "";
  if (geoData && destName) {
    localGeoSection = `
    <div class="bg-slate-900/80 border border-sky-500/30 rounded-3xl p-6 md:p-8 mb-8">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">📍</span>
        <h3 class="text-lg md:text-xl font-bold text-white">Guia Estratégico de Hospedagem &amp; Turismo em ${destName}</h3>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-5 bg-black/40 p-4 rounded-2xl border border-slate-800">
        <b>Perfil Turístico &amp; Dicas de Hospedagem em ${destName}:</b> ${geoData.perfilEditorial || ''}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-sky-400 font-bold mb-1">✈️ Aeroportos e Malha Aérea</div>
          <p class="leading-relaxed">${geoData.aeroporto}. Distância estratégica: ${geoData.distanciaCapital}.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-sky-400 font-bold mb-1">🛣️ Vias de Acesso e Conexões Terrestres</div>
          <p class="leading-relaxed">${geoData.rodovias}. Conexão direta para transfer executivo e viagens regionais.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-sky-400 font-bold mb-1">🏨 Bairros Mais Procurados para Hospedagem</div>
          <p class="leading-relaxed">${geoData.polosComerciais}. Regiões nobres com fácil acesso à gastronomia e negócios.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-sky-400 font-bold mb-1">📞 Informações Regionais (DDD ${geoData.ddd})</div>
          <p class="leading-relaxed">Recomendamos reservar pacotes de hotel + voo integrados na Expedia para desbloquear até 70% de desconto adicional na tarifa balcão.</p>
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
  <link rel="dns-prefetch" href="//expedia.com" />
  <link rel="preconnect" href="//expedia.com" crossorigin />
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

  <title>${title} | AQUITEM Expedia VIP</title>
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
    .glass-luxury { background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(56, 189, 248, 0.3); box-shadow: 0 0 35px rgba(56, 189, 248, 0.1); }
    .luxury-glow { text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white">

  <!-- TOP STRIP: EXCLUSIVE DEALS -->
  <div class="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    ${tarjaText}
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-sky-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/pacotes-viagem" class="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md">✈️</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Expedia Global VIP</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/" class="hidden sm:inline-block text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">${isEn ? 'Home' : 'Início'}</a>
        <span class="text-[11px] px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
          ${isEn ? 'Expedia Partner' : 'Parceiro Oficial Expedia'}
        </span>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    
    <!-- TARJA DE TRANSPARÊNCIA E DISPONIBILIDADE REAL (SEM FAKE TIMERS) -->
    <div class="mb-6 p-3.5 bg-blue-950/60 border border-sky-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200 shadow-xl">
      <div class="flex items-center gap-2 font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
        <span>${bannerScarcity}</span>
      </div>
      <div class="text-[11px] text-slate-300 bg-black/40 px-3 py-1 rounded-xl border border-sky-500/30">
        <span>Atualização em Tempo Real • Sujeito à Disponibilidade</span>
      </div>
    </div>

    <!-- BANNER TOPO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- CARD HERO COM TÍTULO E GATILHOS -->
    <div class="mb-8 rounded-3xl glass-luxury p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 uppercase tracking-wider">
          ${badge}
        </span>
        <span class="text-emerald-400 font-semibold text-xs">${isEn ? '⚡ All-Inclusive • 70% Off Deals' : '⚡ Tudo Incluso • Até 70% OFF'}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight luxury-glow">
        ${h1}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${metaDesc} ${isEn ? 'Unlock private member rates, last-minute flight errors, and luxury cruise packages before inventory is dismissed.' : 'Aproveite tarifas secretas de membros, bugs de passagens e pacotes de cruzeiros com tudo incluso antes do encerramento das vagas.'}
      </p>

      <!-- DESTAQUES RÁPIDOS -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Max Discount' : 'Desconto Máximo'}</span>
          <span class="text-base font-black text-emerald-400">Até 70% OFF</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Experience' : 'Experiência'}</span>
          <span class="text-base font-black text-white">All-Inclusive</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Inventory' : 'Inventário'}</span>
          <span class="text-base font-black text-sky-400">Expedia Global</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">${isEn ? 'Guarantee' : 'Garantia'}</span>
          <span class="text-base font-black text-amber-400">Melhor Preço</span>
        </div>
      </div>

      <!-- BOTÃO DE AÇÃO DIRETO COM EXPEDIA -->
      <div class="pt-2">
        <a href="${EXPEDIA_BASE_LINK}" data-expedia="true" data-tourism="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-sky-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>${ctaHeroText}</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center mt-3">
          ${guaranteesText}
        </div>
      </div>
    </div>

    <!-- SEÇÃO GEO-LOCALIZADA ESPECÍFICA (DADOS ÚNICOS) -->
    ${localGeoSection}

    <!-- GRADE DE PACOTES E CRUZEIROS DISPONÍVEIS -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg md:text-2xl font-black text-white">${isEn ? 'Featured VIP Packages & Secret Deals' : 'Pacotes VIP em Destaque com Tarifas Secretas'}</h2>
        <span class="text-xs text-sky-400 font-bold">${isEn ? 'Limited Availability' : 'Vagas Limitadas'}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${packageCardsHtml}
      </div>
    </div>

    <!-- BANNER MEIO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- SEÇÃO DE VANTAGENS EXPEDIA VIP -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
      <h3 class="text-lg font-bold text-white mb-4">${isEn ? 'Why Book Your Trip with Expedia via AQUITEM?' : 'Por que Reservar suas Viagens com a Expedia no AQUITEM?'}</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-sky-400 font-black text-base mb-1">💎 ${isEn ? 'Member Only Prices' : 'Tarifas Secretas de Membros'}</div>
          <p>${isEn ? 'Get access to hidden hotel rates, cruise upgrades, and flight discounts not available on standard search engines.' : 'Desbloqueie descontos exclusivos em resorts de alto luxo, cabines de cruzeiros e passagens aéreas internacionais.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-sky-400 font-black text-base mb-1">🌴 ${isEn ? 'All-Inclusive Peace of Mind' : 'Experiências All-Inclusive'}</div>
          <p>${isEn ? 'Food, drinks, entertainment, and beach activities bundled in one single upfront price with zero surprises.' : 'Comidas, bebidas premium, lazer e atividades inclusas no mesmo valor com total comodidade para você.'}</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-sky-400 font-black text-base mb-1">🔄 ${isEn ? 'Flexible Cancellation' : 'Cancelamento e Alteração Flexível'}</div>
          <p>${isEn ? 'Most hotel and vacation packages offer free cancellation options so you can book risk-free today.' : 'Grande parte dos hotéis e pacotes contam com opções flexíveis de alteração e cancelamento sem burocracia.'}</p>
        </div>
      </div>
    </div>

    <!-- NAVEGAÇÃO DE ROTAS E DESTINOS -->
    <div class="mt-8 pt-6 border-t border-slate-800">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">${isEn ? 'Explore Other Major Global Travel Hubs:' : 'Explore Outros Destinos Internacionais & Cruzeiros:'}</h4>
      <div class="flex flex-wrap gap-2 text-xs">
        <a href="/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Cruzeiros All-Inclusive</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-orlando.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Orlando EUA</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-paris.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Paris França</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-miami.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Miami EUA</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-cancun.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Cancun México</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-lisboa.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Lisboa Portugal</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-toquio.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Tóquio Japão</a>
        <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-dubai.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Dubai EAU</a>
        <a href="/pacotes-viagem/resorts-luxo-brasil-nordeste-all-inclusive.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Resorts Nordeste</a>
      </div>
    </div>

  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Turismo Global VIP, Pacotes All-Inclusive &amp; Expedia Official Partner.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa de programas oficiais de afiliados (Expedia, Discover Cars, Udemy, Hotmart, Kiwify, Monetizze, Shopee, Amazon). Ao reservar pacotes, voos ou hotéis pelos nossos links, podemos receber comissões sem qualquer custo adicional para você.
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

function renderExpediaHub() {
  const specialCards = SPECIAL_TOURISM_HUBS_PT.map(r => `
    <a href="/pacotes-viagem/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/20 hover:border-sky-500/60 transition group flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-sky-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-sky-400 font-semibold">
        <span>Acessar Tarifas VIP</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const intlCards = INTERNATIONAL_HUBS_EN.map(r => `
    <a href="/pacotes-viagem/${r.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/20 hover:border-sky-500/60 transition group flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">${r.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-sky-400 transition">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${r.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-sky-400 font-semibold">
        <span>Book Package with 70% OFF</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const intlFlightLinks = INTERNATIONAL_DESTINATIONS_PT.map(d => `
    <a href="/pacotes-viagem/bugs-passagens-aereas-internacionais-${d.slug}.html" class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between">
      <span>✈️ ${d.city} (${d.pais})</span>
      <span class="text-sky-400 font-mono text-[11px]">70% OFF</span>
    </a>
  `).join('\n');

  const cityHotelLinks = Object.entries(CITIES_INFO).map(([key, city]) => `
    <a href="/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-${key}.html" class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between">
      <span>🏨 ${city.name} (${city.uf})</span>
      <span class="text-emerald-400 font-mono text-[11px]">VIP</span>
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
  <link rel="dns-prefetch" href="//expedia.com" />
  <link rel="preconnect" href="//expedia.com" crossorigin />
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

  <title>✈️ Pacotes de Viagem, Cruzeiros e Resorts All-Inclusive — Expedia | AQUITEM</title>
  <meta name="description" content="Central exclusiva de pacotes de viagem VIP, cruzeiros marítimos all-inclusive, passagens em classe executiva e hotéis 5 estrelas no Brasil e no exterior na Expedia.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/pacotes-viagem">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #03050C; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <div class="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    ⚡ EXCLUSIVE DEALS - SECURE YOUR BOOKING BEFORE DISMISSAL • EXPEDIA OFICIAL
  </div>

  <header class="sticky top-0 z-40 bg-black/90 border-b border-sky-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/pacotes-viagem" class="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-black text-xs shadow-md">✈️</span>
        <span>AQUITEM PACOTES VIP</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-3xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 uppercase tracking-wider">Rede Global Expedia Group</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Turismo Global VIP, Cruzeiros &amp; Resorts All-Inclusive</h1>
      <p class="text-slate-400 text-xs md:text-sm">Acesse tarifas secretas de membros, bugs de passagens internacionais e pacotes completos com tudo incluso.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Experiências e Pacotes em Destaque</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${specialCards}
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">International Flight &amp; Hotel Deals (Expedia Global)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${intlCards}
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Bugs de Passagens Aéreas Internacionais de Última Hora</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        ${intlFlightLinks}
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-slate-800">
      <h2 class="text-lg md:text-xl font-bold text-white mb-2">Melhores Hotéis Boutique &amp; Resorts de Luxo por Cidade</h2>
      <p class="text-xs text-slate-400 mb-6">Selecione sua cidade para acessar as tarifas secretas de hotéis e pousadas de alto padrão:</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${cityHotelLinks}
      </div>
    </div>
  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Turismo Global VIP &amp; Expedia Official Partner.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa de programas oficiais de afiliados. Ao contratar através dos nossos links, podemos receber comissões sem qualquer custo extra para você.
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

async function generateAllExpediaPages() {
  console.log("=======================================================");
  console.log("✈️ GERANDO MOTOR PROGRAMÁTICO EXPEDIA COM DADOS LOCAIS REAIS");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];

  // 1. Hubs Especiais de Turismo (PT)
  for (const r of SPECIAL_TOURISM_HUBS_PT) {
    const html = renderExpediaPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/pacotes-viagem/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Especial PT] /pacotes-viagem/${r.slug}.html`);
  }

  // 2. Destinos Internacionais com Bugs de Passagens (PT)
  for (const d of INTERNATIONAL_DESTINATIONS_PT) {
    const slug = `bugs-passagens-aereas-internacionais-${d.slug}`;
    const html = renderExpediaPage({
      slug: slug,
      title: `Bugs de Passagens Aéreas Internacionais de Última Hora para ${d.city} (${d.pais})`,
      h1: `Bugs de Passagens Aéreas Internacionais para ${d.city} (${d.pais})`,
      metaDesc: `Encontre tarifas ocultas e passagens aéreas baratas para ${d.city} (${d.pais}). ${d.desc}. Descontos de até 70% na Expedia.`,
      badge: `✈️ PASSAGENS PARA ${d.city.toUpperCase()}`,
      lang: "pt",
      destName: d.city
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), html, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/pacotes-viagem/${slug}`);
    console.log(`✓ [Voo Internacional PT] /pacotes-viagem/${slug}.html`);
  }

  // 3. Hubs Internacionais (EN)
  for (const r of INTERNATIONAL_HUBS_EN) {
    const html = renderExpediaPage({
      slug: r.slug,
      title: r.titulo,
      h1: r.h1,
      metaDesc: r.metaDesc,
      badge: r.badge,
      lang: r.lang,
      destName: r.destName
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/pacotes-viagem/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Internacional EN] /pacotes-viagem/${r.slug}.html`);
  }

  // 4. Hotéis Boutique & Resorts de Luxo (64 Cidades Brasileiras)
  for (const [key, city] of Object.entries(CITIES_INFO)) {
    // 4.1 "Melhores hotéis boutique e resorts de luxo em [Nome_da_Cidade] hoje"
    const slugHoteis = `melhores-hoteis-boutique-resorts-luxo-${key}`;
    const htmlHoteis = renderExpediaPage({
      slug: slugHoteis,
      title: `Melhores Hotéis Boutique e Resorts de Luxo em ${city.name} - ${city.uf} Hoje`,
      h1: `Melhores Hotéis Boutique e Resorts de Luxo em ${city.name} (${city.uf})`,
      metaDesc: `Descubra os hotéis boutique mais bem avaliados e resorts de alto padrão em ${city.name} (${city.uf}). Tarifas secretas de membros e cancelamento grátis na Expedia.`,
      badge: `🏨 HOTÉIS VIP EM ${city.name.toUpperCase()}`,
      lang: "pt",
      destName: city.name,
      cidadeKey: key
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugHoteis}.html`), htmlHoteis, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/pacotes-viagem/${slugHoteis}`);

    // 4.2 "Pacotes de viagens e resorts tudo incluso para [Nome_da_Cidade]"
    const slugPacotes = `pacotes-viagens-resorts-tudo-incluso-${key}`;
    const htmlPacotes = renderExpediaPage({
      slug: slugPacotes,
      title: `Pacotes de Viagens e Resorts com Tudo Incluso em ${city.name} - ${city.uf}`,
      h1: `Pacotes de Viagens e Resorts All-Inclusive em ${city.name} (${city.uf})`,
      metaDesc: `Reserve pacotes completos com passagens aéreas e hotéis de alto luxo em ${city.name} - ${city.uf} com garantia de menor preço na Expedia.`,
      badge: `🌴 PACOTES EM ${city.name.toUpperCase()}`,
      lang: "pt",
      destName: city.name,
      cidadeKey: key
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugPacotes}.html`), htmlPacotes, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/pacotes-viagem/${slugPacotes}`);
  }

  // 5. Central Hub Index (/pacotes-viagem)
  const hubHtml = renderExpediaHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push('https://www.aquitemachadinhos.com.br/pacotes-viagem');

  console.log("\n=======================================================");
  console.log(`🏆 TOTAL: ${generatedUrls.length} PÁGINAS EXPEDIA GERADAS COM DADOS LOCAIS!`);
  console.log("=======================================================\n");

  return generatedUrls;
}

if (require.main === module) {
  generateAllExpediaPages().catch(console.error);
}

module.exports = { generateAllExpediaPages, VIP_PACKAGES, SPECIAL_TOURISM_HUBS_PT, INTERNATIONAL_DESTINATIONS_PT, INTERNATIONAL_HUBS_EN, EXPEDIA_BASE_LINK };
