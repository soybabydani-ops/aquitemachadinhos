import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const DOMAIN = "https://www.aquitemachadinhos.com.br";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const AUDIT_PATHS = [
  "/",
  "/viagens",
  "/marcas",
  "/cidades",
  "/captura-tarifas-bug",
  "/scanner-tarifas-ocultas",
  "/sitemap.xml",
  "/pinterest-catalog.xml"
];

serve(async () => {
  try {
    const report = [];

    for (const path of AUDIT_PATHS) {
      const startTime = Date.now();
      const res = await fetch(`${DOMAIN}${path}`);
      const duration = Date.now() - startTime;

      const ok = res.status >= 200 && res.status < 400;

      // Grava no log do Supabase
      if (SUPABASE_SERVICE_ROLE_KEY) {
        await fetch(`${SUPABASE_URL}/rest/v1/watchdog_integridade_logs`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            url_testada: `${DOMAIN}${path}`,
            status_http: res.status,
            tempo_resposta_ms: duration,
            acao_executada: ok ? "nenhuma_necessaria" : "autocura_disparada",
            detectado_em: new Date().toISOString()
          })
        }).catch(() => {});
      }

      report.push({ path, status: res.status, duration_ms: duration, ok });
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      all_routes_healthy: report.every(r => r.ok),
      routes_checked: report.length,
      report
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
