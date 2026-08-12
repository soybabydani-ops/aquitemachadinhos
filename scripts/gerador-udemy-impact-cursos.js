/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DE CURSOS UDEMY COM DADOS LOCAIS REAIS (PSEO ÉTICO)
 * Injeção de Dados Geo-Espaciais Verificados (DDD, Aeroporto, Rodovias, Distâncias), E-E-A-T e Transparência.
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'cursos');

const IMPACT_PUBLISHER_ID = "1101l435760";
const UDEMY_IMPACT_BASE_LINK = `https://udemy.sjv.io/c/${IMPACT_PUBLISHER_ID}/aquitem_cursos`;

// Principais cursos em alta demanda com certificado oficial Udemy
const FEATURED_COURSES = [
  {
    nome: "Formação Completa Web Dev & Fullstack 2026",
    categoria: "Tecnologia & Programação",
    de: "R$ 279,90",
    por: "R$ 27,90",
    desconto: "90% OFF",
    horas: "78 horas",
    alunos: "142.800+ alunos",
    nota: "4.8 ★★★★★",
    beneficios: ["HTML5, CSS3, JavaScript, React e Node.js", "Projetos práticos para portfólio real", "Certificado de conclusão com verificação online"]
  },
  {
    nome: "Especialista em Inteligência Artificial & Engenharia de Prompts",
    categoria: "Inteligência Artificial",
    de: "R$ 319,90",
    por: "R$ 27,90",
    desconto: "91% OFF",
    horas: "42 horas",
    alunos: "68.400+ alunos",
    nota: "4.9 ★★★★★",
    beneficios: ["ChatGPT, Claude, Midjourney e automações n8n", "Aplicações de IA no trabalho para dobrar produtividade", "Certificado internacional de capacitação"]
  },
  {
    nome: "Excel Avançado, Dashboards Interativos & Power BI",
    categoria: "Negócios & Análise de Dados",
    de: "R$ 249,90",
    por: "R$ 24,90",
    desconto: "90% OFF",
    horas: "35 horas",
    alunos: "210.000+ alunos",
    nota: "4.9 ★★★★★",
    beneficios: ["Fórmulas avançadas, PROCV/X, Tabelas Dinâmicas e DAX", "Dashboards executivos profissionais prontos", "Certificado reconhecido por empresas nacionais"]
  },
  {
    nome: "Gestão de Tráfego Pago & Marketing Digital de Alta Conversão",
    categoria: "Marketing & Vendas",
    de: "R$ 299,90",
    por: "R$ 29,90",
    desconto: "90% OFF",
    horas: "46 horas",
    alunos: "89.300+ alunos",
    nota: "4.8 ★★★★★",
    beneficios: ["Meta Ads (Instagram/Facebook), Google Ads e TikTok Ads", "Estratégias de escala de vendas com baixo orçamento", "Certificado oficial e templates de campanhas"]
  }
];

const NATIONAL_CATEGORY_HUBS = [
  {
    slug: "cupom-desconto-promocoes-relampago-udemy-hoje",
    titulo: "Cupom de Desconto Ativo e Promoções Relâmpago para Cursos da Udemy Hoje",
    h1: "Cupons de Desconto e Promoções Relâmpago Udemy Hoje (Até 90% OFF)",
    metaDesc: "Economize hoje com cupons válidos de 90% de desconto na Udemy. Cursos de tecnologia, negócios, idiomas e design com certificado oficial.",
    badge: "🔥 CUPOM DE HOJE ATIVADO"
  },
  {
    slug: "melhores-cursos-online-capacitacao-profissional",
    titulo: "Melhores Cursos Online de Capacitação Profissional com Certificado 2026",
    h1: "Guia dos Melhores Cursos Online de Capacitação Profissional com Certificado",
    metaDesc: "Descubra os cursos online mais bem avaliados para turbinar seu currículo e conquistar novas oportunidades no mercado de trabalho.",
    badge: "🎓 FORMAÇÃO PROFISSIONAL"
  },
  {
    slug: "treinamentos-cursos-tecnicos-mais-vendidos",
    titulo: "Treinamentos e Cursos Técnicos Mais Vendidos com Vagas Abertas",
    h1: "Treinamentos e Cursos Técnicos Mais Vendidos — Vagas Abertas",
    metaDesc: "Lista completa dos treinamentos técnicos e cursos mais vendidos do Brasil com certificação imediata e desconto de lote promocional.",
    badge: "⚡ MAIS VENDIDOS DO BRASIL"
  },
  {
    slug: "cursos-programacao-desenvolvimento-web-python",
    titulo: "Cursos de Programação, Desenvolvimento Web e Python com Certificado",
    h1: "Cursos de Programação, Web Fullstack e Python com Certificado Oficial",
    metaDesc: "Aprenda a programar do zero ao profissional: Python, JavaScript, React, Backend e Bancos de Dados com projetos reais na Udemy.",
    badge: "💻 PROGRAMAÇÃO & TI"
  },
  {
    slug: "cursos-inteligencia-artificial-chatgpt-prompts",
    titulo: "Cursos de Inteligência Artificial, ChatGPT, Automação e Prompts",
    h1: "Cursos de Inteligência Artificial, ChatGPT e Automações de Produtividade",
    metaDesc: "Domine as ferramentas de inteligência artificial mais valorizadas pelas empresas: ChatGPT, Claude, Midjourney e automações n8n.",
    badge: "🤖 INTELIGÊNCIA ARTIFICIAL"
  },
  {
    slug: "cursos-marketing-digital-gestao-trafego",
    titulo: "Cursos de Marketing Digital, Tráfego Pago e Copywriting",
    h1: "Formações em Marketing Digital, Tráfego Pago e Copywriting de Alta Conversão",
    metaDesc: "Aprenda a criar campanhas lucrativas no Meta Ads, Google Ads e TikTok Ads para vender produtos e serviços todos os dias.",
    badge: "📈 MARKETING DIGITAL"
  },
  {
    slug: "cursos-excel-powerbi-analise-dados",
    titulo: "Cursos de Excel Avançado, Power BI e Análise de Dados para Empresas",
    h1: "Cursos Práticos de Excel Avançado, Power BI e Dashboards Interativos",
    metaDesc: "Torne-se indispensável no mercado corporativo dominando análise de dados, dashboards no Power BI e relatórios automatizados no Excel.",
    badge: "📊 EXCEL & POWER BI"
  },
  {
    slug: "cursos-design-grafico-ui-ux-figma",
    titulo: "Cursos de Design Gráfico, UI/UX Design e Figma do Zero ao Avançado",
    h1: "Cursos de Design Gráfico, Photoshop, Illustrator e UI/UX no Figma",
    metaDesc: "Aprenda a criar interfaces digitais modernas e peças visuais de alto impacto para clientes e empresas nacionais e internacionais.",
    badge: "🎨 DESIGN & CRIATIVIDADE"
  },
  {
    slug: "cursos-financas-investimentos-mercado-financeiro",
    titulo: "Cursos de Finanças Pessoais, Investimentos e Análise de Mercado",
    h1: "Cursos de Inteligência Financeira, Ações, FIIs e Multiplicação de Capital",
    metaDesc: "Aprenda a administrar suas finanças, investir com segurança na bolsa de valores e gerar renda passiva recorrente.",
    badge: "💰 FINANÇAS & MERCADO"
  },
  {
    slug: "cursos-ingles-idiomas-conversacao",
    titulo: "Cursos de Inglês Rápido e Conversação para o Mercado Profissional",
    h1: "Cursos de Inglês Prático para Carreira e Conversação Profissional",
    metaDesc: "Destrave seu inglês para entrevistas de emprego, reuniões de trabalho e viagens internacionais com método direto ao ponto.",
    badge: "🌍 IDIOMAS & CARREIRA"
  },
  {
    slug: "cursos-gestao-projetos-lideranca-empresarial",
    titulo: "Cursos de Gestão de Projetos, Scrum, Metodologias Ágeis e Liderança",
    h1: "Cursos de Gestão Ágil, Scrum, Kanban e Liderança Corporativa",
    metaDesc: "Desenvolva habilidades de liderança e gestão de equipes em alta demanda pelas grandes corporações multinacionais.",
    badge: "👔 GESTÃO & NEGÓCIOS"
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-indigo-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Patrocinador Oficial de Capacitação Profissional</div>
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

function renderCoursesList(cityName, targetSlug) {
  return FEATURED_COURSES.map((c, idx) => {
    const directImpactLink = `https://udemy.sjv.io/c/${IMPACT_PUBLISHER_ID}/aquitem_cursos_${idx}`;

    const benefits = c.beneficios.map(b => `
      <li class="flex items-center gap-2 text-xs text-slate-300">
        <span class="text-indigo-400 font-bold">✓</span>
        <span>${b}</span>
      </li>
    `).join('');

    return `
    <div class="bg-slate-900/90 border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl p-5 md:p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2.5">
          <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 text-[11px]">${c.categoria}</span>
          <span class="text-amber-400 font-bold text-xs">${c.nota}</span>
        </div>
        <h3 class="text-base md:text-lg font-bold text-white mb-2 leading-snug">${c.nome}</h3>
        <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span>⏱️ ${c.horas}</span>
          <span>👥 ${c.alunos}</span>
          <span>📜 Certificado Oficial</span>
        </div>
        <ul class="space-y-1.5 mb-4">
          ${benefits}
        </ul>
      </div>

      <div class="pt-3 border-t border-slate-800">
        <div class="flex items-baseline justify-between mb-3">
          <div>
            <span class="text-[10px] uppercase text-slate-400 block font-semibold">De Tabela:</span>
            <span class="text-xs text-slate-500 line-through">${c.de}</span>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase text-emerald-400 font-bold block">Com Cupom Hoje:</span>
            <span class="text-xl font-black text-emerald-400">${c.por}</span>
          </div>
        </div>

        <a href="${directImpactLink}" data-impact="true" data-udemy="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-black text-xs md:text-sm rounded-xl text-center shadow-lg shadow-indigo-500/20 transition flex items-center justify-center gap-2 transform active:scale-95">
          <span>👉 Acessar Curso na Udemy com 90% OFF →</span>
        </a>
      </div>
    </div>
    `;
  }).join('\n');
}

function renderEducationalPage({ slug, title, h1, metaDesc, badge, cityName = "", uf = "", cidadeKey = "", isCity = false }) {
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/cursos/${slug}`;
  const directMainImpact = `https://udemy.sjv.io/c/${IMPACT_PUBLISHER_ID}/aquitem_${slug}`;

  const geoData = REAL_CITY_DATA[cidadeKey] || null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": h1,
    "description": metaDesc,
    "provider": {
      "@type": "Organization",
      "name": "Udemy Brasil / AQUITEM Educação",
      "url": "https://www.aquitemachadinhos.com.br"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT40H"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": "27.90",
      "availability": "https://schema.org/InStock",
      "url": directMainImpact
    }
  };

  const coursesListHtml = renderCoursesList(cityName || "Brasil", slug);

  // Seção de Conteúdo Exclusivo Geo-Localizado
  let localGeoSection = "";
  if (geoData && cityName) {
    localGeoSection = `
    <div class="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 md:p-8 mb-8">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xl">📍</span>
        <h3 class="text-lg md:text-xl font-bold text-white">Mercado de Trabalho &amp; Capacitação em ${cityName} - ${uf}</h3>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-5 bg-black/40 p-4 rounded-2xl border border-slate-800">
        <b>Vocação Econômica &amp; Empregabilidade em ${cityName}:</b> ${geoData.perfilEditorial || ''}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-indigo-400 font-bold mb-1">🏢 Polos Comerciais &amp; Empregabilidade</div>
          <p class="leading-relaxed">${geoData.polosComerciais}. Alta demanda para profissionais com habilidades em tecnologia, vendas e análise de dados.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-indigo-400 font-bold mb-1">🚀 Conexão Regional &amp; Home Office</div>
          <p class="leading-relaxed">Região atendida pelo DDD (${geoData.ddd}). Cursos online com certificado emitido na hora facilitam candidaturas para vagas remotas e presenciais em ${cityName}.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-indigo-400 font-bold mb-1">🛣️ Logística &amp; Acesso Regional</div>
          <p class="leading-relaxed">Acesso via ${geoData.rodovias}. Distância da capital: ${geoData.distanciaCapital}.</p>
        </div>
        <div class="p-4 bg-black/50 rounded-2xl border border-slate-800">
          <div class="text-indigo-400 font-bold mb-1">📜 Validade Oficial do Certificado</div>
          <p class="leading-relaxed">Certificado de conclusão aceito para horas complementares em faculdades, provas de títulos em concursos e upgrade curricular em ${cityName}.</p>
        </div>
      </div>
    </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <!-- ULTRA HIGH-SPEED PRELOADS & PERIMETRAL MONETIZATION (< 10ms) -->
  <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1, index, follow" />
  <link rel="dns-prefetch" href="//www.highperformanceformat.com" />
  <link rel="preconnect" href="//www.highperformanceformat.com" crossorigin />
  <link rel="dns-prefetch" href="//p2pdh.com" />
  <link rel="preconnect" href="//p2pdh.com" crossorigin />
  <link rel="dns-prefetch" href="//udemy.sjv.io" />
  <link rel="preconnect" href="//udemy.sjv.io" crossorigin />
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

  <title>${title} | AQUITEM Cursos</title>
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
    body { background-color: #050711; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .glass-card { background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(99, 102, 241, 0.25); box-shadow: 0 0 30px rgba(99, 102, 241, 0.08); }
    .neon-text { text-shadow: 0 0 15px rgba(129, 140, 248, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-indigo-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/cursos" class="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Cursos &amp; Capacitação</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/" class="hidden sm:inline-block text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Início</a>
        <span class="text-[11px] px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
          Rede Udemy Oficial
        </span>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    
    <!-- TARJA DE TRANSPARÊNCIA E DISPONIBILIDADE REAL (SEM FAKE TIMERS) -->
    <div class="mb-6 p-3.5 bg-indigo-950/60 border border-indigo-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-200 shadow-xl">
      <div class="flex items-center gap-2 font-semibold">
        <span class="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
        <span>🏷️ LOTE PROMOCIONAL DE CAPACITAÇÃO: ATÉ 90% OFF EM CURSOS OFICIAIS UDEMY</span>
      </div>
      <div class="text-[11px] text-slate-300 bg-black/40 px-3 py-1 rounded-xl border border-indigo-500/30">
        <span>Atualização em Tempo Real • Vagas com Cupom Ativo</span>
      </div>
    </div>

    <!-- BANNER TOPO MONETIZAÇÃO ADSTERRA -->
    ${ADSTERRA_SNIPPET}

    <!-- CARD HERO COM TÍTULO E GATILHOS -->
    <div class="mb-8 rounded-3xl glass-card p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40 uppercase tracking-wider">
          ${badge}
        </span>
        <span class="text-emerald-400 font-semibold text-xs">⚡ Acesso Vitalício + Certificado</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight neon-text">
        ${h1}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${metaDesc} Aproveite as bolsas e cupons oficiais da plataforma líder mundial em capacitação profissional com certificado válido em todo o território nacional.
      </p>

      <!-- DESTAQUES RÁPIDOS -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">Desconto Máximo</span>
          <span class="text-base font-black text-emerald-400">Até 90% OFF</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">Validade</span>
          <span class="text-base font-black text-white">Acesso Vitalício</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">Certificação</span>
          <span class="text-base font-black text-indigo-400">Oficial Udemy</span>
        </div>
        <div class="p-3 bg-black/50 rounded-xl border border-slate-800 text-center">
          <span class="text-[11px] text-slate-400 block uppercase">Garantia</span>
          <span class="text-base font-black text-amber-400">30 Dias</span>
        </div>
      </div>

      <!-- BOTÃO DE AÇÃO DIRETO COM IMPACT RADIUS -->
      <div class="pt-2">
        <a href="${directMainImpact}" data-impact="true" data-udemy="true" target="_blank" rel="noopener noreferrer sponsored" class="btn-action w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👉 ATIVAR CUPOM DE 90% OFF E VER TODOS OS CURSOS NA UDEMY →</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center mt-3">
          <span>🔒 Compra 100% Segura</span>
          <span>⚡ Liberação Imediata</span>
          <span>🛡️ 30 Dias de Garantia Total</span>
        </div>
      </div>
    </div>

    <!-- SEÇÃO GEO-LOCALIZADA ESPECÍFICA (DADOS ÚNICOS) -->
    ${localGeoSection}

    <!-- GRADE DE CURSOS MAIS VENDIDOS E RECOMENDADOS -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-lg md:text-2xl font-black text-white">Cursos Técnicos e Formações em Alta Demanda</h2>
        <span class="text-xs text-indigo-400 font-bold">Vagas Promocionais Abertas</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${coursesListHtml}
      </div>
    </div>

    <!-- SEÇÃO DE VANTAGENS DA CAPACITAÇÃO ONLINE -->
    <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
      <h3 class="text-lg font-bold text-white mb-4">Por que se capacitar pela Udemy através do AQUITEM?</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-indigo-400 font-black text-base mb-1">🚀 Aprenda no Seu Ritmo</div>
          <p>Assista às aulas no computador, tablet ou celular, onde e quando quiser, com download para assistir offline.</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-indigo-400 font-black text-base mb-1">📜 Certificado Verificável</div>
          <p>Ao concluir o curso, emita seu certificado digital para anexar ao seu LinkedIn e currículo profissional.</p>
        </div>
        <div class="p-4 bg-black/40 rounded-xl border border-slate-800">
          <div class="text-indigo-400 font-black text-base mb-1">💰 Menor Preço Garantido</div>
          <p>Nossos cupons automáticos garantem acesso aos cursos a partir de R$ 24,90 com 30 dias de reembolso garantido.</p>
        </div>
      </div>
    </div>

    <!-- NAVEGAÇÃO DE CATEGORIAS E CIDADES -->
    <div class="mt-8 pt-6 border-t border-slate-800">
      <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Navegue por Outras Áreas de Capacitação:</h4>
      <div class="flex flex-wrap gap-2 text-xs">
        <a href="/cursos/cursos-programacao-desenvolvimento-web-python.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Programação &amp; TI</a>
        <a href="/cursos/cursos-inteligencia-artificial-chatgpt-prompts.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Inteligência Artificial</a>
        <a href="/cursos/cursos-excel-powerbi-analise-dados.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Excel &amp; Power BI</a>
        <a href="/cursos/cursos-marketing-digital-gestao-trafego.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Marketing Digital</a>
        <a href="/cursos/cursos-design-grafico-ui-ux-figma.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Design &amp; UI/UX</a>
        <a href="/cursos/cursos-financas-investimentos-mercado-financeiro.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Finanças</a>
        <a href="/cursos/cursos-ingles-idiomas-conversacao.html" class="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition">Inglês &amp; Idiomas</a>
      </div>
    </div>

  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Cursos Online, Capacitação Profissional &amp; Parceria Oficial Udemy / Impact.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa do programa oficial de afiliados da Udemy / Impact Radius. Ao se inscrever em cursos através dos nossos links, podemos receber comissões sem qualquer acréscimo no valor final pago por você.
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

function renderEducationalHub(cityUrls, categoryUrls) {
  const categoryCards = NATIONAL_CATEGORY_HUBS.map(cat => `
    <a href="/cursos/${cat.slug}.html" class="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/20 hover:border-indigo-500/60 transition group flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">${cat.badge}</span>
        <h3 class="text-base font-bold text-white mt-2 group-hover:text-indigo-400 transition">${cat.titulo}</h3>
        <p class="text-xs text-slate-400 mt-2 line-clamp-2">${cat.metaDesc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-xs text-indigo-400 font-semibold">
        <span>Acessar Cupons &amp; Vagas</span>
        <span>→</span>
      </div>
    </a>
  `).join('\n');

  const cityLinks = Object.entries(CITIES_INFO).map(([key, city]) => `
    <a href="/cursos/melhores-cursos-online-capacitacao-profissional-${key}.html" class="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-300 hover:text-white transition flex items-center justify-between">
      <span>📍 ${city.name} (${city.uf})</span>
      <span class="text-indigo-400 font-mono text-[11px]">90% OFF</span>
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
  <link rel="dns-prefetch" href="//udemy.sjv.io" />
  <link rel="preconnect" href="//udemy.sjv.io" crossorigin />
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

  <title>🎓 Portal de Cursos Online, Cupons Udemy & Capacitação Profissional | AQUITEM</title>
  <meta name="description" content="Central nacional de cursos online com certificado válido, cupons de desconto de até 90% OFF na Udemy e capacitação profissional nas 64 principais cidades do Brasil.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/cursos">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #050711; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-indigo-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/cursos" class="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM CURSOS &amp; CAPACITAÇÃO</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-3xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-wider">Rede Global Udemy &amp; Impact Radius</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Cursos Online com Certificado &amp; Cupons Promocionais</h1>
      <p class="text-slate-400 text-xs md:text-sm">Desenvolva as habilidades mais valorizadas pelo mercado de trabalho com descontos de até 90% OFF e emissão de certificado oficial.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="mb-12">
      <h2 class="text-lg md:text-xl font-bold text-white mb-4">Categorias em Destaque Nacional</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${categoryCards}
      </div>
    </div>

    <div class="mt-12 pt-8 border-t border-slate-800">
      <h2 class="text-lg md:text-xl font-bold text-white mb-2">Cursos e Capacitação Profissional por Cidade</h2>
      <p class="text-xs text-slate-400 mb-6">Selecione sua cidade para acessar o guia regional de capacitação e vagas de cursos técnicos:</p>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${cityLinks}
      </div>
    </div>
  </main>

  <!-- FOOTER INSTITUCIONAL COM TRANSPARÊNCIA E-E-A-T -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
    <div class="max-w-4xl mx-auto px-4 space-y-3">
      <p class="font-semibold text-slate-300">© 2026 Aqui Tem Achadinhos — Cursos Online, Capacitação Profissional &amp; Parceria Oficial Udemy / Impact.</p>
      <p class="text-[11px] text-slate-500 leading-relaxed">
        <b>Transparência Comercial &amp; E-E-A-T:</b> O portal Aqui Tem Achadinhos participa de programas oficiais de afiliados. Ao se inscrever através dos nossos links, podemos receber comissões sem qualquer custo extra para você.
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

async function generateAllEducationalPages() {
  console.log("=======================================================");
  console.log("🚀 GERANDO MOTOR PROGRAMÁTICO DE CURSOS UDEMY COM DADOS LOCAIS");
  console.log("=======================================================\n");

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const generatedUrls = [];
  const categoryUrls = [];
  const cityUrls = [];

  // 1. Hubs Nacionais de Categorias
  for (const cat of NATIONAL_CATEGORY_HUBS) {
    const html = renderEducationalPage({
      slug: cat.slug,
      title: cat.titulo,
      h1: cat.h1,
      metaDesc: cat.metaDesc,
      badge: cat.badge,
      cityName: "Brasil",
      isCity: false
    });
    const outPath = path.join(OUTPUT_DIR, `${cat.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    const url = `https://www.aquitemachadinhos.com.br/cursos/${cat.slug}`;
    generatedUrls.push(url);
    categoryUrls.push(url);
    console.log(`✓ [Categoria Nacional] /cursos/${cat.slug}.html`);
  }

  // 2. Páginas Multicidade (64 Cidades x 3 Intenções de Busca)
  for (const [key, city] of Object.entries(CITIES_INFO)) {
    // 2.1 "Melhores cursos online de capacitação profissional com certificado em [Nome_da_Cidade]"
    const slugMelhores = `melhores-cursos-online-capacitacao-profissional-${key}`;
    const htmlMelhores = renderEducationalPage({
      slug: slugMelhores,
      title: `Melhores Cursos Online de Capacitação Profissional com Certificado em ${city.name} - ${city.uf}`,
      h1: `Melhores Cursos Online de Capacitação Profissional em ${city.name} (${city.uf})`,
      metaDesc: `Guia completo dos melhores cursos de capacitação profissional com certificado válido em ${city.name} - ${city.uf}. Cupom de 90% OFF oficial na Udemy via Impact Radius.`,
      badge: `📍 CAPACITAÇÃO EM ${city.name.toUpperCase()}`,
      cityName: city.name,
      uf: city.uf,
      cidadeKey: key,
      isCity: true
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugMelhores}.html`), htmlMelhores, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/cursos/${slugMelhores}`);

    // 2.2 "Cupom de desconto ativo e promoções relâmpago para cursos da Udemy hoje"
    const slugCupom = `cupom-desconto-promocoes-relampago-udemy-${key}`;
    const htmlCupom = renderEducationalPage({
      slug: slugCupom,
      title: `Cupom de Desconto Ativo e Promoções Relâmpago para Cursos da Udemy Hoje em ${city.name} - ${city.uf}`,
      h1: `Cupom de Desconto Ativo e Promoções Relâmpago Cursos Udemy Hoje em ${city.name}`,
      metaDesc: `Acesse cupons de até 90% OFF e promoções relâmpago de cursos online da Udemy hoje para estudantes e profissionais em ${city.name} (${city.uf}).`,
      badge: `🔥 CUPOM UDEMY ${city.name.toUpperCase()}`,
      cityName: city.name,
      uf: city.uf,
      cidadeKey: key,
      isCity: true
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugCupom}.html`), htmlCupom, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/cursos/${slugCupom}`);

    // 2.3 "Treinamentos e cursos técnicos mais vendidos com vagas abertas na região"
    const slugTecnicos = `treinamentos-cursos-tecnicos-mais-vendidos-${key}`;
    const htmlTecnicos = renderEducationalPage({
      slug: slugTecnicos,
      title: `Treinamentos e Cursos Técnicos Mais Vendidos com Vagas Abertas na Região de ${city.name} - ${city.uf}`,
      h1: `Treinamentos e Cursos Técnicos Mais Vendidos com Vagas Abertas em ${city.name}`,
      metaDesc: `Confira a lista dos treinamentos e cursos técnicos mais vendidos com inscrições abertas e certificado reconhecido em ${city.name} e região metropolitana.`,
      badge: `⚡ VAGAS TÉCNICAS EM ${city.name.toUpperCase()}`,
      cityName: city.name,
      uf: city.uf,
      cidadeKey: key,
      isCity: true
    });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${slugTecnicos}.html`), htmlTecnicos, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/cursos/${slugTecnicos}`);

    cityUrls.push(`https://www.aquitemachadinhos.com.br/cursos/${slugMelhores}`);
  }

  // 3. Central Hub Index (/cursos)
  const hubHtml = renderEducationalHub(cityUrls, categoryUrls);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push('https://www.aquitemachadinhos.com.br/cursos');

  console.log("\n=======================================================");
  console.log(`🏆 TOTAL: ${generatedUrls.length} PÁGINAS EDUCACIONAIS GERADAS COM DADOS LOCAIS!`);
  console.log("=======================================================\n");

  return generatedUrls;
}

if (require.main === module) {
  generateAllEducationalPages().catch(console.error);
}

module.exports = { generateAllEducationalPages, FEATURED_COURSES, NATIONAL_CATEGORY_HUBS, UDEMY_IMPACT_BASE_LINK };
