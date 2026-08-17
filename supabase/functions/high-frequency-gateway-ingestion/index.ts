// AQUITEM HIGH-FREQUENCY GATEWAY INGESTION (Deno Native)
const DOMAIN = "https://www.aquitemachadinhos.com.br";
const INDEXNOW_KEY = Deno.env.get("INDEXNOW_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json; charset=utf-8"
};

const FEEDS_TO_PING = [
  `${DOMAIN}/feeds/alertas-urgentes.xml`,
  `${DOMAIN}/feeds/sitemap-urgente.atom`,
  `${DOMAIN}/feeds/achadinhos-global.xml`,
  `${DOMAIN}/data/hubs-municipais.json`,
  `${DOMAIN}/data/index-hacker-realtime.json`,
  `${DOMAIN}/data/ofertas-turismo-municipais.json`,
  `${DOMAIN}/sitemap.xml`
];

const TIER1_INGESTION_ENDPOINTS = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(`${DOMAIN}/sitemap.xml`)}`,
  `https://www.google.com/ping?sitemap=${encodeURIComponent(`${DOMAIN}/feeds/sitemap-urgente.atom`)}`,
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${DOMAIN}/sitemap.xml`)}`,
  `https://api.indexnow.org/indexnow?url=${encodeURIComponent(`${DOMAIN}/feeds/alertas-urgentes.xml`)}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(`${DOMAIN}/indexnow-key.txt`)}`
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const pingResults = await Promise.allSettled(
      TIER1_INGESTION_ENDPOINTS.map(async (endpoint) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(endpoint, {
            method: "GET",
            headers: {
              "User-Agent": "AquiTemAchadinhos-Ingestion-Bot/4.2 (+https://www.aquitemachadinhos.com.br)"
            },
            signal: controller.signal
          });
          clearTimeout(timeout);
          return { endpoint, status: res.status, ok: res.ok };
        } catch (err: any) {
          return { endpoint, status: 504, ok: false, error: err.message };
        }
      })
    );

    const indexNowPayload = {
      host: "www.aquitemachadinhos.com.br",
      key: INDEXNOW_KEY,
      keyLocation: `${DOMAIN}/indexnow-key.txt`,
      urlList: [
        `${DOMAIN}/luxo-vip`,
        `${DOMAIN}/pacotes-viagem`,
        `${DOMAIN}/aluguel-carros`,
        `${DOMAIN}/cursos`,
        `${DOMAIN}/infoprodutos`,
        `${DOMAIN}/clube-invest/como-destravar-independencia-financeira`,
        `${DOMAIN}/estudante/carteirinha-estudante-digital-emitida-na-hora`,
        `${DOMAIN}/energy-system/how-to-lower-electricity-bills-at-home-legally`,
        `${DOMAIN}/achadinhos`,
        `${DOMAIN}/marcas`,
        `${DOMAIN}/alerta-transito`,
        `${DOMAIN}/concursos`,
        `${DOMAIN}/alerta-clima`,
        `${DOMAIN}/utilidade-publica/barretos/achados-e-perdidos`,
        `${DOMAIN}/feeds/alertas-urgentes.xml`,
        `${DOMAIN}/feeds/sitemap-urgente.atom`
      ]
    };

    const indexNowEngines = [
      "https://api.indexnow.org/indexnow",
      "https://www.bing.com/indexnow",
      "https://yandex.com/indexnow",
      "https://search.seznam.cz/indexnow"
    ];

    const indexNowResults = await Promise.allSettled(
      indexNowEngines.map(async (engine) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(engine, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(indexNowPayload),
            signal: controller.signal
          });
          clearTimeout(timeout);
          return { engine, status: res.status, ok: res.ok };
        } catch (err: any) {
          return { engine, status: 504, ok: false, error: err.message };
        }
      })
    );

    const duration = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        protocol: "High-Frequency Gateway Ingestion v4.2",
        sourceProvider: DOMAIN,
        tier1Pings: pingResults.map(r => r.status === "fulfilled" ? r.value : { error: r.reason }),
        indexNowDispatch: indexNowResults.map(r => r.status === "fulfilled" ? r.value : { error: r.reason }),
        feedsSynchronized: FEEDS_TO_PING.length,
        executionTimeMs: duration,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});