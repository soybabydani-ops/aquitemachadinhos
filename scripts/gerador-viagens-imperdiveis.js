/**
 * GERADOR PROGRAMÁTICO DE PÁGINAS DE VIAGENS IMPERDÍVEIS (EIXO AEROPORTUÁRIO E RODOVIÁRIO)
 * Geração em massa de páginas estáticas ultrarrápidas com Social Locker e Monetização Dupla.
 */

const fs = require('fs');
const path = require('path');

const ROTAS_PROGRAMATICAS = [
  // EIXO AEROPORTUÁRIO (Voos GRU / CGH e Capitais)
  {
    origem: 'São Paulo (Guarulhos - GRU)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Rio de Janeiro (Galeão - GIG)',
    destinoSlug: 'rio-de-janeiro-gig',
    cidadeDestinoNome: 'Rio de Janeiro',
    cidadeDestinoSlug: 'rio-de-janeiro',
    ufDestino: 'RJ',
    eixo: 'Aéreo / Voo de Última Hora',
    precoNormal: 'R$ 480,00',
    precoBug: 'R$ 89,90',
    desconto: '-81%',
    minutos: 14,
    vagasLocais: ['Recepcionista Hotel Copacabana - R$ 2.600', 'Atendente Bilheteria Pão de Açúcar - R$ 2.200', 'Motorista Transfer Galeão - R$ 4.200']
  },
  {
    origem: 'São Paulo (Congonhas - CGH)',
    origemSlug: 'sao-paulo-cgh',
    destino: 'Rio de Janeiro (Santos Dumont - SDU)',
    destinoSlug: 'rio-de-janeiro-sdu',
    cidadeDestinoNome: 'Rio de Janeiro',
    cidadeDestinoSlug: 'rio-de-janeiro',
    ufDestino: 'RJ',
    eixo: 'Aéreo / Ponte Aérea Executiva',
    precoNormal: 'R$ 590,00',
    precoBug: 'R$ 119,00',
    desconto: '-80%',
    minutos: 19,
    vagasLocais: ['Analista de Atendimento SDU - R$ 3.100', 'Motorista Executivo Zona Sul - R$ 4.500', 'Concierge Hotel Ipanema - R$ 3.400']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Brasília (Aeroporto BSB)',
    destinoSlug: 'brasilia-bsb',
    cidadeDestinoNome: 'Brasília',
    cidadeDestinoSlug: 'brasilia',
    ufDestino: 'DF',
    eixo: 'Aéreo / Voo Executivo Direto',
    precoNormal: 'R$ 620,00',
    precoBug: 'R$ 149,00',
    desconto: '-76%',
    minutos: 22,
    vagasLocais: ['Assistente Parlamentar Jr - R$ 4.800', 'Motorista Executivo Asa Sul - R$ 3.900', 'Recepcionista Hotel BSB - R$ 2.400']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Salvador (Aeroporto SSA)',
    destinoSlug: 'salvador-ssa',
    cidadeDestinoNome: 'Salvador',
    cidadeDestinoSlug: 'salvador',
    ufDestino: 'BA',
    eixo: 'Aéreo / Voo Promocional Turístico',
    precoNormal: 'R$ 780,00',
    precoBug: 'R$ 189,00',
    desconto: '-75%',
    minutos: 26,
    vagasLocais: ['Guia Turístico Pelourinho - R$ 3.200', 'Recepcionista Resort Barra - R$ 2.500', 'Motorista Transfer Aeroporto - R$ 4.000']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Curitiba (Afonso Pena - CWB)',
    destinoSlug: 'curitiba-cwb',
    cidadeDestinoNome: 'Curitiba',
    cidadeDestinoSlug: 'curitiba',
    ufDestino: 'PR',
    eixo: 'Aéreo / Tarifa Relâmpago',
    precoNormal: 'R$ 390,00',
    precoBug: 'R$ 79,90',
    desconto: '-79%',
    minutos: 16,
    vagasLocais: ['Atendente Hotel Batel - R$ 2.300', 'Motorista Executivo CWB - R$ 3.800', 'Analista de Suporte TI - R$ 4.500']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Florianópolis (Hercílio Luz - FLN)',
    destinoSlug: 'florianopolis-fln',
    cidadeDestinoNome: 'Florianópolis',
    cidadeDestinoSlug: 'florianopolis',
    ufDestino: 'SC',
    eixo: 'Aéreo / Voo Direto Ilha',
    precoNormal: 'R$ 540,00',
    precoBug: 'R$ 129,00',
    desconto: '-76%',
    minutos: 18,
    vagasLocais: ['Atendente Pousada Jurerê - R$ 2.900', 'Motorista Transfer Ilha - R$ 4.400', 'Garçom Restaurante Lagoa - R$ 2.600']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Recife (Guararapes - REC)',
    destinoSlug: 'recife-rec',
    cidadeDestinoNome: 'Recife',
    cidadeDestinoSlug: 'recife',
    ufDestino: 'PE',
    eixo: 'Aéreo / Voo Nordeste Express',
    precoNormal: 'R$ 820,00',
    precoBug: 'R$ 199,00',
    desconto: '-75%',
    minutos: 21,
    vagasLocais: ['Desenvolvedor Porto Digital - R$ 5.800', 'Recepcionista Hotel Boa Viagem - R$ 2.400', 'Motorista Transfer Olinda - R$ 3.700']
  },
  {
    origem: 'São Paulo (GRU/CGH)',
    origemSlug: 'sao-paulo-gru',
    destino: 'Fortaleza (Pinto Martins - FOR)',
    destinoSlug: 'fortaleza-for',
    cidadeDestinoNome: 'Fortaleza',
    cidadeDestinoSlug: 'fortaleza',
    ufDestino: 'CE',
    eixo: 'Aéreo / Tarifa Residual',
    precoNormal: 'R$ 860,00',
    precoBug: 'R$ 219,00',
    desconto: '-74%',
    minutos: 25,
    vagasLocais: ['Atendente Beach Park - R$ 2.500', 'Motorista Transfer Beira Mar - R$ 3.900', 'Recepcionista Hotel Meireles - R$ 2.300']
  },

  // EIXO RODOVIÁRIO (Terminais SP: Tietê, Barra Funda, Jabaquara e RMSP)
  {
    origem: 'São Paulo (Terminal Tietê)',
    origemSlug: 'sao-paulo-tiete',
    destino: 'Barretos/SP (Festa do Peão 2026)',
    destinoSlug: 'barretos',
    cidadeDestinoNome: 'Barretos',
    cidadeDestinoSlug: 'barretos',
    ufDestino: 'SP',
    eixo: 'Ônibus Executivo Leito / Van VIP',
    precoNormal: 'R$ 280,00',
    precoBug: 'R$ 49,90',
    desconto: '-82%',
    minutos: 13,
    vagasLocais: ['Barman Temporário Arena Peão - R$ 350/dia', 'Segurança Credenciado - R$ 300/dia', 'Recepcionista Pousada Rural - R$ 2.800/mês']
  },
  {
    origem: 'São Paulo (Terminal Barra Funda)',
    origemSlug: 'sao-paulo-barra-funda',
    destino: 'Campinas/SP',
    destinoSlug: 'campinas',
    cidadeDestinoNome: 'Campinas',
    cidadeDestinoSlug: 'campinas',
    ufDestino: 'SP',
    eixo: 'Ônibus Executivo Semi-Leito',
    precoNormal: 'R$ 58,00',
    precoBug: 'R$ 19,90',
    desconto: '-65%',
    minutos: 15,
    vagasLocais: ['Analista TI Jr - R$ 4.900', 'Atendente Loja Shopping Iguatemi - R$ 2.200', 'Motorista Executivo Viracopos - R$ 3.800']
  },
  {
    origem: 'São Paulo (Terminal Jabaquara)',
    origemSlug: 'sao-paulo-jabaquara',
    destino: 'Santos (Baixada Santista)',
    destinoSlug: 'santos',
    cidadeDestinoNome: 'Santos',
    cidadeDestinoSlug: 'santos',
    ufDestino: 'SP',
    eixo: 'Ônibus Executivo & Lotação Rápida',
    precoNormal: 'R$ 44,00',
    precoBug: 'R$ 12,90',
    desconto: '-70%',
    minutos: 12,
    vagasLocais: ['Operador Portuário - R$ 4.600', 'Recepcionista Hotel Gonzaga - R$ 2.300', 'Atendente Quiosque Orla - R$ 1.950']
  },
  {
    origem: 'São Paulo (Terminal Tietê)',
    origemSlug: 'sao-paulo-tiete',
    destino: 'Campos do Jordão/SP',
    destinoSlug: 'campos-do-jordao',
    cidadeDestinoNome: 'Campos do Jordão',
    cidadeDestinoSlug: 'campos',
    ufDestino: 'SP',
    eixo: 'Ônibus Turismo & Serra',
    precoNormal: 'R$ 85,00',
    precoBug: 'R$ 29,90',
    desconto: '-65%',
    minutos: 17,
    vagasLocais: ['Garçom Fondue Capivari - R$ 2.800', 'Recepcionista Chalé de Charme - R$ 2.500', 'Atendente Chocolateria - R$ 2.100']
  },
  {
    origem: 'São Paulo (Terminal Tietê)',
    origemSlug: 'sao-paulo-tiete',
    destino: 'Ribeirão Preto/SP',
    destinoSlug: 'ribeirao-preto',
    cidadeDestinoNome: 'Ribeirão Preto',
    cidadeDestinoSlug: 'ribeirao-preto',
    ufDestino: 'SP',
    eixo: 'Ônibus Executivo Leito',
    precoNormal: 'R$ 145,00',
    precoBug: 'R$ 39,90',
    desconto: '-72%',
    minutos: 20,
    vagasLocais: ['Vendedor Técnico Agrishow - R$ 3.500', 'Atendente Cervejaria - R$ 2.250', 'Motorista Transfer Regional - R$ 3.600']
  },
  {
    origem: 'Guarulhos (Aeroporto GRU / Cecap)',
    origemSlug: 'guarulhos',
    destino: 'São Paulo Capital (Tietê / Paulista)',
    destinoSlug: 'sao-paulo-tiete',
    cidadeDestinoNome: 'São Paulo',
    cidadeDestinoSlug: 'sao-paulo',
    ufDestino: 'SP',
    eixo: 'Transfer Executivo & Van Express',
    precoNormal: 'R$ 65,00',
    precoBug: 'R$ 14,90',
    desconto: '-77%',
    minutos: 11,
    vagasLocais: ['Motorista CNH B Diurno - R$ 3.800', 'Auxiliar de Logística GRU - R$ 2.200', 'Atendente Bilheteria Metrô - R$ 2.450']
  },
  {
    origem: 'Osasco (Estação / Centro)',
    origemSlug: 'osasco',
    destino: 'São Paulo (Pinheiros / Faria Lima)',
    destinoSlug: 'sao-paulo-pinheiros',
    cidadeDestinoNome: 'São Paulo',
    cidadeDestinoSlug: 'sao-paulo',
    ufDestino: 'SP',
    eixo: 'Van Executiva & Lotação Rápida',
    precoNormal: 'R$ 28,00',
    precoBug: 'R$ 7,50',
    desconto: '-73%',
    minutos: 14,
    vagasLocais: ['Analista TI Jr Faria Lima - R$ 5.100', 'Atendente Restaurante Pinheiros - R$ 2.400', 'Motorista App - R$ 4.000']
  },
  {
    origem: 'São Bernardo do Campo (ABC)',
    origemSlug: 'sao-bernardo',
    destino: 'São Paulo (Metrô Sacomã / Paulista)',
    destinoSlug: 'sao-paulo-sacoma',
    cidadeDestinoNome: 'São Paulo',
    cidadeDestinoSlug: 'sao-paulo',
    ufDestino: 'SP',
    eixo: 'Van Executiva & Carona Compartilhada',
    precoNormal: 'R$ 35,00',
    precoBug: 'R$ 8,90',
    desconto: '-74%',
    minutos: 16,
    vagasLocais: ['Auxiliar Industrial ABC - R$ 2.850', 'Motorista Particular - R$ 3.600', 'Atendente Farmácia 24h - R$ 2.200']
  },
  {
    origem: 'Mogi das Cruzes (Centro / Shopping)',
    origemSlug: 'mogi-das-cruzes',
    destino: 'São Paulo (Metrô Tatuapé)',
    destinoSlug: 'sao-paulo-tatuape',
    cidadeDestinoNome: 'São Paulo',
    cidadeDestinoSlug: 'sao-paulo',
    ufDestino: 'SP',
    eixo: 'Ônibus Executivo & Van',
    precoNormal: 'R$ 42,00',
    precoBug: 'R$ 11,90',
    desconto: '-71%',
    minutos: 18,
    vagasLocais: ['Assistente Administrativo - R$ 2.600', 'Vendedor Loja Tatuapé - R$ 2.150', 'Motorista Carga Leve - R$ 3.300']
  },
  {
    origem: 'São Paulo (GRU/Tietê)',
    origemSlug: 'sao-paulo',
    destino: 'Gramado/RS (Serra Gaúcha)',
    destinoSlug: 'gramado',
    cidadeDestinoNome: 'Gramado',
    cidadeDestinoSlug: 'gramado',
    ufDestino: 'RS',
    eixo: 'Aéreo Charter + Transfer Serra',
    precoNormal: 'R$ 890,00',
    precoBug: 'R$ 289,00',
    desconto: '-68%',
    minutos: 23,
    vagasLocais: ['Atendente Chocolateria Gramado - R$ 2.700', 'Garçom Fondue Tradicional - R$ 3.100', 'Recepcionista Pousada Lareira - R$ 2.900']
  },
  {
    origem: 'Rio de Janeiro (Novo Rio/Galeão)',
    origemSlug: 'rio-de-janeiro',
    destino: 'Barretos/SP (Festa do Peão 2026)',
    destinoSlug: 'barretos',
    cidadeDestinoNome: 'Barretos',
    cidadeDestinoSlug: 'barretos',
    ufDestino: 'SP',
    eixo: 'Ônibus Leito Direto & Transfer',
    precoNormal: 'R$ 420,00',
    precoBug: 'R$ 119,00',
    desconto: '-72%',
    minutos: 21,
    vagasLocais: ['Barman Temporário Arena Peão - R$ 350/dia', 'Segurança Credenciado - R$ 300/dia', 'Motorista Transfer Van - R$ 4.500']
  }
];

function gerarHTML(r) {
  const pageSlug = `${r.origemSlug}-para-${r.destinoSlug}`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>⚠️ BUG DE TARIFA: Passagem de ${r.origem} para ${r.destino} detectada no algoritmo | AQUITEM</title>
<meta name="description" content="[ALERTA HACKER] Assentos residuais de ${r.origem} para ${r.destino} interceptados pelo algoritmo com ${r.desconto} de desconto. De ${r.precoNormal} por ${r.precoBug}.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/viagens-imperdiveis/${pageSlug}">
<meta name="theme-color" content="#030712">

<!-- Meta tags Open Graph -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="AQUITEM Scanner Hacker">
<meta property="og:title" content="⚠️ BUG DE TARIFA: Passagem de ${r.origem} para ${r.destino} com ${r.desconto} OFF!">
<meta property="og:description" content="Assentos residuais liberados a preço de custo operacional. De ${r.precoNormal} por apenas ${r.precoBug}. Desbloqueie agora.">
<meta property="og:image" content="https://www.aquitemachadinhos.com.br/assets/og-image.png">
<meta property="og:url" content="https://www.aquitemachadinhos.com.br/viagens-imperdiveis/${pageSlug}">
<meta name="twitter:card" content="summary_large_image">

<!-- CSS e Fontes -->
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=JetBrains+Mono:wght@500;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
  body { background-color: #030712; color: #F3F4F6; font-family: 'Inter', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .radar-blink-red { animation: blinkRed 1s infinite; }
  @keyframes blinkRed { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.25; transform: scale(0.85); } }
  .terminal-box-main {
    background: radial-gradient(circle at 50% 0%, #0d2244 0%, #050d1a 60%, #030712 100%);
    border: 2px solid #10B981;
    box-shadow: 0 0 35px rgba(16, 185, 129, 0.25), inset 0 0 20px rgba(16, 185, 129, 0.05);
  }
  .btn-locked-gray {
    background: #1F2937;
    border: 1.5px dashed #4B5563;
    color: #9CA3AF;
    cursor: not-allowed;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  .btn-unlocked-gold {
    background: linear-gradient(135deg, #FFE259 0%, #FFA751 100%) !important;
    color: #0B1426 !important;
    border: 2px solid #FFFFFF !important;
    box-shadow: 0 0 30px rgba(245, 215, 127, 0.75), 0 8px 25px rgba(0,0,0,0.5) !important;
    cursor: pointer !important;
    pointer-events: auto !important;
    animation: goldPulseBlink 1.4s infinite !important;
  }
  @keyframes goldPulseBlink {
    0% { transform: scale(1); box-shadow: 0 0 20px rgba(245, 215, 127, 0.6); }
    50% { transform: scale(1.02); box-shadow: 0 0 40px rgba(245, 215, 127, 0.95); }
    100% { transform: scale(1); box-shadow: 0 0 20px rgba(245, 215, 127, 0.6); }
  }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6">
<div class="max-w-2xl mx-auto w-full">

  <!-- CABEÇALHO DE ALERTA CRÍTICO HACKER 24H -->
  <div class="terminal-box-main rounded-3xl p-6 mb-6">
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/30 pb-3.5 mb-5 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500 radar-blink-red shadow-lg shadow-red-500/50"></span>
        <span class="text-red-400 font-black tracking-widest uppercase text-[11px]">SISTEMA DE CAPTURA 24H ATIVO</span>
      </div>
      <div class="flex items-center gap-1.5 font-mono text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
        <span>⏱️</span>
        <span id="countdownTimer">EXPIRA EM: ${r.minutos}:42 MIN</span>
      </div>
    </div>

    <div class="text-[11px] font-mono text-emerald-400 font-bold mb-1">&gt; PROTOCOLO: BUG_TARIFA_RESIDUAL_${r.eixo.toUpperCase().replace(/\s+/g, '_')}</div>
    <div class="text-[11px] font-mono text-slate-400 mb-4">&gt; ROTA INTERCEPTADA: ${r.origem} &rarr; ${r.destino}</div>

    <!-- IDENTIFICAÇÃO DA ROTA AUTOMATIZADA -->
    <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">
      Assentos Residuais de ${r.origem} para ${r.destino} liberados com <span class="text-emerald-400">${r.desconto}</span>.
    </h1>

    <div class="mt-5 p-4 sm:p-5 rounded-2xl bg-black/70 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-3">
      <div>
        <span class="text-xs line-through text-slate-500 block font-mono">Preço Oficial: ${r.precoNormal}</span>
        <span class="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">${r.precoBug}</span>
      </div>
      <div class="text-right">
        <span class="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider block mb-1">
          ${r.desconto} ECONOMIA
        </span>
        <span class="text-[10px] text-amber-300 font-mono">Restam 2 assentos</span>
      </div>
    </div>
  </div>

  <!-- CONTEÚDO DO HACK / EXPLICATIVO DO ALGORITMO -->
  <div class="bg-slate-900/90 border border-white/10 rounded-2xl p-5 mb-6 text-sm text-slate-300 space-y-3">
    <h2 class="text-base font-extrabold text-amber-400 flex items-center gap-2">
      <span>⚡</span> O Hack do Algoritmo de Viagem
    </h2>
    <p class="leading-relaxed">
      As viações executivas e charters aéreos liquidam os últimos assentos residuais a preço de custo operacional para garantir a lotação de retorno. O scanner da AQUITEM detectou a quebra da tarifa para ${r.destino}.
    </p>
    <div class="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-300 leading-relaxed font-semibold">
      ⚠️ <strong>AÇÃO IMEDIATA NECESSÁRIA:</strong> O robô da viação recalcula a tarifa para ${r.precoNormal} assim que o lote for preenchido. Desbloqueie o botão abaixo para emitir a passagem no WhatsApp.
    </div>
  </div>

  <!-- BLOQUEADOR SOCIAL VIRAL (SOCIAL LOCKER) -->
  <div class="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-black border-2 border-emerald-400 rounded-3xl p-6 sm:p-7 mb-6 text-center shadow-2xl relative overflow-hidden" id="socialLockerBox">
    
    <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 grid place-items-center text-2xl mx-auto mb-3">
      🔒
    </div>

    <h3 class="text-xl font-black text-white">Desbloquear Assento com Desconto</h3>
    <p class="text-xs text-slate-300 mt-1.5 mb-6 max-w-md mx-auto leading-relaxed">
      Para evitar que robôs esgotem as passagens promocionais, clique abaixo para compartilhar este alerta no WhatsApp. O botão cinza será <strong>automaticamente destravado em dourado</strong>.
    </p>

    <!-- BOTÃO 1: COMPARTILHAR NO WHATSAPP (VIRAL TRIGGER) -->
    <button id="btnShareTrigger" onclick="executeViralUnlock()" class="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-4 px-6 rounded-2xl shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm uppercase tracking-wider mb-4">
      <span>💬</span> 1. Liberar no WhatsApp
    </button>

    <!-- BOTÃO 2: LINK FINAL DE COMPRA (COMEÇA CINZA E BLOQUEADO) -->
    <a id="btnFinalCta" href="#" target="_blank" rel="noopener" class="btn-locked-gray w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2">
      <span>🔒</span> 2. ACESSAR ASSENTO DO BUG (Compartilhe Acima para Destravar)
    </a>

    <p id="unlockNotice" class="text-[11px] text-slate-400 mt-3 hidden">
      ✓ <span class="text-emerald-400 font-bold">Assento Liberado!</span> Clique no botão dourado acima para emitir a passagem no WhatsApp.
    </p>
  </div>

  <!-- MONETIZAÇÃO DUPLA: POUSADAS & VAGAS LOCAIS DO SUPABASE -->
  <div class="bg-slate-900/90 border border-amber-400/30 rounded-3xl p-6 mb-8 shadow-xl">
    <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="text-amber-400 text-lg font-bold">🏢</span>
        <span class="text-xs font-black text-amber-400 uppercase tracking-wider">Oportunidades & Hospedagem em ${r.cidadeDestinoNome}/${r.ufDestino}</span>
      </div>
      <span class="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
        ✓ Supabase Real-Time
      </span>
    </div>

    <p class="text-xs text-slate-400 mb-3">Vagas de emprego recentes abertas na região de ${r.cidadeDestinoNome}:</p>
    <ul class="text-xs text-slate-200 space-y-2 mb-4">
      ${r.vagasLocais.map(v => `<li class="flex items-center gap-2"><span class="text-amber-400">✦</span> ${v}</li>`).join('')}
    </ul>

    <div class="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center justify-between mb-4">
      <div>
        <strong class="text-white block" id="localHotelTitle">🏨 Pousadas, Chalés e Hotéis em ${r.cidadeDestinoNome}</strong>
        <span class="text-slate-400 text-[11px]" id="localHotelDesc">WhatsApp direto sem taxas de agência</span>
      </div>
      <a id="localHotelBtn" href="../cidades.html" class="text-xs font-bold text-emerald-400 hover:underline">Contatar &rarr;</a>
    </div>

    <!-- BOTÕES DO GUIA DA CIDADE DESTINO -->
    <div class="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
      <a href="../vagas.html?cidade=${r.cidadeDestinoSlug}" class="text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-4 rounded-xl text-xs flex-1 transition">
        💼 Ver Vagas em ${r.cidadeDestinoNome} &rarr;
      </a>
      <a href="../${r.cidadeDestinoSlug}-home.html" class="text-center bg-amber-400 hover:bg-amber-300 text-navy-950 font-black py-3 px-4 rounded-xl text-xs flex-1 transition">
        📍 Acessar Guia de ${r.cidadeDestinoNome} &rarr;
      </a>
    </div>
  </div>

</div>

<script>
// 1. Contador de Urgência em Loop de 11 a 28 Minutos
var initialMinutes = ${r.minutos};
var remainingSec = initialMinutes * 60 + 42;
function updateTimer() {
  if (remainingSec > 0) {
    remainingSec--;
  } else {
    remainingSec = Math.floor(Math.random() * (28 - 11 + 1) + 11) * 60 + 59;
  }
  var m = Math.floor(remainingSec / 60);
  var s = remainingSec % 60;
  var el = document.getElementById('countdownTimer');
  if (el) el.textContent = 'EXPIRA EM: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
}
setInterval(updateTimer, 1000);

// 2. Destravamento do Bloqueador Social (Social Locker)
var waTicketLink = "https://wa.me/5517991238899?text=" + encodeURIComponent("Olá! Desbloqueei a tarifa promocional de " + "${r.origem}" + " para " + "${r.destino}" + " por " + "${r.precoBug}" + " no Aqui Tem Achadinhos e quero emitir minha passagem.");

function executeViralUnlock() {
  var currentUrl = window.location.href;
  var viralMsg = encodeURIComponent("Entra rápido nesse link do Aqui Tem Achadinhos, descobri como viajar saindo de ${r.origem} por quase nada: " + currentUrl);
  
  // Dispara WhatsApp com a mensagem viral pronta
  window.open("https://api.whatsapp.com/send?text=" + viralMsg, "_blank");

  // Destrava o botão após envio
  setTimeout(function() {
    var cta = document.getElementById('btnFinalCta');
    var notice = document.getElementById('unlockNotice');
    if (cta) {
      cta.className = "btn-unlocked-gold w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2";
      cta.innerHTML = "<span>⚡</span> 2. ACESSAR ASSENTO DO BUG COM ${r.desconto} NO WHATSAPP &rarr;";
      cta.href = waTicketLink;
    }
    if (notice) notice.classList.remove('hidden');
  }, 1200);
}

// 3. Supabase Hook Dinâmico para Comércio Local
document.addEventListener('DOMContentLoaded', function() {
  var supabaseUrl = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  var supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";
  var targetSlug = "${r.cidadeDestinoSlug}";

  fetch(supabaseUrl + "/stores?city_slug=eq." + encodeURIComponent(targetSlug) + "&status=eq.ativo&limit=1", {
    headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey }
  }).then(function(r) { return r.json(); }).then(function(stores) {
    if (stores && stores.length > 0) {
      var s = stores[0];
      var elH = document.getElementById('localHotelTitle');
      var elD = document.getElementById('localHotelDesc');
      var elB = document.getElementById('localHotelBtn');
      if (elH) elH.textContent = "🏨 " + (s.nome || "Pousada & Hotel em ${r.cidadeDestinoNome}");
      if (elD) elD.textContent = "📍 " + (s.bairro ? s.bairro + " · " : "") + (s.cidade || "${r.cidadeDestinoNome}") + " (WhatsApp Direto)";
      if (elB && s.whatsapp) elB.href = "https://wa.me/" + s.whatsapp.replace(/\\D/g, '') + "?text=" + encodeURIComponent("Olá! Vi seu anúncio no Aqui Tem Achadinhos e quero informações.");
    }
  }).catch(function() {});
});
</script>
</body>
</html>`;
}

// Compilação das páginas no repositório
ROTAS_PROGRAMATICAS.forEach(r => {
  const fileName = `${r.origemSlug}-para-${r.destinoSlug}.html`;
  const fullPath = path.join(__dirname, '..', 'viagens-imperdiveis', fileName);
  fs.writeFileSync(fullPath, gerarHTML(r), 'utf8');
  console.log(`✓ Gerada rota programática: viagens-imperdiveis/${fileName}`);
});
console.log(`\n🏆 Total de ${ROTAS_PROGRAMATICAS.length} páginas programáticas compiladas com sucesso!`);
