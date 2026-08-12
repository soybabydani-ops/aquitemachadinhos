/**
 * AQUITEM ACHADINHOS — SEEDER MESTRE HIGH-TICKET B2B, LUXO E HEDGE GLOBAL
 */

const https = require("https");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const LUXO_ROTAS = [
  {
    origem: "São Paulo Catarina Executive (SBJH)",
    destino: "Trancoso / Terravista (SBTR)",
    servico: "Jato_Privado",
    slug: "fretamento-jato-executivo-sao-paulo-catarina-trancoso",
    tempo: "1h 15min",
    preco: "A partir de R$ 48.000",
    link: "https://meli.la/1U3rtgV"
  },
  {
    origem: "São Paulo Congonhas (SBSP)",
    destino: "Angra dos Reis / Frade (SDAG)",
    servico: "Helicoptero_Executivo",
    slug: "helicoptero-transfer-congonhas-angra-dos-reis",
    tempo: "55 min",
    preco: "A partir de R$ 18.500",
    link: "https://meli.la/1U3rtgV"
  },
  {
    origem: "São Paulo Guarulhos (SBGR)",
    destino: "Miami Executive (KTMB)",
    servico: "Jato_Privado",
    slug: "jato-privado-guarulhos-miami-urgente",
    tempo: "8h 30min",
    preco: "A partir de USD 65.000",
    link: "https://meli.la/1U3rtgV"
  },
  {
    origem: "São Paulo Catarina (SBJH)",
    destino: "Jurerê Internacional / Florianópolis (SBFL)",
    servico: "Jato_Privado",
    slug: "fretamento-jato-sao-paulo-jurere-internacional",
    tempo: "50 min",
    preco: "A partir de R$ 32.000",
    link: "https://meli.la/1U3rtgV"
  },
  {
    origem: "Grande São Paulo (Capital e Alphaville)",
    destino: "Região Metropolitana & Litoral",
    servico: "Blindados_Executivos",
    slug: "aluguel-veiculos-blindados-luxo-sao-paulo",
    tempo: "Diária com Motorista Bilíngue",
    preco: "A partir de R$ 3.800 / dia",
    link: "https://meli.la/1U3rtgV"
  },
  {
    origem: "São Paulo Congonhas / Catarina",
    destino: "Barretos Parque do Peão (Heliponto Oficial)",
    servico: "Helicoptero_Executivo",
    slug: "helicoptero-transfer-sao-paulo-barretos-festa-do-peao",
    tempo: "1h 20min",
    preco: "A partir de R$ 26.000",
    link: "https://meli.la/1U3rtgV"
  }
];

const INVESTIMENTOS_B2B = [
  {
    cidade: "São Paulo",
    tipo: "Galpao_Logistico",
    slug: "pontos-comerciais-e-terrenos-em-sao-paulo",
    area: "45.000 m² ABL",
    valor: "R$ 85.000.000",
    resumo: "Complexo logístico triple A no eixo Rodoanel / Castello Branco com docas niveladoras e pé-direito de 12m."
  },
  {
    cidade: "Campinas",
    tipo: "Terreno_Industrial",
    slug: "pontos-comerciais-e-terrenos-em-campinas",
    area: "120.000 m²",
    valor: "R$ 42.000.000",
    resumo: "Área industrial com frente para a Rodovia Anhanguera, próxima ao Aeroporto de Viracopos."
  },
  {
    cidade: "Barretos",
    tipo: "Area_Expansao_Hoteleira",
    slug: "pontos-comerciais-e-terrenos-em-barretos",
    area: "35.000 m²",
    valor: "R$ 18.500.000",
    resumo: "Área premium para implantação de resort temático ou hotel corporativo no anel viário de Barretos."
  },
  {
    cidade: "Ribeirão Preto",
    tipo: "Ponto_Comercial_Prime",
    slug: "pontos-comerciais-e-terrenos-em-ribeirao-preto",
    area: "12.000 m²",
    valor: "R$ 29.000.000",
    resumo: "Imóvel comercial de esquina na Zona Sul de Ribeirão Preto, ideal para flagship store ou centro médico."
  },
  {
    cidade: "Santos",
    tipo: "Galpao_Logistico",
    slug: "pontos-comerciais-e-terrenos-em-santos",
    area: "28.000 m²",
    valor: "R$ 38.000.000",
    resumo: "Retroárea portuária alfandegada com acesso direto ao Porto de Santos e ferrovia."
  }
];

const HEDGE_GLOBAL = [
  {
    ativo: "Seguro_Frota",
    pais: "US",
    lang: "EN",
    slug: "corporate-jet-insurance-fleet-liability",
    titulo: "Corporate Jet Insurance & Private Fleet Liability Coverage Options",
    desc: "Comprehensive worldwide aviation hull and liability insurance tailored for Fortune 500 flight departments and private aircraft management companies.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    ativo: "Transferencia_Capital",
    pais: "UK",
    lang: "EN",
    slug: "high-volume-capital-transfer-compliance",
    titulo: "High-Volume International Capital Transfer Compliance & Settlement Tools",
    desc: "Institutional cross-border FX execution, regulated escrow services, and multi-currency liquidity rails for family offices and institutional investors.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    ativo: "Offshore_Trust",
    pais: "CH",
    lang: "EN",
    slug: "cross-border-asset-protection-offshore-trust",
    titulo: "Cross-Border Asset Protection Structures & Offshore Trust Validation",
    desc: "Multi-jurisdictional fiduciary frameworks, private trust companies, and wealth preservation mechanisms for ultra-high-net-worth families.",
    link: "https://meli.la/1U3rtgV"
  }
];

const LOGISTICA_PESADA = [
  {
    cidade: "São Paulo",
    tipo: "Fretamento_Cargas_Aereas",
    slug: "sao-paulo-fretamento-industrial",
    capacidade: "Até 110 Toneladas (Boeing 747/777 Freighter)",
    sla: "Despacho Imediato em até 4 Horas"
  },
  {
    cidade: "Campinas Viracopos",
    tipo: "Contratos_Anuais_Aeronaves",
    slug: "campinas-viracopos-fretamento-industrial",
    capacidade: "Capacidade Dedicada Regular",
    sla: "SLA Operacional 99.9%"
  },
  {
    cidade: "Santos",
    tipo: "Transporte_Frotas_Pesadas",
    slug: "santos-fretamento-industrial",
    capacidade: "Cargas Indivisíveis e Sobredimensionadas",
    sla: "Escolta e Licenças Especiais DNIT"
  },
  {
    cidade: "Nacional / Corporativo",
    tipo: "Contratos_Anuais_Aeronaves",
    slug: "contratos-anuais-frotas-aereas",
    capacidade: "Bloco de Horas e Frotas Compartilhadas",
    sla: "Atendimento 24/7 Executivo"
  }
];

async function seedHighTicket() {
  console.log("🚀 Executando Povoamento das Estruturas High-Ticket B2B no Supabase...");

  // 1. Luxo
  const sqlLuxo = `
    INSERT INTO public.high_ticket_luxo_trafego (origem_hub, destino_premium, servico_luxo, slug, tempo_estimado, preco_estimado_cotacao, link_afiliado_high_ticket, status_ativo)
    VALUES
    ${LUXO_ROTAS.map(l => `('${l.origem.replace(/'/g, "''")}', '${l.destino.replace(/'/g, "''")}', '${l.servico}', '${l.slug}', '${l.tempo}', '${l.preco}', '${l.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlLuxo);
  console.log("✓ Tabela high_ticket_luxo_trafego abastecida.");

  // 2. Investimentos B2B
  const sqlInvest = `
    INSERT INTO public.investimentos_imobiliarios_b2b (cidade_polo, tipo_ativo, slug, metragem_area, valor_estimado, viabilidade_resumo, status_ativo)
    VALUES
    ${INVESTIMENTOS_B2B.map(i => `('${i.cidade.replace(/'/g, "''")}', '${i.tipo}', '${i.slug}', '${i.area}', '${i.valor}', '${i.resumo.replace(/'/g, "''")}', true)`).join(",\n")};
  `;
  await executeSQL(sqlInvest);
  console.log("✓ Tabela investimentos_imobiliarios_b2b abastecida.");

  // 3. Hedge Global
  const sqlHedge = `
    INSERT INTO public.global_hedge_infrastructure (ativo_classe, pais_origem, idioma_alvo, slug, titulo_servico, descricao_compliance, link_afiliado_high_ticket, status_ativo)
    VALUES
    ${HEDGE_GLOBAL.map(h => `('${h.ativo}', '${h.pais}', '${h.lang}', '${h.slug}', '${h.titulo.replace(/'/g, "''")}', '${h.desc.replace(/'/g, "''")}', '${h.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlHedge);
  console.log("✓ Tabela global_hedge_infrastructure abastecida.");

  // 4. Logística Pesada
  const sqlLogistica = `
    INSERT INTO public.logistica_pesada_corporativa (cidade_origem, tipo_operacao, slug, capacidade_toneladas, sla_urgencia, status_ativo)
    VALUES
    ${LOGISTICA_PESADA.map(lp => `('${lp.cidade.replace(/'/g, "''")}', '${lp.tipo}', '${lp.slug}', '${lp.capacidade}', '${lp.sla}', true)`).join(",\n")};
  `;
  await executeSQL(sqlLogistica);
  console.log("✓ Tabela logistica_pesada_corporativa abastecida.");

  console.log("🏆 Todas as 4 frentes High-Ticket B2B foram sincronizadas no Supabase!");
}

function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query: sql });
    const req = https.request({
      hostname: "api.supabase.com",
      path: "/v1/projects/efvuzxdhsirpvxclgdfg/database/query",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUPABASE_PAT}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          console.error("SQL Error:", res.statusCode, data);
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

if (require.main === module) {
  seedHighTicket().catch(console.error);
}

module.exports = { seedHighTicket, LUXO_ROTAS, INVESTIMENTOS_B2B, HEDGE_GLOBAL, LOGISTICA_PESADA };
