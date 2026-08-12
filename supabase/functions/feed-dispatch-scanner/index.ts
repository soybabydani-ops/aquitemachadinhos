import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GITHUB_REPO = "soybabydani-ops/aquitemachadinhos";
const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") || Deno.env.get("GH_TOKEN") || "";

interface TransitFeedItem {
  slug: string;
  origem: string;
  destino: string;
  precoNormal: string;
  precoContingencia: string;
  desconto: string;
  afiliadoUrl: string;
}

const PUBLIC_TRANSIT_FEED_ALERTS: TransitFeedItem[] = [
  {
    slug: "assentos-promocionais-sp-para-barretos",
    origem: "São Paulo (Tietê)",
    destino: "Barretos/SP (Festa do Peão 2026)",
    precoNormal: "R$ 280,00",
    precoContingencia: "R$ 49,90",
    desconto: "-82% OFF",
    afiliadoUrl: "https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20emitir%20o%20assento%20de%20contingencia%20SP-Barretos."
  },
  {
    slug: "painel-vagas-ultimahora-guarulhos-rio",
    origem: "São Paulo (Guarulhos GRU)",
    destino: "Rio de Janeiro (GIG/SDU)",
    precoNormal: "R$ 480,00",
    precoContingencia: "R$ 89,90",
    desconto: "-81% OFF",
    afiliadoUrl: "https://www.decolar.com/passagens-aereas/?ref=aquitem_nacional"
  }
];

function buildContingencyHTML(item: TransitFeedItem): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>⚠️ Painel de Despacho: ${item.origem} para ${item.destino} - Assentos Residuais</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#030712;color:#F8FAFC;font-family:-apple-system,sans-serif;padding:16px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}
  .card{max-width:500px;width:100%;background:#091224;border:2px solid #10B981;border-radius:20px;padding:24px;box-shadow:0 0 35px rgba(16,185,129,0.25)}
  .price{font-size:1.8rem;font-weight:900;color:#10B981;margin:8px 0}
  .btn{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#FFE259,#FFA751);color:#0B1426;font-weight:900;font-size:14px;padding:15px;border-radius:12px;text-decoration:none;text-transform:uppercase}
</style>
</head>
<body>
<div class="card">
  <div style="font-size:11px;font-weight:900;color:#EF4444;margin-bottom:8px">● PAINEL DE DESPACHO & VAGAS DE ÚLTIMA HORA</div>
  <h1 style="font-size:1.3rem;font-weight:900;margin-bottom:8px">${item.origem} &rarr; ${item.destino}</h1>
  <div style="background:#040914;padding:12px;border-radius:12px;margin-bottom:14px">
    <div style="font-size:12px;color:#94A3B8">Preço no Guichê: <span style="text-decoration:line-through">${item.precoNormal}</span></div>
    <div style="font-size:12px;color:#F5D77F;font-weight:700">⚡ Tarifa de Contingência: ${item.desconto}</div>
    <div class="price">${item.precoContingencia}</div>
  </div>
  <a href="${item.afiliadoUrl}" target="_blank" rel="noopener" class="btn">👉 Emitir com Desconto Imediato &rarr;</a>
</div>
</body>
</html>`;
}

serve(async () => {
  try {
    const results = [];
    for (const item of PUBLIC_TRANSIT_FEED_ALERTS) {
      const html = buildContingencyHTML(item);
      const fileName = `contingencia/${item.slug}.html`;

      if (GITHUB_TOKEN) {
        const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`;
        let sha = "";
        const checkRes = await fetch(url, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "Supabase-Feed-Dispatcher" } });
        if (checkRes.ok) {
          const d = await checkRes.json();
          sha = d.sha;
        }
        const body: Record<string, string> = {
          message: `feat(contingency): auto-generate contingency route ${fileName}`,
          content: btoa(unescape(encodeURIComponent(html)))
        };
        if (sha) body.sha = sha;
        const putRes = await fetch(url, {
          method: "PUT",
          headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json", "User-Agent": "Supabase-Feed-Dispatcher" },
          body: JSON.stringify(body)
        });
        results.push({ route: item.slug, committed: putRes.ok });
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
