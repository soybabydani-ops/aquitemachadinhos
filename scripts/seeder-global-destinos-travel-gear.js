/**
 * AQUITEM ACHADINHOS — SEEDER MESTRE DE DESTINOS GLOBAIS & MALAS DE VIAGEM
 */

const https = require("https");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const DESTINOS_MASTER = [
  // INTERNACIONAIS
  {
    cidade: "Orlando",
    pais: "Estados Unidos",
    slug: "orlando",
    sazon: "Ano_Todo",
    tarifa: "R$ 1.890 / USD 370",
    hotel: "Resorts próximos aos Parques Disney e Universal com transfer incluso.",
    desc_pt: "Tarifas ocultas de passagens aéreas e hotéis baratos em Orlando. Dicas de ingressos para parques da Disney e compras nos Premium Outlets.",
    desc_en: "Last-minute flight deals and hotel errors to Orlando. Exclusive discount tickets to Disney & Universal Studios.",
    desc_es: "Vuelos baratos de última hora y hospedajes económicos en Orlando. Guía de compras y parques temáticos."
  },
  {
    cidade: "Paris",
    pais: "França",
    slug: "paris",
    sazon: "Ano_Todo",
    tarifa: "R$ 2.450 / EUR 420",
    hotel: "Hotéis charmosos e bem localizados próximos à Torre Eiffel, Louvre e estações de metrô.",
    desc_pt: "Bugs de passagens e tarifas ocultas para Paris. Como economizar em hospedagem, museus e gastronomia na Cidade Luz.",
    desc_en: "Secret flight fares and cheap hotel rooms in Paris. Tips for Louvre, Eiffel Tower, and metro passes.",
    desc_es: "Vuelos baratos y hoteles con descuento en París. Guía completa para visitar la Torre Eiffel y museos."
  },
  {
    cidade: "Miami",
    pais: "Estados Unidos",
    slug: "miami",
    sazon: "Verão",
    tarifa: "R$ 1.680 / USD 330",
    hotel: "Hotéis boutique à beira-mar em South Beach e hotéis executivos em Downtown Miami / Brickell.",
    desc_pt: "Passagens aéreas em promoção relâmpago e aluguel de carros baratos em Miami. Dicas de compras em Sawgrass Mills.",
    desc_en: "Last-minute flights and hidden car rentals in Miami. Best beachfront hotels in South Beach.",
    desc_es: "Vuelos económicos y alquiler de autos baratos en Miami. Playas de South Beach y compras en outlets."
  },
  {
    cidade: "Lisboa",
    pais: "Portugal",
    slug: "lisboa",
    sazon: "Ano_Todo",
    tarifa: "R$ 2.190 / EUR 380",
    hotel: "Pousadas históricas e hotéis modernos no Chiado, Baixa Pombalina e Avenida da Liberdade.",
    desc_pt: "Voos diretos e conexões baratas para Lisboa. Melhores bairros para se hospedar e roteiro gastronômico com pastéis de Belém.",
    desc_en: "Cheap transatlantic flights and cozy guesthouses in Lisbon. Complete guide to historic trams and gastronomy.",
    desc_es: "Vuelos directos y hoteles en Lisboa. Rutas gastronómicas y transporte turístico."
  },
  {
    cidade: "Cancun",
    pais: "México",
    slug: "cancun",
    sazon: "Verão",
    tarifa: "R$ 1.950 / USD 380",
    hotel: "Resorts all-inclusive à beira do mar do Caribe na Zona Hoteleira e Playa del Carmen.",
    desc_pt: "Pacotes promocionais e resorts com até 60% de desconto em Cancun. Passeios em Chichén Itzá e cenotes naturais.",
    desc_en: "All-inclusive resort price glitches and flight deals to Cancun. Caribbean beaches and Mayan ruins tours.",
    desc_es: "Resorts todo incluido en oferta y vuelos baratos a Cancún. Playas del Caribe y excursiones."
  },
  {
    cidade: "Nova York",
    pais: "Estados Unidos",
    slug: "nova-york",
    sazon: "Ano_Todo",
    tarifa: "R$ 2.100 / USD 410",
    hotel: "Hotéis centrais em Manhattan, Times Square e opções econômicas em Long Island City / Brooklyn.",
    desc_pt: "Tarifas reduzidas para Nova York. Ingressos para musicais da Broadway, mirantes e transporte de metrô 24h.",
    desc_en: "Secret flight fares and discount Broadway tickets in New York City. Best hotels near Times Square and Central Park.",
    desc_es: "Vuelos baratos y hoteles en Nueva York. Guía de Times Square, Broadway y museos."
  },
  {
    cidade: "Londres",
    pais: "Reino Unido",
    slug: "londres",
    sazon: "Ano_Todo",
    tarifa: "R$ 2.580 / GBP 390",
    hotel: "Hotéis com fácil acesso ao metrô (The Tube) em Kensington, Soho e City of London.",
    desc_pt: "Bugs de passagens para Londres. Dicas de atrações gratuitas como British Museum e transporte com cartão contactless.",
    desc_en: "Last-minute flights and hotel deals in London. Top free museums, Big Ben, and tube guide.",
    desc_es: "Vuelos baratos a Londres y hoteles céntricos. Museos gratuitos y transporte."
  },
  {
    cidade: "Roma",
    pais: "Itália",
    slug: "roma",
    sazon: "Ano_Todo",
    tarifa: "R$ 2.390 / EUR 410",
    hotel: "Hotéis e bed & breakfasts próximos ao Coliseu, Fontana di Trevi e Estação Termini.",
    desc_pt: "Passagens baratas e hospedagens charmosas em Roma. Roteiro histórico e gastronômico sem filas.",
    desc_en: "Flight deals and historic boutique hotels in Rome. Colosseum and Vatican skip-the-line tips.",
    desc_es: "Vuelos baratos y hoteles en Roma. Guía del Coliseo, Vaticano y restaurantes."
  },
  {
    cidade: "Buenos Aires",
    pais: "Argentina",
    slug: "buenos-aires",
    sazon: "Ano_Todo",
    tarifa: "R$ 890 / USD 170",
    hotel: "Hotéis e apart-hotéis elegantes em Palermo Soho, Recoleta e Puerto Madero.",
    desc_pt: "Passagens baratas para Buenos Aires com excelente câmbio. Melhores carnes, shows de tango e compras.",
    desc_en: "Cheap regional flights and top boutique hotels in Buenos Aires. Tango shows and steakhouse guide.",
    desc_es: "Vuelos económicos y hospedaje en Buenos Aires. Guía de tango y gastronomía porteña."
  },
  {
    cidade: "Santiago",
    pais: "Chile",
    slug: "santiago",
    sazon: "Inverno",
    tarifa: "R$ 950 / USD 180",
    hotel: "Hotéis modernos em Providencia e Las Condes com vista para a Cordilheira dos Andes.",
    desc_pt: "Voos promocionais para Santiago do Chile. Passeios para vinícolas no Vale do Maipo e estações de esqui (Valle Nevado).",
    desc_en: "Flight deals to Santiago and ski resort tours in the Andes mountains. Wine tasting in Maipo Valley.",
    desc_es: "Vuelos baratos a Santiago de Chile. Excursiones a la nieve y viñedos."
  },
  {
    cidade: "Bariloche",
    pais: "Argentina",
    slug: "bariloche",
    sazon: "Inverno",
    tarifa: "R$ 1.450 / USD 280",
    hotel: "Cabañas alpinas e resorts de neve à beira do Lago Nahuel Huapi e Cerro Catedral.",
    desc_pt: "Temporada de neve em Bariloche com tarifas imperdíveis. Esqui no Cerro Catedral e fábricas de chocolates artesanais.",
    desc_en: "Snow season deals in Bariloche. Skiing at Cerro Catedral and lakeside alpine lodges.",
    desc_es: "Temporada de nieve en Bariloche. Hoteles frente al lago y esquí en Cerro Catedral."
  },
  // POLOS TURÍSTICOS BRASIL
  {
    cidade: "Gramado",
    pais: "Brasil",
    slug: "gramado",
    sazon: "Inverno",
    tarifa: "R$ 490",
    hotel: "Pousadas coloniais charmosas e resorts temáticos na Serra Gaúcha.",
    desc_pt: "Bugs de passagens para Porto Alegre/Gramado e ingressos para o Natal Luz. Melhores fondues e parques cobertos.",
    desc_en: "Hidden flight and hotel discounts to Gramado. European architecture, winter festivals, and chocolate factories.",
    desc_es: "Vuelos baratos y posadas en Gramado. Festival navideño Natal Luz y gastronomía de montaña."
  },
  {
    cidade: "Rio de Janeiro",
    pais: "Brasil",
    slug: "rio-de-janeiro",
    sazon: "Verão",
    tarifa: "R$ 290",
    hotel: "Hotéis com vista para o mar em Copacabana, Ipanema e hotéis boutique em Santa Teresa.",
    desc_pt: "Tarifas de ponte aérea e hotéis baratos no Rio de Janeiro. Cristo Redentor, Pão de Açúcar e praias da Zona Sul.",
    desc_en: "Cheap flights and beachside hotels in Rio de Janeiro. Christ the Redeemer and Copacabana beach guide.",
    desc_es: "Vuelos baratos y hoteles en Río de Janeiro. Cristo Redentor y playas de Copacabana."
  },
  {
    cidade: "Campos do Jordão",
    pais: "Brasil",
    slug: "campos-do-jordao",
    sazon: "Inverno",
    tarifa: "R$ 190 (Ônibus/Carro)",
    hotel: "Pousadas com lareira no Capivari e chalés com vista panorâmica da Serra da Mantiqueira.",
    desc_pt: "Temporada de inverno em Campos do Jordão. Passeios no Capivari, chocolates e fondue com diárias reduzidas.",
    desc_en: "Winter mountain escape in Campos do Jordão. Bavarian-style village and cozy fireplace lodges.",
    desc_es: "Escapada de invierno en Campos do Jordão. Chalets con chimenea y gastronomía alpina."
  },
  {
    cidade: "Fernando de Noronha",
    pais: "Brasil",
    slug: "fernando-de-noronha",
    sazon: "Ano_Todo",
    tarifa: "R$ 1.350",
    hotel: "Pousadas ecológicas e pousadas domiciliares acolhedoras na Vila dos Remédios e Floresta Nova.",
    desc_pt: "Passagens aéreas em promoção para o arquipélago de Fernando de Noronha. Dicas de taxas ambientais, mergulho e Baía do Sancho.",
    desc_en: "Dream island getaway to Fernando de Noronha. Pristine beaches, sea turtle diving, and eco-lodges.",
    desc_es: "Paraíso tropical en Fernando de Noronha. Buceo con delfines y playas cristalinas."
  },
  {
    cidade: "Jericoacoara",
    pais: "Brasil",
    slug: "jericoacoara",
    sazon: "Verão",
    tarifa: "R$ 680",
    hotel: "Pousadas pés na areia com piscinas naturais e redes na água na Lagoa do Paraíso.",
    desc_pt: "Voos para o Aeroporto de Jericoacoara (JJD) e transfers 4x4. Duna do Pôr do Sol e kitesurfe.",
    desc_en: "Direct flights and 4x4 transfers to Jericoacoara. Sand dunes, kitesurfing, and hammock lagoons.",
    desc_es: "Vuelos y traslados 4x4 a Jericoacoara. Dunas, kitesurf y lagunas turquesas."
  }
];

const TRAVEL_GEAR_DATA = [
  {
    nome: "Kit 3 Malas de Viagem Rígidas 360° em ABS com Cadeado TSA (Bordo + M + G)",
    slug: "kit-malas-viagem-rigidas-360-tsa-amazon-promocao",
    cat: "Malas e Mochilas",
    clima: "Ano_Todo",
    destinos: "Orlando, Paris, Miami, Lisboa, Nova York, Santiago, Rio de Janeiro",
    normal: "R$ 890,00",
    promo: "R$ 389,00",
    desconto: 56,
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH"
  },
  {
    nome: "Mochila de Viagem Expansível Impermeável 40L para Cabine de Avião (Padrão ANAC)",
    slug: "mochila-expansivel-impermeavel-cabine-shopee",
    cat: "Malas e Mochilas",
    clima: "Ano_Todo",
    destinos: "Todos os voos nacionais e internacionais",
    normal: "R$ 210,00",
    promo: "R$ 89,90",
    desconto: 57,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Kit 2 Conjuntos Roupas Térmicas Segunda Pele Forro Peluciado Fleece (Frio Extremo)",
    slug: "roupas-termicas-segunda-pele-frio-extremo-shein",
    cat: "Roupas Térmicas / Inverno",
    clima: "Inverno",
    destinos: "Gramado, Bariloche, Santiago, Campos do Jordão, Paris, Nova York",
    normal: "R$ 180,00",
    promo: "R$ 59,90",
    desconto: 66,
    loja: "SHEIN Oficial",
    link: "https://onelink.shein.com/47/5ylqchgphidl"
  },
  {
    nome: "Kit 8 Sacos Organizadores de Mala com Zíper Duplo e Compressão a Vácuo",
    slug: "kit-organizadores-mala-viagem-compressao-shopee",
    cat: "Organizadores e Acessórios",
    clima: "Ano_Todo",
    destinos: "Orlando, Miami, Lisboa, Roma, Cancun, Fernando de Noronha",
    normal: "R$ 95,00",
    promo: "R$ 34,90",
    desconto: 63,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Carregador Portátil Powerbank 20.000mAh Turbo Ultra Slim Homologado ANAC",
    slug: "powerbank-ultra-fino-homologado-anac-amazon",
    cat: "Eletrônicos de Voo",
    clima: "Internacional_Longo_Curso",
    destinos: "Voos longos para Europa, EUA, Ásia e conexões",
    normal: "R$ 199,00",
    promo: "R$ 69,90",
    desconto: 65,
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH"
  },
  {
    nome: "Adaptador de Tomada Universal Internacional Tudo-em-Um com 4 USB + USB-C",
    slug: "adaptador-tomada-universal-internacional-mercado-livre",
    cat: "Eletrônicos de Voo",
    clima: "Internacional_Longo_Curso",
    destinos: "Estados Unidos, Europa, Reino Unido, Ásia e América Latina (Mais de 150 países)",
    normal: "R$ 89,00",
    promo: "R$ 39,90",
    desconto: 55,
    loja: "Mercado Livre Full",
    link: "https://meli.la/1U3rtgV"
  },
  {
    nome: "Travesseiro de Pescoço Ergonômico Espuma Viscoelástica com Capa Lavável",
    slug: "travesseiro-pescoco-ergonomico-memoria-shopee",
    cat: "Organizadores e Acessórios",
    clima: "Ano_Todo",
    destinos: "Viagens de avião e ônibus executivo / bate-volta",
    normal: "R$ 79,00",
    promo: "R$ 29,90",
    desconto: 62,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Balança Digital Portátil para Pesar Malas e Bagagem de Mão (Evite Taxas)",
    slug: "balanca-digital-portatil-malas-bagagem-amazon",
    cat: "Organizadores e Acessórios",
    clima: "Ano_Todo",
    destinos: "Todos os aeroportos e companhias aéreas",
    normal: "R$ 65,00",
    promo: "R$ 24,90",
    desconto: 61,
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH"
  }
];

async function seedGlobalAndGear() {
  console.log("🚀 Executando Povoamento de Destinos Globais e Malas de Viagem no Supabase...");

  // 1. Destinos Globais (PT, EN, ES)
  const allDestinos = [];
  for (const d of DESTINOS_MASTER) {
    // Versão PT
    allDestinos.push({
      cidade_destino: d.cidade,
      pais: d.pais,
      slug: `${d.slug}-passagens-hoteis-baratos`,
      idioma_pagina: "PT",
      sazonalidade: d.sazon,
      tarifa_media: d.tarifa,
      descricao_turistica: d.desc_pt,
      hotel_recomendado: d.hotel,
      link_afiliado_global: "https://meli.la/1U3rtgV"
    });

    // Versão EN
    allDestinos.push({
      cidade_destino: d.cidade,
      pais: d.pais,
      slug: `${d.slug}-cheap-flights-hotel-deals`,
      idioma_pagina: "EN",
      sazonalidade: d.sazon,
      tarifa_media: d.tarifa,
      descricao_turistica: d.desc_en,
      hotel_recomendado: d.hotel,
      link_afiliado_global: "https://meli.la/1U3rtgV"
    });

    // Versão ES
    allDestinos.push({
      cidade_destino: d.cidade,
      pais: d.pais,
      slug: `${d.slug}-vuelos-baratos-hoteles`,
      idioma_pagina: "ES",
      sazonalidade: d.sazon,
      tarifa_media: d.tarifa,
      descricao_turistica: d.desc_es,
      hotel_recomendado: d.hotel,
      link_afiliado_global: "https://meli.la/1U3rtgV"
    });
  }

  const sqlDestinos = `
    INSERT INTO public.global_destinos_turisticos (cidade_destino, pais, slug, idioma_pagina, sazonalidade, tarifa_media, descricao_turistica, hotel_recomendado, link_afiliado_global, status_ativo)
    VALUES
    ${allDestinos.map(d => `('${d.cidade_destino.replace(/'/g, "''")}', '${d.pais.replace(/'/g, "''")}', '${d.slug}', '${d.idioma_pagina}', '${d.sazonalidade}', '${d.tarifa_media}', '${d.descricao_turistica.replace(/'/g, "''")}', '${d.hotel_recomendado.replace(/'/g, "''")}', '${d.link_afiliado_global}', true)`).join(",\n")};
  `;
  await executeSQL(sqlDestinos);
  console.log(`✓ ${allDestinos.length} destinos multilíngues (PT/EN/ES) inseridos em global_destinos_turisticos.`);

  // 2. Travel Gear & Malas
  const sqlGear = `
    INSERT INTO public.travel_gear_achadinhos (item_nome, slug, categoria_viagem, clima_sazonal, destinos_recomendados, preco_normal, preco_promo, desconto_pct, loja, link_afiliado, status_ativo)
    VALUES
    ${TRAVEL_GEAR_DATA.map(g => `('${g.nome.replace(/'/g, "''")}', '${g.slug}', '${g.cat}', '${g.clima}', '${g.destinos.replace(/'/g, "''")}', '${g.normal}', '${g.promo}', ${g.desconto}, '${g.loja}', '${g.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlGear);
  console.log(`✓ ${TRAVEL_GEAR_DATA.length} produtos de malas e acessórios inseridos em travel_gear_achadinhos.`);

  console.log("\n🏆 Banco de Dados Global e E-commerce de Viagem sincronizados no Supabase!");
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
  seedGlobalAndGear().catch(console.error);
}

module.exports = { seedGlobalAndGear, DESTINOS_MASTER, TRAVEL_GEAR_DATA };
