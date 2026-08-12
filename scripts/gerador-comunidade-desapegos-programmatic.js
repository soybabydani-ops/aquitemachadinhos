/**
 * AQUITEM ACHADINHOS — GERADOR DE DOAÇÕES, DESAPEGOS E ADOÇÃO DE PETS (64 CIDADES)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'utilidade-publica');
const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

const PRODUTOS_DESAPEGOS_PETS = [
  {
    nome: "Coleira com Rastreador GPS & Suporte Airtag para Cães e Gatos",
    preco: "R$ 34,90",
    dePreco: "R$ 79,90",
    desconto: "56% OFF",
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    icone: "🐾",
    desc: "Segurança total para animais de estimação adotados ou resgatados."
  },
  {
    nome: "Kit 6 Caixas Organizadoras Grandes Multiuso Empilháveis para Mudança",
    preco: "R$ 59,90",
    dePreco: "R$ 119,00",
    desconto: "50% OFF",
    loja: "Mercado Livre Full",
    link: "https://meli.la/1U3rtgV",
    icone: "📦",
    desc: "Perfeito para organização de desapegos, doações e mudanças residenciais."
  },
  {
    nome: "Comedouro e Bebedouro Automático Antibacteriano para Pets",
    preco: "R$ 29,99",
    dePreco: "R$ 59,90",
    desconto: "50% OFF",
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH",
    icone: "🥣",
    desc: "Alimentação contínua e água fresca para animais recém-adotados."
  }
];

const ADSTERRA_SNIPPET = `
  <!-- ADSTERRA CPM MONETIZATION CONTAINER [ZONE: 5975392] -->
  <div class="my-6 text-center overflow-hidden rounded-2xl border border-emerald-500/20 p-2 bg-slate-900/60 backdrop-blur" style="min-height: 60px;">
    <div class="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Publicidade de Apoio Comunitário</div>
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

function fetchSupabaseUtilidade(slug) {
  return new Promise((resolve) => {
    const url = `${SUPABASE_REST}/comunidade_utilidade_publica?cidade_slug=eq.${encodeURIComponent(slug)}&status_ativo=eq.true&order=created_at.desc&limit=25`;
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

function renderDoacoesDesapegosPage({ slug, cityName, uf, items, canonicalUrl }) {
  const pageTitle = `⚠️ COMUNIDADE LOCAL: Achados, Perdidos e Doações em ${cityName} - Atualizado Agora`;
  const metaDesc = `Portal comunitário de ${cityName} (${uf}): feiras de adoção de pets, desapegos de móveis e eletros, campanhas solidárias e utilidade pública municipal atualizada em tempo real.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pageTitle,
    "description": metaDesc,
    "url": canonicalUrl,
    "areaServed": { "@type": "City", "name": cityName, "addressRegion": uf, "addressCountry": "BR" },
    "provider": { "@type": "Organization", "name": "Aqui Tem Achadinhos", "url": "https://www.aquitemachadinhos.com.br" }
  };

  const itemsHtml = items.map(item => {
    const isAdocao = item.categoria === 'Adocao_Pets';
    const isDesapego = item.categoria === 'Desapegos';
    const tagColor = isAdocao ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : (isDesapego ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30');
    const badgeLabel = isAdocao ? '🐾 ADOÇÃO PET' : (isDesapego ? '🏷️ DESAPEGO' : '🤝 DOAÇÃO');

    return `
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition shadow-xl relative backdrop-blur item-card" data-cat="${(item.categoria || '').toLowerCase()}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold border ${tagColor}">${badgeLabel}</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">${item.subcategoria || 'Comunidade'}</span>
          </div>
          <span class="text-xs text-slate-400 font-medium">📍 ${item.bairro ? `${item.bairro} (${cityName})` : cityName}</span>
        </div>
        <h4 class="text-base font-bold text-white mb-2 leading-snug">${item.titulo_item}</h4>
        <p class="text-slate-300 text-sm leading-relaxed mb-4">
          ${item.descricao}
        </p>
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div class="text-emerald-400 font-bold flex items-center gap-1.5">
            ✨ ${item.valor_ou_condicao || 'Disponível'}
          </div>
          <div class="text-slate-400 flex items-center gap-1">
            <span>🛡️ ${item.contato_anonimizado || 'Contato Comunitário'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  const affiliateHtml = PRODUTOS_DESAPEGOS_PETS.map(p => `
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
        <a href="/ir.html?url=${encodeURIComponent(p.link)}&origem=desapegos_${slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 transition">
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
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .pulse-badge { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .modal-backdrop { background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); }
  </style>

  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white" data-city="${slug}">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/${slug}-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">AQ</span>
        <span>AQUITEM <span class="text-emerald-400 font-normal">| ${cityName}</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/utilidade-publica/${slug}/achados-e-perdidos.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition font-medium">
          ⚠️ Achados e Perdidos
        </a>
      </div>
    </div>
  </header>

  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- BANNER HERO -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 p-4 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-badge"></span>
        <span>REDE COMUNITÁRIA MUNICIPAL • ${cityName.toUpperCase()} / ${uf}</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        Doações, Desapegos e Adoção de Animais em ${cityName}
      </h1>
      <p class="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
        Canal colaborativo de ${cityName}: publique desapegos de móveis e utilidades, acolha um pet em feiras de adoção responsável ou doe agasalhos e alimentos direto para quem precisa.
      </p>

      <div class="flex flex-wrap gap-2">
        <button onclick="openModal()" class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25 transition transform active:scale-95 flex items-center gap-2">
          <span>📢 Notificar Ocorrência / Cadastrar Item</span>
          <span class="text-xs bg-white/20 px-1.5 py-0.5 rounded">Grátis</span>
        </button>
        <a href="/${slug}-home.html" class="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs md:text-sm rounded-xl border border-slate-700 transition">
          ← Voltar ao Guia de ${cityName}
        </a>
      </div>
    </div>

    <!-- ADSTERRA MONETIZATION -->
    ${ADSTERRA_SNIPPET}

    <!-- FILTROS RÁPIDOS & BUSCA -->
    <div class="mb-6 space-y-3">
      <div class="relative">
        <input type="text" id="liveSearchInput" placeholder="🔍 Buscar por desapego, cachorro, doação, móvel ou bairro em ${cityName}..." class="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner">
      </div>
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar" id="filterChips">
        <button onclick="filterCategory('todos')" class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold whitespace-nowrap active-chip">Todos (<span id="totalCounter">${items.length}</span>)</button>
        <button onclick="filterCategory('desapegos')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🏷️ Desapegos Locais</button>
        <button onclick="filterCategory('adocao_pets')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🐾 Adoção de Pets</button>
        <button onclick="filterCategory('doacoes')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🤝 Doações & Campanhas</button>
      </div>
    </div>

    <!-- FEED CONTAINER -->
    <div class="space-y-4 mb-8" id="itemsFeedContainer">
      ${itemsHtml}
    </div>

    <!-- PRODUTOS AFILIADOS CONTEXTUAIS -->
    <div class="my-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <span>🐾 Cuidados Pet & Organização para Mudança</span>
          </h3>
          <p class="text-xs text-slate-400">Ofertas selecionadas com entrega rápida para ${cityName}</p>
        </div>
        <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">Parceiros Oficiais</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${affiliateHtml}
      </div>
    </div>

  </main>

  <!-- MODAL SUPABASE FORM -->
  <div id="submissionModal" class="fixed inset-0 z-50 modal-backdrop hidden flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg">✕</button>
      
      <div class="mb-4">
        <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider">📢 Publicação Comunitária</span>
        <h3 class="text-lg font-bold text-white">Cadastrar Ocorrência / Item em ${cityName}</h3>
        <p class="text-xs text-slate-400">Injeção automática no feed municipal sem intermediários.</p>
      </div>

      <form id="communityForm" onsubmit="handleFormSubmit(event)" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Categoria *</label>
          <select id="formCategoria" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
            <option value="Desapegos">🏷️ Desapego de Móvel / Eletro / Objeto</option>
            <option value="Adocao_Pets">🐾 Adoção Responsável de Cão / Gato</option>
            <option value="Doacoes">🤝 Doação Solidária (Roupas, Alimentos, etc.)</option>
            <option value="Perdidos">❌ Item ou Pet Perdido</option>
            <option value="Achados">✅ Item Encontrado</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Título do Anúncio *</label>
          <input type="text" id="formTitulo" required placeholder="Ex: Desapego de Mesa 4 Cadeiras em Ótimo Estado" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Descrição Completa *</label>
          <textarea id="formDescricao" rows="3" required placeholder="Detalhes do item, condições, motivo do desapego ou histórico do animal..." class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Bairro / Localidade *</label>
            <input type="text" id="formBairro" required placeholder="Ex: Centro" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Valor / Condição</label>
            <input type="text" id="formValor" placeholder="Ex: R$ 150 / Grátis / Adoção" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Contato / Local de Retirada *</label>
          <input type="text" id="formContato" required placeholder="Ex: Chamar pelo chat do portal / Retirada em portaria" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
        </div>

        <div class="pt-2">
          <button type="submit" id="submitBtn" class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2">
            <span>Publicar Imediatamente no Portal</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Rede Comunitária de ${cityName}.</p>
  </footer>

  <script>
    const CITY_SLUG = "${slug}";
    const CITY_NAME = "${cityName}";
    const CITY_UF = "${uf}";
    const SUPABASE_REST = "${SUPABASE_REST}";
    const SUPABASE_KEY = "${SUPABASE_ANON}";

    function openModal() { document.getElementById('submissionModal').classList.remove('hidden'); }
    function closeModal() { document.getElementById('submissionModal').classList.add('hidden'); }

    function filterCategory(cat) {
      const cards = document.querySelectorAll('.item-card');
      const input = document.getElementById('liveSearchInput');
      input.value = '';

      const chips = document.querySelectorAll('#filterChips button');
      chips.forEach(c => c.className = 'px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap');
      event.target.className = 'px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold whitespace-nowrap active-chip';

      let count = 0;
      cards.forEach(card => {
        const itemCat = card.getAttribute('data-cat') || '';
        if (cat === 'todos' || itemCat.includes(cat.toLowerCase())) {
          card.style.display = 'block';
          count++;
        } else {
          card.style.display = 'none';
        }
      });
      document.getElementById('totalCounter').innerText = count;
    }

    document.getElementById('liveSearchInput').addEventListener('input', function(e) {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.item-card');
      let count = 0;
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'block';
          count++;
        } else {
          card.style.display = 'none';
        }
      });
      document.getElementById('totalCounter').innerText = count;
    });

    async function handleFormSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      btn.innerText = 'Publicando no Supabase...';

      const categoria = document.getElementById('formCategoria').value;
      const titulo = document.getElementById('formTitulo').value;
      const descricao = document.getElementById('formDescricao').value;
      const bairro = document.getElementById('formBairro').value;
      const valor = document.getElementById('formValor').value;
      const contato = document.getElementById('formContato').value;

      const payload = {
        cidade_local: CITY_NAME + ', ' + CITY_UF,
        cidade_slug: CITY_SLUG,
        categoria: categoria,
        subcategoria: 'Comunidade Local',
        titulo_item: titulo,
        descricao: descricao,
        bairro: bairro,
        valor_ou_condicao: valor || 'Disponível',
        contato_anonimizado: contato,
        status_ativo: true,
        origem_coleta: 'comunidade_web'
      };

      try {
        const res = await fetch(SUPABASE_REST + '/comunidade_utilidade_publica', {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const feed = document.getElementById('itemsFeedContainer');
          const newCard = document.createElement('div');
          newCard.className = 'bg-slate-900/90 border border-emerald-500/60 rounded-2xl p-5 shadow-2xl relative backdrop-blur item-card animate-bounce';
          newCard.setAttribute('data-cat', categoria.toLowerCase());
          newCard.innerHTML = \`
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">\${categoria.toUpperCase()}</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black">NOVO AGORA</span>
              </div>
              <span class="text-xs text-slate-400 font-medium">📍 \${bairro}</span>
            </div>
            <h4 class="text-base font-bold text-white mb-2 leading-snug">\${titulo}</h4>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">\${descricao}</p>
            <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div class="text-emerald-400 font-bold">✨ \${valor || 'Disponível'}</div>
              <div class="text-slate-400">🛡️ \${contato}</div>
            </div>
          \`;

          feed.prepend(newCard);
          const counter = document.getElementById('totalCounter');
          if (counter) counter.innerText = parseInt(counter.innerText || '0') + 1;

          closeModal();
          document.getElementById('communityForm').reset();
          alert('✓ Publicação efetuada com sucesso!');
        } else {
          alert('Erro ao conectar ao Supabase.');
        }
      } catch (err) {
        alert('Erro: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Publicar Imediatamente no Portal';
      }
    }
  </script>
</body>
</html>`;
}

async function generateAllDoacoesDesapegos() {
  console.log("🚀 Iniciando geração de páginas de Doações, Desapegos e Adoção de Pets...");
  const urls = [];

  for (const [slug, info] of Object.entries(CITIES_INFO)) {
    const cityDir = path.join(OUTPUT_DIR, slug);
    if (!fs.existsSync(cityDir)) fs.mkdirSync(cityDir, { recursive: true });

    const items = await fetchSupabaseUtilidade(slug);

    const html = renderDoacoesDesapegosPage({
      slug,
      cityName: info.name,
      uf: info.uf,
      items: items.length > 0 ? items : [
        { categoria: 'Desapegos', subcategoria: 'Geral', titulo_item: `Desapego Solidário em ${info.name}`, descricao: `Itens de casa e utilidades para doação ou desapego no centro de ${info.name}.`, bairro: 'Centro', valor_ou_condicao: 'A Combinar', contato_anonimizado: 'Portal AQUITEM' }
      ],
      canonicalUrl: `https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/doacoes-e-desapegos`
    });

    const outPath1 = path.join(cityDir, 'doacoes-e-desapegos.html');
    const outPath2 = path.join(cityDir, 'desapegos.html');
    fs.writeFileSync(outPath1, html, 'utf8');
    fs.writeFileSync(outPath2, html, 'utf8');

    urls.push(`https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/doacoes-e-desapegos`);
    urls.push(`https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/desapegos`);
  }

  console.log(`🏆 Total de ${urls.length} rotas de desapegos e adoção geradas com sucesso!`);
  return urls;
}

if (require.main === module) {
  generateAllDoacoesDesapegos().catch(console.error);
}

module.exports = { generateAllDoacoesDesapegos };
