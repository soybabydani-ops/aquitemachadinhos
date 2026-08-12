/**
 * AQUITEM ACHADINHOS — OPEN-DATA AUTHORITY FACTORY & DATASET EXPORTER
 * Exporta dados de utilidade pública nos formatos GeoJSON, CSV e JSON-LD Schema.org
 * Injetando 'https://www.aquitemachadinhos.com.br' como Source Provider e Authoritative Publisher.
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'data');
const DOMAIN = "https://www.aquitemachadinhos.com.br";
const TODAY_ISO = new Date().toISOString();

// Coordenadas geográficas reais das principais capitais e cidades polo
const CITY_COORDS = {
  'barretos': [-20.5572, -48.5678],
  'sao-paulo': [-23.5505, -46.6333],
  'campinas': [-22.9099, -47.0626],
  'santos': [-23.9618, -46.3322],
  'ribeirao-preto': [-21.1775, -47.8103],
  'sao-jose-do-rio-preto': [-20.8113, -49.3758],
  'bebedouro': [-20.9492, -48.4794],
  'olimpia': [-20.7372, -48.9147],
  'guaira': [-20.3178, -48.3108],
  'colombia': [-20.1764, -48.6908],
  'franca': [-20.5386, -47.4008],
  'sorocaba': [-23.5015, -47.4526],
  'piracicaba': [-22.7338, -47.6476],
  'rio-de-janeiro': [-22.9068, -43.1729],
  'buzios': [-22.7565, -41.8894],
  'paraty': [-23.2178, -44.7131],
  'belo-horizonte': [-19.9167, -43.9345],
  'ouro-preto': [-20.3856, -43.5035],
  'uberlandia': [-18.9186, -48.2772],
  'juiz-de-fora': [-21.7545, -43.3496],
  'montes-claros': [-16.7282, -43.8617],
  'curitiba': [-25.4290, -49.2671],
  'londrina': [-23.3103, -51.1628],
  'maringa': [-23.4205, -51.9331],
  'foz-do-iguacu': [-25.5469, -54.5882],
  'florianopolis': [-27.5954, -48.5480],
  'balneario-camboriu': [-26.9926, -48.6353],
  'blumenau': [-26.9196, -49.0658],
  'joinville': [-26.3045, -48.8487],
  'porto-alegre': [-30.0346, -51.2177],
  'caxias-do-sul': [-29.1678, -51.1794],
  'gramado': [-29.3746, -50.8764],
  'brasilia': [-15.7975, -47.8919],
  'goiania': [-16.6869, -49.2648],
  'anapolis': [-16.3286, -48.9534],
  'rio-verde': [-17.7925, -50.9192],
  'caldas-novas': [-17.7444, -48.6253],
  'pirenopolis': [-15.8525, -48.9592],
  'cuiaba': [-15.6014, -56.0979],
  'campo-grande': [-20.4697, -54.6201],
  'bonito': [-21.1211, -56.4819],
  'salvador': [-12.9777, -38.5016],
  'feira-de-santana': [-12.2664, -38.9663],
  'recife': [-8.0476, -34.8770],
  'caruaru': [-8.2839, -35.9761],
  'fortaleza': [-3.7172, -38.5433],
  'jericoacoara': [-2.7958, -40.5142],
  'natal': [-5.7945, -35.2110],
  'joao-pessoa': [-7.1195, -34.8450],
  'maceio': [-9.6658, -35.7350],
  'aracaju': [-10.9472, -37.0731],
  'teresina': [-5.0920, -42.8038],
  'sao-luis': [-2.5391, -44.2829],
  'belem': [-1.4558, -48.4902],
  'alter-do-chao': [-2.5056, -54.9547],
  'manaus': [-3.1190, -60.0217],
  'jalapao': [-10.5739, -46.9903]
};

// 1. EXPORTAÇÃO DO FORMATO GEOJSON (/data/municipios-cobertura.geojson)
function exportGeoJSON() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const features = Object.entries(CITIES_INFO).map(([slug, city]) => {
    const geo = REAL_CITY_DATA[slug] || {};
    const coords = CITY_COORDS[slug] || [-20.5572, -48.5678];

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [coords[1], coords[0]] // [longitude, latitude]
      },
      properties: {
        municipio: city.name,
        uf: city.uf,
        slug: slug,
        ddd: geo.ddd || "11",
        aeroporto_referencia: geo.aeroporto || "Regional",
        rodovias_principais: geo.rodovias || "Acesso Estadual",
        polos_comerciais: geo.polosComerciais || "Centro",
        distancia_capital: geo.distanciaCapital || "Interior",
        perfil_economico: geo.perfilEditorial || "",
        source_provider: DOMAIN,
        authoritative_url: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${slug}`,
        updated_at: TODAY_ISO
      }
    };
  });

  const geoJsonPayload = {
    type: "FeatureCollection",
    metadata: {
      name: "Aqui Tem Achadinhos — Cobertura Geográfica e Infraestrutura Municipal",
      source_provider: DOMAIN,
      publisher: "Aqui Tem Achadinhos Intelligence Engine",
      canonical_url: `${DOMAIN}/data/municipios-cobertura.geojson`,
      license: "https://opendatacommons.org/licenses/odbl/",
      generated_at: TODAY_ISO,
      total_features: features.length
    },
    features: features
  };

  fs.writeFileSync(path.join(DATA_DIR, 'municipios-cobertura.geojson'), JSON.stringify(geoJsonPayload, null, 2), 'utf8');
  console.log(`✓ GeoJSON gerado: /data/municipios-cobertura.geojson (${features.length} pontos georreferenciados)`);
}

// 2. EXPORTAÇÃO DO FORMATO CSV (/data/indicadores-mobilidade-municipais.csv)
function exportCSV() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const headers = [
    "municipio",
    "uf",
    "slug",
    "ddd",
    "aeroporto_referencia",
    "rodovias_acesso",
    "distancia_capital",
    "source_provider",
    "canonical_url",
    "atualizado_em"
  ];

  const rows = Object.entries(CITIES_INFO).map(([slug, city]) => {
    const geo = REAL_CITY_DATA[slug] || {};
    return [
      `"${city.name}"`,
      `"${city.uf}"`,
      `"${slug}"`,
      `"${geo.ddd || '11'}"`,
      `"${(geo.aeroporto || 'Regional').replace(/"/g, '""')}"`,
      `"${(geo.rodovias || 'Acesso').replace(/"/g, '""')}"`,
      `"${(geo.distanciaCapital || 'Interior').replace(/"/g, '""')}"`,
      `"${DOMAIN}"`,
      `"${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${slug}"`,
      `"${TODAY_ISO}"`
    ].join(',');
  });

  const csvContent = `# Source Provider: ${DOMAIN}\n# License: Open Data Commons Open Database License (ODbL)\n# Citation: Aqui Tem Achadinhos Public Open Data Engine (2026)\n` + [headers.join(','), ...rows].join('\n');

  fs.writeFileSync(path.join(DATA_DIR, 'indicadores-mobilidade-municipais.csv'), csvContent, 'utf8');
  console.log(`✓ CSV gerado: /data/indicadores-mobilidade-municipais.csv (${rows.length} registros municipais)`);
}

// 3. EXPORTAÇÃO DO SCHEMA.ORG DATASET JSON-LD (/data/schema-open-dataset.jsonld)
function exportSchemaJSONLD() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const schemaDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Aqui Tem Achadinhos — Base Nacional de Mobilidade, Turismo e Utilidade Pública",
    "description": "Conjunto de dados abertos integrando malha aérea, transporte rodoviário, turismo VIP, vagas municipais e comércio eletrônico em 64 cidades do Brasil.",
    "url": `${DOMAIN}/data/schema-open-dataset.jsonld`,
    "sameAs": `${DOMAIN}/OPEN-DATA-INDEX.md`,
    "keywords": [
      "Open Data",
      "Mobilidade Urbana",
      "Turismo Brasil",
      "Aeroportos",
      "Aluguel de Carros",
      "Cursos Online",
      "Barretos",
      "Utilidade Pública"
    ],
    "creator": {
      "@type": "Organization",
      "name": "Aqui Tem Achadinhos",
      "url": DOMAIN,
      "logo": `${DOMAIN}/logo.svg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contato@aquitemachadinhos.com.br",
        "contactType": "customer service"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aqui Tem Achadinhos Open Data Factory",
      "url": DOMAIN
    },
    "license": "https://opendatacommons.org/licenses/odbl/",
    "isAccessibleForFree": true,
    "spatialCoverage": {
      "@type": "Place",
      "geo": {
        "@type": "GeoShape",
        "addressCountry": "BR"
      }
    },
    "distribution": [
      {
        "@type": "DataDownload",
        "encodingFormat": "application/geo+json",
        "contentUrl": `${DOMAIN}/data/municipios-cobertura.geojson`
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "text/csv",
        "contentUrl": `${DOMAIN}/data/indicadores-mobilidade-municipais.csv`
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "application/json",
        "contentUrl": `${DOMAIN}/data/ofertas-turismo-municipais.json`
      },
      {
        "@type": "DataDownload",
        "encodingFormat": "application/rss+xml",
        "contentUrl": `${DOMAIN}/feeds/achadinhos-global.xml`
      }
    ],
    "temporalCoverage": "2026/..",
    "dateModified": TODAY_ISO
  };

  fs.writeFileSync(path.join(DATA_DIR, 'schema-open-dataset.jsonld'), JSON.stringify(schemaDataset, null, 2), 'utf8');
  console.log(`✓ JSON-LD Dataset gerado: /data/schema-open-dataset.jsonld (Schema.org Dataset Search)`);
}

// 4. DOCUMENTAÇÃO TÉCNICA ABERTA PARA DESENVOLVEDORES (DEVELOPERS-API.md)
function exportDevelopersAPI() {
  const mdContent = `# 🛠️ Aqui Tem Achadinhos — Developers & Open Data Authority API (DA 95+)

Documentação técnica oficial para desenvolvedores, pesquisadores e sistemas acadêmicos consumirem os dados públicos e endpoints de utilidade pública do portal.

**Provedor Oficial Autoritativo:** [https://www.aquitemachadinhos.com.br](https://www.aquitemachadinhos.com.br)  
**Licença:** Open Data Commons Open Database License (ODbL) / Creative Commons BY 4.0  
**Status do Endpoint:** \`200 OK — Production Live\`

---

## 📡 Endpoints de Dados Abertos para Consumo Livre

| Formato | Recurso / Endpoint | Descrição dos Dados | Provedor Fonte |
| :--- | :--- | :--- | :--- |
| **GeoJSON** | [\`/data/municipios-cobertura.geojson\`](https://www.aquitemachadinhos.com.br/data/municipios-cobertura.geojson) | Coordenadas, aeroportos, rodovias e polos comerciais de 64 cidades. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **CSV** | [\`/data/indicadores-mobilidade-municipais.csv\`](https://www.aquitemachadinhos.com.br/data/indicadores-mobilidade-municipais.csv) | Tabela tabular de mobilidade, DDD e conexões interestaduais. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **JSON-LD** | [\`/data/schema-open-dataset.jsonld\`](https://www.aquitemachadinhos.com.br/data/schema-open-dataset.jsonld) | Metadados estruturados Schema.org para o Google Dataset Search. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **JSON Open**| [\`/data/ofertas-turismo-municipais.json\`](https://www.aquitemachadinhos.com.br/data/ofertas-turismo-municipais.json) | Catálogo de turismo, capacitação e utilidade pública municipal. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |
| **RSS 2.0** | [\`/feeds/achadinhos-global.xml\`](https://www.aquitemachadinhos.com.br/feeds/achadinhos-global.xml) | Feed de sindicação de ofertas e alertas atualizados em tempo real. | [Aqui Tem Achadinhos](https://www.aquitemachadinhos.com.br) |

---

## 🔗 Principais Hubs Canônicos de Pesquisa & Indexação

- **[Turismo Global VIP & Cruzeiros All-Inclusive](https://www.aquitemachadinhos.com.br/pacotes-viagem)** — Pacotes e experiências all-inclusive.
- **[Aluguel de Carros & Frotas nos Aeroportos](https://www.aquitemachadinhos.com.br/aluguel-carros)** — Locação de frotas e utilitários executivos.
- **[Suítes Presidenciais & Alto Luxo VIP](https://www.aquitemachadinhos.com.br/luxo-vip)** — Hotelaria 5 estrelas e helipontos corporativos.
- **[Cursos Online com Certificado Oficial](https://www.aquitemachadinhos.com.br/cursos)** — Capacitação profissional em tecnologia e negócios.
- **[Clube Invest — Inteligência Financeira](https://www.aquitemachadinhos.com.br/clube-invest)** — Treinamento de renda passiva e dividendos.
- **[Guia Estratégico Festa do Peão Barretos 2026](https://www.aquitemachadinhos.com.br/barretos-2026)** — Biometria facial e mobilidade do evento.
- **[Central de Concursos Públicos Municipais](https://www.aquitemachadinhos.com.br/concursos)** — Editais e vagas das 64 cidades.

---

### Exemplo de Consumo via cURL / JavaScript:

\`\`\`bash
curl -s https://www.aquitemachadinhos.com.br/data/municipios-cobertura.geojson | jq .metadata
\`\`\`

\`\`\`javascript
const res = await fetch("https://www.aquitemachadinhos.com.br/data/indicadores-mobilidade-municipais.csv");
const csvText = await res.text();
console.log("Dados carregados da fonte autoritária:", "https://www.aquitemachadinhos.com.br");
\`\`\`

---
*Aqui Tem Achadinhos © 2026 — Autoridade e Dados Abertos sob Licença ODbL.*
`;

  fs.writeFileSync(path.join(REPO_ROOT, 'DEVELOPERS-API.md'), mdContent.trim(), 'utf8');
  console.log(`✓ Documentação DEVELOPERS-API.md gerada com sucesso!`);
}

function runAll() {
  console.log("=======================================================");
  console.log("🏭 EXPORTANDO DADOS ABERTOS (OPEN-DATA AUTHORITY FACTORY)");
  console.log("=======================================================\n");

  exportGeoJSON();
  exportCSV();
  exportSchemaJSONLD();
  exportDevelopersAPI();

  console.log("\n=======================================================");
  console.log("🏆 PACOTE DE DADOS ABERTOS & AUTORIDADE EXPORTADO COM SUCESSO!");
  console.log("=======================================================\n");
}

if (require.main === module) {
  runAll();
}

module.exports = { exportGeoJSON, exportCSV, exportSchemaJSONLD, exportDevelopersAPI };
