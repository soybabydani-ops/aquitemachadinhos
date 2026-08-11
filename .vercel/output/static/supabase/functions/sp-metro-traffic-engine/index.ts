import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GITHUB_REPO = "soybabydani-ops/aquitemachadinhos";
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") || Deno.env.get("GH_TOKEN") || "";

interface MetroRoute {
  origem: string;
  origemSlug: string;
  origemBairros: string;
  destino: string;
  destinoSlug: string;
  destinoPonto: string;
  tipo: string;
  precoNormal: string;
  precoBug: string;
  desconto: string;
  minutosTimer: number;
  vagasLocais: string[];
  pousadaComercio: string;
  linkAfiliado: string;
}

const METRO_SP_ROUTES: MetroRoute[] = [
  {
    origem: "Guarulhos",
    origemSlug: "guarulhos",
    origemBairros: "Aeroporto GRU / Cecap / Centro",
    destino: "São Paulo Capital",
    destinoSlug: "sao-paulo",
    destinoPonto: "Metrô Tietê & Av. Paulista",
    tipo: "Transfer Executivo & Van Express",
    precoNormal: "R$ 65,00",
    precoBug: "R$ 14,90",
    desconto: "-77%",
    minutosTimer: 18,
    vagasLocais: ["Motorista CNH B (Diurno/Noturno) - R$ 3.800", "Atendente Bilheteria Aeroporto - R$ 2.450"],
    pousadaComercio: "Hotel & Suítes Executivas Paulista",
    linkAfiliado: "https://wa.me/5511991238899?text=Ol%C3%A1!%20Desbloqueei%20o%20bug%20Guarulhos-SP."
  },
  {
    origem: "Campinas",
    origemSlug: "campinas",
    origemBairros: "Rodoviária Ramos de Azevedo / Viracopos",
    destino: "São Paulo Capital",
    destinoSlug: "sao-paulo",
    destinoPonto: "Terminal Barra Funda & Faria Lima",
    tipo: "Ônibus Executivo Semi-Leito",
    precoNormal: "R$ 58,00",
    precoBug: "R$ 19,90",
    desconto: "-65%",
    minutosTimer: 24,
    vagasLocais: ["Analista de Sistemas Jr - R$ 5.200", "Motorista de Van Executiva - R$ 3.900"],
    pousadaComercio: "Flat & Coworking Faria Lima Prime",
    linkAfiliado: "https://wa.me/5511997814500?text=Ol%C3%A1!%20Quero%20a%20tarifa%20Campinas-SP."
  },
  {
    origem: "São Paulo Capital",
    origemSlug: "sao-paulo",
    origemBairros: "Terminal Jabaquara & Metrô",
    destino: "Santos",
    destinoSlug: "santos",
    destinoPonto: "Gonzaga / Ponta da Praia / Porto",
    tipo: "Ônibus Executivo & Lotação Rápida",
    precoNormal: "R$ 44,00",
    precoBug: "R$ 12,90",
    desconto: "-70%",
    minutosTimer: 15,
    vagasLocais: ["Operador Portuário Santos - R$ 4.500", "Recepcionista Hotel Gonzaga - R$ 2.200"],
    pousadaComercio: "Pousada & Suítes Gonzaga Beach 24h",
    linkAfiliado: "https://wa.me/5511996552211?text=Ol%C3%A1!%20Quero%20a%20passagem%20SP-Santos."
  },
  {
    origem: "São Paulo Capital",
    origemSlug: "sao-paulo",
    origemBairros: "Tietê / Barra Funda",
    destino: "Barretos/SP",
    destinoSlug: "barretos",
    destinoPonto: "Portaria Parque do Peão (Festa do Peão 2026)",
    tipo: "Ônibus Executivo Leito & Transfer Direto",
    precoNormal: "R$ 280,00",
    precoBug: "R$ 49,90",
    desconto: "-82%",
    minutosTimer: 31,
    vagasLocais: ["Barman / Bartender Temporário Arena - R$ 350/dia", "Segurança de Eventos - R$ 300/dia"],
    pousadaComercio: "Pousada Recanto dos Peões & Chalés",
    linkAfiliado: "https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20minha%20passagem%20SP-Barretos."
  }
];

function buildHTML(r: MetroRoute): string {
  const pageSlug = `${r.origemSlug}-para-${r.destinoSlug}`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>⚠️ DETECTADO: Bug de Tarifa na Rota ${r.origem} x ${r.destino} - Vagas Limitadas | AQUITEM</title>
<meta name="description" content="[ALERTA DE SISTEMA] Quebra de algoritmo de tarifa residual de ${r.origem} para ${r.destino}. De ${r.precoNormal} por ${r.precoBug} (${r.desconto}).">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/vagas-e-viagens/${pageSlug}">
<meta name="theme-color" content="#030712">
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<style>
  body { background-color: #030712; color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .radar-blink { animation: radarBlink 1s infinite; }
  @keyframes radarBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
  .terminal-card { background: linear-gradient(160deg, #0b1528 0%, #030712 100%); border: 1.5px solid #10B981; box-shadow: 0 0 30px rgba(16,185,129,0.25); }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6">
<div class="max-w-2xl mx-auto w-full">

  <div class="terminal-card rounded-2xl p-5 mb-6">
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/20 pb-3 mb-4 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 radar-blink"></span>
        <span class="text-red-400 font-black tracking-widest uppercase">SESSÃO ATIVA · ATUALIZADO AGORA</span>
      </div>
      <span class="text-emerald-300 font-bold font-mono" id="live-timer">ESTA TARIFA EXPIRA EM: ${r.minutosTimer}:42 MIN</span>
    </div>

    <div class="text-xs font-mono text-emerald-400/90 mb-1">&gt; STATUS: TARIFA_RESIDUAL_INTERCEPTADA</div>
    <div class="text-xs font-mono text-slate-400 mb-4">&gt; ROTA: ${r.origem} &rarr; ${r.destino} · DESCONTO: ${r.desconto}</div>

    <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight">
      Assentos Residuais de ${r.origem} para ${r.destino} por <span class="text-emerald-400">${r.precoBug}</span>.
    </h1>

    <div class="mt-4 p-4 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center justify-between">
      <div>
        <span class="text-xs line-through text-slate-500 block font-mono">De ${r.precoNormal}</span>
        <span class="text-3xl font-black text-emerald-400 font-mono">${r.precoBug}</span>
      </div>
      <span class="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
        ${r.desconto} ECONOMIA
      </span>
    </div>
  </div>

  <div class="bg-slate-900/90 border border-white/10 rounded-2xl p-5 mb-6 text-sm text-slate-300 space-y-3">
    <h2 class="text-base font-extrabold text-amber-400 flex items-center gap-2">
      <span>💡</span> Vazamento de Informação: Como Funciona o Bug
    </h2>
    <p>
      Para evitar viagens com assentos ociosos nas rotas da Grande São Paulo e interior, as viações e transfers executivos liberam lotes residuais a preço de custo operacional.
    </p>
    <div class="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-xs text-amber-300">
      ⚠️ <strong>BLOQUEIO IMINENTE:</strong> As empresas corrigem a tarifa assim que 5 passagens do lote são emitidas. Reserve no WhatsApp agora.
    </div>
  </div>

  <div class="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-black border-2 border-emerald-400 rounded-2xl p-6 mb-6 text-center shadow-2xl" id="shareLocker">
    <div class="text-3xl mb-2">🔒</div>
    <h3 class="text-lg font-black text-white">Desbloquear Link Direto da Tarifa</h3>
    <p class="text-xs text-slate-300 mt-1 mb-5">
      Para evitar que robôs esgotem as vagas, clique abaixo para compartilhar com um amigo ou grupo e liberar o botão de compra instantânea.
    </p>

    <button onclick="triggerViralShare()" class="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-4 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
      <span>💬</span> Liberar no WhatsApp
    </button>
  </div>

  <div id="unlockedSection" class="hidden mb-6">
    <a href="${r.linkAfiliado}" target="_blank" rel="noopener" class="block w-full text-center bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 text-slate-950 font-black py-4 px-6 rounded-xl shadow-2xl text-base uppercase tracking-wider">
      ⚡ EMITIR PASSAGEM COM ${r.desconto} NO WHATSAPP &rarr;
    </a>
  </div>

  <div class="bg-slate-900/90 border border-amber-400/30 rounded-2xl p-5 mb-8">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">💼 Oportunidades & Hospedagem em ${r.destino}</span>
      <span class="text-[10px] text-emerald-400 font-bold">✓ Guias Oficiais</span>
    </div>
    <ul class="text-xs text-slate-200 space-y-2 mb-4">
      ${r.vagasLocais.map((v: string) => `<li class="flex items-center gap-2"><span class="text-amber-400">✦</span> ${v}</li>`).join("")}
    </ul>
    <div class="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2">
      <a href="../vagas.html?cidade=${r.destinoSlug}" class="text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex-1 transition">
        Ver Todas as Vagas em ${r.destino} &rarr;
      </a>
      <a href="../${r.destinoSlug}-home.html" class="text-center bg-amber-400 hover:bg-amber-300 text-navy-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex-1 transition">
        Acessar Guia de ${r.destino} &rarr;
      </a>
    </div>
  </div>

</div>

<script>
var totalSec = ${r.minutosTimer} * 60 + 42;
setInterval(function() {
  if (totalSec > 0) {
    totalSec--;
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    var el = document.getElementById('live-timer');
    if (el) el.textContent = 'ESTA TARIFA EXPIRA EM: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
  }
}, 1000);

function triggerViralShare() {
  var url = window.location.href;
  var msg = encodeURIComponent("Entra rápido nesse link do Aqui Tem Achadinhos, descobri como viajar saindo de ${r.origem} por quase nada: " + url);
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

async function commitFile(filePath: string, content: string): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;
    let sha = "";
    const checkRes = await fetch(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "Supabase-Metro-Engine" }
    });
    if (checkRes.ok) {
      const data = await checkRes.json();
      sha = data.sha;
    }
    const body: Record<string, string> = {
      message: `feat(programmatic): auto-generated route page ${filePath}`,
      content: btoa(unescape(encodeURIComponent(content)))
    };
    if (sha) body.sha = sha;
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Supabase-Metro-Engine"
      },
      body: JSON.stringify(body)
    });
    return putRes.ok;
  } catch {
    return false;
  }
}

serve(async () => {
  const results = [];
  for (const route of METRO_SP_ROUTES) {
    const html = buildHTML(route);
    const fileName = `vagas-e-viagens/${route.origemSlug}-para-${route.destinoSlug}.html`;
    const ok = await commitFile(fileName, html);
    results.push({ route: `${route.origem} -> ${route.destino}`, fileName, committed: ok });
  }
  return new Response(JSON.stringify({ success: true, timestamp: new Date().toISOString(), results }), {
    headers: { "Content-Type": "application/json" }
  });
});
