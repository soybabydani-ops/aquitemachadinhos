/**
 * AQUITEM ACHADINHOS — GERADOR DE RADAR DE TRÂNSITO E MOBILIDADE RODOVIÁRIA (RMSP & SP)
 */

const fs = require('fs');
const path = require('path');
const { RODOVIAS_INCIDENTES } = require('./seeder-expansao-total');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'alerta-transito');

const PRODUTOS_AUTO = [
  {
    nome: "Suporte Veicular Celular com Trava Automática e Rotação 360°",
    preco: "R$ 29,90",
    dePreco: "R$ 69,90",
    desconto: "57% OFF",
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    icone: "📱",
    desc: "GPS sempre à vista com fixação ultra firme nas saídas de ar."
  },
  {
    nome: "Carregador Veicular Turbo 45W Dual USB-C + USB Quick Charge 3.0",
    preco: "R$ 38,00",
    dePreco: "R$ 85,00",
    desconto: "55% OFF",
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH",
    icone: "⚡",
    desc: "Carregamento ultra rápido enquanto utiliza Waze ou Google Maps no trânsito."
  },
  {
    nome: "Passagem de Ônibus Rodoviário & Vans Executivas (Sem Stress)",
    preco: "A partir de R$ 29,90",
    dePreco: "R$ 65,00",
    desconto: "54% OFF",
    loja: "Actionpay Viagens / AQUITEM",
    link: "https://meli.la/1U3rtgV",
    icone: "🚌",
    desc: "Evite o volante no trânsito pesado com assento leito e Wi-Fi grátis."
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-red-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade de Apoio aos Motoristas</div>
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

function renderTransitoPage(r) {
  const pageTitle = `⚠️ ALERTA TRÂNSITO: Situação agora na ${r.nome} - Rotas Alternativas | AQUITEM Trânsito`;
  const metaDesc = `Boletim de trânsito em tempo real na ${r.nome}: ${r.situacao}. Tempo de espera estimado: ${r.espera}. Veja o desvio e rotas alternativas agora.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/alerta-transito/${r.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    "name": pageTitle,
    "text": r.situacao,
    "category": "TrafficIncident",
    "url": canonicalUrl,
    "spatialCoverage": { "@type": "Place", "name": r.trecho },
    "provider": { "@type": "Organization", "name": "AQUITEM Mobilidade", "url": "https://www.aquitemachadinhos.com.br" }
  };

  const affiliateHtml = PRODUTOS_AUTO.map(p => `
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
        <a href="/ir.html?url=${encodeURIComponent(p.link)}&origem=transito_${r.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 transition">
          Ver Oferta Oficial →
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
    .pulse-danger { animation: pulse-red 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-red-500 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/viagens.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-md">🚨</span>
        <span>AQUITEM <span class="text-red-400 font-normal">| Radar de Trânsito SP</span></span>
      </a>
      <a href="/alerta-transito" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Ver Todas as Rodovias</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- ALERTA VERMELHO DE TRÂNSITO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-500/40 p-5 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-danger"></span>
        <span>BOLETIM DE EMERGÊNCIA VIÁRIA • ATUALIZADO AGORA</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${r.nome}: ${r.tipo}
      </h1>
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-4">
        <span class="px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-bold border border-red-500/30">⏱️ ${r.espera}</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">📍 ${r.trecho}</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">🛣️ ${r.sentido}</span>
      </div>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-4">
        <h3 class="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Situação ao Vivo na Pista</h3>
        <p class="text-sm text-slate-200 leading-relaxed font-medium">${r.situacao}</p>
      </div>

      <div class="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4">
        <h3 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">🧭 Desvio & Rota Alternativa Recomendada</h3>
        <p class="text-sm text-emerald-200 leading-relaxed">${r.rota}</p>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- CONCESSIONÁRIA & SERVIÇO DE APOIO -->
    <div class="mb-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div>
        <span class="text-slate-400">Concessionária Responsável:</span>
        <span class="font-bold text-white ml-1">${r.concessionaria}</span>
      </div>
      <div class="text-emerald-400 font-medium">
        ✓ Guincho e Resgate Acionados no Trecho
      </div>
    </div>

    <!-- PRODUTOS AFILIADOS AUTOMOTIVOS -->
    <div class="my-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <span>🚗 Acessórios Essenciais para Motoristas e Viagens</span>
          </h3>
          <p class="text-xs text-slate-400">Navegue com bateria e suporte seguro em qualquer congestionamento</p>
        </div>
        <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">Ofertas do Dia</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${affiliateHtml}
      </div>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Radar de Mobilidade e Trânsito de São Paulo.</p>
  </footer>
</body>
</html>`;
}

function renderTransitoHub() {
  const cardsHtml = RODOVIAS_INCIDENTES.map(r => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">${r.tipo}</span>
          <span class="text-slate-400">${r.espera}</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${r.nome}</h3>
        <p class="text-xs text-slate-400 mb-2">📍 ${r.trecho}</p>
        <p class="text-xs text-slate-300 line-clamp-2 mb-4">${r.situacao}</p>
      </div>
      <a href="/alerta-transito/${r.slug}.html" class="w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1">
        Ver Rota Alternativa →
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
  <title>⚠️ Radar de Trânsito ao Vivo nas Rodovias de SP e RMSP | AQUITEM</title>
  <meta name="description" content="Acompanhe acidentes, paralisações, alagamentos e lentidão extrema nas rodovias Presidente Dutra, Imigrantes, Anchieta, Bandeirantes, Castello Branco e Marginais.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/alerta-transito">
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
        <span class="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-md">🚨</span>
        <span>AQUITEM <span class="text-red-400 font-normal">| Radar de Trânsito SP</span></span>
      </a>
      <a href="/viagens.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Passagens & Viagens</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20 uppercase tracking-wider">Monitoramento Viário em Tempo Real</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Radar de Trânsito nas Principais Rodovias de SP</h1>
      <p class="text-slate-400 text-xs md:text-sm">Boletins atualizados a cada 5 minutos com pontos de retenção, desvios e rotas alternativas para motoristas da Grande SP.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Radar de Trânsito e Mobilidade.</p>
  </footer>
</body>
</html>`;
}

async function generateAllTransitoPages() {
  console.log("🚀 Gerando páginas de Radar de Trânsito nas Rodovias...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const r of RODOVIAS_INCIDENTES) {
    const html = renderTransitoPage(r);
    const outPath = path.join(OUTPUT_DIR, `${r.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/alerta-transito/${r.slug}`);
    console.log(`✓ [Trânsito] Gerada: /alerta-transito/${r.slug}.html`);
  }

  // Hub index
  const hubHtml = renderTransitoHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/alerta-transito');

  console.log(`🏆 Total de ${urls.length} rotas de trânsito geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllTransitoPages().catch(console.error);
}

module.exports = { generateAllTransitoPages };
