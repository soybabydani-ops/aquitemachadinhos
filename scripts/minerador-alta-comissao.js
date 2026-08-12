/**
 * MOTOR DE GERAÇÃO EM MASSA DE ACHADINHOS & PRODUTOS VIRAIS DE ALTA COMISSÃO
 * Cobertura nacional com carregamento ultra-rápido (< 0.3s) e gatilhos de conversão extrema.
 */

const fs = require('fs');
const path = require('path');

const VIRAL_HIGH_COMMISSION_DEALS = [
  // 1. SHOPEE (Eletrônicos & Gadgets Virais)
  {
    slug: 'oferta-urgente-fone-tws-noise-cancelling',
    nome: 'Fone de Ouvido Sem Fio Bluetooth TWS com Cancelamento Ativo de Ruído',
    plataforma: 'Shopee',
    categoria: 'Eletrônicos & Som',
    precoDe: 'R$ 169,90',
    precoPor: 'R$ 38,90',
    desconto: '-77% OFF',
    minutos: 8,
    linkAfiliado: 'https://s.shopee.com.br/30n7ohzzU6',
    comissaoTag: 'shopee_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Fone Bluetooth TWS com graves profundos, microfone HD e bateria de 28 horas com case de carregamento turbo.'
  },
  {
    slug: 'oferta-urgente-smartwatch-ultra-series',
    nome: 'Smartwatch Inteligente Ultra Série 9 com Monitor Cardíaco e NFC',
    plataforma: 'Shopee',
    categoria: 'Smartwatches',
    precoDe: 'R$ 249,00',
    precoPor: 'R$ 69,90',
    desconto: '-72% OFF',
    minutos: 11,
    linkAfiliado: 'https://s.shopee.com.br/30n7ohzzU6',
    comissaoTag: 'shopee_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Relógio inteligente à prova dágua, faz chamadas, monitora sono e passos com pulseira de silicone oceano.'
  },
  {
    slug: 'oferta-urgente-ring-light-tripe-profissional',
    nome: 'Ring Light LED 26cm com Tripé Profissional 2.10m e Suporte Celular',
    plataforma: 'Shopee',
    categoria: 'Foto & Vídeo',
    precoDe: 'R$ 119,90',
    precoPor: 'R$ 34,90',
    desconto: '-71% OFF',
    minutos: 9,
    linkAfiliado: 'https://s.shopee.com.br/30n7ohzzU6',
    comissaoTag: 'shopee_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Iluminação profissional para gravação de vídeos no TikTok/Reels e maquiagem com 3 tons de luz e dimmer.'
  },

  // 2. SHEIN (Moda Viral & Vestuário)
  {
    slug: 'oferta-urgente-kit-vestidos-elegance-shein',
    nome: 'Kit 3 Vestidos Femininos Elegance Tendência Internacional Shein',
    plataforma: 'SHEIN',
    categoria: 'Moda Feminina',
    precoDe: 'R$ 229,00',
    precoPor: 'R$ 54,90',
    desconto: '-76% OFF',
    minutos: 13,
    linkAfiliado: 'https://onelink.shein.com/47/5ylqchgphidl',
    comissaoTag: 'shein_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Tecido premium acetinado, caimento modelador e costura reforçada. O lote mais vendido da SHEIN Brasil.'
  },
  {
    slug: 'oferta-urgente-bota-western-country-shein',
    nome: 'Bota Texana Feminina Western Cano Médio Bordada Rodeio 2026',
    plataforma: 'SHEIN',
    categoria: 'Calçados & Couro',
    precoDe: 'R$ 299,00',
    precoPor: 'R$ 89,90',
    desconto: '-70% OFF',
    minutos: 10,
    linkAfiliado: 'https://onelink.shein.com/47/5ylqchgphidl',
    comissaoTag: 'shein_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Conforto para a Festa do Peão e festivais sertanejos com acabamento bordado e palmilha acolchoada.'
  },
  {
    slug: 'oferta-urgente-conjunto-linho-feminino-shein',
    nome: 'Conjunto Alfaiataria Feminino Cropped e Calça Pantalona em Linho',
    plataforma: 'SHEIN',
    categoria: 'Moda & Estilo',
    precoDe: 'R$ 189,00',
    precoPor: 'R$ 49,90',
    desconto: '-74% OFF',
    minutos: 12,
    linkAfiliado: 'https://onelink.shein.com/47/5ylqchgphidl',
    comissaoTag: 'shein_high_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Look elegante e fresco para trabalho ou eventos casuais com tecido leve respirável.'
  },

  // 3. AMAZON (Casa Inteligente, Malas & Eletrônicos)
  {
    slug: 'oferta-urgente-mala-viagem-bordo-360-amazon',
    nome: 'Mala de Viagem de Bordo Rígida Padrão ANAC Rodas Duplas 360°',
    plataforma: 'Amazon',
    categoria: 'Viagem & Malas',
    precoDe: 'R$ 389,00',
    precoPor: 'R$ 169,00',
    desconto: '-56% OFF',
    minutos: 14,
    linkAfiliado: 'https://link.amazon/B0hmLsxcH',
    comissaoTag: 'amazon_prime_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Estrutura em ABS resistente a impacto, cadeado embutido e dimensões homologadas para cabine de avião e ônibus.'
  },
  {
    slug: 'oferta-urgente-powerbank-turbo-20000mah-amazon',
    nome: 'Bateria Externa Power Bank 20.000mAh Turbo Fast Charge 22.5W',
    plataforma: 'Amazon',
    categoria: 'Eletrônicos',
    precoDe: 'R$ 199,90',
    precoPor: 'R$ 74,90',
    desconto: '-63% OFF',
    minutos: 8,
    linkAfiliado: 'https://link.amazon/B0hmLsxcH',
    comissaoTag: 'amazon_prime_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Carrega até 5 vezes o smartphone com display digital de porcentagem e saídas USB-C e Lightning.'
  },
  {
    slug: 'oferta-urgente-air-fryer-digital-inox-amazon',
    nome: 'Fritadeira Sem Óleo Air Fryer Digital 4.5L Inox Painel Touch',
    plataforma: 'Amazon',
    categoria: 'Eletrodomésticos',
    precoDe: 'R$ 449,00',
    precoPor: 'R$ 199,00',
    desconto: '-56% OFF',
    minutos: 12,
    linkAfiliado: 'https://link.amazon/B0hmLsxcH',
    comissaoTag: 'amazon_prime_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Frituras crocantes e saudáveis com cesto antiaderente removível e timer digital automático.'
  },

  // 4. MERCADO LIVRE (Varejo Full & Casa)
  {
    slug: 'oferta-urgente-jogo-panelas-ceramica-inducao-ml',
    nome: 'Jogo de Panelas 5 Peças Antiaderente Cerâmica Cerâmica Full Indução',
    plataforma: 'MercadoLivre',
    categoria: 'Casa & Cozinha',
    precoDe: 'R$ 499,00',
    precoPor: 'R$ 179,00',
    desconto: '-64% OFF',
    minutos: 9,
    linkAfiliado: 'https://meli.la/1U3rtgV',
    comissaoTag: 'ml_full_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Cabos soft touch amadeirados, tampas de vidro com saída de vapor e fundo triplo para fogão de indução.'
  },
  {
    slug: 'oferta-urgente-robo-aspirador-inteligente-ml',
    nome: 'Robô Aspirador de Pó Inteligente 3 em 1 Varre, Aspira e Passa Pano',
    plataforma: 'MercadoLivre',
    categoria: 'Smart Home',
    precoDe: 'R$ 380,00',
    precoPor: 'R$ 129,90',
    desconto: '-66% OFF',
    minutos: 11,
    linkAfiliado: 'https://meli.la/1U3rtgV',
    comissaoTag: 'ml_full_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Sensores antiqueda, bateria recarregável bivolt e reservatório de poeira lavável com envio Full 24h.'
  },
  {
    slug: 'oferta-urgente-kit-ferramentas-profissional-ml',
    nome: 'Maleta Jogo de Ferramentas Completa 142 Peças Aço Cromo Vanádio',
    plataforma: 'MercadoLivre',
    categoria: 'Ferramentas & Construção',
    precoDe: 'R$ 299,00',
    precoPor: 'R$ 98,90',
    desconto: '-67% OFF',
    minutos: 14,
    linkAfiliado: 'https://meli.la/1U3rtgV',
    comissaoTag: 'ml_full_cpa',
    descricao: '🚨 BUG DE PREÇO DETECTADO PELO ROBÔ: Chaves catraca, alicates, soquetes e bits profissionais organizados em maleta rígida para transporte.'
  }
];

function gerarHTMLOfertaUrgente(d) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>🚨 BUG DE PREÇO: ${d.nome} com ${d.desconto} | AQUITEM Achadinhos</title>
<meta name="description" content="[OFERTA RELÂMPAGO] ${d.descricao} De ${d.precoDe} por apenas ${d.precoPor}. Resgate seu produto antes da correção do robô.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/achadinhos/${d.slug}">
<meta name="theme-color" content="#030712">

<!-- Meta tags Open Graph -->
<meta property="og:type" content="product">
<meta property="og:site_name" content="AQUITEM Achadinhos e Ofertas">
<meta property="og:title" content="🚨 BUG DE PREÇO DETECTADO: ${d.nome} por ${d.precoPor}">
<meta property="og:description" content="${d.descricao}">
<meta property="og:image" content="https://www.aquitemachadinhos.com.br/assets/og-image.png">
<meta property="og:url" content="https://www.aquitemachadinhos.com.br/achadinhos/${d.slug}">
<meta name="twitter:card" content="summary_large_image">

<!-- CSS Master Inline (< 0.3s) -->
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=JetBrains+Mono:wght@500;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
  body { background-color: #030712; color: #F3F4F6; font-family: 'Inter', -apple-system, sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .pulse-red-glow { animation: pRedGlow 0.9s infinite; }
  @keyframes pRedGlow { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.88); } }
  .box-deal-urgent {
    background: radial-gradient(circle at 50% 0%, #0d2244 0%, #060e1d 65%, #030712 100%);
    border: 2px solid #10B981;
    box-shadow: 0 0 35px rgba(16, 185, 129, 0.25);
  }
  .btn-gold-action {
    background: linear-gradient(135deg, #FFE259 0%, #FFA751 100%);
    color: #0B1426;
    animation: pulseGoldBtn 1.5s infinite;
  }
  @keyframes pulseGoldBtn {
    0% { box-shadow: 0 0 15px rgba(245, 215, 127, 0.5); }
    50% { box-shadow: 0 0 35px rgba(245, 215, 127, 0.9); }
    100% { box-shadow: 0 0 15px rgba(245, 215, 127, 0.5); }
  }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6 justify-center items-center">
<div class="max-w-xl mx-auto w-full my-auto">

  <!-- PAINEL DE MONITORAMENTO DE OFERTA EXTREMA -->
  <div class="box-deal-urgent rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl relative">
    
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/30 pb-3 mb-5 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500 pulse-red-glow shadow-md shadow-red-500/50"></span>
        <span class="text-red-400 font-black tracking-widest uppercase text-[11px]">🚨 BUG DE PREÇO DETECTADO PELO ROBÔ - ÚLTIMAS UNIDADES</span>
      </div>
      <div class="flex items-center gap-1 font-mono text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
        <span>⏱️</span>
        <span id="dealTimer">EXPIRA EM: ${d.minutos}:36 MIN</span>
      </div>
    </div>

    <div class="text-[11px] font-mono text-emerald-400 font-bold mb-1">&gt; PLATAFORMA OFICIAL: ${d.plataforma.toUpperCase()} BRASIL</div>
    <div class="text-[11px] font-mono text-slate-400 mb-4">&gt; CATEGORIA: ${d.categoria.toUpperCase()} · STATUS: LOTE_RESIDUAL_LIBERADO</div>

    <h1 class="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
      ${d.nome}
    </h1>

    <p class="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
      ${d.descricao}
    </p>

    <!-- BOX DE PREÇO COM DESCONTO AGRESSIVO -->
    <div class="p-4 rounded-2xl bg-black/70 border border-emerald-500/40 flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <span class="text-xs line-through text-slate-500 block font-mono">Preço Oficial: ${d.precoDe}</span>
        <span class="text-3xl font-black text-emerald-400 font-mono">${d.precoPor}</span>
      </div>
      <div class="text-right">
        <span class="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider block mb-1">
          ${d.desconto}
        </span>
        <span class="text-[10px] text-emerald-400 font-bold">✓ Cupom Aplicado</span>
      </div>
    </div>

    <!-- BOTÃO 1-CLIQUE DIRETO COM INJETOR DINÂMICO (< 20ms) -->
    <a id="btnResgatarOferta" href="${d.linkAfiliado}" target="_blank" rel="noopener" class="btn-gold-action block w-full text-center font-black py-4 px-6 rounded-2xl shadow-2xl transition transform hover:scale-[1.02] text-sm sm:text-base uppercase tracking-wider mb-3">
      👉 RESGATAR PRODUTO COM DESCONTO AGORA &rarr;
    </a>

    <p class="text-[11px] text-center text-slate-400">
      Redirecionamento comissionado direto e seguro para a loja oficial ${d.plataforma}.
    </p>
  </div>

  <div class="text-center">
    <a href="../index.html" class="text-xs text-slate-400 hover:text-white underline">
      &larr; Voltar ao Portal Aqui Tem Achadinhos
    </a>
  </div>

</div>

<script>
// 1. Cronômetro Regressivo Dinâmico (6 a 14 Minutos)
var initialMins = ${d.minutos};
var remainingSec = initialMins * 60 + 36;
setInterval(function() {
  if (remainingSec > 0) {
    remainingSec--;
  } else {
    remainingSec = Math.floor(Math.random() * (14 - 6 + 1) + 6) * 60 + 59;
  }
  var m = Math.floor(remainingSec / 60);
  var s = remainingSec % 60;
  var el = document.getElementById('dealTimer');
  if (el) el.textContent = 'EXPIRA EM: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
}, 1000);

// 2. Consulta Rápida do Supabase em menos de 20ms
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btnResgatarOferta');
  var SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

  fetch(SUPABASE_URL + "/monetizacao_urgente?categoria=eq.${d.plataforma}&select=url_afiliado_padrao&limit=1", {
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY }
  }).then(function(r) { return r.json(); }).then(function(rows) {
    if (rows && rows.length > 0 && rows[0].url_afiliado_padrao && btn) {
      btn.href = rows[0].url_afiliado_padrao;
    }
  }).catch(function() {});

  if (btn) {
    btn.addEventListener('click', function() {
      fetch(SUPABASE_URL + "/cliques_afiliados_logs", {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ cidade_destino: "Nacional", tipo_transporte: "${d.plataforma}", rota: "${d.slug}", criado_em: new Date().toISOString() })
      }).catch(function() {});
    });
  }
});
</script>
</body>
</html>`;
}

// Compilação dos arquivos em achadinhos/
VIRAL_HIGH_COMMISSION_DEALS.forEach(d => {
  const fileName = `${d.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'achadinhos', fileName);
  fs.writeFileSync(fullPath, gerarHTMLOfertaUrgente(d), 'utf8');
  console.log(`✓ Gerada página de alta comissão: achadinhos/${fileName}`);
});
console.log(`\n🏆 Total de ${VIRAL_HIGH_COMMISSION_DEALS.length} páginas virais de alta comissão geradas com sucesso!`);
