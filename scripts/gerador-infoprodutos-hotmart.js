/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DE INFOPRODUTOS HOTMART (FINANÇAS & INVESTIMENTOS)
 * Páginas de alta conversão mobile (< 0.3s), cronômetro regressivo de escassez e link oficial da Hotmart.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'infoprodutos');

const HOTMART_BASE_LINK = "https://go.hotmart.com/S107130565O";

const INFOPRODUTOS_DATA = [
  {
    slug: "clube-invest-v3",
    titulo: "Clube Invest v3 — Método de Independência Financeira e Renda Passiva",
    subtitulo: "Aprenda a estruturar uma carteira blindada de dividendos, fundos imobiliários e ativos de alta rentabilidade partindo do zero.",
    normal: "R$ 997,00",
    promo: "12x de R$ 29,82 ou R$ 297,00 à vista",
    desconto: "70% OFF",
    vagasRestantes: "7 vagas no lote promocional",
    garantia: "7 Dias de Garantia Incondicional",
    beneficios: [
      "Acesso vitalício ao portal exclusivo de membros e planilhas automatizadas",
      "Mapa estratégico de ativos pagadores de dividendos mensais",
      "Estratégia de proteção patrimonial e diversificação inteligente",
      "Grupo VIP de network com análises semanais de oportunidades"
    ]
  },
  {
    slug: "treinamento-liberdade-financeira-investimentos",
    titulo: "Treinamento Liberdade Financeira: Do Zero aos Primeiros Rendimentos",
    subtitulo: "O passo a passo prático e direto ao ponto para organizar seu orçamento, multiplicar seu dinheiro e gerar renda passiva todo mês.",
    normal: "R$ 497,00",
    promo: "12x de R$ 14,76 ou R$ 147,00 à vista",
    desconto: "70% OFF",
    vagasRestantes: "4 vagas restantes",
    garantia: "7 Dias de Garantia Blindada Hotmart",
    beneficios: [
      "Passo a passo descomplicado para iniciantes saírem das dívidas e investirem",
      "Como escolher as melhores ações e fundos imobiliários com segurança",
      "Checklist de investimentos seguros contra inflação e oscilações do mercado",
      "Suporte direto para tirar dúvidas sobre a plataforma"
    ]
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Patrocinador de Educação Financeira Oficial</div>
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

function renderInfoprodutoPage(item) {
  const pageTitle = `🔥 INSCRIÇÕES ABERTAS: ${item.titulo} [Lote Promocional] | AQUITEM Cursos`;
  const metaDesc = `${item.subtitulo} Garanta sua vaga com 70% de desconto por tempo limitado na Hotmart.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/infoprodutos/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": item.titulo,
    "description": metaDesc,
    "provider": { "@type": "Organization", "name": "Hotmart / AQUITEM Educação", "url": "https://www.aquitemachadinhos.com.br" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": "297.00",
      "availability": "https://schema.org/InStock",
      "url": HOTMART_BASE_LINK
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
  <link rel="dns-prefetch" href="https://go.hotmart.com" />
  <link rel="preconnect" href="https://go.hotmart.com" crossorigin />
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
  <meta property="og:type" content="product">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #070A13; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
    .pulse-scarcity { animation: pulse-red 1.2s infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-hotmart { background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 0 35px rgba(16, 185, 129, 0.1); }
    .gold-glow { text-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/infoprodutos" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-black flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Finanças &amp; Treinamentos</span></span>
      </a>
      <span class="text-[11px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
        Lote Promocional Ativo
      </span>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- BARRA DE ESCASSEZ COM CRONÔMETRO REGRESSIVO EM JS PURO -->
    <div class="mb-6 p-3 bg-red-950/70 border border-red-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-red-200 shadow-xl">
      <div class="flex items-center gap-2 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-scarcity"></span>
        <span>⚠️ ATENÇÃO: CONDIÇÃO ESPECIAL POR TEMPO LIMITADO</span>
      </div>
      <div class="font-mono font-bold bg-red-900/80 px-3 py-1 rounded-xl border border-red-500/40 text-white flex items-center gap-1.5">
        <span>O Lote Encerra em:</span>
        <span id="countdownTimer" class="text-yellow-300 font-black">08:34</span>
      </div>
    </div>

    <!-- CARD PRINCIPAL DE CONVERSÃO -->
    <div class="mb-8 rounded-3xl glass-hotmart p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 uppercase tracking-wider">
          🔥 ${item.desconto} • INSCRIÇÕES ABERTAS
        </span>
        <span class="text-amber-400 font-semibold">${item.vagasRestantes}</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-3 tracking-tight gold-glow">
        ${item.titulo}
      </h1>

      <p class="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
        ${item.subtitulo}
      </p>

      <!-- PREÇO & CONDICOES -->
      <div class="p-5 bg-black/60 rounded-2xl border border-emerald-500/20 my-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-400 block uppercase">De Tabela:</span>
          <span class="text-slate-400 line-through text-base font-semibold">${item.normal}</span>
        </div>
        <div>
          <span class="text-xs text-emerald-400 block font-bold uppercase">Valor no Lote de Hoje:</span>
          <span class="text-emerald-400 text-2xl md:text-3xl font-black">${item.promo}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block uppercase">Garantia Blindada:</span>
          <span class="text-white text-xs font-bold">${item.garantia}</span>
        </div>
      </div>

      <!-- BENEFÍCIOS -->
      <div class="my-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 mb-3">
          O Que Você Vai Destravar ao Entrar Agora:
        </h3>
        <ul class="space-y-2.5">
          ${beneficiosHtml}
        </ul>
      </div>

      <!-- BOTÃO PRINCIPAL COM REDIRECIONAMENTO RASTREADO -->
      <div class="pt-4 space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(HOTMART_BASE_LINK)}&origem=hotmart_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👉 CLIQUE AQUI PARA DESTRAVAR SEU ACESSO AGORA →</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center">
          <span>🔒 Compra 100% Segura na Hotmart</span>
          <span>⚡ Acesso Imediato no seu E-mail</span>
          <span>🛡️ 7 Dias de Garantia</span>
        </div>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Finanças, Investimentos &amp; Educação.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO -->
  <script>
    (function() {
      var totalSeconds = 8 * 60 + 34;
      var el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 30) {
          totalSeconds = 11 * 60 + 45; // loop contínuo de escassez
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

function renderInfoprodutosHub() {
  const cardsHtml = INFOPRODUTOS_DATA.map(item => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${item.desconto}</span>
          <span class="text-amber-400 font-bold">${item.vagasRestantes}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2 leading-snug">${item.titulo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-3">${item.subtitulo}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-base font-black text-emerald-400">${item.promo}</span>
          <span class="text-xs text-slate-500 line-through">${item.normal}</span>
        </div>
      </div>
      <a href="/infoprodutos/${item.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
        Destravar Vaga no Lote →
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

  <title>🎓 Treinamentos, Cursos e Infoprodutos de Finanças | AQUITEM</title>
  <meta name="description" content="Acesse os melhores treinamentos de investimentos, multiplicação de capital e independência financeira com desconto oficial de lote na Hotmart.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/infoprodutos">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #070A13; color: #F8FAFC; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/infoprodutos" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">🎓</span>
        <span>AQUITEM INFOPRODUTOS</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Educação Financeira &amp; Investimentos</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Treinamentos e Cursos Oficiais Hotmart</h1>
      <p class="text-slate-400 text-xs md:text-sm">Métodos testados e validados para acelerar sua liberdade financeira com condições promocionais por tempo limitado.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Infoprodutos e Educação Financeira.</p>
  </footer>
</body>
</html>`;
}

async function generateAllInfoprodutosPages() {
  console.log("🚀 Gerando páginas de Infoprodutos Hotmart (Finanças & Investimentos)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const item of INFOPRODUTOS_DATA) {
    const html = renderInfoprodutoPage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/infoprodutos/${item.slug}`);
    console.log(`✓ [Infoprodutos] Gerada: /infoprodutos/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderInfoprodutosHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/infoprodutos');

  console.log(`🏆 Total de ${urls.length} rotas de infoprodutos geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllInfoprodutosPages().catch(console.error);
}

module.exports = { generateAllInfoprodutosPages, INFOPRODUTOS_DATA, HOTMART_BASE_LINK };
