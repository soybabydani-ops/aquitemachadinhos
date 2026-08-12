/**
 * AQUITEM ACHADINHOS — GERADOR DE DOCUMENTO NACIONAL DO ESTUDANTE (MONETIZZE)
 * Páginas de alta conversão pSEO para meia-entrada em shows, cinema e Festa do Peão de Barretos.
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'estudante');

const MONETIZZE_BASE_LINK = "https://app.monetizze.com.br/r/AEK25825577";

const TOPIC_PAGES = [
  {
    slug: "como-pagar-meia-entrada-festa-do-peao-barretos",
    titulo: "Como Pagar Meia-Entrada na Festa do Peão de Barretos 2026 — Passo a Passo Oficial",
    subtitulo: "Garanta 50% de desconto legal em todos os setores e ingressos da Festa do Peão com a Carteirinha de Estudante Digital oficial FESN com QR Code de validação na catraca.",
    categoria: "Barretos & Shows",
    precoNormal: "R$ 85,00",
    precoPromo: "Apenas R$ 35,00 (Emissão Expressa)",
    destaque: "Economize até R$ 250 por dia nos ingressos do Parque do Peão",
    beneficios: [
      "Válida em todos os portões e catracas biométricas da Festa do Peão de Barretos",
      "Padrão nacional FESN / DNE com certificação digital ICP-Brasil e QR Code antifraude",
      "Aceita em shows sertanejos, festivais (Lollapalooza, The Town), cinemas e teatros",
      "Emissão 100% online direto no seu WhatsApp e e-mail no mesmo dia"
    ]
  },
  {
    slug: "carteirinha-estudante-digital-emitida-na-hora",
    titulo: "Carteirinha de Estudante Digital Emitida na Hora — Documento Oficial com QR Code",
    subtitulo: "Precisa do documento de estudante para hoje? Faça sua solicitação 100% digital e receba o comprovante oficial provisório no mesmo dia para comprar ingressos pela metade do preço.",
    categoria: "Emissão Rápida",
    precoNormal: "R$ 85,00",
    precoPromo: "Apenas R$ 35,00",
    destaque: "Emissão aprovada em minutos sem enfrentar filas",
    beneficios: [
      "Liberação do documento digital direto no seu celular",
      "Economia garantida de 50% em cinemas (Cinemark, Cinépolis, Kinoplex) e estádios",
      "Válida para alunos do Ensino Fundamental, Médio, Técnico, Superior, Pós e EAD",
      "Suporte humanizado e validação instantânea de matrícula"
    ]
  },
  {
    slug: "documento-nacional-estudante-fesn-qr-code",
    titulo: "Documento Nacional do Estudante Oficial FESN com QR Code — Lei da Meia-Entrada",
    subtitulo: "O documento estudantil padronizado pela Lei Federal 12.933/13 que garante seu direito de pagar meia em todo o território nacional sem questionamentos.",
    categoria: "Padrão Nacional",
    precoNormal: "R$ 85,00",
    precoPromo: "R$ 35,00 com taxa única",
    destaque: "Validade nacional em mais de 5.000 eventos pelo Brasil",
    beneficios: [
      "Certificação digital criptografada que passa em todos os leitores de QR Code",
      "Sem cobrança de mensalidades — taxa única anual",
      "Cartão digital no app e envio do documento definitivo",
      "Garantia de aceitação em arenas como Allianz Parque, MorumBIS e eventos culturais"
    ]
  },
  {
    slug: "desconto-50-ingressos-shows-cinema-sp",
    titulo: "Desconto de 50% em Ingressos de Cinema, Teatros e Shows na Grande São Paulo",
    subtitulo: "Não pague ingresso inteiro em 2026. Tenha sua carteirinha de estudante oficial no celular e economize centenas de reais todos os meses na Grande SP.",
    categoria: "Shows & Cinema SP",
    precoNormal: "R$ 85,00",
    precoPromo: "Apenas R$ 35,00",
    destaque: "Recupere o valor do documento já no primeiro ingresso",
    beneficios: [
      "Desconto de 50% em shows nacionais e internacionais em São Paulo",
      "Meia-entrada garantida em jogos de futebol no Morumbi, Neo Química Arena e Allianz",
      "Válida em todas as redes de cinema do estado de São Paulo",
      "Processamento rápido e seguro pela Monetizze"
    ]
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Apoio ao Estudante &amp; Meia-Entrada Legal</div>
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

function renderEstudantePage(item) {
  const pageTitle = `🎓 MEIA-ENTRADA LEGAL: ${item.titulo} | AQUITEM Estudante`;
  const metaDesc = `${item.subtitulo} Solicite seu Documento Nacional do Estudante oficial FESN com QR Code por apenas R$ 35.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/estudante/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": item.titulo,
    "description": metaDesc,
    "provider": { "@type": "Organization", "name": "FESN / Monetizze", "url": "https://www.aquitemachadinhos.com.br" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": "35.00",
      "availability": "https://schema.org/InStock",
      "url": MONETIZZE_BASE_LINK
    }
  };

  const beneficiosHtml = item.beneficios.map(b => `
    <li class="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
      <span class="text-emerald-400 font-bold text-base leading-none">✓</span>
      <span>${b}</span>
    </li>
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
  <link rel="dns-prefetch" href="https://efvuzxdhsirpvxclgdfg.supabase.co" />
  <link rel="preconnect" href="https://efvuzxdhsirpvxclgdfg.supabase.co" crossorigin />
  <link rel="dns-prefetch" href="https://app.monetizze.com.br" />
  <link rel="preconnect" href="https://app.monetizze.com.br" crossorigin />
  <link rel="preload" href="/assets/affiliate-tracker.js" as="script" />
  <link rel="preload" href="/assets/security-shield.js" as="script" />
  <script src="/assets/security-shield.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="verify-admitad" content="083fd78fe1" />
  <meta name="actionpay" content="NzI2MzEzNjgzNzgy" />
  <meta name="lomadee" content="2324685" />
  <meta name="partnerize-publisher-id" content="1101l435760" />
  <meta name="partnerize" content="1101l435760" />
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
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
    .pulse-scarcity { animation: pulse-red 1.2s infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-dne { background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 0 35px rgba(16, 185, 129, 0.1); }
    .emerald-glow { text-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/estudante" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Documento do Estudante</span></span>
      </a>
      <span class="text-[11px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
        Lei Federal 12.933/13
      </span>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- BARRA DE ESCASSEZ COM CRONÔMETRO REGRESSIVO EM JS PURO -->
    <div class="mb-6 p-3 bg-red-950/70 border border-red-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-red-200 shadow-xl">
      <div class="flex items-center gap-2 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-scarcity"></span>
        <span>⚠️ LOTE PROMOCIONAL COM EMISSÃO NO MESMO DIA</span>
      </div>
      <div class="font-mono font-bold bg-red-900/80 px-3 py-1 rounded-xl border border-red-500/40 text-white flex items-center gap-1.5">
        <span>Expira em:</span>
        <span id="countdownTimer" class="text-yellow-300 font-black">06:42</span>
      </div>
    </div>

    <!-- CARD PRINCIPAL DE CONVERSÃO -->
    <div class="mb-8 rounded-3xl glass-dne p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 uppercase tracking-wider">
          ✓ EMISSÃO 100% ONLINE &amp; QR CODE OFICIAL
        </span>
        <span class="text-amber-400 font-semibold">${item.destaque}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-3 tracking-tight emerald-glow">
        ${item.titulo}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${item.subtitulo}
      </p>

      <!-- PREÇO & CONDIÇÕES -->
      <div class="p-5 bg-black/60 rounded-2xl border border-emerald-500/20 my-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-400 block uppercase">Preço de Balcão:</span>
          <span class="text-slate-400 line-through text-base font-semibold">${item.precoNormal}</span>
        </div>
        <div>
          <span class="text-xs text-emerald-400 block font-bold uppercase">Taxa Única Promocional:</span>
          <span class="text-emerald-400 text-2xl md:text-3xl font-black">${item.precoPromo}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block uppercase">Padrão Nacional:</span>
          <span class="text-white text-xs font-bold">FESN com QR Code ICP</span>
        </div>
      </div>

      <!-- BENEFÍCIOS -->
      <div class="my-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 mb-3">
          Vantagens e Direitos Garantidos:
        </h3>
        <ul class="space-y-2.5">
          ${beneficiosHtml}
        </ul>
      </div>

      <!-- BOTÃO PRINCIPAL COM REDIRECIONAMENTO RASTREADO -->
      <div class="pt-4 space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(MONETIZZE_BASE_LINK)}&origem=monetizze_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👉 SOLICITAR CARTEIRINHA DIGITAL AGORA →</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center">
          <span>🔒 Processamento Seguro Monetizze</span>
          <span>⚡ Emissão Expressa no seu WhatsApp</span>
          <span>📜 Válida em Todo o Brasil</span>
        </div>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Documento Nacional do Estudante &amp; Meia-Entrada Legal.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO -->
  <script>
    (function() {
      var totalSeconds = 6 * 60 + 42;
      var el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 20) {
          totalSeconds = 10 * 60 + 15; // loop contínuo de escassez
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

function renderEstudanteHub() {
  const cardsHtml = TOPIC_PAGES.map(item => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${item.categoria}</span>
          <span class="text-emerald-400 font-bold">50% Meia-Entrada</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2 leading-snug">${item.titulo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-3">${item.subtitulo}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-base font-black text-emerald-400">${item.precoPromo}</span>
          <span class="text-xs text-slate-500 line-through">${item.precoNormal}</span>
        </div>
      </div>
      <a href="/estudante/${item.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
        Solicitar Carteirinha Digital →
      </a>
    </div>
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
  <meta name="partnerize-publisher-id" content="1101l435760" />
  <meta name="partnerize" content="1101l435760" />
  ${PROPELLERADS_SNIPPET}

  <title>🎓 Documento Nacional do Estudante (CIE) com QR Code | AQUITEM</title>
  <meta name="description" content="Emita sua Carteirinha de Estudante Digital oficial FESN com QR Code e pague meia-entrada em shows, cinema, teatros e na Festa do Peão de Barretos.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/estudante">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/estudante" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM ESTUDANTE</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Lei Federal 12.933/13</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Documento Nacional do Estudante com QR Code</h1>
      <p class="text-slate-400 text-xs md:text-sm">Economize 50% em ingressos de cinema, shows internacionais, futebol e rodeios em todo o Brasil.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Documento Oficial do Estudante.</p>
  </footer>
</body>
</html>`;
}

async function generateAllEstudantePages() {
  console.log("🚀 Gerando páginas do Documento Nacional do Estudante (Monetizze)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const item of TOPIC_PAGES) {
    const html = renderEstudantePage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/estudante/${item.slug}`);
    console.log(`✓ [Estudante] Gerada: /estudante/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderEstudanteHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/estudante');

  console.log(`🏆 Total de ${urls.length} rotas de carteirinha de estudante geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllEstudantePages().catch(console.error);
}

module.exports = { generateAllEstudantePages, TOPIC_PAGES, MONETIZZE_BASE_LINK };
