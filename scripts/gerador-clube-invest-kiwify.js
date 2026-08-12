/**
 * AQUITEM ACHADINHOS — GERADOR DE LANDING PAGES DO CLUBE INVEST (KIWIFY)
 * Treinamento de Inteligência Financeira e Multiplicação de Renda com link oficial Kiwify.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'clube-invest');

const KIWIFY_BASE_LINK = "https://pay.kiwify.com.br/pFhcTot?afid=StKTBKWy";

const CLUBE_INVEST_PAGES = [
  {
    slug: "como-destravar-independencia-financeira",
    titulo: "Como Destravar a Independência Financeira e Renda Passiva em 2026",
    subtitulo: "Conheça o método prático e comprovado para criar múltiplas fontes de renda, proteger seu patrimônio contra a inflação e multiplicar seu capital todos os meses.",
    categoria: "Independência Financeira",
    precoNormal: "R$ 997,00",
    precoPromo: "12x de R$ 19,78 ou R$ 197,00 à vista",
    desconto: "80% OFF",
    destaque: "Vagas remanescentes no lote promocional com acesso imediato",
    beneficios: [
      "Plano passo a passo para sair do zero e construir renda passiva recorrente",
      "Estratégia de investimento em dividendos e ativos de alta rentabilidade",
      "Planilhas financeiras inteligentes automatizadas de controle e metas",
      "Acesso instantâneo pela Kiwify com 7 dias de garantia incondicional"
    ]
  },
  {
    slug: "metodo-clube-invest-oficial-desconto",
    titulo: "Método Clube Invest Oficial — Desconto Especial de Vagas Abertas",
    subtitulo: "Acesso completo ao treinamento mais recomendado de finanças pessoais e investimentos inteligentes para acelerar sua liberdade financeira.",
    categoria: "Método Oficial",
    precoNormal: "R$ 997,00",
    precoPromo: "Apenas R$ 197,00 à vista",
    desconto: "80% OFF",
    destaque: "Apenas 5 vagas disponíveis com esta condição",
    beneficios: [
      "Metodologia validada por milhares de alunos em todo o Brasil",
      "Como escolher os melhores ativos sem depender de gerentes de banco",
      "Aulas práticas em vídeo em alta definição com linguagem direta e simples",
      "Suporte exclusivo para dúvidas na plataforma Kiwify"
    ]
  },
  {
    slug: "como-comecar-investir-pouco-dinheiro-passo-a-passo",
    titulo: "Como Começar a Investir com Pouco Dinheiro Passo a Passo Hoje",
    subtitulo: "Você não precisa de rios de dinheiro para começar. Aprenda a investir com segurança a partir de R$ 30 por mês e veja seu dinheiro render de verdade.",
    categoria: "Iniciantes & Prática",
    precoNormal: "R$ 497,00",
    precoPromo: "Apenas R$ 97,00 à vista",
    desconto: "80% OFF",
    destaque: "Primeiros rendimentos no seu primeiro mês",
    beneficios: [
      "Guia anti-erros: onde NUNCA colocar seu dinheiro e como evitar armadilhas",
      "Carteira recomendada para quem está começando com pouco capital",
      "Como usar os juros compostos a seu favor de forma exponencial",
      "Acesso liberado imediatamente após a confirmação do pagamento"
    ]
  },
  {
    slug: "treinamento-financas-pedro-henrique-etelvino",
    titulo: "Treinamento de Finanças e Investimentos — Pedro Henrique de Abreu Etelvino LTDA",
    subtitulo: "Formação completa e estruturada para dominar sua vida financeira, blindar seus ganhos e alcançar a tranquilidade que sua família merece.",
    categoria: "Formação Completa",
    precoNormal: "R$ 997,00",
    precoPromo: "Apenas R$ 197,00 no lote promocional",
    desconto: "80% OFF",
    destaque: "Certificado de conclusão e material de apoio em PDF",
    beneficios: [
      "Conteúdo direto ao ponto sem enrolação ou termos complicados de economia",
      "Estratégia de geração de caixa rápido e reinvestimento inteligente",
      "Acesso vitalício aos módulos gravados e atualizações periódicas",
      "Pagamento 100% seguro processado pela Kiwify"
    ]
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Apoio Educacional &amp; Inteligência Financeira</div>
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

function renderClubeInvestPage(item) {
  const pageTitle = `🚨 VAGAS ABERTAS: ${item.titulo} [80% OFF] | AQUITEM Clube Invest`;
  const metaDesc = `${item.subtitulo} Garanta sua vaga com 80% de desconto no lote oficial Kiwify por tempo limitado.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/clube-invest/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": item.titulo,
    "description": metaDesc,
    "provider": { "@type": "Organization", "name": "Clube Invest / Kiwify", "url": "https://www.aquitemachadinhos.com.br" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": "197.00",
      "availability": "https://schema.org/InStock",
      "url": KIWIFY_BASE_LINK
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
  <link rel="dns-prefetch" href="https://pay.kiwify.com.br" />
  <link rel="preconnect" href="https://pay.kiwify.com.br" crossorigin />
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
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .pulse-scarcity { animation: pulse-red 1.2s infinite; }
    @keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
    .glass-kiwify { background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 0 35px rgba(16, 185, 129, 0.1); }
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
      <a href="/clube-invest" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 text-black flex items-center justify-center font-black text-xs shadow-md">💰</span>
        <span>AQUITEM <span class="text-slate-300 font-normal">| Clube Invest</span></span>
      </a>
      <span class="text-[11px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
        Lote Exclusivo Kiwify
      </span>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- BARRA DE ESCASSEZ COM CRONÔMETRO REGRESSIVO EM JS PURO -->
    <div class="mb-6 p-3 bg-red-950/70 border border-red-500/50 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-red-200 shadow-xl">
      <div class="flex items-center gap-2 font-bold">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 pulse-scarcity"></span>
        <span>🚨 VAGAS REMANESCENTES DO LOTE PROMOCIONAL - ACESSO IMEDIATO</span>
      </div>
      <div class="font-mono font-bold bg-red-900/80 px-3 py-1 rounded-xl border border-red-500/40 text-white flex items-center gap-1.5">
        <span>Expira em:</span>
        <span id="countdownTimer" class="text-yellow-300 font-black">07:18</span>
      </div>
    </div>

    <!-- CARD PRINCIPAL DE CONVERSÃO -->
    <div class="mb-8 rounded-3xl glass-kiwify p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 uppercase tracking-wider">
          🔥 ${item.desconto} • INSCRIÇÕES ABERTAS
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
          <span class="text-xs text-slate-400 block uppercase">De Tabela:</span>
          <span class="text-slate-400 line-through text-base font-semibold">${item.precoNormal}</span>
        </div>
        <div>
          <span class="text-xs text-emerald-400 block font-bold uppercase">Valor Promocional Hoje:</span>
          <span class="text-emerald-400 text-2xl md:text-3xl font-black">${item.precoPromo}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block uppercase">Garantia Blindada:</span>
          <span class="text-white text-xs font-bold">7 Dias Incondicionais</span>
        </div>
      </div>

      <!-- BENEFÍCIOS -->
      <div class="my-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 mb-3">
          O Que Você Recebe ao Entrar Agora:
        </h3>
        <ul class="space-y-2.5">
          ${beneficiosHtml}
        </ul>
      </div>

      <!-- BOTÃO PRINCIPAL COM REDIRECIONAMENTO RASTREADO -->
      <div class="pt-4 space-y-3">
        <a href="/ir.html?url=${encodeURIComponent(KIWIFY_BASE_LINK)}&origem=kiwify_${item.slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-black text-sm md:text-base rounded-2xl text-center shadow-2xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 transform active:scale-95 tracking-wide">
          <span>👉 DESTRAVAR MINHA VAGA NO CLUBE INVEST AGORA →</span>
        </a>
        <div class="flex items-center justify-center gap-4 text-[11px] text-slate-400 text-center">
          <span>🔒 Pagamento Seguro pela Kiwify</span>
          <span>⚡ Acesso Liberado no E-mail em 1 Minuto</span>
          <span>🛡️ Satisfação Garantida</span>
        </div>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Inteligência Financeira e Investimentos.</p>
  </footer>

  <!-- SCRIPT DE CRONÔMETRO REGRESSIVO EM JS PURO -->
  <script>
    (function() {
      var totalSeconds = 7 * 60 + 18;
      var el = document.getElementById('countdownTimer');
      setInterval(function() {
        if (totalSeconds <= 25) {
          totalSeconds = 12 * 60 + 40; // loop dinâmico de escassez
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

function renderClubeInvestHub() {
  const cardsHtml = CLUBE_INVEST_PAGES.map(item => `
    <div class="bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">${item.categoria}</span>
          <span class="text-amber-400 font-bold">${item.desconto}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2 leading-snug">${item.titulo}</h3>
        <p class="text-xs text-slate-400 mb-4 line-clamp-3">${item.subtitulo}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-base font-black text-emerald-400">${item.precoPromo}</span>
          <span class="text-xs text-slate-500 line-through">${item.precoNormal}</span>
        </div>
      </div>
      <a href="/clube-invest/${item.slug}.html" class="w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl text-center transition tracking-wider">
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

  <title>💰 Clube Invest — Inteligência Financeira e Renda Passiva | AQUITEM</title>
  <meta name="description" content="Acesse o método oficial Clube Invest com desconto especial na Kiwify. Multiplicação de capital, dividendos e independência financeira.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/clube-invest">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #060913; color: #F8FAFC; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-black/90 border-b border-emerald-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/clube-invest" class="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wider">
        <span class="w-8 h-8 rounded-lg bg-emerald-600 text-black flex items-center justify-center font-black text-xs shadow-md">💰</span>
        <span>AQUITEM CLUBE INVEST</span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Metodologia Oficial Kiwify</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Clube Invest: Método de Renda Passiva</h1>
      <p class="text-slate-400 text-xs md:text-sm">Aprenda a investir com segurança, multiplicar seu patrimônio e gerar renda passiva todos os meses.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Inteligência Financeira e Investimentos.</p>
  </footer>
</body>
</html>`;
}

async function generateAllClubeInvestPages() {
  console.log("🚀 Gerando páginas do Clube Invest (Kiwify)...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const item of CLUBE_INVEST_PAGES) {
    const html = renderClubeInvestPage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/clube-invest/${item.slug}`);
    console.log(`✓ [Clube Invest] Gerada: /clube-invest/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderClubeInvestHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/clube-invest');

  console.log(`🏆 Total de ${urls.length} rotas do Clube Invest geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllClubeInvestPages().catch(console.error);
}

module.exports = { generateAllClubeInvestPages, CLUBE_INVEST_PAGES, KIWIFY_BASE_LINK };
