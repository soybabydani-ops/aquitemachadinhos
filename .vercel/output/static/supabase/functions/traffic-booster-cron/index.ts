import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const HOST = "www.aquitemachadinhos.com.br";
const KEY = "aquitem2026indexnowkey";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

serve(async () => {
  try {
    const startTime = Date.now();

    // 1. Busca produtos mais quentes do banco
    let topUrls = [
      `https://${HOST}/viagens.html`,
      `https://${HOST}/captura-tarifas-bug.html`,
      `https://${HOST}/scanner-tarifas-ocultas.html`,
      `https://${HOST}/arbitragem-trafego.html`,
      `https://${HOST}/pinterest-catalog.xml`
    ];

    if (SUPABASE_SERVICE_ROLE_KEY) {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/achadinhos_produtos_monetizados?select=slug,plataforma&order=atualizado_em.desc&limit=5`, {
        headers: { apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` }
      });
      if (res.ok) {
        const products = await res.json();
        products.forEach((p: { slug: string; plataforma: string }) => {
          topUrls.push(`https://${HOST}/achadinhos/${p.slug}.html`);
        });
      }
    }

    // 2. Disparo IndexNow Global
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: topUrls
    });

    const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: payload
    });

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      execution_ms: Date.now() - startTime,
      urls_boosted: topUrls.length,
      indexNow_status: indexNowRes.status
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
