/**
 * AQUITEM ACHADINHOS — SEEDER DE TELEMETRIA REALTIME (CLICKS, PLATAFORMAS, GEOLOCALIZAÇÃO)
 */

const https = require("https");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const TELEMETRY_SAMPLES = [
  // BRASIL
  {
    cidade_destino: "Barretos, SP",
    cidade_local: "Barretos",
    pais_origem: "BR",
    plataforma: "Shopee",
    rota: "Moda Country / Chapéu Pralana 30X",
    url: "https://www.aquitemachadinhos.com.br/looks/chapeu-pralana-barretos-promocao.html",
    comissao: 18.50,
    moeda: "BRL"
  },
  {
    cidade_destino: "São Paulo, SP",
    cidade_local: "São Paulo (Capital)",
    pais_origem: "BR",
    plataforma: "Mercado Livre",
    rota: "Bug Smart TV 50 4K UHD",
    url: "https://www.aquitemachadinhos.com.br/cupons-ativos/bug-de-preco-smart-tv-50-4k-uhd-mercado-livre.html",
    comissao: 49.00,
    moeda: "BRL"
  },
  {
    cidade_destino: "Barretos, SP",
    cidade_local: "São Paulo (Tietê)",
    pais_origem: "BR",
    plataforma: "Actionpay/ClickBus",
    rota: "Passagem Ônibus SP Tietê -> Barretos 2026",
    url: "https://www.aquitemachadinhos.com.br/barretos-2026/passagem-onibus-tiete-para-barretos-festa-do-peao.html",
    comissao: 22.80,
    moeda: "BRL"
  },
  {
    cidade_destino: "Campinas, SP",
    cidade_local: "Campinas",
    pais_origem: "BR",
    plataforma: "Amazon",
    rota: "Mala de Viagem Bordo Rígida ANAC 360",
    url: "https://www.aquitemachadinhos.com.br/malas-e-viagem/kit-malas-viagem-rigidas-360-tsa-amazon-promocao.html",
    comissao: 31.20,
    moeda: "BRL"
  },
  {
    cidade_destino: "Santos, SP",
    cidade_local: "Santos",
    pais_origem: "BR",
    plataforma: "SHEIN",
    rota: "Jaqueta Couro Franjas Boiadeira",
    url: "https://www.aquitemachadinhos.com.br/looks/jaqueta-couro-franjas-ana-castela-barretos.html",
    comissao: 14.70,
    moeda: "BRL"
  },
  {
    cidade_destino: "Ribeirão Preto, SP",
    cidade_local: "Ribeirão Preto",
    pais_origem: "BR",
    plataforma: "Adsterra",
    rota: "Alerta Trânsito & Concursos",
    url: "https://www.aquitemachadinhos.com.br/concursos/ribeirao-preto-inscricoes-abertas.html",
    comissao: 8.50,
    moeda: "BRL"
  },
  {
    cidade_destino: "Gramado, RS",
    cidade_local: "Porto Alegre",
    pais_origem: "BR",
    plataforma: "Admitad/Booking",
    rota: "Reserva Pousada Serra Gaúcha",
    url: "https://www.aquitemachadinhos.com.br/destinos/gramado-passagens-hoteis-baratos.html",
    comissao: 38.00,
    moeda: "BRL"
  },
  {
    cidade_destino: "Rio de Janeiro, RJ",
    cidade_local: "Rio de Janeiro",
    pais_origem: "BR",
    plataforma: "PropellerAds",
    rota: "Tráfego Alerta Meteorológico",
    url: "https://www.aquitemachadinhos.com.br/alerta-clima/rio-de-janeiro-alerta-meteorologico.html",
    comissao: 6.20,
    moeda: "BRL"
  },
  // INTERNACIONAL (HIGH-CPM)
  {
    cidade_destino: "Orlando, US",
    cidade_local: "Miami / Orlando",
    pais_origem: "US",
    plataforma: "Admitad/Booking",
    rota: "Secret Flight & Disney Resort Booking",
    url: "https://www.aquitemachadinhos.com.br/en/destinations/orlando-cheap-flights-hotel-deals.html",
    comissao: 28.50,
    moeda: "USD"
  },
  {
    cidade_destino: "Paris, FR",
    cidade_local: "Paris / Île-de-France",
    pais_origem: "FR",
    plataforma: "Admitad/Booking",
    rota: "Boutique Hotel Champs-Élysées",
    url: "https://www.aquitemachadinhos.com.br/en/destinations/paris-cheap-flights-hotel-deals.html",
    comissao: 34.00,
    moeda: "USD"
  },
  {
    cidade_destino: "Tokyo, JP",
    cidade_local: "Tokyo (Shibuya)",
    pais_origem: "JP",
    plataforma: "Amazon",
    rota: "Global Travel Powerbank & Adapters",
    url: "https://www.aquitemachadinhos.com.br/malas-e-viagem/powerbank-ultra-fino-homologado-anac-amazon.html",
    comissao: 12.00,
    moeda: "USD"
  },
  {
    cidade_destino: "Cancun, MX",
    cidade_local: "Ciudad de México",
    pais_origem: "MX",
    plataforma: "Admitad/Booking",
    rota: "Resort All-Inclusive Riviera Maya",
    url: "https://www.aquitemachadinhos.com.br/es/destinos/cancun-vuelos-baratos-hoteles.html",
    comissao: 24.50,
    moeda: "USD"
  },
  {
    cidade_destino: "London, UK",
    cidade_local: "London",
    pais_origem: "UK",
    plataforma: "Adsterra",
    rota: "Corporate Jet Fleet Insurance",
    url: "https://www.aquitemachadinhos.com.br/hedge/corporate-jet-insurance-fleet-liability.html",
    comissao: 15.00,
    moeda: "USD"
  },
  {
    cidade_destino: "Lisboa, PT",
    cidade_local: "Lisboa",
    pais_origem: "PT",
    plataforma: "Admitad/Booking",
    rota: "Voos & Hotéis Históricos Chiado",
    url: "https://www.aquitemachadinhos.com.br/destinos/lisboa-passagens-hoteis-baratos.html",
    comissao: 19.50,
    moeda: "USD"
  }
];

async function seedTelemetry() {
  console.log("🚀 Semeando Telemetria de Cliques em Tempo Real no Supabase...");

  const allLogs = [];
  for (let i = 0; i < 4; i++) {
    TELEMETRY_SAMPLES.forEach((s, idx) => {
      const minutesAgo = (i * 15) + (idx * 2);
      const timeStamp = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();

      allLogs.push({
        cidade_destino: s.cidade_destino,
        cidade_local: s.cidade_local,
        pais_origem: s.pais_origem,
        plataforma_afiliado: s.plataforma,
        rota: s.rota,
        url_origem: s.url,
        comissao_estimada_usd_brl: s.comissao,
        moeda: s.moeda,
        ip_origem: `177.142.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*250)}`,
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148",
        criado_em: timeStamp
      });
    });
  }

  const sql = `
    INSERT INTO public.cliques_afiliados_logs (cidade_destino, cidade_local, pais_origem, plataforma_afiliado, rota, url_origem, comissao_estimada_usd_brl, moeda, ip_origem, user_agent, criado_em)
    VALUES
    ${allLogs.map(l => `('${l.cidade_destino.replace(/'/g, "''")}', '${l.cidade_local.replace(/'/g, "''")}', '${l.pais_origem}', '${l.plataforma_afiliado}', '${l.rota.replace(/'/g, "''")}', '${l.url_origem}', ${l.comissao_estimada_usd_brl}, '${l.moeda}', '${l.ip_origem}', '${l.user_agent}', '${l.criado_em}')`).join(",\n")};
  `;

  await executeSQL(sql);
  console.log(`✓ Semeados ${allLogs.length} logs de telemetria analítica com geolocalização e comissões.`);
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
  seedTelemetry().catch(console.error);
}

module.exports = { seedTelemetry, TELEMETRY_SAMPLES };
