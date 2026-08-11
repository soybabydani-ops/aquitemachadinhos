import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface ExpiredDomainCandidate {
  dominio: string;
  palavraChave: string;
  categoria: string;
  status: string;
  potencialTrafego: string;
}

const CANDIDATE_DOMAINS_MONITOR: ExpiredDomainCandidate[] = [
  { dominio: "passagensbarretos2026.com.br", palavraChave: "barretos", categoria: "Festa do Peão", status: "disponivel", potencialTrafego: "muito alto" },
  { dominio: "pousadascampinas.com.br", palavraChave: "campinas", categoria: "Hospedagem", status: "processo_liberacao", potencialTrafego: "alto" },
  { dominio: "guiaviagemsantos.com.br", palavraChave: "santos", categoria: "Litoral SP", status: "disponivel", potencialTrafego: "alto" },
  { dominio: "rodoviariapaulista.com.br", palavraChave: "sao-paulo", categoria: "Transporte SP", status: "processo_liberacao", potencialTrafego: "muito alto" },
  { dominio: "turismoserragaucha.com.br", palavraChave: "gramado", categoria: "Turismo Serra", status: "disponivel", potencialTrafego: "alto" }
];

serve(async () => {
  try {
    const loggedDomains = [];

    if (SUPABASE_SERVICE_ROLE_KEY) {
      for (const item of CANDIDATE_DOMAINS_MONITOR) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/dominios_expirados_radar`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=ignore-duplicates"
          },
          body: JSON.stringify({
            dominio: item.dominio,
            palavra_chave: item.palavraChave,
            categoria: item.categoria,
            status_liberacao: item.status,
            potencial_trafego: item.potencialTrafego,
            detectado_em: new Date().toISOString()
          })
        });

        loggedDomains.push({ dominio: item.dominio, status: res.ok });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      monitoredCount: CANDIDATE_DOMAINS_MONITOR.length,
      loggedDomains
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
