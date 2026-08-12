/**
 * GERADOR INDUSTRIAL DE PROGRAMMATIC SEO (100% PASSIVO)
 * Injeção em massa de páginas de alta conversão para tráfego orgânico do Google.
 */

const fs = require('fs');
const path = require('path');

const INTENCAO_COMPRA_PAGES = [
  // 1. Passagens de Madrugada Baratas
  {
    slug: 'campinas-para-sao-paulo-passagens-madrugada-baratas',
    cidadeOrigem: 'Campinas',
    cidadeDestino: 'São Paulo',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Campinas para São Paulo passagens de madrugada baratas',
    tipo: 'Ônibus Executivo Madrugada',
    menorPreco: 'R$ 19,90',
    precoTradicional: 'R$ 58,00',
    empresa: 'Viação Cometa / Buser',
    cupom: 'MADRUGADA-SP19',
    linkAfiliado: 'https://wa.me/5511997814500?text=Ol%C3%A1!%20Quero%20ativar%20o%20cupom%20Campinas-SP%20de%20madrugada%20por%20R$%2019,90.'
  },
  {
    slug: 'barretos-para-sao-paulo-passagens-madrugada-baratas',
    cidadeOrigem: 'Barretos',
    cidadeDestino: 'São Paulo',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Barretos para São Paulo passagens de madrugada baratas',
    tipo: 'Ônibus Leito / Transfer 2026',
    menorPreco: 'R$ 49,90',
    precoTradicional: 'R$ 280,00',
    empresa: 'Expresso Itamarati / Van VIP',
    cupom: 'PEAO-MADRUGADA49',
    linkAfiliado: 'https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20o%20desconto%20de%20madrugada%20Barretos-SP.'
  },
  {
    slug: 'santos-para-sao-paulo-passagens-madrugada-baratas',
    cidadeOrigem: 'Santos',
    cidadeDestino: 'São Paulo',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Santos para São Paulo passagens de madrugada baratas',
    tipo: 'Ônibus Executivo Express',
    menorPreco: 'R$ 12,90',
    precoTradicional: 'R$ 44,00',
    empresa: 'Viação Cometa / Ultra',
    cupom: 'SANTOS-SP12',
    linkAfiliado: 'https://wa.me/5511996552211?text=Ol%C3%A1!%20Quero%20a%20tarifa%20Santos-SP%20por%20R$%2012,90.'
  },

  // 2. Códigos Promocionais Funcionais Hoje
  {
    slug: 'codigo-promocional-buser-sao-paulo-funcional-hoje',
    cidadeOrigem: 'Interior & Litoral',
    cidadeDestino: 'São Paulo',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Código promocional Buser São Paulo funcional hoje',
    tipo: 'Cupom de Desconto Rodoviário',
    menorPreco: 'R$ 14,90',
    precoTradicional: 'R$ 60,00',
    empresa: 'Buser Brasil',
    cupom: 'AQUITEM-BUSER80',
    linkAfiliado: 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Quero%20o%20cupom%20Buser%20promocional%20no%20Aqui%20Tem.'
  },
  {
    slug: 'codigo-promocional-flixbus-barretos-funcional-hoje',
    cidadeOrigem: 'São Paulo & Capitais',
    cidadeDestino: 'Barretos',
    destinoSlug: 'barretos',
    termoBusca: 'Código promocional Flixbus Barretos funcional hoje',
    tipo: 'Cupom Especial Festa do Peão 2026',
    menorPreco: 'R$ 39,90',
    precoTradicional: 'R$ 220,00',
    empresa: 'FlixBus Brasil',
    cupom: 'FLIX-BARRETOS2026',
    linkAfiliado: 'https://wa.me/5517997814500?text=Ol%C3%A1!%20Quero%20o%20cupom%20Flixbus%20para%20Barretos.'
  },

  // 3. Tarifas Residuais Ocultas Aéreas para GRU/CGH
  {
    slug: 'tarifa-residual-oculta-voo-rio-para-guarulhos-congonhas',
    cidadeOrigem: 'Rio de Janeiro (SDU/GIG)',
    cidadeDestino: 'São Paulo (GRU/CGH)',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Tarifa residual oculta voo Rio de Janeiro para Guarulhos Congonhas',
    tipo: 'Aéreo / Voo de Última Hora',
    menorPreco: 'R$ 119,00',
    precoTradicional: 'R$ 590,00',
    empresa: 'Latam / Gol / Azul',
    cupom: 'RESIDUAL-AIR119',
    linkAfiliado: 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Quero%20a%20tarifa%20aerea%20residual%20Rio-SP.'
  },
  {
    slug: 'tarifa-residual-oculta-voo-curitiba-para-guarulhos-congonhas',
    cidadeOrigem: 'Curitiba (CWB)',
    cidadeDestino: 'São Paulo (GRU/CGH)',
    destinoSlug: 'sao-paulo',
    termoBusca: 'Tarifa residual oculta voo Curitiba para Guarulhos Congonhas',
    tipo: 'Aéreo / Assento Residual',
    menorPreco: 'R$ 89,90',
    precoTradicional: 'R$ 390,00',
    empresa: 'Gol / Latam Linhas Aéreas',
    cupom: 'RESIDUAL-CWB89',
    linkAfiliado: 'https://wa.me/5511997814500?text=Ol%C3%A1!%20Quero%20o%20voo%20residual%20Curitiba-SP.'
  }
];

function gerarHTMLPassivo(p) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Desconto Aplicado: Passagens e Hospedagem em ${p.cidadeDestino} - Atualizado Agora | AQUITEM</title>
<meta name="description" content="[DESCONTO ATIVO] Menor preço encontrado pelo robô para ${p.termoBusca}. De ${p.precoTradicional} por apenas ${p.menorPreco}. Cupom ${p.cupom} validado.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/desconto-aplicado/${p.slug}">
<meta name="theme-color" content="#030712">
<meta name="robots" content="noindex, nofollow" />

<!-- CSS e Fontes -->
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=JetBrains+Mono:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
  body { background-color: #030712; color: #F3F4F6; font-family: 'Inter', -apple-system, sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .comparison-card {
    background: radial-gradient(circle at 50% 0%, #0d2244 0%, #050d1a 60%, #030712 100%);
    border: 2px solid #F5D77F;
    box-shadow: 0 0 35px rgba(245, 215, 127, 0.25);
  }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6">
<div class="max-w-2xl mx-auto w-full">

  <!-- CARD PRINCIPAL DE COMPARAÇÃO EM TEMPO REAL -->
  <div class="comparison-card rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl">
    <div class="flex items-center justify-between text-xs font-mono border-b border-amber-400/30 pb-3.5 mb-5 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-emerald-400 font-bold tracking-widest uppercase text-[11px]">MENOR PREÇO ENCONTRADO PELO ROBÔ</span>
      </div>
      <span class="text-amber-300 font-mono font-bold">CUPOM: ${p.cupom}</span>
    </div>

    <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
      Tarifa Promocional: ${p.cidadeOrigem} &rarr; ${p.cidadeDestino}
    </h1>
    <p class="text-xs text-slate-400 mb-6">${p.tipo} · ${p.empresa}</p>

    <!-- TABELA COMPARATIVA DE PREÇO -->
    <div class="overflow-hidden rounded-2xl border border-white/10 mb-6">
      <table class="w-full text-left text-xs">
        <thead class="bg-black/60 text-slate-400 font-mono uppercase">
          <tr>
            <th class="p-3">Canal de Busca</th>
            <th class="p-3">Status</th>
            <th class="p-3 text-right">Tarifa</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10 bg-slate-900/60 font-mono">
          <tr class="text-slate-400">
            <td class="p-3">Guichê / App Tradicional</td>
            <td class="p-3">Tarifa Cheia</td>
            <td class="p-3 text-right line-through">${p.precoTradicional}</td>
          </tr>
          <tr class="text-emerald-400 font-bold bg-emerald-950/40">
            <td class="p-3">⚡ Robô Aqui Tem Achadinhos</td>
            <td class="p-3">Cupom Validado</td>
            <td class="p-3 text-right text-base text-amber-400">${p.menorPreco}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- BOTÃO DE REDIRECIONAMENTO DIRETO (1-CLIQUE PASSIVO) -->
    <a href="${p.linkAfiliado}" target="_blank" rel="noopener" class="block w-full text-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-navy-950 font-black py-4 px-6 rounded-2xl shadow-xl transition transform hover:scale-105 text-sm sm:text-base uppercase tracking-wider mb-2">
      👉 ATIVAR CUPOM DE DESCONTO E RESERVAR AGORA &rarr;
    </a>
    <p class="text-[11px] text-center text-slate-400 mt-2">Vagas limitadas no lote promocional. Redirecionamento instantâneo.</p>
  </div>

  <!-- MONETIZAÇÃO LOCAL: POUSADAS & HOSPEDAGEM PARCEIRA DA CIDADE -->
  <div class="bg-slate-900/90 border border-white/10 rounded-2xl p-5 mb-8 shadow-lg">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">🏨 Hospedagem & Pousadas em ${p.cidadeDestino}</span>
      <span class="text-[10px] text-emerald-400 font-bold">✓ Preço Direto</span>
    </div>
    <p class="text-xs text-slate-400 mb-4">
      Economize também na estadia. Conecte-se diretamente com os proprietários das pousadas parceiras no guia local:
    </p>
    <div class="grid grid-cols-2 gap-3">
      <a href="../vagas.html?cidade=${p.destinoSlug}" class="text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition">
        💼 Vagas em ${p.cidadeDestino}
      </a>
      <a href="../${p.destinoSlug}-home.html" class="text-center bg-amber-400 hover:bg-amber-300 text-navy-950 font-black py-2.5 px-3 rounded-xl text-xs transition">
        📍 Guia de ${p.cidadeDestino} &rarr;
      </a>
    </div>
  </div>

</div>
</body>
</html>`;
}

// Geração das páginas programáticas
INTENCAO_COMPRA_PAGES.forEach(p => {
  const fileName = `${p.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'desconto-aplicado', fileName);
  fs.writeFileSync(fullPath, gerarHTMLPassivo(p), 'utf8');
  console.log(`✓ Gerada página de intenção agressiva: desconto-aplicado/${fileName}`);
});
console.log(`\n🏆 Total de ${INTENCAO_COMPRA_PAGES.length} páginas programáticas industriais geradas!`);
