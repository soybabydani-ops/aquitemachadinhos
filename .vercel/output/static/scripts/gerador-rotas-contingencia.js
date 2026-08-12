/**
 * GERADOR DE PÁGINAS DE CONTINGÊNCIA & VAGAS DE ÚLTIMA HORA (REAL-TIME ARBITRAGE)
 * Páginas ultraleves (< 3kb) com carregamento em < 100ms e redirecionamento instantâneo.
 */

const fs = require('fs');
const path = require('path');

const ROTAS_CONTINGENCIA = [
  {
    slug: 'assentos-promocionais-sp-para-barretos',
    titulo: 'Painel de Vagas de Última Hora: Assentos Promocionais São Paulo x Barretos 2026',
    termo: 'Assentos promocionais rota São Paulo para Barretos',
    origem: 'São Paulo (Tietê/Barra Funda)',
    destino: 'Barretos/SP (Festa do Peão 2026)',
    destinoSlug: 'barretos',
    tipo: 'Rodoviário Executivo / Transfer Direto',
    precoNormal: 'R$ 280,00',
    precoContingencia: 'R$ 49,90',
    desconto: '-82% OFF',
    afiliadoUrl: 'https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20emitir%20o%20assento%20de%20contingencia%20SP-Barretos%20por%20R$%2049,90.'
  },
  {
    slug: 'painel-vagas-ultimahora-guarulhos-rio',
    titulo: 'Painel de Vagas de Última Hora: Voos Guarulhos x Rio de Janeiro',
    termo: 'Assentos promocionais voo São Paulo Guarulhos para Rio',
    origem: 'São Paulo (Guarulhos GRU)',
    destino: 'Rio de Janeiro (GIG/SDU)',
    destinoSlug: 'rio-de-janeiro',
    tipo: 'Aéreo / Voo de Última Hora',
    precoNormal: 'R$ 480,00',
    precoContingencia: 'R$ 89,90',
    desconto: '-81% OFF',
    afiliadoUrl: 'https://www.decolar.com/passagens-aereas/?ref=aquitem_nacional'
  },
  {
    slug: 'contingencia-passagens-barra-funda-campinas',
    titulo: 'Painel de Despacho Rápido: Passagens Barra Funda x Campinas',
    termo: 'Cupom de contingência São Paulo Barra Funda para Campinas',
    origem: 'São Paulo (Terminal Barra Funda)',
    destino: 'Campinas/SP',
    destinoSlug: 'campinas',
    tipo: 'Ônibus Executivo Semi-Leito',
    precoNormal: 'R$ 58,00',
    precoContingencia: 'R$ 19,90',
    desconto: '-65% OFF',
    afiliadoUrl: 'https://www.clickbus.com.br/?ref=aquitem_nacional'
  },
  {
    slug: 'painel-vagas-jabaquara-santos',
    titulo: 'Painel de Vagas de Última Hora: Passagens Jabaquara x Santos',
    termo: 'Assentos promocionais rota Jabaquara para Santos',
    origem: 'São Paulo (Terminal Jabaquara)',
    destino: 'Santos/SP (Baixada Santista)',
    destinoSlug: 'santos',
    tipo: 'Ônibus Executivo & Lotação Rápida',
    precoNormal: 'R$ 44,00',
    precoContingencia: 'R$ 12,90',
    desconto: '-70% OFF',
    afiliadoUrl: 'https://www.clickbus.com.br/?ref=aquitem_nacional'
  },
  {
    slug: 'assentos-promocionais-sp-para-gramado',
    titulo: 'Painel de Vagas de Última Hora: São Paulo x Gramado/RS',
    termo: 'Assentos promocionais voos e transfers São Paulo para Gramado',
    origem: 'São Paulo (GRU/CGH)',
    destino: 'Gramado/RS (Serra Gaúcha)',
    destinoSlug: 'gramado',
    tipo: 'Aéreo Charter + Transfer Serra',
    precoNormal: 'R$ 890,00',
    precoContingencia: 'R$ 289,00',
    desconto: '-68% OFF',
    afiliadoUrl: 'https://wa.me/5517997814500?text=Ol%C3%A1!%20Quero%20a%20tarifa%20promocional%20Gramado%20por%20R$%20289,00.'
  }
];

function gerarHTMLContingencia(r) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>⚠️ ${r.titulo} | AQUITEM</title>
<meta name="description" content="[DESPACHO AO VIVO] ${r.termo}: Assentos residuais liberados de ${r.origem} para ${r.destino} com ${r.desconto}. De ${r.precoNormal} por ${r.precoContingencia}.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/contingencia/${r.slug}">
<meta name="theme-color" content="#030712">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#030712;color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:16px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}
  .card{max-width:520px;width:100%;background:radial-gradient(circle at 50% 0%,#0d2244 0%,#060e1d 70%,#030712 100%);border:2px solid #10B981;border-radius:22px;padding:24px;box-shadow:0 0 35px rgba(16,185,129,0.25)}
  .live-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.2);color:#FCA5A5;border:1px solid #EF4444;font-size:11px;font-weight:900;padding:4px 10px;border-radius:999px;margin-bottom:12px;text-transform:uppercase}
  .dot{width:8px;height:8px;background:#EF4444;border-radius:50%;animation:blink 1s infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
  h1{font-size:1.3rem;font-weight:900;color:#FFF;line-height:1.3;margin-bottom:6px}
  .route{font-size:12px;color:#94A3B8;margin-bottom:16px}
  .table-box{background:#050c18;border:1px solid rgba(245,215,127,0.3);border-radius:14px;padding:14px;margin-bottom:16px}
  .row{display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:6px}
  .price{font-size:1.8rem;font-weight:900;color:#10B981;margin-top:4px}
  .btn-dispatch{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#FFE259,#FFA751);color:#0B1426;font-weight:900;font-size:14px;padding:15px;border-radius:12px;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(245,215,127,0.4);transition:transform 0.2s}
  .btn-dispatch:hover{transform:scale(1.02)}
  .hotel-box{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:#94A3B8;text-align:center}
</style>
</head>
<body>
<div class="card">
  <div class="live-badge"><span class="dot"></span> PAINEL DE DESPACHO & VAGAS DE ÚLTIMA HORA · AO VIVO</div>
  <h1>${r.origem} &rarr; ${r.destino}</h1>
  <div class="route">${r.tipo} · Lote Residual Liberado</div>

  <div class="table-box">
    <div class="row"><span>Status no Guichê:</span><span style="color:#FCA5A5;font-weight:700">Esgotado / Tarifa Cheia</span></div>
    <div class="row"><span>Preço Tradicional:</span><span style="text-decoration:line-through;color:#64748B">${r.precoNormal}</span></div>
    <div class="row" style="font-weight:800;color:#F5D77F"><span>⚡ Tarifa de Contingência:</span><span>${r.desconto}</span></div>
    <div class="price">${r.precoContingencia}</div>
  </div>

  <a id="btnEmitir" href="${r.afiliadoUrl}" target="_blank" rel="noopener" class="btn-dispatch">
    👉 Emitir Assento com Desconto Imediato &rarr;
  </a>

  <div class="hotel-box">
    🏨 Procurando pousada ou hotel em ${r.destino}? 
    <a href="../${r.destinoSlug}-home.html" style="color:#38BDF8;text-decoration:underline;font-weight:700">Ver Hospedagens no Guia Oficial &rarr;</a>
  </div>
</div>

<script>
// Redirecionamento e contagem atômica de cliques via Supabase REST (< 50ms)
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btnEmitir');
  if (btn) {
    btn.addEventListener('click', function() {
      var SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
      var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

      fetch(SUPABASE_URL + "/cliques_afiliados_logs", {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ cidade_destino: "${r.destino}", tipo_transporte: "Contingencia", rota: "${r.slug}", criado_em: new Date().toISOString() })
      }).catch(function(){});
    });
  }
});
</script>
</body>
</html>`;
}

ROTAS_CONTINGENCIA.forEach(r => {
  const fileName = `${r.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'contingencia', fileName);
  fs.writeFileSync(fullPath, gerarHTMLContingencia(r), 'utf8');
  console.log(`✓ Gerada página de contingência: contingencia/${fileName} (${fs.statSync(fullPath).size} bytes)`);
});
console.log(`\n🏆 Total de ${ROTAS_CONTINGENCIA.length} páginas de contingência geradas com sucesso!`);
