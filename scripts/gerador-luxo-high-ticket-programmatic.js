/**
 * AQUITEM ACHADINHOS — O INTERCEPTADOR DE ALTO LUXO (JATOS PRIVADOS & HELICÓPTEROS)
 * Páginas estáticas ultraleves (< 2kb CSS inline) em tons pretos e dourados para público Ultra-VIP.
 */

const fs = require('fs');
const path = require('path');
const { LUXO_ROTAS } = require('./seeder-high-ticket-b2b-suite');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'luxo');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA LUXURY HIGH-CPC CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-amber-500/30 p-2 bg-slate-900/80 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-amber-400 uppercase tracking-widest font-semibold mb-1">Exclusive Private Aviation Sponsor</div>
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

function renderLuxoPage(r) {
  const servicoNome = (r.servico_luxo || r.servico || 'Jato_Privado').replace(/_/g, ' ');
  const pageTitle = `💎 ULTRA-VIP: Fretamento de Jato Executivo e Transfer Privado para ${r.destino_premium} - Cotação Imediata | AQUITEM Luxo`;
  const metaDesc = `Serviço exclusivo de private jet charter e helicóptero executivo saindo de ${r.origem_hub} para ${r.destino_premium}. Tempo de voo: ${r.tempo_estimado || r.tempo}. Atendimento 24/7 de alta discrição.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/luxo/${r.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Private Aviation Charter: ${r.origem_hub} to ${r.destino_premium}`,
    "serviceType": servicoNome,
    "provider": { "@type": "Organization", "name": "AQUITEM Private Aviation", "url": "https://www.aquitemachadinhos.com.br" },
    "description": metaDesc,
    "url": canonicalUrl
  };

  const precoFormatado = r.preco_estimado_cotacao || r.preco || 'Sob Consulta';
  const tempoFormatado = r.tempo_estimado || r.tempo || 'Sob Consulta';
  const linkAfiliado = r.link_afiliado_high_ticket || r.link || 'https://meli.la/1U3rtgV';

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
  <script src="/assets/security-shield.js" defer></script>

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
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060911; color: #F8FAFC; font-family: 'Cinzel', 'Playfair Display', Georgia, serif, system-ui; }
    .gold-glow { text-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
    .glass-vip { background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(245, 158, 11, 0.3); box-shadow: 0 0 35px rgba(245, 158, 11, 0.1); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black">

  <!-- HEADER LUXO -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-amber-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/luxo" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-widest uppercase">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center font-black text-xs shadow-md">💎</span>
        <span>AQUITEM <span class="text-slate-300 font-light">| Private Fleet &amp; Luxury</span></span>
      </a>
      <a href="/luxo" class="text-xs px-3 py-1.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-500/40 tracking-wider uppercase font-semibold">
        Rotas VIP
      </a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- CARD ULTRA VIP -->
    <div class="mb-6 rounded-3xl glass-vip p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-4">
        <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 uppercase tracking-widest">
          ✓ Fretamento Executivo Dedicado
        </span>
        <span class="text-slate-400">DISPONIBILIDADE: IMEDIATA</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4 tracking-tight gold-glow">
        ${servicoNome}: ${r.destino_premium}
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-black/60 rounded-2xl border border-amber-500/20 my-6 text-xs">
        <div>
          <span class="text-slate-400 block uppercase tracking-wider mb-1">Hub de Partida</span>
          <span class="font-bold text-white text-sm">${r.origem_hub}</span>
        </div>
        <div>
          <span class="text-slate-400 block uppercase tracking-wider mb-1">Tempo de Voo / Deslocamento</span>
          <span class="font-bold text-amber-400 text-sm">⏱️ ${tempoFormatado}</span>
        </div>
        <div>
          <span class="text-slate-400 block uppercase tracking-wider mb-1">Cotação Estimada</span>
          <span class="font-black text-emerald-400 text-base">${precoFormatado}</span>
        </div>
      </div>

      <div class="space-y-4 my-6 text-xs text-slate-300 leading-relaxed">
        <p>• <strong>Privacidade Absoluta:</strong> Acesso direto via hangares executivos VIP com embarque sem filas ou burocracias de terminais comerciais.</p>
        <p>• <strong>Frota Homologada:</strong> Aeronaves bimotores executivas, jatos light/midsize e helicópteros com certificação RBAC 135 da ANAC / FAA.</p>
        <p>• <strong>Catering &amp; Concierge:</strong> Serviço de bordo premium personalizado, translado terrestre em veículos blindados e reservas prioritárias em helipontos.</p>
      </div>

      <!-- BOTÃO DIRETO DE COTAÇÃO HIGH-TICKET -->
      <div class="pt-2">
        <a href="/ir.html?url=${encodeURIComponent(linkAfiliado)}&origem=luxo_${r.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-yellow-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👑 SOLICITAR COTAÇÃO EXECUTIVA CONFIDENCIAL AGORA →</span>
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — The Private Aviation &amp; High-Ticket Concierge.</p>
  </footer>
</body>
</html>`;
}

function renderLuxoHub() {
  const cardsHtml = LUXO_ROTAS.map(r => {
    const servico = (r.servico_luxo || r.servico || 'Jato_Privado').replace(/_/g, ' ');
    const tempo = r.tempo_estimado || r.tempo || 'Sob Consulta';
    const preco = r.preco_estimado_cotacao || r.preco || 'Sob Consulta';

    return `
      <div class="bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs mb-3">
            <span class="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${servico}</span>
            <span class="text-slate-400">⏱️ ${tempo}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 leading-snug">${r.destino_premium}</h3>
          <p class="text-xs text-slate-400 mb-2">Partida: ${r.origem_hub}</p>
          <p class="text-xs text-emerald-400 font-black mb-4">${preco}</p>
        </div>
        <a href="/luxo/${r.slug}.html" class="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
          Ver Rota e Cotação →
        </a>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  ${PROPELLERADS_SNIPPET}
  <title>💎 Central de Jatos Privados, Helicópteros e Fretamento Executivo | AQUITEM Luxo</title>
  <meta name="description" content="Catálogo exclusivo de fretamento de jatos executivos, helicópteros e logística blindada para Trancoso, Angra dos Reis, Jurerê, Miami, Barretos VIP e capitais.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/luxo">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060911; color: #F8FAFC; font-family: 'Cinzel', 'Playfair Display', Georgia, serif, system-ui; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-amber-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/luxo" class="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-widest uppercase">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-black flex items-center justify-center font-black text-xs shadow-md">💎</span>
        <span>AQUITEM LUXO</span>
      </a>
      <a href="/viagens.html" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Passagens Comerciais</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-widest">Private Fleet &amp; Jet Charter</span>
      <h1 class="text-2xl md:text-5xl font-black text-white mt-3 mb-3 tracking-tight">O Interceptador de Alto Luxo</h1>
      <p class="text-slate-400 text-xs md:text-sm">Logística privada de urgência, jatos executivos dedicados e traslados em helicóptero para destinos de altíssimo padrão.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Luxury Aviation Network.</p>
  </footer>
</body>
</html>`;
}

async function generateAllLuxoPages() {
  console.log("🚀 Gerando páginas do Interceptador de Alto Luxo...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const r of LUXO_ROTAS) {
    const html = renderLuxoPage(r);
    const outPath = path.join(OUTPUT_DIR, `${r.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/luxo/${r.slug}`);
    console.log(`✓ [Luxo] Gerada: /luxo/${r.slug}.html`);
  }

  // Hub index
  const hubHtml = renderLuxoHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/luxo');

  console.log(`🏆 Total de ${urls.length} rotas de luxo geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllLuxoPages().catch(console.error);
}

module.exports = { generateAllLuxoPages };
