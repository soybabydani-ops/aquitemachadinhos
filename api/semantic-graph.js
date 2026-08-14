import { NextResponse } from 'next/server';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type": "Organization", "name": "Aqui Tem Achadinhos", "url": "https://www.aquitemachadinhos.com.br", "sameAs": ["https://nordvpn.com", "https://unice.com", "https://24-7pressrelease.com"]},
      {"@type": "WebSite", "name": "Aqui Tem Achadinhos", "url": "https://www.aquitemachadinhos.com.br"},
      {"@type": "CollectionPage", "name": `Conteúdo para ${tenant}`, "url": `https://www.aquitemachadinhos.com.br/${tenant}-home.html`, "hasPart": [{"@type": "WebPage", "name": "Vagas e Viagens", "url": "/vagas-e-viagens"}, {"@type": "WebPage", "name": "Cupons Ativos", "url": "/cupons-ativos"}, {"@type": "WebPage", "name": "Luxo VIP", "url": "/luxo-vip"}]}
    ]
  };
  return new NextResponse(JSON.stringify(graph), {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=2592000'
    }
  });
}
