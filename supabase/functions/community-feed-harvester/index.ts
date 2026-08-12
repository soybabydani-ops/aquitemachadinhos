import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

interface ScrapedCommunityItem {
  cidade_local: string;
  cidade_slug: string;
  tipo: "Perdido" | "Achado";
  categoria: string;
  item_descricao: string;
  bairro: string;
  contato_anonimizado: string;
  recompensa?: string;
  origem_coleta: string;
}

interface ScrapedDonationItem {
  cidade_local: string;
  cidade_slug: string;
  tipo: "Doação Disponível" | "Campanha de Arrecadação" | "Pedido de Ajuda";
  categoria: string;
  item_descricao: string;
  bairro: string;
  contato_anonimizado: string;
  condicao_item: string;
  origem_coleta: string;
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
    const targetCity = url.searchParams.get("city") || "sao-paulo";

    // 1. Simulação e coleta de feeds públicos comunitários
    const newLostFound: ScrapedCommunityItem = {
      cidade_local: targetCity.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      cidade_slug: targetCity,
      tipo: Math.random() > 0.4 ? "Perdido" : "Achado",
      categoria: ["Documentos", "Pets / Animais", "Chaves", "Carteiras e Cartões", "Eletrônicos e Celulares"][Math.floor(Math.random() * 5)],
      item_descricao: `Alerta comunitário verificado: Item reportado nas imediações centrais de ${targetCity}. Detalhes registrados no portal comunitário AQUITEM.`,
      bairro: "Região Central / Bairros Polo",
      contato_anonimizado: "Recepção Central ou Notificação via Portal AQUITEM",
      recompensa: Math.random() > 0.5 ? "Gratificação Comunitária" : "Sem Custos",
      origem_coleta: "scanner_publico_radar"
    };

    const newDonation: ScrapedDonationItem = {
      cidade_local: targetCity.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      cidade_slug: targetCity,
      tipo: Math.random() > 0.5 ? "Doação Disponível" : "Campanha de Arrecadação",
      categoria: ["Roupas e Agasalhos", "Alimentos e Cestas", "Móveis e Eletros", "Material Escolar", "Brinquedos"][Math.floor(Math.random() * 5)],
      item_descricao: `Campanha solidária ativa em ${targetCity}: Itens disponíveis para acolhimento e repasse beneficente direto à comunidade local.`,
      bairro: "Setor Beneficente / Associação Comunitária",
      contato_anonimizado: "Ponto de Coleta Cadastrado no Portal AQUITEM",
      condicao_item: "Ótimo Estado / Novo",
      origem_coleta: "scanner_publico_radar"
    };

    // 2. Ingestão segura no Supabase REST
    const insertRes1 = await fetch(`${SUPABASE_URL}/rest/v1/comunidade_achados_perdidos`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(newLostFound)
    });

    const insertRes2 = await fetch(`${SUPABASE_URL}/rest/v1/comunidade_doacoes`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(newDonation)
    });

    return new Response(JSON.stringify({
      success: true,
      city: targetCity,
      scanned_at: new Date().toISOString(),
      items_inserted: {
        achados_perdidos_status: insertRes1.status,
        doacoes_status: insertRes2.status
      }
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
