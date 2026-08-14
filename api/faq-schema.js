import { NextResponse } from 'next/server';

// FAQPage + combined JobPosting / NewsArticle @graph generator
// White Hat - for vagas-e-viagens + utilidade-publica pages

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';
  const pageType = searchParams.get('page') || 'vagas';

  const baseUrl = 'https://www.aquitemachadinhos.com.br';

  // Base FAQ content (expandable per tenant)
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

  // Combine with existing schemas (JobPosting for vagas, NewsArticle for utilidade)
  const baseGraph = [
    {
      "@type": "FAQPage",
      "mainEntity": faqItems
    }
  ];

  if (pageType === 'vagas' || pageType === 'viagens') {
    baseGraph.push({
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
    baseGraph.push({
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

  const combinedGraph = {
    "@context": "https://schema.org",
    "@graph": baseGraph
  };

  return new NextResponse(JSON.stringify(combinedGraph), {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=2592000'
    }
  });
}
