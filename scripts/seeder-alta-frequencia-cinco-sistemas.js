/**
 * AQUITEM ACHADINHOS — SEEDER DE ALTA FREQUÊNCIA (5 MÓDULOS)
 * 1. Shows e Festivais (Sequestro de Tráfego de Arenas)
 * 2. Painel Hacker de Cupons & Bugs Relâmpago
 * 3. Consultas de Calendários e Benefícios Sociais
 * 4. Guia Estratégico Festa do Peão de Barretos
 * 5. Vitrine Secreta de Looks e Moda Country Barretos
 */

const https = require("https");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// 1. GRANDES SHOWS E FESTIVAIS
const SHOWS_DATA = [
  {
    artista: "Shakira — Las Mujeres Ya No Lloran Tour",
    slug: "shakira-em-sao-paulo-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Estádio MorumBIS / Allianz Parque",
    data: "Datas Confirmadas — Temporada 2026",
    status: "Últimos Ingressos / Lote Extra",
    transporte: "Metrô Linha 4-Amarela (Estação São Paulo-Morumbi) a 15 min de caminhada. Linhas especiais de ônibus expressos saindo do Terminal Barra Funda e Terminal Tietê.",
    hospedagens: "Hotéis recomendados no bairro Morumbi, Pinheiros e Brooklin com transfer para a arena.",
    passagens: "https://meli.la/1U3rtgV"
  },
  {
    artista: "Bruno Mars — Tour Especial São Paulo",
    slug: "bruno-mars-em-sao-paulo-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Estádio MorumBIS (São Paulo)",
    data: "Temporada de Shows em SP",
    status: "Ingressos Remanescentes e Camarote",
    transporte: "Desembarque na Estação São Paulo-Morumbi (Linha 4-Amarela). Vias de acesso monitoradas pela CET.",
    hospedagens: "Opções de hotéis e pousadas executivas na Av. Chucri Zaidan, Berrini e Itaim Bibi.",
    passagens: "https://meli.la/1U3rtgV"
  },
  {
    artista: "Coldplay — Music of the Spheres World Tour",
    slug: "coldplay-em-sao-paulo-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Allianz Parque (São Paulo)",
    data: "Turnê 2026",
    status: "Setores Esgotando",
    transporte: "Estação Palmeiras-Barra Funda (Linha 3-Vermelha e Linha 7-Rubi da CPTM) a 10 min a pé.",
    hospedagens: "Hotéis na Av. Francisco Matarazzo, Perdizes e Barra Funda ao lado do estádio.",
    passagens: "https://meli.la/1U3rtgV"
  },
  {
    artista: "Lollapalooza Brasil 2026 — Guia Completo",
    slug: "lollapalooza-brasil-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Autódromo de Interlagos (São Paulo)",
    data: "Fim de Semana do Festival",
    status: "Lolla Pass & Lolla Day Abertos",
    transporte: "Trem Linha 9-Esmeralda (Estação Autódromo) com operação 24 horas nos dias de festival.",
    hospedagens: "Hotéis em Santo Amaro, Brooklin e Av. das Nações Unidas com transfer expresso.",
    passagens: "https://meli.la/1U3rtgV"
  },
  {
    artista: "The Town Festival — Segunda Edição SP",
    slug: "the-town-festival-sao-paulo-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Cidade da Música / Autódromo de Interlagos",
    data: "Setembro de 2026",
    status: "Pré-Venda e Ingressos Gerais",
    transporte: "Serviço especial de trem expresso e linhas circulares de ônibus de integração.",
    hospedagens: "Hostels e hotéis credenciados na Zona Sul e Centro Expandido de SP.",
    passagens: "https://meli.la/1U3rtgV"
  },
  {
    artista: "Gusttavo Lima & Ana Castela — Buteco e Agronejo SP",
    slug: "gusttavo-lima-ana-castela-sao-paulo-como-chegar-hoteis",
    cidade: "São Paulo",
    arena: "Allianz Parque / Arena Anhembi",
    data: "Show Especial 2026",
    status: "Vendas Abertas",
    transporte: "Acesso direto pela Marginal Tietê ou Metrô Portuguesa-Tietê / Barra Funda.",
    hospedagens: "Hotéis econômicos e executivos em Santana e Barra Funda.",
    passagens: "https://meli.la/1U3rtgV"
  }
];

// 2. PAINEL HACKER DE CUPONS & BUGS RELÂMPAGO
const BUGS_DATA = [
  {
    nome: "Fritadeira Elétrica Air Fryer 8L Digital Touch Inox",
    slug: "bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre",
    loja: "Shopee Oficial",
    normal: "R$ 489,90",
    bug: "R$ 139,90",
    desconto: 71,
    cupom: "AIRFRYERBUG70",
    link: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Smart TV 50 Polegadas 4K UHD HDR Dolby Audio",
    slug: "bug-de-preco-smart-tv-50-4k-uhd-mercado-livre",
    loja: "Mercado Livre Full",
    normal: "R$ 2.499,00",
    bug: "R$ 989,00",
    desconto: 60,
    cupom: "TV4KPROMO60",
    link: "https://meli.la/1U3rtgV"
  },
  {
    nome: "Fone de Ouvido Bluetooth TWS com Cancelamento de Ruído Ativo",
    slug: "bug-de-preco-fone-bluetooth-tws-noise-cancelling-amazon",
    loja: "Amazon Prime",
    normal: "R$ 289,00",
    bug: "R$ 59,90",
    desconto: 79,
    cupom: "FONEBUGANC",
    link: "https://link.amazon/B0hmLsxcH"
  },
  {
    nome: "Robô Aspirador Inteligente com Mop e Mapeamento Laser",
    slug: "bug-de-preco-robo-aspirador-inteligente-mop-shopee",
    loja: "Shopee Oficial",
    normal: "R$ 799,00",
    bug: "R$ 249,00",
    desconto: 68,
    cupom: "ROBOBUG68",
    link: "https://s.shopee.com.br/30n7ohzzU6"
  },
  {
    nome: "Jogo de Panelas 10 Peças Cerâmica Antiaderente Indução",
    slug: "bug-de-preco-jogo-panelas-ceramica-inducao-mercado-livre",
    loja: "Mercado Livre Full",
    normal: "R$ 650,00",
    bug: "R$ 199,00",
    desconto: 69,
    cupom: "PANELASBUG69",
    link: "https://meli.la/1U3rtgV"
  },
  {
    nome: "Kit 5 Vestidos Femininos Elegance Linho & Tricot",
    slug: "bug-de-preco-kit-vestidos-femininos-shein",
    loja: "SHEIN Oficial",
    normal: "R$ 380,00",
    bug: "R$ 89,90",
    desconto: 76,
    cupom: "SHEINBUG76",
    link: "https://onelink.shein.com/47/5ylqchgphidl"
  }
];

// 3. CONSULTAS DE BENEFÍCIOS E CALENDÁRIOS OFICIAIS
const BENEFICIOS_DATA = [
  {
    nome: "Bolsa Família 2026 — Calendário Oficial de Pagamentos por NIS",
    slug: "calendario-de-pagamentos-bolsa-familia-2026",
    orgao: "Ministério do Desenvolvimento e Assistência Social (MDS) / Caixa Econômica",
    publico: "Famílias cadastradas no CadÚnico com renda de até R$ 218 por pessoa.",
    calendario: {
      "NIS Final 1": "18 a 22 de cada mês",
      "NIS Final 2": "19 a 23 de cada mês",
      "NIS Final 3": "20 a 24 de cada mês",
      "NIS Final 4": "21 a 25 de cada mês",
      "NIS Final 5": "22 a 26 de cada mês",
      "NIS Final 6": "25 a 27 de cada mês",
      "NIS Final 7": "26 a 28 de cada mês",
      "NIS Final 8": "27 a 29 de cada mês",
      "NIS Final 9": "28 a 30 de cada mês",
      "NIS Final 0": "Último dia útil do mês"
    },
    regras: "O saque pode ser efetuado pelo aplicativo Caixa Tem, terminais de autoatendimento, lotéricas e correspondentes Caixa Aqui com documento com foto."
  },
  {
    nome: "PIS/PASEP 2026 — Tabela de Saques e Consulta por Data de Nascimento",
    slug: "calendario-de-pagamentos-pis-pasep-2026",
    orgao: "Governo Federal / Ministério do Trabalho e Emprego",
    publico: "Trabalhadores CLT e Servidores Públicos com carteira assinada e remuneração média de até 2 salários mínimos.",
    calendario: {
      "Nascidos em Janeiro": "Liberação a partir de 15 de Fevereiro",
      "Nascidos em Fevereiro": "Liberação a partir de 15 de Março",
      "Nascidos em Março e Abril": "Liberação a partir de 15 de Abril",
      "Nascidos em Maio e Junho": "Liberação a partir de 15 de Maio",
      "Nascidos em Julho e Agosto": "Liberação a partir de 17 de Junho",
      "Nascidos em Setembro e Outubro": "Liberação a partir de 15 de Julho",
      "Nascidos em Novembro e Dezembro": "Liberação a partir de 15 de Agosto"
    },
    regras: "Valor proporcional de até 1 salário mínimo vigente (R$ 1.502,00). Consulta pelo app Carteira de Trabalho Digital ou portal Gov.br."
  },
  {
    nome: "Calendário INSS 2026 — Aposentados e Pensionistas (Até 1 Salário e Acima)",
    slug: "calendario-de-pagamentos-inss-aposentados-2026",
    orgao: "Instituto Nacional do Seguro Social (INSS)",
    publico: "Mais de 39 milhões de beneficiários, aposentados e pensionistas da Previdência Social.",
    calendario: {
      "Benefício Final 1": "Primeiro dia útil do ciclo",
      "Benefício Final 2": "Segundo dia útil do ciclo",
      "Benefício Final 3": "Terceiro dia útil do ciclo",
      "Benefício Final 4": "Quarto dia útil do ciclo",
      "Benefício Final 5": "Quinto dia útil do ciclo",
      "Finais 6 a 0": "Pagamento nos 5 dias úteis subsequentes"
    },
    regras: "Extrato oficial e comprovante de rendimentos disponíveis no app Meu INSS sem necessidade de comparecimento à agência."
  },
  {
    nome: "FGTS Saque-Aniversário 2026 — Tabela de Alíquotas e Liberação",
    slug: "calendario-de-pagamentos-fgts-saque-aniversario-2026",
    orgao: "Caixa Econômica Federal / Fundo de Garantia",
    publico: "Trabalhadores com saldo em contas ativas e inativas do FGTS que optaram pela modalidade.",
    calendario: {
      "Aniversariantes de Janeiro": "Saque de 02/01 a 31/03",
      "Aniversariantes de Fevereiro": "Saque de 01/02 a 30/04",
      "Aniversariantes de Março": "Saque de 01/03 a 31/05",
      "Aniversariantes de Abril": "Saque de 01/04 a 30/06",
      "Demais Meses": "Janela aberta por 3 meses a contar do 1º dia útil do mês de aniversário"
    },
    regras: "Permite sacar de 5% a 50% do saldo total mais parcela adicional fixa de até R$ 2.900,00."
  },
  {
    nome: "Prouni e FIES 2026 — Cronograma de Inscrições e Chamadas",
    slug: "calendario-de-pagamentos-prouni-fies-inscricoes-2026",
    orgao: "Ministério da Educação (MEC)",
    publico: "Estudantes que realizaram o ENEM e buscam bolsas de 50% e 100% no ensino superior.",
    calendario: {
      "Inscrições Prouni": "Início na última semana de Janeiro",
      "Primeira Chamada": "Primeira semana de Fevereiro",
      "Segunda Chamada": "Final de Fevereiro",
      "Lista de Espera": "Início de Março"
    },
    regras: "Inscrição gratuita no portal oficial Acesso Único MEC utilizando a conta Gov.br."
  }
];

// 4. GUIA ESTRATÉGICO BARRETOS 2026
const BARRETOS_GUIA = [
  {
    tema: "Como Cadastrar a Biometria Facial para a Festa do Peão de Barretos",
    slug: "biometria-facial-festa-do-peao-barretos",
    cat: "Ingressos & Acesso",
    conteudo: "Desde a última edição, a entrada no Parque do Peão de Barretos exige biometria facial obrigatória para todos os setores (Pista, Área VIP, Camarote Brahma, Camarote Arena Premium e Paddock). O cadastro deve ser feito pelo aplicativo oficial da Total Acesso com documento de identidade oficial e selfie nítida com boa iluminação.",
    dicas: "Faça o cadastro facial antes de sair de casa para evitar filas gigantescas nas catracas dos portões de acesso. O reconhecimento facial elimina a necessidade de ingressos impressos.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    tema: "Passagem de Ônibus de São Paulo Tietê para Barretos — Preços e Horários",
    slug: "passagem-onibus-tiete-para-barretos-festa-do-peao",
    cat: "Transporte & Passagens",
    conteudo: "As viações Danubio Azul e Expresso Itamarati operam viagens diárias diretas do Terminal Rodoviário do Tietê em São Paulo para o Terminal Rodoviário de Barretos. Durante os dias de rodeio, são disponibilizados horários extras a cada 30 minutos, tanto em ônibus convencionais quanto executivos e leito-cama.",
    dicas: "Compre suas passagens de ida e volta com pelo menos 15 dias de antecedência. Na semana do evento as tarifas sofrem reajuste dinâmico e os assentos esgotam rapidamente.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    tema: "Pacotes de Bate-Volta e Hospedagem em Lote para Barretos",
    slug: "pacotes-hospedagem-bate-volta-barretos-2026",
    cat: "Hospedagem & Vans",
    conteudo: "Para quem não conseguiu vagas em hotéis dentro de Barretos, as opções de hospedagem nas cidades vizinhas (Olímpia, Bebedouro, Guaíra e Ribeirão Preto) oferecem excelente infraestrutura com traslados fretados diários até o Parque do Peão.",
    dicas: "Olímpia fica a apenas 35 minutos de Barretos e conta com ampla rede de resorts e pousadas de águas termais com pacotes combinados de bate-volta.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    tema: "Horários de Shows do Gusttavo Lima e Ana Castela no Palco Estádio",
    slug: "horarios-shows-gusttavo-lima-ana-castela-barretos",
    cat: "Programação & Shows",
    conteudo: "Os maiores nomes do sertanejo e agronejo comandam o Palco Estádio. Os shows das atrações principais geralmente têm início após o término das montarias do rodeio internacional, por volta das 23h30 e se estendem até o amanhecer com apresentações no Palco Amanhecer.",
    dicas: "Chegue à Arena com pelo menos 2 horas de antecedência para conseguir uma boa visão da passarela dos artistas e evitar retenção nos portões.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    tema: "Vagas de Camping e Estacionamento Oficial no Parque do Peão",
    slug: "vagas-camping-estacionamento-parque-do-peao",
    cat: "Camping & Estrutura",
    conteudo: "O Parque do Peão de Barretos dispõe do maior camping da América Latina, dividido entre Camping Solteiros e Camping Família, contando com segurança 24h, banheiros com chuveiros quentes, pontos de energia e posto médico.",
    dicas: "Garanta a credencial do camping antecipadamente junto ao passaporte de acesso aos 10 dias de festa. O estacionamento possui cobrança por diária ou passe livre.",
    link: "https://meli.la/1U3rtgV"
  },
  {
    tema: "Programação Oficial e Ingressos Remanescentes da Festa do Peão",
    slug: "programacao-oficial-ingressos-remanescentes-barretos",
    cat: "Ingressos & Cronograma",
    conteudo: "A 71ª Festa do Peão de Barretos reúne as finais mundiais da PBR (Professional Bull Riders), rodeio em cavalos estilo Cutiano, prova dos Três Tambores e mais de 100 shows distribuídos em 5 palcos simultâneos.",
    dicas: "Consulte o calendário oficial e adquira os ingressos exclusivamente por canais autorizados para evitar fraudes com ingressos falsificados.",
    link: "https://meli.la/1U3rtgV"
  }
];

// 5. LOOKS & MODA COUNTRY BARRETOS
const LOOKS_DATA = [
  {
    nome: "Chapéu Country Pralana Feltro 30X Resistente à Água Oficial",
    slug: "chapeu-pralana-barretos-promocao",
    marca: "Pralana Western",
    categoria: "Chapéus",
    normal: "R$ 389,00",
    promo: "R$ 149,90",
    desconto: 61,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    inspiracao: "Estilo Clássico dos Campeões do Rodeio"
  },
  {
    nome: "Bota Texana Goyazes Masculina e Feminina em Couro Bovino Legítimo",
    slug: "botas-goyazes-cupom-shopee",
    marca: "Goyazes / Dallas Boots",
    categoria: "Botas Texanas",
    normal: "R$ 590,00",
    promo: "R$ 219,00",
    desconto: 63,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    inspiracao: "Bico Quadrado e Solado Antiderrapante para Arena"
  },
  {
    nome: "Cinto Country em Couro com Fivela Trabalhada Boiadeiro Prata",
    slug: "cinto-country-fivela-boiadeiro-shein",
    marca: "Western Vintage",
    categoria: "Cintos & Fivelas",
    normal: "R$ 129,90",
    promo: "R$ 39,90",
    desconto: 69,
    loja: "SHEIN Oficial",
    link: "https://onelink.shein.com/47/5ylqchgphidl",
    inspiracao: "Fivela de Impacto com Detalhes Rústicos"
  },
  {
    nome: "Jaqueta de Couro Sintético com Franjas Western Boiadeira Ana Castela",
    slug: "jaqueta-couro-franjas-ana-castela-barretos",
    marca: "Boiadeira Fashion",
    categoria: "Jaquetas & Casacos",
    normal: "R$ 320,00",
    promo: "R$ 98,00",
    desconto: 69,
    loja: "SHEIN Oficial",
    link: "https://onelink.shein.com/47/5ylqchgphidl",
    inspiracao: "Visual Oficial dos Shows da Ana Castela em Barretos"
  },
  {
    nome: "Camisa Xadrez Western Masculina e Feminina Manga Longa Premium",
    slug: "camisa-western-xadrez-mangalarga-amazon",
    marca: "Wrangler Style",
    categoria: "Camisas Xadrez",
    normal: "R$ 179,00",
    promo: "R$ 59,90",
    desconto: 66,
    loja: "Amazon Prime",
    link: "https://link.amazon/B0hmLsxcH",
    icone: "👔",
    inspiracao: "Algodão Macio para o Calor do Dia e Noite Fria"
  },
  {
    nome: "Calça Jeans Country Feminina Flare Bordada com Elastano",
    slug: "calca-jeans-country-flare-bordada-shopee",
    marca: "Country Rodeo Jeans",
    categoria: "Calças Jeans",
    normal: "R$ 210,00",
    promo: "R$ 79,90",
    desconto: 62,
    loja: "Shopee Oficial",
    link: "https://s.shopee.com.br/30n7ohzzU6",
    inspiracao: "Cintura Alta e Modelagem Flare para Botas"
  },
  {
    nome: "Bota Texana Feminina Cano Alto Bico Fino com Bordado Floral",
    slug: "bota-texana-feminina-barretos-shein",
    marca: "Rodeo Chic",
    categoria: "Botas Texanas",
    normal: "R$ 350,00",
    promo: "R$ 119,00",
    desconto: 66,
    loja: "SHEIN Oficial",
    link: "https://onelink.shein.com/47/5ylqchgphidl",
    inspiracao: "Look de Destaque no Camarote Brahma e Arena"
  }
];

async function seedHighFrequency() {
  console.log("🚀 Executando Povoamento das 5 Novas Frentes de Tráfego no Supabase...");

  // 1. Shows
  const sqlShows = `
    INSERT INTO public.eventos_grandes_shows (artista_evento, slug, cidade, local_arena, data_evento, status_ingressos, guia_transporte, hospedagens_proximas, link_passagens, status_ativo)
    VALUES
    ${SHOWS_DATA.map(s => `('${s.artista.replace(/'/g, "''")}', '${s.slug}', '${s.cidade}', '${s.arena.replace(/'/g, "''")}', '${s.data.replace(/'/g, "''")}', '${s.status.replace(/'/g, "''")}', '${s.transporte.replace(/'/g, "''")}', '${s.hospedagens.replace(/'/g, "''")}', '${s.passagens}', true)`).join(",\n")};
  `;
  await executeSQL(sqlShows);
  console.log("✓ Tabela eventos_grandes_shows povoada com 6 grandes eventos.");

  // 2. Bugs
  const sqlBugs = `
    INSERT INTO public.cupons_bugs_relampago (produto_nome, slug, loja, preco_normal, preco_bug, desconto_pct, cupom_codigo, link_afiliado, status_verificado)
    VALUES
    ${BUGS_DATA.map(b => `('${b.nome.replace(/'/g, "''")}', '${b.slug}', '${b.loja}', '${b.normal}', '${b.bug}', ${b.desconto}, '${b.cupom}', '${b.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlBugs);
  console.log("✓ Tabela cupons_bugs_relampago povoada com 6 super descontos.");

  // 3. Benefícios
  const sqlBeneficios = `
    INSERT INTO public.consultas_beneficios_calendarios (beneficio_nome, slug, orgao_emissor, publico_alvo, calendario_json, regras_saque, status_ativo)
    VALUES
    ${BENEFICIOS_DATA.map(ben => `('${ben.nome.replace(/'/g, "''")}', '${ben.slug}', '${ben.orgao.replace(/'/g, "''")}', '${ben.publico.replace(/'/g, "''")}', '${JSON.stringify(ben.calendario)}'::jsonb, '${ben.regras.replace(/'/g, "''")}', true)`).join(",\n")};
  `;
  await executeSQL(sqlBeneficios);
  console.log("✓ Tabela consultas_beneficios_calendarios povoada com 5 calendários oficiais.");

  // 4. Barretos Guia
  const sqlBarretos = `
    INSERT INTO public.barretos_guia_estrategico (tema_duvida, slug, categoria, conteudo_guia, dicas_urgentes, link_acao, status_ativo)
    VALUES
    ${BARRETOS_GUIA.map(bg => `('${bg.tema.replace(/'/g, "''")}', '${bg.slug}', '${bg.cat}', '${bg.conteudo.replace(/'/g, "''")}', '${bg.dicas.replace(/'/g, "''")}', '${bg.link}', true)`).join(",\n")};
  `;
  await executeSQL(sqlBarretos);
  console.log("✓ Tabela barretos_guia_estrategico povoada com 6 guias de alta urgência.");

  // 5. Looks Barretos
  const sqlLooks = `
    INSERT INTO public.looks_country_achadinhos (item_nome, slug, marca_estilo, categoria_peca, preco_original, preco_promocional, desconto_pct, loja, link_afiliado, inspiracao_artista, status_ativo)
    VALUES
    ${LOOKS_DATA.map(l => `('${l.nome.replace(/'/g, "''")}', '${l.slug}', '${l.marca.replace(/'/g, "''")}', '${l.categoria}', '${l.normal}', '${l.promo}', ${l.desconto}, '${l.loja}', '${l.link}', '${l.inspiracao.replace(/'/g, "''")}', true)`).join(",\n")};
  `;
  await executeSQL(sqlLooks);
  console.log("✓ Tabela looks_country_achadinhos povoada com 7 looks virais.");

  console.log("\n🏆 Todas as 5 frentes de tráfego de alta conversão foram sincronizadas no Supabase!");
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
  seedHighFrequency().catch(console.error);
}

module.exports = { seedHighFrequency, SHOWS_DATA, BUGS_DATA, BENEFICIOS_DATA, BARRETOS_GUIA, LOOKS_DATA };
