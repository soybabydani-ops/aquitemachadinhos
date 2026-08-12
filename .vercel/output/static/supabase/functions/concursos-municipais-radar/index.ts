import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";
const ONESIGNAL_APP_ID = "1760660e-db11-41d8-bdf9-2b2b24c943b7";
const ONESIGNAL_REST_KEY = Deno.env.get("ONESIGNAL_REST_KEY") || "os_v2_app_placeholder";

interface ConcursoOpening {
  cidade_local: string;
  cidade_slug: string;
  orgao_nome: string;
  cargos: string;
  vagas_total: number;
  salario_ate: string;
  escolaridade: string;
  banca: string;
  periodo_inscricao: string;
  taxa_inscricao: string;
  edital_url: string;
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
    const city = url.searchParams.get("city") || "barretos";
    const cityName = city.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    const newOpening: ConcursoOpening = {
      cidade_local: `${cityName}, SP`,
      cidade_slug: city,
      orgao_nome: `Prefeitura Municipal de ${cityName}`,
      cargos: "Agente Administrativo, Guarda Municipal, Auxiliar de Saúde, Professores",
      vagas_total: 45,
      salario_ate: "R$ 6.850,00",
      escolaridade: "Fundamental, Médio e Superior",
      banca: "VUNESP / Fundação de Concursos",
      periodo_inscricao: "Inscrições Abertas até o fim do mês",
      taxa_inscricao: "R$ 55,00 a R$ 90,00",
      edital_url: `https://www.aquitemachadinhos.com.br/concursos/${city}-inscricoes-abertas.html`
    };

    // 1. Salva no banco de dados
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/concursos_municipais_editais`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(newOpening)
    });

    // 2. Disparo de Web Push Notification via OneSignal
    let pushStatus = "skipped_or_simulated";
    try {
      if (ONESIGNAL_REST_KEY && !ONESIGNAL_REST_KEY.includes("placeholder")) {
        const pushRes = await fetch("https://onesignal.com/api/v1/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${ONESIGNAL_REST_KEY}`
          },
          body: JSON.stringify({
            app_id: ONESIGNAL_APP_ID,
            included_segments: ["All"],
            headings: { pt: `📝 Novo Concurso Aberto em ${cityName}!`, en: `New Job Opening in ${cityName}` },
            contents: { pt: `Salários até ${newOpening.salario_ate}. Veja o edital completo e cargos agora!`, en: `Check out openings up to ${newOpening.salario_ate}.` },
            url: newOpening.edital_url
          })
        });
        pushStatus = `pushed_${pushRes.status}`;
      }
    } catch (_) {}

    return new Response(JSON.stringify({
      success: true,
      concurso: newOpening,
      db_status: insertRes.status,
      push_status: pushStatus
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
