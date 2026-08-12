// AQUITEM REAL-TIME TREND MONITOR EDGE FUNCTION (Deno Native Runtime)

const DOMAIN = "https://www.aquitemachadinhos.com.br";

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const activeTrends = [
      {
        slug: "horarios-linhas-onibus-barra-funda-campinas-hoje",
        termo: "Horários e Passagens de Ônibus Barra Funda x Campinas",
        categoria: "Transporte & Rodoviário",
        url_otimizada: `${DOMAIN}/tendencias/horarios-linhas-onibus-barra-funda-campinas-hoje`,
        status: "trending_active"
      },
      {
        slug: "calendario-pagamento-beneficios-inss-pis-hoje",
        termo: "Calendário de Pagamentos INSS e PIS/PASEP 2026",
        categoria: "Utilidade Pública & Finanças",
        url_otimizada: `${DOMAIN}/tendencias/calendario-pagamento-beneficios-inss-pis-hoje`,
        status: "trending_active"
      },
      {
        slug: "prefeitura-barretos-concurso-inscricoes-abertas-hoje",
        termo: "Concurso Prefeitura de Barretos e Região",
        categoria: "Concursos & Empregos",
        url_otimizada: `${DOMAIN}/tendencias/prefeitura-barretos-concurso-inscricoes-abertas-hoje`,
        status: "trending_active"
      },
      {
        slug: "reserva-voos-aeroporto-guarulhos-desconto-hoje",
        termo: "Voos e Transfers Aeroporto de Guarulhos GRU",
        categoria: "Turismo & Passagens",
        url_otimizada: `${DOMAIN}/tendencias/reserva-voos-aeroporto-guarulhos-desconto-hoje`,
        status: "trending_active"
      }
    ];

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      active_trends_count: activeTrends.length,
      trends: activeTrends
    }, null, 2), {
      headers: corsHeaders,
      status: 200
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: corsHeaders,
      status: 500
    });
  }
});
