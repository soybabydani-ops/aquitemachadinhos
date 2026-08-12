/**
 * AQUITEM ACHADINHOS — GERADOR DE LOGÍSTICA PESADA E FRETAMENTO INDUSTRIAL CORPORATIVO
 */

const fs = require('fs');
const path = require('path');
const { LOGISTICA_PESADA } = require('./seeder-high-ticket-b2b-suite');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'logistica-pesada');
const CORP_DIR = path.join(REPO_ROOT, 'corporativo');

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA HEAVY LOGISTICS B2B CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-blue-500/30 p-2 bg-slate-900/80 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-blue-400 uppercase tracking-widest font-semibold mb-1">Heavy Logistics & Industrial Cargo Sponsor</div>
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

function renderLogisticaPage(item) {
  const tipoOp = (item.tipo_operacao || item.tipo || 'Fretamento_Cargas_Aereas').replace(/_/g, ' ');
  const capacidade = item.capacidade_toneladas || item.capacidade || 'Sob Consulta';
  const sla = item.sla_urgencia || item.sla || 'Atendimento Imediato 24h';
  const cidade = item.cidade_origem || item.cidade || 'São Paulo';

  const pageTitle = `📊 OPERAÇÃO INDUSTRIAL: Painel de Viabilidade e Logística de Frotas de Última Hora - ${cidade} | AQUITEM`;
  const metaDesc = `Fretamento de cargas aéreas pesadas e transporte de frotas industriais saindo de ${cidade}. Capacidade: ${capacidade}. ${sla}. Cotação direta com validação de CNPJ.`;
  const canonicalUrl = `https://www.aquitemachadinhos.com.br/logistica-pesada/${item.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Industrial Logistics: ${cidade}`,
    "description": metaDesc,
    "url": canonicalUrl
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
    body { background-color: #080D1A; color: #F1F5F9; font-family: system-ui, -apple-system, sans-serif; }
    .glass-ind { background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(59, 130, 246, 0.3); box-shadow: 0 0 30px rgba(59, 130, 246, 0.1); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-slate-950/90 border-b border-blue-500/20 backdrop-blur">
    <div class="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/logistica-pesada" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight">
        <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">📦</span>
        <span>AQUITEM <span class="text-blue-400 font-normal">| Logística Pesada & Frotas</span></span>
      </a>
      <a href="/b2b" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Painel B2B</a>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
    
    <!-- CARD INDUSTRIAL -->
    <div class="mb-8 rounded-3xl glass-ind p-6 md:p-10 relative overflow-hidden">
      <div class="flex items-center justify-between text-xs mb-3">
        <span class="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 uppercase tracking-wider">
          ✓ ${tipoOp}
        </span>
        <span class="text-emerald-400 font-bold">DESPACHO 24/7</span>
      </div>

      <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
        Logística de Cargas Pesadas e Frotas: ${cidade}
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-black/50 rounded-2xl border border-blue-500/20 my-6 text-xs">
        <div>
          <span class="text-slate-400 block uppercase">Capacidade Operacional</span>
          <span class="font-bold text-white text-base">${capacidade}</span>
        </div>
        <div>
          <span class="text-slate-400 block uppercase">Nível de Serviço (SLA)</span>
          <span class="font-bold text-blue-400 text-base">${sla}</span>
        </div>
      </div>

      <!-- FORMULÁRIO B2B COM VALIDAÇÃO DE CNPJ -->
      <div class="p-6 bg-slate-950/80 rounded-2xl border border-slate-800">
        <h3 class="text-sm font-bold text-white mb-1 flex items-center gap-1.5 text-blue-400">
          <span>📋 Solicitar Cotação de Fretamento e Logística em Lote</span>
        </h3>
        <p class="text-xs text-slate-400 mb-4">Cotação direta com as maiores operadoras de frete cargueiro.</p>

        <form id="cargoForm" onsubmit="handleCargoSubmit(event)" class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">CNPJ da Empresa *</label>
              <input type="text" id="cnpjCargo" onblur="validateCargoCNPJ(this.value)" required placeholder="00.000.000/0001-00" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Razão Social *</label>
              <input type="text" id="empresaCargo" required placeholder="Nome da Empresa" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Contato do Responsável *</label>
              <input type="text" id="contatoCargo" required placeholder="Nome do Diretor / Gerente" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Telefone / WhatsApp Direto *</label>
              <input type="tel" id="telCargo" required placeholder="(11) 99999-9999" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500">
            </div>
          </div>

          <div class="pt-2">
            <button type="submit" id="cargoBtn" class="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2">
              <span>Calcular Cotação Industrial &amp; Fretamento Dedicado</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ADSTERRA BANNER -->
    ${ADSTERRA_SNIPPET}

  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Heavy Cargo Logistics &amp; Fleet Operations.</p>
  </footer>

  <script>
    async function validateCargoCNPJ(cnpjRaw) {
      const clean = cnpjRaw.replace(/\\D/g, '');
      if (clean.length === 14) {
        try {
          const res = await fetch('https://brasilapi.com.br/api/cnpj/v1/' + clean);
          if (res.ok) {
            const data = await res.json();
            if (data.razao_social) {
              document.getElementById('empresaCargo').value = data.razao_social;
            }
          }
        } catch (_) {}
      }
    }

    async function handleCargoSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('cargoBtn');
      btn.disabled = true;
      btn.innerText = 'Processando no Supabase...';

      const cnpj = document.getElementById('cnpjCargo').value;
      const empresa = document.getElementById('empresaCargo').value;
      const contato = document.getElementById('contatoCargo').value;
      const tel = document.getElementById('telCargo').value;

      try {
        await fetch('https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1/leads_b2b_corporativo', {
          method: 'POST',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            empresa_solicitante: empresa,
            cnpj: cnpj,
            contato_nome: contato,
            telefone: tel,
            tipo_solicitacao: "Logistica_${item.tipo_operacao}",
            cidade: "${item.cidade_origem}"
          })
        });

        alert('✓ Cotação registrada! O operador de logística entrará em contato em instantes.');
        document.getElementById('cargoForm').reset();
      } catch (err) {
        alert('Erro ao enviar solicitação.');
      } finally {
        btn.disabled = false;
        btn.innerText = 'Calcular Cotação Industrial & Fretamento Dedicado';
      }
    }
  </script>
</body>
</html>`;
}

function renderLogisticaHub() {
  const cardsHtml = LOGISTICA_PESADA.map(item => {
    const tipo = (item.tipo_operacao || item.tipo || 'Fretamento_Cargas_Aereas').replace(/_/g, ' ');
    const cidade = item.cidade_origem || item.cidade || 'São Paulo';
    const capacidade = item.capacidade_toneladas || item.capacidade || 'Sob Consulta';
    const sla = item.sla_urgencia || item.sla || '24/7 Ativo';

    return `
      <div class="bg-slate-900/80 border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-6 shadow-xl transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs mb-3">
            <span class="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">${tipo}</span>
            <span class="text-emerald-400 font-bold">24/7 Ativo</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-2 leading-snug">${cidade}</h3>
          <p class="text-xs text-slate-400 mb-2">Capacidade: ${capacidade}</p>
          <p class="text-xs text-blue-300 font-semibold mb-4">SLA: ${sla}</p>
        </div>
        <a href="/logistica-pesada/${item.slug}.html" class="w-full py-2.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs rounded-xl text-center transition">
          Ver Viabilidade de Carga →
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
  <title>📦 Logística Pesada, Fretamento Industrial e Cargas Aéreas | AQUITEM</title>
  <meta name="description" content="Operações de transporte de cargas pesadas, fretamento dedicado de aeronaves cargueiras e logística de frotas industriais na Grande São Paulo, Viracopos e Santos.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/logistica-pesada">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #080D1A; color: #F1F5F9; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased">
  <header class="sticky top-0 z-40 bg-slate-950/90 border-b border-blue-500/20 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/logistica-pesada" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight">
        <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">📦</span>
        <span>AQUITEM LOGÍSTICA PESADA</span>
      </a>
      <a href="/b2b" class="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">Painel B2B</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 uppercase tracking-wider">Heavy Cargo Operations</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Logística de Cargas Pesadas e Frotas Dedicadas</h1>
      <p class="text-slate-400 text-xs md:text-sm">Painel de fretamento de aeronaves cargueiras, transporte de frotas executivas e contratos de grande escala.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${cardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Industrial Logistics Network.</p>
  </footer>
</body>
</html>`;
}

async function generateAllLogisticaPages() {
  console.log("🚀 Gerando páginas de Logística Pesada e Fretamento Industrial...");
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(CORP_DIR)) fs.mkdirSync(CORP_DIR, { recursive: true });

  const urls = [];

  for (const item of LOGISTICA_PESADA) {
    const html = renderLogisticaPage(item);
    const outPath = path.join(OUTPUT_DIR, `${item.slug}.html`);
    fs.writeFileSync(outPath, html, 'utf8');
    urls.push(`https://www.aquitemachadinhos.com.br/logistica-pesada/${item.slug}`);

    // Cria também alias em /corporativo/
    if (item.slug === 'contratos-anuais-frotas-aereas') {
      fs.writeFileSync(path.join(CORP_DIR, `${item.slug}.html`), html, 'utf8');
      urls.push(`https://www.aquitemachadinhos.com.br/corporativo/${item.slug}`);
    }
    console.log(`✓ [Logística] Gerada: /logistica-pesada/${item.slug}.html`);
  }

  // Hub index
  const hubHtml = renderLogisticaHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  urls.push('https://www.aquitemachadinhos.com.br/logistica-pesada');

  console.log(`🏆 Total de ${urls.length} rotas de logística pesada geradas!`);
  return urls;
}

if (require.main === module) {
  generateAllLogisticaPages().catch(console.error);
}

module.exports = { generateAllLogisticaPages };
