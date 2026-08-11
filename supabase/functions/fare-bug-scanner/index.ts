import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GITHUB_REPO = "soybabydani-ops/aquitemachadinhos";
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") || Deno.env.get("GH_TOKEN") || "";

interface FareAlert {
  id: string;
  origem: string;
  origemSlug: string;
  destino: string;
  destinoSlug: string;
  tipo: string;
  precoNormal: number;
  precoBug: number;
  descontoPct: number;
  linkAfiliado: string;
}

const FARE_TARGET_ROUTES: FareAlert[] = [
  {
    id: "sp-barretos-peao-2026",
    origem: "São Paulo",
    origemSlug: "sao-paulo",
    destino: "Barretos",
    destinoSlug: "barretos",
    tipo: "Ônibus Executivo & Vans VIP",
    precoNormal: 280.0,
    precoBug: 49.9,
    descontoPct: 82,
    linkAfiliado: "https://wa.me/5517991238899?text=Ol%C3%A1!%20Peguei%20o%20bug%20de%20passagem%20SP-Barretos%20no%20Aqui%20Tem."
  },
  {
    id: "sp-gramado-natal-luz",
    origem: "São Paulo",
    origemSlug: "sao-paulo",
    destino: "Gramado",
    destinoSlug: "gramado",
    tipo: "Aéreo Charter + Transfer Serra",
    precoNormal: 890.0,
    precoBug: 289.0,
    descontoPct: 68,
    linkAfiliado: "https://wa.me/5517997814500?text=Ol%C3%A1!%20Quero%20a%20tarifa%20aerea%20promocional%20Gramado."
  }
];

function generateViralHTML(fare: FareAlert): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>⚠️ ALERTA RÁPIDO: Sistema de Passagens de ${fare.origem} para ${fare.destino} liberou tarifa residual. Economia de ${fare.descontoPct}%!</title>
<meta name="description" content="[URGENTE] Brecha de algoritmo detectada: assentos residuais de ${fare.origem} para ${fare.destino} liberados a preço de custo. Vagas limitadas.">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/passagem-bug-${fare.destinoSlug}">
<meta name="theme-color" content="#030712">
<link rel="stylesheet" href="assets/tailwind.css">
<link rel="stylesheet" href="assets/styles.css?v=28.0">
<style>
  body { background-color: #030712; color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .radar-blink { animation: radarBlink 1.2s infinite; }
  @keyframes radarBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
  .terminal-box { background: linear-gradient(160deg, #0b1528 0%, #030712 100%); border: 1.5px solid #10B981; box-shadow: 0 0 25px rgba(16,185,129,0.25); }
  .locker-blur { filter: blur(6px); pointer-events: none; user-select: none; }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6">
<div class="max-w-2xl mx-auto w-full">
  
  <!-- TERMINAL STATUS -->
  <div class="terminal-box rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/20 pb-3 mb-4">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 radar-blink"></span>
        <span class="text-emerald-400 font-black tracking-widest uppercase">CONEXÃO ESTÁVEL · LIVE</span>
      </div>
      <span class="text-emerald-300 font-bold" id="live-timer">EXPIRA EM: 41:50 MIN</span>
    </div>

    <div class="text-xs font-mono text-emerald-400/90 mb-1">&gt; STATUS: BRECHA_TARIFA_RESIDUAL_DETECTADA</div>
    <div class="text-xs font-mono text-silver-400 mb-4">&gt; ROTA: ${fare.origem} &rarr; ${fare.destino} · DESCONTO: ${fare.descontoPct}%</div>

    <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">
      Assentos Residuais de ${fare.origem} para ${fare.destino} a <span class="text-emerald-400">R$ ${fare.precoBug.toFixed(2).replace('.', ',')}</span>.
    </h1>

    <div class="mt-4 p-4 rounded-xl bg-black/50 border border-emerald-500/30 flex items-center justify-between">
      <div>
        <span class="text-xs line-through text-slate-500 block">De R$ ${fare.precoNormal.toFixed(2).replace('.', ',')}</span>
        <span class="text-3xl font-black text-emerald-400">R$ ${fare.precoBug.toFixed(2).replace('.', ',')}</span>
      </div>
      <span class="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
        ${fare.descontoPct}% ECONOMIA
      </span>
    </div>
  </div>

  <!-- CONTEÚDO DO HACK -->
  <div class="bg-slate-900/90 border border-white/10 rounded-2xl p-5 mb-6 text-sm text-slate-300 space-y-3">
    <h2 class="text-base font-extrabold text-amber-400 flex items-center gap-2">
      <span>💡</span> Como o Algoritmo Funciona:
    </h2>
    <p>
      As viações executivas e charters aéreos liquidam os últimos assentos de madrugada a preço de custo operacional para evitar viagens ociosas. Nosso scanner intercepta a cotação no momento da quebra.
    </p>
    <p class="text-xs text-amber-300 bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
      ⚠️ <strong>ATENÇÃO:</strong> Reserve imediatamente no botão abaixo antes que o robô da empresa recalcule o lote.
    </p>
  </div>

  <!-- VIRAL SHARE LOCKER (MOTOR DE TRÁFEGO 24H) -->
  <div class="bg-gradient-to-br from-emerald-950/60 to-slate-900 border-2 border-emerald-400 rounded-2xl p-6 mb-6 text-center" id="shareLocker">
    <div class="text-3xl mb-2">🔒</div>
    <h3 class="text-lg font-black text-white">Desbloquear Link Direto do Bug</h3>
    <p class="text-xs text-slate-300 mt-1 mb-5">
      Para evitar que robôs esgotem as passagens, compartilhe o alerta no WhatsApp para liberar o botão de compra instantânea.
    </p>

    <button onclick="triggerViralShare()" class="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-4 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
      <span>💬</span> Compartilhar no WhatsApp para Liberar
    </button>
  </div>

  <!-- BOTÃO DE RESERVA DESBLOQUEADO -->
  <div id="unlockedSection" class="hidden mb-6">
    <a href="${fare.linkAfiliado}" target="_blank" rel="noopener" class="block w-full text-center bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 text-slate-950 font-black py-4 px-6 rounded-xl shadow-2xl text-base uppercase tracking-wider">
      ⚡ EMITIR PASSAGEM COM ${fare.descontoPct}% OFF NO WHATSAPP &rarr;
    </a>
  </div>

  <!-- MONETIZAÇÃO LOCAL (POUSADAS & SERVIÇOS CREDENCIADOS) -->
  <div class="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-8">
    <div class="flex items-center justify-between mb-4">
      <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Pousadas & Chalés em ${fare.destino}</span>
      <span class="text-[10px] text-emerald-400 font-bold">✓ Sem Taxa de Agência</span>
    </div>
    <p class="text-xs text-slate-400 mb-4">
      Economize também na hospedagem. Negocie direto com os proprietários verificados no guia oficial da cidade.
    </p>
    <a href="${fare.destinoSlug}-home.html" class="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl text-xs transition">
      🏨 Ver Pousadas e Hospedagens em ${fare.destino} &rarr;
    </a>
  </div>

</div>

<script>
var totalSec = 42 * 60 - 10;
setInterval(function() {
  if (totalSec > 0) {
    totalSec--;
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    var el = document.getElementById('live-timer');
    if (el) el.textContent = 'EXPIRA EM: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
  }
}, 1000);

function triggerViralShare() {
  var url = window.location.href;
  var msg = encodeURIComponent("Olha rápido esse bug de passagem para ${fare.destino} que achei no Aqui Tem Achadinhos! Consegui por metade do preço: " + url);
  window.open("https://api.whatsapp.com/send?text=" + msg, "_blank");
  setTimeout(function() {
    document.getElementById('shareLocker').classList.add('hidden');
    document.getElementById('unlockedSection').classList.remove('hidden');
  }, 1200);
}
</script>
</body>
</html>`;
}

async function commitToGitHub(filePath: string, content: string): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
    let sha = "";
    
    // Check if file exists
    const checkRes = await fetch(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "Supabase-Edge-Scanner" }
    });
    if (checkRes.ok) {
      const data = await checkRes.json();
      sha = data.sha;
    }

    // Commit file
    const body: Record<string, string> = {
      message: `feat(growth): auto-generated real-time fare bug page ${filePath}`,
      content: btoa(unescape(encodeURIComponent(content)))
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Supabase-Edge-Scanner"
      },
      body: JSON.stringify(body)
    });

    return putRes.ok;
  } catch (err) {
    console.error("[GitHub Commit Error]:", err);
    return false;
  }
}

serve(async (req) => {
  try {
    const results = [];
    for (const fare of FARE_TARGET_ROUTES) {
      if (fare.descontoPct >= 40) {
        const html = generateViralHTML(fare);
        const fileName = `passagem-bug-${fare.destinoSlug}.html`;
        const committed = await commitToGitHub(fileName, html);
        results.push({ route: fare.id, fileName, committed });
      }
    }

    return new Response(JSON.stringify({ success: true, timestamp: new Date().toISOString(), results }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
