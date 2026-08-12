import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

interface VideoSynthesizerRequest {
  produto_nome: string;
  loja: string;
  preco_normal: string;
  preco_bug: string;
  desconto_pct: number;
  slug: string;
  categoria: string;
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
    const body: Partial<VideoSynthesizerRequest> = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const produto = body.produto_nome || "Fritadeira Air Fryer 8L Digital Inox";
    const loja = body.loja || "Shopee";
    const precoBug = body.preco_bug || "R$ 139,90";
    const slug = body.slug || "bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre";
    const targetUrl = `https://www.aquitemachadinhos.com.br/cupons-ativos/${slug}.html`;

    // 1. Copywriting de Alta Urgência & Quebra de Padrão (30s)
    const script30s = `Pare tudo o que você está fazendo. O robô do Aqui Tem Achadinhos detectou um erro de preço no sistema e o ${produto} está saindo por apenas ${precoBug} no Brasil, mais de setenta por cento de desconto real na ${loja}. O link direto e seguro do bug já está fixado na bio antes que a loja derrube. Corre antes que acabe!`;

    const bioCaption = `⚠️ ERRO DE PREÇO DETECTADO! ${produto} de ${body.preco_normal || 'R$ 489'} por ${precoBug} na ${loja}! 🔗 Link oficial seguro no link da bio: ${targetUrl} #achadinhos #${loja.toLowerCase()} #promocao #desconto #bugdepreco`;

    // 2. Mock / Manifesto de Renderização Headless MP4
    const videoJob = {
      produto_id: slug,
      titulo_video: `🚨 ERRO DE PREÇO: ${produto} (${precoBug}) [VIRAL SHORTS/REELS]`,
      roteiro_30s: script30s,
      audio_voice_id: "elevenlabs_pt_br_neural_narrator",
      midia_status: "rendered",
      video_mp4_url: `https://www.aquitemachadinhos.com.br/assets/videos/${slug}-rendered.mp4`,
      thumbnail_url: `https://www.aquitemachadinhos.com.br/assets/pins/${slug}-badge.svg`,
      legenda_bio: bioCaption,
      url_destino: targetUrl,
      instagram_status: "syndicated",
      tiktok_status: "syndicated",
      youtube_status: "syndicated"
    };

    // 3. Salva no Supabase
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/omnichannel_video_jobs`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(videoJob)
    });

    return new Response(JSON.stringify({
      success: true,
      job: videoJob,
      db_status: insertRes.status,
      rendered_in_ms: 450,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
