import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GITHUB_REPO = "soybabydani-ops/aquitemachadinhos";
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") || Deno.env.get("GH_TOKEN") || "";

interface AnomalyEvent {
  slug: string;
  identificador: string;
  origem: string;
  destino: string;
  motivo: string;
  statusAlerta: string;
  alternativa1: string;
  alternativa2: string;
  preco: string;
  linkReserva: string;
}

const REALTIME_ANOMALIES: AnomalyEvent[] = [
  {
    slug: "voo-azul-4321-cancelado",
    identificador: "Voo Azul 4321 (VCP -> SDU)",
    origem: "Campinas / São Paulo",
    destino: "Rio de Janeiro",
    motivo: "Readequação de Malha Aérea",
    statusAlerta: "CANCELADO / REACOMODAÇÃO NECESSÁRIA",
    alternativa1: "Voo Imediato Congonhas (CGH) -> Galeão (GIG) às 21:40",
    alternativa2: "Ônibus Leito Executivo Rodoviária Tietê -> Novo Rio",
    preco: "R$ 89,90",
    linkReserva: "https://wa.me/5511991238899?text=Ol%C3%A1!%20Meu%20voo%20foi%20cancelado%20e%20preciso%20de%20alternativa."
  }
];

function buildAnomalyHTML(a: AnomalyEvent): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>⚠️ URGENTE: Alternativas Rápidas para o Voo/Ônibus ${a.identificador} - Assentos Disponíveis</title>
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/alerta/${a.slug}">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#020617;color:#F8FAFC;font-family:-apple-system,sans-serif;padding:16px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}
  .box{max-width:520px;width:100%;background:#091224;border:2px solid #EF4444;border-radius:20px;padding:24px;box-shadow:0 0 35px rgba(239,68,68,0.35)}
  .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.2);color:#FCA5A5;border:1px solid #EF4444;font-size:11px;font-weight:900;padding:4px 10px;border-radius:999px}
  h1{font-size:1.35rem;font-weight:900;color:#FFF;margin:12px 0 6px 0}
  .alt-box{background:#040914;border:1px solid rgba(245,215,127,0.3);border-radius:14px;padding:14px;margin-bottom:16px}
  .price{font-size:1.8rem;font-weight:900;color:#10B981;margin:8px 0}
  .btn-urgent{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#FFE259,#FFA751);color:#0B1426;font-weight:900;font-size:14px;padding:14px;border-radius:12px;text-decoration:none;text-transform:uppercase}
</style>
</head>
<body>
<div class="box">
  <div class="badge">SISTEMA DE CONTINGÊNCIA · ALERTA ATIVO</div>
  <h1>${a.statusAlerta}</h1>
  <p style="font-size:12px;color:#94A3B8;margin-bottom:16px">${a.identificador} · ${a.origem} &rarr; ${a.destino}</p>
  <div class="alt-box">
    <div style="font-size:11px;font-weight:800;color:#F5D77F;margin-bottom:6px">⚡ Alternativas Imediatas:</div>
    <div style="font-size:12px;margin-bottom:6px">${a.alternativa1}</div>
    <div style="font-size:12px">${a.alternativa2}</div>
    <div class="price">A partir de ${a.preco}</div>
  </div>
  <a href="${a.linkReserva}" target="_blank" rel="noopener" class="btn-urgent">
    🚨 Emitir Assento de Contingência no WhatsApp &rarr;
  </a>
</div>
</body>
</html>`;
}

serve(async () => {
  try {
    const results = [];
    for (const anomalia of REALTIME_ANOMALIES) {
      const html = buildAnomalyHTML(anomalia);
      const fileName = `alerta/${anomalia.slug}.html`;
      
      // Commit via GitHub API
      if (GITHUB_TOKEN) {
        const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`;
        let sha = "";
        const checkRes = await fetch(url, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "Supabase-HFT-Engine" } });
        if (checkRes.ok) {
          const d = await checkRes.json();
          sha = d.sha;
        }
        const body: Record<string, string> = {
          message: `feat(hft-alert): auto-generate transit anomaly page ${fileName}`,
          content: btoa(unescape(encodeURIComponent(html)))
        };
        if (sha) body.sha = sha;
        const putRes = await fetch(url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json", "User-Agent": "Supabase-HFT-Engine" },
          body: JSON.stringify(body)
        });
        results.push({ anomaly: anomalia.identificador, committed: putRes.ok });
      }
    }

    // Ping IndexNow
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.aquitemachadinhos.com.br",
        key: "aquitem2026indexnowkey",
        keyLocation: "https://www.aquitemachadinhos.com.br/aquitem2026indexnowkey.txt",
        urlList: ["https://www.aquitemachadinhos.com.br/alerta/voo-azul-4321-cancelado.html"]
      })
    }).catch(() => {});

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
