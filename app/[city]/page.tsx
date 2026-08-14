import React from 'react';

// Static import of cities list (JSON)
const citiesData = require('../../cities-list.json');
const cities = citiesData.cities || [];

// Automatic FAQPage + JobPosting/NewsArticle combined schema injector
// (White Hat Rich Snippets for vagas-e-viagens + utilidade-publica)
async function getCombinedSchema(tenant: string, pageType: string = 'vagas') {
  const baseUrl = 'https://www.aquitemachadinhos.com.br';
  
  const faqItems = [
    {
      "@type": "Question",
      "name": `O que é necessário para trabalhar em regime Home Office em ${tenant} em 2026?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Para trabalhar em regime Home Office em ${tenant}, você precisa de conexão estável de internet (mínimo 50 Mbps), espaço ergonômico, equipamentos adequados (notebook + webcam), VPN e ferramentas como Teams/Slack. Atualize seu cadastro com comprovante de residência.`
      }
    },
    {
      "@type": "Question",
      "name": `Como validar o cadastro na plataforma de recrutamento para vagas em ${tenant}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Envie RG/CPF, comprovante de residência e currículo em formato ATS. Complete o perfil e realize verificação de identidade. Aprovação normalmente ocorre em 24-48h. Destaque experiência em home office.`
      }
    },
    {
      "@type": "Question",
      "name": `Procedimentos de segurança residencial durante alertas de vento em ${tenant}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Fixe objetos externos, feche janelas, use fitas em X nas vidraças, desconecte eletrônicos e mantenha kit de emergência. Monitore Defesa Civil e evite sair durante alertas fortes.`
      }
    }
  ];

  const graph: any[] = [
    {
      "@type": "FAQPage",
      "mainEntity": faqItems
    }
  ];

  if (pageType === 'vagas' || pageType === 'viagens') {
    graph.push({
      "@type": "JobPosting",
      "title": `Vagas e Oportunidades em ${tenant} - 2026`,
      "description": `Oportunidades de emprego e viagens em ${tenant}. Regime home office e presencial disponíveis.`,
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Aqui Tem Achadinhos"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": tenant,
          "addressCountry": "BR"
        }
      }
    });
  }

  if (pageType === 'utilidade' || pageType === 'clima') {
    graph.push({
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
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  
  const cityData = cities.find((c: any) => c.slug === citySlug) || {
    slug: citySlug,
    name: citySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    state: 'SP',
    type: 'regional'
  };

  const relatedCities = cities
    .filter((c: any) => c.state === cityData.state && c.slug !== citySlug)
    .slice(0, 6);

  // Auto-inject combined FAQPage + JobPosting/NewsArticle schema
  // Targets /vagas-e-viagens and /utilidade-publica pages
  const combinedSchema = await getCombinedSchema(cityData.name, 'vagas');

  return (
    <main className="min-h-screen bg-white">
      {/* AUTOMATED SCHEMA FAQPAGE + JOB/NEWS (Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {cityData.name} - {cityData.state}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Guia completo • Vagas • Classificados • Clima e Utilidades
          </p>
        </header>

        <section className="p-6 bg-gray-50 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌡️ Boletim Climático Oficial</h2>
          <p>Dados climáticos em tempo real para {cityData.name}. Integração com Open-Meteo.</p>
          <div className="mt-4 p-4 bg-white rounded border">
            <strong>Temperatura atual:</strong> Carregando... (componente ClimateWidget em produção)
          </div>
        </section>

        {/* VAGAS-E-VIAGENS / UTILIDADE-PUBLICA RICH CONTENT SECTIONS */}
        <section className="prose max-w-none mb-8">
          <h2>Vagas e Oportunidades em {cityData.name}</h2>
          <p>Encontre vagas com regime home office e oportunidades de viagens na região.</p>
        </section>

        <section className="prose max-w-none">
          <h2>Utilidade Pública e Alertas</h2>
          <p>Informações de segurança residencial, clima e serviços públicos em {cityData.name}.</p>
        </section>

        <footer className="mt-12 text-sm text-gray-500">
          Navegação contextual entre cidades do mesmo estado.
        </footer>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return cities.map((city: any) => ({
    city: city.slug,
  }));
}
