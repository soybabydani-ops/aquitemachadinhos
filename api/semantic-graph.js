import { NextResponse } from 'next/server';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Aqui Tem Achadinhos",
        "url": "https://www.aquitemachadinhos.com.br",
        "logo": "https://www.aquitemachadinhos.com.br/icon-512.png",
        "description": "Rede Nacional de Guias Locais, Oportunidades, Vagas e Classificados com foco em EEAT: Expertise em mercados locais, Authoritativeness via parcerias premium, Trustworthiness com dados verificados e transparência.",
        "sameAs": [
          "https://nordvpn.com",
          "https://unice.com",
          "https://24-7pressrelease.com"
        ],
        "foundingDate": "2024",
        "areaServed": "Brasil",
        "knowsAbout": ["Vagas de emprego", "Viagens", "Cupons e descontos", "Luxo VIP", "Guias locais", "Classificados"]
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
        "name": `Conteúdo para ${tenant} | Aqui Tem Achadinhos`,
        "url": `https://www.aquitemachadinhos.com.br/${tenant}`,
        "description": `Guias locais, vagas, viagens, cupons e luxo para ${tenant}. Conteúdo EEAT otimizado para experiência, expertise e confiança.`,
        "hasPart": [
          {"@type": "WebPage", "name": "Vagas e Viagens", "url": "/vagas-e-viagens"},
          {"@type": "WebPage", "name": "Cupons Ativos", "url": "/cupons-ativos"},
          {"@type": "WebPage", "name": "Luxo VIP", "url": "/luxo-vip"}
        ],
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Vagas e Viagens"},
            {"@type": "ListItem", "position": 2, "name": "Cupons Ativos"},
            {"@type": "ListItem", "position": 3, "name": "Luxo VIP"}
          ]
        }
      }
    ]
  };
  return new NextResponse(JSON.stringify(graph), {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=2592000'
    }
  });
}
