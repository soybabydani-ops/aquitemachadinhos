import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ONESIGNAL_APP_ID = "1760660e-db11-41d8-bdf9-2b2b24c943b7";
const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY") || "";

interface PushNotificationPayload {
  title: string;
  message: string;
  url: string;
  imageUrl?: string;
}

serve(async (req) => {
  try {
    const body: PushNotificationPayload = await req.json();

    const payload = {
      app_id: ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions", "Active Users"],
      headings: {
        en: body.title || "⚠️ Novo Bug de Tarifa Detectado no Aqui Tem Achadinhos!",
        pt: body.title || "⚠️ Novo Bug de Tarifa Detectado no Aqui Tem Achadinhos!"
      },
      contents: {
        en: body.message || "Assentos residuais liberados com até 82% de desconto. Clique para resgatar.",
        pt: body.message || "Assentos residuais liberados com até 82% de desconto. Clique para resgatar."
      },
      url: body.url || "https://www.aquitemachadinhos.com.br/viagens.html",
      big_picture: body.imageUrl || "https://www.aquitemachadinhos.com.br/assets/og-image.png"
    };

    let pushSuccess = false;
    let pushResponseData = null;

    if (ONESIGNAL_REST_API_KEY) {
      const res = await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${ONESIGNAL_REST_API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      pushSuccess = res.ok;
      pushResponseData = await res.json();
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      app_id: ONESIGNAL_APP_ID,
      pushTriggered: pushSuccess,
      data: pushResponseData || { status: "simulated_local" }
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
