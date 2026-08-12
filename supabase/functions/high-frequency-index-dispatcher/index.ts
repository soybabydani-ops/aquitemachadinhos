import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

const HOST = "www.aquitemachadinhos.com.br";
const KEY = "aquitem2026indexnowkey";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow"
];

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // 1. Coleta das URLs prioritárias de alta conversão
    const priorityUrls = [
      `https://${HOST}/viagens.html`,
      `https://${HOST}/captura-tarifas-bug.html`,
      `https://${HOST}/destinos/orlando-passagens-hoteis-baratos.html`,
      `https://${HOST}/destinos/paris-passagens-hoteis-baratos.html`,
      `https://${HOST}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html`,
      `https://${HOST}/barretos-2026/biometria-facial-festa-do-peao-barretos.html`,
      `https://${HOST}/barretos-2026/horarios-shows-gusttavo-lima-ana-castela-barretos.html`,
      `https://${HOST}/eventos/shakira-em-sao-paulo-como-chegar-hoteis.html`,
      `https://${HOST}/looks/chapeu-pralana-barretos-promocao.html`,
      `https://${HOST}/malas-e-viagem/kit-malas-viagem-rigidas-360-tsa-amazon-promocao.html`,
      `https://${HOST}/concursos/barretos-inscricoes-abertas.html`,
      `https://${HOST}/alerta-transito/rodovia-presidente-dutra-travada.html`,
      `https://${HOST}/alerta-clima/barretos-alerta-meteorologico.html`,
      `https://${HOST}/utilidade-publica/barretos/achados-e-perdidos.html`,
      `https://${HOST}/utilidade-publica/barretos/doacoes-e-desapegos.html`,
      `https://${HOST}/pinterest-catalog.xml`
    ];

    // 2. Disparo Multi-Endpoint IndexNow
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: priorityUrls
    });

    const indexNowPromises = INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "AQUITEM-Index-Engine/3.0"
          },
          body: payload
        });
        return { endpoint, status: res.status, ok: res.ok || res.status === 202 };
      } catch (err) {
        return { endpoint, error: err.message, ok: false };
      }
    });

    const indexResults = await Promise.all(indexNowPromises);

    // 3. Ping Google Search Console
    try {
      await fetch(`https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`);
    } catch (_) {}

    return new Response(JSON.stringify({
      success: true,
      execution_ms: Date.now() - startTime,
      urls_dispatched: priorityUrls.length,
      endpoints: indexResults,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      execution_ms: Date.now() - startTime
    }), { headers: corsHeaders, status: 500 });
  }
});
