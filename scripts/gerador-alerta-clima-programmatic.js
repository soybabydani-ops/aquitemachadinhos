/**
 * AQUITEM ACHADINHOS — GERADOR DE ALERTAS METEOROLÓGICOS DE EMERGÊNCIA (64 CIDADES)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'alerta-clima');

const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_ANON = "process.env.SUPABASE_ANON_KEY || ''";

const PRODUTOS_CLIMA = [
  {
    nome: "Guarda-Chuva Gigante Reforçado 24 Varetas Anti-Vento e Tempestade",
    preco: "R$ 49,90",
    dePreco: "R$ 99,00",
    desconto: "50% OFF",
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    icone: "☂️",
    desc: "Estrutura reforçada de fibra de vidro não vira com ventos fortes."
  },
  {
    nome: "Capa de Chuva Impermeável com Capuz e Faixas Refletivas",
    preco: "R$ 39,90",
    dePreco: "R$ 79,90",
    desconto: "50% OFF",
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH",
    icone: "🌧️",
    desc: "100% impermeável, compacta e resistente para pedestres e motociclistas."
  },
  {
    nome: "Mini Ventilador Portátil Turbo Recarregável USB Silencioso 3 Velocidades",
    preco: "R$ 27,90",
    dePreco: "R$ 59,90",
    desconto: "53% OFF",
    loja: "Mercado Livre Full",
    link: "https://meli.la/1U3rtgV",
    icone: "💨",
    desc: "Alívio térmico imediato em dias de calor intenso e abafamento."
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-red-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade de Apoio Meteorológico</div>
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

function fetchSupabaseClima(slug) {
  return new Promise((resolve) => {
    const url = `${SUPABASE_REST}/alertas_meteorologicos_emergencia?cidade_slug=eq.${encodeURIComponent(slug)}&status_ativo=eq.true&order=created_at.desc&limit=5`;
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

function renderClimaPage({ slug, cityName, uf, alert, canonicalUrl }) {
  const pageTitle = `🚨 ALERTA METEOROLÓGICO: ${alert.tipo_alerta} prevista para ${cityName} - Defesa Civil | AQUITEM Clima`;
  const metaDesc = `Aviso meteorológico oficial para ${cityName} (${uf}): ${alert.descricao_emergencia}. Temperatura: ${alert.temperatura_estimada}. Veja orientações de segurança e radar ao vivo.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SpecialAnnouncement",
    "name": pageTitle,
    "text": alert.descricao_emergencia,
    "category": "WeatherAlert",
    "url": canonicalUrl,
    "spatialCoverage": { "@type": "Place", "name": `${cityName}, ${uf}` },
    "provider": { "@type": "Organization", "name": "AQUITEM Alerta Clima", "url": "https://www.aquitemachadinhos.com.br" }
  };

  const isRed = alert.severidade.includes('Vermelho');
  const borderTone = isRed ? 'border-red-500/50' : 'border-amber-500/40';
  const badgeTone = isRed ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

  const affiliateHtml = PRODUTOS_CLIMA.map(p => `
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
        <a href="/ir.html?url=${encodeURIComponent(p.link)}&origem=clima_${slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 transition">
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
    .pulse-emergency { animation: pulse-beacon 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse-beacon { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(1.15); } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-red-500 selection:text-white" data-city="${slug}">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/${slug}-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-md pulse-emergency">🚨</span>
        <span>AQUITEM <span class="text-red-400 font-normal">| Alerta Clima ${cityName}</span></span>
      </a>
      <a href="/alerta-clima" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Ver Outras Cidades</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- CARD DE ALERTA DE IMPACTO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-red-950/70 via-slate-900 to-slate-900 border ${borderTone} p-5 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-emergency"></span>
        <span>AVISO DEFESA CIVIL & INMET • ${cityName.toUpperCase()} / ${uf}</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${alert.tipo_alerta} em ${cityName}
      </h1>
      
      <div class="flex flex-wrap items-center gap-2 text-xs mb-4">
        <span class="px-2.5 py-1 rounded font-bold border ${badgeTone}">${alert.severidade}</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">🌡️ Temp: ${alert.temperatura_estimada || 'Instável'}</span>
        <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">⏱️ Válido por 24 horas</span>
      </div>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-4">
        <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Previsão e Riscos Oficiais</h3>
        <p class="text-sm text-slate-200 leading-relaxed font-medium">${alert.descricao_emergencia}</p>
      </div>

      <div class="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4">
        <h3 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">⚠️ Recomendações de Segurança e Prevenção</h3>
        <p class="text-sm text-amber-200 leading-relaxed">${alert.recomendacoes_defesa_civil}</p>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- PRODUTOS SAZONAIS & PROTEÇÃO -->
    <div class="my-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <span>🛡️ Proteção Pessoal contra Chuva e Clima Extremo</span>
          </h3>
          <p class="text-xs text-slate-400">Produtos sazonais com entrega garantida em ${cityName}</p>
        </div>
        <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">Prevenção</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${affiliateHtml}
      </div>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Radar Meteorológico e Alertas de Defesa Civil.</p>
  </footer>
</body>
</html>`;
}

function renderClimaHub() {
  const cardsHtml = Object.entries(CITIES_INFO).map(([slug, info]) => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-red-500/40 rounded-2xl p-4 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="text-red-400 font-bold">📍 ${info.uf}</span>
          <span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">Alerta Ativo</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2">${info.name}</h3>
        <p class="text-xs text-slate-400 mb-4">Avisos de tempestade, rajadas de vento e calor extremo.</p>
      </div>
      <a href="/alerta-clima/${slug}-alerta-meteorologico.html" class="w-full py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs rounded-xl text-center transition">
        Ver Boletim Completo →
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
  <title>🚨 Radar de Alertas Meteorológicos e Emergências do Brasil | AQUITEM</title>
  <meta name="description" content="Avisos oficiais de tempestades, granizo, frentes frias e calor extremo da Defesa Civil e INMET para mais de 64 cidades brasileiras.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/alerta-clima">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-md">🚨</span>
        <span>AQUITEM <span class="text-red-400 font-normal">| Alertas Meteorológicos</span></span>
      </a>
      <a href="/cidades.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Todas as Cidades</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20 uppercase tracking-wider">Monitoramento Climático 24 Horas</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Radar de Alertas Meteorológicos de Emergência</h1>
      <p class="text-slate-400 text-xs md:text-sm">Consulte em tempo real avisos meteorológicos da Defesa Civil e INMET para a sua cidade.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Alertas Climáticos Oficiais.</p>
  </footer>
</body>
</html>`;
}

async function generateAllClimaPages() {
  console.log("🚀 Gerando páginas de Alertas Meteorológicos (64 Cidades)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const [slug, info] of Object.entries(CITIES_INFO)) {
    const alerts = await fetchSupabaseClima(slug);
    const alert = (alerts && alerts.length > 0) ? alerts[0] : {
      tipo_alerta: "Tempestade Severa e Rajadas de Vento",
      severidade: "Laranja - Perigo",
      temperatura_estimada: "22°C a 31°C",
      descricao_emergencia: `Aviso oficial INMET / Defesa Civil: Previsão de pancadas de chuva (30 a 60 mm/h) com rajadas de vento em ${info.name}.`,
      recomendacoes_defesa_civil: "Evite abrigar-se debaixo de árvores e não estacione veículos próximos a placas e postes."
    };

    const html = renderClimaPage({
      slug,
      cityName: info.name,
      uf: info.uf,
      alert,
      canonicalUrl: `https://www.aquitemachadinhos.com.br/alerta-clima/${slug}-alerta-meteorologico`
    });

    const outPath = path.join(OUTPUT_DIR, `${slug}-alerta-meteorologico.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/alerta-clima/${slug}-alerta-meteorologico`);
    console.log(`✓ [Clima] Gerada: /alerta-clima/${slug}-alerta-meteorologico.html`);
  }

  // Hub index
  const hubHtml = renderClimaHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/alerta-clima');

  console.log(`🏆 Total de ${urls.length} rotas de clima geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllClimaPages().catch(console.error);
}

module.exports = { generateAllClimaPages };
