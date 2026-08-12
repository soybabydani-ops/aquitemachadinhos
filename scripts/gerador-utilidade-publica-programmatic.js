/**
 * AQUITEM ACHADINHOS — GERADOR DE UTILIDADE PÚBLICA PROGRAMÁTICA (pSEO & COMUNIDADE)
 * Gera páginas ultraleves (< 3kb CSS) para Achados & Perdidos e Portal de Doações em 64+ cidades.
 * Injeta Adsterra Zone 5975392, PropellerAds Zone 11558154, produtos afiliados contextuais (Shopee, Amazon, ML)
 * e formulário inteligente custo zero com integração em tempo real ao Supabase.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { CITIES_INFO } = require('./community-feed-harvester-engine');

const REPO_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'utilidade-publica');

const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

// Links de afiliados oficiais
const AFFILIATE_LINKS = {
  shopee: "https://s.shopee.com.br/30n7ohzzU6",
  amazon: "https://link.amazon/B0hmLsxcH",
  meli: "https://meli.la/1U3rtgV",
  shein: "https://onelink.shein.com/47/5ylqchgphidl"
};

// Produtos contextuais para Achados e Perdidos
const PRODUTOS_ACHADOS = [
  {
    nome: "Mini Rastreador GPS / Tag Bluetooth Anti-Perda (Bateria 1 Ano)",
    preco: "R$ 24,90",
    dePreco: "R$ 69,90",
    desconto: "64% OFF",
    loja: "Shopee Oficial",
    lojaTag: "shopee",
    link: AFFILIATE_LINKS.shopee,
    beneficio: "Localize chaves, carteiras e bolsas em tempo real pelo celular com alarme sonoro.",
    icone: "📡"
  },
  {
    nome: "Coleira Rastreadora com Suporte GPS & Placa QR Code para Pets",
    preco: "R$ 38,50",
    dePreco: "R$ 89,00",
    desconto: "57% OFF",
    loja: "Amazon Prime",
    lojaTag: "amazon",
    link: AFFILIATE_LINKS.amazon,
    beneficio: "Identificação permanente à prova d'água: quem encontrar seu pet escaneia e avisa na hora.",
    icone: "🐾"
  },
  {
    nome: "Carteira Masculina Antifurto com Trava Automática & Bloqueio RFID",
    preco: "R$ 34,99",
    dePreco: "R$ 79,90",
    desconto: "56% OFF",
    loja: "Mercado Livre Full",
    lojaTag: "mercadolivre",
    link: AFFILIATE_LINKS.meli,
    beneficio: "Protege documentos e cartões contra clonagem por aproximação e perdas acidentais.",
    icone: "🛡️"
  }
];

// Produtos contextuais para Doações
const PRODUTOS_DOACOES = [
  {
    nome: "Kit 6 Sacos a Vácuo Organizadores de Roupas e Cobertores + Bomba",
    preco: "R$ 29,90",
    dePreco: "R$ 69,90",
    desconto: "57% OFF",
    loja: "Shopee Oficial",
    lojaTag: "shopee",
    link: AFFILIATE_LINKS.shopee,
    beneficio: "Reduz o volume de doações e roupas em 80%, protegendo contra umidade, mofo e odores.",
    icone: "📦"
  },
  {
    nome: "Caixa Organizadora Grande Empilhável 50L Reforçada com Tampa",
    preco: "R$ 49,90",
    dePreco: "R$ 95,00",
    desconto: "47% OFF",
    loja: "Mercado Livre Full",
    lojaTag: "mercadolivre",
    link: AFFILIATE_LINKS.meli,
    beneficio: "Ideal para armazenamento, triagem e transporte seguro de arrecadações e doações.",
    icone: "🗃️"
  },
  {
    nome: "Mochila Escolar Resistente Multiuso Impermeável com Compartimentos",
    preco: "R$ 39,90",
    dePreco: "R$ 89,90",
    desconto: "55% OFF",
    loja: "Amazon Prime",
    lojaTag: "amazon",
    link: AFFILIATE_LINKS.amazon,
    beneficio: "Excelente custo-benefício para doação direta de kits escolares e materiais a estudantes.",
    icone: "🎒"
  }
];

// Injetores de anúncios CPM
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

function fetchSupabase(table, slug) {
  return new Promise((resolve) => {
    const url = `${SUPABASE_REST}/${table}?cidade_slug=eq.${encodeURIComponent(slug)}&status_ativo=eq.true&order=created_at.desc&limit=20`;
    https.get(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(Array.isArray(json) ? json : []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function renderHtmlPage({
  tipoSecao, // 'achados' | 'doacoes'
  slug,
  cityName,
  uf,
  items,
  canonicalUrl
}) {
  const isAchados = tipoSecao === 'achados';
  const pageTitle = isAchados
    ? `⚠️ ACHADOS E PERDIDOS: Documentos e Objetos em ${cityName} (${uf}) - Atualizado Agora`
    : `🤝 PORTAL DE DOAÇÕES em ${cityName} (${uf}): Roupas, Alimentos e Móveis - Atualizado Hoje`;
  
  const metaDesc = isAchados
    ? `Lista oficial de documentos perdidos, chaves, pets sumidos e objetos encontrados em ${cityName} - ${uf}. Notifique gratuitamente ou resgate seus pertences agora.`
    : `Portal comunitário de doações em ${cityName} - ${uf}: encontre ou doe roupas, agasalhos, móveis, material escolar e cestas de alimentos direto à comunidade.`;

  const bannerBadge = isAchados
    ? `🚨 REDE DE ALERTA DE UTILIDADE PÚBLICA • ${cityName.toUpperCase()} / ${uf}`
    : `🤝 PORTAL COMUNITÁRIO DE DOAÇÕES & SOLIDARIEDADE • ${cityName.toUpperCase()} / ${uf}`;

  const buttonText = isAchados ? "🚨 Notificar Item Perdido / Achado" : "🎁 Cadastrar Nova Doação";
  const prods = isAchados ? PRODUTOS_ACHADOS : PRODUTOS_DOACOES;

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isAchados ? "ItemList" : "Service",
    "name": pageTitle,
    "description": metaDesc,
    "url": canonicalUrl,
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "addressRegion": uf,
      "addressCountry": "BR"
    },
    "provider": {
      "@type": "Organization",
      "name": "Aqui Tem Achadinhos",
      "url": "https://www.aquitemachadinhos.com.br"
    }
  };

  // Render items cards
  const itemsHtml = items.map((item, idx) => {
    const isPerdido = item.tipo === 'Perdido';
    const tagColor = isPerdido ? 'bg-red-500/20 text-red-400 border-red-500/30' : (item.tipo === 'Achado' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30');
    const badgeLabel = item.tipo.toUpperCase();
    const categoriaLabel = item.categoria || 'Geral';
    const bairroLabel = item.bairro ? `📍 ${item.bairro}` : `📍 ${cityName}`;
    const extraLabel = isAchados ? (item.recompensa ? `💰 ${item.recompensa}` : '✓ Sem Custos') : (item.condicao_item ? `✨ ${item.condicao_item}` : '✓ Disponível');

    return `
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition shadow-xl relative backdrop-blur item-card" data-cat="${categoriaLabel.toLowerCase()}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold border ${tagColor}">${badgeLabel}</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">${categoriaLabel}</span>
          </div>
          <span class="text-xs text-slate-400 font-medium">${bairroLabel}</span>
        </div>
        <p class="text-slate-200 text-sm md:text-base leading-relaxed mb-4 font-normal">
          ${item.item_descricao}
        </p>
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div class="text-emerald-400 font-semibold flex items-center gap-1.5">
            ${extraLabel}
          </div>
          <div class="text-slate-400 flex items-center gap-1">
            <span>🛡️ ${item.contato_anonimizado || 'Contato via Central AQUITEM'}</span>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  // Render affiliate products
  const affiliateHtml = prods.map(p => `
    <div class="bg-gradient-to-br from-slate-900 to-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-amber-400/40 transition">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">${p.desconto}</span>
          <span class="text-slate-400 font-medium">${p.loja}</span>
        </div>
        <div class="text-2xl mb-1">${p.icone}</div>
        <h4 class="text-sm font-bold text-white mb-1 leading-snug">${p.nome}</h4>
        <p class="text-xs text-slate-400 mb-3">${p.beneficio}</p>
      </div>
      <div>
        <div class="flex items-baseline gap-2 mb-3">
          <span class="text-lg font-black text-emerald-400">${p.preco}</span>
          <span class="text-xs text-slate-500 line-through">${p.dePreco}</span>
        </div>
        <a href="/ir.html?url=${encodeURIComponent(p.link)}&origem=utilidade_${slug}" target="_blank" rel="noopener noreferrer sponsored" class="w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-1.5 transition">
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
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico">
  
  <!-- Tailwind CSS CDN + Micro Inline Reset (< 3kb) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { 500: '#059669', 600: '#047857' }
          }
        }
      }
    }
  </script>
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
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white" data-city="${slug}" data-secao="${tipoSecao}">

  <!-- HEADER DE NAVEGAÇÃO -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/${slug}-home.html" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">AQ</span>
        <span>AQUITEM <span class="text-emerald-400 font-normal">| ${cityName}</span></span>
      </a>
      <div class="flex items-center gap-2">
        <a href="/utilidade-publica/${slug}/${isAchados ? 'doacoes' : 'achados-e-perdidos'}.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1 font-medium">
          ${isAchados ? '🤝 Ir para Doações' : '⚠️ Ir para Achados'}
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <main class="flex-grow max-w-4xl mx-auto px-4 py-6 w-full">
    
    <!-- BANNER DE URGÊNCIA -->
    <div class="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 p-4 md:p-6 shadow-2xl relative overflow-hidden">
      <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-badge"></span>
        <span>${bannerBadge}</span>
      </div>
      <h1 class="text-xl md:text-3xl font-black text-white leading-tight mb-2">
        ${isAchados ? `Achados e Perdidos em ${cityName}` : `Portal de Doações e Solidariedade em ${cityName}`}
      </h1>
      <p class="text-slate-300 text-xs md:text-sm leading-relaxed mb-4">
        ${isAchados 
          ? `Espaço comunitário oficial para localização e devolução segura de documentos (CNH, RG), pets sumidos, chaves e pertences em ${cityName} - ${uf}. Registro 100% gratuito e anônimo.` 
          : `Canal direto para conectar quem deseja doar móveis, agasalhos, material escolar e cestas básicas a instituições e famílias de ${cityName} - ${uf}. Sem intermediários.`}
      </p>

      <div class="flex flex-wrap gap-2">
        <button onclick="openModal()" class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25 transition transform active:scale-95 flex items-center gap-2">
          <span>${buttonText}</span>
          <span class="text-xs bg-white/20 px-1.5 py-0.5 rounded">Grátis</span>
        </button>
        <a href="/${slug}-home.html" class="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-xs md:text-sm rounded-xl border border-slate-700 transition flex items-center gap-1.5">
          ← Voltar ao Guia de ${cityName}
        </a>
      </div>
    </div>

    <!-- ADSTERRA BANNER 1 -->
    ${ADSTERRA_SNIPPET}

    <!-- BARRA DE FILTROS RÁPIDOS & BUSCA -->
    <div class="mb-6 space-y-3">
      <div class="relative">
        <input type="text" id="liveSearchInput" placeholder="🔍 Buscar por item, documento, pet ou bairro..." class="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner">
      </div>
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar" id="filterChips">
        <button onclick="filterCategory('todos')" class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold whitespace-nowrap active-chip">Todos (<span id="totalCounter">${items.length}</span>)</button>
        ${isAchados ? `
          <button onclick="filterCategory('documentos')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">📄 Documentos</button>
          <button onclick="filterCategory('pets')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🐾 Pets / Animais</button>
          <button onclick="filterCategory('chaves')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🔑 Chaves</button>
          <button onclick="filterCategory('eletrônicos')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">📱 Eletrônicos</button>
        ` : `
          <button onclick="filterCategory('roupas')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">👕 Roupas & Agasalhos</button>
          <button onclick="filterCategory('móveis')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🛋️ Móveis & Eletros</button>
          <button onclick="filterCategory('alimentos')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">🍲 Alimentos</button>
          <button onclick="filterCategory('material')" class="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap">📚 Material Escolar</button>
        `}
      </div>
    </div>

    <!-- FEED DE ITENS DA COMUNIDADE -->
    <div class="space-y-4 mb-8" id="itemsFeedContainer">
      ${itemsHtml}
    </div>

    <!-- VITRINE DE PRODUTOS AFILIADOS CONTEXTUAIS -->
    <div class="my-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-5 shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
            <span>${isAchados ? '🛡️ Soluções Anti-Perda & Segurança Pessoal' : '📦 Itens Úteis para Organização de Doações'}</span>
          </h3>
          <p class="text-xs text-slate-400">Ofertas verificadas com envio rápido para ${cityName} e região</p>
        </div>
        <span class="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">Achadinhos do Dia</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${affiliateHtml}
      </div>
    </div>

    <!-- REGRAS DE SEGURANÇA E CONDUTA -->
    <div class="rounded-xl bg-slate-900/40 border border-slate-800/80 p-4 text-xs text-slate-400 space-y-2">
      <div class="font-bold text-slate-300 flex items-center gap-1">
        <span>🔒 Dicas de Segurança e Proteção Comunitária</span>
      </div>
      <p>• <strong>Documentos:</strong> Nunca divulgue números completos de CPF ou senhas em comentários públicos.</p>
      <p>• <strong>Encontros:</strong> Prefira realizar a entrega de itens e doações em locais públicos, portarias de prédios, postos policiais ou balcões comerciais.</p>
      <p>• <strong>Sem Cobranças:</strong> O serviço de achados e perdidos e doações da comunidade é 100% livre e gratuito.</p>
    </div>

  </main>

  <!-- MODAL DE CADASTRO COMUNITÁRIO CUSTO ZERO (SUPABASE) -->
  <div id="submissionModal" class="fixed inset-0 z-50 modal-backdrop hidden flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg">✕</button>
      
      <div class="mb-4">
        <span class="text-xs text-emerald-400 font-bold uppercase tracking-wider">${isAchados ? '🚨 Alerta Comunitário' : '🎁 Cadastro Solidário'}</span>
        <h3 class="text-lg font-bold text-white">${isAchados ? `Notificar Item Perdido ou Achado em ${cityName}` : `Cadastrar Doação para ${cityName}`}</h3>
        <p class="text-xs text-slate-400">Publicação instantânea no feed local. Sem necessidade de login.</p>
      </div>

      <form id="communityForm" onsubmit="handleFormSubmit(event)" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Tipo de Notificação *</label>
          <select id="formTipo" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
            ${isAchados ? `
              <option value="Perdido">❌ Perdi um item / documento / pet</option>
              <option value="Achado">✅ Encontrei um item / documento na rua</option>
            ` : `
              <option value="Doação Disponível">🎁 Tenho um item para doar</option>
              <option value="Campanha de Arrecadação">🤝 Campanha de arrecadação beneficente</option>
              <option value="Pedido de Ajuda">🙏 Preciso de ajuda / doação</option>
            `}
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Categoria *</label>
          <select id="formCategoria" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
            ${isAchados ? `
              <option value="Documentos">Documentos (CNH, RG, CPF)</option>
              <option value="Pets / Animais">Pets / Animais</option>
              <option value="Chaves">Chaves e Chaveiros</option>
              <option value="Carteiras e Cartões">Carteiras e Cartões</option>
              <option value="Eletrônicos e Celulares">Eletrônicos e Celulares</option>
              <option value="Bolsas e Mochilas">Bolsas e Mochilas</option>
              <option value="Objetos Pessoais">Outros Objetos</option>
            ` : `
              <option value="Roupas e Agasalhos">Roupas e Agasalhos</option>
              <option value="Móveis e Eletros">Móveis e Eletros</option>
              <option value="Alimentos e Cestas">Alimentos e Cestas Básicas</option>
              <option value="Material Escolar">Material Escolar e Livros</option>
              <option value="Brinquedos">Brinquedos Infantis</option>
              <option value="Pets / Ração">Itens e Ração para Pets</option>
            `}
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Descrição Detalhada *</label>
          <textarea id="formDescricao" rows="3" required placeholder="${isAchados ? 'Descreva características do item, cor, onde foi visto pela última vez...' : 'Descreva os itens disponíveis para doação, estado de conservação...'}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Bairro / Região *</label>
            <input type="text" id="formBairro" required placeholder="Ex: Centro" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">${isAchados ? 'Recompensa' : 'Condição'}</label>
            <input type="text" id="formExtra" placeholder="${isAchados ? 'Ex: Gratificação' : 'Ex: Em ótimo estado'}" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Ponto de Contato Seguro / Instruções *</label>
          <input type="text" id="formContato" required placeholder="Ex: Deixar na portaria / Chamar pelo Portal" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
        </div>

        <div class="pt-2">
          <button type="submit" id="submitBtn" class="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2">
            <span>Publicar Gratuitamente no Feed</span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <div class="max-w-4xl mx-auto px-4 space-y-2">
      <p>© 2026 Aqui Tem Achadinhos — Portal de Utilidade Pública e Guias Locais do Brasil.</p>
      <div class="flex items-center justify-center gap-4 text-slate-400 text-xs">
        <a href="/${slug}-home.html" class="hover:text-white">Guia ${cityName}</a>
        <a href="/cidades.html" class="hover:text-white">Todas as Cidades</a>
        <a href="/politica-de-privacidade.html" class="hover:text-white">Privacidade</a>
        <a href="/termos.html" class="hover:text-white">Termos</a>
      </div>
    </div>
  </footer>

  <!-- SCRIPT DE CLIENTE EM TEMPO REAL -->
  <script>
    const CITY_SLUG = "${slug}";
    const CITY_NAME = "${cityName}";
    const CITY_UF = "${uf}";
    const TIPO_SECAO = "${tipoSecao}";
    const SUPABASE_REST = "${SUPABASE_REST}";
    const SUPABASE_KEY = "${SUPABASE_ANON}";

    function openModal() {
      document.getElementById('submissionModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('submissionModal').classList.add('hidden');
    }

    // Filtros por categoria
    function filterCategory(cat) {
      const cards = document.querySelectorAll('.item-card');
      const input = document.getElementById('liveSearchInput');
      input.value = '';

      // Update chips UI
      const chips = document.querySelectorAll('#filterChips button');
      chips.forEach(c => {
        c.className = 'px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium whitespace-nowrap';
      });
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

    // Busca em tempo real
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

    // Submissão direta ao Supabase via REST API
    async function handleFormSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      btn.disabled = true;
      btn.innerText = 'Publicando no Supabase...';

      const tipo = document.getElementById('formTipo').value;
      const categoria = document.getElementById('formCategoria').value;
      const descricao = document.getElementById('formDescricao').value;
      const bairro = document.getElementById('formBairro').value;
      const extra = document.getElementById('formExtra').value;
      const contato = document.getElementById('formContato').value;

      const isAchados = TIPO_SECAO === 'achados';
      const endpoint = isAchados ? SUPABASE_REST + '/comunidade_achados_perdidos' : SUPABASE_REST + '/comunidade_doacoes';

      const payload = isAchados ? {
        cidade_local: CITY_NAME + ', ' + CITY_UF,
        cidade_slug: CITY_SLUG,
        tipo: tipo,
        categoria: categoria,
        item_descricao: descricao,
        bairro: bairro,
        recompensa: extra || 'Sem custos',
        contato_anonimizado: contato,
        status_ativo: true,
        origem_coleta: 'comunidade_web'
      } : {
        cidade_local: CITY_NAME + ', ' + CITY_UF,
        cidade_slug: CITY_SLUG,
        tipo: tipo,
        categoria: categoria,
        item_descricao: descricao,
        bairro: bairro,
        condicao_item: extra || 'Bom estado',
        contato_anonimizado: contato,
        status_ativo: true,
        origem_coleta: 'comunidade_web'
      };

      try {
        const res = await fetch(endpoint, {
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
          // Optimistic UI Append
          const feed = document.getElementById('itemsFeedContainer');
          const isPerdido = tipo === 'Perdido';
          const tagColor = isPerdido ? 'bg-red-500/20 text-red-400 border-red-500/30' : (tipo === 'Achado' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30');
          
          const newCard = document.createElement('div');
          newCard.className = 'bg-slate-900/90 border border-emerald-500/60 rounded-2xl p-5 shadow-2xl relative backdrop-blur item-card animate-bounce';
          newCard.setAttribute('data-cat', categoria.toLowerCase());
          newCard.innerHTML = \`
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold border \${tagColor}">\${tipo.toUpperCase()}</span>
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">\${categoria}</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black">NOVO AGORA</span>
              </div>
              <span class="text-xs text-slate-400 font-medium">📍 \${bairro}</span>
            </div>
            <p class="text-slate-200 text-sm md:text-base leading-relaxed mb-4 font-medium">
              \${descricao}
            </p>
            <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div class="text-emerald-400 font-semibold flex items-center gap-1.5">
                \${isAchados ? ('💰 ' + (extra || 'Sem custos')) : ('✨ ' + (extra || 'Disponível'))}
              </div>
              <div class="text-slate-400 flex items-center gap-1">
                <span>🛡️ \${contato}</span>
              </div>
            </div>
          \`;

          feed.prepend(newCard);
          setTimeout(() => newCard.classList.remove('animate-bounce'), 1500);

          const counter = document.getElementById('totalCounter');
          if (counter) counter.innerText = parseInt(counter.innerText || '0') + 1;

          closeModal();
          document.getElementById('communityForm').reset();
          alert('✓ Alerta publicado com sucesso! Obrigado por apoiar a comunidade de ' + CITY_NAME + '.');
        } else {
          alert('Houve uma instabilidade ao conectar ao Supabase. Tente novamente.');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao enviar notificação: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerText = 'Publicar Gratuitamente no Feed';
      }
    }
  </script>
</body>
</html>`;
}

// Render National Hub Index Page
function renderNationalHub() {
  const citiesArray = Object.entries(CITIES_INFO).map(([slug, info]) => ({
    slug,
    name: info.name,
    uf: info.uf
  }));

  const cityCardsHtml = citiesArray.map(c => `
    <div class="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-4 shadow-xl backdrop-blur transition flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-bold text-emerald-400">📍 ${c.uf}</span>
          <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">64 Cidades</span>
        </div>
        <h3 class="text-base font-bold text-white mb-2">${c.name}</h3>
        <p class="text-xs text-slate-400 mb-4">Feed de documentos, pets, chaves e campanhas ativas em ${c.name}.</p>
      </div>
      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
        <a href="/utilidade-publica/${c.slug}/achados-e-perdidos.html" class="py-2 px-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-center text-xs font-bold transition">
          ⚠️ Achados
        </a>
        <a href="/utilidade-publica/${c.slug}/doacoes.html" class="py-2 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-center text-xs font-bold transition">
          🤝 Doações
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
  <title>⚠️ Central Nacional de Achados e Perdidos & Portal de Doações | AQUITEM</title>
  <meta name="description" content="Rede comunitária nacional de utilidade pública: consulte documentos perdidos, chaves, pets sumidos e campanhas de doação em mais de 64 cidades do Brasil.">
  <link rel="canonical" href="https://www.aquitemachadinhos.com.br/utilidade-publica">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #0B0F19; color: #F3F4F6; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; }
    .glass-nav { background: rgba(11, 15, 25, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 text-white font-black text-sm md:text-base tracking-tight hover:opacity-90 transition">
        <span class="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">AQ</span>
        <span>AQUITEM <span class="text-emerald-400 font-normal">| Utilidade Pública Brasil</span></span>
      </a>
      <a href="/cidades.html" class="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">Ver Todas as Cidades</a>
    </div>
  </header>

  <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
    <div class="text-center max-w-2xl mx-auto mb-8">
      <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">Rede Solidária Nacional</span>
      <h1 class="text-2xl md:text-4xl font-black text-white mt-3 mb-3">Achados e Perdidos & Portal de Doações</h1>
      <p class="text-slate-400 text-xs md:text-sm">Selecione sua cidade para consultar alertas de documentos, pets sumidos, chaves e campanhas beneficentes ativas em tempo real.</p>
    </div>

    ${ADSTERRA_SNIPPET}

    <div class="mb-6">
      <input type="text" id="hubCitySearch" placeholder="🔍 Digite sua cidade (Ex: Barretos, São Paulo, Gramado...)" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition shadow-inner">
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="citiesGrid">
      ${cityCardsHtml}
    </div>
  </main>

  <footer class="mt-12 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
    <p>© 2026 Aqui Tem Achadinhos — Portal Comunitário Nacional.</p>
  </footer>

  <script>
    document.getElementById('hubCitySearch').addEventListener('input', function(e) {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('#citiesGrid > div');
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'flex' : 'none';
      });
    });
  </script>
</body>
</html>`;
}

// Master execution
async function generateAllUtilityPages() {
  console.log("🚀 Iniciando geração de páginas de Utilidade Pública Programática...");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const generatedUrls = [];

  // 1. Gerar páginas para as 64 cidades
  for (const [slug, info] of Object.entries(CITIES_INFO)) {
    const cityDir = path.join(OUTPUT_DIR, slug);
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }

    // Coletar itens reais do Supabase
    const achadosItems = await fetchSupabase('comunidade_achados_perdidos', slug);
    const doacoesItems = await fetchSupabase('comunidade_doacoes', slug);

    // Renderizar Achados & Perdidos
    const achadosHtml = renderHtmlPage({
      tipoSecao: 'achados',
      slug,
      cityName: info.name,
      uf: info.uf,
      items: achadosItems.length > 0 ? achadosItems : [
        { tipo: 'Perdido', categoria: 'Documentos', item_descricao: `Documentos pessoais perdidos na região central de ${info.name}. Notifique via portal.`, bairro: 'Centro', recompensa: 'Gratificação', contato_anonimizado: 'Central AQUITEM' }
      ],
      canonicalUrl: `https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/achados-e-perdidos`
    });

    const achadosPath = path.join(cityDir, 'achados-e-perdidos.html');
    fs.writeFileSync(achadosPath, achadosHtml, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/achados-e-perdidos`);

    // Renderizar Doações
    const doacoesHtml = renderHtmlPage({
      tipoSecao: 'doacoes',
      slug,
      cityName: info.name,
      uf: info.uf,
      items: doacoesItems.length > 0 ? doacoesItems : [
        { tipo: 'Doação Disponível', categoria: 'Roupas e Agasalhos', item_descricao: `Campanha de arrecadação e doação de agasalhos ativa em ${info.name}.`, bairro: 'Centro', condicao_item: 'Ótimo estado', contato_anonimizado: 'Central AQUITEM' }
      ],
      canonicalUrl: `https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/doacoes`
    });

    const doacoesPath = path.join(cityDir, 'doacoes.html');
    fs.writeFileSync(doacoesPath, doacoesHtml, 'utf8');
    generatedUrls.push(`https://www.aquitemachadinhos.com.br/utilidade-publica/${slug}/doacoes`);

    console.log(`✓ [${info.name} - ${info.uf}] Geradas: achados-e-perdidos.html (${achadosItems.length} itens) & doacoes.html (${doacoesItems.length} campanhas)`);
  }

  // 2. Gerar Hub Nacional /utilidade-publica/index.html
  const hubHtml = renderNationalHub();
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), hubHtml, 'utf8');
  generatedUrls.push(`https://www.aquitemachadinhos.com.br/utilidade-publica`);

  // 3. Gerar atalhos na raiz: achados-e-perdidos.html e doacoes.html
  fs.writeFileSync(path.join(REPO_ROOT, 'achados-e-perdidos.html'), hubHtml, 'utf8');
  fs.writeFileSync(path.join(REPO_ROOT, 'doacoes.html'), hubHtml, 'utf8');
  generatedUrls.push(`https://www.aquitemachadinhos.com.br/achados-e-perdidos`);
  generatedUrls.push(`https://www.aquitemachadinhos.com.br/doacoes`);

  console.log(`\n🏆 Total de ${generatedUrls.length} rotas programáticas geradas com sucesso!`);
  return generatedUrls;
}

if (require.main === module) {
  generateAllUtilityPages().catch(console.error);
}

module.exports = { generateAllUtilityPages };
