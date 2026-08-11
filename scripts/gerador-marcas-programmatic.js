/**
 * GERADOR PROGRAMÁTICO DE PÁGINAS DE MARCAS E FRANQUIAS (PROGRAMMATIC SEO)
 * Geração em massa de landing pages focadas em termos de busca de alta intenção.
 */

const fs = require('fs');
const path = require('path');

const MARCAS_DATA = [
  {
    slug: 'onde-encontrar-pralana-chapeus-em-sao-paulo',
    marca: 'Pralana Chapéus',
    cidade: 'São Paulo',
    cidadeSlug: 'sao-paulo',
    uf: 'SP',
    categoria: 'Moda & Couro Country',
    descricao: 'Encontre onde comprar chapéus Pralana oficiais em São Paulo: lojas no Centro, Jardins, Brás e pronta-entrega para a Festa do Peão 2026.',
    linkOficial: 'https://www.pralana.com.br',
    whatsapp: '19999998888',
    cupom: 'PRALANA-SP10',
    desconto: '10% OFF'
  },
  {
    slug: 'lojas-oficiais-botas-goyazes-grande-sp',
    marca: 'Botas Goyazes',
    cidade: 'São Paulo & Região Metropolitana',
    cidadeSlug: 'sao-paulo',
    uf: 'SP',
    categoria: 'Botas Texanas & Couros Nobres',
    descricao: 'Catálogo oficial de Botas Goyazes na Grande São Paulo: couros exóticos, modelos masculinos e femininos com pronta-entrega.',
    linkOficial: 'https://www.botasgoyazes.com.br',
    whatsapp: '62988887777',
    cupom: 'GOYAZES-VIP',
    desconto: '15% OFF'
  },
  {
    slug: 'descontos-cervejaria-colorado-hoje',
    marca: 'Cervejaria Colorado',
    cidade: 'Ribeirão Preto & São Paulo',
    cidadeSlug: 'ribeirao-preto',
    uf: 'SP',
    categoria: 'Gastronomia & Cerveja Artesanal',
    descricao: 'Achadinhos e descontos exclusivos da Cervejaria Colorado hoje: Appia, Indica, Ribeirão Lager e chopp artesanal com preço direto da fábrica.',
    linkOficial: 'https://www.cervejariacolorado.com.br',
    whatsapp: '16977776666',
    cupom: 'COLORADO-HOJE',
    desconto: '20% OFF'
  },
  {
    slug: 'onde-encontrar-thermas-dos-laranjais-em-barretos',
    marca: 'Thermas dos Laranjais',
    cidade: 'Olímpia & Barretos',
    cidadeSlug: 'olimpia',
    uf: 'SP',
    categoria: 'Resorts & Parque Aquático',
    descricao: 'Ingressos e pacotes oficiais do Thermas dos Laranjais para quem está na Festa do Peão de Barretos 2026 com desconto de grupo.',
    linkOficial: 'https://www.termas.com.br',
    whatsapp: '17966665555',
    cupom: 'TERMAS-PEAO26',
    desconto: '25% OFF'
  },
  {
    slug: 'onde-encontrar-prawer-chocolates-em-gramado',
    marca: 'Prawer Chocolates',
    cidade: 'Gramado',
    cidadeSlug: 'gramado',
    uf: 'RS',
    categoria: 'Chocolateria Artesanal',
    descricao: 'Onde encontrar lojas e fábricas da Prawer Chocolates em Gramado e Serra Gaúcha: chocolates puros, trufas e presentes do Natal Luz.',
    linkOficial: 'https://www.prawer.com.br',
    whatsapp: '54955554444',
    cupom: 'PRAWER-NATAL',
    desconto: '15% OFF'
  },
  {
    slug: 'descontos-salinas-maragogi-hoje',
    marca: 'Salinas Maragogi Resort',
    cidade: 'Maragogi',
    cidadeSlug: 'maragogi',
    uf: 'AL',
    categoria: 'Hotelaria & Resorts All Inclusive',
    descricao: 'Tarifas promocionais e reservas diretas no Salinas Maragogi All Inclusive Resort hoje: diárias com pensão completa sem taxa de agência.',
    linkOficial: 'https://www.salinas.com.br',
    whatsapp: '82922221111',
    cupom: 'SALINAS-PROMO',
    desconto: '20% OFF'
  },
  {
    slug: 'lojas-oficiais-cacau-show-sao-paulo',
    marca: 'Cacau Show',
    cidade: 'São Paulo',
    cidadeSlug: 'sao-paulo',
    uf: 'SP',
    categoria: 'Chocolates Finos & Presentes',
    descricao: 'Guia de lojas oficiais Cacau Show em São Paulo: endereços na Av. Paulista, shoppings, Mega Stores e pedidos com entrega rápida.',
    linkOficial: 'https://www.cacaushow.com.br',
    whatsapp: '11988889999',
    cupom: 'CACAU-SP',
    desconto: '10% OFF'
  },
  {
    slug: 'lojas-oficiais-lupo-grande-sp',
    marca: 'Lupo Oficial',
    cidade: 'Grande São Paulo',
    cidadeSlug: 'sao-paulo',
    uf: 'SP',
    categoria: 'Moda Íntima & Esportiva',
    descricao: 'Lojas oficiais Lupo e Lupo Sport na Grande São Paulo: roupas térmicas, meias, moda fitness e cuecas com cupom ativo.',
    linkOficial: 'https://www.lupo.com.br',
    whatsapp: '11977778888',
    cupom: 'LUPO-SP',
    desconto: '15% OFF'
  },
  {
    slug: 'onde-encontrar-tramontina-em-sao-paulo',
    marca: 'Tramontina Brasil',
    cidade: 'São Paulo',
    cidadeSlug: 'sao-paulo',
    uf: 'SP',
    categoria: 'Casa, Cozinha & Churrasco',
    descricao: 'Onde encontrar produtos oficiais Tramontina em São Paulo: facas de churrasco, panelas, ferramentas e artigos para casa com garantia oficial.',
    linkOficial: 'https://www.tramontina.com.br',
    whatsapp: '11966667777',
    cupom: 'TRAMONTINA-CHURRAS',
    desconto: '12% OFF'
  }
];

function gerarHTMLMarca(m) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${m.marca} em ${m.cidade}: Lojas Oficiais, Onde Comprar & Descontos | AQUITEM</title>
<meta name="description" content="${m.descricao}">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/marcas/${m.slug}">
<meta name="theme-color" content="#060e1d">

<!-- Schema.org / SEO Estruturado -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "${m.marca}",
  "description": "${m.descricao}",
  "url": "${m.linkOficial}",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "${m.cidade}, ${m.uf}"
  }
}
</script>

<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-[#060e1d] text-[#F8FAFC] min-h-screen flex flex-col font-sans">

<header class="border-b border-white/10 bg-[#081433]/90 backdrop-blur-md py-4 px-4 sm:px-6 sticky top-0 z-50">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <a href="../marcas.html" class="flex items-center gap-2 text-white font-extrabold text-base">
      <span>🏢</span> <span>AQUITEM <span class="text-[#F5D77F]">VITRINE DE MARCAS</span></span>
    </a>
    <a href="../marcas.html" class="text-xs font-bold text-[#CBD5E1] hover:text-white transition">
      &larr; Ver Todas as Marcas
    </a>
  </div>
</header>

<main class="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">

  <!-- CARD PRINCIPAL DA MARCA -->
  <div class="bg-gradient-to-br from-[#0d2244] to-[#071530] border-2 border-[#F5D77F]/40 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
    <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFE259] to-[#FFA751] text-[#1A0D00] font-black text-2xl grid place-items-center shadow-lg">
          ${m.marca.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span class="text-[11px] font-extrabold text-[#F5D77F] uppercase tracking-wider block">✦ Marca Oficial Verificada</span>
          <h1 class="text-2xl sm:text-4xl font-black text-white">${m.marca}</h1>
          <p class="text-xs text-[#94A3B8] font-semibold mt-0.5">📍 ${m.cidade}/${m.uf} · <span class="text-[#F5D77F]">${m.categoria}</span></p>
        </div>
      </div>
      <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold px-3 py-1.5 rounded-full">
        Cupom ${m.desconto} Ativo
      </span>
    </div>

    <p class="text-sm text-[#CBD5E1] leading-relaxed my-5">
      ${m.descricao}
    </p>

    <!-- TABELA DE ATENDIMENTO E CANAIS OFICIAIS -->
    <div class="rounded-2xl bg-black/50 border border-white/10 p-4 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#CBD5E1]">
        <div>🏢 <strong>Região de Atendimento:</strong> ${m.cidade} e todo o Brasil</div>
        <div>🏷️ <strong>Código Promocional:</strong> <span class="text-[#F5D77F] font-mono font-bold">${m.cupom}</span></div>
        <div>🌐 <strong>Site Oficial:</strong> <a href="${m.linkOficial}" target="_blank" rel="noopener" class="text-[#38BDF8] underline">Acessar Catálogo Oficial &rarr;</a></div>
        <div>⚡ <strong>Atendimento Direto:</strong> Pronta-entrega via WhatsApp</div>
      </div>
    </div>

    <!-- BOTÕES DE AÇÃO DIRETA (AFILIADO + WHATSAPP) -->
    <div class="flex flex-col sm:flex-row gap-3">
      <a href="${m.linkOficial}" target="_blank" rel="noopener" class="flex-1 text-center bg-gradient-to-r from-[#FFE259] to-[#FFA751] hover:from-[#FFA751] text-[#1A0D00] font-black py-4 px-6 rounded-xl shadow-lg transition text-sm uppercase tracking-wider">
        🛒 Comprar no Site Oficial com Desconto &rarr;
      </a>
      <a href="https://wa.me/${m.whatsapp}?text=${encodeURIComponent('Olá! Encontrei a ' + m.marca + ' na Vitrine Nacional da AQUITEM e gostaria de atendimento.')}" target="_blank" rel="noopener" class="flex-1 text-center bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-4 px-6 rounded-xl shadow-lg transition text-sm uppercase tracking-wider flex items-center justify-center gap-2">
        <span>💬</span> Chamar no WhatsApp
      </a>
    </div>
  </div>

  <!-- GANCHO PARA MARCAS E EMPRESAS FUNDADORAS -->
  <div class="bg-gradient-to-br from-[#133363] via-[#0d2244] to-[#071530] border border-[#F5D77F]/30 rounded-3xl p-8 text-center shadow-xl">
    <span class="text-xs font-black text-[#F5D77F] uppercase tracking-widest bg-[#F5D77F]/10 px-3 py-1 rounded-full border border-[#F5D77F]/20">
      Expansão Nacional B2B
    </span>
    <h3 class="text-2xl font-black text-white mt-3">Sua marca atende em todo o Brasil?</h3>
    <p class="text-xs sm:text-sm text-[#CBD5E1] mt-2 max-w-xl mx-auto leading-relaxed">
      Entre para a nossa Vitrine de Marcas Oficial e ganhe destaque pioneiro nas 60 cidades e polos turísticos do ecossistema Aqui Tem Achadinhos.
    </p>
    <a href="../marcas.html#planos-marcas" class="inline-block mt-6 bg-[#F5D77F] hover:bg-[#FFE259] text-[#1A0D00] font-black px-8 py-3.5 rounded-xl shadow-xl transition transform hover:scale-105 text-sm uppercase tracking-wider">
      🚀 Cadastrar Minha Marca Através do Portal Automático &rarr;
    </a>
  </div>

</main>

<footer class="border-t border-white/10 py-8 px-4 text-center text-xs text-[#64748B] bg-[#030712]">
  AQUITEM Vitrine de Marcas · Rede Nacional de Guias Locais & E-commerce
</footer>

</body>
</html>`;
}

// Compilação dos arquivos em marcas/
MARCAS_DATA.forEach(m => {
  const fileName = `${m.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'marcas', fileName);
  fs.writeFileSync(fullPath, gerarHTMLMarca(m), 'utf8');
  console.log(`✓ Gerada página programática de marca: marcas/${fileName}`);
});
console.log(`\n🏆 Total de ${MARCAS_DATA.length} páginas programáticas de marcas compiladas com sucesso!`);
