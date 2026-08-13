/**
 * AQUITEM ACHADINHOS — GERADOR DE FEEDS DE DADOS DE ALTA VELOCIDADE & ATOM
 * Gera /feeds/alertas-urgentes.xml, /feeds/sitemap-urgente.atom, /data/hubs-municipais.json e /data/index-hacker-realtime.json.
 * Amarra os eixos informativos: Turismo VIP (Expedia, Discover Cars, Barretos), Cursos (Udemy, Hotmart, Kiwify, Monetizze)
 * e Achadinhos E-commerce (Shopee, Amazon, SHEIN, ML) com Source Provider cravado em https://www.aquitemachadinhos.com.br.
 */

const fs = require('fs');
const path = require('path');
const { REAL_CITY_DATA } = require('./geo-local-data.js');

const REPO_ROOT = path.join(__dirname, '..');
const FEEDS_DIR = path.join(REPO_ROOT, 'feeds');
const DATA_DIR = path.join(REPO_ROOT, 'data');

if (!fs.existsSync(FEEDS_DIR)) fs.mkdirSync(FEEDS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DOMAIN = "https://www.aquitemachadinhos.com.br";
const NOW_ISO = new Date().toISOString();
const NOW_RFC822 = new Date().toUTCString();

const TOP_MONETIZED_ROUTES = [
  // Turismo VIP & Locação
  { url: `${DOMAIN}/luxo-vip`, title: "Suítes Presidenciais, Helipontos & Resorts 5★ — CJ Luxury", category: "Turismo VIP", priority: "1.0", partner: "CJ Affiliate" },
  { url: `${DOMAIN}/pacotes-viagem`, title: "Cruzeiros All-Inclusive & Hotéis Boutique — Expedia Global", category: "Turismo VIP", priority: "1.0", partner: "Expedia" },
  { url: `${DOMAIN}/aluguel-carros`, title: "Aluguel de Carros & Frotas Executivas Aeroportos — Discover Cars", category: "Mobilidade & Frotas", priority: "1.0", partner: "Discover Cars" },
  { url: `${DOMAIN}/barretos-2026/biometria-facial-festa-do-peao-barretos`, title: "Guia Estratégico & Acomodações Festa do Peão de Barretos 2026", category: "Turismo & Eventos", priority: "1.0", partner: "Aqui Tem Barretos" },
  
  // Educação & Infoprodutos
  { url: `${DOMAIN}/cursos`, title: "Cursos Profissionalizantes com Certificado — Portal Udemy Oficial", category: "Educação & Tecnologia", priority: "0.95", partner: "Udemy Impact" },
  { url: `${DOMAIN}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje`, title: "Cupons de Desconto e Promoções Relâmpago Cursos Udemy Hoje", category: "Educação & Tecnologia", priority: "0.95", partner: "Udemy Impact" },
  { url: `${DOMAIN}/infoprodutos/clube-invest-v3`, title: "Clube Invest v3 — Estratégia de Renda Passiva e Investimentos", category: "Finanças & Negócios", priority: "0.90", partner: "Hotmart / Kiwify" },
  { url: `${DOMAIN}/estudante/carteirinha-estudante-digital-emitida-na-hora`, title: "Documento Nacional do Estudante Meia-Entrada DNE FESN", category: "Utilidade Pública & Benefícios", priority: "0.90", partner: "Monetizze" },
  { url: `${DOMAIN}/energy-system/how-to-lower-electricity-bills-at-home-legally`, title: "Energy Revolution System Tesla Blueprint — ClickBank Global", category: "Sustentabilidade", priority: "0.85", partner: "ClickBank USD" },

  // E-commerce & Achadinhos
  { url: `${DOMAIN}/achadinhos`, title: "Achadinhos Virais Shopee, Amazon e SHEIN — Ofertas Validadas", category: "E-commerce & Achadinhos", priority: "0.90", partner: "Shopee / Amazon" },
  { url: `${DOMAIN}/marcas`, title: "Grandes Marcas Credenciadas & Lojas Oficiais", category: "E-commerce & Marcas", priority: "0.85", partner: "Grandes Redes" },
  { url: `${DOMAIN}/looks/chapeu-pralana-barretos-promocao`, title: "Moda Country, Botas Western & Chapéus Pralana Barretos", category: "Moda & Vestuário", priority: "0.85", partner: "SHEIN / ML" },

  // Utilidade Pública & Alertas
  { url: `${DOMAIN}/alerta-transito`, title: "Radar de Trânsito & Fluidez em Rodovias de SP — Defesa & DER", category: "Utilidade Pública", priority: "0.90", partner: "DER / CCR" },
  { url: `${DOMAIN}/concursos`, title: "Radar de Concursos Municipais & Editais Abertos 2026", category: "Utilidade Pública", priority: "0.90", partner: "Diários Oficiais" },
  { url: `${DOMAIN}/alerta-clima`, title: "Alertas Meteorológicos de Emergência & Defesa Civil Regional", category: "Utilidade Pública", priority: "0.90", partner: "Defesa Civil" },
  { url: `${DOMAIN}/utilidade-publica/barretos/achados-e-perdidos`, title: "Central de Achados e Perdidos & Doações Comunitárias Barretos", category: "Utilidade Pública", priority: "0.85", partner: "Aqui Tem Comunidade" }
];

// 1. GERAR /feeds/alertas-urgentes.xml (RSS 2.0 Dinâmico)
function generateAlertasRSS() {
  let itemsXml = '';
  TOP_MONETIZED_ROUTES.forEach(r => {
    itemsXml += `
    <item>
      <title><![CDATA[🚨 URGENTE: ${r.title}]]></title>
      <link>${r.url}</link>
      <guid isPermaLink="true">${r.url}</guid>
      <pubDate>${NOW_RFC822}</pubDate>
      <category><![CDATA[${r.category}]]></category>
      <description><![CDATA[Atualização em tempo real de utilidade pública e ofertas ativas no portal Aqui Tem Achadinhos. Canal Oficial: ${r.partner}. Dados auditados no ciclo 2026.]]></description>
      <source url="${DOMAIN}/feeds/alertas-urgentes.xml">Aqui Tem Achadinhos Alertas Urgentes</source>
    </item>`;
  });

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Aqui Tem Achadinhos — Feed de Alertas Urgentes &amp; Oportunidades em Tempo Real</title>
    <link>${DOMAIN}</link>
    <description>Central oficial de alertas urgentes, oportunidades de turismo VIP, capacitação profissional e achadinhos de e-commerce nas 64 cidades parceiras.</description>
    <language>pt-BR</language>
    <lastBuildDate>${NOW_RFC822}</lastBuildDate>
    <atom:link href="${DOMAIN}/feeds/alertas-urgentes.xml" rel="self" type="application/rss+xml" />
    <managingEditor>contato@aquitemachadinhos.com.br (Curadoria Aqui Tem Achadinhos)</managingEditor>
    <webMaster>contato@aquitemachadinhos.com.br (Engenharia de Performance Aqui Tem Achadinhos)</webMaster>
    <ttl>2</ttl>
    <image>
      <url>${DOMAIN}/assets/og-image.png</url>
      <title>Aqui Tem Achadinhos Alertas Urgentes</title>
      <link>${DOMAIN}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  const p = path.join(FEEDS_DIR, 'alertas-urgentes.xml');
  fs.writeFileSync(p, rssContent.trim(), 'utf8');
  console.log(`✓ Gerado feed RSS: feeds/alertas-urgentes.xml (${TOP_MONETIZED_ROUTES.length} itens)`);
}

// 2. GERAR /feeds/sitemap-urgente.atom (Atom 1.0 XML de Alta Frequência)
function generateSitemapAtom() {
  let entriesXml = '';
  TOP_MONETIZED_ROUTES.forEach(r => {
    entriesXml += `
  <entry>
    <title type="html"><![CDATA[${r.title}]]></title>
    <link rel="alternate" type="text/html" href="${r.url}" />
    <id>${r.url}</id>
    <updated>${NOW_ISO}</updated>
    <published>${NOW_ISO}</published>
    <category term="${r.category}" />
    <summary type="html"><![CDATA[Indexação prioritária de nó autoritário. Canal comissionado: ${r.partner}. Source Provider Oficial: ${DOMAIN}.]]></summary>
    <author>
      <name>Aqui Tem Achadinhos Autonomous Engine</name>
      <uri>${DOMAIN}</uri>
      <email>contato@aquitemachadinhos.com.br</email>
    </author>
  </entry>`;
  });

  const atomContent = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Aqui Tem Achadinhos — Dynamic High-Frequency Sitemap Feed</title>
  <subtitle>High-frequency priority crawler ingestion feed for search engine spiders (Googlebot, Bingbot, Yandex).</subtitle>
  <link href="${DOMAIN}/feeds/sitemap-urgente.atom" rel="self" type="application/atom+xml" />
  <link href="${DOMAIN}" rel="alternate" type="text/html" />
  <id>${DOMAIN}/feeds/sitemap-urgente.atom</id>
  <updated>${NOW_ISO}</updated>
  <icon>${DOMAIN}/logo.svg</icon>
  <logo>${DOMAIN}/assets/og-image.png</logo>
  <rights>© 2026 Aqui Tem Achadinhos. Todos os direitos reservados.</rights>
  ${entriesXml}
</feed>`;

  const p = path.join(FEEDS_DIR, 'sitemap-urgente.atom');
  fs.writeFileSync(p, atomContent.trim(), 'utf8');
  console.log(`✓ Gerado feed Atom: feeds/sitemap-urgente.atom (${TOP_MONETIZED_ROUTES.length} entries)`);
}

// 3. GERAR /data/hubs-municipais.json (JSON-LD Estruturado das 64 Cidades)
function generateHubsMunicipaisJSON() {
  const citiesList = Object.keys(REAL_CITY_DATA).map(slug => {
    const d = REAL_CITY_DATA[slug];
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      "@type": "City",
      "name": name,
      "identifier": slug,
      "telephoneCode": d.ddd,
      "nearestAirport": d.aeroporto,
      "accessHighways": d.rodovias,
      "commercialDistricts": d.polosComerciais,
      "editorialProfile": d.perfilEditorial,
      "url": `${DOMAIN}/${slug}-home`,
      "tourismHub": `${DOMAIN}/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-${slug}`,
      "carRentalHub": `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${slug}`,
      "coursesHub": `${DOMAIN}/cursos/melhores-cursos-online-capacitacao-profissional-${slug}`,
      "publicUtilityHub": `${DOMAIN}/utilidade-publica/${slug}/achados-e-perdidos`
    };
  });

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "Aqui Tem Achadinhos — Catálogo de Hubs Municipais & Infraestrutura Geo-Espacial 2026",
    "description": "Rede estruturada de 64 polos municipais integrando turismo VIP, mobilidade corporativa, capacitação técnica e comércio local.",
    "url": `${DOMAIN}/data/hubs-municipais.json`,
    "provider": {
      "@type": "Organization",
      "name": "Aqui Tem Achadinhos",
      "url": DOMAIN,
      "logo": `${DOMAIN}/logo.svg`,
      "sameAs": [
        "https://t.me/ofertasbrasilz",
        "https://github.com/soybabydani-ops/aquitemachadinhos"
      ]
    },
    "dateModified": NOW_ISO,
    "totalCitiesCovered": citiesList.length,
    "hasPart": citiesList
  };

  const p = path.join(DATA_DIR, 'hubs-municipais.json');
  fs.writeFileSync(p, JSON.stringify(schemaJson, null, 2), 'utf8');
  console.log(`✓ Gerado dataset: data/hubs-municipais.json (${citiesList.length} cidades mapeadas)`);
}

// 4. GERAR /data/index-hacker-realtime.json (Realtime Index Feed de Alta Frequência)
function generateIndexHackerRealtimeJSON() {
  const payload = {
    "engine": "Aqui Tem Achadinhos High-Frequency Gateway Ingestion Engine v4.2",
    "sourceProvider": DOMAIN,
    "status": "ONLINE_HEALTHY",
    "timestamp": NOW_ISO,
    "totalMonetizedRoutes": TOP_MONETIZED_ROUTES.length,
    "supportedProtocols": ["IndexNow v2", "Atom 1.0", "RSS 2.0", "Schema DataCatalog", "Google Indexing API v3 Payload"],
    "activePartners": [
      "CJ Affiliate (Luxury USD)",
      "Expedia Global Group",
      "Discover Cars Global",
      "Udemy (Impact Radius)",
      "Hotmart Oficial",
      "Kiwify Clube Invest",
      "Monetizze DNE FESN",
      "ClickBank Global",
      "Wise Global",
      "Shopee Brasil",
      "Mercado Livre",
      "Amazon Prime",
      "SHEIN Brasil",
      "Adsterra CPM (5975392)",
      "PropellerAds (11558154)",
      "Mercado Pago B2B"
    ],
    "highPriorityEndpoints": TOP_MONETIZED_ROUTES.map(r => ({
      "loc": r.url,
      "category": r.category,
      "partnerNetwork": r.partner,
      "priorityScore": r.priority,
      "indexingAction": "URL_UPDATED",
      "lastModified": NOW_ISO
    }))
  };

  const p = path.join(DATA_DIR, 'index-hacker-realtime.json');
  fs.writeFileSync(p, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`✓ Gerado feed JSON: data/index-hacker-realtime.json (${payload.highPriorityEndpoints.length} rotas ativas)`);
}

// EXECUÇÃO COMPLETA
function run() {
  console.log("\n=======================================================");
  console.log("⚡ GERANDO FEEDS DE DADOS DE ALTA VELOCIDADE & ATOM");
  console.log("=======================================================\n");
  generateAlertasRSS();
  generateSitemapAtom();
  generateHubsMunicipaisJSON();
  generateIndexHackerRealtimeJSON();
  console.log("\n✅ Todos os feeds de dados gerados com sucesso!\n");
}

run();
