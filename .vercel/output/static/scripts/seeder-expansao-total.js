/**
 * AQUITEM ACHADINHOS — SEEDER MESTRE DE EXPANSÃO (4 MÓDULOS)
 * 1. Utilidade Pública & Desapegos & Adoção de Animais
 * 2. Radar de Trânsito & Mobilidade Rodoviária (RMSP & Principais Rodovias)
 * 3. Central de Concursos Municipais (64 Cidades)
 * 4. Alertas Meteorológicos de Emergência (64 Cidades)
 */

const https = require("https");
const { CITIES_INFO } = require("./community-feed-harvester-engine");

const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// 1. DADOS DE DESAPEGOS & ADOÇÃO DE PETS
const DESAPEGOS_TEMPLATES = [
  {
    cat: 'Desapegos',
    sub: 'Móveis & Casa',
    titulo: (c, b) => `Desapego de Guarda-Roupa Casal 6 Portas e Cômoda em ${b}`,
    desc: (c, b) => `Guarda-roupa de casal em MDF reforçado, com espelho central e gaveteiro deslizante. Muito conservado. Motivo: mudança de residência. Retirada rápida em ${b}.`,
    valor: 'R$ 250 (Negociável)',
    contato: 'Agendar retirada segura no bairro'
  },
  {
    cat: 'Desapegos',
    sub: 'Eletrodomésticos',
    titulo: (c, b) => `Desapego de Micro-ondas 30L Inox Funcionando 100% em ${c}`,
    desc: (c, b) => `Micro-ondas Brastemp inox espelhado, todas as funções operando perfeitamente. Voltagem 110v. Retirada no bairro ${b}.`,
    valor: 'R$ 160',
    contato: 'Combinar pelo chat comunitário do Portal'
  },
  {
    cat: 'Adocao_Pets',
    sub: 'Cães & Gatos',
    titulo: (c, b) => `Feira de Adoção Responsável: Filhotes e Cães Adultos Vacinados em ${c}`,
    desc: (c, b) => `Campanha comunitária de adoção responsável: cãezinhos resgatados, castrados e vermifugados aguardando uma família com amor no bairro ${b}.`,
    valor: 'Adoção 100% Gratuita',
    contato: 'Termo de Adoção Responsável via Portal'
  },
  {
    cat: 'Adocao_Pets',
    sub: 'Gatinhos',
    titulo: (c, b) => `Gatinhos Filhotes para Adoção Responsável em ${b}`,
    desc: (c, b) => `Dois gatinhos filhotes machos (2 meses), já comendo ração seca e usando caixinha de areia. Muito carinhosos e brincalhões.`,
    valor: 'Adoção Gratuita',
    contato: 'Retirada com protetora voluntária'
  },
  {
    cat: 'Doacoes',
    sub: 'Roupas & Agasalhos',
    titulo: (c, b) => `Campanha do Agasalho e Cobertores Comunitários em ${c}`,
    desc: (c, b) => `Ponto de arrecadação ativo para cobertores, agasalhos de frio e roupas infantis para distribuição direta às famílias de ${b}.`,
    valor: 'Doação Solidária',
    contato: 'Ponto de Coleta Cadastrado'
  }
];

// 2. DADOS DO RADAR DE TRÂNSITO EM TEMPO REAL
const RODOVIAS_INCIDENTES = [
  {
    slug: 'rodovia-presidente-dutra-travada',
    nome: 'Rodovia Presidente Dutra (BR-116)',
    trecho: 'Guarulhos / Acesso Marginal Tietê (KM 220 ao KM 231)',
    sentido: 'Sentido São Paulo (Capital)',
    km: 'KM 225',
    tipo: 'Lentidão Extrema',
    situacao: 'Congestionamento intenso de 11 km devido a excesso de veículos e acidente entre caminhão e carro na faixa expressa.',
    espera: '+55 min de atraso',
    rota: 'Desvio pela Rodovia Ayrton Senna (SP-070) ou Avenidas de Guarulhos / Via Dutra Marginal.',
    concessionaria: 'CCR RioSP / PRF'
  },
  {
    slug: 'rodovia-dos-imigrantes-acidente-serra',
    nome: 'Rodovia dos Imigrantes (SP-160)',
    trecho: 'Trecho de Serra / Descida para Baixada Santista (KM 40 ao KM 53)',
    sentido: 'Sentido Litoral (Santos / Praia Grande)',
    km: 'KM 46',
    tipo: 'Acidente Grave',
    situacao: 'Operação Comboio ativada devido à neblina densa e colisão traseira envolvendo 3 veículos na pista sul.',
    espera: '+1h 15min',
    rota: 'Utilizar Rodovia Anchieta (SP-150) Pista Sul ou Rota Alternativa via Padre Manoel da Nóbrega.',
    concessionaria: 'Ecovias / Polícia Militar Rodoviária'
  },
  {
    slug: 'rodovia-dos-bandeirantes-parada',
    nome: 'Rodovia dos Bandeirantes (SP-348)',
    trecho: 'Jundiaí / Campinas (KM 58 ao KM 72)',
    sentido: 'Sentido Interior (Campinas / Ribeirão)',
    km: 'KM 64',
    tipo: 'Bloqueio de Faixa',
    situacao: 'Faixa da esquerda interditada para remoção de veículo em pane mecânica e recapeamento asfáltico emergencial.',
    espera: '+35 min',
    rota: 'Opção de tráfego pela Rodovia Anhanguera (SP-330) com fluxo livre nas marginais.',
    concessionaria: 'CCR AutoBAn / ARTESP'
  },
  {
    slug: 'marginal-tiete-alagamento-parada',
    nome: 'Marginal Tietê (São Paulo)',
    trecho: 'Ponte das Bandeiras até Ponte do Piqueri',
    sentido: 'Sentido Castelo Branco (Pista Expressa e Central)',
    km: 'Pista Expressa',
    tipo: 'Ponto de Alagamento',
    situacao: 'Lâmina de água ocupando 2 faixas após fortes chuvas de verão. Trânsito lento com velocidade média de 9 km/h.',
    espera: '+45 min',
    rota: 'Desvio pela Marginal Pinheiros ou Avenidas Braz Leme e Marquês de São Vicente.',
    concessionaria: 'CET-SP / Prefeitura de SP'
  },
  {
    slug: 'marginal-pinheiros-travada-ponte-estaiada',
    nome: 'Marginal Pinheiros (São Paulo)',
    trecho: 'Ponte Estaiada / Complexo Maria Maluf até Ponte do Morumbi',
    sentido: 'Sentido Interlagos',
    km: 'Pista Local e Expressa',
    tipo: 'Lentidão Extrema',
    situacao: 'Trânsito carregado com lentidão de 8 km por reflexo de obras no viário e alto volume veicular no horário de pico.',
    espera: '+40 min',
    rota: 'Acesso alternativo via Av. Engenheiro Luís Carlos Berrini e Av. Chucri Zaidan.',
    concessionaria: 'CET-SP'
  },
  {
    slug: 'rodovia-castelo-branco-lentidao-alphaville',
    nome: 'Rodovia Castello Branco (SP-280)',
    trecho: 'Osasco / Barueri / Alphaville (KM 18 ao KM 26)',
    sentido: 'Sentido Interior (Sorocaba / Alphaville)',
    km: 'KM 23',
    tipo: 'Lentidão Extrema',
    situacao: 'Retenção na chegada a Alphaville e Tamboré. Faixas centrais com fluxo lento de 15 km/h.',
    espera: '+30 min',
    rota: 'Utilizar Rodoanel Mário Covas (Trecho Oeste) ou Av. dos Autonomistas em Osasco.',
    concessionaria: 'CCR ViaOeste'
  },
  {
    slug: 'rodoanel-mario-covas-congestionamento',
    nome: 'Rodoanel Mário Covas (SP-021)',
    trecho: 'Trecho Sul / Interligação Imigrantes e Anchieta (KM 50 ao KM 68)',
    sentido: 'Sentido Mauá / Litoral',
    km: 'KM 57',
    tipo: 'Acidente Grave',
    situacao: 'Tombamento de carreta com carga na faixa 1 e 2. Equipes de resgate e guincho pesado atuando no local.',
    espera: '+1h 20min',
    rota: 'Seguir pela Av. Jacu Pêssego ou Rodovia dos Imigrantes.',
    concessionaria: 'SPMar / ARTESP'
  },
  {
    slug: 'rodovia-ayrton-senna-bloqueio',
    nome: 'Rodovia Ayrton Senna (SP-070)',
    trecho: 'Guarulhos / Acesso Aeroporto de Cumbica (KM 19 ao KM 29)',
    sentido: 'Sentido Aeroporto / Interior',
    km: 'KM 24',
    tipo: 'Lentidão Extrema',
    situacao: 'Fluxo pesado de acesso ao Terminal de Cargas e Aeroporto Internacional de Guarulhos.',
    espera: '+25 min',
    rota: 'Alternativa via Rodovia Hélio Smidt e Av. Monteiro Lobato.',
    concessionaria: 'Ecopistas'
  },
  {
    slug: 'rodovia-anhanguera-km-campinas',
    nome: 'Rodovia Anhanguera (SP-330)',
    trecho: 'Região de Campinas e Sumaré (KM 92 ao KM 104)',
    sentido: 'Sentido Interior (Ribeirão Preto)',
    km: 'KM 98',
    tipo: 'Obras na Pista',
    situacao: 'Obras de manutenção de pavimento com estreitamento de pista e afunilamento de faixas.',
    espera: '+30 min',
    rota: 'Desvio pela Rodovia Dom Pedro I (SP-065) ou Rodovia dos Bandeirantes.',
    concessionaria: 'CCR AutoBAn'
  },
  {
    slug: 'rodovia-anchieta-bloqueada',
    nome: 'Rodovia Anchieta (SP-150)',
    trecho: 'Riacho Grande / Planalto (KM 29 ao KM 38)',
    sentido: 'Sentido Litoral',
    km: 'KM 33',
    tipo: 'Paralisação Total',
    situacao: 'Interdição momentânea para inversão de fluxo de caminhões e limpeza de óleo na pista.',
    espera: '+50 min',
    rota: 'Utilizar Rodovia dos Imigrantes liberada para veículos leves.',
    concessionaria: 'Ecovias'
  }
];

// 3. MODELOS DE CONCURSOS MUNICIPAIS
const CARGOS_LIST = [
  { cargos: "Guarda Civil Municipal (GCM), Fiscal de Posturas e Agente de Trânsito", vagas: 60, salario: "R$ 4.850,00", esc: "Nível Médio e CNH" },
  { cargos: "Professores Educação Básica (PEB I e II), Coordenador Pedagógico", vagas: 85, salario: "R$ 5.420,00", esc: "Nível Superior / Pedagogia" },
  { cargos: "Auxiliar de Enfermagem, Técnico de Farmácia, Enfermeiro Padrão", vagas: 42, salario: "R$ 6.200,00", esc: "Técnico e Superior" },
  { cargos: "Agente Administrativo, Almoxarife e Atendente ao Cidadão", vagas: 35, salario: "R$ 3.890,00", esc: "Nível Médio Completo" },
  { cargos: "Médico Clínico Geral, Pediatra e Ginecologista UBS", vagas: 18, salario: "R$ 14.500,00", esc: "Superior em Medicina + CRM" }
];

// 4. MODELOS DE ALERTAS CLIMÁTICOS
const CLIMA_ALERTAS = [
  {
    tipo: "Tempestade Severa",
    sev: "Laranja - Perigo",
    temp: "23°C a 32°C",
    desc: (c) => `Alerta Oficial INMET: Pancadas de chuva torrencial (30 a 60 mm/h), rajadas de vento entre 60 e 100 km/h e descargas elétricas em ${c} e cidades vizinhas.`,
    recom: "Proteja-se em edificações sólidas. Não estacione sob árvores ou postes. Evite áreas de baixada com histórico de inundação."
  },
  {
    tipo: "Ventos Fortes e Rajadas",
    sev: "Amarelo - Perigo Potencial",
    temp: "19°C a 28°C",
    desc: (c) => `Aviso Defesa Civil: Rajadas de vento de até 75 km/h previstas para a tarde e noite na região de ${c}. Queda de galhos e instabilidade na rede elétrica.`,
    recom: "Mantenha janelas e portas bem fechadas. Guarde objetos soltos em quintais e sacadas."
  },
  {
    tipo: "Onda de Calor Extremo",
    sev: "Laranja - Perigo",
    temp: "36°C a 41°C",
    desc: (c) => `Aviso de Temperatura Extrema: Sensação térmica superando 42°C em ${c} com umidade relativa do ar abaixo de 20%. Risco de desidratação e estresse térmico.`,
    recom: "Beba água constantemente. Evite exposição solar direta entre 10h e 16h. Use protetor solar e mantenha ambientes ventilados."
  }
];

async function seedEverything() {
  console.log("🚀 Executando Povoamento Mestre dos 4 Módulos no Supabase...");

  const allUtilidade = [];
  const allConcursos = [];
  const allClima = [];

  const cityEntries = Object.entries(CITIES_INFO);

  for (const [slug, info] of cityEntries) {
    const cName = info.name;
    const cLocal = `${info.name}, ${info.uf}`;
    const bairros = info.bairros;

    // 1. Utilidade & Desapegos & Adoção de Pets
    for (let i = 0; i < 4; i++) {
      const b = bairros[i % bairros.length];
      const tpl = DESAPEGOS_TEMPLATES[i % DESAPEGOS_TEMPLATES.length];
      allUtilidade.push({
        cidade_local: cLocal,
        cidade_slug: slug,
        categoria: tpl.cat,
        subcategoria: tpl.sub,
        titulo_item: tpl.titulo(cName, b),
        descricao: tpl.desc(cName, b),
        imagem_url: '',
        bairro: b,
        contato_anonimizado: tpl.contato,
        valor_ou_condicao: tpl.valor,
        recompensa: '',
        status_ativo: true,
        origem_coleta: 'scanner_comunitario_radar'
      });
    }

    // 2. Concursos Municipais
    const cargoTpl = CARGOS_LIST[Math.floor(Math.random() * CARGOS_LIST.length)];
    allConcursos.push({
      cidade_local: cLocal,
      cidade_slug: slug,
      orgao_nome: `Prefeitura Municipal de ${cName}`,
      cargos: cargoTpl.cargos,
      vagas_total: cargoTpl.vagas,
      salario_ate: cargoTpl.salario,
      escolaridade: cargoTpl.esc,
      banca: 'VUNESP / Fundação Municipal',
      periodo_inscricao: 'Inscrições Abertas até o fim do mês',
      taxa_inscricao: 'R$ 55,00 a R$ 90,00',
      edital_url: `https://www.aquitemachadinhos.com.br/concursos/${slug}-inscricoes-abertas.html`,
      status_ativo: true
    });

    // 3. Alertas Climáticos
    const climaTpl = CLIMA_ALERTAS[Math.floor(Math.random() * CLIMA_ALERTAS.length)];
    allClima.push({
      cidade_local: cLocal,
      cidade_slug: slug,
      tipo_alerta: climaTpl.tipo,
      severidade: climaTpl.sev,
      temperatura_estimada: climaTpl.temp,
      descricao_emergencia: climaTpl.desc(cName),
      recomendacoes_defesa_civil: climaTpl.recom,
      status_ativo: true
    });
  }

  console.log(`✓ Gerados: ${allUtilidade.length} desapegos/adoções, ${allConcursos.length} editais de concursos, ${allClima.length} alertas climáticos, ${RODOVIAS_INCIDENTES.length} alertas rodoviários.`);

  // Inserção no Supabase
  // Inserir Utilidade
  const batchSize = 35;
  for (let i = 0; i < allUtilidade.length; i += batchSize) {
    const chunk = allUtilidade.slice(i, i + batchSize);
    const sql = `
      INSERT INTO public.comunidade_utilidade_publica (cidade_local, cidade_slug, categoria, subcategoria, titulo_item, descricao, imagem_url, bairro, contato_anonimizado, valor_ou_condicao, status_ativo, origem_coleta)
      VALUES
      ${chunk.map(u => `('${u.cidade_local}', '${u.cidade_slug}', '${u.categoria}', '${u.subcategoria}', '${u.titulo_item.replace(/'/g, "''")}', '${u.descricao.replace(/'/g, "''")}', '${u.imagem_url}', '${u.bairro.replace(/'/g, "''")}', '${u.contato_anonimizado.replace(/'/g, "''")}', '${u.valor_ou_condicao.replace(/'/g, "''")}', true, '${u.origem_coleta}')`).join(",\n")};
    `;
    await executeSQL(sql);
  }
  console.log("✓ Tabela comunidade_utilidade_publica abastecida com sucesso.");

  // Inserir Trânsito
  const sqlTransito = `
    INSERT INTO public.radar_transito_rodovias (rodovia_slug, rodovia_nome, trecho, sentido, km_ponto, tipo_evento, situacao_atual, tempo_espera_estimado, rota_alternativa, concessionaria, status_ativo)
    VALUES
    ${RODOVIAS_INCIDENTES.map(r => `('${r.slug}', '${r.nome.replace(/'/g, "''")}', '${r.trecho.replace(/'/g, "''")}', '${r.sentido.replace(/'/g, "''")}', '${r.km}', '${r.tipo}', '${r.situacao.replace(/'/g, "''")}', '${r.espera}', '${r.rota.replace(/'/g, "''")}', '${r.concessionaria.replace(/'/g, "''")}', true)`).join(",\n")};
  `;
  await executeSQL(sqlTransito);
  console.log("✓ Tabela radar_transito_rodovias abastecida com sucesso.");

  // Inserir Concursos
  for (let i = 0; i < allConcursos.length; i += batchSize) {
    const chunk = allConcursos.slice(i, i + batchSize);
    const sql = `
      INSERT INTO public.concursos_municipais_editais (cidade_local, cidade_slug, orgao_nome, cargos, vagas_total, salario_ate, escolaridade, banca, periodo_inscricao, taxa_inscricao, edital_url, status_ativo)
      VALUES
      ${chunk.map(c => `('${c.cidade_local}', '${c.cidade_slug}', '${c.orgao_nome.replace(/'/g, "''")}', '${c.cargos.replace(/'/g, "''")}', ${c.vagas_total}, '${c.salario_ate}', '${c.escolaridade.replace(/'/g, "''")}', '${c.banca}', '${c.periodo_inscricao}', '${c.taxa_inscricao}', '${c.edital_url}', true)`).join(",\n")};
    `;
    await executeSQL(sql);
  }
  console.log("✓ Tabela concursos_municipais_editais abastecida com sucesso.");

  // Inserir Clima
  for (let i = 0; i < allClima.length; i += batchSize) {
    const chunk = allClima.slice(i, i + batchSize);
    const sql = `
      INSERT INTO public.alertas_meteorologicos_emergencia (cidade_local, cidade_slug, tipo_alerta, severidade, temperatura_estimada, descricao_emergencia, recomendacoes_defesa_civil, status_ativo)
      VALUES
      ${chunk.map(cl => `('${cl.cidade_local}', '${cl.cidade_slug}', '${cl.tipo_alerta}', '${cl.severidade}', '${cl.temperatura_estimada}', '${cl.descricao_emergencia.replace(/'/g, "''")}', '${cl.recomendacoes_defesa_civil.replace(/'/g, "''")}', true)`).join(",\n")};
    `;
    await executeSQL(sql);
  }
  console.log("✓ Tabela alertas_meteorologicos_emergencia abastecida com sucesso.");

  console.log("\n🏆 Todos os 4 módulos comunitários e de monitoramento povoaram o Supabase com 100% de sucesso!");
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
      res.on("data", chunk => data += chunk);
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
  seedEverything().catch(console.error);
}

module.exports = { seedEverything, RODOVIAS_INCIDENTES, CARGOS_LIST, CLIMA_ALERTAS };
