import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "Deno.env.get("SUPABASE_ANON_KEY") || """;

interface ShortsScript {
  tipo_alerta: "Bug_Produto" | "Alerta_Viagem" | "Barretos" | "Concurso" | "Clima";
  titulo_video: string;
  texto_roteiro: string;
  primeiro_comentario_fixado: string;
  url_destino_site: string;
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
    const tipo = (url.searchParams.get("tipo") || "Bug_Produto") as ShortsScript["tipo_alerta"];
    const produto = url.searchParams.get("produto") || "Air Fryer 8L Digital Inox";
    const loja = url.searchParams.get("loja") || "Shopee";
    const preco = url.searchParams.get("preco") || "R$ 139,90";
    const slug = url.searchParams.get("slug") || "bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre";

    let scriptText = "";
    let pinnedComment = "";
    let targetUrl = `https://www.aquitemachadinhos.com.br/cupons-ativos/${slug}.html`;

    if (tipo === "Bug_Produto") {
      scriptText = `Não compre nada na ${loja} hoje antes de ver isso. O robô do Aqui Tem Achadinhos rastreou uma brecha no sistema e ${produto} está saindo por apenas ${preco}, mais de setenta por cento de desconto real. O link oficial do bug seguro está no primeiro comentário fixado antes que o sistema derrube. Corre enquanto ainda tem estoque!`;
      pinnedComment = `🚨 LINK DO BUG LIBERADO: Pegue aqui o ${produto} por ${preco} antes que corrijam 👉 ${targetUrl}`;
    } else if (tipo === "Barretos") {
      targetUrl = `https://www.aquitemachadinhos.com.br/barretos-2026/biometria-facial-festa-do-peao-barretos.html`;
      scriptText = `⚠️ Alerta de Viagem urgente para Barretos: O lote de assentos residuais de passagens de ônibus saindo de São Paulo e vans bate-volta acabou de abrir no sistema oficial com tarifa promocional. Quem deixar para a última hora vai pagar o triplo. O link direto de reserva sem taxas está no comentário fixado.`;
      pinnedComment = `🤠 GUIA & PASSAGENS BARRETOS: Consulte horários de ônibus e cadastro de biometria aqui 👉 ${targetUrl}`;
    } else {
      targetUrl = `https://www.aquitemachadinhos.com.br/alerta-transito/rodovia-presidente-dutra-travada.html`;
      scriptText = `Atenção motoristas na Grande São Paulo: alerta de retenção pesada e acidente com bloqueio de pista. Tempo de espera estimado superior a cinquenta minutos. Consulte a rota alternativa liberada no link fixado nos comentários para desviar do trânsito agora.`;
      pinnedComment = `⚠️ DESVIO AO VIVO: Veja o mapa com rota alternativa aqui 👉 ${targetUrl}`;
    }

    const newShorts: ShortsScript = {
      tipo_alerta: tipo,
      titulo_video: `🚨 ERRO DE PREÇO: ${produto} na ${loja} [VÍDEO CURTO]`,
      texto_roteiro: scriptText,
      primeiro_comentario_fixado: pinnedComment,
      url_destino_site: targetUrl
    };

    // Salva no Supabase
    const insertRes1 = await fetch(`${SUPABASE_URL}/rest/v1/automacao_youtube_roteiros`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(newShorts)
    });

    const insertRes2 = await fetch(`${SUPABASE_URL}/rest/v1/automacao_videos_roteiros`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        produto_viagem_id: slug,
        tipo_midia: "Shorts_Reels_TikTok",
        texto_roteiro_curto: scriptText,
        audio_duracao_est: "30s",
        url_destino: targetUrl,
        status_sincronizado: true
      })
    });

    return new Response(JSON.stringify({
      success: true,
      roteiro: newShorts,
      db_status_yt: insertRes1.status,
      db_status_omni: insertRes2.status,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
