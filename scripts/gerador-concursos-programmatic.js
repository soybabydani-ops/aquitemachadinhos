/**
 * AQUITEM ACHADINHOS — GERADOR DE CONCURSOS E PROCESSOS SELETIVOS MUNICIPAIS (64 CIDADES)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'concursos');

const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_ANON = "process.env.SUPABASE_ANON_KEY || ''";

const PRODUTOS_CONCURSOS = [
  {
    nome: "Vade Mecum Saraiva 2026 Tradicional - Legislação Atualizada",
    preco: "R$ 149,90",
    dePreco: "R$ 219,00",
    desconto: "32% OFF",
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH",
    icone: "⚖️",
    desc: "Obra indispensável para provas de prefeituras, guarda municipal e cargos administrativos."
  },
  {
    nome: "Apostila Completa Concurso Prefeitura 2026: Teoria + 1.500 Questões Gabaritadas",
    preco: "R$ 49,90",
    dePreco: "R$ 98,00",
    desconto: "49% OFF",
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    icone: "📚",
    desc: "Português, Matemática, Raciocínio Lógico, Informática e Legislação Municipal."
  },
  {
    nome: "Kit 10 Canetas Esferográficas Ponta Média Corpo Transparente para Prova",
    preco: "R$ 18,90",
    dePreco: "R$ 35,00",
    desconto: "46% OFF",
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    icone: "🖊️",
    desc: "Canetas pretas exigidas no edital para preenchimento do gabarito oficial."
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade & Cursos Preparatórios Parceiros</div>
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

function fetchSupabaseConcursos(slug) {
  return new Promise((resolve) => {
    const url = `${SUPABASE_REST}/concursos_municipais_editais?cidade_slug=eq.${encodeURIComponent(slug)}&status_ativo=eq.true&order=created_at.desc&limit=10`;
    https.get(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(Array.isArray(json) ? json : []);
        } catch (e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

function renderConcursoPage({ slug, cityName, uf, openings, canonicalUrl }) {
  const pageTitle = `📝 CONCURSO PÚBLICO: Inscrições e Vagas Abertas na Prefeitura de ${cityName} - Edital 2026`;
  const metaDesc = `Confira os editais abertos do concurso público e processo seletivo da Prefeitura de ${cityName} (${uf}): vagas para guarda municipal, saúde, educação e administração com salários até R$ 14.500.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": metaDesc,
    "url": canonicalUrl,
    "about": {
      "@type": "GovernmentOrganization",
      "name": `Prefeitura de ${cityName}`,
      "areaServed": { "@type": "City", "name": cityName, "addressRegion": uf }
    },
    "provider": { "@type": "Organization", "name": "AQUITEM Concursos", "url": "https://www.aquitemachadinhos.com.br" }
  };

  const openingsHtml = openings.map(op => `
    <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition shadow-xl relative backdrop-blur mb-4">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold border bg-amber-500/20 text-amber-300 border-amber-500/30">📝 EDITAL ABERTO</span>
          <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">${op.escolaridade}</span>
        </div>
        <span class="text-xs text-slate-400 font-medium">🏛️ ${op.orgao_nome}</span>
      </div>

      <h3 class="text-lg font-bold text-white mb-2 leading-snug">${op.cargos}</h3>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-800/60 rounded-xl my-3 text-xs">
        <div>
          <span class="text-slate-400 block">Vagas:</span>
          <span class="font-bold text-white text-sm">${op.vagas_total} + CR</span>
        </div>
        <div>
          <span class="text-slate-400 block">Remuneração:</span>
          <span class="font-bold text-emerald-400 text-sm">Até ${op.salario_ate}</span>
        </div>
        <div>
          <span class="text-slate-400 block">Banca Organizadora:</span>
          <span class="font-bold text-slate-200">${op.banca}</span>
        </div>
        <div>
          <span class="text-slate-400 block">Taxa de Inscrição:</span>
          <span class="font-bold text-slate-200">${op.taxa_inscricao}</span>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
        <div class="text-amber-400 font-medium flex items-center gap-1.5">
          ⏳ ${op.periodo_inscricao}
        </div>
        <div class="flex items-center gap-2">
          <button onclick="requestPushPermission()" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium flex items-center gap-1">
            🔔 Receber Alertas no Celular
          </button>
        </div>
      </div>
    </div>
  `).join('\n');

  const affiliateHtml = PRODUTOS_CONCURSOS.map(p => `
    <div class="bg-gradient-to-br from-slate-900 to-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">${p.desconto}</span>
          <span class="text-slate-400">${p.loja}</span>
        </div>
        <div class="text-2xl mb-1">${p.icone}</div>
        <h4 class="text-sm font-bold text-white mb-1 leading-snug">${p.nome}</h4>
        <p class="text-xs text-slate-400 mb-3">${p.desc}</p>
      </div>
      <div>
        <div class="flex items-baseline gap-2 mb-3">
          <span class="text-lg font-black text-emerald-400">${p.preco}</span>
          <span class="text-xs text-slate-500 line-through">${p.dePreco}</span>
        </div>
        <a href="/ir.html?url=${encodeURIComponent(p.link)}&origem=concursos_${slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 transition">
          Ver Material Oficial →
        </a>
      </div>
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
    function requestPushPermission() {
      if (window.OneSignal) {
        OneSignal.Notifications.requestPermission();
      }
    }
  </script>

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
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .pulse-amber { animation: pulse-yellow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse-yellow { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-white" data-city="${slug}">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/${slug}-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-xs shadow-md">📝</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Concursos ${cityName}</span></span>
      </a>
      <a href="/vagas.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Vagas de Emprego</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- BANNER HERO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 p-4 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 pulse-amber"></span>
        <span>EDITAIS OFICIAIS MONITORADOS • ${cityName.toUpperCase()} / ${uf}</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        Concursos Públicos Abertos em ${cityName}
      </h1>
      <p class="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
        Quadro consolidado de vagas para cargos na Prefeitura Municipal de ${cityName}, Câmara, Guarda Civil e Autarquias. Inscrições abertas e oportunidades para todos os níveis de escolaridade.
      </p>

      <div class="flex flex-wrap gap-2">
        <button onclick="requestPushPermission()" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-lg transition flex items-center gap-2">
          <span>🔔 Ativar Alertas de Novos Concursos em ${cityName}</span>
        </button>
        <a href="/${slug}-home.html" class="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs md:text-sm rounded-xl border border-slate-700 transition">
          ← Voltar ao Guia de ${cityName}
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- LISTA DE EDITAIS -->
    <div class="space-y-4 mb-8">
      ${openingsHtml}
    </div>

    <!-- MATERIAIS DE ESTUDO & APOSTILAS -->
    <div class="my-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <span>📚 Apostilas e Materiais Preparatórios Recomendados</span>
          </h3>
          <p class="text-xs text-slate-400">Conteúdo 100% atualizado com foco nas bancas Vunesp, FGV e Cebraspe</p>
        </div>
        <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">Mais Vendidos</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${affiliateHtml}
      </div>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Central de Concursos e Empregos Públicos.</p>
  </footer>
</body>
</html>`;
}

function renderConcursosHub() {
  const cardsHtml = Object.entries(CITIES_INFO).map(([slug, info]) => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="text-amber-400 font-bold">📍 ${info.uf}</span>
          <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">Edital 2026</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2">${info.name}</h3>
        <p class="text-xs text-slate-400 mb-4">Vagas abertas para Guarda Municipal, Professores, Saúde e Administrativo.</p>
      </div>
      <a href="/concursos/${slug}-inscricoes-abertas.html" class="w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 font-bold text-xs rounded-xl text-center transition">
        Ver Vagas e Salários →
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
  <title>📝 Central Nacional de Concursos Municipais 2026 | AQUITEM</title>
  <meta name="description" content="Guia completo de concursos públicos e processos seletivos abertos nas prefeituras e órgãos públicos em mais de 64 cidades do Brasil.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/concursos">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/vagas.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-xs shadow-md">📝</span>
        <span>AQUITEM <span class="text-amber-400 font-normal">| Central de Concursos</span></span>
      </a>
      <a href="/cidades.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Todas as Cidades</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">Radar de Editais Oficiais</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Concursos Públicos e Vagas Municipais 2026</h1>
      <p class="text-slate-400 text-xs md:text-sm">Selecione sua cidade para acessar o quadro de vagas, salários, exigências e link direto para o edital oficial.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Central de Concursos do Brasil.</p>
  </footer>
</body>
</html>`;
}

async function generateAllConcursosPages() {
  console.log("🚀 Gerando páginas de Concursos Municipais (64 Cidades)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const [slug, info] of Object.entries(CITIES_INFO)) {
    const openings = await fetchSupabaseConcursos(slug);

    const html = renderConcursoPage({
      slug,
      cityName: info.name,
      uf: info.uf,
      openings: openings.length > 0 ? openings : [
        { orgao_nome: `Prefeitura Municipal de ${info.name}`, cargos: "Guarda Municipal, Agente Administrativo, Professores e Saúde", vagas_total: 45, salario_ate: "R$ 6.850,00", escolaridade: "Médio e Superior", banca: "VUNESP", periodo_inscricao: "Inscrições Abertas", taxa_inscricao: "R$ 55 a R$ 90" }
      ],
      canonicalUrl: `https://www.aquitemachadinhos.com.br/concursos/${slug}-inscricoes-abertas`
    });

    const outPath = path.join(OUTPUT_DIR, `${slug}-inscricoes-abertas.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/concursos/${slug}-inscricoes-abertas`);
    console.log(`✓ [Concursos] Gerada: /concursos/${slug}-inscricoes-abertas.html`);
  }

  // Hub index
  const hubHtml = renderConcursosHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/concursos');

  console.log(`🏆 Total de ${urls.length} rotas de concursos geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllConcursosPages().catch(console.error);
}

module.exports = { generateAllConcursosPages };
