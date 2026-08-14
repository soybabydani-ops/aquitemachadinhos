import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aqui Tem Achadinhos | Guias Locais, Classificados e Vagas',
  description: 'Rede Nacional de Guias Locais & Oportunidades. Encontre empresas, gastronomia, turismo, vagas e classificados.',
  icons: { icon: '/favicon.ico' },
  alternates: {
    languages: {
      'pt-BR': 'https://www.aquitemachadinhos.com.br',
      'en': 'https://www.aquitemachadinhos.com.br/en',
      'es': 'https://www.aquitemachadinhos.com.br/es',
    },
  },
};

async function fetchSemanticGraph(tenant: string = 'barretos') {
  try {
    // In production this will resolve to the deployed API or relative
    const res = await fetch(`https://www.aquitemachadinhos.com.br/api/semantic-graph?tenant=${tenant}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    // Fallback inline EEAT graph for build-time / static
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Aqui Tem Achadinhos",
          "url": "https://www.aquitemachadinhos.com.br",
          "logo": "https://www.aquitemachadinhos.com.br/icon-512.png",
          "description": "Rede Nacional de Guias Locais, Oportunidades, Vagas e Classificados com foco em EEAT: Expertise em mercados locais, Authoritativeness via parcerias premium, Trustworthiness com dados verificados e transparência.",
          "sameAs": ["https://nordvpn.com", "https://unice.com", "https://24-7pressrelease.com"],
          "foundingDate": "2024",
          "areaServed": "Brasil",
          "knowsAbout": ["Vagas de emprego", "Viagens", "Cupons e descontos", "Luxo VIP", "Guias locais", "Classificados"]
        },
        {
          "@type": "WebSite",
          "name": "Aqui Tem Achadinhos",
          "url": "https://www.aquitemachadinhos.com.br"
        },
        {
          "@type": "CollectionPage",
          "name": `Conteúdo para ${tenant} | Aqui Tem Achadinhos`,
          "url": `https://www.aquitemachadinhos.com.br/${tenant}`,
          "hasPart": [
            {"@type": "WebPage", "name": "Vagas e Viagens", "url": "/vagas-e-viagens"},
            {"@type": "WebPage", "name": "Cupons Ativos", "url": "/cupons-ativos"},
            {"@type": "WebPage", "name": "Luxo VIP", "url": "/luxo-vip"}
          ]
        }
      ]
    };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const semanticGraph = await fetchSemanticGraph('barretos');

  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.aquitemachadinhos.com.br" />
        {semanticGraph && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(semanticGraph) }}
          />
        )}
        {/* Cache-Biomico & EEAT headers via middleware + API routes */}
      </head>
      <body>{children}</body>
    </html>
  );
}
