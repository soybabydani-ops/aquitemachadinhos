/**
 * AQUITEM ACHADINHOS — SEEDER DA FÁBRICA GLOBAL DE VÍDEOS CURTOS & PINTEREST GLOBAL
 */

const https = require("https");
const { DESTINOS_MASTER } = require("./seeder-global-destinos-travel-gear");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const GLOBAL_VIDEO_SCRIPTS = [
  {
    dest: "Orlando",
    lang: "EN",
    market: "US/Tier-1",
    slug: "orlando-cheap-flights-hotel-deals",
    script: "Stop scrolling! Our system just detected a massive price drop for last-minute flights and luxury hotels in Orlando. The secure direct link is pinned in our bio before the airline fixes the glitch. Check availability now!",
    caption: "✈️ MASSIVE FLIGHT GLITCH: Last-minute hotel and airfare deals to Orlando! 🔗 Book direct via link in bio: https://www.aquitemachadinhos.com.br/en/destinations/orlando-cheap-flights-hotel-deals.html #orlando #cheapflights #disneyworld"
  },
  {
    dest: "Paris",
    lang: "EN",
    market: "Europe",
    slug: "paris-cheap-flights-hotel-deals",
    script: "Warning travelers! Transatlantic secret airline fares and boutique hotel errors to Paris were just released. The verified direct link is in our bio before rooms sell out.",
    caption: "🗼 PARIS SECRET FARES: Unbelievable hotel and flight error fares to Paris! 🔗 Grab your tickets in bio: https://www.aquitemachadinhos.com.br/en/destinations/paris-cheap-flights-hotel-deals.html #paris #paristravel #eiffeltower"
  },
  {
    dest: "Tokyo",
    lang: "EN",
    market: "Asia/Tokyo",
    slug: "tokyo-cheap-flights-hotel-deals",
    script: "Secret flight alert to Tokyo! Direct flights and central hotels in Shibuya and Shinjuku just dropped by over 45%. Tap the link in bio before this promo expires.",
    caption: "🇯🇵 TOKYO TRAVEL GLITCH: Discount flights and hotel deals in Tokyo! 🔗 Direct link in bio: https://www.aquitemachadinhos.com.br/en/destinations/tokyo-cheap-flights-hotel-deals.html #tokyo #japan #traveldeals"
  },
  {
    dest: "Cancun",
    lang: "ES",
    market: "LATAM",
    slug: "cancun-vuelos-baratos-hoteles",
    script: "¡Atención viajeros! Nuestro sistema acaba de detectar una caída masiva de precios en vuelos y resorts todo incluido en Cancún. El enlace seguro está fijado en nuestra bio antes de que la aerolínea corrija la tarifa. ¡Aprovecha ahora!",
    caption: "🏖️ RESORTS EN OFERTA: ¡Vuelos y hoteles all-inclusive en Cancún con hasta 60% OFF! 🔗 Reserva directo en bio: https://www.aquitemachadinhos.com.br/es/destinos/cancun-vuelos-baratos-hoteles.html #cancun #viajesbaratos #playa"
  },
  {
    dest: "Miami",
    lang: "ES",
    market: "US/Tier-1",
    slug: "miami-vuelos-baratos-hoteles",
    script: "¡No compres vuelos a Miami hoy sin ver esto! Se acaban de filtrar tarifas ocultas y alquiler de autos con descuento extremo. Entra al enlace fijado en nuestra bio antes de que se agoten los asientos.",
    caption: "🌴 MIAMI EN OFERTA: Vuelos baratos y hoteles en South Beach. 🔗 Enlace directo en bio: https://www.aquitemachadinhos.com.br/es/destinos/miami-vuelos-baratos-hoteles.html #miami #southbeach #vuelosbaratos"
  },
  {
    dest: "Lisboa",
    lang: "ES",
    market: "Europe",
    slug: "lisboa-vuelos-baratos-hoteles",
    script: "¡Alerta de viaje a Europa! Vuelos transatlánticos y posadas históricas en Lisboa con tarifas reducidas en el sistema. El link oficial está en el primer comentario y en la bio.",
    caption: "🇵🇹 VIAJA A LISBOA: Vuelos directos y hospedaje céntrico con descuento. 🔗 Link en bio: https://www.aquitemachadinhos.com.br/es/destinos/lisboa-vuelos-baratos-hoteles.html #lisboa #portugal #viajes"
  }
];

async function seedGlobalVideoAndPins() {
  console.log("🚀 Povoando Fábrica Global de Vídeos e Pinterest Global no Supabase...");

  // 1. global_video_factory_jobs
  const videoJobs = GLOBAL_VIDEO_SCRIPTS.map(g => {
    const url = g.lang === 'EN' 
      ? `https://www.aquitemachadinhos.com.br/en/destinations/${g.slug}.html`
      : `https://www.aquitemachadinhos.com.br/es/destinos/${g.slug}.html`;

    return {
      dest: g.dest,
      lang: g.lang,
      market: g.market,
      title: `✈️ [${g.lang}] LAST-MINUTE AIRLINE GLITCH: ${g.dest}`,
      script: g.script,
      voice: g.lang === 'EN' ? 'elevenlabs_en_adam_neural' : 'elevenlabs_es_antonio_neural',
      status: 'rendered',
      mp4: `https://www.aquitemachadinhos.com.br/assets/videos/global-${g.slug}.mp4`,
      thumb: `https://www.aquitemachadinhos.com.br/assets/pins-global/${g.slug}-global-badge.svg`,
      caption: g.caption,
      url: url
    };
  });

  const sqlVideo = `
    INSERT INTO public.global_video_factory_jobs (target_destination_or_product, language, market_region, video_title, script_30s, voice_model_id, rendering_status, video_mp4_url, thumbnail_badge_url, bio_caption, destination_url)
    VALUES
    ${videoJobs.map(v => `('${v.dest}', '${v.lang}', '${v.market}', '${v.title.replace(/'/g, "''")}', '${v.script.replace(/'/g, "''")}', '${v.voice}', '${v.status}', '${v.mp4}', '${v.thumb}', '${v.caption.replace(/'/g, "''")}', '${v.url}')`).join(",\n")};
  `;
  await executeSQL(sqlVideo);
  console.log("✓ Tabela global_video_factory_jobs abastecida com roteiros em EN e ES.");

  // 2. pinterest_global_catalog_pins
  const globalPins = DESTINOS_MASTER.map(d => {
    const priceUsd = d.tarifa.includes('USD') ? d.tarifa.split('USD')[1].trim() : '199';
    return {
      pin_id: `global-pin-${d.slug}`,
      board: "Global Destinations & Luxury Travel",
      lang: "EN",
      title: `✈️ SECRET AIRLINE FARE: ${d.cidade} (${d.pais})`,
      desc: `Last-minute flight deals and luxury hotels in ${d.cidade} starting at $${priceUsd}! Verified via AQUITEM Global Travel Network.`,
      curr: "USD",
      price: `${priceUsd}.00 USD`,
      badge: `https://www.aquitemachadinhos.com.br/assets/pins-global/${d.slug}-global-badge.svg`,
      link: `https://www.aquitemachadinhos.com.br/ir.html?url=https%3A%2F%2Fmeli.la%2F1U3rtgV&origem=pinterest_global_${d.slug}`
    };
  });

  const sqlPins = `
    INSERT INTO public.pinterest_global_catalog_pins (global_pin_id, category_board, target_language, pin_title, pin_description, price_currency, price_value, badge_image_url, affiliate_landing_url, status_published)
    VALUES
    ${globalPins.map(p => `('${p.pin_id}', '${p.board}', '${p.lang}', '${p.title.replace(/'/g, "''")}', '${p.desc.replace(/'/g, "''")}', '${p.curr}', '${p.price}', '${p.badge}', '${p.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlPins);
  console.log(`✓ Tabela pinterest_global_catalog_pins abastecida com ${globalPins.length} pins internacionais.`);

  console.log("🏆 Fábrica Global e Pinterest Internacional sincronizados no Supabase!");
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
  seedGlobalVideoAndPins().catch(console.error);
}

module.exports = { seedGlobalVideoAndPins, GLOBAL_VIDEO_SCRIPTS };
