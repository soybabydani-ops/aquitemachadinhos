import React from 'react';

const citiesData = require('../../../cities-list.json');
const cities = citiesData.cities || [];

async function getUtilidadeSchema(tenant: string) {
  const baseUrl = 'https://www.aquitemachadinhos.com.br';
  
  const faqItems = [
    {
      "@type": "Question",
      "name": `Procedimentos de segurança residencial durante alertas de vento em ${tenant}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Fixe objetos externos, feche janelas, use fitas em X nas vidraças, desconecte eletrônicos e mantenha kit de emergência. Monitore Defesa Civil e evite sair durante alertas fortes.`
      }
    },
    {
      "@type": "Question",
      "name": `Como se proteger durante alertas climáticos em ${tenant}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Mantenha um kit de emergência com lanterna, água, rádio e medicamentos. Feche portas e janelas. Evite áreas alagadas e árvores. Monitore apps oficiais e a Defesa Civil.`
      }
    },
    {
      "@type": "Question",
      "name": `O que fazer em caso de queda de energia durante tempestades em ${tenant}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Desligue aparelhos eletrônicos, use lanternas e pilhas, evite velas. Mantenha geladeira fechada. Contate a companhia de energia local após o alerta.`
      }
    }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqItems
      },
      {
        "@type": "NewsArticle",
        "headline": `Utilidade Pública e Alertas em ${tenant}`,
        "description": `Informações de segurança, clima e serviços públicos em ${tenant}.`,
        "datePublished": "2026-08-14",
        "author": {
          "@type": "Organization",
          "name": "Aqui Tem Achadinhos"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Aqui Tem Achadinhos",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/icon-512.png`
          }
        }
      }
    ]
  };
}

export default async function UtilidadePublicaPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const cityData = cities.find((c: any) => c.slug === citySlug) || {
    slug: citySlug,
    name: citySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    state: 'SP'
  };

  const schema = await getUtilidadeSchema(cityData.name);

  return (
    <main className="min-h-screen bg-white">
      {/* AUTOMATED FAQPAGE + NEWSARTICLE SCHEMA (Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {cityData.name} - Utilidade Pública e Alertas
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Segurança residencial, clima e serviços públicos
          </p>
        </header>

        <section className="prose max-w-none">
          <h2>Alertas e Segurança em {cityData.name}</h2>
          <p>Informações oficiais de utilidade pública, procedimentos durante alertas climáticos e orientações de segurança residencial.</p>
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return cities.map((city: any) => ({ city: city.slug }));
}
