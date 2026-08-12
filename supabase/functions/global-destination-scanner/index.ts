import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

interface GlobalDestination {
  cidade_destino: string;
  pais: string;
  slug: string;
  idioma_pagina: "PT" | "EN" | "ES";
  sazonalidade: "Inverno" | "Verão" | "Ano_Todo";
  tarifa_media: string;
  descricao_turistica: string;
  hotel_recomendado: string;
  link_afiliado_global: string;
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
    const destination = url.searchParams.get("city") || "orlando";

    const sampleDestination: GlobalDestination = {
      cidade_destino: destination.charAt(0).toUpperCase() + destination.slice(1),
      pais: "Internacional / Global",
      slug: destination.toLowerCase().replace(/ /g, "-"),
      idioma_pagina: "PT",
      sazonalidade: "Ano_Todo",
      tarifa_media: "A partir de R$ 1.250 / USD 240",
      descricao_turistica: `Radar de tarifas ocultas e bugs de emissão de passagens aéreas e hotéis com desconto para ${destination}.`,
      hotel_recomendado: `Resorts e hotéis centrais credenciados com café da manhã incluso.`,
      link_afiliado_global: "https://meli.la/1U3rtgV"
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/global_destinos_turisticos`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(sampleDestination)
    });

    return new Response(JSON.stringify({
      success: true,
      destination: sampleDestination,
      status: insertRes.status,
      scanned_at: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
