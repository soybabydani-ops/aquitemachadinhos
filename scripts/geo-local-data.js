/**
 * AQUITEM ACHADINHOS — BANCO DE DADOS GEO-ESPACIAIS REAIS PARA PSEO (64 CIDADES)
 * Contém DDD, Rodovias de Acesso, Aeroporto de Referência, Polos Comerciais, Dicas Editoriais e Vocação Econômica.
 */

const REAL_CITY_DATA = {
  'barretos': {
    ddd: '17',
    aeroporto: 'Aeroporto Estadual Chafei Amsei (BAT) e Leite Lopes (RAO)',
    rodovias: 'SP-326 (Brigadeiro Faria Lima) e SP-425 (Assis Chateaubriand)',
    polosComerciais: 'Calçadão da Rua 20, Bairro Marília, Av. 43 e Região do Parque do Peão',
    distanciaCapital: '425 km de São Paulo',
    perfilEditorial: 'Capital Nacional do Rodeio e polo de excelência em saúde oncológica (Hospital de Amor). A circulação veicular se intensifica na Av. 43 e no anel viário durante a Festa do Peão em agosto. Recomenda-se reservar veículos utilitários ou SUVs com antecedência devido à alta demanda por transporte rural e hospedagens em chácaras vizinhas.'
  },
  'sao-paulo': {
    ddd: '11',
    aeroporto: 'Aeroporto Internacional de Guarulhos (GRU) e Congonhas (CGH)',
    rodovias: 'Rodovia dos Bandeirantes, Anhanguera, Dutra, Castelo Branco e Imigrantes',
    polosComerciais: 'Avenida Paulista, Faria Lima, Berrini, Centro Histórico e Itaim Bibi',
    distanciaCapital: 'Capital do Estado de SP',
    perfilEditorial: 'Maior centro financeiro e corporativo da América Latina. O trânsito na Marginal Pinheiros e Tietê exige planejamento de horários fora do pico (7h-10h e 17h-20h) e atenção às regras de rodízio municipal de veículos. Veículos automáticos e sedans blindados são amplamente procurados para traslados executivos.'
  },
  'campinas': {
    ddd: '19',
    aeroporto: 'Aeroporto Internacional de Viracopos (VCP)',
    rodovias: 'Rodovia dos Bandeirantes (SP-348), Anhanguera (SP-330) e D. Pedro I (SP-065)',
    polosComerciais: 'Bairro Cambuí, Centro, Barão Geraldo (Unicamp) e Parque D. Pedro Shopping',
    distanciaCapital: '98 km de São Paulo',
    perfilEditorial: 'Principal polo de tecnologia e inovação do interior paulista (Vale do Silício brasileiro). Viracopos é o maior hub de cargas e conexões aéreas da Azul. A ligação viária pela Rodovia D. Pedro I facilita o acesso direto às regiões de Atibaia, Jacareí e Vale do Paraíba.'
  },
  'santos': {
    ddd: '13',
    aeroporto: 'Acesso via Congonhas (CGH) ou Guarulhos (GRU) pela Rodovia dos Imigrantes',
    rodovias: 'Rodovia dos Imigrantes (SP-160) e Rodovia Anchieta (SP-150)',
    polosComerciais: 'Bairros Gonzaga, Boqueirão, Ponta da Praia e Porto de Santos',
    distanciaCapital: '72 km de São Paulo',
    perfilEditorial: 'Maior complexo portuário da América Latina e polo turístico da Baixada Santista. O tráfego na orla da praia (Avenida Vicente de Carvalho) e no canal do porto conta com ciclovias extensas e estacionamentos rotativos monitorados pela CET Santos.'
  },
  'ribeirao-preto': {
    ddd: '16',
    aeroporto: 'Aeroporto Estadual Dr. Leite Lopes (RAO)',
    rodovias: 'Rodovia Anhanguera (SP-330) e Rodovia Cândido Portinari (SP-334)',
    polosComerciais: 'Zona Sul (Fiusa), Boulevard, Centro e Bairro Ipiranga',
    distanciaCapital: '315 km de São Paulo',
    perfilEditorial: 'Capital do Agronegócio e sede da Agrishow. A Zona Sul concentra edifícios comerciais de alto padrão, shoppings de luxo e clínicas médicas. As avenidas Nove de Julho, Presidente Vargas e Professor João Fiúsa são os eixos gastronômicos e corporativos mais movimentados.'
  },
  'sao-jose-do-rio-preto': {
    ddd: '17',
    aeroporto: 'Aeroporto Estadual Prof. Eribelto Manoel Reino (SJP)',
    rodovias: 'Rodovia Washington Luís (SP-310) e BR-153 (Transbrasiliana)',
    polosComerciais: 'Bairro Redentora, Avenida Alberto Andaló e Shopping Iguatemi',
    distanciaCapital: '440 km de São Paulo',
    perfilEditorial: 'Importante polo médico-hospitalar e educacional do Noroeste Paulista (FAMERP/HB). O trânsito flui pelas avenidas Alberto Andaló, Bady Bassitt e José Munia. A proximidade com o interior de Minas e Mato Grosso do Sul torna a cidade um entroncamento logístico estratégico.'
  },
  'bebedouro': {
    ddd: '17',
    aeroporto: 'Aeroporto Estadual de Bebedouro (SBB) / Conexão via Ribeirão Preto (RAO)',
    rodovias: 'Rodovia Brigadeiro Faria Lima (SP-326) e Rodovia Comendador Pedro Monteleone (SP-351)',
    polosComerciais: 'Centro Histórico, Jardim Menino Deus e Avenida Raul Furquim',
    distanciaCapital: '385 km de São Paulo',
    perfilEditorial: 'Polo histórico da citricultura e indústria de suco de laranja. O município conta com fácil acesso pelo trevo da SP-326 e conexão rápida com Barretos, Catanduva e Monte Azul Paulista. A circulação urbana concentra-se na Praça Barão do Rio Branco e no Lago Artificial.'
  },
  'olimpia': {
    ddd: '17',
    aeroporto: 'Acesso pelo Aeroporto de São José do Rio Preto (SJP - 45 min)',
    rodovias: 'Rodovia Assis Chateaubriand (SP-425) e Rodovia Armando de Salles Oliveira (SP-322)',
    polosComerciais: 'Avenida Aurora Forti Neves, Centro e Complexo Termas dos Laranjais / Hot Beach',
    distanciaCapital: '430 km de São Paulo',
    perfilEditorial: 'Capital Nacional do Folclore e um dos maiores polos de parques aquáticos termais da América Latina. O fluxo de visitantes é intenso aos finais de semana e férias ao longo da Av. Aurora Forti Neves, com ampla oferta de resorts multipropriedade e pousadas familiares.'
  },
  'guaira': {
    ddd: '17',
    aeroporto: 'Acesso via Aeroporto de Barretos (BAT) ou Ribeirão Preto (RAO)',
    rodovias: 'Rodovia Brigadeiro Faria Lima (SP-326) e SP-425',
    polosComerciais: 'Centro Comercial, Vila Guaíra e Região do Parque Ecológico',
    distanciaCapital: '450 km de São Paulo',
    perfilEditorial: 'Importante polo da agroindústria sucroalcooleira e agricultura de grãos irrigada. O Parque Ecológico Maracá é o principal ponto de lazer e caminhada, enquanto a Rua 8 e Rua 10 concentram os serviços bancários e comércio varejista.'
  },
  'colombia': {
    ddd: '17',
    aeroporto: 'Acesso via Barretos (BAT - 35 min) ou Frutal/Uberaba (MG)',
    rodovias: 'Rodovia Brigadeiro Faria Lima (SP-326) divisa com Minas Gerais',
    polosComerciais: 'Centro e Área Turística do Rio Grande / Prainha de Colômbia',
    distanciaCapital: '465 km de São Paulo',
    perfilEditorial: 'Município turístico situado às margens do Rio Grande na divisa SP/MG, muito procurado para pesca esportiva, esportes náuticos e turismo de rancho. A SP-326 cruza a cidade pela Ponte Gumercindo Penteado ligando diretamente a Planura e Frutal (MG).'
  },
  'franca': {
    ddd: '16',
    aeroporto: 'Aeroporto Estadual de Franca (FRC) / Conexão Leite Lopes (RAO)',
    rodovias: 'Rodovia Cândido Portinari (SP-334) e Rodovia Ronan Rocha (SP-345)',
    polosComerciais: 'Centro, Bairro Estação, Polo Calçadista e Franca Shopping',
    distanciaCapital: '400 km de São Paulo',
    perfilEditorial: 'Capital Nacional do Calçado Masculino e polo cafeeiro da Alta Mogiana. A cidade possui relevo ondulado e eixos viários estruturados pela Av. Presidente Vargas e Av. Major Nicácio. O basquete profissional é paixão local no Ginásio Pedrocão.'
  },
  'sorocaba': {
    ddd: '15',
    aeroporto: 'Aeroporto Estadual Bertram Luiz Leupolz (SOD)',
    rodovias: 'Rodovia Castelo Branco (SP-280) e Rodovia Raposo Tavares (SP-270)',
    polosComerciais: 'Parque Campolim, Bairro Além Ponte, Trujillo e Centro',
    distanciaCapital: '87 km de São Paulo',
    perfilEditorial: 'Quarto polo industrial do Estado de SP com forte presença dos setores automotivo e metalmecânico. O Parque Campolim é a área nobre com torres corporativas e shoppings. O Aeroporto de Sorocaba é referência nacional em manutenção e hangaragem de jatos executivos.'
  },
  'piracicaba': {
    ddd: '19',
    aeroporto: 'Aeroporto Municipal Pedro Morganti (SDPW) / Viracopos (VCP - 50 min)',
    rodovias: 'Rodovia Luiz de Queiroz (SP-304) e Rodovia do Açúcar (SP-075)',
    polosComerciais: 'Rua do Porto, Bairro São Dimas (ESALQ/USP) e Vila Rezende',
    distanciaCapital: '160 km de São Paulo',
    perfilEditorial: 'Berço do setor sucroalcooleiro e sede da centenária ESALQ/USP. A Rua do Porto é o polo gastronômico tradicional com peixe no tambor à beira do Rio Piracicaba. O Parque Automotivo abriga montadoras globais e indústrias metalúrgicas pesadas.'
  },
  'rio-de-janeiro': {
    ddd: '21',
    aeroporto: 'Aeroporto Internacional Tom Jobim / Galeão (GIG) e Santos Dumont (SDU)',
    rodovias: 'Rodovia Presidente Dutra (BR-116), Linha Vermelha e BR-101 (Rio-Santos)',
    polosComerciais: 'Centro Financeiro / Rio Branco, Copacabana, Barra da Tijuca e Botafogo',
    distanciaCapital: 'Capital do Estado do RJ',
    perfilEditorial: 'Principal cartão postal do turismo internacional brasileiro e sede de grandes empresas de energia e telecomunicações. As vias expressas (Linha Vermelha, Amarela e Túnel Santa Bárbara) conectam a Zona Sul à Barra da Tijuca e aos aeroportos.'
  },
  'buzios': {
    ddd: '22',
    aeroporto: 'Aeroporto Umberto Modiano (BZC) / Conexão Aeroporto de Cabo Frio (CFB)',
    rodovias: 'RJ-106 (Rodovia Amaral Peixoto) e RJ-102',
    polosComerciais: 'Rua das Pedras, Orla Bardot, Praia de Geribá e Manguinhos',
    distanciaCapital: '170 km do Rio de Janeiro',
    perfilEditorial: 'Destino de charme internacional na Região dos Lagos fluminense com mais de 20 praias de águas cristalinas. O tráfego no centro histórico é restrito a pedestres na Rua das Pedras, sendo recomendado circular de carro entre as praias de João Fernandes, Ferradura e Geribá.'
  },
  'paraty': {
    ddd: '24',
    aeroporto: 'Aeroporto Municipal de Paraty (JPY) / Acesso terrestre Rio-Santos',
    rodovias: 'Rodovia Governador Mário Covas / Rio-Santos (BR-101)',
    polosComerciais: 'Centro Histórico Tombado, Bairro Caborê, Jabaquara e Marina',
    distanciaCapital: '250 km do Rio de Janeiro e 270 km de SP',
    perfilEditorial: 'Patrimônio Mundial da UNESCO unindo cultura colonial e biodiversidade da Mata Atlântica. O centro histórico possui calçamento pé-de-moleque onde veículos não circulam. O estacionamento ocorre no entorno do canal e nos bairros Caborê e Pontal.'
  },
  'belo-horizonte': {
    ddd: '31',
    aeroporto: 'Aeroporto Internacional de Confins (CNF) e Aeroporto da Pampulha (PLU)',
    rodovias: 'BR-040 (Rio-BH-Brasília) e BR-381 (Fernão Dias)',
    polosComerciais: 'Bairro Savassi, Lourdes, Região Central e Pampulha',
    distanciaCapital: 'Capital do Estado de MG',
    perfilEditorial: 'Capital gastronômica nacional e polo de mineração, finanças e tecnologia (San Pedro Valley). A Avenida Afonso Pena, Contorno e Cristiano Machado são as principais artérias viárias. O complexo da Pampulha é patrimônio da humanidade da UNESCO.'
  },
  'ouro-preto': {
    ddd: '31',
    aeroporto: 'Acesso pelo Aeroporto Internacional de Confins (CNF - 2h)',
    rodovias: 'Rodovia dos Inconfidentes (BR-356)',
    polosComerciais: 'Praça Tiradentes, Bairro Bauxita (UFOP) e Rua Direita',
    distanciaCapital: '96 km de Belo Horizonte',
    perfilEditorial: 'Monumento histórico do Ciclo do Ouro e barroco mineiro de Aleijadinho. A topografia montanhosa e ruas de pedra exigem calçados confortáveis e condução cuidadosa em aclives acentuados. A UFOP atrai grande população universitária e cultural.'
  },
  'uberlandia': {
    ddd: '34',
    aeroporto: 'Aeroporto de Uberlândia - Ten. Cel. Aviador César Bombonato (UDI)',
    rodovias: 'BR-050 e BR-365',
    polosComerciais: 'Bairro Santa Mônica (UFU), Granja Marileusa, Centro e Bairro Martins',
    distanciaCapital: '530 km de Belo Horizonte e 600 km de SP',
    perfilEditorial: 'Maior polo atacadista e logístico do interior do Brasil, situado no Triângulo Mineiro. Granja Marileusa é o polo de tecnologia e inovação, enquanto a UFU movimenta os setores de educação e serviços.'
  },
  'juiz-de-fora': {
    ddd: '32',
    aeroporto: 'Aeroporto Regional da Zona da Mata (IZA) e Francisco Álvares de Assis (JDF)',
    rodovias: 'BR-040 e BR-267',
    polosComerciais: 'Avenida Rio Branco, Bairro São Mateus, Cascatinha e Granbery',
    distanciaCapital: '260 km de Belo Horizonte e 180 km do RJ',
    perfilEditorial: 'Polo industrial e de serviços da Zona da Mata mineira com forte conexão com o estado do Rio de Janeiro pela BR-040. A Av. Barão do Rio Branco é a principal espinha dorsal de tráfego e comércio da cidade.'
  },
  'montes-claros': {
    ddd: '38',
    aeroporto: 'Aeroporto de Montes Claros - Mário Ribeiro (MOC)',
    rodovias: 'BR-135 e BR-365',
    polosComerciais: 'Centro, Bairro Todos os Santos, Melo e Major Prates',
    distanciaCapital: '420 km de Belo Horizonte',
    perfilEditorial: 'Principal polo econômico e universitário do Norte de Minas Gerais, com forte presença do setor farmacêutico e têxtil. A cidade é entroncamento rodoviário vital para o transporte de passageiros e cargas em direção à Bahia.'
  },
  'curitiba': {
    ddd: '41',
    aeroporto: 'Aeroporto Internacional Afonso Pena (CWB)',
    rodovias: 'BR-277 (Litoral/Interior) e BR-116 (Régis Bittencourt)',
    polosComerciais: 'Bairro Batel, Bigorrilho, Centro Cívico, Cabral e Santa Felicidade',
    distanciaCapital: 'Capital do Estado do PR',
    perfilEditorial: 'Referência mundial em planejamento urbano, transporte público e sustentabilidade. O bairro Batel concentra a gastronomia sofisticada e hotelaria corporativa, enquanto Santa Felicidade é o tradicional polo gastronômico italiano.'
  },
  'londrina': {
    ddd: '43',
    aeroporto: 'Aeroporto de Londrina - Gov. José Richa (LDB)',
    rodovias: 'PR-445 e BR-369',
    polosComerciais: 'Gleba Palhano, Centro, Jardim Higienópolis e Avenida Duque de Caxias',
    distanciaCapital: '380 km de Curitiba',
    perfilEditorial: 'Segunda maior cidade do Paraná e polo do agronegócio e ensino superior no Norte Pioneiro. A Gleba Palhano no entorno do Lago Igapó reúne os edifícios corporativos mais modernos e shoppings de alto padrão.'
  },
  'maringa': {
    ddd: '44',
    aeroporto: 'Aeroporto Regional de Maringá - Silvio Name Júnior (MGF)',
    rodovias: 'PR-317 e BR-376 (Rodovia do Café)',
    polosComerciais: 'Zona 01 / Centro, Zona 07 (UEM) e Avenida Brasil',
    distanciaCapital: '420 km de Curitiba',
    perfilEditorial: 'Cidade arborizada e planejada com altíssima qualidade de vida no Noroeste do Paraná. O Parque do Ingá e a Catedral Basílica Menor Nossa Senhora da Glória são os principais marcos paisagísticos urbanos.'
  },
  'foz-do-iguacu': {
    ddd: '45',
    aeroporto: 'Aeroporto Internacional de Foz do Iguaçu (IGU)',
    rodovias: 'BR-277 (Ligação com Curitiba e Porto de Paranaguá)',
    polosComerciais: 'Avenida Brasil / Centro, Vila Portes (Ponte da Amizade) e Cataratas',
    distanciaCapital: '630 km de Curitiba',
    perfilEditorial: 'Destino turístico internacional de primeira grandeza abrigando as Cataratas do Iguaçu e a Usina Hidrelétrica de Itaipu na Tríplice Fronteira (Brasil, Paraguai e Argentina). Locação de veículos é essencial para travessias e passeios na região.'
  },
  'florianopolis': {
    ddd: '48',
    aeroporto: 'Aeroporto Internacional Hercílio Luz (FLN)',
    rodovias: 'BR-101 e SC-401 (Acesso Norte da Ilha)',
    polosComerciais: 'Centro / Beira-Mar Norte, Lagoa da Conceição, Jurerê Internacional e Trindade (UFSC)',
    distanciaCapital: 'Capital do Estado de SC',
    perfilEditorial: 'A Ilha do Silício combina polo de tecnologia de ponta com mais de 40 praias paradisíacas. A rodovia SC-401 liga o Centro Financeiro a Jurerê e Canasvieiras, com trânsito intenso na temporada de verão.'
  },
  'balneario-camboriu': {
    ddd: '47',
    aeroporto: 'Aeroporto Internacional de Navegantes (NVG - 30 min)',
    rodovias: 'BR-101 Litoral Norte SC',
    polosComerciais: 'Avenida Atlântica, Avenida Brasil, Barra Sul e Pioneiros',
    distanciaCapital: '80 km de Florianópolis',
    perfilEditorial: 'A Dubai Brasileira com os arranha-céus residenciais mais altos da América Latina, vida noturna agitada e a praia central alargada. A mobilidade urbana se faz pelas avenidas Atlântica e Brasil, com fluxo contínuo de turismo de alto padrão.'
  },
  'blumenau': {
    ddd: '47',
    aeroporto: 'Aeroporto Internacional de Navegantes (NVG - 45 min)',
    rodovias: 'BR-470 (Vale do Itajaí) e SC-108',
    polosComerciais: 'Vila Germânica (Oktoberfest), Bairro Victor Konder e Rua XV de Novembro',
    distanciaCapital: '140 km de Florianópolis',
    perfilEditorial: 'Capital Nacional da Cerveja e polo têxtil e de software do Vale Europeu. A arquitetura em enxaimel e a Vila Germânica recebem centenas de milhares de turistas durante a Oktoberfest e festivais gastronômicos.'
  },
  'joinville': {
    ddd: '47',
    aeroporto: 'Aeroporto Lauro Carneiro de Loyola (JOI)',
    rodovias: 'BR-101 e BR-280',
    polosComerciais: 'Centro Industrial, Bairro América, Atiradores e Costa e Silva',
    distanciaCapital: '180 km de Florianópolis',
    perfilEditorial: 'Maior economia de Santa Catarina com poderoso parque industrial metalmecânico e sede da Escola do Teatro Bolshoi no Brasil. A cidade é cortada pela BR-101 com fácil acesso a Curitiba e ao litoral catarinense.'
  },
  'porto-alegre': {
    ddd: '51',
    aeroporto: 'Aeroporto Internacional Salgado Filho (POA)',
    rodovias: 'BR-116, BR-290 (Freeway) e BR-386',
    polosComerciais: 'Moinhos de Vento, Centro Histórico, Menino Deus e Carlos Gomes',
    distanciaCapital: 'Capital do Estado do RS',
    perfilEditorial: 'Polo cultural e econômico do Sul do país com bela orla revitalizada no Lago Guaíba. A Av. Carlos Gomes concentra o centro empresarial corporativo e o bairro Moinhos de Vento reúne hotelaria e gastronomia refinada.'
  },
  'caxias-do-sul': {
    ddd: '54',
    aeroporto: 'Aeroporto Regional Hugo Cantergiani (CXJ)',
    rodovias: 'BR-116 e RS-122 (Serra Gaúcha)',
    polosComerciais: 'Centro, Bairro São Pelegrino, Lourdes e Polo Metalmecânico',
    distanciaCapital: '125 km de Porto Alegre',
    perfilEditorial: 'Coração industrial e vitivinícola da Serra Gaúcha, sede da Festa Nacional da Uva. A RS-122 é a via de escoamento industrial e conexão turística com Bento Gonçalves, Farroupilha e Gramado.'
  },
  'gramado': {
    ddd: '54',
    aeroporto: 'Aeroporto Regional de Caxias (CXJ) ou Salgado Filho POA (1h45)',
    rodovias: 'RS-115 (Taquara/Gramado) e RS-235 (Nova Petrópolis/Canela)',
    polosComerciais: 'Avenida Borges de Medeiros, Rua Coberta, Bairro Planalto e Bavária',
    distanciaCapital: '115 km de Porto Alegre',
    perfilEditorial: 'Principal destino de inverno e turismo temático do Brasil, famoso pelo Natal Luz e Festival de Cinema. As avenidas Borges de Medeiros e das Hortênsias concentram fábricas de chocolate artesanal, fondues e hotéis de alto luxo.'
  },
  'brasilia': {
    ddd: '61',
    aeroporto: 'Aeroporto Internacional Presidente Juscelino Kubitschek (BSB)',
    rodovias: 'BR-040, BR-060 e BR-020',
    polosComerciais: 'Setor Comercial Sul/Norte, Esplanada dos Ministérios, Asa Sul e Asa Norte',
    distanciaCapital: 'Distrito Federal (Capital do País)',
    perfilEditorial: 'Centro do poder político e administrativo nacional com arquitetura tombada de Oscar Niemeyer. O Eixo Monumental e as W3 Sul/Norte ordenam a mobilidade planejada em setores de embaixadas, ministérios e hotelaria executiva.'
  },
  'goiania': {
    ddd: '62',
    aeroporto: 'Aeroporto Internacional Santa Genoveva (GYN)',
    rodovias: 'BR-153 e BR-060',
    polosComerciais: 'Setor Bueno, Setor Marista, Centro e Bairro Oeste',
    distanciaCapital: 'Capital do Estado de GO',
    perfilEditorial: 'Capital do Centro-Oeste com expressiva força no agronegócio, moda atacadista e serviços médicos. O Setor Marista e Bueno abrigam parques arborizados (Vaca Brava e Areião) e renomada gastronomia sertaneja e internacional.'
  },
  'anapolis': {
    ddd: '62',
    aeroporto: 'Base Aérea / Conexão via Santa Genoveva GYN (40 min)',
    rodovias: 'BR-153 e BR-060 (Eixo Goiânia-Brasília)',
    polosComerciais: 'DAIA (Distrito Agroindustrial), Centro e Jundiaí',
    distanciaCapital: '55 km de Goiânia',
    perfilEditorial: 'Importante polo farmacêutico e logístico do país situado estrategicamente entre Brasília e Goiânia. O DAIA abriga montadoras e multinacionais químicas conectadas pela ferrovia Norte-Sul.'
  },
  'rio-verde': {
    ddd: '64',
    aeroporto: 'Aeroporto General Leite de Castro (RVD)',
    rodovias: 'BR-060 e BR-452',
    polosComerciais: 'Polo do Agronegócio, Setor Central e Morada do Sol',
    distanciaCapital: '230 km de Goiânia',
    perfilEditorial: 'Gigante da produção de soja, milho e carnes do Sudoeste Goiano. A BR-060 escoa a safra agrícola para os portos e centros consumidores, atraindo empresas multinacionais de insumos e maquinários agrícolas.'
  },
  'caldas-novas': {
    ddd: '64',
    aeroporto: 'Aeroporto Nelson Ribeiro Guimarães (CLV)',
    rodovias: 'GO-213 e GO-139',
    polosComerciais: 'Setor Termal, Do Turista e Centro',
    distanciaCapital: '170 km de Goiânia',
    perfilEditorial: 'Maior estância hidrotermal do planeta com dezenas de condomínios resort e parques aquáticos de águas quentes naturais que recebem milhões de turistas rodoviários e aéreos o ano todo.'
  },
  'pirenopolis': {
    ddd: '62',
    aeroporto: 'Acesso via Brasília BSB (2h) ou Goiânia GYN (1h40)',
    rodovias: 'GO-431 e GO-338',
    polosComerciais: 'Rua do Lazer, Centro Histórico e Alto do Bonfim',
    distanciaCapital: '120 km de Goiânia',
    perfilEditorial: 'Joia colonial encravada nos Pireneus goianos, célebre pela Festa do Divino e Cavalhadas. A Rua do Lazer é famosa pelas mesas ao ar livre, enquanto o Parque Estadual abriga dezenas de cachoeiras de preservação ambiental.'
  },
  'cuiaba': {
    ddd: '65',
    aeroporto: 'Aeroporto Internacional Marechal Rondon (CGB) em Várzea Grande',
    rodovias: 'BR-163 e BR-364',
    polosComerciais: 'Avenida do CPA, Bairro Goiabeiras, Santa Rosa e Centro',
    distanciaCapital: 'Capital do Estado de MT',
    perfilEditorial: 'Portão de entrada para o Pantanal e Chapada dos Guimarães, centro de comando do agronegócio de Mato Grosso. As avenidas do CPA e Miguel Sutil concentram órgãos públicos, concessionárias e centros empresariais.'
  },
  'campo-grande': {
    ddd: '67',
    aeroporto: 'Aeroporto Internacional de Campo Grande (CGR)',
    rodovias: 'BR-163 e BR-262',
    polosComerciais: 'Avenida Afonso Pena, Bairro Chácara Cachoeira e Centro',
    distanciaCapital: 'Capital do Estado de MS',
    perfilEditorial: 'A Cidade Morena é o centro logístico e cultural do Mato Grosso do Sul e rota de acesso a Bonito e Pantanal Sul. A Av. Afonso Pena é o cartão postal ladeado pelo Parque das Nações Indígenas.'
  },
  'bonito': {
    ddd: '67',
    aeroporto: 'Aeroporto Regional de Bonito (BYO)',
    rodovias: 'MS-178 e MS-382',
    polosComerciais: 'Rua Coronel Pilad Rebuá / Centro e Ecoturismo',
    distanciaCapital: '290 km de Campo Grande',
    perfilEditorial: 'Meca mundial do ecoturismo sustentável com flutuações em rios de transparência única (Rio da Prata, Sucuri) e a Gruta do Lago Azul. A gestão de vouchers digitais garante capacidade de carga controlada em todos os atrativos.'
  },
  'salvador': {
    ddd: '71',
    aeroporto: 'Aeroporto Internacional Dep. Luís Eduardo Magalhães (SSA)',
    rodovias: 'BR-324 e BA-099 (Estrada do Coco / Linha Verde)',
    polosComerciais: 'Avenida Tancredo Neves / Iguatemi, Barra, Rio Vermelho e Pelourinho',
    distanciaCapital: 'Capital do Estado da BA',
    perfilEditorial: 'Primeira capital do Brasil, terra do axé, do Pelourinho e do Carnaval. A Avenida Tancredo Neves é o centro financeiro da cidade, enquanto a orla da Barra ao Farol de Itapuã concentra os hotéis de praia e restaurantes de acarajé.'
  },
  'feira-de-santana': {
    ddd: '75',
    aeroporto: 'Aeroporto Gov. João Durval Carneiro (FEC)',
    rodovias: 'BR-324, BR-101 e BR-116 (Maior entroncamento rodoviário do Nordeste)',
    polosComerciais: 'Centro, Bairro Kalilândia, Santa Mônica e Polo Logístico',
    distanciaCapital: '108 km de Salvador',
    perfilEditorial: 'A Princesa do Sertão é o maior entroncamento rodoviário do Norte/Nordeste ligando o Sul ao litoral nordestino. O comércio atacadista e o polo de transportes e logística são os motores de sua economia.'
  },
  'recife': {
    ddd: '81',
    aeroporto: 'Aeroporto Internacional dos Guararapes / Gilberto Freyre (REC)',
    rodovias: 'BR-101 e BR-232',
    polosComerciais: 'Boa Viagem, Porto Digital / Recife Antigo, Ilha do Leite e Casa Forte',
    distanciaCapital: 'Capital do Estado de PE',
    perfilEditorial: 'Capital da cultura pernambucana, do frevo e sede do Porto Digital (maior parque tecnológico urbano do Brasil). Boa Viagem concentra a orla e hotéis 5 estrelas, enquanto a BR-101 Sul leva até Porto de Galinhas e Suape.'
  },
  'caruaru': {
    ddd: '81',
    aeroporto: 'Aeroporto Oscar Laranjeira (CAU) / Conexão Guararapes REC',
    rodovias: 'BR-232 (Duplicada) e BR-104',
    polosComerciais: 'Feira de Caruaru / Polo de Confecções, Bairro Maurício de Nassau e Centro',
    distanciaCapital: '135 km de Recife',
    perfilEditorial: 'Capital do Forró e maior polo têxtil e de confecções do Agreste Pernambucano. A Feira de Caruaru e o Pátio do Forró são patrimônios culturais de reconhecimento nacional no Alto do Moura.'
  },
  'fortaleza': {
    ddd: '85',
    aeroporto: 'Aeroporto Internacional Pinto Martins (FOR)',
    rodovias: 'BR-116 e CE-040 (Litoral Leste)',
    polosComerciais: 'Avenida Beira-Mar / Meireles, Aldeota, Praia de Iracema e Centro',
    distanciaCapital: 'Capital do Estado do CE',
    perfilEditorial: 'Polo turístico e hub aéreo internacional do Nordeste. A orla da Beira-Mar conta com feira de artesanato diária e mercado de peixes no Mucuripe, com conexão rodoviária expressa para o Beach Park em Aquiraz e Cumbuco.'
  },
  'jericoacoara': {
    ddd: '88',
    aeroporto: 'Aeroporto Regional Comandante Ariston Pessoa (JJD) em Cruz',
    rodovias: 'CE-085 (Estruturante) e transfer 4x4',
    polosComerciais: 'Vila de Jericoacoara, Rua Principal e Praia da Malhada',
    distanciaCapital: '300 km de Fortaleza',
    perfilEditorial: 'Parque Nacional de dunas e praias intocadas no litoral oeste cearense, santuário mundial do kitesurf e windsurf. As ruas de areia proíbem carros comuns, sendo obrigatório o acesso por jardineiras 4x4 a partir de Jijoca.'
  },
  'natal': {
    ddd: '84',
    aeroporto: 'Aeroporto Internacional Gov. Aluízio Alves (NAT) em São Gonçalo do Amarante',
    rodovias: 'BR-101 e Rota do Sol',
    polosComerciais: 'Praia de Ponta Negra, Bairro Petrópolis, Tirol e Via Costeira',
    distanciaCapital: 'Capital do Estado do RN',
    perfilEditorial: 'A Cidade do Sol possui o ar mais puro das Américas e as famosas Dunas de Genipabu. A Praia de Ponta Negra com o Morro do Careca é o coração da hotelaria e gastronomia potiguar.'
  },
  'joao-pessoa': {
    ddd: '83',
    aeroporto: 'Aeroporto Internacional Presidente Castro Pinto (JPA)',
    rodovias: 'BR-101 e BR-230',
    polosComerciais: 'Tambaú, Cabo Branco, Manaíra e Bessa',
    distanciaCapital: 'Capital do Estado da PB',
    perfilEditorial: 'Ponto mais oriental das Américas na Ponta do Seixas com orla protegida por lei sem espigões. A tranquilidade e praias urbanas de Cabo Branco e Tambaú fazem da cidade uma das mais procuradas para moradia e turismo de bem-estar.'
  },
  'maceio': {
    ddd: '82',
    aeroporto: 'Aeroporto Internacional Zumbi dos Palmares (MCZ)',
    rodovias: 'BR-101 e AL-101 (Litoral Norte e Sul)',
    polosComerciais: 'Pajuçara, Ponta Verde, Jatiúca e Stella Maris',
    distanciaCapital: 'Capital do Estado de AL',
    perfilEditorial: 'O Caribe Brasileiro encanta pela cor verde-esmeralda do mar e piscinas naturais de Pajuçara com jangadas a vela. A AL-101 Norte leva às praias paradisíacas de São Miguel dos Milagres e Maragogi.'
  },
  'aracaju': {
    ddd: '79',
    aeroporto: 'Aeroporto Internacional Santa Maria (AJU)',
    rodovias: 'BR-101 e BR-235',
    polosComerciais: 'Orla de Atalaia, Bairro 13 de Julho, Jardins e Centro',
    distanciaCapital: 'Capital do Estado de SE',
    perfilEditorial: 'Capital planejada com uma das orlas mais estruturadas do Brasil na Praia de Atalaia, com oceanário, lagos e passarela do caranguejo. Cidade plana de trânsito fluido e acolhimento sergipano.'
  },
  'teresina': {
    ddd: '86',
    aeroporto: 'Aeroporto Senador Petrônio Portella (THE)',
    rodovias: 'BR-343 e BR-316',
    polosComerciais: 'Bairro Jóquei / Zona Leste, Centro e Shopping Rio Poty',
    distanciaCapital: 'Capital do Estado do PI',
    perfilEditorial: 'A Cidade Verde é a única capital do Nordeste no interior, entre os rios Parnaíba e Poti. Polo de referência em serviços de saúde e educação para todo o Meio-Norte do Brasil.'
  },
  'sao-luis': {
    ddd: '98',
    aeroporto: 'Aeroporto Internacional Marechal Cunha Machado (SLZ)',
    rodovias: 'BR-135 (Único acesso rodoviário à ilha)',
    polosComerciais: 'Ponta d Areia, Renascença, Calhau e Centro Histórico',
    distanciaCapital: 'Capital do Estado do MA',
    perfilEditorial: 'A Ilha do Amor é patrimônio da UNESCO com o maior conjunto arquitetônico de azulejaria portuguesa da América Latina, capital nacional do reggae e porta de entrada para os Lençóis Maranhenses.'
  },
  'belem': {
    ddd: '91',
    aeroporto: 'Aeroporto Internacional Val-de-Cans / Júlio Cezar Ribeiro (BEL)',
    rodovias: 'BR-316 e Rodovia Augusto Montenegro',
    polosComerciais: 'Bairro Nazaré, Umarizal, Doca de Souza Franco e Estação das Docas',
    distanciaCapital: 'Capital do Estado do PA',
    perfilEditorial: 'Metrópole da Amazônia e sede da COP30, terra do Círio de Nazaré e da mais rica gastronomia amazônica (Mercado Ver-o-Peso). A Estação das Docas revitalizou a orla da Baía do Guajará.'
  },
  'alter-do-chao': {
    ddd: '93',
    aeroporto: 'Aeroporto Internacional Maestro Wilson Fonseca em Santarém (STM - 35 km)',
    rodovias: 'PA-457 (Rodovia Everaldo Martins)',
    polosComerciais: 'Vila de Alter do Chão, Orla do Rio Tapajós e Ilha do Amor',
    distanciaCapital: '35 km de Santarém e 1.300 km de Belém',
    perfilEditorial: 'O Caribe Amazônico eleito pelo The Guardian uma das praias fluviais mais bonitas do mundo no Rio Tapajós. A Ilha do Amor e a Floresta Nacional do Tapajós são os cartões postais ecológicos.'
  },
  'manaus': {
    ddd: '92',
    aeroporto: 'Aeroporto Internacional Eduardo Gomes (MAO)',
    rodovias: 'BR-174 (Acesso a Roraima) e transporte hidroviário',
    polosComerciais: 'Bairro Adrianópolis, Ponta Negra, Distrito Industrial e Centro Histórico',
    distanciaCapital: 'Capital do Estado do AM',
    perfilEditorial: 'Coração da Amazônia unindo o exuberante Teatro Amazonas, o Encontro das Águas dos rios Negro e Solimões e o Polo Industrial de Manaus (ZFM), um dos maiores polos eletroeletrônicos da América do Sul.'
  },
  'jalapao': {
    ddd: '63',
    aeroporto: 'Aeroporto Brigadeiro Lysias Rodrigues em Palmas (PMW) + transfer 4x4',
    rodovias: 'TO-030 e TO-255 (Ponte Alta do Tocantins e Mateiros)',
    polosComerciais: 'Polo Ecoturístico de Mateiros e Ponte Alta do Tocantins',
    distanciaCapital: '300 km de Palmas',
    perfilEditorial: 'Santuário de fervedouros de água cristalina, dunas douradas e cachoeiras no coração do cerrado tocantinense. A circulação é exclusiva para veículos 4x4 com guias credenciados.'
  }
};

module.exports = { REAL_CITY_DATA };
