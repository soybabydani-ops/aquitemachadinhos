import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';

  // Unified @graph JSON-LD (high authority)
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Aqui Tem Achadinhos",
        "url": "https://www.aquitemachadinhos.com.br",
        "sameAs": [
          "https://nordvpn.com",
          "https://unice.com",
          "https://24-7pressrelease.com"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Aqui Tem Achadinhos",
        "url": "https://www.aquitemachadinhos.com.br",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.aquitemachadinhos.com.br/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "CollectionPage",
        "name": `Content for ${tenant}`,
        "url": `https://www.aquitemachadinhos.com.br/${tenant}-home.html`,
        "hasPart": [
          { "@type": "WebPage", "name": "Vagas e Viagens", "url": "/vagas-e-viagens" },
          { "@type": "WebPage", "name": "Cupons Ativos", "url": "/cupons-ativos" },
          { "@type": "WebPage", "name": "Luxo VIP", "url": "/luxo-vip" }
        ]
      }
    ]
  };

  const body = JSON.stringify(graph);

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=2592000'
    }
  });
}
