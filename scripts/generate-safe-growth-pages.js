#!/usr/bin/env node
/**
 * Generates useful, source-conscious growth pages for the portal's 64 dedicated city tenants.
 * It never invents vacancies, public notices, emergency alerts, discounts or advertiser URLs.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { CITIES_INFO } = require('./community-feed-harvester-engine');
const { REAL_CITY_DATA } = require('./geo-local-data');
const WEATHER_CONFIG = require('../data/growth-city-weather-config.json');
const WEATHER_BY_CITY = Object.fromEntries(WEATHER_CONFIG.map(row => [row.city_slug, row]));

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'guias');
const TODAY = '2026-08-14';
const TODAY_BR = '14 de agosto de 2026';
const VERSION = 'safe-growth-2026.08.14';

const TOPICS = [
  { key: 'home_office', slug: 'home-office-sem-experiencia-2026', short: 'Home office', icon: '💻' },
  { key: 'concursos', slug: 'concursos-municipais-como-consultar-2026', short: 'Concursos', icon: '📋' },
  { key: 'clima_energia', slug: 'ventos-fortes-e-falta-de-luz-preparacao', short: 'Clima e energia', icon: '🌦️' },
  { key: 'economia_energia', slug: 'como-reduzir-conta-de-luz-2026', short: 'Economia de energia', icon: '⚡' },
  { key: 'moda_country', slug: 'moda-country-chapeus-guia-de-compra', short: 'Moda country', icon: '🤠' },
  { key: 'tecnologia_social', slug: 'tecnologia-popular-no-tiktok-guia-de-compra', short: 'Tecnologia em vídeos curtos', icon: '📱' }
];

const REGIONS = {
  AC:'Norte', AM:'Norte', AP:'Norte', PA:'Norte', RO:'Norte', RR:'Norte', TO:'Norte',
  AL:'Nordeste', BA:'Nordeste', CE:'Nordeste', MA:'Nordeste', PB:'Nordeste', PE:'Nordeste', PI:'Nordeste', RN:'Nordeste', SE:'Nordeste',
  DF:'Centro-Oeste', GO:'Centro-Oeste', MT:'Centro-Oeste', MS:'Centro-Oeste',
  ES:'Sudeste', MG:'Sudeste', RJ:'Sudeste', SP:'Sudeste',
  PR:'Sul', RS:'Sul', SC:'Sul'
};

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function xml(value) { return esc(value); }
function compactSlug(slug) { return slug.replace(/-/g, ''); }
function tenant(city) { return `${compactSlug(city.slug)}.aquitemachadinhos.com.br`; }
function routeFor(city, topic) { return `/guias/${city.slug}/${topic.slug}`; }
function canonicalFor(city, topic) { return `https://${tenant(city)}${routeFor(city, topic)}`; }
function cityHubRoute(city) { return `/guias/${city.slug}`; }
function cityHubCanonical(city) { return `https://${tenant(city)}${cityHubRoute(city)}`; }
function affiliate(partner, city, source) {
  return `/affiliate-redirect.html?partner=${encodeURIComponent(partner)}&city=${encodeURIComponent(city.slug)}&source=${encodeURIComponent(source)}`;
}
function cityContext(city) {
  const geo = REAL_CITY_DATA[city.slug] || {};
  const profile = String(geo.perfilEditorial || '').split(/(?<=[.!?])\s+/)[0] || `${city.name} integra a rede regional de serviços de ${REGIONS[city.uf] || 'Brasil'}.`;
  const poles = geo.polosComerciais ? `Entre as referências locais cadastradas estão ${geo.polosComerciais}.` : `O planejamento deve considerar os bairros e polos de serviço de ${city.name}.`;
  return { profile, poles, region: REGIONS[city.uf] || 'Brasil', ddd: geo.ddd || '' };
}
function nav(city) {
  return `<div class="topic-nav">${TOPICS.map(t => `<a href="${routeFor(city,t)}">${t.icon} ${esc(t.short)}</a>`).join('')}</div>`;
}
function sources(items) {
  return `<ul class="source-list">${items.map(x => `<li><strong>${esc(x.label)}</strong>${x.url ? ` · <a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">abrir fonte</a>` : ''}<div class="fine">${esc(x.note)}</div></li>`).join('')}</ul>`;
}

function contentFor(city, topic) {
  const c = cityContext(city);
  const commonLocal = `<p>${esc(c.profile)} ${esc(c.poles)} A localização serve para organizar a busca; não altera requisitos definidos por empregadores, órgãos públicos, concessionárias ou lojas.</p>`;

  if (topic.key === 'home_office') return {
    title: `Home office sem experiência em ${city.name}: roteiro seguro para 2026`,
    description: `Como procurar trabalho remoto de entrada em ${city.name}/${city.uf}, preparar currículo, verificar recrutadores e evitar golpes em 2026.`,
    eyebrow: 'Guia de carreira · 2026',
    truth: `<strong>Transparência:</strong> “sem experiência” descreve funções de entrada, não promessa de contratação. Esta página não anuncia vaga aberta sem empresa, fonte e data de verificação.`,
    body: `<section class="section grid"><article class="card"><h2>Onde começar sem inventar atalhos</h2>${commonLocal}<p>Priorize anúncios que informem empresa, atribuições, jornada, modalidade remota ou híbrida e canal oficial. Nunca pague para participar de processo seletivo.</p></article><article class="card"><h2>Sinais de anúncio verificável</h2><ul class="steps"><li><div><strong>Identidade</strong><br>Nome empresarial, domínio corporativo e descrição objetiva.</div></li><li><div><strong>Processo</strong><br>Etapas, responsável e política de privacidade compreensíveis.</div></li><li><div><strong>Validade</strong><br>Data da publicação e confirmação de que a seleção continua recebendo candidaturas.</div></li></ul></article><article class="card wide"><h2>Funções de entrada e o que preparar</h2><div class="table-wrap"><table><thead><tr><th>Área</th><th>Rotina comum</th><th>Competência demonstrável</th><th>Alerta</th></tr></thead><tbody><tr><td>Atendimento digital</td><td>Chat, e-mail e registro de solicitações</td><td>Escrita clara e organização</td><td>Não compartilhe senha ou código</td></tr><tr><td>Vendas internas</td><td>Contato com leads e atualização de CRM</td><td>Comunicação e metas</td><td>Comissão deve estar no contrato</td></tr><tr><td>Assistência administrativa</td><td>Planilhas, agenda e documentos</td><td>Editor de texto e planilhas</td><td>Desconfie de “kit de admissão” pago</td></tr><tr><td>Moderação e cadastro</td><td>Revisão de conteúdo e dados</td><td>Atenção a regras</td><td>Confirme quem tratará seus dados</td></tr></tbody></table></div></article></section><section class="section"><div class="cta"><h2>Próximo passo em ${esc(city.name)}</h2><p>Consulte somente anúncios publicados no catálogo local e confirme o vínculo no site oficial da empresa antes de enviar documentos.</p><div class="actions"><a class="btn primary" href="/vagas.html?cidade=${esc(city.slug)}">Ver anúncios cadastrados</a><a class="btn secondary" href="${affiliate('udemy',city,'home-office-skills')}" rel="nofollow sponsored">Desenvolver competências na Udemy</a></div><p class="disclosure">O segundo link é de afiliado e só é acionado após seu clique. Curso não garante emprego.</p></div></section>`,
    sources: [{label:'Carteira de Trabalho Digital — gov.br',url:'https://www.gov.br/pt-br/temas/carteira-de-trabalho-digital',note:'Canal público para serviços trabalhistas e vínculos.'},{label:'Consumidor.gov.br',url:'https://www.consumidor.gov.br/',note:'Canal oficial de solução de conflitos de consumo; não substitui denúncia criminal.'}]
  };

  if (topic.key === 'concursos') return {
    title: `Concursos municipais em ${city.name}: como verificar editais em 2026`,
    description: `Roteiro para confirmar concursos e processos seletivos de ${city.name}/${city.uf} em fontes oficiais, sem inventar vagas ou prazos.`,
    eyebrow: 'Utilidade pública · verificação oficial',
    truth: `<strong>Status editorial:</strong> esta é uma página de verificação, não um anúncio com prazo vigente. Só considere um certame ativo depois de localizar edital oficial, retificações e cronograma.`,
    body: `<section class="section grid"><article class="card"><h2>Ordem correta de conferência</h2>${commonLocal}<ol class="steps"><li><div>Abra o portal institucional ou da transparência do município.</div></li><li><div>Localize o edital completo e confirme órgão, número, ano e banca.</div></li><li><div>Leia retificações, requisitos, taxa, isenção e datas diretamente no documento.</div></li><li><div>Faça a inscrição apenas no domínio indicado pelo edital.</div></li></ol></article><article class="card"><h2>O que anotar</h2><div class="table-wrap"><table><thead><tr><th>Campo</th><th>Por que importa</th></tr></thead><tbody><tr><td>Número e ano do edital</td><td>Distingue seleções diferentes</td></tr><tr><td>Banca e domínio</td><td>Evita páginas imitadoras</td></tr><tr><td>Período e fuso</td><td>Reduz risco de perder prazo</td></tr><tr><td>Retificações</td><td>Podem alterar vagas, prova e datas</td></tr><tr><td>Comprovante</td><td>Registra inscrição e pagamento</td></tr></tbody></table></div></article><article class="card wide"><h2>Regra anti-golpe</h2><p>Não use apenas posts, mensagens ou esta página como prova de inscrição aberta. Em ${esc(city.name)}, o documento oficial e o domínio informado nele prevalecem. PIX para pessoa física, urgência sem edital e promessa de aprovação são sinais de risco.</p></article></section><section class="section"><div class="cta"><h2>Prepare-se sem confundir curso com edital</h2><p>Materiais de estudo podem ajudar na rotina, mas não são “oficiais” a menos que o órgão responsável diga isso.</p><div class="actions"><a class="btn primary" href="https://www.in.gov.br/consulta" target="_blank" rel="noopener noreferrer">Consultar Diário Oficial da União</a><a class="btn secondary" href="${affiliate('udemy',city,'concursos-skills')}" rel="nofollow sponsored">Ver cursos gerais na Udemy</a></div><p class="disclosure">Link de afiliado no segundo botão. Confira sempre o conteúdo programático do edital municipal.</p></div></section>`,
    sources: [{label:'Diário Oficial da União',url:'https://www.in.gov.br/consulta',note:'Útil para atos federais; o município pode usar diário próprio ou regional.'},{label:'Portal de Serviços do Governo Federal',url:'https://www.gov.br/pt-br/servicos',note:'Diretório oficial de serviços públicos federais.'},{label:`Portal institucional de ${city.name}`,url:'',note:'Pesquise o domínio governamental do município e valide o certificado antes de informar dados.'}]
  };

  if (topic.key === 'clima_energia') {
    const weather = WEATHER_BY_CITY[city.slug];
    if (!weather) throw new Error(`Missing weather configuration for ${city.slug}`);
    return {
      title: `Clima, vento e falta de luz em ${city.name}: dados e preparação`,
      description: `Dados meteorológicos atuais da Open-Meteo, fontes oficiais e preparação para vento, chuva ou falta de energia em ${city.name}/${city.uf}.`,
      eyebrow: 'Dados meteorológicos reais · preparação preventiva',
      truth: `<strong>Distinção de fontes:</strong> a Open-Meteo fornece observação e previsão, mas não emite alerta da Defesa Civil. Esta página não afirma que exista emergência ou interrupção ativa em ${esc(city.name)}. Para alertas oficiais, consulte INMET e Defesa Civil. Em emergência, ligue 193 ou 199.`,
      body: `<section class="section"><article class="card wide open-meteo-card" data-open-meteo data-city="${esc(city.slug)}" data-latitude="${weather.latitude}" data-longitude="${weather.longitude}" aria-live="polite"><div class="weather-heading"><div><span class="eyebrow"><span class="dot"></span>Open-Meteo · atualização sob demanda</span><h2>Condições meteorológicas em ${esc(city.name)}</h2></div><span class="chip" data-weather-status>Carregando dados reais…</span></div><div class="weather-grid"><div class="weather-metric"><span>Temperatura</span><strong data-weather-temperature>—</strong></div><div class="weather-metric"><span>Sensação</span><strong data-weather-apparent>—</strong></div><div class="weather-metric"><span>Vento</span><strong data-weather-wind>—</strong></div><div class="weather-metric"><span>Rajadas</span><strong data-weather-gust>—</strong></div><div class="weather-metric"><span>Condição</span><strong data-weather-condition>—</strong></div><div class="weather-metric"><span>Mínima e máxima</span><strong data-weather-range>—</strong></div><div class="weather-metric"><span>Probabilidade máx. de chuva</span><strong data-weather-rain>—</strong></div></div><p class="fine">Horário do dado: <span data-weather-updated>aguardando resposta</span>. Coordenadas editoriais aproximadas: ${weather.latitude}, ${weather.longitude}. Não substitui alerta oficial.</p></article></section><section class="section grid"><article class="card"><h2>Antes do mau tempo</h2>${commonLocal}<ul class="steps"><li><div>Ative notificações oficiais da Defesa Civil quando disponíveis.</div></li><li><div>Carregue celular e iluminação portátil certificada; mantenha remédios essenciais acessíveis.</div></li><li><div>Retire objetos soltos de janelas, varandas e quintais.</div></li><li><div>Guarde os canais da distribuidora que aparece na sua conta de luz.</div></li></ul></article><article class="card"><h2>Durante vento ou queda de energia</h2><div class="table-wrap"><table><thead><tr><th>Situação</th><th>Ação prudente</th></tr></thead><tbody><tr><td>Fio caído</td><td>Não toque nem se aproxime; avise a distribuidora e emergência</td></tr><tr><td>Árvore próxima à rede</td><td>Não faça poda por conta própria</td></tr><tr><td>Casa alagada</td><td>Não entre se houver risco elétrico</td></tr><tr><td>Gerador</td><td>Use só em ambiente ventilado e conforme o fabricante</td></tr><tr><td>Alimento refrigerado</td><td>Mantenha portas fechadas e siga orientação sanitária</td></tr></tbody></table></div></article><article class="card wide"><h2>Como confirmar a situação local</h2><p>Veja o mapa de avisos do INMET, consulte mensagens da Defesa Civil e use o canal da distribuidora indicado na fatura. Não conclua que toda oscilação é causada pelo clima: falhas internas também exigem eletricista habilitado.</p></article></section>`,
      sources: [{label:'Open-Meteo',url:'https://open-meteo.com/',note:'API aberta usada apenas para observação e previsão meteorológica; não é alerta oficial.'},{label:'INMET — avisos meteorológicos',url:'https://alertas2.inmet.gov.br/',note:'Mapa nacional de avisos emitidos pelo instituto.'},{label:'CEMADEN',url:'https://www.gov.br/cemaden/pt-br',note:'Informações sobre monitoramento de riscos e desastres naturais.'},{label:'Defesa Civil',url:'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil',note:'Orientações nacionais; o atendimento local pode usar 199.'},{label:'ANEEL',url:'https://www.gov.br/aneel/pt-br',note:'Informações regulatórias e canais sobre distribuição de energia.'}]
    };
  }

  if (topic.key === 'economia_energia') return {
    title: `Como reduzir a conta de luz em ${city.name} legalmente em 2026`,
    description: `Medidas residenciais legais e seguras para acompanhar consumo e reduzir desperdício de energia em ${city.name}/${city.uf}.`,
    eyebrow: 'Economia doméstica · segurança elétrica',
    truth: `<strong>Limite de segurança:</strong> nunca altere medidor, lacre ou ligação da distribuidora. Fraude de energia é ilegal e intervenções elétricas devem ser feitas por profissional habilitado.`,
    body: `<section class="section grid"><article class="card"><h2>Comece pela leitura da fatura</h2>${commonLocal}<p>Compare o consumo em kWh, não apenas o valor em reais. Observe período de leitura, bandeira tarifária, tributos e histórico. Se houver salto sem mudança de hábito, revise equipamentos e peça orientação à distribuidora.</p></article><article class="card"><h2>Plano de sete dias</h2><ol class="steps"><li><div>Registre o kWh atual e o número de moradores.</div></li><li><div>Mapeie chuveiro, ar-condicionado, freezer e equipamentos antigos.</div></li><li><div>Defina horários e temperaturas confortáveis, sem uso excessivo.</div></li><li><div>Elimine stand-by quando for seguro desligar.</div></li><li><div>Compare a próxima leitura em condições semelhantes.</div></li></ol></article><article class="card wide"><h2>Prioridades com melhor relação esforço/controle</h2><div class="table-wrap"><table><thead><tr><th>Ação</th><th>Como fazer</th><th>Cuidados</th></tr></thead><tbody><tr><td>Chuveiro</td><td>Reduzir tempo e usar ajuste adequado à estação</td><td>Não improvise resistência</td></tr><tr><td>Climatização</td><td>Limpar filtros, vedar ambiente e ajustar temperatura</td><td>Siga o manual</td></tr><tr><td>Geladeira</td><td>Checar borracha, ventilação e abertura de porta</td><td>Não obstrua a traseira</td></tr><tr><td>Iluminação</td><td>Trocar pontos frequentes por LED certificado</td><td>Respeite tensão e soquete</td></tr><tr><td>Instalação</td><td>Solicitar inspeção se houver aquecimento ou desarme</td><td>Chame eletricista habilitado</td></tr></tbody></table></div></article></section><section class="section"><div class="cta"><h2>Use canais regulados</h2><p>Programas de tarifa social e eficiência têm critérios próprios. Confirme elegibilidade na distribuidora, no CadÚnico e nos canais oficiais.</p><div class="actions"><a class="btn primary" href="https://www.gov.br/aneel/pt-br/assuntos/tarifas" target="_blank" rel="noopener noreferrer">Consultar tarifas na ANEEL</a></div></div></section>`,
    sources: [{label:'ANEEL — tarifas',url:'https://www.gov.br/aneel/pt-br/assuntos/tarifas',note:'Referência regulatória nacional.'},{label:'PROCEL Info',url:'http://www.procelinfo.com.br/',note:'Informações de eficiência energética; confira disponibilidade do serviço.'},{label:'Distribuidora da residência',url:'',note:'Use o nome e os canais impressos na conta de energia para evitar falsos atendimentos.'}]
  };

  if (topic.key === 'moda_country') return {
    title: `Moda country e chapéus em ${city.name}: guia de compra consciente`,
    description: `Como comparar chapéu, bota e look country em ${city.name}/${city.uf}, medir tamanho e verificar preço, prazo e devolução antes da compra.`,
    eyebrow: 'Achadinhos · comparação sem desconto inventado',
    truth: `<strong>Preços mudam:</strong> o portal não promete percentual de desconto nem estoque. Abra a loja parceira, confira vendedor, medida, frete, prazo e política de devolução antes de pagar.`,
    body: `<section class="section grid"><article class="card"><h2>Chapéu: ajuste antes do estilo</h2>${commonLocal}<p>Meça a circunferência da cabeça cerca de um dedo acima das sobrancelhas e orelhas. Compare em centímetros com a tabela do fabricante; letras P, M e G variam entre marcas.</p><div class="table-wrap"><table><thead><tr><th>Critério</th><th>O que conferir</th></tr></thead><tbody><tr><td>Copa e aba</td><td>Formato, rigidez e proporção no rosto</td></tr><tr><td>Material</td><td>Palha, feltro ou sintético; ventilação e manutenção</td></tr><tr><td>Carneira</td><td>Conforto e possibilidade de ajuste</td></tr><tr><td>Transporte</td><td>Embalagem que preserve a aba</td></tr></tbody></table></div></article><article class="card"><h2>Bota e composição do look</h2><ul class="steps"><li><div>Compare comprimento do pé, largura e altura do cano.</div></li><li><div>Confira material do cabedal, solado e tipo de costura.</div></li><li><div>Para uso prolongado, priorize estabilidade e conforto.</div></li><li><div>Leia avaliações sobre numeração, não só sobre aparência.</div></li></ul><p>Jeans, camisa, cinto e acessórios devem funcionar entre si; tendência não substitui caimento.</p></article><article class="card wide"><h2>Checklist de compra online</h2><p>Identifique o vendedor, compare o preço final com frete, salve a descrição, confirme prazo para ${esc(city.name)} e leia as regras de troca. Não pague fora do checkout da plataforma.</p></article></section><section class="section"><div class="cta"><h2>Comparar em vitrines parceiras</h2><p>Os botões abrem destinos de afiliado já cadastrados no portal. A navegação externa acontece somente após seu clique.</p><div class="actions"><a class="btn primary" href="${affiliate('shein',city,'moda-country')}" rel="nofollow sponsored">Ver vitrine SHEIN</a><a class="btn secondary" href="${affiliate('shopee',city,'moda-country')}" rel="nofollow sponsored">Ver vitrine Shopee</a></div><p class="disclosure">Podemos receber comissão sem custo adicional. Nenhuma oferta, estoque ou desconto é garantido.</p></div></section>`,
    sources: [{label:'Código de Defesa do Consumidor',url:'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm',note:'Texto legal consolidado.'},{label:'Consumidor.gov.br',url:'https://www.consumidor.gov.br/',note:'Serviço público para interlocução com empresas participantes.'}]
  };

  return {
    title: `Tecnologia popular no TikTok em ${city.name}: como comprar sem cair em hype`,
    description: `Guia para avaliar eletrônicos vistos no TikTok e em vídeos curtos antes de comprar em ${city.name}/${city.uf}, sem alegar viralização não comprovada.`,
    eyebrow: 'Tecnologia · verificação antes da compra',
    truth: `<strong>Sem “viral da semana” inventado:</strong> esta página não atribui tendência semanal a um produto sem fonte pública, data e métrica. O foco é ajudar você a avaliar itens vistos em vídeos curtos.`,
    body: `<section class="section grid"><article class="card"><h2>O vídeo mostra; a ficha técnica prova</h2>${commonLocal}<p>Antes de comprar, procure marca, modelo exato, homologação quando aplicável, garantia, compatibilidade e avaliações fora do vídeo patrocinado.</p><div class="table-wrap"><table><thead><tr><th>Categoria</th><th>O que verificar</th><th>Risco comum</th></tr></thead><tbody><tr><td>Fone Bluetooth</td><td>Codec, bateria, microfone e homologação</td><td>Autonomia inflada</td></tr><tr><td>Power bank</td><td>Capacidade nominal, potência e proteções</td><td>mAh irreal</td></tr><tr><td>Mini projetor</td><td>Lúmens ANSI, resolução nativa e ruído</td><td>Brilho sem padrão</td></tr><tr><td>Smartwatch</td><td>Sensores, app, sistema e proteção à água</td><td>Promessa médica indevida</td></tr><tr><td>Carregador</td><td>Potência, protocolo, cabo e certificação</td><td>Aquecimento e incompatibilidade</td></tr></tbody></table></div></article><article class="card"><h2>Teste de 60 segundos contra o hype</h2><ol class="steps"><li><div>Anote o modelo, não apenas o apelido do vídeo.</div></li><li><div>Compare especificações em duas fontes independentes.</div></li><li><div>Veja avaliações recentes com fotos e defeitos relatados.</div></li><li><div>Calcule preço final e prazo para ${esc(city.name)}.</div></li><li><div>Confirme garantia e devolução dentro da plataforma.</div></li></ol></article><article class="card wide"><h2>Quando a segurança vem antes do preço</h2><p>Produtos com rádio, bateria ou conexão elétrica merecem atenção a certificações e fabricante. Para dispositivos de telecomunicações, consulte a homologação da Anatel. Não use smartwatch como diagnóstico médico.</p></article></section><section class="section"><div class="cta"><h2>Comparar sem promessa de desconto</h2><p>As vitrines podem mostrar preços e vendedores diferentes. Confirme tudo no checkout e não transfira pagamento para fora da plataforma.</p><div class="actions"><a class="btn primary" href="${affiliate('shopee',city,'tecnologia-social')}" rel="nofollow sponsored">Abrir vitrine Shopee</a><a class="btn secondary" href="${affiliate('mercado-livre',city,'tecnologia-social')}" rel="nofollow sponsored">Abrir vitrine Mercado Livre</a></div><p class="disclosure">Links de afiliado acionados somente após clique. Não há garantia de tendência, preço, estoque ou adequação.</p></div></section>`,
    sources: [{label:'Anatel — consulta de produtos homologados',url:'https://informacoes.anatel.gov.br/paineis/certificacao-de-produtos/consulta-de-produtos',note:'Consulta pública para equipamentos sujeitos à homologação.'},{label:'Inmetro',url:'https://www.gov.br/inmetro/pt-br',note:'Informações sobre conformidade e segurança de produtos.'},{label:'Código de Defesa do Consumidor',url:'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm',note:'Direitos básicos e regras de consumo.'}]
  };
}

function basePage({city, topic, content, canonical, body, breadcrumb = []}) {
  const jsonLd = {
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Article','@id':`${canonical}#article`,headline:content.title,description:content.description,datePublished:TODAY,dateModified:TODAY,inLanguage:'pt-BR',isAccessibleForFree:true,author:{'@type':'Organization',name:'Aqui Tem Achadinhos — Curadoria Editorial'},publisher:{'@type':'Organization',name:'Aqui Tem Achadinhos',url:'https://www.aquitemachadinhos.com.br'},about:{'@type':'City',name:city.name,address:{'@type':'PostalAddress',addressRegion:city.uf,addressCountry:'BR'}},mainEntityOfPage:canonical},
      {'@type':'BreadcrumbList',itemListElement:breadcrumb.map((b,i)=>({'@type':'ListItem',position:i+1,name:b.name,item:b.url}))}
    ]
  };
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(content.title)} | AQUITEM</title><meta name="description" content="${esc(content.description)}"><meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"><link rel="canonical" href="${esc(canonical)}"><meta property="og:type" content="article"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="${esc(content.title)}"><meta property="og:description" content="${esc(content.description)}"><meta property="og:url" content="${esc(canonical)}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="/assets/growth-safe.css"><script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g,'\\u003c')}</script>${topic.key === 'clima_energia' ? '<script src="/assets/weather-open-meteo.js" defer></script>' : ''}</head><body data-city="${esc(city.slug)}" data-topic="${esc(topic.key)}"><header class="topbar"><div class="wrap nav"><a class="brand" href="${cityHubRoute(city)}">AQUI TEM <span>${esc(city.name)}</span></a><nav class="navlinks" aria-label="Navegação"><a href="/vagas.html?cidade=${esc(city.slug)}">Vagas cadastradas</a><a href="/guias/">Todos os guias</a></nav></div></header><main><div class="wrap"><section class="hero"><span class="eyebrow"><span class="dot"></span>${esc(content.eyebrow)}</span><h1>${esc(content.title)}</h1><p class="lead">${esc(content.description)}</p><div class="meta"><span class="chip">${esc(city.name)} · ${esc(city.uf)}</span><span class="chip">Revisão editorial: ${TODAY_BR}</span><span class="chip">Conteúdo original AQUITEM</span></div><div class="truth">${content.truth}</div></section>${body}<section class="section card wide"><h2>Fontes e critérios</h2>${sources(content.sources)}<p class="fine">Verificação editorial em ${TODAY_BR}. Fontes externas podem atualizar conteúdo e endereços; confirme a informação no momento do uso.</p></section><section class="section"><h2>Outros guias de ${esc(city.name)}</h2>${nav(city)}</section></div></main><footer><div class="wrap">Aqui Tem Achadinhos · curadoria independente. Não somos prefeitura, Defesa Civil, concessionária, recrutador nem loja. Publicidade de afiliado é identificada. <a href="/politica-de-privacidade.html">Privacidade</a>.</div></footer></body></html>`;
}

function cityHubPage(city) {
  const canonical = cityHubCanonical(city);
  const c = cityContext(city);
  const content = {title:`Guias verificados de ${city.name}`,description:`Carreira, concursos, clima, energia, moda country e tecnologia em ${city.name}/${city.uf}, com fontes e avisos de transparência.`,eyebrow:'Central local · seis guias',truth:`<strong>Curadoria responsável:</strong> os guias não inventam vaga, edital, alerta ou desconto. Informações variáveis exigem confirmação na fonte indicada.`,sources:[{label:'Política editorial AQUITEM',url:'/politica-de-privacidade.html',note:'Regras de transparência, privacidade e navegação do portal.'}]};
  const cards = TOPICS.map(t => `<article class="card"><h2>${t.icon} ${esc(t.short)}</h2><p>${esc(contentFor(city,t).description)}</p><a class="btn secondary" href="${routeFor(city,t)}">Abrir guia</a></article>`).join('');
  return basePage({city,topic:{key:'city_hub'},content,canonical,body:`<section class="section grid"><article class="card wide"><h2>Contexto local</h2><p>${esc(c.profile)} ${esc(c.poles)}</p></article>${cards}</section>`,breadcrumb:[{name:'AQUITEM',url:'https://www.aquitemachadinhos.com.br/'},{name:'Guias',url:'https://www.aquitemachadinhos.com.br/guias/'},{name:city.name,url:canonical}]});
}

function globalHubPage(cities) {
  const canonical='https://www.aquitemachadinhos.com.br/guias/';
  const cityLinks=cities.map(city=>`<a href="${cityHubCanonical(city)}">${esc(city.name)} <span class="fine">· ${esc(city.uf)}</span></a>`).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guias locais verificados de 64 cidades | AQUITEM</title><meta name="description" content="Central de guias locais sobre carreira, concursos, clima, energia e compras conscientes em 64 cidades brasileiras."><meta name="robots" content="index,follow"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="/assets/growth-safe.css"></head><body><header class="topbar"><div class="wrap nav"><a class="brand" href="/">AQUI TEM <span>ACHADINHOS</span></a></div></header><main class="wrap"><section class="hero"><span class="eyebrow"><span class="dot"></span>Rede editorial local</span><h1>Guias úteis para 64 cidades brasileiras.</h1><p class="lead">Conteúdo original, leitura rápida e compromisso explícito de não inventar vagas, editais, alertas ou descontos.</p><div class="truth"><strong>Escolha a cidade:</strong> cada central reúne seis guias e uma URL canônica própria do tenant.</div></section><section class="section"><div class="city-list">${cityLinks}</div></section></main><footer><div class="wrap">Aqui Tem Achadinhos · curadoria independente · revisão ${TODAY_BR}.</div></footer></body></html>`;
}

function migrationSql() {
  return `-- Safe city growth content registry and verification gates\ncreate table if not exists public.growth_city_pages (\n  id uuid primary key default gen_random_uuid(),\n  city_slug text not null references public.cities(slug) on update cascade on delete restrict,\n  tenant_subdomain text not null,\n  topic text not null check (topic in ('city_hub','home_office','concursos','clima_energia','economia_energia','moda_country','tecnologia_social')),\n  page_year smallint not null default 2026,\n  route text not null unique,\n  canonical_url text not null unique,\n  headline text not null,\n  summary text not null,\n  source_policy text not null default 'claims_require_official_source_and_verification_timestamp',\n  content_fingerprint text not null,\n  generator_version text not null,\n  active boolean not null default true,\n  published_at timestamptz not null default now(),\n  updated_at timestamptz not null default now(),\n  unique(city_slug, topic, page_year)\n);\n\nalter table public.growth_city_pages enable row level security;\ndrop policy if exists growth_city_pages_public_read on public.growth_city_pages;\ncreate policy growth_city_pages_public_read on public.growth_city_pages for select to anon, authenticated using (active = true);\ngrant select on public.growth_city_pages to anon, authenticated;\n\nalter table public.concursos_municipais_editais add column if not exists fonte_oficial_url text;\nalter table public.concursos_municipais_editais add column if not exists verificado_em timestamptz;\nupdate public.concursos_municipais_editais\nset status_ativo=false\nwhere status_ativo=true and (edital_url is null or edital_url ~* 'aquitemachadinhos\\.com\\.br');\nupdate public.concursos_municipais_editais\nset fonte_oficial_url=edital_url\nwhere fonte_oficial_url is null and edital_url is not null and edital_url !~* 'aquitemachadinhos\\.com\\.br';\n\nalter table public.alertas_meteorologicos_emergencia add column if not exists fonte_oficial_url text;\nalter table public.alertas_meteorologicos_emergencia add column if not exists verificado_em timestamptz;\nupdate public.alertas_meteorologicos_emergencia\nset status_ativo=false\nwhere status_ativo=true and (valido_ate is null or valido_ate <= now() or fonte_oficial_url is null or verificado_em is null);\n\ndo $$ begin\n  if not exists (select 1 from pg_constraint where conname='concursos_active_requires_official_source') then\n    alter table public.concursos_municipais_editais add constraint concursos_active_requires_official_source check (not status_ativo or (fonte_oficial_url ~ '^https://' and fonte_oficial_url !~* 'aquitemachadinhos\\.com\\.br' and verificado_em is not null)) not valid;\n  end if;\n  if not exists (select 1 from pg_constraint where conname='alertas_active_requires_fresh_official_source') then\n    alter table public.alertas_meteorologicos_emergencia add constraint alertas_active_requires_fresh_official_source check (not status_ativo or (fonte_oficial_url ~ '^https://' and verificado_em is not null and valido_ate > verificado_em)) not valid;\n  end if;\nend $$;\n\nalter table public.concursos_municipais_editais validate constraint concursos_active_requires_official_source;\nalter table public.alertas_meteorologicos_emergencia validate constraint alertas_active_requires_fresh_official_source;\n`;
}

function run() {
  const cities = Object.entries(CITIES_INFO).map(([slug,v]) => ({slug,name:v.name,uf:v.uf}));
  if (cities.length !== 64) throw new Error(`Expected 64 tenant cities; found ${cities.length}`);
  fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
  const inventory=[]; const hydration=[];
  fs.writeFileSync(path.join(OUT,'index.html'),globalHubPage(cities));
  inventory.push({type:'network_hub',route:'/guias/',canonical:'https://www.aquitemachadinhos.com.br/guias/'});
  for (const city of cities) {
    const dir=path.join(OUT,city.slug); fs.mkdirSync(dir,{recursive:true});
    const hubHtml=cityHubPage(city); fs.writeFileSync(path.join(dir,'index.html'),hubHtml);
    const hub={city_slug:city.slug,tenant_subdomain:tenant(city),topic:'city_hub',page_year:2026,route:cityHubRoute(city),canonical_url:cityHubCanonical(city),headline:`Guias verificados de ${city.name}`,summary:`Central de guias verificados de ${city.name}/${city.uf}.`,source_policy:'claims_require_official_source_and_verification_timestamp',content_fingerprint:crypto.createHash('sha256').update(hubHtml).digest('hex'),generator_version:VERSION,active:true,published_at:`${TODAY}T12:00:00-03:00`,updated_at:`${TODAY}T12:00:00-03:00`};
    hydration.push(hub); inventory.push({type:'city_hub',city:city.slug,route:hub.route,canonical:hub.canonical_url});
    for (const topic of TOPICS) {
      const content=contentFor(city,topic); const canonical=canonicalFor(city,topic);
      const html=basePage({city,topic,content,canonical,body:content.body,breadcrumb:[{name:'AQUITEM',url:'https://www.aquitemachadinhos.com.br/'},{name:'Guias',url:'https://www.aquitemachadinhos.com.br/guias/'},{name:city.name,url:cityHubCanonical(city)},{name:topic.short,url:canonical}]});
      fs.writeFileSync(path.join(dir,`${topic.slug}.html`),html);
      const row={city_slug:city.slug,tenant_subdomain:tenant(city),topic:topic.key,page_year:2026,route:routeFor(city,topic),canonical_url:canonical,headline:content.title,summary:content.description,source_policy:'claims_require_official_source_and_verification_timestamp',content_fingerprint:crypto.createHash('sha256').update(html).digest('hex'),generator_version:VERSION,active:true,published_at:`${TODAY}T12:00:00-03:00`,updated_at:`${TODAY}T12:00:00-03:00`};
      hydration.push(row); inventory.push({type:topic.key,city:city.slug,route:row.route,canonical:row.canonical_url});
    }
  }
  fs.mkdirSync(path.join(ROOT,'data'),{recursive:true}); fs.mkdirSync(path.join(ROOT,'sql'),{recursive:true});
  fs.writeFileSync(path.join(ROOT,'data','growth-route-inventory.json'),JSON.stringify({generated_at:`${TODAY}T12:00:00-03:00`,version:VERSION,tenant_cities:cities.length,total_routes:inventory.length,routes:inventory},null,2)+'\n');
  fs.writeFileSync(path.join(ROOT,'data','growth-page-hydration.json'),JSON.stringify(hydration,null,2)+'\n');
  fs.writeFileSync(path.join(ROOT,'sql','33-safe-growth-city-pages.sql'),migrationSql());
  const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${inventory.map(r=>`  <url><loc>${xml(r.canonical)}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>${r.type==='network_hub'?'0.85':r.type==='city_hub'?'0.80':'0.72'}</priority></url>`).join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(ROOT,'sitemap-growth.xml'),sitemap);
  console.log(JSON.stringify({tenantCities:cities.length,topicPages:cities.length*TOPICS.length,cityHubs:cities.length,totalRoutes:inventory.length,hydrationRows:hydration.length},null,2));
}

if (require.main===module) run();
module.exports={run,TOPICS};
