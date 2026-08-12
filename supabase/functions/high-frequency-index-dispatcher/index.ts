// AQUITEM HIGH-FREQUENCY EDGE CRAWL OPTIMIZER (Deno Native Runtime)

const HOST = "www.aquitemachadinhos.com.br";
const KEY = "aquitem2026indexnowkey";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
  "https://search.seznam.cz/indexnow"
];

// URLs de alta prioridade cruzando todos os canais de monetização
const TOP_PRIORITY_URLS = [
  `https://${HOST}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao.html`,
  `https://${HOST}/pacotes-viagem/bugs-passagens-aereas-internacionais-orlando.html`,
  `https://${HOST}/pacotes-viagem/bugs-passagens-aereas-internacionais-paris.html`,
  `https://${HOST}/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-barretos.html`,
  `https://${HOST}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html`,
  `https://${HOST}/aluguel-carros/como-conseguir-desconto-locacao-veiculos-festa-peao-barretos.html`,
  `https://${HOST}/aluguel-carros/luxury-car-hire-suv-rentals-tokyo-haneda.html`,
  `https://${HOST}/aluguel-carros/best-car-rental-deals-free-cancellation-mia-airport.html`,
  `https://${HOST}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje.html`,
  `https://${HOST}/cursos/melhores-cursos-online-capacitacao-profissional-barretos.html`,
  `https://${HOST}/cursos/cursos-inteligencia-artificial-chatgpt-prompts.html`,
  `https://${HOST}/infoprodutos/clube-invest-v3.html`,
  `https://${HOST}/clube-invest/como-destravar-independencia-financeira.html`,
  `https://${HOST}/estudante/como-pagar-meia-entrada-festa-do-peao-barretos.html`,
  `https://${HOST}/energy-system/how-to-lower-electricity-bills-at-home-legally.html`,
  `https://${HOST}/viagens.html`,
  `https://${HOST}/destinos/orlando-passagens-hoteis-baratos.html`,
  `https://${HOST}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html`,
  `https://${HOST}/barretos-2026/biometria-facial-festa-do-peao-barretos.html`,
  `https://${HOST}/looks/chapeu-pralana-barretos-promocao.html`,
  `https://${HOST}/alerta-clima/barretos-alerta-meteorologico.html`,
  `https://${HOST}/concursos/barretos-inscricoes-abertas.html`,
  `https://${HOST}/pinterest-catalog.xml`,
  `https://${HOST}/pinterest-global-catalog.xml`
];

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const startTime = performance.now();

  try {
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: TOP_PRIORITY_URLS
    });

    // 1. Disparo Concorrente em Paralelo via Promise.all()
    const indexNowPromises = INDEXNOW_ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "AQUITEM-HighFrequency-BatchIndexer/3.5 (Compatible; Public Service & Live Deal Portal)"
          },
          body: payload
        });
        return { endpoint, status: res.status, ok: res.ok || res.status === 202 };
      } catch (err: any) {
        return { endpoint, error: err.message, ok: false };
      }
    });

    // 2. Ping Google Search Console Sitemap
    const googlePingPromise = fetch(`https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`)
      .then(r => ({ endpoint: "Google Sitemap Ping", status: r.status, ok: true }))
      .catch(e => ({ endpoint: "Google Sitemap Ping", error: e.message, ok: false }));

    const [indexResults, googleResult] = await Promise.all([
      Promise.all(indexNowPromises),
      googlePingPromise
    ]);

    const elapsedMs = Math.round(performance.now() - startTime);

    return new Response(JSON.stringify({
      success: true,
      execution_ms: elapsedMs,
      urls_dispatched: TOP_PRIORITY_URLS.length,
      endpoints: [...indexResults, googleResult],
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      execution_ms: Math.round(performance.now() - startTime)
    }), { headers: corsHeaders, status: 500 });
  }
});
