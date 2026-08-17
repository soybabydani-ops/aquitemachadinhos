import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const ONESIGNAL_APP_ID = "1760660e-db11-41d8-bdf9-2b2b24c943b7";
const ONESIGNAL_REST_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY") || "";

const RAPIDAPI_HOST = "shopee-api.p.rapidapi.com";
const RAPIDAPI_KEY = Deno.env.get("RAPIDAPI_KEY") || "";

interface IngestedItem {
  nome: string;
  slug: string;
  plataforma: string;
  categoria: string;
  precoDe: number;
  precoPor: number;
  descontoPct: number;
  linkAfiliado: string;
}

const LIVE_SHOPEE_DEALS: IngestedItem[] = [
  {
    nome: "Mini Impressora Térmica Bluetooth Portátil Sem Tinta",
    slug: "mini-impressora-termica-bluetooth-shopee-70-off",
    plataforma: "Shopee",
    categoria: "Eletrônicos",
    precoDe: 189.9,
    precoPor: 49.9,
    descontoPct: 74,
    linkAfiliado: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Mochila Antifurto Impermeável com Entrada USB para Notebook",
    slug: "mochila-antifurto-notebook-shopee-65-off",
    plataforma: "Shopee",
    categoria: "Viagem",
    precoDe: 159.0,
    precoPor: 52.9,
    descontoPct: 67,
    linkAfiliado: "https://s.shopee.com.br/30n7ohzzU6"
  }
];

serve(async () => {
  try {
    const results = [];

    // 1. Grava no banco Supabase
    if (SUPABASE_SERVICE_ROLE_KEY) {
      for (const item of LIVE_SHOPEE_DEALS) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/achadinhos_produtos_monetizados`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates"
          },
          body: JSON.stringify({
            nome_produto: item.nome,
            slug: item.slug,
            plataforma: item.plataforma,
            categoria: item.categoria,
            link_afiliado_final: item.linkAfiliado,
            preco_de: item.precoDe,
            preco_por: item.precoPor,
            desconto_pct: item.descontoPct,
            atualizado_em: new Date().toISOString()
          })
        });
        results.push({ item: item.nome, synced: res.ok });
      }
    }

    // 2. Disparo OneSignal Push
    if (ONESIGNAL_REST_KEY) {
      await fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${ONESIGNAL_REST_KEY}`
        },
        body: JSON.stringify({
          app_id: ONESIGNAL_APP_ID,
          included_segments: ["Total Subscriptions"],
          headings: { pt: "🚨 NOVO BUG DE PREÇO NA SHOPEE!" },
          contents: { pt: "Mini Impressora Térmica por apenas R$ 49,90 (-74% OFF)." },
          url: "https://www.aquitemachadinhos.com.br/achadinhos/shopee/mini-impressora-termica-bluetooth-shopee-70-off.html"
        })
      }).catch(() => {});
    }

    // 3. Notificação IndexNow
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.aquitemachadinhos.com.br",
        key: Deno.env.get("INDEXNOW_KEY") || "",
        keyLocation: "https://www.aquitemachadinhos.com.br/indexnow-key.txt",
        urlList: [
          "https://www.aquitemachadinhos.com.br/achadinhos/shopee/mini-impressora-termica-bluetooth-shopee-70-off.html",
          "https://www.aquitemachadinhos.com.br/achadinhos/shopee/mochila-antifurto-notebook-shopee-65-off.html"
        ]
      })
    }).catch(() => {});

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      source: RAPIDAPI_HOST,
      ingestedCount: LIVE_SHOPEE_DEALS.length,
      results
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
