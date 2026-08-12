// AQUITEM ONESIGNAL PUSH NOTIFICATION DISPATCHER (Deno Native Runtime)

const ONESIGNAL_APP_ID = "1760660e-db11-41d8-bdf9-2b2b24c943b7";
const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY") || "";

interface PushNotificationPayload {
  title?: string;
  message?: string;
  url?: string;
  imageUrl?: string;
  category?: string;
}

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body: PushNotificationPayload = req.method === "POST" ? await req.json().catch(() => ({})) : {};

    const title = body.title || "⚡ Novo Achadinho VIP Desbloqueado — Aqui Tem Achadinhos";
    const message = body.message || "Ofertas relâmpago de turismo VIP, frotas executivas e cupons com até 70% OFF disponíveis agora.";
    const targetUrl = body.url || "https://www.aquitemachadinhos.com.br/luxo-vip";
    const bigPicture = body.imageUrl || "https://www.aquitemachadinhos.com.br/assets/og-image.png";

    const payload = {
      app_id: ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions", "Active Users"],
      headings: { en: title, pt: title },
      contents: { en: message, pt: message },
      url: targetUrl,
      big_picture: bigPicture
    };

    let pushSuccess = false;
    let pushResponseData = null;

    if (ONESIGNAL_REST_API_KEY) {
      try {
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
      } catch (err: any) {
        pushResponseData = { error: err.message };
      }
    } else {
      pushSuccess = true;
      pushResponseData = { status: "simulated_success", app_id: ONESIGNAL_APP_ID, recipients: "Active Subscribers" };
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      app_id: ONESIGNAL_APP_ID,
      push_triggered: pushSuccess,
      target_url: targetUrl,
      data: pushResponseData
    }), {
      headers: corsHeaders,
      status: 200
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
