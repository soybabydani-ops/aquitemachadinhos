/**
 * AQUITEM ACHADINHOS — GERADOR DE CONSULTAS DE CALENDÁRIOS E BENEFÍCIOS SOCIAIS 2026
 */

const fs = require('fs');
const path = require('path');
const { BENEFICIOS_DATA } = require('./seeder-alta-frequencia-cinco-sistemas');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'consultas');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-blue-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade de Apoio ao Cidadão</div>
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

function renderConsultaPage(ben) {
  const pageTitle = `📅 CONSULTA ATUALIZADA: Veja as datas de liberação e regras para o ${ben.nome} 2026 | AQUITEM Consultas`;
  const metaDesc = `Tabela completa e calendário oficial de saques para ${ben.nome}: órgão emissor ${ben.orgao}, regras de recebimento e prazos para consulta no app oficial.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/consultas/${ben.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": ben.nome,
    "serviceOperator": { "@type": "GovernmentOrganization", "name": ben.orgao },
    "description": metaDesc,
    "url": canonicalUrl
  };

  const rowsHtml = Object.entries(ben.calendario).map(([chave, valor]) => `
    <tr class="border-b border-slate-800 hover:bg-slate-800/40 transition">
      <td class="py-3 px-4 text-xs md:text-sm font-bold text-white">${chave}</td>
      <td class="py-3 px-4 text-xs md:text-sm text-emerald-400 font-semibold">${valor}</td>
    </tr>
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
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/consultas" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">📅</span>
        <span>AQUITEM <span class="text-blue-400 font-normal">| Consultas & Calendários</span></span>
      </a>
      <a href="/consultas" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Ver Todos os Benefícios</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- BANNER HERO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-slate-900 border border-blue-500/30 p-5 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
        <span>CALENDÁRIO OFICIAL • EXERCÍCIO 2026</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${ben.nome}
      </h1>
      <p class="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
        Consulte os lotes, prazos e datas de liberação bancária divulgados pelo <strong>${ben.orgao}</strong>.
      </p>

      <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-xs space-y-1">
        <span class="text-slate-400 block font-semibold">Quem tem direito:</span>
        <p class="text-slate-200">${ben.publico}</p>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

    <!-- TABELA DE CRONOGRAMA -->
    <div class="my-6 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
      <div class="p-4 bg-slate-800/80 border-b border-slate-700 font-bold text-sm text-white flex items-center justify-between">
        <span>📊 Tabela de Pagamentos e Liberação</span>
        <span class="text-xs text-blue-400 font-normal">Atualizado 2026</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400 uppercase">
              <th class="py-3 px-4 font-semibold">Grupo / Final NIS / Mês</th>
              <th class="py-3 px-4 font-semibold">Data / Janela de Pagamento</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <!-- REGRAS E COMO SACAR -->
    <div class="my-6 rounded-2xl bg-slate-900/50 border border-slate-800 p-5 space-y-3 text-xs text-slate-300">
      <h3 class="text-sm font-bold text-white flex items-center gap-1.5 text-blue-400">
        <span>🏦 Como Realizar o Saque e Consultar o Saldo</span>
      </h3>
      <p class="leading-relaxed text-slate-200">${ben.regras}</p>
      <div class="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl text-blue-200 font-medium">
        ℹ️ Dica Importante: Não compartilhe sua senha ou código de validação com terceiros. A consulta oficial é sempre 100% gratuita nos aplicativos dos bancos públicos.
      </div>
    </div>

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Portal de Informações e Utilidade Pública.</p>
  </footer>
</body>
</html>`;
}

function renderConsultasHub() {
  const cardsHtml = BENEFICIOS_DATA.map(ben => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 shadow-xl transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">Oficial 2026</span>
          <span class="text-slate-400 text-[11px]">Calendário</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2 leading-snug">${ben.nome}</h3>
        <p class="text-xs text-slate-400 mb-4">${ben.orgao}</p>
      </div>
      <a href="/consultas/${ben.slug}.html" class="w-full py-2.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 font-bold text-xs rounded-xl text-center transition">
        Ver Tabela de Datas →
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
  <title>📅 Portal de Consultas e Calendários de Pagamentos 2026 | AQUITEM</title>
  <meta name="description" content="Acesse as tabelas oficiais de pagamento do Bolsa Família, PIS/PASEP, INSS, FGTS Saque-Aniversário e cronogramas do Prouni e FIES 2026.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/consultas">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/consultas" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">📅</span>
        <span>AQUITEM <span class="text-blue-400 font-normal">| Consultas 2026</span></span>
      </a>
      <a href="/" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Página Inicial</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 uppercase tracking-wider">Cronogramas e Tabelas Oficiais</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Portal Nacional de Calendários de Benefícios 2026</h1>
      <p class="text-slate-400 text-xs md:text-sm">Consulte as datas exatas de saques, depósitos e cronogramas de programas estudantis e sociais no Brasil.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Portal de Consultas Cidadão.</p>
  </footer>
</body>
</html>`;
}

async function generateAllConsultasPages() {
  console.log("🚀 Gerando páginas de Consultas de Calendários e Benefícios...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const urls = [];

  for (const ben of BENEFICIOS_DATA) {
    const html = renderConsultaPage(ben);
    const outPath = path.join(OUTPUT_DIR, `${ben.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/consultas/${ben.slug}`);
    console.log(`✓ [Consultas] Gerada: /consultas/${ben.slug}.html`);
  }

  // Hub index
  const hubHtml = renderConsultasHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/consultas');

  console.log(`🏆 Total de ${urls.length} rotas de consultas geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllConsultasPages().catch(console.error);
}

module.exports = { generateAllConsultasPages };
