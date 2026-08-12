/**
 * AQUITEM ACHADINHOS — GERADOR DE DATA FEEDS ABERTOS & MAGNETS DE BACKLINKS (DA 90+)
 * Gera feeds RSS 2.0 XML (/feeds/achadinhos-global.xml), catálogos abertos JSON (/data/ofertas-turismo-municipais.json)
 * e documentações abertas em Markdown para indexação em plataformas públicas.
 */

const fs = require('fs');
const path = require('path');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');

const REPO_ROOT = path.join(__dirname, '..');
const FEEDS_DIR = path.join(REPO_ROOT, 'feeds');
const DATA_DIR = path.join(REPO_ROOT, 'data');

const DOMAIN = "https://www.aquitemachadinhos.com.br";
const TODAY_ISO = new Date().toISOString();
const TODAY_RFC822 = new Date().toUTCString();

// 1. GERAÇÃO DO FEED RSS 2.0 XML GLOBAL (/feeds/achadinhos-global.xml)
function generateGlobalRSSFeed() {
  if (!fs.existsSync(FEEDS_DIR)) fs.mkdirSync(FEEDS_DIR, { recursive: true });

  const feedItems = [
    {
      title: "Aluguel de Carros Blindados e Utilitários Executivos em São Paulo Guarulhos",
      link: `${DOMAIN}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos`,
      guid: `${DOMAIN}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos`,
      category: "Locação Veicular / Aeroportos",
      description: `Cotações de carros blindados e SUVs executivos no Aeroporto Internacional de Guarulhos (GRU) com até 70% de desconto e cancelamento gratuito até 48h. Acesse o portal oficial em <a href="${DOMAIN}/aluguel-carros">Aqui Tem Aluguel de Carros</a>.`
    },
    {
      title: "Pacotes de Cruzeiros Marítimos e Resorts All-Inclusive com Tudo Incluso",
      link: `${DOMAIN}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao`,
      guid: `${DOMAIN}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao`,
      category: "Turismo VIP / Cruzeiros",
      description: `Ofertas de cruzeiros no Caribe e resorts 5 estrelas all-inclusive no litoral brasileiro e exterior com tarifas secretas da Expedia. Confira o guia em <a href="${DOMAIN}/pacotes-viagem">Aqui Tem Pacotes VIP</a>.`
    },
    {
      title: "Reservas de Suítes Presidenciais e Resorts com Heliponto em São Paulo",
      link: `${DOMAIN}/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo`,
      guid: `${DOMAIN}/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo`,
      category: "Alto Luxo / Suítes Presidenciais",
      description: `Hospedagem ultra-exclusiva com heliponto homologado e serviço de concierge 24h na rede Marriott e IHG via CJ Affiliate. Mais detalhes em <a href="${DOMAIN}/luxo-vip">Aqui Tem Luxo VIP</a>.`
    },
    {
      title: "Cupons de Desconto Ativos e Promoções Relâmpago para Cursos da Udemy Hoje",
      link: `${DOMAIN}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje`,
      guid: `${DOMAIN}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje`,
      category: "Educação / Cursos Online",
      description: `Capacitação profissional com certificado válido nas áreas de Programação, Inteligência Artificial, Excel Avançado e Marketing Digital. Acesse em <a href="${DOMAIN}/cursos">Aqui Tem Cursos</a>.`
    },
    {
      title: "Como Pagar Meia-Entrada na Festa do Peão de Barretos com Documento do Estudante FESN",
      link: `${DOMAIN}/estudante/como-pagar-meia-entrada-festa-do-peao-barretos`,
      guid: `${DOMAIN}/estudante/como-pagar-meia-entrada-festa-do-peao-barretos`,
      category: "Utilidade Estudantil / Meia-Entrada",
      description: `Emissão do Documento Nacional do Estudante (DNE/CIE) oficial com QR Code para 50% de desconto em ingressos de shows, cinema e Festa do Peão. Acesse em <a href="${DOMAIN}/estudante">Aqui Tem Estudante</a>.`
    },
    {
      title: "Método Oficial Clube Invest v3 — Independência Financeira e Renda Passiva",
      link: `${DOMAIN}/clube-invest/como-destravar-independencia-financeira`,
      guid: `${DOMAIN}/clube-invest/como-destravar-independencia-financeira`,
      category: "Educação Financeira / Investimentos",
      description: `Treinamento passo a passo para multiplicação de capital e investimentos em dividendos e fundos imobiliários. Veja mais em <a href="${DOMAIN}/clube-invest">Aqui Tem Clube Invest</a>.`
    },
    {
      title: "Painel Hacker de Cupons e Bugs de Preço Relâmpago no Brasil",
      link: `${DOMAIN}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre`,
      guid: `${DOMAIN}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre`,
      category: "Achadinhos & E-commerce",
      description: `Monitoramento contínuo de promoções relâmpago e quedas de preço em eletrônicos e utilidades da Shopee, Mercado Livre e Amazon. Acesse em <a href="${DOMAIN}/cupons-ativos">Painel de Cupons</a>.`
    },
    {
      title: "Guia Estratégico Festa do Peão de Barretos 2026 — Biometria Facial e Programação",
      link: `${DOMAIN}/barretos-2026/biometria-facial-festa-do-peao-barretos`,
      guid: `${DOMAIN}/barretos-2026/biometria-facial-festa-do-peao-barretos`,
      category: "Eventos & Cultura / Barretos",
      description: `Guia de logística, hospedagem, transporte rodoviário e cadastramento facial obrigatório para o Parque do Peão. Confira em <a href="${DOMAIN}/barretos-2026">Barretos 2026</a>.`
    }
  ];

  // Adicionar amostra de cidades do interior e capitais
  for (const [key, city] of Object.entries(CITIES_INFO).slice(0, 10)) {
    const geo = REAL_CITY_DATA[key] || {};
    feedItems.push({
      title: `Guia Municipal & Aluguel de Carros em ${city.name} (${city.uf})`,
      link: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${key}`,
      guid: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${key}`,
      category: `Mobilidade / ${city.name}`,
      description: `Guia de locadoras de veículos sem taxas ocultas em ${city.name} - ${city.uf}. Aeroporto de referência: ${geo.aeroporto || 'Regional'}. Rodovias: ${geo.rodovias || 'Acesso estadual'}. Acesse em <a href="${DOMAIN}/aluguel-carros">Aqui Tem Achadinhos ${city.name}</a>.`
    });
  }

  const itemsXml = feedItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <category><![CDATA[${item.category}]]></category>
      <pubDate>${TODAY_RFC822}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>
  `).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aqui Tem Achadinhos — Feed Global de Ofertas, Turismo VIP e Utilidade Pública</title>
    <link>${DOMAIN}</link>
    <description>Catálogo aberto e atualizado em tempo real de ofertas de e-commerce, locação veicular, turismo VIP, capacitação profissional e alertas municipais.</description>
    <language>pt-BR</language>
    <lastBuildDate>${TODAY_RFC822}</lastBuildDate>
    <atom:link href="${DOMAIN}/feeds/achadinhos-global.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${DOMAIN}/assets/og-image.png</url>
      <title>Aqui Tem Achadinhos</title>
      <link>${DOMAIN}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  const outXmlPath = path.join(FEEDS_DIR, 'achadinhos-global.xml');
  fs.writeFileSync(outXmlPath, rssXml.trim(), 'utf8');
  console.log(`✓ Feed RSS global gerado em: /feeds/achadinhos-global.xml (${feedItems.length} itens com backlinks contextuais)`);
}

// 2. GERAÇÃO DO CATÁLOGO DE DADOS ABERTOS JSON (/data/ofertas-turismo-municipais.json)
function generateOpenDataJson() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const dataset = {
    schema_version: "2.0.0",
    generated_at: TODAY_ISO,
    portal: {
      name: "Aqui Tem Achadinhos",
      canonical_domain: DOMAIN,
      contact: "contato@aquitemachadinhos.com.br",
      license: "Open Data Commons Open Database License (ODbL)"
    },
    verticals: [
      {
        id: "turismo_vip_expedia",
        nome: "Turismo Global VIP & Cruzeiros",
        url_hub: `${DOMAIN}/pacotes-viagem`,
        parceiro: "Expedia Group",
        rotas_em_destaque: [
          `${DOMAIN}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao`,
          `${DOMAIN}/pacotes-viagem/bugs-passagens-aereas-internacionais-orlando`,
          `${DOMAIN}/pacotes-viagem/bugs-passagens-aereas-internacionais-paris`
        ]
      },
      {
        id: "locacao_veicular_discovercars",
        nome: "Aluguel de Carros & Frotas Executivas",
        url_hub: `${DOMAIN}/aluguel-carros`,
        parceiro: "Discover Cars",
        rotas_em_destaque: [
          `${DOMAIN}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos`,
          `${DOMAIN}/aluguel-carros/como-conseguir-desconto-locacao-veiculos-festa-peao-barretos`,
          `${DOMAIN}/aluguel-carros/luxury-car-hire-suv-rentals-tokyo-haneda`
        ]
      },
      {
        id: "alto_luxo_cj",
        nome: "Suítes Presidenciais & Malas TUMI/Samsonite",
        url_hub: `${DOMAIN}/luxo-vip`,
        parceiro: "CJ Affiliate (Marriott / IHG / TUMI)",
        rotas_em_destaque: [
          `${DOMAIN}/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo`,
          `${DOMAIN}/luxo-vip/melhores-malas-bordo-alta-resistencia-samsonite-tumi-promocao`,
          `${DOMAIN}/luxo-vip/luxury-5star-hotels-presidential-suites-dubai`
        ]
      },
      {
        id: "educacao_capacitacao_udemy",
        nome: "Cursos Online com Certificado & TI",
        url_hub: `${DOMAIN}/cursos`,
        parceiro: "Udemy Brasil (Impact Radius)",
        rotas_em_destaque: [
          `${DOMAIN}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje`,
          `${DOMAIN}/cursos/cursos-inteligencia-artificial-chatgpt-prompts`,
          `${DOMAIN}/cursos/melhores-cursos-online-capacitacao-profissional-barretos`
        ]
      }
    ],
    municipios_atendidos_64: Object.entries(CITIES_INFO).map(([key, city]) => {
      const geo = REAL_CITY_DATA[key] || {};
      return {
        slug: key,
        nome: city.name,
        uf: city.uf,
        ddd: geo.ddd || "11",
        aeroporto_referencia: geo.aeroporto || "Regional",
        rodovias_principais: geo.rodovias || "Acesso Estadual",
        distancia_capital: geo.distanciaCapital || "Interior",
        urls_canônicas: {
          aluguel_carros: `${DOMAIN}/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-${key}`,
          cursos_capacitacao: `${DOMAIN}/cursos/melhores-cursos-online-capacitacao-profissional-${key}`,
          hoteis_boutique: `${DOMAIN}/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-${key}`,
          suites_presidenciais: `${DOMAIN}/luxo-vip/suites-presidenciais-hoteis-5-estrelas-heliponto-${key}`,
          concursos_municipais: `${DOMAIN}/concursos/${key}-inscricoes-abertas`,
          alerta_meteorologico: `${DOMAIN}/alerta-clima/${key}-alerta-meteorologico`,
          achados_perdidos: `${DOMAIN}/utilidade-publica/${key}/achados-e-perdidos`
        }
      };
    })
  };

  const outJsonPath = path.join(DATA_DIR, 'ofertas-turismo-municipais.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(dataset, null, 2), 'utf8');
  console.log(`✓ Catálogo Open Data gerado em: /data/ofertas-turismo-municipais.json (${dataset.municipios_atendidos_64.length} cidades mapeadas)`);
}

// 3. GERAÇÃO DA DOCUMENTAÇÃO ABERTA EM MARKDOWN COM BACKLINKS
function generateOpenDataMarkdownDocs() {
  const mdContent = `# 🌐 Aqui Tem Achadinhos — Open Data & Municipal Datasets Index

Catálogo público de dados abertos, turismo, mobilidade urbana, capacitação profissional e utilidade pública municipal.

**Domínio Oficial Canônico:** [https://www.aquitemachadinhos.com.br](https://www.aquitemachadinhos.com.br)  
**Feed RSS Oficial:** [https://www.aquitemachadinhos.com.br/feeds/achadinhos-global.xml](https://www.aquitemachadinhos.com.br/feeds/achadinhos-global.xml)  
**Catálogo JSON:** [https://www.aquitemachadinhos.com.br/data/ofertas-turismo-municipais.json](https://www.aquitemachadinhos.com.br/data/ofertas-turismo-municipais.json)

---

## 📌 Hubs Canônicos de Autoridade

1. **[Turismo Global VIP & Cruzeiros All-Inclusive](https://www.aquitemachadinhos.com.br/pacotes-viagem)** — Pacotes de viagens internacionais, cruzeiros no Caribe e resorts 5 estrelas via Expedia.
2. **[Aluguel de Carros & Frotas Executivas](https://www.aquitemachadinhos.com.br/aluguel-carros)** — Comparador de frotas, SUVs e carros blindados nos aeroportos via Discover Cars.
3. **[Suítes Presidenciais & Alto Luxo](https://www.aquitemachadinhos.com.br/luxo-vip)** — Hotelaria de altíssimo luxo com heliponto e malas executivas TUMI/Samsonite na rede CJ.
4. **[Cursos Online & Capacitação com Certificado](https://www.aquitemachadinhos.com.br/cursos)** — Cursos de TI, Inteligência Artificial e Negócios certificados pela Udemy.
5. **[Educação Financeira & Clube Invest](https://www.aquitemachadinhos.com.br/clube-invest)** — Treinamento oficial de renda passiva e dividendos.
6. **[Documento Nacional do Estudante (DNE/CIE)](https://www.aquitemachadinhos.com.br/estudante)** — Carteirinha oficial digital para meia-entrada em shows e cinemas.
7. **[Guia Estratégico Festa do Peão de Barretos 2026](https://www.aquitemachadinhos.com.br/barretos-2026)** — Biometria facial e programação oficial do Parque do Peão.
8. **[Central de Concursos Municipais](https://www.aquitemachadinhos.com.br/concursos)** — Editais e vagas públicas nas 64 principais cidades.
9. **[Alertas Meteorológicos da Defesa Civil](https://www.aquitemachadinhos.com.br/alerta-clima)** — Monitoramento de tempestades e alertas climáticos.
10. **[Radar de Trânsito Rodoviário](https://www.aquitemachadinhos.com.br/alerta-transito)** — Monitoramento em tempo real de rodovias de São Paulo.

---

## 🏛️ Cobertura Municipal (Amostra das 64 Cidades)

| Município | UF | DDD | Aeroporto de Referência | Acesso Rodoviário | Hub Canônico de Mobilidade |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **Barretos** | SP | 17 | Chafei Amsei / RAO | SP-326 (Faria Lima) | [Locadoras Barretos](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-barretos) |
| **São Paulo** | SP | 11 | Guarulhos GRU / Congonhas CGH | Anhanguera / Dutra | [Blindados GRU](https://www.aquitemachadinhos.com.br/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos) |
| **Campinas** | SP | 19 | Viracopos VCP | Bandeirantes (SP-348) | [Locadoras Campinas](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-campinas) |
| **Santos** | SP | 13 | Acesso Imigrantes | Imigrantes (SP-160) | [Locadoras Santos](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-santos) |
| **Ribeirão Preto** | SP | 16 | Leite Lopes RAO | Anhanguera (SP-330) | [Locadoras Ribeirão](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-ribeirao-preto) |
| **Belo Horizonte** | MG | 31 | Confins CNF / Pampulha | BR-040 / Fernão Dias | [Locadoras BH](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-belo-horizonte) |
| **Curitiba** | PR | 41 | Afonso Pena CWB | BR-277 / Régis Bittencourt | [Locadoras Curitiba](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-curitiba) |
| **Florianópolis** | SC | 48 | Hercílio Luz FLN | BR-101 / SC-401 | [Locadoras Floripa](https://www.aquitemachadinhos.com.br/aluguel-carros/melhores-locadoras-carros-sem-taxas-ocultas-florianopolis) |

---
*Aqui Tem Achadinhos © 2026 — Dados sob licença livre ODbL para indexação e integração de dados abertos.*
`;

  fs.writeFileSync(path.join(REPO_ROOT, 'OPEN-DATA-INDEX.md'), mdContent.trim(), 'utf8');
  console.log(`✓ Documentação aberta gerada em: OPEN-DATA-INDEX.md`);
}

function runAll() {
  console.log("=======================================================");
  console.log("🚀 GERANDO FEEDS DE DADOS ABERTOS & MAGNETS DE BACKLINKS");
  console.log("=======================================================\n");

  generateGlobalRSSFeed();
  generateOpenDataJson();
  generateOpenDataMarkdownDocs();

  console.log("\n=======================================================");
  console.log("🏆 ESTRUTURA DE SYNDICATION DE DADOS ABERTOS GERADA COM SUCESSO!");
  console.log("=======================================================\n");
}

if (require.main === module) {
  runAll();
}

module.exports = { generateGlobalRSSFeed, generateOpenDataJson, generateOpenDataMarkdownDocs };
