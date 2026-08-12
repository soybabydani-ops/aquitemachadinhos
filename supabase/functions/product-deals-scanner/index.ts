import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "https://efvuzxdhsirpvxclgdfg.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

interface TrendingProduct {
  nome: string;
  slug: string;
  plataforma: string;
  categoria: string;
  precoDe: number;
  precoPor: number;
  descontoPct: number;
  linkAfiliado: string;
}

const DEALS_RADAR: TrendingProduct[] = [
  {
    nome: "Fone de Ouvido Bluetooth Sem Fio TWS com Cancelamento de Ruído",
    slug: "fone-bluetooth-tws-shopee-75-off",
    plataforma: "Shopee",
    categoria: "Eletrônicos",
    precoDe: 149.9,
    precoPor: 39.9,
    descontoPct: 73,
    linkAfiliado: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Kit 3 Vestidos Femininos Casuais Tendência Verão Shein",
    slug: "kit-vestidos-femininos-shein-80-off",
    plataforma: "SHEIN",
    categoria: "Moda",
    precoDe: 219.0,
    precoPor: 49.9,
    descontoPct: 77,
    linkAfiliado: "https://onelink.shein.com/47/5ylqchgphidl"
  },
  {
    nome: "Mala de Bordo Rígida Padrão ANAC em ABS com Rodas 360",
    slug: "mala-bordo-anac-amazon-50-off",
    plataforma: "Amazon",
    categoria: "Viagem",
    precoDe: 389.0,
    precoPor: 179.0,
    descontoPct: 54,
    linkAfiliado: "https://link.amazon/B0hmLsxcH"
  }
];

serve(async () => {
  try {
    const syncResults = [];

    if (SUPABASE_SERVICE_ROLE_KEY) {
      for (const p of DEALS_RADAR) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/achadinhos_produtos_monetizados`, {
          method: "POST",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates"
          },
          body: JSON.stringify({
            nome_produto: p.nome,
            slug: p.slug,
            plataforma: p.plataforma,
            categoria: p.categoria,
            link_afiliado_final: p.linkAfiliado,
            preco_de: p.precoDe,
            preco_por: p.precoPor,
            desconto_pct: p.descontoPct,
            atualizado_em: new Date().toISOString()
          })
        });

        syncResults.push({ produto: p.nome, synced: res.ok });
      }
    }

    // Ping IndexNow
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.aquitemachadinhos.com.br",
        key: "aquitem2026indexnowkey",
        keyLocation: "https://www.aquitemachadinhos.com.br/aquitem2026indexnowkey.txt",
        urlList: [
          "https://www.aquitemachadinhos.com.br/achadinhos/shopee/fone-bluetooth-tws-shopee-75-off.html",
          "https://www.aquitemachadinhos.com.br/achadinhos/shein/kit-vestidos-femininos-shein-80-off.html",
          "https://www.aquitemachadinhos.com.br/achadinhos/amazon/mala-bordo-anac-amazon-50-off.html"
        ]
      })
    }).catch(() => {});

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      productsCount: DEALS_RADAR.length,
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
