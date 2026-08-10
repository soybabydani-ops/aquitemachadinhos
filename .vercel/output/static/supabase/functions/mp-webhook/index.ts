// ============================================================
// AQUI TEM ACHADINHOS — Função: mp-webhook
// Recebe os eventos do Mercado Pago e LIGA/DESLIGA o plano no site.
// Eventos tratados: assinatura autorizada (ativa) | pausada/cancelada | pagamento rejeitado/estornado (desativa).
// Deploy: supabase functions deploy mp-webhook --no-verify-jwt
// Secrets: MP_ACCESS_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Configure a URL desta função no painel do Mercado Pago (Webhooks/Notificações).
// ============================================================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";
const SUPA_URL = Deno.env.get("SUPABASE_URL") || "";
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

async function mp(path: string) {
  const r = await fetch(`https://api.mercadopago.com${path}`, { headers: { Authorization: `Bearer ${MP_TOKEN}` } });
  return r.json();
}

async function aplicar(ext: string | undefined, ativo: boolean) {
  if (!ext) return;
  const [entity, id, plan] = ext.split(":");
  if (!id) return;
  const supa = createClient(SUPA_URL, SERVICE, { auth: { persistSession: false } });
  const table = entity === "driver" ? "drivers" : (entity === "listing" ? "listings" : "stores");
  if (ativo) await supa.from(table).update({ plano: plan || "destaque", destaque: true }).eq("id", id);
  else await supa.from(table).update({ plano: "gratis", destaque: false }).eq("id", id);
}

Deno.serve(async (req: Request) => {
  try {
    const body = await req.json();
    const type = body.type || body.topic;
    const id = body?.data?.id || body?.id;

    if (type === "subscription_preapproval") {
      // estado da assinatura: authorized | paused | cancelled | pending
      const pa = await mp(`/preapproval/${id}`);
      await aplicar(pa.external_reference, pa.status === "authorized");
    } else if (type === "subscription_authorized_payment") {
      // cada cobrança mensal: approved | pending | rejected | cancelled
      const ap = await mp(`/authorized_payment/${id}`);
      const ext = ap?.preapproval?.external_reference;
      const ok = ap.status === "approved";
      await aplicar(ext, ok);
    } else if (type === "payment") {
      const pay = await mp(`/v1/payments/${id}`);
      const ext = pay?.external_reference;
      const ok = pay?.status === "approved";
      await aplicar(ext, ok);
    }
    // Sempre retorna 200 para o Mercado Pago (evita reenvio infinito)
    return new Response("ok", { status: 200 });
  } catch (_e) {
    return new Response("ok", { status: 200 });
  }
});
