import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MP_TOKEN = Deno.env.get("MP_ACCESS_TOKEN") || "";

const PLANOS: Record<string, { titulo: string; valor: number }> = {
  "store:destaque": { titulo: "Plano Destaque — Lojista (Aqui Tem Achadinhos)", valor: 79 },
  "store:pro": { titulo: "Plano Pro — Lojista (Aqui Tem Achadinhos)", valor: 149 },
  "driver:destaque": { titulo: "Plano Destaque — Motorista (Aqui Tem Achadinhos)", valor: 49 },
  "driver:pro": { titulo: "Plano Pro — Motorista (Aqui Tem Achadinhos)", valor: 99 },
  "listing:destaque": { titulo: "Impulsionar Anúncio — Destaque (Aqui Tem Achadinhos)", valor: 19.90 },
};

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const out = (o: unknown, s = 200) =>
    new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json", ...cors } });

  try {
    const { entity, id, plan, email } = await req.json();
    const p = PLANOS[`${entity}:${plan}`];
    if (!p || !id || !email) {
      return out({ error: "parâmetros inválidos (entity, id, plan, email)" }, 400);
    }
    const external_reference = `${entity}:${id}:${plan}`;

    const r = await fetch("https://api.mercadopago.com/preapproval", {
      method: "POST",
      headers: { Authorization: `Bearer ${MP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        reason: p.titulo,
        external_reference,
        payer_email: email,
        auto_recurring: { frequency: 1, frequency_type: "months", transaction_amount: p.valor, currency_id: "BRL" },
        back_url: "https://aquitemachadinhos.com.br/obrigado.html",
      }),
    });
    const data = await r.json();
    if (!data.init_point) return out({ error: data.message || "erro ao criar assinatura", detail: data }, 400);
    return out({ init_point: data.init_point });
  } catch (e) {
    return out({ error: String(e) }, 500);
  }
});
