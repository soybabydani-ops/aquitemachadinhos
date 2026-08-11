import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface TravelCoupon {
  empresa: string;
  codigo: string;
  desconto: string;
  categoria: string; // 'Aereo' | 'Rodoviario' | 'Hotel'
  descricao: string;
  urlAfiliado: string;
  expiraEm: string;
}

const ACTIVE_TRAVEL_COUPONS: TravelCoupon[] = [
  {
    empresa: "Buser Brasil",
    codigo: "AQUITEM-BUSER80",
    desconto: "80% OFF Primeira Viagem",
    categoria: "Rodoviario",
    descricao: "Cupom oficial de desconto para viagens de ônibus executivo em São Paulo e rotas nacionais.",
    urlAfiliado: "https://www.clickbus.com.br/?ref=aquitem_nacional&utm_source=buser_coupon",
    expiraEm: new Date(Date.now() + 7 * 86400000).toISOString()
  },
  {
    empresa: "FlixBus",
    codigo: "FLIX-BARRETOS2026",
    desconto: "30% OFF Festa do Peão",
    categoria: "Rodoviario",
    descricao: "Desconto especial para passagens rodoviárias com destino a Barretos e interior paulista.",
    urlAfiliado: "https://www.clickbus.com.br/?ref=aquitem_nacional&utm_source=flixbus_coupon",
    expiraEm: new Date(Date.now() + 14 * 86400000).toISOString()
  },
  {
    empresa: "Decolar / Latam / Gol",
    codigo: "AIR-RESIDUAL2026",
    desconto: "R$ 150 OFF Voos Nacionais",
    categoria: "Aereo",
    descricao: "Tarifas residuais de última hora em voos saindo de Guarulhos (GRU) e Congonhas (CGH).",
    urlAfiliado: "https://www.decolar.com/passagens-aereas/?ref=aquitem_nacional&utm_source=air_coupon",
    expiraEm: new Date(Date.now() + 5 * 86400000).toISOString()
  },
  {
    empresa: "Booking.com",
    codigo: "BOOKING-AQUITEM15",
    desconto: "15% OFF Hotéis & Pousadas",
    categoria: "Hotel",
    descricao: "Desconto direto em hospedagens e chalés parceiros nas 60 cidades do ecossistema.",
    urlAfiliado: "https://www.booking.com/index.html?aid=aquitem_nacional&utm_source=hotel_coupon",
    expiraEm: new Date(Date.now() + 30 * 86400000).toISOString()
  }
];

serve(async () => {
  try {
    const syncResults = [];

    // Atualiza links na tabela monetizacao_urgente
    for (const coupon of ACTIVE_TRAVEL_COUPONS) {
      if (SUPABASE_SERVICE_ROLE_KEY) {
        const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/monetizacao_urgente?categoria=eq.${coupon.categoria}`, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          },
          body: JSON.stringify({
            url_afiliado_padrao: coupon.urlAfiliado,
            atualizado_em: new Date().toISOString()
          })
        });

        syncResults.push({
          empresa: coupon.empresa,
          codigo: coupon.codigo,
          categoria: coupon.categoria,
          synced: updateRes.ok
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      activeCouponsCount: ACTIVE_TRAVEL_COUPONS.length,
      coupons: ACTIVE_TRAVEL_COUPONS,
      syncResults
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
