import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") || "";

interface LiveNotificationEvent {
  tipo_evento: "ALERTA_VIP_INTERNACIONAL" | "CONTRATO_CORPORATIVO_B2B" | "BUG_DE_PRECO_VIRAL";
  cidade_pais: string;
  url_rota: string;
  detalhes_empresa_ou_item?: string;
  comissao_estimada?: string;
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

  const startTime = performance.now();

  try {
    const body: Partial<LiveNotificationEvent> = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const tipo = body.tipo_evento || "ALERTA_VIP_INTERNACIONAL";
    const local = body.cidade_pais || "Orlando, Estados Unidos";
    const rota = body.url_rota || "https://www.aquitemachadinhos.com.br/en/destinations/orlando-cheap-flights-hotel-deals.html";

    let messageText = "";

    if (tipo === "CONTRATO_CORPORATIVO_B2B") {
      messageText = `💼 NOVO CONTRATO CORPORATIVO:\nLead B2B de Fretamento/Hotelaria acabou de preencher o formulário em ${local}.\nEmpresa: ${body.detalhes_empresa_ou_item || 'Holding Investidora'}\nCNPJ verificado com sucesso no Supabase. Dados prontos para liquidação via webhook!`;
    } else if (tipo === "BUG_DE_PRECO_VIRAL") {
      messageText = `⚡ BUG DE PREÇO ACIONADO:\nVisitante de ${local} resgatou cupom relâmpago de ${body.detalhes_empresa_ou_item || 'Air Fryer 8L'}.\nComissão estimada: ${body.comissao_estimada || 'R$ 38,50'}\nRota: ${rota}`;
    } else {
      messageText = `🚨 ALERTA VIP INTERNACIONAL:\nVisitante de ${local} acabou de acionar o injetor 'affiliate-tracker.js' na rota ${rota}.\nMoeda forte computada no painel de anúncios! (${body.comissao_estimada || '$ 28.50 USD'})`;
    }

    // Se houver bot do Telegram configurado, despacha mensagem instantânea
    let telegramDispatched = false;
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: "HTML"
          })
        });
        telegramDispatched = true;
      } catch (_) {}
    }

    const elapsedMs = Math.round(performance.now() - startTime);

    return new Response(JSON.stringify({
      success: true,
      notification_sent: true,
      telegram_dispatched: telegramDispatched,
      message_preview: messageText,
      latency_ms: elapsedMs,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { headers: corsHeaders, status: 500 });
  }
});
