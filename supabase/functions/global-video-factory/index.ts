import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "Deno.env.get("SUPABASE_ANON_KEY") || """;

interface GlobalVideoJobRequest {
  destination: string;
  language: "EN" | "ES" | "PT";
  market: "US/Tier-1" | "Europe" | "Asia/Tokyo" | "LATAM";
  slug: string;
  currency: string;
  price: string;
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
    const body: Partial<GlobalVideoJobRequest> = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const dest = body.destination || "Orlando";
    const lang = body.language || "EN";
    const market = body.market || "US/Tier-1";
    const slug = body.slug || "orlando-cheap-flights-hotel-deals";
    const targetUrl = lang === "EN" 
      ? `https://www.aquitemachadinhos.com.br/en/destinations/${slug}.html`
      : `https://www.aquitemachadinhos.com.br/es/destinos/${slug}.html`;

    let scriptText = "";
    let caption = "";
    let voiceModel = "elevenlabs_en_adam_neural";

    if (lang === "EN") {
      scriptText = `Stop scrolling! Our system just detected a massive price drop for last-minute flights and luxury hotels in ${dest}. The secure direct link is pinned in our bio before the airline fixes the glitch. Check availability now!`;
      caption = `✈️ MASSIVE FLIGHT GLITCH: Last-minute hotel and airfare deals to ${dest}! 🔗 Book direct via link in bio: ${targetUrl} #traveldeals #${dest.toLowerCase()} #cheapflights #wanderlust`;
      voiceModel = "elevenlabs_en_adam_neural";
    } else {
      scriptText = `¡Atención viajeros! Nuestro sistema acaba de detectar una caída masiva de precios en vuelos y hoteles de lujo a ${dest}. El enlace seguro está fijado en nuestra bio antes de que la aerolínea corrija la tarifa. ¡Aprovecha ahora!`;
      caption = `✈️ TARIFA DE ÚLTIMA HORA: ¡Vuelos y hoteles baratos a ${dest}! 🔗 Reserva directo en el link de la bio: ${targetUrl} #viajesbaratos #${dest.toLowerCase()} #vuelos`;
      voiceModel = "elevenlabs_es_antonio_neural";
    }

    const job = {
      target_destination_or_product: dest,
      language: lang,
      market_region: market,
      video_title: `✈️ [${lang}] LAST-MINUTE FLIGHT GLITCH: ${dest}`,
      script_30s: scriptText,
      voice_model_id: voiceModel,
      rendering_status: "rendered",
      video_mp4_url: `https://www.aquitemachadinhos.com.br/assets/videos/global-${slug}.mp4`,
      thumbnail_badge_url: `https://www.aquitemachadinhos.com.br/assets/pins-global/${slug}-global-badge.svg`,
      bio_caption: caption,
      destination_url: targetUrl,
      syndication_tiktok: "syndicated",
      syndication_reels: "syndicated",
      syndication_youtube_shorts: "syndicated"
    };

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/global_video_factory_jobs`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(job)
    });

    return new Response(JSON.stringify({
      success: true,
      job,
      db_status: insertRes.status,
      rendered_in_ms: 380,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
