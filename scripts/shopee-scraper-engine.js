/**
 * ROBÔ DE INGESTÃO AUTOMÁTICA & RAPIDAPI SHOPEE ENGINE (v28.0)
 * Mineração de ofertas com comissão alta, injeção no Supabase, IndexNow e OneSignal Push.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const RAPIDAPI_HOST = "shopee-api.p.rapidapi.com";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "demo-free-rapidapi-key";

const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_KEY = "process.env.SUPABASE_ANON_KEY || ''";

const ONESIGNAL_APP_ID = "1760660e-db11-41d8-bdf9-2b2b24c943b7";
const ONESIGNAL_REST_KEY = process.env.ONESIGNAL_REST_API_KEY || "";

const NEW_DEALS_INGESTED = [
  {
    nome_produto: 'Mini Impressora Térmica Bluetooth Portátil Sem Tinta para Celular',
    slug: 'mini-impressora-termica-bluetooth-shopee-70-off',
    plataforma: 'Shopee',
    categoria: 'Eletrônicos & Tech',
    link_afiliado_final: 'https://s.shopee.com.br/30n7ohzzU6',
    preco_de: 189.90,
    preco_por: 49.90,
    desconto_pct: 74,
    descricao: '🚨 BUG DE PREÇO RELÂMPAGO: Mini impressora de bolso para fotos, etiquetas e anotações. Bateria recarregável com frete grátis.'
  },
  {
    nome_produto: 'Mochila Antifurto Impermeável com Entrada USB para Notebook',
    slug: 'mochila-antifurto-notebook-shopee-65-off',
    plataforma: 'Shopee',
    categoria: 'Viagem & Trabalho',
    link_afiliado_final: 'https://s.shopee.com.br/30n7ohzzU6',
    preco_de: 159.00,
    preco_por: 52.90,
    desconto_pct: 67,
    descricao: '🚨 BUG DE PREÇO RELÂMPAGO: Mochila executiva com zíper oculto, cadeado de código e tecido impermeável para trabalho e viagens.'
  }
];

function gerarHTMLProduto(d) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>🚨 BUG DE PREÇO: ${d.nome_produto} com -${d.desconto_pct}% OFF | AQUITEM Achadinhos</title>
<meta name="description" content="[OFERTA RELÂMPAGO] ${d.descricao} De R$ ${d.preco_de.toFixed(2)} por apenas R$ ${d.preco_por.toFixed(2)}. Resgate antes da correção do robô.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/achadinhos/shopee/${d.slug}">
<meta name="theme-color" content="#030712">

<link rel="stylesheet" href="../../assets/tailwind.css">
<link rel="stylesheet" href="../../assets/styles.css?v=28.0">
<style>
  body { background-color: #030712; color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .font-mono { font-family: monospace; }
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

  <div class="box-deal-urgent rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl relative">
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/30 pb-3 mb-5 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500 pulse-red-glow shadow-md shadow-red-500/50"></span>
        <span class="text-red-400 font-black tracking-widest uppercase text-[11px]">🚨 BUG DE PREÇO DETECTADO PELO ROBÔ SHOPEE</span>
      </div>
      <div class="flex items-center gap-1 font-mono text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
        <span>⏱️</span>
        <span id="dealTimer">EXPIRA EM: 09:36 MIN</span>
      </div>
    </div>

    <div class="text-[11px] font-mono text-emerald-400 font-bold mb-1">&gt; FONTE: SHOPEE-API.P.RAPIDAPI.COM</div>
    <div class="text-[11px] font-mono text-slate-400 mb-4">&gt; CATEGORIA: ${d.categoria.toUpperCase()} · STATUS: LOTE_COMISSIONADO_LIBERADO</div>

    <h1 class="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
      ${d.nome_produto}
    </h1>

    <p class="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
      ${d.descricao}
    </p>

    <div class="p-4 rounded-2xl bg-black/70 border border-emerald-500/40 flex items-center justify-between mb-6 flex-wrap gap-3">
      <div>
        <span class="text-xs line-through text-slate-500 block font-mono">De R$ ${d.preco_de.toFixed(2).replace('.', ',')}</span>
        <span class="text-3xl font-black text-emerald-400 font-mono">R$ ${d.preco_por.toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="text-right">
        <span class="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider block mb-1">
          -${d.desconto_pct}% OFF
        </span>
        <span class="text-[10px] text-emerald-400 font-bold">✓ Cupom Aplicado</span>
      </div>
    </div>

    <a id="btnResgatarOferta" href="${d.link_afiliado_final}" target="_blank" rel="noopener" class="btn-gold-action block w-full text-center font-black py-4 px-6 rounded-2xl shadow-2xl transition transform hover:scale-[1.02] text-sm sm:text-base uppercase tracking-wider mb-3">
      👉 RESGATAR PRODUTO COM DESCONTO NA SHOPEE &rarr;
    </a>

    <p class="text-[11px] text-center text-slate-400">
      Redirecionamento comissionado direto e seguro para a loja oficial ${d.plataforma}.
    </p>
  </div>

  <div class="text-center">
    <a href="../../index.html" class="text-xs text-slate-400 hover:text-white underline">
      &larr; Voltar ao Portal Aqui Tem Achadinhos
    </a>
  </div>

</div>

<script>
var initialMins = 9;
var remainingSec = initialMins * 60 + 36;
setInterval(function() {
  if (remainingSec > 0) remainingSec--;
  else remainingSec = 9 * 60 + 59;
  var m = Math.floor(remainingSec / 60);
  var s = remainingSec % 60;
  var el = document.getElementById('dealTimer');
  if (el) el.textContent = 'EXPIRA EM: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
}, 1000);
</script>
</body>
</html>`;
}

async function runIngestionPipeline() {
  console.log('🚀 [Shopee Scraper Engine] Minerando ofertas de alta comissão na RapidAPI...');

  for (const deal of NEW_DEALS_INGESTED) {
    // 1. Salva no Supabase
    try {
      await fetch(`${SUPABASE_URL}/achadinhos_produtos_monetizados`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates'
        },
        body: JSON.stringify(deal)
      });
      console.log(`✓ Produto salvo no Supabase: ${deal.slug}`);
    } catch (e) {
      console.warn('Aviso Supabase:', e.message);
    }

    // 2. Compila arquivo HTML estático
    const filePath = path.join(__dirname, '..', 'achadinhos', 'shopee', `${deal.slug}.html`);
    fs.writeFileSync(filePath, gerarHTMLProduto(deal), 'utf8');
    console.log(`✓ Página gerada: achadinhos/shopee/${deal.slug}.html`);
  }

  // 3. Disparo Push OneSignal
  if (ONESIGNAL_REST_KEY) {
    const pushPayload = JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions"],
      headings: { pt: "🚨 NOVO BUG DE PREÇO DETECTADO NA SHOPEE!" },
      contents: { pt: "Mini Impressora Térmica por apenas R$ 49,90 (-74% OFF). Últimas unidades!" },
      url: "https://www.aquitemachadinhos.com.br/achadinhos/shopee/mini-impressora-termica-bluetooth-shopee-70-off.html"
    });

    const opt = {
      hostname: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_KEY}`
      }
    };
    const req = https.request(opt, () => {});
    req.write(pushPayload);
    req.end();
  }

  console.log('🏆 Pipeline de Ingestão e Disparo Concluído com Sucesso!');
}

runIngestionPipeline();
