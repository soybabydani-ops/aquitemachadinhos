/**
 * AQUITEM ACHADINHOS — SEEDER MESTRE DE ROTEIROS VIRAIS (YOUTUBE SHORTS / FACELESS ENGINE)
 * Roteiros de 30 segundos com gatilhos de quebra de padrão e escassez para vozes sintéticas.
 */

const https = require("https");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const YOUTUBE_SHORTS_SCRIPTS = [
  {
    tipo: "Bug_Produto",
    titulo: "🚨 ERRO DE PREÇO: Air Fryer 8L Touch saindo por R$ 139 na Shopee",
    roteiro: "Não compre nada na Shopee hoje antes de ver isso. O robô do Aqui Tem Achadinhos rastreou uma brecha no sistema e a Fritadeira Air Fryer 8L Digital Inox está saindo por apenas R$ 139,90, mais de 70% de desconto real. O link oficial do bug seguro está no primeiro comentário fixado antes que o sistema derrube. Corre enquanto ainda tem estoque!",
    comentario: "🚨 LINK DO BUG LIBERADO: Pegue aqui a Air Fryer 8L por R$ 139 antes que corrijam 👉 https://www.aquitemachadinhos.com.br/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html",
    url: "https://www.aquitemachadinhos.com.br/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html"
  },
  {
    tipo: "Barretos",
    titulo: "⚠️ Alerta de Viagem urgente para Barretos 2026: Lote Residual Aberto",
    roteiro: "⚠️ Alerta de Viagem urgente para Barretos: O lote de assentos residuais de passagens de ônibus de São Paulo Tietê e vans bate-volta acabou de abrir no sistema oficial com tarifa promocional. Quem deixar para a última hora vai pagar o triplo. O link direto de reserva sem taxas e o guia de biometria facial estão no comentário fixado.",
    comentario: "🤠 GUIA & PASSAGENS BARRETOS: Consulte horários de ônibus e cadastro de biometria aqui 👉 https://www.aquitemachadinhos.com.br/barretos-2026/biometria-facial-festa-do-peao-barretos.html",
    url: "https://www.aquitemachadinhos.com.br/barretos-2026/biometria-facial-festa-do-peao-barretos.html"
  },
  {
    tipo: "Bug_Produto",
    titulo: "🔥 QUEIMA DE ESTOQUE: Smart TV 50 4K no Mercado Livre Full",
    roteiro: "Para tudo o que você está fazendo. O radar de descontos do Aqui Tem Achadinhos encontrou um cupom relâmpago para Smart TV 50 Polegadas 4K no Mercado Livre Full com 60% de desconto e entrega no dia seguinte. O link direto com o cupom aplicado está no primeiro comentário fixado.",
    comentario: "⚡ RESGATE SEU CUPOM: Smart TV 50 4K com entrega rápida no link fixado 👉 https://www.aquitemachadinhos.com.br/cupons-ativos/bug-de-preco-smart-tv-50-4k-uhd-mercado-livre.html",
    url: "https://www.aquitemachadinhos.com.br/cupons-ativos/bug-de-preco-smart-tv-50-4k-uhd-mercado-livre.html"
  },
  {
    tipo: "Alerta_Viagem",
    titulo: "✈️ TARIFA SECRETA: Passagens para Orlando e Paris saindo de SP",
    roteiro: "Se você quer viajar para o exterior pagando tarifa de voo nacional, preste muita atenção. O robô global de destinos localizou passagens aéreas e hotéis para Orlando e Paris com brecha de tarifa. O link com a rota oculta e a lista de pacotes está no primeiro comentário fixado.",
    comentario: "🌍 ROTA SECRETA LIBERADA: Veja passagens e hotéis com desconto para Orlando e Paris 👉 https://www.aquitemachadinhos.com.br/destinos/orlando-passagens-hoteis-baratos.html",
    url: "https://www.aquitemachadinhos.com.br/destinos/orlando-passagens-hoteis-baratos.html"
  },
  {
    tipo: "Concurso",
    titulo: "📝 CONCURSO ABERTO: Vagas na Prefeitura com Salários até R$ 14.500",
    roteiro: "Saiu edital oficial de concurso público municipal com dezenas de vagas abertas para Guarda Municipal, Administrativo, Saúde e Professores. As inscrições já estão abertas e encerram este mês. Acesse o quadro de vagas e o link do edital oficial no primeiro comentário fixado.",
    comentario: "📝 EDITAL COMPLETO & VAGAS: Confira os salários e cargos abertos aqui 👉 https://www.aquitemachadinhos.com.br/concursos/barretos-inscricoes-abertas.html",
    url: "https://www.aquitemachadinhos.com.br/concursos/barretos-inscricoes-abertas.html"
  },
  {
    tipo: "Clima",
    titulo: "🚨 ALERTA METEOROLÓGICO: Tempestade Severa e Ventos Fortes",
    roteiro: "Aviso de emergência da Defesa Civil e INMET para hoje: tempestades severas com rajadas de vento e risco de alagamentos na região. Evite estacionar sob árvores e siga as orientações de segurança. Confira o boletim meteorológico completo no comentário fixado.",
    comentario: "⚠️ BOLETIM METEOROLÓGICO AO VIVO: Consulte o radar de alertas da Defesa Civil 👉 https://www.aquitemachadinhos.com.br/alerta-clima/barretos-alerta-meteorologico.html",
    url: "https://www.aquitemachadinhos.com.br/alerta-clima/barretos-alerta-meteorologico.html"
  }
];

async function seedShortsAndOmnichannel() {
  console.log("🚀 Povoando Tabelas de Roteiros Virais YouTube Shorts no Supabase...");

  // 1. automacao_youtube_roteiros
  const sqlYt = `
    INSERT INTO public.automacao_youtube_roteiros (tipo_alerta, titulo_video, texto_roteiro, primeiro_comentario_fixado, url_destino_site, status_gerado)
    VALUES
    ${YOUTUBE_SHORTS_SCRIPTS.map(s => `('${s.tipo}', '${s.titulo.replace(/'/g, "''")}', '${s.roteiro.replace(/'/g, "''")}', '${s.comentario.replace(/'/g, "''")}', '${s.url}', true)`).join(",\n")};
  `;
  await executeSQL(sqlYt);
  console.log("✓ Tabela automacao_youtube_roteiros abastecida.");

  // 2. automacao_videos_roteiros
  const sqlOmni = `
    INSERT INTO public.automacao_videos_roteiros (produto_viagem_id, tipo_midia, texto_roteiro_curto, audio_duracao_est, url_destino, status_sincronizado)
    VALUES
    ${YOUTUBE_SHORTS_SCRIPTS.map(s => `('${s.tipo.toLowerCase()}', 'Shorts_Reels_TikTok', '${s.roteiro.replace(/'/g, "''")}', '30s', '${s.url}', true)`).join(",\n")};
  `;
  await executeSQL(sqlOmni);
  console.log("✓ Tabela automacao_videos_roteiros abastecida.");

  console.log("🏆 Ecossistema de Vídeos Fantasmas e Shorts 100% pronto no Supabase!");
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
  seedShortsAndOmnichannel().catch(console.error);
}

module.exports = { seedShortsAndOmnichannel, YOUTUBE_SHORTS_SCRIPTS };
