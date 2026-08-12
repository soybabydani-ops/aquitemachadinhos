/**
 * GERADOR PROGRAMÁTICO DE ALERTAS DE ANOMALIA DE TRANSPORTE (REAL-TIME HFT TRAFFIC)
 * Páginas minimalistas (< 5kb) com carregamento instantâneo e monetização direta.
 */

const fs = require('fs');
const path = require('path');

const ANOMALIAS_FEED = [
  {
    slug: 'voo-azul-4321-cancelado',
    identificador: 'Voo Azul 4321',
    tipo: 'Aéreo (Viracopos VCP &rarr; Santos Dumont SDU)',
    origem: 'Campinas / São Paulo',
    destino: 'Rio de Janeiro',
    destinoSlug: 'rio-de-janeiro',
    motivo: 'Readequação de Malha Aérea / Clima',
    statusAlerta: 'CANCELADO / REACOMODAÇÃO NECESSÁRIA',
    alternativa1: 'Voo Imediato Congonhas (CGH) &rarr; Galeão (GIG) às 21:40 (Assentos Livres)',
    alternativa2: 'Ônibus Leito Executivo Rodoviária Tietê &rarr; Novo Rio (Saída às 23:00)',
    precoAlternativa: 'R$ 89,90',
    linkReserva: 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Meu%20voo%20foi%20cancelado%20e%20preciso%20da%20alternativa%20imediata%20para%20o%20Rio.'
  },
  {
    slug: 'voo-gol-1234-atrasado-congonhas',
    identificador: 'Voo Gol 1234 (Ponte Aérea)',
    tipo: 'Aéreo (Congonhas CGH &rarr; Santos Dumont SDU)',
    origem: 'São Paulo (CGH)',
    destino: 'Rio de Janeiro (SDU)',
    destinoSlug: 'rio-de-janeiro',
    motivo: 'Atraso Operacional Superior a 3 Horas',
    statusAlerta: 'ATRASO CRÍTICO / VOO LOTADO',
    alternativa1: 'Embarque Express Voo Compartilhado Galeão (GIG) com Transfer Incluso',
    alternativa2: 'Van VIP Executiva Noturna com Desembarque na Barra da Tijuca',
    precoAlternativa: 'R$ 119,00',
    linkReserva: 'https://wa.me/5511997814500?text=Ol%C3%A1!%20Preciso%20de%20reacomoda%C3%A7%C3%A3o%20urgente%20SP-Rio.'
  },
  {
    slug: 'onibus-tiete-barretos-esgotado',
    identificador: 'Ônibus Rodoviária Tietê x Barretos 2026',
    tipo: 'Rodoviário (Festa do Peão de Barretos)',
    origem: 'São Paulo (Tietê / Barra Funda)',
    destino: 'Barretos/SP',
    destinoSlug: 'barretos',
    motivo: 'Esgotamento Total de Passagens no Guichê',
    statusAlerta: 'GUICHÊ ESGOTADO / LOTES RESIDUAIS ATIVOS',
    alternativa1: 'Vans Executivas VIP com Desembarque Direto no Parque do Peão',
    alternativa2: 'Transfer Integrado via Bebedouro/Olímpia com Motorista Credenciado',
    precoAlternativa: 'R$ 49,90',
    linkReserva: 'https://wa.me/5517991238899?text=Ol%C3%A1!%20O%20onibus%20do%20guiche%20esgotou%20e%20quero%20minha%20vaga%20na%20Van%20VIP%20SP-Barretos.'
  },
  {
    slug: 'voo-latam-3456-guarulhos-cancelado',
    identificador: 'Voo Latam 3456',
    tipo: 'Aéreo (Guarulhos GRU &rarr; Salvador SSA)',
    origem: 'São Paulo (GRU)',
    destino: 'Salvador/BA',
    destinoSlug: 'salvador',
    motivo: 'Manutenção Não Programada',
    statusAlerta: 'VOO CANCELADO / RECOMPOSIÇÃO EM ANDAMENTO',
    alternativa1: 'Voo Direto Conexão Noturna SSA às 23:15 (Tarifa Especial de Contingência)',
    alternativa2: 'Voo Madrugada com Chegada às 06:00 em Salvador',
    precoAlternativa: 'R$ 189,00',
    linkReserva: 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Preciso%20de%20assento%20urgente%20para%20Salvador.'
  },
  {
    slug: 'onibus-jabaquara-santos-atraso',
    identificador: 'Ônibus Terminal Jabaquara x Santos',
    tipo: 'Rodoviário (Subida/Descida Imigrantes)',
    origem: 'São Paulo (Jabaquara)',
    destino: 'Santos (Baixada Santista)',
    destinoSlug: 'santos',
    motivo: 'Bloqueio de Pista / Atraso Geral de Linhas',
    statusAlerta: 'LINHAS PARALISADAS / CARONAS VIP LIBERADAS',
    alternativa1: 'Vans Expressas com Rota Alternativa Anchieta / Rodoanel',
    alternativa2: 'Motorista Particular Credenciado com Saída Imediata do Metrô',
    precoAlternativa: 'R$ 14,90',
    linkReserva: 'https://wa.me/5511996552211?text=Ol%C3%A1!%20Quero%20a%20van%20expressa%20Jabaquara-Santos.'
  }
];

function gerarHTMLMinimalista(a) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>⚠️ URGENTE: Alternativas Rápidas para o Voo/Ônibus ${a.identificador} - Assentos Disponíveis | AQUITEM</title>
<meta name="description" content="[ALERTA DE TRÂNSITO] ${a.statusAlerta}: ${a.identificador} (${a.tipo}). Assentos alternativos e transfers de contingência a partir de ${a.precoAlternativa}. Reserve online.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/alerta/${a.slug}">
<meta name="theme-color" content="#020617">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#020617;color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:16px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}
  .box{max-width:540px;width:100%;background:#091224;border:2px solid #EF4444;border-radius:20px;padding:24px;box-shadow:0 0 35px rgba(239,68,68,0.35)}
  .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.2);color:#FCA5A5;border:1px solid #EF4444;font-size:11px;font-weight:900;padding:4px 10px;border-radius:999px;text-transform:uppercase}
  .pulse{width:8px;height:8px;background:#EF4444;border-radius:50%;animation:p 1s infinite}
  @keyframes p{0%,100%{opacity:1}50%{opacity:0.2}}
  h1{font-size:1.35rem;font-weight:900;color:#FFF;margin:12px 0 6px 0;line-height:1.3}
  .meta{font-size:12px;color:#94A3B8;margin-bottom:16px}
  .alt-box{background:#040914;border:1px solid rgba(245,215,127,0.3);border-radius:14px;padding:14px;margin-bottom:16px;text-align:left}
  .alt-title{font-size:11px;font-weight:800;color:#F5D77F;text-transform:uppercase;margin-bottom:6px}
  .alt-item{font-size:12px;color:#E2E8F0;margin-bottom:6px;line-height:1.4}
  .price{font-size:1.8rem;font-weight:900;color:#10B981;margin:8px 0}
  .btn-urgent{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#FFE259 0%,#FFA751 100%);color:#0B1426;font-weight:900;font-size:14px;padding:14px;border-radius:12px;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(245,215,127,0.4)}
  .hotel-link{display:block;margin-top:12px;font-size:11px;color:#38BDF8;text-decoration:none;text-align:center}
</style>
</head>
<body>
<div class="box">
  <div class="badge"><span class="pulse"></span> SISTEMA DE CONTINGÊNCIA · ALERTA ATIVO</div>
  <h1>${a.statusAlerta}</h1>
  <div class="meta">${a.identificador} · ${a.origem} &rarr; ${a.destino}</div>

  <div class="alt-box">
    <div class="alt-title">⚡ Alternativas Imediatas Disponíveis Agora:</div>
    <div class="alt-item"><strong>Opção 1:</strong> ${a.alternativa1}</div>
    <div class="alt-item"><strong>Opção 2:</strong> ${a.alternativa2}</div>
    <div class="price">A partir de ${a.precoAlternativa}</div>
  </div>

  <a href="${a.linkReserva}" target="_blank" rel="noopener" class="btn-urgent">
    🚨 Emitir Assento de Contingência no WhatsApp &rarr;
  </a>

  <a href="../${a.destinoSlug}-home.html" class="hotel-link">
    🏨 Precisa de hotel ou pousada em ${a.destino}? Veja opções com desconto &rarr;
  </a>
</div>
</body>
</html>`;
}

// Geração das páginas na pasta alerta/
ANOMALIAS_FEED.forEach(a => {
  const fileName = `${a.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'alerta', fileName);
  fs.writeFileSync(fullPath, gerarHTMLMinimalista(a), 'utf8');
  console.log(`✓ Gerada página de anomalia de tráfego: alerta/${fileName} (${fs.statSync(fullPath).size} bytes)`);
});
