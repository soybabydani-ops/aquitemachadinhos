import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "Deno.env.get("SUPABASE_ANON_KEY") || """;

interface WeatherEmergency {
  cidade_local: string;
  cidade_slug: string;
  tipo_alerta: "Tempestade Severa" | "Ventos Fortes e Rajadas" | "Granizo e Chuva Torrencial" | "Onda de Calor Extremo" | "Risco de Alagamento" | "Frente Fria Intensa";
  severidade: "Vermelho - Perigo Grande" | "Laranja - Perigo" | "Amarelo - Perigo Potencial";
  temperatura_estimada: string;
  descricao_emergencia: string;
  recomendacoes_defesa_civil: string;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const city = url.searchParams.get("city") || "sao-paulo";
    const cityName = city.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    const weatherAlert: WeatherEmergency = {
      cidade_local: `${cityName}, BR`,
      cidade_slug: city,
      tipo_alerta: "Tempestade Severa",
      severidade: "Laranja - Perigo",
      temperatura_estimada: "22°C - 31°C",
      descricao_emergencia: `Aviso meteorológico oficial INMET / Defesa Civil: Previsão de pancadas de chuva torrencial (30 a 60 mm/h) e rajadas de vento entre 60 e 100 km/h em ${cityName}.`,
      recomendacoes_defesa_civil: "Evite abrigar-se debaixo de árvores. Não estacione veículos próximos a torres de transmissão e placas de propaganda. Desligue aparelhos elétricos e quadro geral em caso de inundação."
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/alertas_meteorologicos_emergencia`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(weatherAlert)
    });

    return new Response(JSON.stringify({
      success: true,
      alert: weatherAlert,
      status_code: insertRes.status,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
