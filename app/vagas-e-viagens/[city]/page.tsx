import React from 'react';

const citiesData = require('../../../cities-list.json');
const cities = citiesData.cities || [];

async function getVagasSchema(tenant: string) {
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

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqItems
      },
      {
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
      }
    ]
  };
}

export default async function VagasViagensPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  const cityData = cities.find((c: any) => c.slug === citySlug) || {
    slug: citySlug,
    name: citySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    state: 'SP'
  };

  const schema = await getVagasSchema(cityData.name);

  return (
    <main className="min-h-screen bg-white">
      {/* AUTOMATED FAQPAGE + JOBPOSTING SCHEMA (Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {cityData.name} - Vagas e Viagens 2026
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Oportunidades com regime home office e viagens na região
          </p>
        </header>

        <section className="prose max-w-none">
          <h2>Vagas em {cityData.name}</h2>
          <p>Encontre vagas de emprego e oportunidades de viagens. Cadastre-se e valide seu perfil para acesso imediato às melhores oportunidades locais e remotas.</p>
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return cities.map((city: any) => ({ city: city.slug }));
}
