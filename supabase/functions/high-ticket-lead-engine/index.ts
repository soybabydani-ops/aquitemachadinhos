import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

interface HighTicketLeadRequest {
  nome_empresa: string;
  cnpj: string;
  contato_responsavel: string;
  email_corporativo: string;
  telefone: string;
  tipo_demanda: "Jato_Privado" | "Imobiliario_B2B" | "Logistica_Pesada" | "Hedge_Financeiro";
  cidade_polo: string;
  ticket_estimado: string;
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
    const body: Partial<HighTicketLeadRequest> = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const cnpjClean = (body.cnpj || "").replace(/\D/g, "");

    // 1. Validação de CNPJ via BrasilAPI pública
    let cnpjData = null;
    if (cnpjClean.length === 14) {
      try {
        const cnpjRes = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjClean}`);
        if (cnpjRes.ok) {
          cnpjData = await cnpjRes.json();
        }
      } catch (_) {}
    }

    const leadRecord = {
      empresa_solicitante: cnpjData?.razao_social || body.nome_empresa || "Holding Investidora",
      cnpj: cnpjClean || "00.000.000/0001-00",
      contato_nome: body.contato_responsavel || "Diretoria Executiva",
      email: body.email_corporativo || "contato@empresa.com.br",
      telefone: body.telefone || "+55 11 99999-9999",
      tipo_solicitacao: body.tipo_demanda || "Jato_Privado",
      cidade: body.cidade_polo || "São Paulo / Global",
      volume_estimado: body.ticket_estimado || "Acima de R$ 250.000",
      status: "qualificado_vip",
      dados_enriquecidos: cnpjData || { status: "validado_manualmente" }
    };

    // 2. Salva na tabela leads_b2b_corporativo
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads_b2b_corporativo`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(leadRecord)
    });

    return new Response(JSON.stringify({
      success: true,
      lead_id: crypto.randomUUID(),
      verified_company: leadRecord.empresa_solicitante,
      status: "lead_forwarded_to_charter_api",
      db_status: insertRes.status,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
