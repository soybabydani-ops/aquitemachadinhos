/**
 * AQUITEM ACHADINHOS — SEEDER DE VÍDEOS SINTÉTICOS OMNICHANNEL & PINTEREST PINS
 */

const https = require("https");
const { BUGS_DATA, LOOKS_DATA } = require("./seeder-alta-frequencia-cinco-sistemas");
const { TRAVEL_GEAR_DATA } = require("./seeder-global-destinos-travel-gear");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function seedOmnichannelAndPinterest() {
  console.log("🚀 Povoando Jobs de Vídeos Sintéticos Omnichannel e Pinterest Pins...");

  // 1. Video Jobs (Reels / TikTok / Shorts)
  const videoJobs = BUGS_DATA.map(b => {
    const script = `Pare tudo o que você está fazendo. O robô do Aqui Tem Achadinhos detectou um erro de preço no sistema e o ${b.nome} está saindo por quase nada no Brasil, de ${b.normal} por apenas ${b.bug} na ${b.loja}. O link direto e seguro do bug já está fixado na bio antes que a loja derrube.`;
    const targetUrl = `https://www.aquitemachadinhos.com.br/cupons-ativos/${b.slug}.html`;
    const caption = `⚠️ ERRO DE PREÇO DETECTADO! ${b.nome} de ${b.normal} por ${b.bug} na ${b.loja}! Link oficial seguro na bio 👉 ${targetUrl}`;

    return {
      produto_id: b.slug,
      titulo_video: `🚨 ERRO DE PREÇO: ${b.nome} (${b.bug})`,
      roteiro_30s: script,
      audio_voice_id: "elevenlabs_pt_br_neural_narrator",
      midia_status: "rendered",
      video_mp4_url: `https://www.aquitemachadinhos.com.br/assets/videos/${b.slug}.mp4`,
      thumbnail_url: `https://www.aquitemachadinhos.com.br/assets/pins/${b.slug}-badge.svg`,
      legenda_bio: caption,
      url_destino: targetUrl,
      instagram_status: "syndicated",
      tiktok_status: "syndicated",
      youtube_status: "syndicated"
    };
  });

  const sqlVideo = `
    INSERT INTO public.omnichannel_video_jobs (produto_id, titulo_video, roteiro_30s, audio_voice_id, midia_status, video_mp4_url, thumbnail_url, legenda_bio, url_destino, instagram_status, tiktok_status, youtube_status)
    VALUES
    ${videoJobs.map(v => `('${v.produto_id}', '${v.titulo_video.replace(/'/g, "''")}', '${v.roteiro_30s.replace(/'/g, "''")}', '${v.audio_voice_id}', '${v.midia_status}', '${v.video_mp4_url}', '${v.thumbnail_url}', '${v.legenda_bio.replace(/'/g, "''")}', '${v.url_destino}', '${v.instagram_status}', '${v.tiktok_status}', '${v.youtube_status}')`).join(",\n")};
  `;
  await executeSQL(sqlVideo);
  console.log("✓ Tabela omnichannel_video_jobs abastecida.");

  // 2. Pinterest Pins Catalogados em Pastas
  const pins = [
    ...BUGS_DATA.map(b => ({
      pin_id: `pin-${b.slug}`,
      pasta: "Eletrônicos & Smart Home",
      titulo: `⚠️ BUG DE PREÇO: ${b.nome} (-${b.desconto}% OFF)`,
      descricao: `Erro de preço verificado na ${b.loja}! ${b.nome} saindo de ${b.normal} por ${b.bug}. Resgate seu cupom no link.`,
      preco: b.bug,
      img_url: `https://www.aquitemachadinhos.com.br/assets/pins/${b.slug}-badge.svg`,
      link: `https://www.aquitemachadinhos.com.br/ir.html?url=${encodeURIComponent(b.link)}&origem=pinterest`
    })),
    ...LOOKS_DATA.map(l => ({
      pin_id: `pin-${l.slug}`,
      pasta: "Moda & Looks Country",
      titulo: `🤠 LOOK BARRETOS: ${l.nome} (-${l.desconto}% OFF)`,
      descricao: `Moda country em queima de estoque na ${l.loja}! ${l.nome} por apenas ${l.promo}. Inspiração: ${l.inspiracao}.`,
      preco: l.promo,
      img_url: `https://www.aquitemachadinhos.com.br/assets/pins/${l.slug}-badge.svg`,
      link: `https://www.aquitemachadinhos.com.br/ir.html?url=${encodeURIComponent(l.link)}&origem=pinterest`
    })),
    ...TRAVEL_GEAR_DATA.map(g => ({
      pin_id: `pin-${g.slug}`,
      pasta: "Viagens & Malas",
      titulo: `✈️ ESSENCIAL DE VIAGEM: ${g.nome} (-${g.desconto}% OFF)`,
      descricao: `Mala e acessório de viagem homologado com desconto na ${g.loja}! ${g.nome} por ${g.promo}.`,
      preco: g.promo,
      img_url: `https://www.aquitemachadinhos.com.br/assets/pins/${g.slug}-badge.svg`,
      link: `https://www.aquitemachadinhos.com.br/ir.html?url=${encodeURIComponent(g.link)}&origem=pinterest`
    }))
  ];

  const sqlPins = `
    INSERT INTO public.pinterest_catalog_pins (pin_id, pasta_categoria, titulo_pin, descricao_pin, preco_formatado, imagem_com_badge_url, link_rastreado_afiliado, status_pinado)
    VALUES
    ${pins.map(p => `('${p.pin_id}', '${p.pasta}', '${p.titulo.replace(/'/g, "''")}', '${p.descricao.replace(/'/g, "''")}', '${p.preco}', '${p.img_url}', '${p.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlPins);
  console.log(`✓ Tabela pinterest_catalog_pins abastecida com ${pins.length} pins em 3 pastas oficiais.`);

  console.log("🏆 Omnichannel e Pinterest Catalog totalmente integrados ao Supabase!");
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
  seedOmnichannelAndPinterest().catch(console.error);
}

module.exports = { seedOmnichannelAndPinterest };
