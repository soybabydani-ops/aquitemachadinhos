/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DE TENDÊNCIAS EM TEMPO REAL (REAL-TIME QUERY HIJACKING)
 * Intercepta picos de busca de alta urgência com títulos agressivos, carregamento < 0.2s e monetização dupla.
 */

const fs = require('fs');
const path = require('path');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'tendencias');
const DOMAIN = "https://www.aquitemachadinhos.com.br";
const IMPACT_PUBLISHER_ID = "1101l435760";

const TRENDING_QUERIES = [
  {
    slug: 'bug-passagens-onibus-sp-barretos-atualizado-agora',
    termo: 'Bug de Passagens de Ônibus São Paulo para Barretos',
    h1: '🚨 ATUALIZADO AGORA: Bug de Passagens SP x Barretos 2026 — Tarifas Residuais Liberadas',
    metaDesc: 'Tarifas residuais liberadas nos terminais Tietê e Barra Funda para Barretos. Descontos de até 82% com emissão garantida.',
    categoria: 'Transporte & Festa do Peão',
    precoDe: 'R$ 280,00',
    precoPor: 'R$ 49,90',
    desconto: '-82% OFF',
    cidadeKey: 'barretos',
    afiliadoUrl: `${DOMAIN}/barretos-2026/biometria-facial-festa-do-peao-barretos`
  },
  {
    slug: 'cupom-desconto-shopee-shein-frete-gratis-hoje',
    termo: 'Cupom de Desconto Shopee e SHEIN Frete Grátis Hoje',
    h1: '🚨 ATUALIZADO AGORA: Cupons de Frete Grátis e Desconto Shopee & SHEIN Hoje',
    metaDesc: 'Códigos promocionais e bugs de preço verificados hoje para compras com frete grátis sem valor mínimo na Shopee e SHEIN.',
    categoria: 'E-commerce & Cupons',
    precoDe: 'R$ 189,90',
    precoPor: 'R$ 38,90',
    desconto: '-79% OFF',
    cidadeKey: 'sao-paulo',
    afiliadoUrl: `${DOMAIN}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre`
  },
  {
    slug: 'desconto-reserva-hoteis-expedia-viracopos-hoje',
    termo: 'Desconto Reserva de Hotéis Expedia Viracopos Campinas',
    h1: '🚨 ATUALIZADO AGORA: Desconto em Hotéis Próximos a Viracopos Campinas na Expedia',
    metaDesc: 'Tarifas secretas em hotéis e pousadas executivas ao lado do Aeroporto de Viracopos (VCP). Desconto de até 70% com cancelamento flexível.',
    categoria: 'Turismo & Hotelaria',
    precoDe: 'R$ 490,00/noite',
    precoPor: 'R$ 147,00/noite',
    desconto: '-70% OFF',
    cidadeKey: 'campinas',
    afiliadoUrl: `${DOMAIN}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao`
  },
  {
    slug: 'aluguel-carros-urgente-guarulhos-sem-taxas',
    termo: 'Aluguel de Carros Urgente Guarulhos Sem Taxas Ocultas',
    h1: '🚨 ATUALIZADO AGORA: Aluguel de Carros no Aeroporto de Guarulhos (GRU) Sem Taxas Ocultas',
    metaDesc: 'Retirada rápida de SUVs e utilitários executivos no Aeroporto de Guarulhos com até 70% de desconto na Discover Cars.',
    categoria: 'Locação Veicular',
    precoDe: 'R$ 380,00/dia',
    precoPor: 'R$ 114,00/dia',
    desconto: '-70% OFF',
    cidadeKey: 'sao-paulo',
    afiliadoUrl: `${DOMAIN}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos`
  },
  {
    slug: 'vagas-concursos-municipais-abertas-hoje',
    termo: 'Vagas de Concursos Municipais Abertas Hoje no Interior de SP',
    h1: '🚨 ATUALIZADO AGORA: Editais e Vagas de Concursos Municipais Abertas Hoje',
    metaDesc: 'Lista consolidada de editais abertos com salários de até R$ 14.000 em prefeituras e câmaras municipais de São Paulo.',
    categoria: 'Concursos & Empregos',
    precoDe: 'Inscrições Abertas',
    precoPor: 'Edital 2026',
    desconto: 'NOVO EDITAL',
    cidadeKey: 'barretos',
    afiliadoUrl: `${DOMAIN}/concursos/barretos-inscricoes-abertas`
  },
  {
    slug: 'promocao-relampago-cursos-udemy-tecnologia-hoje',
    termo: 'Promoção Relâmpago Cursos Udemy Tecnologia Hoje',
    h1: '🚨 ATUALIZADO AGORA: Promoção Relâmpago Cursos de TI e IA na Udemy (90% OFF)',
    metaDesc: 'Cupons de lote promocional para formações completas de Programação, Inteligência Artificial e Power BI com certificado.',
    categoria: 'Educação & TI',
    precoDe: 'R$ 279,90',
    precoPor: 'R$ 27,90',
    desconto: '-90% OFF',
    cidadeKey: 'sao-paulo',
    afiliadoUrl: `${DOMAIN}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje`
  },
  {
    slug: 'reserva-urgente-suites-presidenciais-marriott-sp',
    termo: 'Reserva Urgente Suítes Presidenciais Marriott São Paulo',
    h1: '🚨 ATUALIZADO AGORA: Alocação de Suítes Presidenciais Marriott e IHG em São Paulo',
    metaDesc: 'Alocação de última hora em penthouses e suítes com heliponto homologado em São Paulo com serviço de concierge VIP.',
    categoria: 'Alto Luxo VIP',
    precoDe: 'R$ 12.500,00',
    precoPor: 'R$ 3.750,00',
    desconto: '-70% OFF',
    cidadeKey: 'sao-paulo',
    afiliadoUrl: `${DOMAIN}/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo`
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-red-500/30 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-red-400 uppercase tracking-widest font-semibold mb-1">Patrocinador Oficial de Tendências &amp; Alertas Relâmpago</div>
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

function renderTrendPage(item) {
  const geoData = REAL_CITY_DATA[item.cidadeKey] || {};
  const canonicalUrl = `${DOMAIN}/tendencias/${item.slug}`;
  const pageTitle = `🚨 ATUALIZADO AGORA: ${item.termo} - Informações e Links Oficiais com Desconto | AQUITEM`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": item.h1,
    "description": item.metaDesc,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Aqui Tem Achadinhos Real-Time Trends",
      "url": DOMAIN
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
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
  ${PROPELLERADS_SNIPPET}
  <script src="/assets/security-shield.js" defer></script>
  <script src="/assets/affiliate-tracker.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  <meta name="partnerize-publisher-id" content="${IMPACT_PUBLISHER_ID}" />
  <meta name="partnerize" content="${IMPACT_PUBLISHER_ID}" />

  <title>${pageTitle}</title>
  <meta name="description" content="${item.metaDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${item.metaDesc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${DOMAIN}/assets/og-image.png">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #030712; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .card-trend { background: radial-gradient(circle at 50% 0%, #1a0808 0%, #0c0404 60%, #030712 100%); border: 2px solid #EF4444; border-radius: 24px; box-shadow: 0 0 35px rgba(239, 68, 68, 0.25); }
    .pulse-urgent { animation: pulseRed 1s infinite; }
    @keyframes pulseRed { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-red-500 selection:text-white">

  <!-- TOP STRIP -->
  <div class="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 py-1.5 px-4 text-center text-[11px] font-black text-white tracking-wider shadow-md">
    🚨 RADAR DE TENDÊNCIAS EM TEMPO REAL — MONITORAMENTO DE PICOS DE BUSCA 2026
  </div>

  <header class="sticky top-0 z-40 bg-black/90 border-b border-red-500/30 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/tendencias" class="flex items-center gap-2 text-red-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-md">🚨</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Tendências ao Vivo</span></span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Início</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- TARJA TRANSPARENTE DE ATUALIZAÇÃO EM TEMPO REAL -->
    <div class="mb-6 p-3.5 bg-red-950/60 border border-red-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-red-200 shadow-xl">
      <div class="flex items-center gap-2 font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-urgent"></span>
        <span>PICO DE BUSCA DETECTADO: ${item.categoria.toUpperCase()}</span>
      </div>
      <div class="text-[11px] text-slate-300 bg-black/40 px-3 py-1 rounded-xl border border-red-500/30">
        <span>Informação Verificada Agora • Acesso Imediato</span>
      </div>
    </div>

    <!-- BANNER TOPO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <div class="card-trend p-6 md:p-10 mb-8 relative">
      <div class="inline-flex items-center gap-2 bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
        <span class="w-2 h-2 rounded-full bg-red-500 pulse-urgent"></span>
        <span>${item.categoria}</span>
      </div>

      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-3">
        ${item.h1}
      </h1>

      <p class="text-xs md:text-sm text-slate-300 mb-6 leading-relaxed">
        ${item.metaDesc} Nosso robô de monitoramento detectou alta procura para este termo. O link direto e condições oficiais verificadas estão disponíveis abaixo.
      </p>

      <!-- BOX DE PREÇO / TARIFA -->
      <div class="bg-black/60 border border-red-500/30 rounded-2xl p-5 mb-6">
        <div class="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span>Status do Lote Oficial:</span>
          <span class="text-emerald-400 font-bold">Ativo &amp; Desbloqueado</span>
        </div>
        <div class="flex justify-between items-center text-xs text-slate-400 mb-3">
          <span>Preço Tradicional:</span>
          <span class="line-through text-slate-500">${item.precoDe}</span>
        </div>
        <div class="flex justify-between items-center text-xs font-bold text-amber-300 pt-2 border-t border-slate-800">
          <span>⚡ Condição com Desconto Aplicado:</span>
          <span class="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">${item.desconto}</span>
        </div>
        <div class="text-2xl md:text-4xl font-black text-emerald-400 mt-3 font-mono">
          ${item.precoPor}
        </div>
      </div>

      <!-- BOTÃO DIRETO -->
      <a href="${item.afiliadoUrl}" data-trend="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-red-600/30 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
        <span>👉 ACESSAR OFERTA / INFORMAÇÃO OFICIAL AGORA &rarr;</span>
      </a>

      <!-- DADOS GEOGRÁFICOS REAIS -->
      ${geoData.ddd ? `
      <div class="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><b>Região Telefônica:</b> DDD (${geoData.ddd})</div>
        <div><b>Acessos Rodoviários:</b> ${geoData.rodovias || 'Acesso Estadual'}</div>
      </div>
      ` : ''}
    </div>

  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Radar de Tendências em Tempo Real &amp; Utilidade Pública.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos monitora picos de interesse público e participa de programas oficiais de afiliados. Ao contratar através dos nossos links, podemos receber comissões sem qualquer custo extra para você.
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

function renderTrendHub() {
  const cardsHtml = TRENDING_QUERIES.map(item => `
    <div class="bg-slate-900/80 border border-red-500/20 hover:border-red-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">${item.categoria}</span>
          <span class="text-emerald-400 font-black text-xs">${item.desconto}</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${item.termo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-2">${item.metaDesc}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-lg font-black text-emerald-400 font-mono">${item.precoPor}</span>
          <span class="text-xs text-slate-500 line-through">${item.precoDe}</span>
        </div>
      </div>
      <a href="/tendencias/${item.slug}.html" class="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
        Acessar Tendência ao Vivo →
      </a>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>
  <script src="/assets/affiliate-tracker.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚨 Radar de Tendências em Tempo Real &amp; Picos de Busca | AQUITEM</title>
  <meta name="description" content="Monitoramento ao vivo de picos de busca, bugs de passagens, cupons relâmpago e ofertas de alta demanda no Brasil.">
  <link rel="canonical" href="${DOMAIN}/tendencias">
  <link rel="icon" href="/favicon.ico">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #030712; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-red-500/30 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/tendencias" class="flex items-center gap-2 text-red-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xs shadow-md">🚨</span>
        <span>AQUITEM TENDÊNCIAS</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20 uppercase tracking-wider">Interceptador de Picos de Busca</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Tendências ao Vivo &amp; Oportunidades Urgentes</h1>
      <p class="text-slate-400 text-xs md:text-sm">Respostas imediatas para as buscas de maior crescimento registradas na internet hoje.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Radar de Tendências em Tempo Real.</p>
  </footer>
</body>
</html>`;
}

function generateAllTrendPages() {
  console.log("=======================================================");
  console.log("🚨 GERANDO PÁGINAS DE TENDÊNCIAS EM TEMPO REAL");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];

  for (const item of TRENDING_QUERIES) {
    const html = renderTrendPage(item);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${item.slug}.html`), html, 'utf8');
    const url = `${DOMAIN}/tendencias/${item.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Tendência] /tendencias/${item.slug}.html`);
  }

  const hubHtml = renderTrendHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push(`${DOMAIN}/tendencias`);

  console.log(`\n🏆 Total de ${generatedUrls.length} rotas de tendências geradas com sucesso!`);
  return generatedUrls;
}

if (require.main === module) {
  generateAllTrendPages();
}

module.exports = { generateAllTrendPages, TRENDING_QUERIES };
