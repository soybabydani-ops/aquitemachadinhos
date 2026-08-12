// AQUITEM NOTIFY TELEGRAM EDGE FUNCTION (Deno Native Runtime)

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") || "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") || "";

Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const record = payload.record || payload;

    const cidade = record.cidade_destino || record.cidade_local || "São Paulo";
    const plataforma = record.plataforma_afiliado || record.tipo_transporte || "Afiliado";
    const rota = record.rota || "/oferta";
    const moeda = record.moeda || "BRL";
    const comissao = record.comissao_estimada_usd_brl ? `${record.comissao_estimada_usd_brl} ${moeda}` : "R$ 25,00";

    let msg = "";
    const platLower = (plataforma || "").toLowerCase();

    if (payload.action === "test" || record.action === "test") {
      msg = `🚀 <b>[AQUITEM BOT TEST]</b> Protocolo de Sincronização de Notificações ao Vivo no Telegram ATIVADO com sucesso! Comunicação 100% operacional.`;
    } else if (platLower.includes("expedia") || platLower.includes("discover") || platLower.includes("luxo") || platLower.includes("hedge")) {
      msg = `🔵 <b>ALERTA VIP (Viagens / High-Ticket)</b>\n✈️ Logística Acionada! Clique em andamento para reserva de hotel/voo/veículo na <b>${plataforma}</b> vindo do acesso de <b>${cidade}</b>.\n💰 Potencial de comissão bruta ativado! (${comissao})\n🔗 Rota: ${rota}`;
    } else if (platLower.includes("hotmart") || platLower.includes("monetizze") || platLower.includes("kiwify") || platLower.includes("udemy") || platLower.includes("clickbank")) {
      msg = `🟡 <b>ALERTA DE INFOPRODUTO</b>\n📚 Educação/Finanças! Clique registrado no link da <b>${plataforma}</b> focado em curso/treinamento na rota ${rota}.\n💰 Comissão estimada: ${comissao}`;
    } else if (platLower.includes("adsterra") || platLower.includes("propeller") || platLower.includes("anuncio")) {
      msg = `💵 <b>ALERTA DE ANÚNCIO (Dólar)</b>\n⚡ Impressão Confirmada! Tráfego orgânico via IndexNow ativou os blocos do <b>${plataforma}</b>.\n📈 Saldo em dólares movimentado no painel!`;
    } else {
      msg = `🟢 <b>ALERTA DE CLIQUE (E-commerce)</b>\n🛍️ Achadinho Acionado! Um usuário da cidade de <b>${cidade}</b> acabou de clicar no botão de desconto da <b>${plataforma}</b>.\n📦 Rota: ${rota}\n💰 Comissão prevista: ${comissao}`;
    }

    let telegramSent = false;
    let tgStatus = 0;
    let tgResponseText = "";
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: msg,
            parse_mode: "HTML"
          })
        });
        tgStatus = tgRes.status;
        telegramSent = tgRes.ok;
        tgResponseText = await tgRes.text();
      } catch (tgErr: any) {
        tgResponseText = tgErr.message;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      telegram_sent: telegramSent,
      telegram_status: tgStatus,
      telegram_response: tgResponseText,
      message_preview: msg,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders, status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { headers: corsHeaders, status: 500 });
  }
});
