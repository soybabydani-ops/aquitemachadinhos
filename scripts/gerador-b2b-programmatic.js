/**
 * GERADOR PROGRAMÁTICO DE PÁGINAS B2B CORPORATIVAS (ALTO TICKET & DEMANDA INDUSTRIAL)
 * Criação em lote de landing pages corporativas de fretamento de frotas e hotelaria em lote.
 */

const fs = require('fs');
const path = require('path');

const B2B_PAGES = [
  {
    slug: 'fretamento-onibus-corporativo-sao-paulo',
    titulo: 'Fretamento de Frotas de Ônibus Corporativo Privado em São Paulo',
    subtitulo: 'Soluções de transporte contínuo para colaboradores, plantas industriais e eventos corporativos na Capital.',
    cidade: 'São Paulo',
    uf: 'SP',
    tipo: 'Fretamento de Frotas de Ônibus/Vans',
    capacidade: 'Frotas de 15 a 50 passageiros por veículo com rastreamento 24h e seguro completo.'
  },
  {
    slug: 'fretamento-onibus-corporativo-campinas',
    titulo: 'Fretamento de Ônibus Corporativo Privado para Frotas em Campinas',
    subtitulo: 'Transporte de funcionários e logística executiva para o polo tecnológico e industrial da RMC.',
    cidade: 'Campinas',
    uf: 'SP',
    tipo: 'Fretamento Contínuo & Frotas',
    capacidade: 'Ônibus executivos, micro-ônibus e vans com ar condicionado e Wi-Fi embarcado.'
  },
  {
    slug: 'reservas-hoteis-lote-tripulacoes-sao-paulo',
    titulo: 'Reservas de Hotéis em Lote para Tripulações e Eventos em São Paulo',
    subtitulo: 'Bloqueios de quartos executivos com tarifa B2B direta próximos aos aeroportos de Congonhas (CGH) e Guarulhos (GRU).',
    cidade: 'São Paulo (CGH / GRU)',
    uf: 'SP',
    tipo: 'Hotelaria em Lote para Tripulações',
    capacidade: 'De 20 a 300 diárias/mês com faturamento corporativo quinzenal e café da manhã incluso.'
  },
  {
    slug: 'reservas-hoteis-lote-eventos-barretos',
    titulo: 'Reservas de Hotéis e Chalés em Lote para Eventos e Comitivas em Barretos 2026',
    subtitulo: 'Hospedagem corporativa em lote para equipes de patrocinadores, montadores e comitivas na Festa do Peão.',
    cidade: 'Barretos',
    uf: 'SP',
    tipo: 'Hospedagem em Lote para Eventos',
    capacidade: 'Ranchos executivos, pousadas e suítes completas com estacionamento e transfer integrado.'
  },
  {
    slug: 'transporte-rodoviario-funcionarios-grande-sp',
    titulo: 'Contratos de Transporte Rodoviário Interestadual de Funcionários',
    subtitulo: 'Terceirização completa de linhas de transporte de turno para indústrias da Grande São Paulo e ABC.',
    cidade: 'Grande São Paulo (RMSP & ABC)',
    uf: 'SP',
    tipo: 'Transporte de Funcionários Intermunicipal',
    capacidade: 'Operações 24h, turnos 6x1 e rotas porta a porta com conformidade regulatória ANTT / ARTESP.'
  }
];

function gerarHTMLB2B(p) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${p.titulo} | AQUITEM B2B</title>
<meta name="description" content="${p.subtitulo} Cotação oficial em lote com validação de CNPJ e atendimento em 15 minutos.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/b2b/${p.slug}">
<meta name="theme-color" content="#071530">
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-[#060e1d] text-[#F8FAFC] min-h-screen flex flex-col font-sans p-4 sm:p-6">

<header class="max-w-4xl mx-auto w-full py-4 flex items-center justify-between border-b border-white/10 mb-8">
  <a href="cotacao-corporativa.html" class="flex items-center gap-2 text-white font-extrabold text-base">
    <span>🏢</span> <span>AQUITEM <span class="text-[#F5D77F]">B2B CORPORATE</span></span>
  </a>
  <a href="cotacao-corporativa.html" class="text-xs font-bold text-[#F5D77F] bg-[#F5D77F]/10 border border-[#F5D77F]/30 px-3 py-1.5 rounded-xl hover:bg-[#F5D77F]/20 transition">
    📋 Nova Cotação Online &rarr;
  </a>
</header>

<main class="max-w-3xl mx-auto w-full flex-1">
  <div class="bg-gradient-to-br from-[#0d2244] to-[#071530] border-2 border-[#F5D77F]/40 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
    <span class="text-xs font-bold text-[#F5D77F] uppercase tracking-widest bg-[#F5D77F]/10 px-3 py-1 rounded-full border border-[#F5D77F]/20">
      Logística Corporativa Homologada · ${p.cidade}
    </span>
    <h1 class="text-2xl sm:text-3xl font-black text-white mt-3 leading-tight">${p.titulo}</h1>
    <p class="text-sm text-[#CBD5E1] mt-2.5 leading-relaxed">${p.subtitulo}</p>

    <div class="rounded-2xl bg-black/50 border border-white/10 p-5 my-6">
      <h3 class="text-xs font-black text-[#F5D77F] uppercase tracking-wider mb-2">✦ Especificações de Atendimento:</h3>
      <p class="text-xs text-[#E2E8F0] leading-relaxed">${p.capacidade}</p>
    </div>

    <a href="cotacao-corporativa.html?demanda=${encodeURIComponent(p.tipo)}&cidade=${encodeURIComponent(p.cidade)}" class="block w-full text-center bg-gradient-to-r from-[#FFE259] to-[#FFA751] hover:from-[#FFA751] text-[#1A0D00] font-black py-4 px-6 rounded-xl shadow-xl transition transform hover:scale-[1.02] text-sm uppercase tracking-wider">
      🚀 Solicitar Cotação para ${p.cidade} com Validação de CNPJ &rarr;
    </a>
  </div>
</main>

<footer class="max-w-4xl mx-auto w-full py-6 text-center text-xs text-[#64748B] border-t border-white/10">
  AQUITEM B2B · Soluções Industriais e Gestão de Frotas Corporativas
</footer>

</body>
</html>`;
}

B2B_PAGES.forEach(p => {
  const fileName = `${p.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'b2b', fileName);
  fs.writeFileSync(fullPath, gerarHTMLB2B(p), 'utf8');
  console.log(`✓ Gerada página B2B: b2b/${fileName}`);
});
console.log(`\n🏆 Total de ${B2B_PAGES.length} páginas B2B geradas com sucesso!`);
