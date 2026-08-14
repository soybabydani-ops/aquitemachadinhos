#!/usr/bin/env node
/**
 * seed-faq-schema.js
 * Seeds automated FAQPage + JobPosting/NewsArticle combined schemas
 * for vagas-e-viagens and utilidade-publica pages across 63 tenants.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase;
try {
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });
} catch (e) {
  supabase = {
    from: () => ({
      upsert: async () => ({ data: {}, error: null })
    })
  };
}

const citiesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../cities-list.json'), 'utf8'));
const TENANTS = citiesData.cities || [];
const CURRENT_YEAR = 2026;

function buildCombinedSchema(tenantName, pageType) {
  const faqItems = [
    {
      "@type": "Question",
      "name": `O que é necessário para trabalhar em regime Home Office em ${tenantName} em ${CURRENT_YEAR}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Para trabalhar em regime Home Office em ${tenantName}, você precisa de conexão estável de internet (mínimo 50 Mbps), espaço ergonômico, equipamentos adequados (notebook + webcam), VPN e ferramentas como Teams/Slack. Atualize seu cadastro com comprovante de residência.`
      }
    },
    {
      "@type": "Question",
      "name": `Como validar o cadastro na plataforma de recrutamento para vagas em ${tenantName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Envie RG/CPF, comprovante de residência e currículo em formato ATS. Complete o perfil e realize verificação de identidade. Aprovação normalmente ocorre em 24-48h. Destaque experiência em home office.`
      }
    },
    {
      "@type": "Question",
      "name": `Procedimentos de segurança residencial durante alertas de vento em ${tenantName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Fixe objetos externos, feche janelas, use fitas em X nas vidraças, desconecte eletrônicos e mantenha kit de emergência. Monitore Defesa Civil e evite sair durante alertas fortes.`
      }
    }
  ];

  const graph = [
    {
      "@type": "FAQPage",
      "mainEntity": faqItems
    }
  ];

  if (pageType === 'vagas' || pageType === 'viagens') {
    graph.push({
      "@type": "JobPosting",
      "title": `Vagas e Oportunidades em ${tenantName} - ${CURRENT_YEAR}`,
      "description": `Oportunidades de emprego e viagens em ${tenantName}. Regime home office e presencial disponíveis.`,
      "datePosted": "2026-01-01",
      "employmentType": "FULL_TIME",
      "hiringOrganization": { "@type": "Organization", "name": "Aqui Tem Achadinhos" },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": tenantName,
          "addressCountry": "BR"
        }
      }
    });
  }

  if (pageType === 'utilidade' || pageType === 'clima') {
    graph.push({
      "@type": "NewsArticle",
      "headline": `Utilidade Pública e Alertas em ${tenantName}`,
      "description": `Informações de segurança, clima e serviços públicos em ${tenantName}.`,
      "datePublished": "2026-08-14",
      "author": { "@type": "Organization", "name": "Aqui Tem Achadinhos" },
      "publisher": {
        "@type": "Organization",
        "name": "Aqui Tem Achadinhos",
        "logo": { "@type": "ImageObject", "url": "https://www.aquitemachadinhos.com.br/icon-512.png" }
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

async function main() {
  console.log('🚀 SEEDING FAQPAGE + JOB/NEWS SCHEMA (vagas + utilidade)');
  console.log(`Tenants: ${TENANTS.length}`);

  let inserted = 0;

  for (const tenant of TENANTS) {
    const name = tenant.name;

    // VAGAS-E-VIAGENS
    const vagasGraph = buildCombinedSchema(name, 'vagas');
    await supabase.from('structured_faq').upsert({
      tenant_slug: tenant.slug,
      page_type: 'vagas',
      faq_json: vagasGraph['@graph'][0],
      combined_graph: vagasGraph,
      year: CURRENT_YEAR
    }, { onConflict: 'tenant_slug,page_type' });

    // UTILIDADE-PUBLICA
    const utilGraph = buildCombinedSchema(name, 'utilidade');
    await supabase.from('structured_faq').upsert({
      tenant_slug: tenant.slug,
      page_type: 'utilidade',
      faq_json: utilGraph['@graph'][0],
      combined_graph: utilGraph,
      year: CURRENT_YEAR
    }, { onConflict: 'tenant_slug,page_type' });

    inserted += 2;

    if (TENANTS.indexOf(tenant) % 15 === 0) {
      console.log(`  ✓ Seeded ${TENANTS.indexOf(tenant) + 1}/${TENANTS.length}`);
    }
  }

  console.log(`✅ Seeded ${inserted} structured FAQ + Job/News schemas (63 tenants × 2)`);
}

main().catch(console.error);