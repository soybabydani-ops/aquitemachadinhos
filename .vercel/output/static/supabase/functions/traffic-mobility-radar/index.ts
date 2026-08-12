import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

interface TrafficIncident {
  rodovia_slug: string;
  rodovia_nome: string;
  trecho: string;
  sentido: string;
  km_ponto: string;
  tipo_evento: "Acidente Grave" | "Paralisação Total" | "Lentidão Extrema" | "Ponto de Alagamento" | "Obras na Pista";
  situacao_atual: string;
  tempo_espera_estimado: string;
  rota_alternativa: string;
  concessionaria: string;
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
    const rodovia = url.searchParams.get("rodovia") || "rodovia-presidente-dutra";

    // Simulação e rastreio de feeds de trânsito em tempo real
    const sampleIncident: TrafficIncident = {
      rodovia_slug: rodovia,
      rodovia_nome: rodovia.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      trecho: "Trecho Metropolitano / Acesso Marginal",
      sentido: "Capital / Interior",
      km_ponto: "KM 220",
      tipo_evento: "Lentidão Extrema",
      situacao_atual: `Alerta de retenção pesada detectado pelo radar AQUITEM. Tráfego lento com pontos de parada.`,
      tempo_espera_estimado: "+50 min",
      rota_alternativa: "Desvio recomendado via vias arteriais secundárias ou transporte alternativo",
      concessionaria: "CCR / ARTESP / CET-SP"
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/radar_transito_rodovias`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(sampleIncident)
    });

    return new Response(JSON.stringify({
      success: true,
      incident: sampleIncident,
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
