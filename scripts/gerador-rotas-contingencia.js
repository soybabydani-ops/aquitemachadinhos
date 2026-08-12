/**
 * AQUITEM ACHADINHOS — MOTOR DE CONTINGÊNCIA & SEQUESTRO DE RASTROS HISTÓRICOS (DA 90+)
 * Recria rotas de alta autoridade histórica para termos de busca de turismo, pousadas e logística.
 * Integrado ao affiliate-tracker.js (< 20ms), Adsterra (5975392), PropellerAds (11558154) e malha interna circular.
 */

const fs = require('fs');
const path = require('path');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'contingencia');
const DOMAIN = "https://www.aquitemachadinhos.com.br";

const ROTAS_HISTORICAS_CONTINGENCIA = [
  {
    slug: 'mapa-historico-pousadas-barretos-festa-peao',
    titulo: 'Guia Histórico e Mapa de Pousadas e Hotéis para a Festa do Peão de Barretos 2026',
    termo: 'Mapa histórico pousadas barretos festa do peao',
    origem: 'Barretos / Parque do Peão',
    destino: 'Barretos/SP',
    cidadeKey: 'barretos',
    tipo: 'Hospedagem & Transfer VIP',
    precoNormal: 'R$ 650,00/diária',
    precoContingencia: 'R$ 180,00/diária',
    desconto: '-72% OFF',
    descricao: 'Acesso às vagas residuais de hotelaria e pousadas familiares em Barretos e cidades vizinhas (Colômbia, Bebedouro e Olímpia). Transparência total e cancelamento flexível.',
    afiliadoUrl: `${DOMAIN}/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-barretos`
  },
  {
    slug: 'guia-antigo-pousadas-gramado-serra-gaucha',
    titulo: 'Guia de Pousadas em Gramado e Canela — Tarifas Secretas da Serra Gaúcha',
    termo: 'Guia pousadas gramado serra gaucha tarifas secretas',
    origem: 'Gramado & Canela',
    destino: 'Gramado/RS',
    cidadeKey: 'gramado',
    tipo: 'Hotelaria de Charme & Chalés',
    precoNormal: 'R$ 890,00/diária',
    precoContingencia: 'R$ 240,00/diária',
    desconto: '-73% OFF',
    descricao: 'Hospedagens aconchegantes próximas à Rua Coberta e Av. Borges de Medeiros com café da manhã colonial incluso e descontos especiais via Expedia.',
    afiliadoUrl: `${DOMAIN}/pacotes-viagem/bugs-passagens-aereas-internacionais-gramado`
  },
  {
    slug: 'turismo-buzios-hospedagens-historico',
    titulo: 'Guia Histórico de Turismo em Búzios — Pousadas de Charme e Aluguel de Carros',
    termo: 'Turismo buzios pousadas de charme praias',
    origem: 'Armação dos Búzios',
    destino: 'Búzios/RJ',
    cidadeKey: 'buzios',
    tipo: 'Pousadas Beira-Mar & Mobilidade',
    precoNormal: 'R$ 720,00/diária',
    precoContingencia: 'R$ 195,00/diária',
    desconto: '-73% OFF',
    descricao: 'Roteiro das melhores praias de Búzios (Geribá, Ferradura, João Fernandes) com dicas de locação de veículos sem taxas ocultas na Discover Cars.',
    afiliadoUrl: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-buzios`
  },
  {
    slug: 'rodoviaria-campinas-horarios-tarifas-antigas',
    titulo: 'Radar de Horários e Passagens Rodoviárias no Terminal Multimodal de Campinas',
    termo: 'Rodoviaria campinas horarios passagens onibus',
    origem: 'Terminal Multimodal Ramos de Azevedo',
    destino: 'Campinas/SP',
    cidadeKey: 'campinas',
    tipo: 'Passagens Rodoviárias & Conexões Aeroporto',
    precoNormal: 'R$ 85,00',
    precoContingencia: 'R$ 22,90',
    desconto: '-73% OFF',
    descricao: 'Consulta de horários de ônibus intermunicipais, transfers para o Aeroporto de Viracopos (VCP) e conexão direta para a capital São Paulo.',
    afiliadoUrl: `${DOMAIN}/aluguel-carros/aluguel-carros-viracopos-campinas`
  },
  {
    slug: 'assentos-promocionais-sp-para-barretos',
    titulo: 'Painel de Vagas de Última Hora: Assentos Promocionais São Paulo x Barretos 2026',
    termo: 'Assentos promocionais rota São Paulo para Barretos',
    origem: 'São Paulo (Tietê/Barra Funda)',
    destino: 'Barretos/SP (Festa do Peão 2026)',
    cidadeKey: 'barretos',
    tipo: 'Rodoviário Executivo / Transfer Direto',
    precoNormal: 'R$ 280,00',
    precoContingencia: 'R$ 49,90',
    desconto: '-82% OFF',
    descricao: 'Emissão de assentos de contingência em ônibus executivos semi-leito e vans credenciadas saindo do Terminal Tietê e Barra Funda.',
    afiliadoUrl: `${DOMAIN}/barretos-2026/biometria-facial-festa-do-peao-barretos`
  },
  {
    slug: 'painel-vagas-ultimahora-guarulhos-rio',
    titulo: 'Painel de Vagas de Última Hora: Voos Guarulhos x Rio de Janeiro',
    termo: 'Assentos promocionais voo São Paulo Guarulhos para Rio',
    origem: 'São Paulo (Guarulhos GRU)',
    destino: 'Rio de Janeiro (GIG/SDU)',
    cidadeKey: 'rio-de-janeiro',
    tipo: 'Aéreo / Voo de Última Hora',
    precoNormal: 'R$ 480,00',
    precoContingencia: 'R$ 89,90',
    desconto: '-81% OFF',
    descricao: 'Tarifas residuais de companhias aéreas com saídas diárias de Congonhas e Guarulhos para o Santos Dumont e Galeão.',
    afiliadoUrl: `${DOMAIN}/pacotes-viagem/bugs-passagens-aereas-internacionais-rio-de-janeiro`
  },
  {
    slug: 'contingencia-passagens-barra-funda-campinas',
    titulo: 'Painel de Despacho Rápido: Passagens Barra Funda x Campinas',
    termo: 'Cupom de contingência São Paulo Barra Funda para Campinas',
    origem: 'São Paulo (Terminal Barra Funda)',
    destino: 'Campinas/SP',
    cidadeKey: 'campinas',
    tipo: 'Ônibus Executivo Semi-Leito',
    precoNormal: 'R$ 58,00',
    precoContingencia: 'R$ 19,90',
    desconto: '-65% OFF',
    descricao: 'Passagens executivas com embarque na Barra Funda e desembarque no Terminal Ramos de Azevedo ou Viracopos.',
    afiliadoUrl: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-campinas`
  },
  {
    slug: 'painel-vagas-jabaquara-santos',
    titulo: 'Painel de Vagas de Última Hora: Passagens Jabaquara x Santos',
    termo: 'Assentos promocionais rota Jabaquara para Santos',
    origem: 'São Paulo (Terminal Jabaquara)',
    destino: 'Santos/SP (Baixada Santista)',
    cidadeKey: 'santos',
    tipo: 'Ônibus Executivo & Lotação Rápida',
    precoNormal: 'R$ 44,00',
    precoContingencia: 'R$ 12,90',
    desconto: '-70% OFF',
    descricao: 'Linhas regulares com saídas a cada 15 minutos do Terminal Jabaquara descendo pela Rodovia dos Imigrantes para a Baixada Santista.',
    afiliadoUrl: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-santos`
  },
  {
    slug: 'assentos-promocionais-sp-para-gramado',
    titulo: 'Painel de Vagas de Última Hora: São Paulo x Gramado/RS',
    termo: 'Assentos promocionais voos e transfers São Paulo para Gramado',
    origem: 'São Paulo (GRU/CGH)',
    destino: 'Gramado/RS (Serra Gaúcha)',
    cidadeKey: 'gramado',
    tipo: 'Aéreo Charter + Transfer Serra',
    precoNormal: 'R$ 890,00',
    precoContingencia: 'R$ 289,00',
    desconto: '-68% OFF',
    descricao: 'Pacotes integrados com voo para Porto Alegre/Caxias do Sul e transfer executivo pela Rota Romântica até Gramado.',
    afiliadoUrl: `${DOMAIN}/pacotes-viagem/bugs-passagens-aereas-internacionais-gramado`
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Patrocinador Oficial de Mobilidade &amp; Contingência</div>
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

function gerarHTMLContingencia(r) {
  const geoData = REAL_CITY_DATA[r.cidadeKey] || {};
  const canonicalUrl = `${DOMAIN}/contingencia/${r.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": r.titulo,
    "description": r.descricao,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": r.precoContingencia.replace('R$ ', '').replace(',', '.').replace('/diária', ''),
      "availability": "https://schema.org/InStock",
      "url": r.afiliadoUrl
    }
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
  <title>⚠️ ${r.titulo} | AQUITEM</title>
  <meta name="description" content="[DESPACHO AO VIVO] ${r.termo}: Assentos residuais e vagas liberadas de ${r.origem} para ${r.destino} com ${r.desconto}. De ${r.precoNormal} por ${r.precoContingencia}.">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${r.titulo}">
  <meta property="og:description" content="${r.descricao}">
  <meta property="og:type" content="product">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${DOMAIN}/assets/og-image.png">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #030712; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .card-contingencia { background: radial-gradient(circle at 50% 0%, #0d2244 0%, #060e1d 70%, #030712 100%); border: 2px solid #10B981; border-radius: 24px; box-shadow: 0 0 35px rgba(16, 185, 129, 0.25); }
    .pulse-dot { animation: blink 1s infinite; }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">

  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/contingencia" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">⚠️</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Radar de Contingência &amp; Vagas</span></span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Início</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- TARJA TRANSPARENTE DE ATUALIZAÇÃO EM TEMPO REAL -->
    <div class="mb-6 p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200 shadow-xl">
      <div class="flex items-center gap-2 font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-dot"></span>
        <span>RADAR AO VIVO • LOTE DE CONTINGÊNCIA DESBLOQUEADO</span>
      </div>
      <div class="text-[11px] text-slate-300 bg-black/40 px-3 py-1 rounded-xl border border-emerald-500/30">
        <span>Atualização Contínua • Vagas Residuais</span>
      </div>
    </div>

    <!-- BANNER TOPO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <div class="card-contingencia p-6 md:p-10 mb-8 relative">
      <div class="inline-flex items-center gap-2 bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
        <span class="w-2 h-2 rounded-full bg-red-500 pulse-dot"></span>
        <span>PAINEL DE DESPACHO &amp; VAGAS DE ÚLTIMA HORA</span>
      </div>

      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${r.origem} &rarr; ${r.destino}
      </h1>

      <p class="text-xs md:text-sm text-slate-300 mb-5 leading-relaxed">
        ${r.descricao}
      </p>

      <!-- BOX DE PREÇO & CONDICOES -->
      <div class="bg-black/60 border border-emerald-500/30 rounded-2xl p-5 mb-6">
        <div class="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span>Status de Balcão Tradicional:</span>
          <span class="text-red-400 font-bold">Tarifa Cheia / Lote Restrito</span>
        </div>
        <div class="flex justify-between items-center text-xs text-slate-400 mb-3">
          <span>Preço de Tabela:</span>
          <span class="line-through text-slate-500">${r.precoNormal}</span>
        </div>
        <div class="flex justify-between items-center text-xs font-bold text-amber-300 pt-2 border-t border-slate-800">
          <span>⚡ Tarifa de Contingência Liberada:</span>
          <span class="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">${r.desconto}</span>
        </div>
        <div class="text-2xl md:text-4xl font-black text-emerald-400 mt-3 font-mono">
          ${r.precoContingencia}
        </div>
      </div>

      <!-- BOTÃO DIRETO -->
      <a href="${r.afiliadoUrl}" data-contingencia="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
        <span>👉 RESGATAR TARIFA DE CONTINGÊNCIA AGORA &rarr;</span>
      </a>

      <!-- DADOS GEOGRÁFICOS REAIS -->
      ${geoData.ddd ? `
      <div class="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><b>Aeroporto / Hub:</b> ${geoData.aeroporto || 'Regional'}</div>
        <div><b>Rodovias de Conexão:</b> ${geoData.rodovias || 'Acesso Estadual'}</div>
      </div>
      ` : ''}
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Radar de Contingência, Tarifas Residuais &amp; Utilidade Pública.</p>
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

function renderContingenciaHub() {
  const cardsHtml = ROTAS_HISTORICAS_CONTINGENCIA.map(r => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${r.desconto}</span>
          <span class="text-amber-400 font-bold text-xs">${r.tipo}</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${r.titulo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-2">${r.descricao}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-lg font-black text-emerald-400 font-mono">${r.precoContingencia}</span>
          <span class="text-xs text-slate-500 line-through">${r.precoNormal}</span>
        </div>
      </div>
      <a href="/contingencia/${r.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
        Ver Rota de Contingência →
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
  <title>⚠️ Central de Contingência &amp; Vagas de Última Hora | AQUITEM</title>
  <meta name="description" content="Painel de contingência para resgate de tarifas residuais, pousadas históricas e vagas rodoviárias/aéreas de última hora.">
  <link rel="canonical" href="${DOMAIN}/contingencia">
  <link rel="icon" href="/favicon.ico">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #030712; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/contingencia" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">⚠️</span>
        <span>AQUITEM CONTINGÊNCIA</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Radar de Vagas Residuais</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Painel de Contingência &amp; Rotas de Alta Demanda</h1>
      <p class="text-slate-400 text-xs md:text-sm">Recuperação de tarifas antigas e assentos residuais liberados em tempo real.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Central de Contingência e Utilidade Pública.</p>
  </footer>
</body>
</html>`;
}

function generateAllContingenciaPages() {
  console.log("=======================================================");
  console.log("⚠️ GERANDO PÁGINAS DE CONTINGÊNCIA & SEQUESTRO HISTÓRICO");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];

  for (const r of ROTAS_HISTORICAS_CONTINGENCIA) {
    const html = gerarHTMLContingencia(r);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${r.slug}.html`), html, 'utf8');
    const url = `${DOMAIN}/contingencia/${r.slug}`;
    generatedUrls.push(url);
    console.log(`✓ [Contingência] /contingencia/${r.slug}.html`);
  }

  const hubHtml = renderContingenciaHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push(`${DOMAIN}/contingencia`);

  console.log(`\n🏆 Total de ${generatedUrls.length} rotas de contingência geradas com sucesso!`);
  return generatedUrls;
}

if (require.main === module) {
  generateAllContingenciaPages();
}

module.exports = { generateAllContingenciaPages, ROTAS_HISTORICAS_CONTINGENCIA };
