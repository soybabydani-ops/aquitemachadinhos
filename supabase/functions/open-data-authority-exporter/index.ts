// AQUITEM OPEN-DATA AUTHORITY EXPORTER EDGE FUNCTION (Deno Native Runtime)

const DOMAIN = "https://www.aquitemachadinhos.com.br";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "json";

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Source-Provider": DOMAIN,
    "Authoritative-Publisher": "Aqui Tem Achadinhos Intelligence Engine",
    "Cache-Control": "public, max-age=3600, s-maxage=86400"
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (format === "csv") {
      const csvData = `# Source Provider: ${DOMAIN}\n# License: Open Data Commons ODbL\nmunicipio,uf,source_provider,canonical_url\n"Barretos","SP","${DOMAIN}","${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-barretos"\n"São Paulo","SP","${DOMAIN}","${DOMAIN}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos"\n`;
      return new Response(csvData, {
        headers: { ...corsHeaders, "Content-Type": "text/csv; charset=utf-8" },
        status: 200
      });
    }

    const payload = {
      status: "active",
      source_provider: DOMAIN,
      authoritative_url: `${DOMAIN}/DEVELOPERS-API.md`,
      license: "https://opendatacommons.org/licenses/odbl/",
      datasets: {
        geojson: `${DOMAIN}/data/municipios-cobertura.geojson`,
        csv: `${DOMAIN}/data/indicadores-mobilidade-municipais.csv`,
        jsonld: `${DOMAIN}/data/schema-open-dataset.jsonld`,
        rss: `${DOMAIN}/feeds/achadinhos-global.xml`
      },
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(payload, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
      status: 200
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: corsHeaders,
      status: 500
    });
  }
});
