/* === BOTAO CTA "Quero mais clientes" (Aqui Tem Achadinhos) === */
(function(){
  function criarCTA(){
    // CTAs já existem nas páginas; não usar cartão flutuante que cobre conteúdo no mobile.
    return;
    if(document.getElementById('ctaMaoFree')) return;
    if(!document.body) return;
    if(['admin','painel','login'].indexOf(document.body.getAttribute('data-page')) !== -1) return;
    var a=document.createElement('a');
    a.id='ctaMaoFree';
    var subdominio=(location.hostname.split('.')[0]||'www').toLowerCase();
    var cidadesAtivas=['gramado','blumenau','bonito','buzios','campos','caruaru','florianopolis','jericoacoara','porto','salvador','uberlandia','caldasnovas'];
    var eCidade=cidadesAtivas.indexOf(subdominio)!==-1;
    a.href=eCidade ? 'https://www.aquitemachadinhos.com.br/cadastro-cidade.html?cidade='+encodeURIComponent(subdominio)+'&utm_source=site&utm_medium=floating_cta&utm_campaign=expansao_'+encodeURIComponent(subdominio) : 'https://www.aquitemachadinhos.com.br/cadastro.html?utm_source=site&utm_medium=floating_cta&utm_campaign=inauguracao50';
    a.target='_blank'; a.rel='noopener';
    var s=a.style;
    s.position='fixed'; s.right='16px'; s.bottom='80px'; s.zIndex='99998';
    s.background='linear-gradient(135deg,#16a34a,#22c55e)'; s.color='#ffffff';
    s.fontFamily='inherit'; s.fontWeight='700'; s.fontSize='14px';
    s.padding='14px 18px'; s.borderRadius='16px';
    s.boxShadow='0 12px 30px rgba(0,0,0,.35)';
    s.display='flex'; s.flexDirection='column'; s.alignItems='center'; s.gap='2px';
    s.textDecoration='none'; s.maxWidth='62vw'; s.lineHeight='1.2';
    var e=document.createElement('span'); e.textContent='🚀'; e.style.fontSize='20px';
    var t=document.createElement('span'); t.textContent=eCidade ? 'Cadastrar minha empresa' : '50 destaques gratuitos';
    var sub=document.createElement('span'); sub.textContent=eCidade ? 'guia local em expansão' : 'cadastro grátis no guia';
    sub.style.fontWeight='500'; sub.style.fontSize='11px'; sub.style.opacity='.9';
    a.appendChild(e); a.appendChild(t); a.appendChild(sub);
    document.body.appendChild(a);
    setInterval(function(){ s.boxShadow='0 12px 30px rgba(34,197,94,.65)'; setTimeout(function(){ s.boxShadow='0 12px 30px rgba(0,0,0,.35)'; },900); },4000);
  }
  function inserirAcessoDiretorioCidade(){
    var subdominio=(location.hostname.split('.')[0]||'www').toLowerCase();
    var cidadesAtivas=['gramado','blumenau','bonito','buzios','campos','caruaru','florianopolis','jericoacoara','porto','salvador'];
    if(cidadesAtivas.indexOf(subdominio)===-1 || document.getElementById('ataExplorarCidade')) return;
    var grupo=document.querySelector('.cidade-hero .flex.flex-col');
    if(!grupo) return;
    var a=document.createElement('a'); a.id='ataExplorarCidade'; a.href='/categoria.html';
    a.className='btn-shine glass text-white font-bold px-6 py-3.5 rounded-xl';
    a.textContent='🔎 Explorar empresas da cidade'; grupo.appendChild(a);
  }
  function redirecionarFormsLegados(){
    var subdominio=(location.hostname.split('.')[0]||'www').toLowerCase();
    var cidadesAtivas=['gramado','blumenau','bonito','buzios','campos','caruaru','florianopolis','jericoacoara','porto','salvador'];
    var eCidade=cidadesAtivas.indexOf(subdominio)!==-1;
    var destino=eCidade ? 'https://www.aquitemachadinhos.com.br/cadastro-cidade.html?cidade='+encodeURIComponent(subdominio)+'&utm_source=site&utm_medium=city_cta&utm_campaign=expansao_'+encodeURIComponent(subdominio) : 'https://www.aquitemachadinhos.com.br/cadastro.html?utm_source=site&utm_medium=legacy_cta&utm_campaign=inauguracao50';
    document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach(function(link){ link.href=destino; link.target='_self'; });
    document.querySelectorAll('a').forEach(function(link){
      if ((link.textContent || '').indexOf('Ver outras cidades') !== -1) link.href='https://www.aquitemachadinhos.com.br/cidades.html';
    });
  }
  if(document.body) { criarCTA(); redirecionarFormsLegados(); inserirAcessoDiretorioCidade(); }
  document.addEventListener('DOMContentLoaded', function(){ criarCTA(); redirecionarFormsLegados(); inserirAcessoDiretorioCidade(); });
  setTimeout(function(){ criarCTA(); redirecionarFormsLegados(); inserirAcessoDiretorioCidade(); }, 800);
})();
/* === FIM BOTAO CTA === */

/* === MOTOR MULTI-CIDADE (Aqui Tem) — v5.1 === */
(function () {
  var CIDADES = {
    "www": ["Brasil","BR"],
    "nacional": ["Brasil","BR"],
    "classificados": ["Brasil","BR"],
    "barretos": ["Barretos","SP"],
    "gramado": ["Gramado","RS"],
    "campos": ["Campos do Jordão","SP"],
    "salvador": ["Salvador","BA"],
    "buzios": ["Búzios","RJ"],
    "uberlandia": ["Uberlândia","MG"],
    "caldasnovas": ["Caldas Novas","GO"],
    "florianopolis": ["Florianópolis","SC"],
    "porto": ["Porto de Galinhas","PE"],
    "jericoacoara": ["Jericoacoara","CE"],
    "caruaru": ["Caruaru","PE"],
    "blumenau": ["Blumenau","SC"],
    "bonito": ["Bonito","MS"],
    "manaus": ["Manaus","AM"],
    "curitiba": ["Curitiba","PR"],
    "foz": ["Foz do Iguaçu","PR"],
    "foz-do-iguacu": ["Foz do Iguaçu","PR"],
    "fozdoiguacu": ["Foz do Iguaçu","PR"],
    "balneario": ["Balneário Camboriú","SC"],
    "balneario-camboriu": ["Balneário Camboriú","SC"],
    "balneariocamboriu": ["Balneário Camboriú","SC"],
    "fortaleza": ["Fortaleza","CE"],
    "natal": ["Natal","RN"],
    "noronha": ["Fernando de Noronha","PE"],
    "fernandodenoronha": ["Fernando de Noronha","PE"],
    "ouro-preto": ["Ouro Preto","MG"],
    "ouropreto": ["Ouro Preto","MG"],
    "paraty": ["Paraty","RJ"],
    "pirenopolis": ["Pirenópolis","GO"],
    "vitoria": ["Vitória","ES"],
    "campo-grande": ["Campo Grande","MS"],
    "campogrande": ["Campo Grande","MS"],
    "chapada-guimaraes": ["Chapada dos Guimarães","MT"],
    "chapadadosguimaraes": ["Chapada dos Guimarães","MT"],
    "jalapao": ["Jalapão","TO"],
    "lencois": ["Lençóis","BA"],
    "alter-do-chao": ["Alter do Chão","PA"],
    "alterdochao": ["Alter do Chão","PA"],
    "sao-paulo": ["São Paulo","SP"],
    "saopaulo": ["São Paulo","SP"],
    "rio-de-janeiro": ["Rio de Janeiro","RJ"],
    "riodejaneiro": ["Rio de Janeiro","RJ"],
    "belo-horizonte": ["Belo Horizonte","MG"],
    "belohorizonte": ["Belo Horizonte","MG"],
    "brasilia": ["Brasília","DF"],
    "porto-alegre": ["Porto Alegre","RS"],
    "portoalegre": ["Porto Alegre","RS"],
    "recife": ["Recife","PE"],
    "goiania": ["Goiânia","GO"],
    "belem": ["Belém","PA"],
    "cuiaba": ["Cuiabá","MT"],
    "sao-luis": ["São Luís","MA"],
    "saoluis": ["São Luís","MA"],
    "maceio": ["Maceió","AL"],
    "joao-pessoa": ["João Pessoa","PB"],
    "joaopessoa": ["João Pessoa","PB"],
    "teresina": ["Teresina","PI"],
    "aracaju": ["Aracaju","SE"],
    "campinas": ["Campinas","SP"],
    "ribeirao-preto": ["Ribeirão Preto","SP"],
    "ribeiraopreto": ["Ribeirão Preto","SP"],
    "sao-jose-do-rio-preto": ["São José do Rio Preto","SP"],
    "riopreto": ["São José do Rio Preto","SP"],
    "santos": ["Santos","SP"],
    "sorocaba": ["Sorocaba","SP"],
    "piracicaba": ["Piracicaba","SP"],
    "franca": ["Franca","SP"],
    "juiz-de-fora": ["Juiz de Fora","MG"],
    "juizdefora": ["Juiz de Fora","MG"],
    "montes-claros": ["Montes Claros","MG"],
    "montesclaros": ["Montes Claros","MG"],
    "londrina": ["Londrina","PR"],
    "maringa": ["Maringá","PR"],
    "joinville": ["Joinville","SC"],
    "caxias-do-sul": ["Caxias do Sul","RS"],
    "caxiasdosul": ["Caxias do Sul","RS"],
    "feira-de-santana": ["Feira de Santana","BA"],
    "feiradesantana": ["Feira de Santana","BA"],
    "campina-grande": ["Campina Grande","PB"],
    "campinagrande": ["Campina Grande","PB"],
    "anapolis": ["Anápolis","GO"],
    "rio-verde": ["Rio Verde","GO"],
    "rioverde": ["Rio Verde","GO"]
  };

  function parseSub() {
    var host = (location.hostname || '').toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.indexOf('vercel.app') !== -1) return 'www';
    var p = host.split('.');
    if (p.length === 3 && p[0] === 'aquitemachadinhos' && p[1] === 'com' && p[2] === 'br') return 'www';
    if (p.length === 4 && p[1] === 'aquitemachadinhos' && p[2] === 'com' && p[3] === 'br') return p[0];
    if (p.length <= 2) return 'www';
    return p[0] || 'www';
  }

  var sub = parseSub();
  if ((sub === "marcas") && (location.pathname === "/" || location.pathname === "/index.html")) { location.replace("/marcas.html"); } else if ((sub === "classificados" || sub === "nacional") && (location.pathname === "/" || location.pathname === "/index.html")) {
    location.replace("/classificados.html");
  } else if (sub === "barretos" && (location.pathname === "/" || location.pathname === "/index.html")) {
    location.replace("/barretos-home.html");
  } else if (sub !== "www" && sub !== "classificados" && sub !== "nacional" && sub !== "barretos" && (location.pathname === "/" || location.pathname === "/index.html")) {
    location.replace("/" + sub + "-home.html");
  }
  var par = CIDADES[sub] || CIDADES["www"];
  var CIDADE = par[0], UF = par[1];
  document.documentElement.setAttribute('data-aquitem-city', sub);
  window.CIDADE = { nome: CIDADE, uf: UF, slug: sub };
})();
/* === FIM MOTOR MULTI-CIDADE === */

/* ============================================================
   AQUI TEM ACHADINHOS — app.js (v2 / plataforma) — COMPLETO
   Banco real (Supabase) + fallback local. Empresas, ofertas,
   categorias, métricas reais, upload de fotos, busca, SEO.
   ============================================================ */
(function () {
  'use strict';

  function loadPublicSupabaseConfig() {
    try {
      var req = new XMLHttpRequest(); req.open('GET', 'assets/supabase-config.json', false); req.send(null);
      return req.status >= 200 && req.status < 300 ? JSON.parse(req.responseText) : {};
    } catch (_e) { return {}; }
  }
  var PUBLIC_SUPABASE = loadPublicSupabaseConfig();
  var CONFIG = {
    brand: 'AQUITEM',
    productName: 'Aqui Tem Achadinhos',
    whatsapp: '5517992641746',
    instagram: 'https://instagram.com/aquitatem',
    domain: 'aquitemachadinhos.com.br',
    cidade: 'Barretos',
    supabase: {
      url: PUBLIC_SUPABASE.url || '',
      anonKey: PUBLIC_SUPABASE.anonKey || ''
    },
    analytics: { plausible: { domain: '', src: 'https://plausible.io/js/script.js' } },
    mp: { links: { lojista_destaque: 'https://mpago.la/25UHZqr', lojista_pro: 'https://mpago.la/2HBxp5v', driver_destaque: 'https://mpago.la/2ZSErEf', driver_pro: 'https://mpago.la/11BbdJs' }, autoUrl: 'https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/upgrade-checkout' },
    planLimits: { fotos: { gratis: 3, destaque: 10, pro: 20 }, ofertas: { gratis: 1, destaque: 5, pro: 99 } }
  };
  window.ATA_CONFIG = CONFIG;

  var CATS = [
    { id:'restaurantes',     nome:'Restaurantes',               emoji:'🍔', desc:'Onde comer bem' },
    { id:'lanches',          nome:'Lanches',                    emoji:'🍟', desc:'Lanches e delivery' },
    { id:'farmacias',        nome:'Farmácias',                  emoji:'💊', desc:'Saúde e plantão' },
    { id:'mercados',         nome:'Mercados',                   emoji:'🛒', desc:'Compras do dia' },
    { id:'moda',             nome:'Moda',                       emoji:'👗', desc:'Roupas e calçados' },
    { id:'beleza',           nome:'Beleza',                     emoji:'💅', desc:'Salões e estética' },
    { id:'eletronicos',      nome:'Eletrônicos',                emoji:'📱', desc:'Tecnologia e celulares' },
    { id:'petshops',         nome:'Pet Shops',                  emoji:'🐾', desc:'Cuidados para pets' },
    { id:'hoteis',           nome:'Hotéis e Pousadas',          emoji:'🏨', desc:'Onde ficar' },
    { id:'moveis',           nome:'Móveis',                     emoji:'🛋️', desc:'Casa e decoração' },
    { id:'automotivo',       nome:'Automotivo',                 emoji:'🚗', desc:'Veículos e oficinas' },
    { id:'servicos',         nome:'Serviços',                   emoji:'🔧', desc:'Profissionais e reparos' },
    { id:'saude',            nome:'Saúde e Bem-estar',          emoji:'🩺', desc:'Clínicas e profissionais' },
    { id:'educacao',         nome:'Educação e Cursos',          emoji:'🎓', desc:'Ensino e capacitação' },
    { id:'turismo',          nome:'Turismo e Experiências',     emoji:'🧭', desc:'Passeios e aventuras' },
    { id:'transporte',       nome:'Transporte e Mobilidade',    emoji:'🚌', desc:'Táxi, mototáxi e cia' },
    { id:'esportes',         nome:'Esportes e Fitness',         emoji:'🏋️', desc:'Academias e esportes' },
    { id:'casa-construcao',  nome:'Casa e Construção',          emoji:'🏠', desc:'Materiais e serviços' },
    { id:'imobiliarias',     nome:'Imobiliárias',               emoji:'🏘️', desc:'Imóveis e aluguéis' },
    { id:'eventos',          nome:'Eventos e Festas',           emoji:'🎉', desc:'Decoração e buffet' },
    { id:'financeiro',       nome:'Financeiro e Jurídico',      emoji:'⚖️', desc:'Contabilidade e seguros' },
    { id:'agro',             nome:'Agro e Rural',               emoji:'🌾', desc:'Produtos e serviços rurais' },
    { id:'sorveterias',      nome:'Sorveterias e Açaí',         emoji:'🍦', desc:'Gelados e sorvetes' },
    { id:'suplementos',      nome:'Suplementos',                emoji:'💪', desc:'Nutrição e suplementos' },
    { id:'padarias',         nome:'Padarias e Cafés',           emoji:'🥖', desc:'Pão, bolo e café' },
    { id:'bares',            nome:'Bares e Botequins',          emoji:'🍺', desc:'Bares e drinks' },
    { id:'grafica',          nome:'Gráfica e Impressão',        emoji:'🖨️', desc:'Gráfica e brindes' },
    { id:'clinicas',         nome:'Clínicas e Consultórios',    emoji:'🏥', desc:'Médicos e especialistas' },
    { id:'artesanato',       nome:'Artesanato',                 emoji:'🧵', desc:'Produtos artesanais' },
    { id:'produtos-naturais',nome:'Produtos Naturais',          emoji:'🌿', desc:'Naturais e orgânicos' },
    { id:'cosmeticos',       nome:'Cosméticos e Cuidados',      emoji:'🧴', desc:'Beleza e cuidados pessoais' },
    { id:'papelaria',        nome:'Papelaria e Presentes',      emoji:'📓', desc:'Papelaria e gift' },
    { id:'delivery',         nome:'Delivery e Marmitas',        emoji:'🛵', desc:'Comida em casa' },
    { id:'fotografo',        nome:'Fotografia e Vídeo',         emoji:'📸', desc:'Fotografia e filmagem' },
    { id:'tecnologia',       nome:'Tecnologia e TI',            emoji:'💻', desc:'TI e informática' },
    { id:'advocacia',        nome:'Advocacia e Contabilidade',  emoji:'📋', desc:'Jurídico e contábil' },
    { id:'religioso',        nome:'Artigos Religiosos',         emoji:'✝️', desc:'Artigos e serviços religiosos' },
    { id:'infantil',         nome:'Infantil e Brinquedos',      emoji:'🧸', desc:'Crianças e bebês' },
    { id:'academia',         nome:'Academia e Personal',        emoji:'🏋️', desc:'Fitness e treinamento' },
    { id:'clinica-estetica', nome:'Clínica Estética',           emoji:'💆', desc:'Estética e bem-estar' },
    { id:'sorveteria',       nome:'Sorveteria e Açaí',          emoji:'🍦', desc:'Sorvetes e açaí' },
    { id:'tabacaria',        nome:'Tabacaria e Conveniência',   emoji:'🚬', desc:'Tabacaria e conveniência' },
    { id:'turismo-aventura', nome:'Turismo de Aventura',        emoji:'🧗', desc:'Aventura e ecoturismo' }
];

  /* HELPERS */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var params = function () { return new URLSearchParams(location.search); };
  var esc = function (str) { return String(str == null ? '' : str).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); };
  var digits = function (s) { return String(s || '').replace(/\D/g, ''); };
  var initials = function (n) { var p = String(n || '?').trim().split(/\s+/); return ((p[0] || '?')[0] || '?') + (p[1] ? (p[1][0] || '') : ''); };
  var today = function () { return new Date().toISOString().slice(0, 10); };
  var uuid = function () { return (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2)); };
  var waLink = function (msg) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || 'Olá! Vim pelo Aqui Tem Achadinhos.'); };
  var formatDate = function (d) { try { return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR'); } catch (e) { return d; } };
  var CITY_HOSTS = {
    barretos: 'barretos',
    gramado: 'gramado',
    blumenau: 'blumenau',
    bonito: 'bonito',
    buzios: 'buzios',
    campos: 'campos',
    caruaru: 'caruaru',
    florianopolis: 'florianopolis',
    jericoacoara: 'jericoacoara',
    porto: 'porto',
    salvador: 'salvador',
    uberlandia: 'uberlandia',
    caldasnovas: 'caldasnovas',
    manaus: 'manaus',
    curitiba: 'curitiba',
    foz: 'foz-do-iguacu',
    'foz-do-iguacu': 'foz-do-iguacu',
    fozdoiguacu: 'foz-do-iguacu',
    balneario: 'balneario-camboriu',
    'balneario-camboriu': 'balneario-camboriu',
    balneariocamboriu: 'balneario-camboriu',
    fortaleza: 'fortaleza',
    natal: 'natal',
    noronha: 'noronha',
    fernandodenoronha: 'noronha',
    'ouro-preto': 'ouro-preto',
    ouropreto: 'ouro-preto',
    paraty: 'paraty',
    pirenopolis: 'pirenopolis',
    vitoria: 'vitoria',
    'campo-grande': 'campo-grande',
    campogrande: 'campo-grande',
    'chapada-guimaraes': 'chapada-guimaraes',
    chapadadosguimaraes: 'chapada-guimaraes',
    jalapao: 'jalapao',
    lencois: 'lencois',
    'alter-do-chao': 'alter-do-chao',
    alterdochao: 'alter-do-chao',
    'sao-paulo': 'sao-paulo',
    saopaulo: 'sao-paulo',
    'rio-de-janeiro': 'rio-de-janeiro',
    riodejaneiro: 'rio-de-janeiro',
    'belo-horizonte': 'belo-horizonte',
    belohorizonte: 'belo-horizonte',
    brasilia: 'brasilia',
    'porto-alegre': 'porto-alegre',
    portoalegre: 'porto-alegre',
    recife: 'recife',
    goiania: 'goiania',
    belem: 'belem',
    cuiaba: 'cuiaba',
    'sao-luis': 'sao-luis',
    saoluis: 'sao-luis',
    maceio: 'maceio',
    'joao-pessoa': 'joao-pessoa',
    joaopessoa: 'joao-pessoa',
    teresina: 'teresina',
    aracaju: 'aracaju',
    campinas: 'campinas',
    'ribeirao-preto': 'ribeirao-preto',
    ribeiraopreto: 'ribeirao-preto',
    'sao-jose-do-rio-preto': 'sao-jose-do-rio-preto',
    riopreto: 'sao-jose-do-rio-preto',
    santos: 'santos',
    sorocaba: 'sorocaba',
    piracicaba: 'piracicaba',
    franca: 'franca',
    'juiz-de-fora': 'juiz-de-fora',
    juizdefora: 'juiz-de-fora',
    'montes-claros': 'montes-claros',
    montesclaros: 'montes-claros',
    londrina: 'londrina',
    maringa: 'maringa',
    joinville: 'joinville',
    'caxias-do-sul': 'caxias-do-sul',
    caxiasdosul: 'caxias-do-sul',
    'feira-de-santana': 'feira-de-santana',
    feiradesantana: 'feira-de-santana',
    'campina-grande': 'campina-grande',
    campinagrande: 'campina-grande',
    anapolis: 'anapolis',
    'rio-verde': 'rio-verde',
    rioverde: 'rio-verde',
    classificados: 'nacional',
    nacional: 'nacional'
  };
  var CITY_NAMES = {
    barretos: 'Barretos',
    gramado: 'Gramado',
    blumenau: 'Blumenau',
    bonito: 'Bonito',
    buzios: 'Búzios',
    campos: 'Campos do Jordão',
    caruaru: 'Caruaru',
    florianopolis: 'Florianópolis',
    jericoacoara: 'Jericoacoara',
    porto: 'Porto de Galinhas',
    salvador: 'Salvador',
    uberlandia: 'Uberlândia',
    caldasnovas: 'Caldas Novas',
    manaus: 'Manaus',
    curitiba: 'Curitiba',
    'foz-do-iguacu': 'Foz do Iguaçu',
    'balneario-camboriu': 'Balneário Camboriú',
    fortaleza: 'Fortaleza',
    natal: 'Natal',
    noronha: 'Fernando de Noronha',
    'ouro-preto': 'Ouro Preto',
    paraty: 'Paraty',
    pirenopolis: 'Pirenópolis',
    vitoria: 'Vitória',
    'campo-grande': 'Campo Grande',
    'chapada-guimaraes': 'Chapada dos Guimarães',
    jalapao: 'Jalapão',
    lencois: 'Lençóis',
    'alter-do-chao': 'Alter do Chão',
    'sao-paulo': 'São Paulo',
    'rio-de-janeiro': 'Rio de Janeiro',
    'belo-horizonte': 'Belo Horizonte',
    brasilia: 'Brasília',
    'porto-alegre': 'Porto Alegre',
    recife: 'Recife',
    goiania: 'Goiânia',
    belem: 'Belém',
    cuiaba: 'Cuiabá',
    'sao-luis': 'São Luís',
    maceio: 'Maceió',
    'joao-pessoa': 'João Pessoa',
    teresina: 'Teresina',
    aracaju: 'Aracaju',
    campinas: 'Campinas',
    'ribeirao-preto': 'Ribeirão Preto',
    'sao-jose-do-rio-preto': 'São José do Rio Preto',
    santos: 'Santos',
    sorocaba: 'Sorocaba',
    piracicaba: 'Piracicaba',
    franca: 'Franca',
    'juiz-de-fora': 'Juiz de Fora',
    'montes-claros': 'Montes Claros',
    londrina: 'Londrina',
    maringa: 'Maringá',
    joinville: 'Joinville',
    'caxias-do-sul': 'Caxias do Sul',
    'feira-de-santana': 'Feira de Santana',
    'campina-grande': 'Campina Grande',
    anapolis: 'Anápolis',
    'rio-verde': 'Rio Verde',
    nacional: 'Brasil Todo'
  };
  var CITY_UFS = {
    barretos: 'SP',
    gramado: 'RS',
    blumenau: 'SC',
    bonito: 'MS',
    buzios: 'RJ',
    campos: 'SP',
    caruaru: 'PE',
    florianopolis: 'SC',
    jericoacoara: 'CE',
    porto: 'PE',
    salvador: 'BA',
    uberlandia: 'MG',
    caldasnovas: 'GO',
    manaus: 'AM',
    curitiba: 'PR',
    'foz-do-iguacu': 'PR',
    'balneario-camboriu': 'SC',
    fortaleza: 'CE',
    natal: 'RN',
    noronha: 'PE',
    'ouro-preto': 'MG',
    paraty: 'RJ',
    pirenopolis: 'GO',
    vitoria: 'ES',
    'campo-grande': 'MS',
    'chapada-guimaraes': 'MT',
    jalapao: 'TO',
    lencois: 'BA',
    'alter-do-chao': 'PA',
    'sao-paulo': 'SP',
    'rio-de-janeiro': 'RJ',
    'belo-horizonte': 'MG',
    brasilia: 'DF',
    'porto-alegre': 'RS',
    recife: 'PE',
    goiania: 'GO',
    belem: 'PA',
    cuiaba: 'MT',
    'sao-luis': 'MA',
    maceio: 'AL',
    'joao-pessoa': 'PB',
    teresina: 'PI',
    aracaju: 'SE',
    campinas: 'SP',
    'ribeirao-preto': 'SP',
    'sao-jose-do-rio-preto': 'SP',
    santos: 'SP',
    sorocaba: 'SP',
    piracicaba: 'SP',
    franca: 'SP',
    'juiz-de-fora': 'MG',
    'montes-claros': 'MG',
    londrina: 'PR',
    maringa: 'PR',
    joinville: 'SC',
    'caxias-do-sul': 'RS',
    'feira-de-santana': 'BA',
    'campina-grande': 'PB',
    anapolis: 'GO',
    'rio-verde': 'GO',
    nacional: 'BR'
  };
  function getHostSubdomain() {
    var host = (location.hostname || '').toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host.indexOf('vercel.app') !== -1) return 'www';
    var p = host.split('.');
    if (p.length === 3 && p[0] === 'aquitemachadinhos' && p[1] === 'com' && p[2] === 'br') return 'www';
    if (p.length === 4 && p[1] === 'aquitemachadinhos' && p[2] === 'com' && p[3] === 'br') return p[0];
    if (p.length <= 2) return 'www';
    return p[0] || 'www';
  }

  function currentCitySlug() {
    var p = (document.body && document.body.getAttribute('data-page')) || '';
    if (p && CITY_HOSTS[p] && p !== 'home' && p !== 'nacional' && p !== 'classificados' && p !== 'vagas' && p !== 'cidades' && p !== 'admin' && p !== 'painel' && p !== 'login' && p !== 'busca' && p !== 'sobre' && p !== 'contato' && p !== 'termos' && p !== 'anuncie' && p !== 'faq' && p !== '404') {
      return CITY_HOSTS[p];
    }
    var sub = getHostSubdomain();
    if (sub !== 'www' && sub !== 'nacional' && CITY_HOSTS[sub]) {
      return CITY_HOSTS[sub];
    }
    var path = (location.pathname || '').toLowerCase();
    for (var k in CITY_HOSTS) {
      if (k !== 'nacional' && k !== 'classificados' && (path === '/' + k + '-home' || path === '/' + k + '-home.html' || path.indexOf('/' + k + '-home') !== -1)) {
        return CITY_HOSTS[k];
      }
    }
    return 'nacional';
  }

  function currentCityName() {
    var slug = currentCitySlug();
    if (slug === 'nacional' || slug === 'www') return 'Brasil';
    return CITY_NAMES[slug] || 'Brasil';
  }

  function currentCityUF() {
    var slug = currentCitySlug();
    if (slug === 'nacional' || slug === 'www') return 'BR';
    return CITY_UFS[slug] || 'BR';
  }
  var showMsg = function (sel, txt, ok) { var e = $(sel); if (!e) return; e.className = 'msg ' + (ok ? 'msg-ok' : 'msg-err'); e.innerHTML = txt; };

  /* DATA LAYER */
  var isRemote = function () { return CONFIG.supabase.url && CONFIG.supabase.anonKey; };
  var B = function (p) { return CONFIG.supabase.url + '/rest/v1/' + p; };
  var H = function (x) { return Object.assign({ apikey: CONFIG.supabase.anonKey, Authorization: 'Bearer ' + CONFIG.supabase.anonKey }, x || {}); };
  var LS_S = 'ata_stores_v2', LS_O = 'ata_offers_v2';

  /* ── SWR Cache ── */
  var _swrCache = {};
  var SWR_TTL = 30000;
  function swrGet(key, fetchFn) {
    var now = Date.now();
    var cached = _swrCache[key];
    if (cached) {
      if (now - cached.ts < SWR_TTL) return Promise.resolve(cached.data);
      fetchFn().then(function(fresh){ _swrCache[key] = { data: fresh, ts: Date.now() }; }).catch(function(){});
      return Promise.resolve(cached.data);
    }
    return fetchFn().then(function(data){ _swrCache[key] = { data: data, ts: Date.now() }; return data; });
  }
  function swrInvalidate(prefix) { Object.keys(_swrCache).forEach(function(k){ if (k.indexOf(prefix) === 0) delete _swrCache[k]; }); }

  /* ── Exponential Backoff ── */
  function withRetry(fn, opts) {
    opts = opts || {};
    var maxRetries = opts.maxRetries || 3;
    var baseDelay = opts.baseDelay || 1000;
    var retryOn = opts.retryOn || function(err, status) { return !status || status >= 500; };
    function attempt(n) {
      return fn().then(function(r){ return r; }).catch(function(err) {
        var status = err._httpStatus || 0;
        if (n >= maxRetries || !retryOn(err, status)) throw err;
        var delay = baseDelay * Math.pow(2, n - 1);
        return new Promise(function(res){ setTimeout(res, delay); }).then(function(){ return attempt(n + 1); });
      });
    }
    return attempt(1);
  }

  /* ── Mapeador de erros Supabase ── */
  var SUPABASE_ERR_MAP = {
    '23505': 'Esta empresa já está cadastrada.', '23503': 'Categoria inválida.',
    '23502': 'Campo obrigatório não preenchido.', '42501': 'Sem permissão. Faça login novamente.',
    'PGRST301': 'Sessão expirada. Faça login novamente.'
  };
  function mapSupabaseError(data, status) {
    if (!data) return 'Erro HTTP ' + status;
    var code = data.code || '';
    if (code && SUPABASE_ERR_MAP[code]) return SUPABASE_ERR_MAP[code];
    var raw = data.message || data.error || data.hint || '';
    if (/duplicate|unique/i.test(raw)) return SUPABASE_ERR_MAP['23505'];
    if (/permission|policy|rls/i.test(raw)) return SUPABASE_ERR_MAP['42501'];
    if (/jwt|expired/i.test(raw)) return SUPABASE_ERR_MAP['PGRST301'];
    return raw ? raw.slice(0, 120) : ('Erro HTTP ' + status);
  }

  /* ── Audit Log ── */
  function auditLog(action, table, recordId, before, after) {
    var t = (typeof AUTH !== 'undefined' && AUTH.tok()) || '';
    if (!t) return;
    fetch(B('admin_audit_logs'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: CONFIG.supabase.anonKey, Authorization: 'Bearer ' + t },
      body: JSON.stringify({ acao: action, tabela_afetada: table, registro_id: recordId, payload_antigo: before || null, payload_novo: after || null, criado_em: new Date().toISOString() })
    }).catch(function(){});
  }

    function apiGet(path) {
    if (!isRemote()) return Promise.resolve([]);
    return fetch(B(path), { headers: H() }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }
  function apiPost(table, obj) {
    if (!isRemote()) return Promise.resolve(obj);
    return fetch(B(table), { method: 'POST', headers: H({ 'Content-Type': 'application/json' }), body: JSON.stringify(obj) })
      .then(function (r) { return r.ok; });
  }

  var Categories = {
    list: function () {
      if (isRemote()) return apiGet('categories?select=*&order=ordem.asc').then(function (remote) {
        // Merge: banco + categorias locais que não estão no banco ainda
        var remoteIds = remote.map(function(c){ return c.id; });
        var extras = CATS.filter(function(c){ return remoteIds.indexOf(c.id) === -1; });
        return remote.length ? remote.concat(extras).sort(function(a,b){ return (a.ordem||99)-(b.ordem||99); }) : CATS;
      });
      return Promise.resolve(CATS);
    }
  };
  var Stores = {
    list: function () {
      if (isRemote()) return apiGet('stores?select=*&status=eq.ativo&city_slug=eq.' + encodeURIComponent(currentCitySlug()) + '&order=destaque.desc,criado_em.desc');
      return Promise.resolve(JSON.parse(localStorage.getItem(LS_S) || '[]').filter(function (s) { return s.status === 'ativo'; }));
    },
    get: function (key) {
      if (!key) return Promise.resolve(null);
      if (isRemote()) return apiGet('stores?select=*&or=(id.eq.' + encodeURIComponent(key) + ',slug.eq.' + encodeURIComponent(key) + ')&status=eq.ativo&city_slug=eq.' + encodeURIComponent(currentCitySlug())).then(function (a) { var s = a[0] || null; if (s && document.body && document.body.getAttribute('data-page') === 'loja') { try { setListingSEO(s); } catch (e) {} } return s; });
      var a = JSON.parse(localStorage.getItem(LS_S) || '[]'); return Promise.resolve(a.filter(function (s) { return s.id === key || s.slug === key; })[0] || null);
    },
    photos: function (sid) {
      if (isRemote()) return apiGet('store_photos?select=id,url&store_id=eq.' + encodeURIComponent(sid) + '&order=criado_em.asc');
      return Promise.resolve([]);
    },
    search: function (q) {
      q = (q || '').trim(); if (!q) return Stores.list();
      if (isRemote()) { var t = encodeURIComponent(q); return apiGet('stores?select=*&status=eq.ativo&city_slug=eq.' + encodeURIComponent(currentCitySlug()) + '&or=(nome.ilike.*' + t + '*,descricao.ilike.*' + t + '*,bairro.ilike.*' + t + '*,subcategoria.ilike.*' + t + '*)'); }
      return Stores.list().then(function (a) { var ql = q.toLowerCase(); return a.filter(function (s) { return JSON.stringify(s).toLowerCase().indexOf(ql) !== -1; }); });
    },
    create: function (obj) { obj.id = uuid(); obj.status = 'pendente'; obj.city_slug = obj.city_slug || currentCitySlug(); obj.cidade = obj.cidade || currentCityName(); obj.criado_em = new Date().toISOString(); return apiPost('stores', obj).then(function (ok) { return ok ? obj : null; }); }
  };
  var Offers = {
    listActive: function () {
      if (isRemote()) return apiGet('offers?select=*&status=eq.ativa&termino=gte.' + today() + '&order=criado_em.desc');
      var t = today(); return Promise.resolve(JSON.parse(localStorage.getItem(LS_O) || '[]').filter(function (o) { return o.status === 'ativa' && (!o.termino || o.termino >= t); }));
    },
    byStore: function (sid) { return Offers.listActive().then(function (a) { return a.filter(function (o) { return o.store_id === sid; }); }); },
    search: function (q) { q = (q || '').trim(); if (!q) return Offers.listActive(); if (isRemote()) { var t = encodeURIComponent(q); return apiGet('offers?select=*&status=eq.ativa&termino=gte.' + today() + '&or=(titulo.ilike.*' + t + '*,descricao.ilike.*' + t + '*)&order=criado_em.desc'); } return Offers.listActive().then(function (a) { var ql = q.toLowerCase(); return a.filter(function (o) { return (o.titulo || '').toLowerCase().indexOf(ql) !== -1 || (o.descricao || '').toLowerCase().indexOf(ql) !== -1; }); }); }
  };
  var Metrics = {
    log: function (tipo, sid) { if (!isRemote()) return Promise.resolve(); return fetch(B('metrics_events'), { method: 'POST', headers: H({ 'Content-Type': 'application/json' }), body: JSON.stringify({ tipo: tipo, store_id: sid || null }) }).catch(function () {}); }
  };
  /* uploadPhoto v3.5 — retry */
  function uploadPhoto(file) {
    return compressImage(file).then(function (f) {
      if (!isRemote()) return new Promise(function (res) { var r = new FileReader(); r.onload = function () { res(r.result); }; r.readAsDataURL(f); });
      var isPng = f.type === 'image/png'; var ext = isPng ? 'png' : 'jpg';
      var path = 'lojas/' + Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext;
      var url  = CONFIG.supabase.url + '/storage/v1/object/fotos/' + path;
      var hdrs = H({ 'Content-Type': isPng ? 'image/png' : 'image/jpeg' });
      function attempt(n) {
        return fetch(url, { method: 'POST', headers: hdrs, body: f }).then(function (r) {
          if (!r.ok && r.status >= 500 && n < 3) return new Promise(function(res){ setTimeout(res, 1000*Math.pow(2,n-1)); }).then(function(){ return attempt(n+1); });
          if (!r.ok) throw new Error('upload HTTP ' + r.status);
          return CONFIG.supabase.url + '/storage/v1/object/public/fotos/' + path;
        }).catch(function(e){ if (n < 3) return new Promise(function(res){ setTimeout(res, 1000*Math.pow(2,n-1)); }).then(function(){ return attempt(n+1); }); throw e; });
      }
      return attempt(1);
    });
  }
  
  function setListingSEO(s) {
    try {
      var cLoc = s.cidade || currentCityName();
      var uf = CITY_UFS[s.city_slug] || currentCityUF();
      document.title = (s.nome || 'Empresa') + ' em ' + cLoc + ' · Aqui Tem Achadinhos';
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute('content', (s.descricao_curta || s.nome || '') + ' Veja endereço, horário e contato direto no WhatsApp em ' + cLoc + (uf && uf !== 'BR' ? '/' + uf : '') + '.');
      function setMeta(p, c) { var m = document.querySelector('meta[property="' + p + '"]'); if (!m) { m = document.createElement('meta'); m.setAttribute('property', p); document.head.appendChild(m); } m.setAttribute('content', c); }
      setMeta('og:title', (s.nome || '') + ' em ' + cLoc);
      setMeta('og:description', s.descricao_curta || s.nome || '');
      setMeta('og:url', location.href);
      var ld = document.createElement('script'); ld.type = 'application/ld+json';
      ld.text = JSON.stringify({ "@context": "https://schema.org", "@type": "LocalBusiness", "name": s.nome || '', "description": s.descricao_curta || '', "image": s.capa || s.foto || '', "telephone": s.telefone || '', "url": location.href, "address": { "@type": "PostalAddress", "addressLocality": cLoc, "addressRegion": uf, "addressCountry": "BR", "streetAddress": s.bairro || '' }, "priceRange": "$$" });
      document.head.appendChild(ld);
    } catch (e) {}
  }
  window.ATA = { CONFIG: CONFIG, LojistaAuth: LojistaAuth, Stores: Stores, Offers: Offers, Categories: Categories, Metrics: Metrics, uploadPhoto: uploadPhoto, waLink: waLink, esc: esc };

  /* LAYOUT — identidade AQUITEM */
  var LOGO = '<img src="assets/aquitem-symbol.png" class="w-10 h-10 rounded-xl shadow-soft object-cover" alt="AQUITEM">';
  function cityRegistrationUrl() {
    var slug = currentCitySlug();
    if (slug === 'nacional' || slug === 'www') return 'cadastro.html';
    return slug === 'barretos' ? 'cadastro.html' : 'https://www.aquitemachadinhos.com.br/cadastro-cidade.html?cidade=' + encodeURIComponent(slug) + '&utm_source=site&utm_medium=header_cta&utm_campaign=expansao_' + encodeURIComponent(slug);
  }

  function headerHTML(active) {
    var slug = currentCitySlug();
    var isNational = (slug === 'nacional' || slug === 'www');
    var isBarretos = (slug === 'barretos');
    var city = currentCityName();
    var submark = isNational ? 'REDE NACIONAL · BRASIL' : ('GUIAS LOCAIS · ' + esc(city.toUpperCase()));

    var it = [
      { k: 'home', l: 'Início', h: 'index.html' },
      { k: 'cidades', l: '🌎 Cidades', h: 'cidades.html' },
      { k: 'marcas', l: '🏢 Marcas', h: 'marcas.html' },
      { k: 'classificados', l: '📋 Classificados', h: 'classificados.html' },
      { k: 'vagas', l: '💼 Vagas', h: 'vagas.html' },
      { k: 'categoria', l: 'Categorias', h: 'categoria.html' },
      { k: 'busca', l: '🔍 Buscar', h: 'busca.html' },
      { k: 'anuncie', l: 'Para empresas', h: 'anuncie.html' }
    ];
    if (isBarretos) it.splice(5, 0, { k: 'guiapeao', l: 'Guia do Peão', h: 'guia-peao.html' });

    var nav = it.map(function (i) { return '<a href="' + i.h + '" class="' + (active === i.k ? 'text-white font-bold' : 'text-silver-200 hover:text-white') + ' transition">' + i.l + '</a>'; }).join('');
    var mob = it.map(function (i) { return '<a href="' + i.h + '" class="py-2.5 px-3 rounded-lg hover:bg-white/5 ' + (active === i.k ? 'text-white font-bold' : '') + '">' + i.l + '</a>'; }).join('');
    var regUrl = isNational ? 'cadastro.html' : cityRegistrationUrl();

    return '<header class="sticky top-0 z-50 bg-navy-950/90 backdrop-blur border-b border-white/10">' +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 aquitem-header flex items-center justify-between gap-3">' +
        '<a href="index.html" class="flex items-center gap-2.5 shrink-0">' +
          LOGO +
          '<span class="leading-tight">' +
            '<span class="block font-display font-extrabold aquitem-wordmark text-[15px] text-chrome">AQUITEM</span>' +
            '<span class="block text-[9px] text-peao-400 font-bold aquitem-submark">' + submark + '</span>' +
          '</span>' +
        '</a>' +
        '<nav class="hidden lg:flex items-center gap-7 text-sm font-medium">' + nav + '</nav>' +
        '<div class="flex items-center gap-2">' +
          '<a href="' + regUrl + '" class="hidden sm:inline-flex btn-shine bg-amber-400 hover:bg-amber-300 text-navy-950 text-sm font-extrabold px-4 py-2.5 rounded-xl transition">Cadastrar empresa</a>' +
          '<button id="menuBtn" class="lg:hidden w-10 h-10 grid place-items-center rounded-xl glass text-white" aria-label="Abrir menu">' +
            '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="mobileMenu" class="hidden lg:hidden border-t border-white/10 bg-navy-950/95">' +
        '<div class="px-4 py-3 flex flex-col gap-1 text-silver-200">' +
          mob +
          '<a href="' + regUrl + '" class="mt-1 text-center bg-amber-400 text-navy-950 font-extrabold py-3 rounded-xl">Cadastrar empresa</a>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  function footerHTML() {
    var slug = currentCitySlug();
    var isNational = (slug === 'nacional' || slug === 'www');
    var isBarretos = (slug === 'barretos');
    var city = currentCityName();
    var register = isNational ? 'cadastro.html' : cityRegistrationUrl();
    var footerDesc = isNational
      ? 'Empresas, experiências, vagas e achadinhos nas principais cidades e polos turísticos do <b>Brasil</b>.'
      : ('Empresas, experiências e achadinhos locais para quem mora, visita ou empreende em <b>' + esc(city) + '</b>.');
    var explore = '<a href="cidades.html" class="hover:text-white">Todas as cidades</a><a href="marcas.html" class="hover:text-white">Vitrine de Marcas</a><a href="vagas.html" class="hover:text-white">Vagas de emprego</a><a href="classificados.html" class="hover:text-white">Classificados</a><a href="categoria.html" class="hover:text-white">Categorias</a><a href="ofertas.html" class="hover:text-white">Ofertas</a>';
    var legal = '<a href="sobre.html" class="hover:text-white">Sobre</a><a href="contato.html" class="hover:text-white">Contato</a><a href="faq.html" class="hover:text-white">Ajuda</a><a href="politica-de-privacidade.html" class="hover:text-white">Privacidade</a><a href="termos.html" class="hover:text-white">Termos</a><a href="politica-de-ofertas.html" class="hover:text-white">Política de ofertas</a>' + (isBarretos ? '<a href="guia-peao.html" class="hover:text-white">Festa do Peão</a>' : '');
    var footerLocBadge = isNational ? 'Brasil' : (esc(city) + '/' + esc(currentCityUF()));

    return '<footer class="bg-navy-950 text-silver-300 border-t border-white/10">' +
      '<div id="socialProof" class="border-b border-white/10">' +
        '<div class="max-w-5xl mx-auto px-4 py-7 text-center text-silver-400 text-sm">Carregando números reais…</div>' +
      '</div>' +
      '<div class="max-w-7xl mx-auto px-5 sm:px-6 py-12 grid md:grid-cols-4 gap-9">' +
        '<div class="md:col-span-2">' +
          '<div class="flex items-center gap-3 mb-4">' +
            LOGO +
            '<span>' +
              '<span class="block font-display font-extrabold tracking-[.08em] text-chrome">AQUITEM</span>' +
              '<span class="block text-[10px] text-peao-400 font-bold tracking-[.14em]">AQUI TEM ACHADINHOS</span>' +
            '</span>' +
          '</div>' +
          '<p class="text-sm text-silver-400 max-w-sm leading-relaxed">' + footerDesc + '</p>' +
          '<div class="flex gap-3 mt-5">' +
            '<a href="' + waLink('Olá! Vim pela AQUITEM.') + '" target="_blank" rel="noopener noreferrer" class="w-10 h-10 grid place-items-center rounded-xl glass hover:bg-white/10 transition" aria-label="WhatsApp">💬</a>' +
            '<a href="' + CONFIG.instagram + '" target="_blank" rel="noopener noreferrer" class="w-10 h-10 grid place-items-center rounded-xl glass hover:bg-white/10 transition" aria-label="Instagram">📸</a>' +
            '<a href="https://t.me/ofertasbrasilz" target="_blank" rel="noopener noreferrer" class="w-10 h-10 grid place-items-center rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9]/40 border border-[#229ED9]/40 text-[#229ED9] transition" aria-label="Telegram">✈️</a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<h4 class="text-white font-semibold mb-3 font-display">Explorar</h4>' +
          '<div class="aquitem-footer-nav text-sm text-silver-400">' + explore + '</div>' +
        '</div>' +
        '<div>' +
          '<h4 class="text-white font-semibold mb-3 font-display">Para empresas</h4>' +
          '<div class="aquitem-footer-nav text-sm text-silver-400">' +
            '<a href="' + register + '" class="hover:text-white">Cadastrar empresa</a>' +
            '<a href="anuncie.html" class="hover:text-white">Planos e visibilidade</a>' +
            '<a href="' + waLink('Olá! Quero saber sobre anúncios na AQUITEM.') + '" target="_blank" rel="noopener noreferrer" class="hover:text-white">Falar no WhatsApp</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="border-t border-white/10">' +
        '<div class="max-w-7xl mx-auto px-5 sm:px-6 py-5 text-xs text-silver-400 aquitem-footer-links">' + legal + '</div>' +
        '<div class="max-w-7xl mx-auto px-5 sm:px-6 pb-6 text-xs text-silver-400 flex flex-col sm:flex-row justify-between gap-2">' +
          '<span>© 2026 AQUITEM · Aqui Tem Achadinhos</span>' +
          '<span>Conteúdo pago é identificado como “Destaque”. ' + footerLocBadge + '</span>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }
  function injectLayout() {
    initCityAutocomplete();
    var h = $('#site-header'); if (h) h.innerHTML = headerHTML(document.body.dataset.page || 'home');
    var f = $('#site-footer'); if (f) f.innerHTML = footerHTML();
    var b = $('#menuBtn'), m = $('#mobileMenu');
    if (b && m) { b.addEventListener('click', function () { m.classList.toggle('hidden'); }); m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.classList.add('hidden'); }); }); }
    var pageSurface = document.body && document.body.getAttribute('data-page');
    var isAdminSurface = document.body && ['admin','painel','login'].indexOf(pageSurface) !== -1;
    var landingPages = ['home','barretos','gramado','blumenau','bonito','buzios','campos','caruaru','florianopolis','jericoacoara','porto','salvador','uberlandia','caldasnovas','manaus','curitiba','foz-do-iguacu','balneario-camboriu','fortaleza','natal','noronha','ouro-preto','paraty','pirenopolis','vitoria','campo-grande','chapada-guimaraes','jalapao','lencois','alter-do-chao'];
    var allowFloatingWa = landingPages.indexOf(pageSurface) !== -1;
    if (!isAdminSurface && allowFloatingWa && !$('#ataFloatingWa')) { var a = document.createElement('a'); a.id = 'ataFloatingWa'; a.href = waLink('Olá! Vim pela AQUITEM.'); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'fixed bottom-5 left-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-2xl hover:scale-105 transition'; a.setAttribute('aria-label', 'WhatsApp'); a.innerHTML = '💬'; document.body.appendChild(a); }
    if (!isAdminSurface && !$('.aquitem-telegram-float')) {
      var tg = document.createElement('a');
      tg.href = 'https://t.me/ofertasbrasilz';
      tg.target = '_blank';
      tg.rel = 'noopener';
      tg.className = 'aquitem-telegram-float';
      tg.setAttribute('aria-label', 'Entrar no grupo Ofertas Brasil no Telegram');
      tg.innerHTML = '<svg viewBox="0 0 24 24" fill="#229ED9" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.15-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36 0-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg><span>🎁 Ofertas Brasil <span class="hide-mobile">no Telegram</span></span><span class="aquitem-telegram-badge">AO VIVO</span>';
      document.body.appendChild(tg);
    }
  }

  
  /* === ENGINE AUTOCOMPLETE INTELIGENTE MULTI-CIDADE (5.571 CIDADES DO BRASIL - IBGE) === */
  var _ALL_BRAZIL_CITIES = null;

  function loadAllBrazilCities() {
    if (_ALL_BRAZIL_CITIES) return Promise.resolve(_ALL_BRAZIL_CITIES);
    return fetch('assets/cidades-brasil.json').then(function(r){ return r.json(); }).then(function(data) {
      _ALL_BRAZIL_CITIES = [];
      for (var slug in data) {
        var item = data[slug];
        _ALL_BRAZIL_CITIES.push({
          slug: slug,
          name: item[0],
          uf: item[1],
          pilar: item[2] || 'interior'
        });
      }
      return _ALL_BRAZIL_CITIES;
    }).catch(function() {
      _ALL_BRAZIL_CITIES = Object.keys(CITY_NAMES).filter(function(k){ return k !== 'nacional'; }).map(function(k){
        return { slug: k, name: CITY_NAMES[k], uf: CITY_UFS[k] || 'BR', pilar: 'interior' };
      });
      return _ALL_BRAZIL_CITIES;
    });
  }

  function initCityAutocomplete() {
    var searchInputs = document.querySelectorAll('#citySearchInput, #heroCitySearch, #q, input[name=q], #classSearchInput, #vagasSearchInput');
    if (!searchInputs.length) return;

    loadAllBrazilCities().then(function(cityList) {
      searchInputs.forEach(function(inp) {
        if (inp.getAttribute('data-has-autocomplete')) return;
        inp.setAttribute('data-has-autocomplete', 'true');

        var wrapper = inp.parentElement;
        if (!wrapper) return;
        if (getComputedStyle(wrapper).position === 'static') {
          wrapper.style.position = 'relative';
        }

        var drop = document.createElement('div');
        drop.className = 'aquitem-autocomplete-box hidden';
        drop.style.cssText = 'position:absolute;top:100%;left:0;right:0;margin-top:6px;background:#0B1E3F;border:1px solid rgba(245,215,127,0.35);border-radius:18px;box-shadow:0 20px 45px rgba(0,0,0,0.6);z-index:99999;max-height:300px;overflow-y:auto;padding:8px;backdrop-blur:12px;';
        wrapper.appendChild(drop);

        inp.addEventListener('input', function() {
          var q = (inp.value || '').toLowerCase().trim();
          if (q.length < 2) {
            drop.classList.add('hidden');
            drop.innerHTML = '';
            return;
          }

          var matches = cityList.filter(function(c) {
            return c.name.toLowerCase().indexOf(q) !== -1 || c.slug.toLowerCase().indexOf(q) !== -1 || (q.length === 2 && c.uf.toLowerCase() === q);
          }).slice(0, 10);

          if (!matches.length) {
            drop.classList.add('hidden');
            drop.innerHTML = '';
            return;
          }

          var staticHomes = {
            'barretos': 'barretos-home.html', 'gramado': 'gramado-home.html', 'campos': 'campos-home.html',
            'buzios': 'buzios-home.html', 'paraty': 'paraty-home.html', 'ouro-preto': 'ouro-preto-home.html',
            'bonito': 'bonito-home.html', 'jalapao': 'jalapao-home.html', 'chapada-guimaraes': 'chapada-guimaraes-home.html',
            'caldasnovas': 'caldasnovas-home.html', 'pirenopolis': 'pirenopolis-home.html', 'lencois': 'lencois-home.html',
            'porto': 'porto-home.html', 'noronha': 'noronha-home.html', 'jericoacoara': 'jericoacoara-home.html',
            'alter-do-chao': 'alter-do-chao-home.html', 'blumenau': 'blumenau-home.html', 'florianopolis': 'florianopolis-home.html',
            'balneario-camboriu': 'balneario-camboriu-home.html', 'foz-do-iguacu': 'foz-do-iguacu-home.html', 'caruaru': 'caruaru-home.html',
            'natal': 'natal-home.html', 'sao-paulo': 'sao-paulo-home.html', 'rio-de-janeiro': 'rio-de-janeiro-home.html',
            'belo-horizonte': 'belo-horizonte-home.html', 'brasilia': 'brasilia-home.html', 'curitiba': 'curitiba-home.html',
            'porto-alegre': 'porto-alegre-home.html', 'salvador': 'salvador-home.html', 'recife': 'recife-home.html',
            'fortaleza': 'fortaleza-home.html', 'goiania': 'goiania-home.html', 'manaus': 'manaus-home.html',
            'belem': 'belem-home.html', 'vitoria': 'vitoria-home.html', 'campo-grande': 'campo-grande-home.html',
            'cuiaba': 'cuiaba-home.html', 'sao-luis': 'sao-luis-home.html', 'maceio': 'maceio-home.html',
            'joao-pessoa': 'joao-pessoa-home.html', 'teresina': 'teresina-home.html', 'aracaju': 'aracaju-home.html',
            'campinas': 'campinas-home.html', 'ribeirao-preto': 'ribeirao-preto-home.html', 'sao-jose-do-rio-preto': 'sao-jose-do-rio-preto-home.html',
            'santos': 'santos-home.html', 'sorocaba': 'sorocaba-home.html', 'piracicaba': 'piracicaba-home.html',
            'franca': 'franca-home.html', 'juiz-de-fora': 'juiz-de-fora-home.html', 'montes-claros': 'montes-claros-home.html',
            'londrina': 'londrina-home.html', 'maringa': 'maringa-home.html', 'joinville': 'joinville-home.html',
            'caxias-do-sul': 'caxias-do-sul-home.html', 'feira-de-santana': 'feira-de-santana-home.html',
            'campina-grande': 'campina-grande-home.html', 'anapolis': 'anapolis-home.html', 'rio-verde': 'rio-verde-home.html',
            'bebedouro': 'bebedouro-home.html', 'colombia': 'colombia-home.html', 'olimpia': 'olimpia-home.html',
            'guaira': 'guaira-home.html'
          };

          var html = matches.map(function(c) {
            var targetUrl = staticHomes[c.slug] || ('guia.html?cidade=' + encodeURIComponent(c.slug));
            var badgeText = c.pilar === 'turistico' ? '🌟 Turístico' : (c.pilar === 'capital' ? '🏙️ Capital' : '🌾 Regional');
            return '<a href="' + targetUrl + '" class="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-white transition text-xs font-semibold" style="text-decoration:none;">' +
              '<div class="flex items-center gap-2.5">' +
                '<span class="text-base">📍</span>' +
                '<span>' + esc(c.name) + '</span>' +
                '<span class="text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">' + esc(c.uf) + '</span>' +
                '<span class="text-[9px] text-silver-400 hidden sm:inline">' + badgeText + '</span>' +
              '</div>' +
              '<span class="text-amber-400 text-xs font-bold flex items-center gap-1">Ver guia <span>→</span></span>' +
            '</a>';
          }).join('');

          drop.innerHTML = html;
          drop.classList.remove('hidden');
        });

        document.addEventListener('click', function(e) {
          if (!wrapper.contains(e.target)) {
            drop.classList.add('hidden');
          }
        });
      });
    });
  }

  /* CITY PARALLAX — leve, progressivo e desligável */
  function initCityParallax() {
    var hero = document.querySelector('.cidade-hero');
    if (!hero || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    hero.style.setProperty('--parallax-x', '0px'); hero.style.setProperty('--parallax-y', '0px'); hero.style.setProperty('--parallax-x-soft', '0px'); hero.style.setProperty('--parallax-y-soft', '0px');
    if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
      hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); var x = ((e.clientX-r.left)/r.width-.5)*16; var y = ((e.clientY-r.top)/r.height-.5)*12; hero.style.setProperty('--parallax-x', x.toFixed(1)+'px'); hero.style.setProperty('--parallax-y', y.toFixed(1)+'px'); hero.style.setProperty('--parallax-x-soft', (-x*.7).toFixed(1)+'px'); hero.style.setProperty('--parallax-y-soft', (-y*.7).toFixed(1)+'px'); }, { passive:true });
      hero.addEventListener('pointerleave', function () { hero.style.setProperty('--parallax-x','0px'); hero.style.setProperty('--parallax-y','0px'); hero.style.setProperty('--parallax-x-soft','0px'); hero.style.setProperty('--parallax-y-soft','0px'); });
    }
  }

  /* COUNTDOWN / SW */
  function initCountdown() { var d = $('#cd-d'); if (!d) return; var alvo = new Date('2026-08-20T00:00:00-03:00').getTime(); var pad = function (n) { return n < 10 ? '0' + n : '' + n; }; function setAll(v) { ['cd-d', 'cd-h', 'cd-m', 'cd-s'].forEach(function (id) { var e = document.getElementById(id); if (e) e.textContent = v; }); } function tick() { var r = alvo - Date.now(); if (r <= 0) { setAll('0'); return; } $('#cd-d').textContent = Math.floor(r / 86400000); $('#cd-h').textContent = pad(Math.floor(r % 86400000 / 3600000)); $('#cd-m').textContent = pad(Math.floor(r % 3600000 / 60000)); $('#cd-s').textContent = pad(Math.floor(r % 60000 / 1000)); } tick(); setInterval(tick, 1000); }
  function registerSW() { if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); }); }

  /* CARDS */
  function catName(id, cats) { var c = (cats || CATS).filter(function (x) { return x.id === id; })[0]; return c ? (c.emoji + ' ' + c.nome) : '🏪 Loja'; }
  function catCard(c) { var cnt = window._ataCatCounts && window._ataCatCounts[c.id] ? window._ataCatCounts[c.id] : 0; return '<a href="categoria.html?cat=' + c.id + '" class="card-hover bg-white rounded-2xl p-5 text-center shadow-soft ring-silver relative"><div class="text-4xl">' + (c.emoji || '🏢') + '</div><div class="mt-2 font-display font-bold">' + esc(c.nome) + '</div>' + (cnt > 0 ? '<span class="inline-block mt-1 text-[10px] font-bold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded-full">' + cnt + (cnt === 1 ? ' empresa' : ' empresas') + '</span>' : '<div class="text-xs text-silver-500">' + esc(c.desc || 'Seja o primeiro!') + '</div>') + '</a>'; }
  function storeCard(s, cats) {
    var logo = s.logo_url
      ? '<img src="' + esc(s.logo_url) + '" alt="Logo de ' + esc(s.nome) + '" class="aquitem-store-logo">'
      : '<div class="aquitem-store-logo aquitem-store-initials">' + esc(initials(s.nome)) + '</div>';
    var category = catName(s.categoria, cats);
    var rating = Number(s.rating_count || 0) > 0 ? '<span class="text-[11px] text-amber-600 font-semibold">' + ratingMini(s) + '</span>' : '';
    var badge = s.city_lead_id ? '<span class="aquitem-store-badge">✦ Fundadora</span>' : (s.destaque ? '<span class="aquitem-store-badge">✦ Em destaque</span>' : '');
    var uf = CITY_UFS[s.city_slug] || (s.cidade === 'Barretos' ? 'SP' : (s.cidade === 'Gramado' ? 'RS' : (s.cidade === 'Uberlândia' ? 'MG' : (s.cidade === 'Florianópolis' ? 'SC' : (s.cidade === 'Salvador' ? 'BA' : 'SP')))));
    var cityLabel = s.cidade ? (s.cidade + (uf && uf !== 'BR' ? '/' + uf : '')) : '';
    var local = [s.bairro, cityLabel].filter(Boolean).join(' · ');
    var waMsg = 'Olá! Vi a ' + s.nome + ' no Aqui Tem Achadinhos e gostaria de informações/fazer um pedido.';
    var waDirect = s.whatsapp ? ('<a href="https://wa.me/' + digits(s.whatsapp) + '?text=' + encodeURIComponent(waMsg) + '" target="_blank" rel="noopener" class="text-[11px] font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] px-2.5 py-1 rounded-lg flex items-center gap-1 transition shrink-0" onclick="event.stopPropagation();">💬 WhatsApp Direto</a>') : '';
    var ifoodBtn = s.ifood_url ? ('<a href="' + esc(s.ifood_url) + '" target="_blank" rel="noopener" class="text-[11px] font-bold text-white bg-[#EA1D2C] hover:bg-[#d41825] px-2 py-1 rounded-lg flex items-center gap-1 transition shrink-0" onclick="event.stopPropagation();">🍔 iFood</a>') : '';

    return '<div class="aquitem-store-card flex flex-col justify-between group">' +
      '<a href="loja.html?id=' + encodeURIComponent(s.id) + '" class="block">' +
        '<div class="aquitem-store-head">' +
          logo +
          '<div class="min-w-0 flex-1">' +
            '<h3 class="font-display font-bold text-base leading-snug group-hover:text-amber-400 transition">' + esc(s.nome) + '</h3>' +
            '<div class="aquitem-store-tags"><span>' + esc(category) + '</span>' + badge + '</div>' +
            (local ? '<p class="text-xs text-slate-500 mt-2 truncate">📍 ' + esc(local) + '</p>' : '') +
            (rating ? '<div class="mt-1">' + rating + '</div>' : '') +
          '</div>' +
        '</div>' +
      '</a>' +
      '<div class="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">' +
        '<a href="loja.html?id=' + encodeURIComponent(s.id) + '" class="text-xs font-bold text-amber-400 hover:underline">Ver perfil →</a>' +
        '<div class="flex items-center gap-1.5">' + ifoodBtn + waDirect + '</div>' +
      '</div>' +
    '</div>';
  }

  function offerCard(o) {
    var img = o.imagem_url ? '<img src="' + esc(o.imagem_url) + '" alt="" class="h-32 w-full object-cover" loading="lazy">' : '<div class="h-32 bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-3xl text-white">🏷️</div>';
    return '<a href="loja.html?id=' + encodeURIComponent(o.store_id) + '" class="card-hover rounded-2xl overflow-hidden bg-white ring-silver shadow-soft block">' + img + '<div class="p-4"><h3 class="font-display font-bold">' + esc(o.titulo) + '</h3>' + (o.preco_atual ? '<p class="text-peao-500 font-extrabold mt-1">' + esc(o.preco_atual) + (o.preco_anterior ? ' <span class="text-xs line-through text-silver-400">' + esc(o.preco_anterior) + '</span>' : '') + '</p>' : '') + (o.termino ? '<p class="text-[11px] text-silver-500 mt-1">Válido até ' + esc(formatDate(o.termino)) + '</p>' : '') + '</div></a>';
  }
  function emptyState(t, d, cta) { var slug = currentCitySlug(); var href = slug === 'barretos' ? 'cadastro.html' : 'https://www.aquitemachadinhos.com.br/cadastro-cidade.html?cidade=' + encodeURIComponent(slug) + '&utm_source=site&utm_medium=empty_state&utm_campaign=expansao_' + encodeURIComponent(slug); var label = slug === 'barretos' ? 'Cadastrar empresa 🚀' : 'Cadastrar empresa nesta cidade 🚀'; return '<div class="text-center py-14 px-4"><div class="text-5xl mb-3">🏪</div><h3 class="font-display font-bold text-xl text-slate-700">' + t + '</h3><p class="text-slate-500 mt-1 max-w-md mx-auto">' + d + '</p>' + (cta ? '<a href="' + href + '" class="btn-shine inline-block mt-5 bg-peao-500 hover:bg-peao-600 text-white font-bold px-6 py-3 rounded-xl shadow-redglow transition">' + label + '</a>' : '') + '</div>'; }

  /* SEO para página da empresa */
  function setStoreSEO(s) {
    var cLoc = s.cidade || currentCityName();
    var uf = CITY_UFS[s.city_slug] || currentCityUF();
    document.title = s.nome + ' em ' + cLoc + ' · Aqui Tem Achadinhos';
    setMeta('description', (s.descricao_curta || s.nome) + ' — ' + catName(s.categoria) + ' em ' + cLoc + '. Contato direto pelo WhatsApp.');
    var ld = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: s.nome, description: s.descricao_curta || s.descricao, address: { '@type': 'PostalAddress', addressLocality: cLoc, addressRegion: uf, streetAddress: s.endereco }, telephone: s.telefone, url: location.href };
    setJsonLd(ld);
  }
  function setMeta(name, content) { var m = document.querySelector('meta[name="' + name + '"]') || document.createElement('meta'); m.setAttribute('name', name); m.setAttribute('content', content); if (!m.parentNode) document.head.appendChild(m); }
  function setJsonLd(obj) { var ex = document.getElementById('jsonld'); if (ex) ex.remove(); var s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'jsonld'; s.text = JSON.stringify(obj); document.head.appendChild(s); }

  /* AVALIACOES / TERMOMETRO */
  function ratingStars(n) { n = n || 0; var h = ''; for (var i = 1; i <= 5; i++) { h += '<span style="color:' + (i <= Math.round(n) ? '#f59e0b' : '#cbd5e1') + '">\u2B50</span>'; } return h.replace(/\u2B50/g,'★'); }
  function ratingMini(s) { return '★ ' + Number(s.rating_avg || 0).toFixed(1) + ' (' + (s.rating_count || 0) + ')'; }
  function termometro(s, reviews) {
    var avg = Number(s.rating_avg || 0), count = s.rating_count || 0;
    if (!count) return '';
    var pct = Math.round(avg / 5 * 100);
    var recomendam = reviews.filter(function (r) { return r.nota >= 4; }).length;
    var recPct = count ? Math.round(recomendam / count * 100) : 0;
    var nivel, emoji, cor;
    if (avg >= 4.5 && count >= 3) { nivel = 'Recomendadíssimo'; emoji = '🔥'; cor = 'from-peao-500 to-amber-400'; }
    else if (avg >= 4) { nivel = 'Muito recomendado'; emoji = '👍'; cor = 'from-amber-500 to-amber-300'; }
    else if (avg >= 3) { nivel = 'Bem avaliado'; emoji = '🌡️'; cor = 'from-sky-500 to-amber-300'; }
    else { nivel = 'Avaliações divididas'; emoji = '❄️'; cor = 'from-sky-400 to-sky-300'; }
    return '<div class="mt-4"><div class="flex items-center justify-between text-xs text-slate-500 mb-1"><span>Termômetro de recomendação</span><span>' + emoji + ' <b class="text-navy-900">' + nivel + '</b></span></div><div class="h-3 rounded-full bg-silver-200 overflow-hidden"><div class="h-full bg-gradient-to-r ' + cor + '" style="width:' + pct + '%"></div></div><p class="text-[11px] text-slate-500 mt-1">' + recPct + '% dos avaliadores recomendam</p></div>';
  }
  function ratingSummary(s, reviews) {
    var count = s.rating_count || reviews.length || 0, avg = s.rating_avg || 0;
    if (!count) return '<div class="rounded-2xl bg-silver-50 ring-silver p-5 mb-4"><p class="text-sm text-slate-600">Ainda sem avaliações. <b>Seja o primeiro a avaliar! ⭐</b></p></div>';
    var dist = [0, 0, 0, 0, 0]; reviews.forEach(function (r) { if (r.nota >= 1 && r.nota <= 5) dist[5 - r.nota]++; });
    var rows = [5, 4, 3, 2, 1].map(function (star) { var cc = dist[5 - star]; var p = count ? Math.round(cc / count * 100) : 0; return '<div class="flex items-center gap-2 text-xs"><span class="w-3 text-slate-500">' + star + '★</span><div class="flex-1 h-2 rounded-full bg-silver-200 overflow-hidden"><div class="h-full bg-amber-400" style="width:' + p + '%"></div></div><span class="w-6 text-right text-slate-400">' + cc + '</span></div>'; }).join('');
    return '<div class="rounded-2xl bg-silver-50 ring-silver p-5 mb-4"><div class="flex items-center gap-4"><div class="text-center shrink-0"><div class="font-display text-4xl font-extrabold text-navy-900">' + Number(avg).toFixed(1) + '</div><div class="text-sm">' + ratingStars(avg) + '</div><div class="text-xs text-slate-500">' + count + ' avaliação(ões)</div></div><div class="flex-1 space-y-1">' + rows + '</div></div>' + termometro(s, reviews) + '</div>';
  }
  function reviewList(reviews, tipo) {
    tipo = tipo || 'store';
    if (!reviews.length) return '';
    var pb = { cliente: ['bg-emerald-100 text-emerald-700', 'Cliente'], morador: ['bg-navy-100 text-navy-700', 'Morador'], turista: ['bg-amber-100 text-amber-700', 'Turista'], 'ex-funcionario': ['bg-peao-100 text-peao-700', 'Ex-funcionário'] };
    var avC = ['bg-navy-700', 'bg-peao-600', 'bg-emerald-600', 'bg-amber-600', 'bg-sky-700', 'bg-purple-600', 'bg-rose-600'];
    return '<h3 class="font-display font-bold mt-2 mb-3">Comentários (' + reviews.length + ')</h3><div class="space-y-3">' + reviews.map(function (r) {
      var d = new Date(r.criado_em).toLocaleDateString('pt-BR');
      var badge = pb[r.perfil] || ['', ''];
      var av = avC[(r.nome || '?').charCodeAt(0) % avC.length] || 'bg-navy-700';
      return '<div class="bg-white rounded-xl ring-silver p-4"><div class="flex items-center gap-2"><div class="w-9 h-9 rounded-full ' + av + ' text-white grid place-items-center text-xs font-bold shrink-0">' + esc(initials(r.nome || 'A')) + '</div><div class="min-w-0"><p class="font-semibold text-sm truncate flex items-center gap-1.5 flex-wrap">' + esc(r.nome || 'Anônimo') + (badge[0] ? '<span class="text-[10px] font-bold px-1.5 py-0.5 rounded ' + badge[0] + '">' + esc(badge[1]) + '</span>' : '') + '</p><p class="text-xs text-slate-400">' + d + '</p></div><div class="ml-auto text-sm whitespace-nowrap">' + ratingStars(r.nota) + '</div></div>' + (r.titulo ? '<p class="font-semibold text-sm mt-2 text-navy-900">' + esc(r.titulo) + '</p>' : '') + (r.comentario ? '<p class="text-sm text-slate-600 mt-1 whitespace-pre-line">' + esc(r.comentario) + '</p>' : '') + '<div class="mt-2"><button data-helpful="' + esc(r.id) + '" data-tipo="' + tipo + '" class="text-xs text-slate-500 hover:text-peao-600 font-semibold transition">👍 Útil' + (r.helpful ? ' (' + r.helpful + ')' : '') + '</button></div></div>';
    }).join('') + '</div>';
  }
  function reviewForm(s, tipo) {
    tipo = tipo || 'store';
    var lbl = tipo === 'driver' ? 'Avalie este motorista' : 'Avalie esta empresa';
    var ph = tipo === 'driver' ? 'Como foi a corrida? (opcional)' : 'Conte sua experiência (opcional)';
    return '<form id="formReview" class="bg-white rounded-2xl ring-silver shadow-soft p-5 mb-4"><h3 class="font-display font-bold mb-3">' + lbl + '</h3><div id="starInput" class="flex gap-1 mb-3" data-val="0" role="radiogroup" aria-label="Sua nota de 1 a 5 estrelas">' + [1, 2, 3, 4, 5].map(function (i) { return '<span data-s="' + i + '" class="star cursor-pointer text-3xl text-silver-300 hover:text-amber-400 transition" role="button" tabindex="0" aria-label="' + i + ' estrela' + (i > 1 ? 's' : '') + '">★</span>'; }).join('') + '</div><div class="grid sm:grid-cols-2 gap-2 mb-2"><select name="perfil" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver text-sm"><option value="">Sou um…</option><option value="cliente">Cliente</option><option value="morador">Morador local</option><option value="turista">Turista / visitante</option><option value="ex-funcionario">Ex-funcionário</option></select><input name="nome" placeholder="Seu nome (opcional)" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver text-sm"></div><input name="titulo" placeholder="Título da avaliação (opcional)" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver text-sm mb-2"><textarea name="comentario" rows="3" placeholder="' + ph + '" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver text-sm mb-2"></textarea><button class="btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold px-5 py-2.5 rounded-xl">Enviar avaliação</button><span id="reviewMsg" class="text-sm ml-2"></span><p class="text-xs text-slate-400 mt-2">As avaliações passam por análise antes de serem publicadas.</p></form>';
  }
  function ratingBlock(s, reviews) { reviews = reviews || []; return '<div class="mt-6">' + ratingSummary(s, reviews) + reviewForm(s) + reviewList(reviews) + '</div>'; }
  function wireHelpful(tipo) {
    var voted = JSON.parse(localStorage.getItem('ata_helpful') || '[]');
    document.querySelectorAll('[data-helpful]').forEach(function (b) {
      if (b.getAttribute('data-bound')) return; b.setAttribute('data-bound', '1');
      var id = b.getAttribute('data-helpful');
      if (voted.indexOf(id) > -1) b.classList.add('opacity-50');
      b.addEventListener('click', function () {
        if (voted.indexOf(id) > -1) return;
        voted.push(id); localStorage.setItem('ata_helpful', JSON.stringify(voted));
        fetch(CONFIG.supabase.url + '/rest/v1/rpc/review_helpful', { method: 'POST', headers: H({ 'Content-Type': 'application/json' }), body: JSON.stringify({ p_id: id, p_table: tipo }) }).then(function () { var m = b.textContent.match(/\d+/); var n = m ? parseInt(m[0], 10) + 1 : 1; b.innerHTML = '👍 Útil (' + n + ')'; b.classList.add('opacity-50'); });
      });
    });
  }
  function wireReview(s) {
    var si = $('#starInput'); if (!si) return; var val = 0;
    function paint(n) { si.querySelectorAll('.star').forEach(function (el, idx) { el.className = 'star cursor-pointer text-3xl transition ' + (idx < n ? 'text-amber-400' : 'text-silver-300 hover:text-amber-400'); }); }
    si.querySelectorAll('.star').forEach(function (el) { function sel() { val = parseInt(el.getAttribute('data-s'), 10); si.setAttribute('data-val', val); paint(val); } el.addEventListener('click', sel); el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); sel(); } }); });
    var f = $('#formReview'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var msg = $('#reviewMsg'); var nota = parseInt(si.getAttribute('data-val'), 10);
      if (!nota || nota < 1) { msg.className = 'text-sm ml-2 text-peao-600'; msg.textContent = 'Selecione de 1 a 5 estrelas.'; return; }
      var o = { store_id: s.id, nota: nota, nome: f.querySelector('[name=nome]').value.trim(), titulo: f.querySelector('[name=titulo]').value.trim(), perfil: f.querySelector('[name=perfil]').value, comentario: f.querySelector('[name=comentario]').value.trim(), status: 'ativo' };
      fetch(B('reviews'), { method: 'POST', headers: H({ 'Content-Type': 'application/json' }), body: JSON.stringify(o) }).then(function (r) {
        if (r.ok) { msg.className = 'text-sm ml-2 text-emerald-600'; msg.textContent = '✓ Avaliação enviada! Será publicada após análise.'; f.reset(); val = 0; paint(0); }
        else { msg.className = 'text-sm ml-2 text-peao-600'; msg.textContent = 'Erro ao enviar. Tente novamente.'; }
      });
    });
  }

  function sortByPlano(arr) { return arr.sort(function (a, b) { var pa = a.plano === 'pro' ? 3 : (a.plano === 'destaque' ? 2 : 1); var pb = b.plano === 'pro' ? 3 : (b.plano === 'destaque' ? 2 : 1); return pb - pa || (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0) || (b.rating_avg || 0) - (a.rating_avg || 0); }); }

  /* compressImage v2.0 */
  function compressImage(file) {
    return new Promise(function (resolve) {
      if (!file || !file.type || file.type.indexOf('image/') !== 0 || file.size <= 204800) { resolve(file); return; }
      var origSize = file.size;
      var u = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(u);
        var MAX_W = 1200, MAX_H = 1200;
        var w = img.naturalWidth || img.width;
        var h = img.naturalHeight || img.height;
        if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
        if (h > MAX_H) { w = Math.round(w * MAX_H / h); h = MAX_H; }
        var cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        var ctx = cv.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        var isPng = file.type === 'image/png';
        var mime = isPng ? 'image/png' : 'image/jpeg';
        var quality = isPng ? 0.90 : 0.80;
        cv.toBlob(function (b) {
          var result = b || file;
          try { window.dispatchEvent(new CustomEvent('ata:compress', { detail: { origSize: origSize, newSize: result.size } })); } catch (_) {}
          resolve(result);
        }, mime, quality);
      };
      img.onerror = function () { URL.revokeObjectURL(u); resolve(file); };
      img.src = u;
    });
  }
  function loadingHTML(msg) {
    return '<div class="text-center py-10"><div class="inline-block w-8 h-8 border-4 border-silver-300 border-t-peao-500 rounded-full animate-spin"></div><p class="text-sm text-silver-500 mt-3">' + (msg || 'Carregando...') + '</p></div>';
  }

  function abertoAgora(s) {
    if (!s.horario_dias || !s.horario_abre || !s.horario_fecha) return null;
    var agora = new Date(); var dia = agora.getDay();
    var dias = s.horario_dias.split(',').map(function (d) { return parseInt(d.trim(), 10); });
    if (dias.indexOf(dia) === -1) return false;
    var min = agora.getHours() * 60 + agora.getMinutes();
    var pA = s.horario_abre.split(':'); var pF = s.horario_fecha.split(':');
    var minA = parseInt(pA[0], 10) * 60 + parseInt(pA[1] || 0, 10);
    var minF = parseInt(pF[0], 10) * 60 + parseInt(pF[1] || 0, 10);
    return min >= minA && min <= minF;
  }

  /* FAVORITOS + PWA */
  var FAVS_KEY = 'ata_favs';
  function getFavs() { return JSON.parse(localStorage.getItem(FAVS_KEY) || '[]'); }
  function toggleFav(id) { var f = getFavs(); var idx = f.indexOf(id); if (idx > -1) f.splice(idx, 1); else f.push(id); localStorage.setItem(FAVS_KEY, JSON.stringify(f)); return idx === -1; }
  function isFav(id) { return getFavs().indexOf(id) > -1; }
  var _dp = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); _dp = e; var b = document.createElement('button'); b.id = 'installBtn'; b.className = 'fixed bottom-20 right-5 z-50 bg-navy-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg hover:bg-navy-800 transition'; b.innerHTML = '📲 Instalar app'; b.onclick = function () { if (_dp) { _dp.prompt(); _dp.userChoice.then(function () { _dp = null; b.remove(); }); } }; document.body.appendChild(b); });

  /* PAGES */
  function pageHome() {
    Promise.all([Categories.list(), Stores.list(), Offers.listActive()]).then(function (r) {
      var cats = r[0], stores = r[1], offers = r[2]; stores = sortByPlano(stores);
      window._ataCatCounts = {}; stores.forEach(function (s) { window._ataCatCounts[s.categoria] = (window._ataCatCounts[s.categoria] || 0) + 1; });
      var cg = $('#catGrid'); if (cg) cg.innerHTML = cats.map(catCard).join('');
      var og = $('#ofertasGrid'); if (og) og.innerHTML = offers.length ? offers.map(offerCard).join('') : emptyGrid('Nenhuma oferta ativa ainda.');
      var dg = $('#destaqueGrid'); if (dg) dg.innerHTML = stores.length ? stores.map(function (s) { return storeCard(s, cats); }).join('') : emptyGrid('Nenhuma empresa cadastrada — seja a primeira!');
      var tg = $('#topGrid'); if (tg) { var top = stores.filter(function (s) { return s.rating_count > 0; }).sort(function (a, b) { return (b.rating_avg || 0) - (a.rating_avg || 0) || (b.rating_count - a.rating_count); }).slice(0, 8); tg.innerHTML = top.length ? top.map(function (s) { return storeCard(s, cats); }).join('') : emptyGrid('As melhores avaliadas aparecem aqui assim que a primeira avaliação for aprovada.'); }
    });
  }
  function emptyGrid(msg) { return '<div class="col-span-full text-center py-10 text-silver-500 text-sm">' + msg + '</div>'; }

  function pageCategoria() {
    var t = $('#catTitle'), sub = $('#catSubtitle'), l = $('#catList'); if (!l) return;
    var cat = params().get('cat');
    function render(stores, cats) {
      cats = (cats && cats.length) ? cats : CATS; stores = stores || [];
      if (cat) {
        var c = cats.filter(function (x) { return x.id === cat; })[0] || { nome: cat, emoji: '🏪' };
        if (t) t.innerHTML = c.emoji + ' ' + esc(c.nome);
        if (sub) sub.textContent = 'Empresas de ' + c.nome + ' em ' + currentCityName() + '.';
        var list = sortByPlano(stores.filter(function (x) { return x.categoria === cat; }));
        var hasGeo = list.some(function (x) { return x.lat && x.lng; });
        var near = hasGeo ? '<button id="btnNearCat" class="btn-shine bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold px-4 py-2 rounded-xl mb-4">📍 Ordenar por distância</button>' : '';
        l.innerHTML = near + (list.length ? '<div class="aquitem-store-list">' + list.map(function (x) { return storeCard(x, cats); }).join('') + '</div>' : emptyState('Nenhuma empresa aqui ainda', 'Seja a primeira empresa de ' + esc(c.nome) + ' no guia.', true));
        var nb = $('#btnNearCat'); if (nb) nb.addEventListener('click', function () { nb.textContent = '📍 Localizando...'; navigator.geolocation.getCurrentPosition(function (pos) { var me = [pos.coords.latitude, pos.coords.longitude]; list.sort(function (x, y) { return ((x.lat && x.lng) ? haversine(me, [x.lat, x.lng]) : 99999) - ((y.lat && y.lng) ? haversine(me, [y.lat, y.lng]) : 99999); }); render(list, cats); }, function () { nb.textContent = '📍 Localização negada'; }); });
      } else {
        if (t) t.textContent = 'Categorias';
        if (sub) sub.textContent = 'Todas as categorias do guia de ' + currentCityName() + '.';
        window._ataCatCounts = {}; stores.forEach(function (x) { window._ataCatCounts[x.categoria] = (window._ataCatCounts[x.categoria] || 0) + 1; });
        l.innerHTML = '<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">' + cats.map(catCard).join('') + '</div>';
      }
    }
    // Renderização imediata evita tela presa em “Carregando...” no celular.
    render([], CATS);
    Promise.all([Categories.list(), Stores.list()]).then(function (r) { render(r[1], r[0]); }).catch(function () { /* a versão imediata continua utilizável */ });
  }

  function pageOfertas() {
    var l = $('#ofertasList'); if (!l) return; l.innerHTML = loadingHTML();
    Offers.listActive().then(function (offers) { l.innerHTML = offers.length ? '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">' + offers.map(offerCard).join('') + '</div>' : emptyState('Nenhuma oferta ativa no momento', 'As ofertas reais aparecem aqui assim que as empresas publicarem (e estiverem dentro da validade).', false); });
  }

  function pageBusca() {
    var l = $('#resBusca'), tt = $('#buscaTitulo'); if (!l) return;
    var q = params().get('q') || '';
    var inp = $('#q'); if (inp) inp.value = q;
    if (tt) tt.textContent = q ? ('Resultados para "' + q + '"') : 'Busca';
    if (!q) { l.innerHTML = emptyState('Digite algo para buscar', 'Use a busca para encontrar lojas, vagas e ofertas em ' + currentCityName() + ' ou no Brasil Todo.', false); return; }
    Promise.all([Categories.list(), Stores.search(q), Offers.search(q), Classifieds.search(q)]).then(function (r) {
      var cats = r[0], stores = r[1], offers = r[2], anuncios = r[3], html = ''; stores = sortByPlano(stores);
      if (anuncios.length) html += '<h2 class="font-display font-bold mb-3">📋 Anúncios (' + anuncios.length + ')</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">' + anuncios.map(function (a) { return listingCard(a, cats); }).join('') + '</div>';
      if (stores.length) html += '<h2 class="font-display font-bold mb-3">Empresas (' + stores.length + ')</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">' + stores.map(function (s) { return storeCard(s, cats); }).join('') + '</div>';
      if (offers.length) html += '<h2 class="font-display font-bold mb-3">Ofertas (' + offers.length + ')</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">' + offers.map(offerCard).join('') + '</div>';
      l.innerHTML = html || emptyState('Nada encontrado', 'Tente outro termo ou navegue pelas categorias.', false);
    });
  }

  function pageLoja() {
    var el = $('#perfil'); if (!el) return; el.innerHTML = loadingHTML();
    var key = params().get('id') || params().get('slug');
    Stores.get(key).then(function (s) {
      if (!s) { el.innerHTML = emptyState('Empresa não encontrada', 'Essa empresa não está disponível ou ainda não foi aprovada.', false); return; }
      Metrics.log('view', s.id); addRecent(s.id);
      Promise.all([Stores.photos(s.id), Offers.byStore(s.id), Categories.list(), aGet('reviews?select=*&store_id=eq.' + encodeURIComponent(s.id) + '&status=eq.ativo&order=criado_em.desc')]).then(function (r) {
        var photos = r[0], offers = r[1], cats = r[2];
        el.innerHTML = storeProfile(s, photos, offers, cats, r[3]);
        setStoreSEO(s);
        wireReview(s); wireHelpful('store'); wireAssinar(); wireReivindicarStore(s);
        Stores.list().then(function (all) { var rel = all.filter(function (x) { return x.categoria === s.categoria && x.id !== s.id; }).slice(0, 4); var rd = $('#relatedStores'); if (rd && rel.length) rd.innerHTML = '<h3 class="font-display font-bold mb-3 mt-6">Você também pode gostar</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4">' + rel.map(function (x) { return storeCard(x, CATS); }).join('') + '</div>'; });
      });
    });
  }
  function storeProfile(s, photos, offers, cats, reviews) {
    var wa = 'https://wa.me/' + (digits(s.whatsapp) || CONFIG.whatsapp) + '?text=' + encodeURIComponent('Olá ' + s.nome + '! Vi você no Aqui Tem Achadinhos.');
    var capa = s.capa_url ? '<div class="h-40 md:h-56 bg-cover bg-center" style="background-image:url(' + esc(s.capa_url) + ')"></div>' : '<div class="h-40 md:h-56 navy-hero"></div>';
    var logo = s.logo_url ? '<img src="' + esc(s.logo_url) + '" alt="' + esc(s.nome) + '" class="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow">' : '<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-white text-2xl font-extrabold ring-4 ring-white shadow">' + esc(initials(s.nome)) + '</div>';
    var gal = photos.length ? '<div class="mt-6"><h3 class="font-display font-bold mb-3">Fotos</h3><div class="grid grid-cols-3 md:grid-cols-5 gap-3">' + photos.map(function (p) { return '<img src="' + esc(p.url) + '" alt="" class="w-full h-24 md:h-28 object-cover rounded-xl ring-silver" loading="lazy">'; }).join('') + '</div></div>' : '';
    var ofs = offers.length ? '<div class="mt-6"><h3 class="font-display font-bold mb-3">🔥 Ofertas ativas</h3><div class="grid sm:grid-cols-2 gap-3">' + offers.map(function (o) { return '<div class="rounded-2xl bg-silver-50 ring-silver p-4"><p class="font-display font-bold">' + esc(o.titulo) + '</p>' + (o.preco_atual ? '<p class="text-peao-500 font-extrabold">' + esc(o.preco_atual) + '</p>' : '') + (o.termino ? '<p class="text-[11px] text-silver-500">até ' + esc(formatDate(o.termino)) + '</p>' : '') + '</div>'; }).join('') + '</div></div>' : '';
    var uf = CITY_UFS[s.city_slug] || (s.cidade === 'Barretos' ? 'SP' : (s.cidade === 'Gramado' ? 'RS' : (s.cidade === 'Uberlândia' ? 'MG' : (s.cidade === 'Florianópolis' ? 'SC' : (s.cidade === 'Salvador' ? 'BA' : 'SP')))));
    var cityLabel = (s.cidade || currentCityName()) + (uf && uf !== 'BR' ? '/' + uf : '') + ' · Brasil';
    var end = '<p>📍 <b>Local:</b> ' + esc([s.endereco, s.bairro, cityLabel].filter(Boolean).join(' — ')) + '</p>';
    var det = '';
    if (s.faixa_preco) det += '<span class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full font-semibold">💰 ' + esc(s.faixa_preco) + '</span>';
    if (s.pagamento) det += '<span class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full">💳 ' + esc(s.pagamento) + '</span>';
    if (s.entrega) det += '<span class="text-xs bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">🛵 Entrega</span>';
    if (s.retirada) det += '<span class="text-xs bg-emerald-500/10 text-emerald-700 px-2.5 py-1 rounded-full font-semibold">📦 Retirada</span>';
    if (s.estacionamento) det += '<span class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full">🅿 Estacionamento</span>';
    if (s.acessibilidade) det += '<span class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full">♿ ' + esc(s.acessibilidade) + '</span>';
    if (s.turista) det += '<span class="text-xs bg-amber-500/10 text-amber-700 px-2.5 py-1 rounded-full font-semibold">🧳 Atende turistas</span>';
    if (s.instagram) { var ig = String(s.instagram); ig = ig.indexOf('http') === 0 ? ig : 'https://instagram.com/' + ig.replace('@', ''); det += '<a href="' + esc(ig) + '" target="_blank" rel="noopener noreferrer" class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full">📸 Instagram</a>'; }
    if (s.site) { var st = String(s.site); st = st.indexOf('http') === 0 ? st : 'https://' + st; det += '<a href="' + esc(st) + '" target="_blank" rel="noopener noreferrer" class="text-xs bg-silver-50 ring-silver px-2.5 py-1 rounded-full">🌐 Site</a>'; }

    var mapQ = encodeURIComponent([s.endereco, s.bairro, (s.cidade || currentCityName())].filter(Boolean).join(', '));
    var map = mapQ ? '<div class="mt-3 rounded-2xl overflow-hidden ring-silver"><iframe title="Mapa" class="w-full h-48" style="border:0" loading="lazy" src="https://www.google.com/maps?q=' + mapQ + '&output=embed"></iframe></div><a href="https://www.google.com/maps/dir/?api=1&destination=' + mapQ + '" target="_blank" rel="noopener noreferrer" onclick="window.ATA&&window.ATA.Metrics.log(\'click_mapa\',\'' + esc(s.id) + '\')" class="btn-shine inline-block mt-2 bg-navy-800 hover:bg-navy-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm">📍 Como chegar</a>' : '';

    var reivindicarBanner = '<div class="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-950 rounded-3xl p-6 ring-2 ring-amber-400/50 shadow-glow mt-6 border border-white/10 text-white">' +
      '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
        '<div>' +
          '<span class="inline-block text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full mb-2">✦ Espaço do Dono da Empresa</span>' +
          '<h3 class="font-display font-extrabold text-xl text-white">É proprietário ou responsável por esta empresa?</h3>' +
          '<p class="text-xs text-silver-300 mt-1 max-w-xl">Reivindique seu perfil gratuitamente para atualizar horários, WhatsApp, fotos, redes sociais ou destacar seu negócio para milhares de turistas e moradores.</p>' +
        '</div>' +
        '<button id="btnReivindicarStore" class="btn-shine shrink-0 bg-amber-400 hover:bg-amber-300 text-navy-950 font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition transform hover:scale-105">' +
          '✏️ Atualizar / Reivindicar Perfil →' +
        '</button>' +
      '</div>' +
    '</div>';

    var backCatUrl = s.categoria ? ('categoria.html?cat=' + encodeURIComponent(s.categoria)) : 'index.html';
    return '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-6"><button onclick="window.smartBack(\'' + backCatUrl + '\')" class="inline-flex items-center gap-1.5 text-silver-300 hover:text-white text-sm font-semibold mb-3 cursor-pointer bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-xl transition">← Voltar</button><div class="mt-1 bg-white rounded-3xl shadow-soft ring-silver overflow-hidden">' + capa + '<div class="p-6 -mt-12 relative">' + logo + '<div class="mt-3 flex items-center gap-2 flex-wrap"><span class="text-xs font-semibold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">' + esc(catName(s.categoria, cats)) + '</span>' + (s.verificada ? '<span class="text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">✓ Empresa verificada</span>' : '') + (s.city_lead_id ? '<span class="text-xs font-semibold text-amber-600 bg-amber-400/10 px-2 py-0.5 rounded">✦ Empresa Fundadora</span>' : (s.destaque ? '<span class="text-xs font-semibold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">Destaque</span>' : '')) + '</div><h1 class="font-display text-2xl md:text-3xl font-extrabold mt-2">' + esc(s.nome) + '</h1>' + (s.descricao_curta ? '<p class="text-slate-600 mt-1">' + esc(s.descricao_curta) + '</p>' : '') + (s.descricao ? '<p class="text-slate-700 mt-3 leading-relaxed">' + esc(s.descricao) + '</p>' : '') + '<div class="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">' + (s.horario ? '<p>🕒 ' + esc(s.horario) + '</p>' : '') + (s.telefone ? '<p>☎️ ' + esc(s.telefone) + '</p>' : '') + end + '</div>' + (det ? '<div class="mt-4 flex flex-wrap gap-2">' + det + '</div>' : '') + map + '<div class="mt-5 flex flex-wrap gap-3"><a href="' + wa + '" target="_blank" rel="noopener noreferrer" onclick="window.ATA&&window.ATA.Metrics.log(\'click_whatsapp\',\'' + esc(s.id) + '\')" class="btn-shine bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl">💬 Falar no WhatsApp</a><button onclick="navigator.share?navigator.share({title:\'' + esc(s.nome) + '\',url:location.href}):copy(location.href)" class="btn-shine glass-light text-navy-800 font-bold px-5 py-3 rounded-xl">🔗 Compartilhar</button></div></div></div>' + ofs + gal + ratingBlock(s, reviews) + reivindicarBanner + ((s.plano === 'pro' || s.destaque || s.city_lead_id) ? '<div class="aquitem-pro-status mt-4">✦ Este perfil possui visibilidade destacada no guia.</div>' : upsellCard('store', s.id, s.nome)) + '<a href="' + waLink('Den\u00fancia sobre: ' + s.nome) + '" target="_blank" rel="noopener noreferrer" class="block mt-4 text-center text-xs text-slate-400 hover:text-peao-600">🚩 Denunciar conteúdo incorreto</a></div>';
  }

  function wireReivindicarStore(s) {
    var btn = $('#btnReivindicarStore');
    if (!btn) return;

    btn.addEventListener('click', function () {
      if ($('#modalReivindicar')) $('#modalReivindicar').remove();

      var m = document.createElement('div');
      m.id = 'modalReivindicar';
      m.className = 'fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto';
      m.innerHTML = '<div class="bg-navy-950 border border-silver-300/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-2xl relative my-8">' +
        '<button id="closeReivindicar" class="absolute top-5 right-5 text-silver-400 hover:text-white text-xl">✕</button>' +
        '<span class="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full">Atualização de Perfil Comercial</span>' +
        '<h2 class="font-display text-2xl font-extrabold mt-2 text-white">Reivindicar & Atualizar: ' + esc(s.nome) + '</h2>' +
        '<p class="text-xs text-silver-300 mt-1">Preencha os dados oficiais da sua empresa. Os dados são enviados para nossa equipe e entram no ar imediatamente.</p>' +
        '<form id="formReivindicar" class="mt-5 space-y-4">' +
          '<div class="grid sm:grid-cols-2 gap-3">' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">WhatsApp para receber clientes *</label>' +
              '<input name="whatsapp" value="' + esc(s.whatsapp || '') + '" placeholder="(17) 9XXXX-XXXX" required class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">Telefone fixo</label>' +
              '<input name="telefone" value="' + esc(s.telefone || '') + '" placeholder="(17) 332X-XXXX" class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">Instagram (@da_sua_loja)</label>' +
              '<input name="instagram" value="' + esc(s.instagram || '') + '" placeholder="@sualoja" class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">Horário de funcionamento</label>' +
              '<input name="horario" value="' + esc(s.horario || '') + '" placeholder="Ex.: Seg a Sex 08h às 18h | Sáb 08h às 13h" class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">Bairro</label>' +
              '<input name="bairro" value="' + esc(s.bairro || '') + '" class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
            '<div>' +
              '<label class="block text-xs font-semibold text-silver-300 mb-1">Endereço (Rua, Av., nº)</label>' +
              '<input name="endereco" value="' + esc(s.endereco || '') + '" class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-xs font-semibold text-silver-300 mb-1">Descrição e diferenciais da empresa</label>' +
            '<textarea name="descricao_curta" rows="2" placeholder="Conte o que sua empresa oferece, especialidades, etc." class="w-full px-3.5 py-2.5 rounded-xl bg-silver-50 text-navy-900 text-sm ring-silver outline-none">' + esc(s.descricao_curta || '') + '</textarea>' +
          '</div>' +
          '<div class="pt-2 border-t border-white/10">' +
            '<label class="block text-xs font-bold text-amber-400 uppercase tracking-wide mb-2">Escolha seu Plano de Visibilidade</label>' +
            '<div class="grid sm:grid-cols-3 gap-2.5">' +
              '<label class="border border-white/10 bg-white/5 rounded-2xl p-3.5 cursor-pointer flex flex-col justify-between hover:bg-white/10 transition">' +
                '<div>' +
                  '<div class="flex items-center justify-between">' +
                    '<span class="text-xs font-bold text-white">Plano Grátis</span>' +
                    '<input type="radio" name="plano_escolhido" value="gratis" checked class="accent-peao-500">' +
                  '</div>' +
                  '<p class="text-[11px] text-silver-400 mt-1">Dados atualizados e WhatsApp no guia.</p>' +
                '</div>' +
                '<span class="text-xs font-extrabold text-white mt-2">R$ 0</span>' +
              '</label>' +
              '<label class="border-2 border-amber-400 bg-amber-400/10 rounded-2xl p-3.5 cursor-pointer flex flex-col justify-between hover:bg-amber-400/20 transition">' +
                '<div>' +
                  '<div class="flex items-center justify-between">' +
                    '<span class="text-xs font-bold text-amber-300">⭐ Destaque</span>' +
                    '<input type="radio" name="plano_escolhido" value="destaque" class="accent-peao-500">' +
                  '</div>' +
                  '<p class="text-[11px] text-silver-300 mt-1">Topo da categoria, selo ⭐, 10 fotos e 5 ofertas.</p>' +
                '</div>' +
                '<span class="text-xs font-extrabold text-amber-400 mt-2">R$ 79 / mês</span>' +
              '</label>' +
              '<label class="border border-white/10 bg-white/5 rounded-2xl p-3.5 cursor-pointer flex flex-col justify-between hover:bg-white/10 transition">' +
                '<div>' +
                  '<div class="flex items-center justify-between">' +
                    '<span class="text-xs font-bold text-white">👑 Plano Pro</span>' +
                    '<input type="radio" name="plano_escolhido" value="pro" class="accent-peao-500">' +
                  '</div>' +
                  '<p class="text-[11px] text-silver-400 mt-1">Topo absoluto, 20 fotos, ofertas ilimitadas e mapa.</p>' +
                '</div>' +
                '<span class="text-xs font-extrabold text-white mt-2">R$ 149 / mês</span>' +
              '</label>' +
            '</div>' +
          '</div>' +
          '<div class="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">' +
            '<button type="submit" class="btn-shine w-full sm:w-auto bg-peao-500 hover:bg-peao-600 text-white font-bold px-8 py-3.5 rounded-xl shadow-redglow transition">' +
              'Salvar Atualização →' +
            '</button>' +
            '<span id="reivindicarMsg" class="text-xs"></span>' +
          '</div>' +
        '</form>' +
      '</div>';

      document.body.appendChild(m);

      $('#closeReivindicar').addEventListener('click', function () { m.remove(); });

      var form = $('#formReivindicar');
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var msg = $('#reivindicarMsg');
        var fd = new FormData(form);
        var subBtn = form.querySelector('button[type=submit]');
        subBtn.disabled = true; subBtn.textContent = 'Salvando…';

        var patchObj = {
          whatsapp: fd.get('whatsapp'),
          telefone: fd.get('telefone'),
          instagram: fd.get('instagram'),
          horario: fd.get('horario'),
          bairro: fd.get('bairro'),
          endereco: fd.get('endereco'),
          descricao_curta: fd.get('descricao_curta')
        };

        var plano = fd.get('plano_escolhido') || 'gratis';

        aPatch('stores', s.id, patchObj).then(function () {
          msg.className = 'text-xs text-emerald-400';
          msg.textContent = '✓ Dados salvos com sucesso!';

          if (plano === 'destaque') {
            setTimeout(function () { window.location.href = 'https://mpago.la/25UHZqr'; }, 1000);
          } else if (plano === 'pro') {
            setTimeout(function () { window.location.href = 'https://mpago.la/2HBxp5v'; }, 1000);
          } else {
            setTimeout(function () {
              m.remove();
              location.reload();
            }, 1200);
          }
        }).catch(function (err) {
          msg.className = 'text-xs text-peao-500';
          msg.textContent = 'Erro ao salvar. Tente novamente.';
          subBtn.disabled = false; subBtn.textContent = 'Salvar Atualização →';
        });
      });
    });
  }

  function pageTurista() {
    var el = $('#turistaStores'); if (!el) return;
    Promise.all([Categories.list(), Stores.list()]).then(function (r) {
      var cats = r[0], stores = r[1];
      var uteis = ['restaurantes', 'lanches', 'farmacias', 'mercados', 'eletronicos', 'hoteis'];
      var lista = stores.filter(function (s) { return uteis.indexOf(s.categoria) !== -1; }); lista = sortByPlano(lista);
      el.innerHTML = lista.length ? '<div class="grid grid-cols-2 md:grid-cols-4 gap-5">' + lista.map(function (s) { return storeCard(s, cats); }).join('') + '</div>' : emptyState('As lojas estão chegando', 'Em breve o turista encontra tudo de Barretos aqui. Lojista, seja um dos primeiros!', true);
    });
  }

  function pageFavoritos() {
    var el = $('#favList'); if (!el) return;
    var favs = getFavs();
    if (!favs.length) { el.innerHTML = emptyState('Nenhum favorito ainda', 'Toque no coração nas lojas para salvar aqui.', false); return; }
    el.innerHTML = loadingHTML();
    Promise.all([Categories.list(), Promise.all(favs.map(function (id) { return Stores.get(id); }))]).then(function (r) {
      var cats = r[0], stores = r[1].filter(Boolean);
      el.innerHTML = stores.length ? '<div class="grid grid-cols-2 md:grid-cols-4 gap-5">' + stores.map(function (s) { return storeCard(s, cats); }).join('') + '</div>' : emptyState('Favoritos indisponíveis', 'As lojas podem ter sido removidas.', false);
    });
  }

  var SUBCATEGORIES = {
    saude:['Dentista','Médico','Psicólogo','Fisioterapia','Nutricionista','Massoterapia','Clínica','Laboratório','Ótica','Suplementos e Vitaminas','Farmácia de manipulação','Terapia'],
    beleza:['Salão de beleza','Barbearia','Cabeleireiro(a)','Manicure','Estética','Maquiagem','Sobrancelhas','Depilação'],
    educacao:['Faculdade','Polo universitário','Graduação','Pós-graduação','Curso técnico','Curso profissionalizante','EAD','Idiomas','Preparatório','Reforço escolar','Escola infantil'],
    turismo:['Passeios','Guia turístico','Agência de turismo','Lazer','Cultura','Roteiro local'],
    transporte:['Transfer','Motorista particular','Táxi','Locadora','Ônibus','Frete','Entrega'],
    esportes:['Academia','Personal trainer','Pilates','Dança','Luta','Esporte'],
    'casa-construcao':['Construtora','Arquiteto','Engenheiro','Material de construção','Móveis planejados','Reforma'],
    imobiliarias:['Imobiliária','Corretor(a)','Locação','Temporada','Venda de imóveis'],
    eventos:['Buffet','Decoração','Fotografia','Som e iluminação','Locação para festas','Cerimonial'],
    financeiro:['Contabilidade','Advocacia','Seguros','Consultoria','Financiamento','Imobiliário'],
    agro:['Agropecuária','Máquinas agrícolas','Insumos','Veterinária rural','Agronomia'],
    restaurantes:['Restaurante','Pizzaria','Cafeteria','Comida japonesa','Marmitaria'],
    lanches:['Hamburgueria','Pastelaria','Lanchonete','Delivery','Sorveteria','Padaria'],
    servicos:['Limpeza','Manutenção','Informática','Segurança','Lavanderia','Chaveiro'],
    sorveterias:['Sorveteria','Açaíteria','Gelateria','Milk shake','Paleta mexicana'],
    suplementos:['Suplementos','Vitaminas','Whey protein','Creatina','Nutrição esportiva'],
    padarias:['Padaria','Confeitaria','Bolo','Doces','Salgados','Café'],
    bares:['Bar','Boteco','Drinks','Cerveja artesanal','Lounge'],
    grafica:['Gráfica','Papelaria','Impressão','Banner','Cartão de visita'],
    clinicas:['Clínica médica','Laboratório','Exames','Raio-X','Cardiologia','Dermatologia','Ortopedia'],
    moda:['Roupas femininas','Roupas masculinas','Roupas infantis','Calçados','Acessórios','Bolsas','Moda festa']
  ,
    'artesanato':        ['Crochê e Tricô', 'Macramê', 'Bordado', 'Cerâmica', 'Madeira', 'Biscuit', 'Costura', 'Bijuteria', 'Pintura', 'Decoupage'],
    'produtos-naturais': ['Sabonetes Artesanais', 'Velas', 'Óleos Essenciais', 'Produtos Orgânicos', 'Ervas e Chás', 'Cosméticos Naturais', 'Mel e Derivados'],
    'cosmeticos':        ['Maquiagem', 'Skincare', 'Perfumaria', 'Cabelos', 'Unhas', 'Corpo e Banho', 'Protetor Solar', 'Cosméticos Naturais'],
    'papelaria':         ['Papelaria Criativa', 'Cadernos', 'Canetas e Lápis', 'Presentes', 'Festas', 'Scrapbook', 'Quadros e Posters'],
    'delivery':          ['Marmitas', 'Lanches', 'Pizzas', 'Salgados', 'Doces', 'Almoço', 'Jantar', 'Bebidas'],
    'fotografo':         ['Casamento', 'Aniversário', 'Newborn', 'Ensaio Externo', 'Corporativo', 'Vídeo', 'Drone', 'Redes Sociais'],
    'tecnologia':        ['Assistência Técnica', 'Computadores', 'Celulares', 'Redes e Internet', 'Desenvolvimento de Sites', 'TI Empresarial'],
    'advocacia':         ['Direito Civil', 'Direito Trabalhista', 'Contabilidade', 'Abertura de Empresa', 'Imposto de Renda', 'Direito de Família'],
    'religioso':         ['Igreja', 'Artigos Religiosos', 'Biblia e Livros', 'Velas e Incenso', 'Presépios', 'Objetos Sacros'],
    'infantil':          ['Brinquedos', 'Roupas Infantis', 'Calçados Infantis', 'Escola e Material', 'Festa Infantil', 'Bebê e Enxoval'],
    'academia':          ['Academia', 'Personal Trainer', 'Pilates', 'Yoga', 'Crossfit', 'Dança', 'Artes Marciais', 'Natação'],
    'clinica-estetica':  ['Estética Facial', 'Estética Corporal', 'Depilação', 'Massagem', 'Drenagem', 'Micropigmentação', 'Lipo Enzimática'],
    'sorveteria':        ['Sorvete Artesanal', 'Açaí', 'Picolé', 'Milk Shake', 'Crepe', 'Waffle'],
    'tabacaria':         ['Cigarros', 'Narguilé', 'Cachimbo', 'Charutos', 'Conveniência', 'Bebidas'],
    'turismo-aventura':  ['Trilha', 'Rapel', 'Rafting', 'Arvorismo', 'Tirolesa', 'Mergulho', 'Kitesurf', 'Stand Up Paddle'],
    'vagas-empresa':     ['CLT', 'Temporário', 'Freelancer', 'Estágio', 'PJ', 'Trainee', 'Aprendiz', 'Home Office', 'Híbrido'],
    'vagas-candidato':   ['Procuro CLT', 'Procuro Temporário', 'Procuro Freelancer', 'Busco Estágio', 'Sou PJ', 'Trabalho Home Office', 'Disponível para Viagens'],
    'nacionais':         ['Imóveis', 'Veículos', 'Eletrônicos', 'Serviços', 'Animais', 'Móveis', 'Roupas', 'Outros'],
    'vagas-nac-empresa': ['CLT Nacional', 'Remoto', 'Home Office', 'PJ Nacional', 'Temporário Nacional', 'Trainee Nacional'],
    'vagas-nac-candidato':['Busco CLT em qualquer cidade', 'Aceito Remoto', 'Aceito Home Office', 'Busco PJ', 'Disponível para Relocação']
  };;
  function setupSubcategories(form) {
    var cat=form.querySelector('[name=categoria]'), list=form.querySelector('#subcatList'); if(!cat||!list)return;
    function refresh(){var arr=SUBCATEGORIES[cat.value]||[];list.innerHTML=arr.map(function(v){return '<option value="'+esc(v)+'">';}).join('');}
    cat.addEventListener('change',refresh); refresh();
  }

  function setupAddressLookup(inputId, buttonId, resultsId, apply) {
    var input = $(inputId), button = $(buttonId), results = $(resultsId); if (!input || !button || !results) return;
    function run() {
      var q = input.value.trim(); if (q.length < 4) { results.innerHTML = '<p class="text-xs text-amber-600">Digite rua, bairro ou ponto de referência.</p>'; return; }
      button.disabled = true; button.textContent = 'Buscando…'; results.innerHTML = '';
      fetch('https://photon.komoot.io/api/?limit=5&lang=pt&q=' + encodeURIComponent(q + ', Brasil'))
        .then(function(r){ if(!r.ok) throw new Error(); return r.json(); })
        .then(function(data){ var list=(data.features||[]).filter(function(x){return x.geometry&&x.properties;}); if(!list.length){results.innerHTML='<p class="text-xs text-silver-500">Não encontramos esse endereço. Preencha manualmente abaixo.</p>';return;} results.innerHTML=list.map(function(x,i){var p=x.properties||{}, label=[p.name||p.street,p.housenumber,p.district||p.locality||p.city,p.state,p.postcode].filter(Boolean).join(' · ');return '<button type="button" class="aquitem-address-result" data-address-index="'+i+'">📍 '+esc(label||'Usar este local')+'</button>';}).join(''); results.querySelectorAll('[data-address-index]').forEach(function(b){b.addEventListener('click',function(){var x=list[Number(b.getAttribute('data-address-index'))],p=x.properties||{},addr=[p.street||p.name,p.housenumber].filter(Boolean).join(', ');apply({endereco:addr,bairro:p.district||p.locality||'',cidade:p.city||p.municipality||'',cep:p.postcode||'',lat:x.geometry.coordinates[1],lng:x.geometry.coordinates[0]});results.innerHTML='<p class="text-xs text-emerald-600">✓ Endereço preenchido. Revise o número antes de salvar.</p>';});}); })
        .catch(function(){results.innerHTML='<p class="text-xs text-peao-600">Não foi possível buscar agora. Você pode preencher manualmente.</p>';})
        .finally(function(){button.disabled=false;button.textContent='Buscar endereço';});
    }
    button.addEventListener('click',run); input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();run();}});
  }

  /* CADASTRO */
  function pageCadastro() {
    var form = $('#formCadastro'); if (!form) return;
    Categories.list().then(function (cats) {
      var sel = form.querySelector('[name=categoria]'); if (sel) sel.innerHTML = '<option value="">Selecione…</option>' + cats.map(function (c) { return '<option value="' + c.id + '">' + c.emoji + ' ' + esc(c.nome) + '</option>'; }).join('') + '<option value="outro">🏪 Outro</option>';
    });
    setupSubcategories(form);
    setupAddressLookup('#addressSearch','#btnAddressSearch','#addressSearchResults',function(v){
      var fields={endereco:v.endereco,bairro:v.bairro,cidade:v.cidade,cep:v.cep}; Object.keys(fields).forEach(function(k){var el=form.querySelector('[name='+k+']');if(el&&fields[k])el.value=fields[k];}); form.dataset.lat=v.lat; form.dataset.lng=v.lng;
    });
    // steps
    var s1 = $('#step1'), s2 = $('#step2');
    var btnCont = $('#btnContinuar'); if (btnCont) btnCont.addEventListener('click', function () { if (validateStep1(form)) { s1.classList.add('hidden'); s2.classList.remove('hidden'); window.scrollTo(0, 0); } });
    var btnVoltar = $('#btnVoltar'); if (btnVoltar) btnVoltar.addEventListener('click', function () { s2.classList.add('hidden'); s1.classList.remove('hidden'); window.scrollTo(0, 0); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep1(form)) { s1.classList.remove('hidden'); s2.classList.add('hidden'); window.scrollTo(0, 0); return; }
      if (!form.querySelector('[name=aceite_termos]').checked || !form.querySelector('[name=autorizacao_cadastrar]').checked) { showMsg('#msg', '⚠️ É necessário aceitar os termos e confirmar que está autorizado a cadastrar a empresa.', false); window.scrollTo(0, 0); return; }
      var btn = form.querySelector('[type=submit]'); var orig = btn.textContent; btn.disabled = true; btn.textContent = 'Enviando…';
      Metrics.log('cadastro_iniciado');
      var fd = {}; new FormData(form).forEach(function (v, k) { var f = form.querySelector('[name=' + k + ']'); fd[k] = (f && f.type === 'checkbox') ? (f.checked ? true : false) : v; });
      // uploads
      var tasks = [];
      var logoFile = form.querySelector('[name=logo]').files[0];
      var capaFile = form.querySelector('[name=capa]').files[0];
      var galFiles = Array.prototype.slice.call(form.querySelector('[name=galeria]').files).slice(0, 3);
      function validImg(f) { return f && f.type.indexOf('image/') === 0 && f.size <= 3 * 1024 * 1024; }
      if (logoFile && !validImg(logoFile)) { showMsg('#msg', '❌ Logo: use imagem de até 3MB.', false); btn.disabled = false; btn.textContent = orig; return; }
      if (capaFile && !validImg(capaFile)) { showMsg('#msg', '❌ Capa: use imagem de até 3MB.', false); btn.disabled = false; btn.textContent = orig; return; }
      for (var i = 0; i < galFiles.length; i++) { if (!validImg(galFiles[i])) { showMsg('#msg', '❌ Uma das fotos da galeria excede 3MB ou não é imagem.', false); btn.disabled = false; btn.textContent = orig; return; } }
      if (logoFile) tasks.push(uploadPhoto(logoFile).then(function (u) { fd.logo_url = u; }));
      if (capaFile) tasks.push(uploadPhoto(capaFile).then(function (u) { fd.capa_url = u; }));
      var galUrls = []; galFiles.forEach(function (f) { tasks.push(uploadPhoto(f).then(function (u) { galUrls.push(u); })); });
      Promise.all(tasks).then(function () {
        delete fd.logo; delete fd.capa; delete fd.galeria;
        fd.city_slug = currentCitySlug(); fd.cidade = currentCityName(); if(form.dataset.lat){fd.lat=Number(form.dataset.lat);fd.lng=Number(form.dataset.lng);}
      var dias = []; [0,1,2,3,4,5,6].forEach(function (dd) { var cb = form.querySelector('[name=dia_' + dd + ']'); if (cb && cb.checked) dias.push(dd); }); fd.horario_dias = dias.length ? dias.join(',') : '';
      delete fd.autorizacao_cadastrar;
      [0,1,2,3,4,5,6].forEach(function (dd) { delete fd['dia_' + dd]; });
      if (LojistaAuth.uid()) { fd.owner_id = LojistaAuth.uid(); }
        return Stores.create(fd).then(function (created) {
          if (!created) throw new Error('insert');
          var pTasks = galUrls.map(function (u) { return apiPost('store_photos', { store_id: created.id, url: u }); });
          return Promise.all(pTasks).then(function () { return created; });
        });
      }).then(function (created) {
        Metrics.log('cadastro_concluido', created.id);
        form.classList.add('hidden');
        $('#cadOk').classList.remove('hidden');
        try { window.open(waLink('Cadastro enviado: ' + fd.nome + ' (' + fd.categoria + '). Já aprovou?'), '_blank'); } catch (e) {}
        window.scrollTo(0, 0);
      }).catch(function (err) {
        showMsg('#msg', '❌ Não foi possível enviar. Verifique sua internet e tente novamente. (' + (err && err.message ? err.message : 'erro') + ')', false);
        btn.disabled = false; btn.textContent = orig;
      });
    });
  }
  function validateStep1(f) {
    if (!f.querySelector('[name=nome]').value.trim()) { showMsg('#msg1', '⚠️ Informe o nome da empresa.', false); return false; }
    if (!f.querySelector('[name=categoria]').value) { showMsg('#msg1', '⚠️ Selecione a categoria.', false); return false; }
    if (!f.querySelector('[name=whatsapp]').value.trim()) { showMsg('#msg1', '⚠️ Informe um WhatsApp.', false); return false; }
    showMsg('#msg1', '', true); return true;
  }

  /* AUTH + ADMIN */
  var AUTH = {
    tok: function () { return localStorage.getItem('ata_admin_token'); },
    logout: function () { localStorage.removeItem('ata_admin_token'); location.href = 'login.html'; },
    login: function (email, password) {
      return fetch(CONFIG.supabase.url + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: CONFIG.supabase.anonKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, password: password }) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error_description || j.msg || j.message || 'Erro ao entrar'); return j; }); });
    }
  };
  /* aH v4 — garante Bearer JWT válido */
  function aH() {
    var t = AUTH.tok() || LojistaAuth.tok();
    return {
      apikey: CONFIG.supabase.anonKey,
      Authorization: 'Bearer ' + (t || CONFIG.supabase.anonKey)
    };
  }
  function aGet(path) { return fetch(B(path), { headers: aH() }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }
  /* aPatch v4 — retry + log de erro para admin */
  function aPatch(table, id, obj) {
    var t = AUTH.tok() || LojistaAuth.tok();
    var headers = {
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      'apikey': CONFIG.supabase.anonKey,
      'Authorization': 'Bearer ' + (t || CONFIG.supabase.anonKey)
    };
    function doFetch(attempt) {
      return fetch(B(table + '?id=eq.' + encodeURIComponent(id)), {
        method: 'PATCH', headers: headers, body: JSON.stringify(obj)
      }).then(function(r) {
        if (!r.ok) {
          return r.json().catch(function(){ return {}; }).then(function(err) {
            console.error('[aPatch] erro HTTP', r.status, table, id, err.message || JSON.stringify(err).slice(0,100));
            if (r.status >= 500 && attempt < 3) {
              return new Promise(function(res){ setTimeout(res, 1000 * attempt); }).then(function(){ return doFetch(attempt + 1); });
            }
            return false;
          });
        }
        return true;
      }).catch(function(e) {
        console.error('[aPatch] rede:', e.message || e);
        if (attempt < 3) return new Promise(function(res){ setTimeout(res, 1000 * attempt); }).then(function(){ return doFetch(attempt + 1); });
        return false;
      });
    }
    return doFetch(1);
  }
  function aPost(table, obj) { return fetch(B(table), { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json', Prefer: 'return=representation' }, aH()), body: JSON.stringify(obj) }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }
  /* aAdminRpc — usa SECURITY DEFINER RPCs para bypasear RLS de SELECT */
  function aAdminRpc(fnName, params) {
    return fetch(CONFIG.supabase.url + '/rest/v1/rpc/' + fnName, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, aH()),
      body: JSON.stringify(params)
    }).then(function(r) {
      if (!r.ok) return r.json().catch(function(){ return null; }).then(function(err){
        console.error('[aAdminRpc]', fnName, r.status, err);
        return null;
      });
      return r.json().catch(function(){ return true; });
    }).catch(function(e){ console.error('[aAdminRpc] rede:', fnName, e.message||e); return null; });
  }

  function convertLead(payload) {
    return fetch(CONFIG.supabase.url + '/rest/v1/rpc/convert_city_lead', { method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, aH()), body: JSON.stringify(payload) })
      .then(function (r) { return r.text().then(function (txt) { if (!r.ok) { var msg = txt; try { msg = JSON.parse(txt).message || txt; } catch (e) {} throw new Error(msg || 'Não foi possível publicar.'); } return txt; }); });
  }
  function countBy(arr, key, val) { return arr.filter(function (x) { return x[key] === val; }).length; }
  function exportCSV(rows) {
    if (!rows || !rows.length) return;
    var cols = ['nome','categoria','responsavel','whatsapp','telefone','bairro','endereco','status','plano','destaque','instagram','site','criado_em'];
    function q(v) { v = v == null ? '' : String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g,'""') + '"' : v; }
    var csv = cols.join(',') + '\n' + rows.map(function (r) { return cols.map(function (c2) { return q(r[c2]); }).join(','); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'empresas-barretos.csv'; a.click();
  }


  function pageLogin() {
    var form = $('#formLogin'); if (!form) return;
    if (AUTH.tok()) { location.href = 'admin.html'; return; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('[name=email]').value.trim(), pass = form.querySelector('[name=password]').value;
      if (!email || !pass) { showMsg('#msg', 'Preencha e-mail e senha.', false); return; }
      var btn = form.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = 'Entrando…';
      AUTH.login(email, pass).then(function (j) { localStorage.setItem('ata_admin_token', j.access_token); location.href = 'admin.html'; })
        .catch(function (err) { showMsg('#msg', '❌ ' + (err.message || 'Não foi possível entrar.'), false); btn.disabled = false; btn.textContent = 'Entrar'; });
    });
  }

  function pageAdmin() {
    var root = $('#adminRoot'); if (!root) return;
    if (!AUTH.tok() && !LojistaAuth.tok()) { location.href = 'login.html'; return; }
    var _isLojista = !AUTH.tok() && !!LojistaAuth.tok();
    var _cachedS = _swrCache && _swrCache['aGet:stores?select=*&order=criado_em.desc'];
    root.innerHTML = _cachedS
      ? '<p class="text-center text-xs text-amber-600 py-1">⚡ Atualizando…</p>'
      : '<div style="padding:1rem"><div style="height:4rem;background:#f1f5f9;border-radius:1rem;margin-bottom:.75rem;animation:ata-pulse 1.8s ease infinite"></div><div style="height:4rem;background:#f1f5f9;border-radius:1rem;margin-bottom:.75rem;animation:ata-pulse 1.8s ease infinite"></div><div style="height:4rem;background:#f1f5f9;border-radius:1rem;animation:ata-pulse 1.8s ease infinite"></div></div>';
    Promise.all([aGet('stores?select=*&order=criado_em.desc'), aGet('offers?select=id,status'), aGet('metrics_events?select=tipo'), aGet('reviews?select=*&order=criado_em.desc'), aGet('drivers?select=*&order=criado_em.desc'), aGet('listings?select=*&order=criado_em.desc'), aGet('city_leads?select=*&order=criado_em.desc'), aGet('automation_queue?select=id,status')]).then(function (r) {
      renderAdmin(root, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
    });
  }
  function statCard(icon, n, label) { return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-5 text-center"><div class="text-2xl">' + icon + '</div><div class="font-display text-2xl font-extrabold mt-1">' + n + '</div><div class="text-xs text-silver-500">' + label + '</div></div>'; }
  function storeProfileScore(s) {
    var fields = ['logo_url','capa_url','descricao_curta','whatsapp','horario','instagram'];
    var done = fields.filter(function(k){ return String(s[k] || '').trim() !== ''; }).length;
    return Math.round(done / fields.length * 100);
  }
  function adminRow(s, isPend) {
    var logo = s.logo_url ? '<img src="' + esc(s.logo_url) + '" alt="" class="w-12 h-12 rounded-xl object-cover">' : '<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-white font-extrabold">' + esc(initials(s.nome)) + '</div>';
    var sc = s.status === 'ativo' ? 'text-emerald-600' : (s.status === 'pendente' ? 'text-amber-600' : 'text-peao-600');
    var quality = storeProfileScore(s); var qualityBadge = '<span class="text-[10px] font-bold ' + (quality >= 80 ? 'text-emerald-600' : 'text-amber-600') + '">Perfil ' + quality + '%</span>';
    var planoSel = '<select data-plano-id="' + esc(s.id) + '" class="text-xs bg-silver-50 ring-silver rounded-lg px-2 py-1"><option value="gratis"' + (s.plano === 'gratis' ? ' selected' : '') + '>Grátis</option><option value="destaque"' + (s.plano === 'destaque' ? ' selected' : '') + '>Destaque</option><option value="pro"' + (s.plano === 'pro' ? ' selected' : '') + '>Pro</option></select>';
    var actions = isPend
      ? '<button data-act="aprovar" data-id="' + esc(s.id) + '" class="text-sm font-bold text-white bg-emerald-600 px-3 py-1.5 rounded-lg">✓ Aprovar</button><button data-act="rejeitar" data-id="' + esc(s.id) + '" class="text-sm font-bold text-peao-600 bg-peao-500/10 px-3 py-1.5 rounded-lg">Rejeitar</button>'
      : '<a href="painel.html?id=' + encodeURIComponent(s.id) + '" class="text-xs font-semibold text-slate-500 hover:underline">Editar</a><button data-act="' + (s.destaque ? 'destaque-off' : 'destaque-on') + '" data-id="' + esc(s.id) + '" class="text-xs font-semibold text-slate-600 hover:underline">' + (s.destaque ? 'Tirar destaque' : 'Destacar') + '</button>' + planoSel + (s.status !== 'ativo' ? '<button data-act="aprovar" data-id="' + esc(s.id) + '" class="text-xs font-semibold text-emerald-600 hover:underline">Ativar</button>' : '') + '<button data-store-delete="' + esc(s.id) + '" data-store-name="' + esc(s.nome) + '" class="text-xs font-semibold text-peao-600 hover:underline">Excluir</button>';
    return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-4 flex items-center gap-3"><div class="shrink-0">' + logo + '</div><div class="flex-1 min-w-0"><a href="loja.html?id=' + encodeURIComponent(s.id) + '" class="font-display font-bold truncate block hover:underline">' + esc(s.nome) + '</a><p class="text-xs text-silver-500">' + esc(s.categoria || '') + ' · ' + esc(s.cidade || CITY_NAMES[s.city_slug] || currentCityName()) + (s.bairro ? ' · ' + esc(s.bairro) : '') + ' · <span class="' + sc + ' font-semibold">' + esc(s.status) + '</span>' + (s.destaque ? ' · ⭐' : '') + ' · ' + qualityBadge + '</p></div><div class="flex items-center gap-2 shrink-0 flex-wrap justify-end">' + actions + '</div></div>';
  }
  function driverAdminRow(d) {
    var foto = d.foto_url ? '<img src="' + esc(d.foto_url) + '" alt="" class="w-12 h-12 rounded-xl object-cover">' : '<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-white">🚗</div>';
    var sc = d.status === 'ativo' ? 'text-emerald-600' : (d.status === 'pendente' ? 'text-amber-600' : 'text-peao-600');
    var planoSel = '<select data-dplano-id="' + esc(d.id) + '" class="text-xs bg-silver-50 ring-silver rounded-lg px-2 py-1"><option value="gratis"' + (d.plano === 'gratis' ? ' selected' : '') + '>Grátis</option><option value="destaque"' + (d.plano === 'destaque' ? ' selected' : '') + '>Destaque</option><option value="pro"' + (d.plano === 'pro' ? ' selected' : '') + '>Pro</option></select>';
    return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-4 flex items-center gap-3"><div class="shrink-0">' + foto + '</div><div class="flex-1 min-w-0"><a href="motorista.html?id=' + encodeURIComponent(d.id) + '" class="font-display font-bold truncate block hover:underline">' + esc(d.nome) + '</a><p class="text-xs text-silver-500">' + esc(d.tipo_veiculo || '') + (d.disponibilidade ? ' · ' + esc(d.disponibilidade) : '') + ' · <span class="' + sc + ' font-semibold">' + esc(d.status) + '</span>' + (d.disponivel_agora ? ' · 🟢' : '') + '</p></div><div class="flex items-center gap-2 shrink-0 flex-wrap justify-end">' + (d.status !== 'ativo' ? '<button data-dap="' + esc(d.id) + '" class="text-xs font-bold text-white bg-emerald-600 px-3 py-1.5 rounded-lg">Aprovar</button>' : '') + '<button data-ddis="' + esc(d.id) + '" data-st="' + (d.disponivel_agora ? 0 : 1) + '" class="text-xs font-semibold text-navy-700 hover:underline">' + (d.disponivel_agora ? 'Offline' : 'Disponível') + '</button>' + planoSel + '<button data-ddest="' + esc(d.id) + '" data-st="' + (d.destaque ? 0 : 1) + '" class="text-xs font-semibold text-slate-600 hover:underline">' + (d.destaque ? 'Tirar destaque' : 'Destacar') + '</button></div></div>';
  }
  function leadAdminRow(lead) {
    var city = CITY_NAMES[lead.city_slug] || String(lead.city_slug || '—').replace(/(^|_)([a-z])/g, function(_, a, b){ return (a ? ' ' : '') + b.toUpperCase(); });
    var status = lead.status || 'novo';
    var opts = ['novo','contatado','qualificado','cadastro_enviado','ativo','perdido'].map(function(x){ return '<option value="' + x + '"' + (x === status ? ' selected' : '') + '>' + x.replace('_',' ') + '</option>'; }).join('');
    var wa = String(lead.whatsapp || '').replace(/\D/g, '');
    var founder = lead.founder_interest ? '<span class="text-[10px] font-bold text-amber-700 bg-amber-400/10 px-2 py-0.5 rounded-full">✦ Fundadora</span>' : '';
    var score = Number(lead.priority_score || 0) >= 50 ? '<span class="text-[10px] font-bold text-emerald-700">Prioridade alta</span>' : '';
    return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"><div class="w-11 h-11 rounded-xl bg-navy-800 text-white grid place-items-center font-bold">' + esc(city.slice(0,2).toUpperCase()) + '</div><div class="flex-1 min-w-0"><p class="font-display font-bold truncate">' + esc(lead.empresa_nome) + '</p><p class="text-xs text-silver-500">📍 ' + esc(city) + (lead.categoria ? ' · ' + esc(lead.categoria) : '') + (lead.origem ? ' · ' + esc(lead.origem) : '') + (founder ? ' · ' + founder : '') + (score ? ' · ' + score : '') + '</p><p class="text-xs text-slate-500 truncate">' + esc(lead.responsavel || '') + (lead.email ? ' · ' + esc(lead.email) : '') + '</p></div><div class="flex w-full sm:w-auto items-center gap-2 shrink-0 flex-wrap justify-end">' + (status === 'ativo' ? '<span class="text-xs font-bold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-lg">✓ Publicada</span>' : '<button data-lead-convert="' + esc(lead.id) + '" class="text-xs font-bold text-white bg-navy-800 px-3 py-1.5 rounded-lg">Publicar empresa</button>') + '<a href="https://wa.me/' + esc(wa) + '?text=' + encodeURIComponent('Olá! Recebemos o interesse da sua empresa na AQUITEM. Posso ajudar com o cadastro?') + '" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-white bg-[#25D366] px-3 py-1.5 rounded-lg">WhatsApp</a><button data-lead-delete="' + esc(lead.id) + '" data-lead-name="' + esc(lead.empresa_nome) + '" class="text-xs font-semibold text-peao-600 hover:underline">Excluir</button><select data-lead-status="' + esc(lead.id) + '" class="text-xs bg-silver-50 ring-silver rounded-lg px-2 py-1">' + opts + '</select></div></div>';
  }
  function growthSnapshot(leads) {
    leads = leads || [];
    var founders = leads.filter(function(x){ return x.founder_interest; }).length;
    function grouped(key) { var out={}; leads.forEach(function(x){ var v=x[key] || 'site'; out[v]=(out[v]||0)+1; }); return Object.keys(out).sort(function(a,b){return out[b]-out[a];}).slice(0,5); }
    var sources = grouped('origem'), cities = grouped('city_slug');
    function pills(keys, obj) { return keys.length ? keys.map(function(k){ return '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-600 text-xs font-bold">' + esc(k.replace(/_/g,' ')) + ' <b>' + obj[k] + '</b></span>'; }).join(' ') : '<span class="text-xs text-silver-500">Aguardando dados.</span>'; }
    var bySource={}; leads.forEach(function(x){var k=x.origem||'site';bySource[k]=(bySource[k]||0)+1;});
    var byCity={}; leads.forEach(function(x){var k=x.city_slug||'—';byCity[k]=(byCity[k]||0)+1;});
    return '<section class="bg-white rounded-2xl ring-silver shadow-soft p-5 mb-8"><div class="flex items-center justify-between gap-3 flex-wrap"><div><p class="text-[11px] font-bold tracking-wide text-amber-600 uppercase">Growth snapshot</p><h2 class="font-display text-xl font-extrabold mt-1">Tração inicial</h2></div><span class="text-xs font-bold bg-amber-400/10 text-amber-600 px-3 py-1.5 rounded-full">✦ ' + founders + ' Fundadoras</span></div><div class="grid sm:grid-cols-2 gap-5 mt-5"><div><p class="text-xs text-silver-500 mb-2">Leads por canal</p><div class="flex flex-wrap gap-2">' + pills(sources,bySource) + '</div></div><div><p class="text-xs text-silver-500 mb-2">Leads por cidade</p><div class="flex flex-wrap gap-2">' + pills(cities,byCity) + '</div></div></div></section>';
  }
  function leadCategoryGuess(v) {
    var x = String(v || '').toLowerCase();
    if (x.indexOf('hosped') !== -1) return 'hoteis';
    if (x.indexOf('restaur') !== -1 || x.indexOf('aliment') !== -1) return 'restaurantes';
    if (x.indexOf('comércio') !== -1 || x.indexOf('comercio') !== -1) return 'moda';
    return 'servicos';
  }
  function leadConvertForm(lead) {
    var city = CITY_NAMES[lead.city_slug] || lead.city_slug;
    var cat = leadCategoryGuess(lead.categoria);
    var options = CATS.map(function(c){ return '<option value="' + esc(c.id) + '"' + (c.id === cat ? ' selected' : '') + '>' + c.emoji + ' ' + esc(c.nome) + '</option>'; }).join('');
    return '<div id="leadConvertBox" class="bg-navy-900 text-white rounded-2xl shadow-glow p-5 mb-7"><div class="flex items-start justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-wide text-peao-400">Converter lead em empresa</p><h2 class="font-display text-xl font-extrabold mt-1">' + esc(lead.empresa_nome) + '</h2><p class="text-sm text-silver-300 mt-1">📍 ' + esc(city) + ' · dados pré-preenchidos. Revise antes de publicar.</p></div><button id="closeLeadConvert" class="text-silver-300 hover:text-white text-lg" aria-label="Fechar">✕</button></div><form id="leadConvertForm" class="grid sm:grid-cols-2 gap-3 mt-5"><input type="hidden" name="lead_id" value="' + esc(lead.id) + '"><input type="hidden" name="city_slug" value="' + esc(lead.city_slug) + '"><div class="sm:col-span-2"><label class="block text-xs font-semibold mb-1">Nome da empresa *</label><input name="nome" value="' + esc(lead.empresa_nome) + '" class="w-full px-3 py-2.5 rounded-lg text-navy-900"></div><div><label class="block text-xs font-semibold mb-1">Categoria *</label><select name="categoria" class="w-full px-3 py-2.5 rounded-lg text-navy-900">' + options + '</select></div><div><label class="block text-xs font-semibold mb-1">Plano inicial</label><select name="plano" class="w-full px-3 py-2.5 rounded-lg text-navy-900"><option value="gratis">Grátis</option><option value="destaque">Destaque</option><option value="pro">Pro</option></select></div><div><label class="block text-xs font-semibold mb-1">WhatsApp</label><input name="whatsapp" value="' + esc(lead.whatsapp || '') + '" class="w-full px-3 py-2.5 rounded-lg text-navy-900"></div><div><label class="block text-xs font-semibold mb-1">Responsável</label><input name="responsavel" value="' + esc(lead.responsavel || '') + '" class="w-full px-3 py-2.5 rounded-lg text-navy-900"></div><div class="sm:col-span-2"><label class="block text-xs font-semibold mb-1">Descrição</label><textarea name="descricao_curta" rows="2" class="w-full px-3 py-2.5 rounded-lg text-navy-900">' + esc(lead.mensagem || '') + '</textarea></div><label class="sm:col-span-2 flex items-center gap-2 text-sm text-silver-200"><input name="destaque" type="checkbox" class="w-4 h-4 accent-peao-500"> Publicar com selo Destaque</label><button type="submit" class="sm:col-span-2 btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold py-3 rounded-xl">Revisar e publicar empresa →</button><p id="leadConvertMsg" class="sm:col-span-2 text-sm"></p></form></div>';
  }

  /* ── Sistema de Planos (validação client-side) ── */
  var PLANOS = {
    gratis:   { id:'gratis',   nome:'Grátis',   preco:0,   fotos:3,  ofertas:1,  prioridade:1 },
    destaque: { id:'destaque', nome:'Destaque',  preco:79,  fotos:10, ofertas:5,  prioridade:2 },
    pro:      { id:'pro',      nome:'Pro',       preco:149, fotos:20, ofertas:-1, prioridade:3 }
  };
  function validarLimiteFotos(planoId, totalAtual) {
    var p = PLANOS[planoId] || PLANOS.gratis;
    if (p.fotos === -1) return { ok: true };
    if (totalAtual >= p.fotos) {
      var prox = planoId === 'gratis' ? 'Destaque' : planoId === 'destaque' ? 'Pro' : null;
      return { ok: false, msg: 'Limite de ' + p.fotos + ' foto(s) atingido no plano ' + p.nome + (prox ? '. Faça upgrade para ' + prox + '.' : '.') };
    }
    return { ok: true, atual: totalAtual, limite: p.fotos };
  }
  function validarLimiteOfertas(planoId, ativasAtual) {
    var p = PLANOS[planoId] || PLANOS.gratis;
    if (p.ofertas === -1) return { ok: true, ilimitado: true };
    if (ativasAtual >= p.ofertas) {
      var prox = planoId === 'gratis' ? 'Destaque' : planoId === 'destaque' ? 'Pro' : null;
      return { ok: false, msg: 'Limite de ' + p.ofertas + ' oferta(s) atingido no plano ' + p.nome + (prox ? '. Upgrade para ' + prox + '.' : '.') };
    }
    return { ok: true };
  }

  function renderAdmin(root, stores, offers, met, reviews, drivers, listings, cityLeads, automationQueue) {
    cityLeads = cityLeads || []; automationQueue = automationQueue || [];
    listings = listings || []; drivers = drivers || []; reviews = reviews || []; offers = offers || [];
    stores = stores || [];

    var currentAdminTab = 'stores'; // 'stores' | 'listings' | 'jobs' | 'drivers' | 'reviews' | 'leads'
    var adminCity = '';

    function getFilteredStores() {
      if (!adminCity) return stores;
      return stores.filter(function (s) { return (s.city_slug || '').toLowerCase() === adminCity || (s.cidade || '').toLowerCase().indexOf(adminCity) !== -1; });
    }

    function getFilteredListings() {
      var regular = listings.filter(function (l) { return l.categoria !== 'vagas-empresa' && l.categoria !== 'vagas-candidato' && l.categoria !== 'vagas-nac-empresa' && l.categoria !== 'vagas-nac-candidato' && l.categoria !== 'empregos'; });
      if (!adminCity) return regular;
      return regular.filter(function (l) { return (l.city_slug || '').toLowerCase() === adminCity || (l.cidade || '').toLowerCase().indexOf(adminCity) !== -1; });
    }

    function getFilteredJobs() {
      var jobs = listings.filter(function (l) { return l.categoria === 'vagas-empresa' || l.categoria === 'vagas-candidato' || l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'empregos'; });
      if (!adminCity) return jobs;
      return jobs.filter(function (l) { return (l.city_slug || '').toLowerCase() === adminCity || (l.cidade || '').toLowerCase().indexOf(adminCity) !== -1; });
    }

    function getFilteredDrivers() {
      if (!adminCity) return drivers;
      return drivers.filter(function (d) { return (d.city_slug || '').toLowerCase() === adminCity || (d.cidade || '').toLowerCase().indexOf(adminCity) !== -1; });
    }

    function getFilteredLeads() {
      if (!adminCity) return cityLeads;
      return cityLeads.filter(function (ld) { return (ld.city_slug || '').toLowerCase() === adminCity; });
    }

    function renderAdminView() {
      var fStores = getFilteredStores();
      var fListings = getFilteredListings();
      var fJobs = getFilteredJobs();
      var fDrivers = getFilteredDrivers();
      var fLeads = getFilteredLeads();
      var fReviews = reviews;

      var pendStores = fStores.filter(function (s) { return s.status === 'pendente'; });
      var pendListings = fListings.filter(function (l) { return l.status === 'pendente'; });
      var pendJobs = fJobs.filter(function (j) { return j.status === 'pendente'; });
      var pendReviews = fReviews.filter(function (r) { return r.status === 'pendente'; });

      // Stats Dashboard
      var stats = '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">' +
        statCard('🏢', fStores.length, 'Empresas (' + pendStores.length + ' pend.)') +
        statCard('📋', fListings.length, 'Classificados (' + pendListings.length + ' pend.)') +
        statCard('💼', fJobs.length, 'Vagas & Talentos (' + pendJobs.length + ' pend.)') +
        statCard('🚗', fDrivers.length, 'Motoristas') +
        statCard('⭐', fReviews.length, 'Avaliações (' + pendReviews.length + ' pend.)') +
        statCard('🌎', fLeads.length, 'Leads de Expansão') +
      '</div>';

      // City Filter Dropdown
      var cityOptions = '<option value="">📍 Todas as Cidades (Nacional)</option>' +
        Object.keys(CITY_NAMES).filter(function(k){ return k !== 'nacional'; }).map(function(k){
          return '<option value="' + k + '"' + (adminCity === k ? ' selected' : '') + '>' + esc(CITY_NAMES[k]) + '</option>';
        }).join('');

      var topBar = '<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 bg-white rounded-2xl p-4 ring-silver shadow-soft">' +
        '<div class="flex items-center gap-3 w-full md:w-auto">' +
          '<span class="text-xs font-bold uppercase text-silver-400">Filtrar Cidade:</span>' +
          '<select id="admCitySel" class="px-3 py-2 rounded-xl bg-silver-50 ring-silver text-xs font-semibold outline-none text-navy-900">' + cityOptions + '</select>' +
        '</div>' +
        '<div class="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">' +
          '<button id="btnAddStore" class="btn-shine bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs">🏢 + Cadastrar Empresa</button>' +
          '<button id="btnAddJob" class="btn-shine bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs">💼 + Publicar Vaga</button>' +
          '<button id="btnAddAnuncio" class="btn-shine bg-purple-600 hover:bg-purple-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs">📋 + Criar Anúncio</button>' +
          '<button id="btnCsv" class="text-xs font-bold text-silver-400 hover:text-white px-3 py-2 rounded-xl bg-white/5">⬇ CSV</button>' +
          '<button id="btnLogout" class="text-xs font-bold text-peao-500 hover:text-peao-400 px-3 py-2 rounded-xl bg-peao-500/10">Sair</button>' +
        '</div>' +
      '</div>';

      // Admin Tabs
      var tabs = '<div class="flex flex-wrap items-center gap-2 mb-6 border-b border-white/10 pb-3">' +
        '<button data-adm-tab="stores" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'stores' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">🏢 Empresas (' + fStores.length + ')' + (pendStores.length ? ' <span class="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold text-[10px]">' + pendStores.length + '</span>' : '') + '</button>' +
        '<button data-adm-tab="listings" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'listings' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">📋 Classificados (' + fListings.length + ')' + (pendListings.length ? ' <span class="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold text-[10px]">' + pendListings.length + '</span>' : '') + '</button>' +
        '<button data-adm-tab="jobs" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'jobs' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">💼 Vagas & Recrutamento (' + fJobs.length + ')' + (pendJobs.length ? ' <span class="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold text-[10px]">' + pendJobs.length + '</span>' : '') + '</button>' +
        '<button data-adm-tab="drivers" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'drivers' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">🚗 Motoristas (' + fDrivers.length + ')</button>' +
        '<button data-adm-tab="reviews" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'reviews' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">⭐ Avaliações (' + fReviews.length + ')' + (pendReviews.length ? ' <span class="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-extrabold text-[10px]">' + pendReviews.length + '</span>' : '') + '</button>' +
        '<button data-adm-tab="leads" class="px-4 py-2 rounded-xl text-xs font-bold transition ' + (currentAdminTab === 'leads' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:text-white') + '">🌎 Leads de Expansão (' + fLeads.length + ')</button>' +
      '</div>';

      // Forms Sections
      var formsHtml = '<div id="addStoreForm" class="hidden mb-6 bg-white rounded-3xl ring-silver shadow-soft p-6 space-y-4">' +
        '<h3 class="font-display font-bold text-lg text-white flex items-center gap-2"><span>🏢</span> Cadastrar Empresa Rápida (Admin)</h3>' +
        '<p class="text-xs text-silver-400">A empresa entra ativa diretamente no guia da cidade escolhida.</p>' +
        '<div class="grid sm:grid-cols-2 gap-3">' +
          '<input id="as_nome" placeholder="Nome da empresa *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<select id="as_cat" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' + CATS.map(function(c){ return '<option value="' + c.id + '">' + c.emoji + ' ' + esc(c.nome) + '</option>'; }).join('') + '</select>' +
          '<input id="as_wa" placeholder="WhatsApp (DDD + Número) *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="as_tel" placeholder="Telefone fixo" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="as_bairro" placeholder="Bairro" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="as_end" placeholder="Endereço (Rua, nº)" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<select id="as_city" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' + Object.keys(CITY_NAMES).filter(function(k){ return k !== 'nacional'; }).map(function(k){ return '<option value="' + k + '">' + esc(CITY_NAMES[k]) + '</option>'; }).join('') + '</select>' +
          '<select id="as_plano" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"><option value="pro">Plano Pro (R$ 149 / Ilimitado)</option><option value="destaque">Plano Destaque (R$ 79)</option><option value="gratis">Plano Grátis</option></select>' +
        '</div>' +
        '<textarea id="as_desc" rows="2" placeholder="Descrição curta da empresa" class="w-full px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"></textarea>' +
        '<div class="flex items-center justify-between">' +
          '<label class="flex items-center gap-2 text-xs text-silver-300 font-semibold"><input id="as_destaque" type="checkbox" checked class="w-4 h-4 accent-peao-500"> Ativar com selo ⭐ Destaque</label>' +
          '<button id="as_submit" class="btn-shine bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Publicar Empresa Agora →</button>' +
        '</div>' +
        '<span id="as_msg" class="text-xs"></span>' +
      '</div>' +
      '<div id="addJobForm" class="hidden mb-6 bg-white rounded-3xl ring-silver shadow-soft p-6 space-y-4">' +
        '<h3 class="font-display font-bold text-lg text-white flex items-center gap-2"><span>💼</span> Publicar Vaga de Emprego ou Perfil</h3>' +
        '<div class="grid sm:grid-cols-2 gap-3">' +
          '<select id="job_cat" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"><option value="vagas-empresa">📢 Empresa anunciando vaga</option><option value="vagas-candidato">🙋 Candidato buscando oportunidade</option><option value="vagas-nac-empresa">📣 Vaga Nacional / Remoto</option></select>' +
          '<input id="job_titulo" placeholder="Título da vaga ou cargo desejado *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="job_empresa" placeholder="Nome da empresa ou do candidato *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<select id="job_tipo" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"><option value="temporario">🤠 Temporário / Festa do Peão</option><option value="clt">📋 CLT (Efetivo)</option><option value="freelancer">⚡ Freelancer / Diária</option><option value="estagio">🎓 Estágio</option><option value="pj">🏢 PJ</option><option value="home-office">💻 Home Office / Remoto</option></select>' +
          '<input id="job_salario" placeholder="Salário / Diária (Ex.: R$ 2.500 ou R$ 180/dia)" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="job_wa" placeholder="WhatsApp para contato *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<select id="job_city" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' + Object.keys(CITY_NAMES).map(function(k){ return '<option value="' + k + '">' + esc(CITY_NAMES[k]) + '</option>'; }).join('') + '</select>' +
          '<input id="job_email" placeholder="E-mail de contato (opcional)" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
        '</div>' +
        '<textarea id="job_desc" rows="2" placeholder="Requisitos, jornada e detalhes da vaga..." class="w-full px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"></textarea>' +
        '<div class="flex items-center justify-between">' +
          '<label class="flex items-center gap-2 text-xs text-silver-300 font-semibold"><input id="job_destaque" type="checkbox" checked class="w-4 h-4 accent-peao-500"> Publicar com selo ⭐ Destaque</label>' +
          '<button id="job_submit" class="btn-shine bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Publicar Vaga Agora →</button>' +
        '</div>' +
        '<span id="job_msg" class="text-xs"></span>' +
      '</div>' +
      '<div id="addAnuncioForm" class="hidden mb-6 bg-white rounded-3xl ring-silver shadow-soft p-6 space-y-4">' +
        '<h3 class="font-display font-bold text-lg text-white flex items-center gap-2"><span>📋</span> Criar Anúncio Classificado (Admin)</h3>' +
        '<div class="grid sm:grid-cols-2 gap-3">' +
          '<select id="an_cat" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' + CLASSIFIED_CATS.map(function(c){ return '<option value="' + c.id + '">' + (c.emoji || '📋') + ' ' + esc(c.nome) + '</option>'; }).join('') + '</select>' +
          '<input id="an_titulo" placeholder="Título do anúncio *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="an_preco" placeholder="Preço / Valor (Ex.: R$ 1.500 / A combinar)" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="an_anunciante" placeholder="Nome do anunciante *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<input id="an_wa" placeholder="WhatsApp para contato *" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' +
          '<select id="an_city" class="px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm">' + Object.keys(CITY_NAMES).map(function(k){ return '<option value="' + k + '">' + esc(CITY_NAMES[k]) + '</option>'; }).join('') + '</select>' +
        '</div>' +
        '<textarea id="an_desc" rows="2" placeholder="Descrição completa do anúncio..." class="w-full px-4 py-2.5 rounded-xl bg-silver-50 ring-silver text-navy-900 text-sm"></textarea>' +
        '<div class="flex items-center justify-between">' +
          '<label class="flex items-center gap-2 text-xs text-silver-300 font-semibold"><input id="an_destaque" type="checkbox" checked class="w-4 h-4 accent-peao-500"> Publicar com selo ⭐ Destaque</label>' +
          '<button id="an_submit" class="btn-shine bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs">Criar Anúncio Agora →</button>' +
        '</div>' +
        '<span id="an_msg" class="text-xs"></span>' +
      '</div>';

      // Tab Content Rendering
      var tabContent = '';
      if (currentAdminTab === 'stores') {
        tabContent = '<div class="space-y-4">' +
          (pendStores.length ? '<h3 class="font-display font-bold text-lg text-amber-400">⏳ Empresas Aguardando Aprovação (' + pendStores.length + ')</h3><div class="space-y-3">' + pendStores.map(function(s){ return adminRow(s, true); }).join('') + '</div>' : '') +
          '<h3 class="font-display font-bold text-lg text-white mt-6">Todas as Empresas (' + fStores.length + ')</h3>' +
          (fStores.length ? '<div class="space-y-3">' + fStores.map(function(s){ return adminRow(s, false); }).join('') + '</div>' : '<p class="text-silver-500 text-sm">Nenhuma empresa encontrada para esta cidade.</p>') +
        '</div>';
      } else if (currentAdminTab === 'listings') {
        tabContent = '<div class="space-y-4">' +
          (pendListings.length ? '<h3 class="font-display font-bold text-lg text-amber-400">⏳ Classificados Aguardando Aprovação (' + pendListings.length + ')</h3><div class="space-y-3">' + pendListings.map(function(l){ return adminListingRow(l); }).join('') + '</div>' : '') +
          '<h3 class="font-display font-bold text-lg text-white mt-6">Todos os Classificados (' + fListings.length + ')</h3>' +
          (fListings.length ? '<div class="space-y-3">' + fListings.map(function(l){ return adminListingRow(l); }).join('') + '</div>' : '<p class="text-silver-500 text-sm">Nenhum classificado encontrado.</p>') +
        '</div>';
      } else if (currentAdminTab === 'jobs') {
        tabContent = '<div class="space-y-4">' +
          (pendJobs.length ? '<h3 class="font-display font-bold text-lg text-amber-400">⏳ Vagas & Talentos Aguardando Aprovação (' + pendJobs.length + ')</h3><div class="space-y-3">' + pendJobs.map(function(j){ return adminListingRow(j); }).join('') + '</div>' : '') +
          '<h3 class="font-display font-bold text-lg text-white mt-6">Todas as Vagas & Banco de Talentos (' + fJobs.length + ')</h3>' +
          (fJobs.length ? '<div class="space-y-3">' + fJobs.map(function(j){ return adminListingRow(j); }).join('') + '</div>' : '<p class="text-silver-500 text-sm">Nenhuma vaga encontrada.</p>') +
        '</div>';
      } else if (currentAdminTab === 'drivers') {
        tabContent = '<div class="space-y-4">' +
          '<h3 class="font-display font-bold text-lg text-white">Motoristas Cadastrados (' + fDrivers.length + ')</h3>' +
          (fDrivers.length ? '<div class="space-y-3">' + fDrivers.map(driverAdminRow).join('') + '</div>' : '<p class="text-silver-500 text-sm">Nenhum motorista cadastrado.</p>') +
        '</div>';
      } else if (currentAdminTab === 'reviews') {
        tabContent = '<div class="space-y-4">' +
          '<h3 class="font-display font-bold text-lg text-white">Avaliações (' + fReviews.length + ')</h3>' +
          (fReviews.length ? '<div class="space-y-3">' + fReviews.map(function(rv){
            var st = (stores.filter(function (x) { return x.id === rv.store_id; })[0] || {}).nome || '—';
            return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-4 flex items-center justify-between gap-3">' +
              '<div class="flex-1 min-w-0"><p class="text-sm"><b>' + esc(rv.nota) + '★</b> — ' + esc(st) + (rv.nome ? ' · ' + esc(rv.nome) : '') + ' · <span class="font-semibold ' + (rv.status === 'ativo' ? 'text-emerald-400' : 'text-amber-400') + '">' + esc(rv.status) + '</span></p><p class="text-xs text-silver-400 truncate mt-0.5">' + esc(rv.comentario || 'Sem comentário') + '</p></div>' +
              '<div class="flex items-center gap-2">' +
                (rv.status !== 'ativo' ? '<button data-rev-ap="' + esc(rv.id) + '" class="text-xs font-bold text-white bg-emerald-600 px-3 py-1.5 rounded-lg">Aprovar</button>' : '') +
                (rv.status !== 'rejeitado' ? '<button data-rev-rj="' + esc(rv.id) + '" class="text-xs font-bold text-peao-600 bg-peao-500/10 px-3 py-1.5 rounded-lg">Rejeitar</button>' : '') +
              '</div>' +
            '</div>';
          }).join('') : '<p class="text-silver-500 text-sm">Nenhuma avaliação encontrada.</p>') +
        '</div>';
      } else if (currentAdminTab === 'leads') {
        tabContent = '<div class="space-y-4">' +
          growthHtml +
          '<h3 class="font-display font-bold text-lg text-white">Leads por Cidade (' + fLeads.length + ')</h3>' +
          (fLeads.length ? '<div class="space-y-3">' + fLeads.map(leadAdminRow).join('') + '</div>' : '<p class="text-silver-500 text-sm">Nenhum lead registrado.</p>') +
        '</div>';
      }

      root.innerHTML = '<div class="flex items-center justify-between mb-4"><h1 class="font-display text-2xl md:text-3xl font-extrabold text-white">Painel Administrativo AQUITEM</h1></div>' +
        stats + topBar + formsHtml + tabs + '<div id="leadConvertRoot"></div>' + tabContent;

      wireAdminEvents(root, stores, listings, cityLeads);
    }

    function adminListingRow(l) {
      var wa = String(l.whatsapp || '').replace(/\D/g, '');
      var cObj = CLASSIFIED_CATS.filter(function(x){ return x.id === l.categoria; })[0];
      var catName = cObj ? (cObj.emoji + ' ' + cObj.nome) : l.categoria;
      var isVaga = l.categoria.startsWith('vagas') || l.categoria === 'empregos';
      var statusColor = l.status === 'ativo' ? 'text-emerald-400' : (l.status === 'pendente' ? 'text-amber-400' : 'text-silver-500');

      return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border border-white/5">' +
        '<div class="flex-1 min-w-0">' +
          '<div class="flex items-center gap-2 flex-wrap mb-1">' +
            '<span class="text-[10px] font-bold text-peao-400 uppercase tracking-wider bg-peao-500/10 px-2 py-0.5 rounded">' + esc(catName) + '</span>' +
            (l.subcategoria ? '<span class="text-[10px] font-semibold text-silver-300 bg-white/10 px-2 py-0.5 rounded">' + esc(l.subcategoria.toUpperCase()) + '</span>' : '') +
            (l.destaque ? '<span class="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">⭐ Destaque</span>' : '') +
            '<span class="text-xs font-semibold ' + statusColor + '">' + esc(l.status.toUpperCase()) + '</span>' +
          '</div>' +
          '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="font-display font-bold text-white text-base hover:text-peao-400 block truncate">' + esc(l.titulo) + '</a>' +
          '<p class="text-xs text-silver-400 mt-1">' + (l.anunciante_nome ? '👤 ' + esc(l.anunciante_nome) + ' · ' : '') + '📍 ' + esc([l.bairro, l.cidade || 'Barretos'].filter(Boolean).join(' · ')) + (l.preco ? ' · 💰 <b class="text-emerald-400">' + esc(l.preco) + '</b>' : '') + '</p>' +
        '</div>' +
        '<div class="flex items-center gap-2 flex-wrap justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">' +
          (l.status !== 'ativo' ? '<button data-lst-ap="' + esc(l.id) + '" class="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg">✓ Aprovar</button>' : '') +
          (l.status === 'pendente' ? '<button data-lst-rj="' + esc(l.id) + '" class="text-xs font-bold text-peao-500 bg-peao-500/10 hover:bg-peao-500/20 px-3 py-1.5 rounded-lg">Rejeitar</button>' : '') +
          '<button data-lst-dest="' + esc(l.id) + '" data-st="' + (l.destaque ? 0 : 1) + '" class="text-xs font-semibold ' + (l.destaque ? 'text-amber-400' : 'text-silver-300 hover:text-white') + ' bg-white/5 px-2.5 py-1.5 rounded-lg">' + (l.destaque ? '⭐ Com Destaque' : '☆ Destacar') + '</button>' +
          (l.status === 'ativo' ? '<button data-lst-end="' + esc(l.id) + '" class="text-xs font-semibold text-silver-400 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-lg">🔒 Encerrar</button>' : (l.status === 'encerrado' ? '<button data-lst-act="' + esc(l.id) + '" class="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg">Reativar</button>' : '')) +
          (wa ? '<a href="https://wa.me/' + esc(wa) + '" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-white bg-[#25D366] px-2.5 py-1.5 rounded-lg">WhatsApp</a>' : '') +
          '<button data-lst-del="' + esc(l.id) + '" class="text-xs font-semibold text-peao-500 hover:text-peao-400 px-2 py-1.5">🗑️</button>' +
        '</div>' +
      '</div>';
    }

    function wireAdminEvents(container, storesList, listingsList, leadsList) {
      $('#btnLogout').addEventListener('click', AUTH.logout);

      var cityFilterSel = $('#admCitySel');
      if (cityFilterSel) {
        cityFilterSel.addEventListener('change', function () {
          adminCity = this.value;
          renderAdminView();
        });
      }

      container.querySelectorAll('[data-adm-tab]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentAdminTab = btn.getAttribute('data-adm-tab');
          renderAdminView();
        });
      });

      // Toggle Forms
      var btnAddStore = $('#btnAddStore');
      if (btnAddStore) btnAddStore.addEventListener('click', function () {
        var f = $('#addStoreForm'); if (f) f.classList.toggle('hidden');
        if ($('#addJobForm')) $('#addJobForm').classList.add('hidden');
        if ($('#addAnuncioForm')) $('#addAnuncioForm').classList.add('hidden');
      });

      var btnAddJob = $('#btnAddJob');
      if (btnAddJob) btnAddJob.addEventListener('click', function () {
        var f = $('#addJobForm'); if (f) f.classList.toggle('hidden');
        if ($('#addStoreForm')) $('#addStoreForm').classList.add('hidden');
        if ($('#addAnuncioForm')) $('#addAnuncioForm').classList.add('hidden');
      });

      var btnAddAnuncio = $('#btnAddAnuncio');
      if (btnAddAnuncio) btnAddAnuncio.addEventListener('click', function () {
        var f = $('#addAnuncioForm'); if (f) f.classList.toggle('hidden');
        if ($('#addStoreForm')) $('#addStoreForm').classList.add('hidden');
        if ($('#addJobForm')) $('#addJobForm').classList.add('hidden');
      });

      // Submit Store
      var asSub = $('#as_submit');
      if (asSub) asSub.addEventListener('click', function () {
        var msg = $('#as_msg'); var nome = ($('#as_nome').value||'').trim(); var cat = $('#as_cat').value;
        if (!nome || !cat) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Preencha o nome e a categoria.'; return; }
        var cSlug = $('#as_city').value || 'barretos';
        var cName = CITY_NAMES[cSlug] || 'Barretos';
        asSub.disabled = true; asSub.textContent = 'Cadastrando…';
        aPost('stores', {
          nome: nome, categoria: cat, endereco: ($('#as_end').value||'').trim(),
          whatsapp: ($('#as_wa').value||'').trim(), telefone: ($('#as_tel').value||'').trim(),
          bairro: ($('#as_bairro').value||'').trim(), descricao_curta: ($('#as_desc').value||'').trim(),
          cidade: cName, city_slug: cSlug, status: 'pendente', aceite_termos: true, autorizacao_contato: true
        }).then(function (arr) {
          var cr = arr && arr[0];
          if (!cr) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Erro ao cadastrar.'; asSub.disabled = false; asSub.textContent = 'Publicar Empresa Agora →'; return; }
          aPatch('stores', cr.id, { status: 'ativo', plano: $('#as_plano').value, destaque: $('#as_destaque').checked }).then(function () {
            msg.className = 'text-xs text-emerald-400'; msg.textContent = '✓ Empresa cadastrada e publicada!'; pageAdmin();
          });
        });
      });

      // Submit Job
      var jobSub = $('#job_submit');
      if (jobSub) jobSub.addEventListener('click', function () {
        var msg = $('#job_msg');
        var titulo = ($('#job_titulo').value||'').trim();
        var empresa = ($('#job_empresa').value||'').trim();
        var wa = ($('#job_wa').value||'').trim();
        var cat = $('#job_cat').value || 'vagas-empresa';
        if (!titulo || !empresa || !wa) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Preencha título, anunciante e WhatsApp.'; return; }
        jobSub.disabled = true; jobSub.textContent = 'Publicando…';
        var cSlug = $('#job_city').value || 'barretos';
        var cName = CITY_NAMES[cSlug] || 'Barretos';
        aAdminRpc('admin_insert_listing', { p_data: {
          titulo: titulo,
          anunciante_nome: empresa,
          categoria: cat,
          subcategoria: $('#job_tipo').value || 'temporario',
          descricao: ($('#job_desc').value||'').trim(),
          preco: ($('#job_salario').value||'').trim(),
          whatsapp: wa,
          email: ($('#job_email').value||'').trim(),
          cidade: cName,
          city_slug: cSlug,
          status: 'ativo',
          plano: $('#job_destaque').checked ? 'destaque' : 'gratis',
          destaque: $('#job_destaque').checked,
          anunciante_tipo: cat === 'vagas-candidato' ? 'candidato' : 'empresa'
        }}).then(function (cr) {
          if (!cr) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Erro ao publicar.'; jobSub.disabled = false; jobSub.textContent = 'Publicar Vaga Agora →'; return; }
          // Ativa se inserido como pendente
          if (cr.id) { aAdminRpc('admin_set_listing_status', { p_listing_id: cr.id, p_status: 'ativo' }); }
          msg.className = 'text-xs text-emerald-400'; msg.textContent = '✓ Vaga publicada com sucesso!'; setTimeout(pageAdmin, 1000);
        }).catch(function (e) {
          msg.className = 'text-xs text-peao-500'; msg.textContent = 'Erro: ' + (e.message || e); jobSub.disabled = false;
        });
      });

      // Submit Classified
      var anSub = $('#an_submit');
      if (anSub) anSub.addEventListener('click', function () {
        var msg = $('#an_msg');
        var titulo = ($('#an_titulo').value||'').trim();
        var anunciante = ($('#an_anunciante').value||'').trim();
        var wa = ($('#an_wa').value||'').trim();
        var cat = $('#an_cat').value;
        if (!titulo || !anunciante || !wa || !cat) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Preencha todos os campos obrigatórios.'; return; }
        anSub.disabled = true; anSub.textContent = 'Publicando…';
        var cSlug = $('#an_city').value || 'barretos';
        var cName = CITY_NAMES[cSlug] || 'Barretos';
        aAdminRpc('admin_insert_listing', { p_data: {
          titulo: titulo,
          anunciante_nome: anunciante,
          categoria: cat,
          descricao: ($('#an_desc').value||'').trim(),
          preco: ($('#an_preco').value||'').trim(),
          whatsapp: wa,
          cidade: cName,
          city_slug: cSlug,
          status: 'ativo',
          plano: $('#an_destaque').checked ? 'destaque' : 'gratis',
          destaque: $('#an_destaque').checked,
          anunciante_tipo: 'particular'
        }}).then(function (cr) {
          if (!cr) { msg.className = 'text-xs text-peao-500'; msg.textContent = 'Erro ao criar anúncio.'; anSub.disabled = false; anSub.textContent = 'Criar Anúncio Agora →'; return; }
          if (cr.id) { aAdminRpc('admin_set_listing_status', { p_listing_id: cr.id, p_status: 'ativo' }); }
          msg.className = 'text-xs text-emerald-400'; msg.textContent = '✓ Anúncio publicado em ' + cName + '!'; setTimeout(pageAdmin, 1000);
        }).catch(function (e) {
          msg.className = 'text-xs text-peao-500'; msg.textContent = 'Erro: ' + (e.message || e); anSub.disabled = false;
        });
      });

      // CSV Export
      var btnCsv = $('#btnCsv');
      if (btnCsv) btnCsv.addEventListener('click', function () { exportCSV(storesList); });

      // Actions on Stores
      container.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id'), act = btn.getAttribute('data-act'), patch = {};
          if (act === 'aprovar') patch.status = 'ativo';
          if (act === 'rejeitar') patch.status = 'rejeitado';
          if (act === 'destaque-on') patch.destaque = true;
          if (act === 'destaque-off') patch.destaque = false;
          aPatch('stores', id, patch).then(function () { pageAdmin(); });
        });
      });

      container.querySelectorAll('select[data-plano-id]').forEach(function (sel) {
        sel.addEventListener('change', function () { aAdminRpc('admin_set_store_plano', { p_store_id: sel.getAttribute('data-plano-id'), p_plano: sel.value }); });
      });

      container.querySelectorAll('[data-store-delete]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!confirm('Excluir permanentemente a empresa ' + b.getAttribute('data-store-name') + '? Fotos e ofertas também serão removidas.')) return;
          fetch(B('stores?id=eq.' + encodeURIComponent(b.getAttribute('data-store-delete'))), { method: 'DELETE', headers: aH() }).then(function () { pageAdmin(); });
        });
      });

      // Actions on Listings & Jobs
      container.querySelectorAll('[data-lst-ap]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_listing_status', { p_listing_id: b.getAttribute('data-lst-ap'), p_status: 'ativo' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lst-rj]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_listing_status', { p_listing_id: b.getAttribute('data-lst-rj'), p_status: 'rejeitado' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lst-dest]').forEach(function (b) {
        b.addEventListener('click', function () { aPatch('listings', b.getAttribute('data-lst-dest'), { destaque: b.getAttribute('data-st') === '1' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lst-end]').forEach(function (b) {
        b.addEventListener('click', function () { if (confirm('Marcar como encerrado/vendido/preenchido?')) aAdminRpc('admin_set_listing_status', { p_listing_id: b.getAttribute('data-lst-end'), p_status: 'encerrado' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lst-act]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_listing_status', { p_listing_id: b.getAttribute('data-lst-act'), p_status: 'ativo' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lst-del]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (confirm('Excluir este anúncio/vaga permanentemente?')) fetch(B('listings?id=eq.' + encodeURIComponent(b.getAttribute('data-lst-del'))), { method: 'DELETE', headers: aH() }).then(function () { pageAdmin(); });
        });
      });

      // Actions on Reviews
      container.querySelectorAll('[data-rev-ap]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_review_status', { p_review_id: b.getAttribute('data-rev-ap'), p_status: 'ativo' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-rev-rj]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_review_status', { p_review_id: b.getAttribute('data-rev-rj'), p_status: 'rejeitado' }).then(function () { pageAdmin(); }); });
      });

      // Actions on Drivers
      container.querySelectorAll('[data-dap]').forEach(function (b) {
        b.addEventListener('click', function () { aAdminRpc('admin_set_driver_status', { p_driver_id: b.getAttribute('data-dap'), p_status: 'ativo' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-ddis]').forEach(function (b) {
        b.addEventListener('click', function () { aPatch('drivers', b.getAttribute('data-ddis'), { disponivel_agora: b.getAttribute('data-st') === '1' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-ddest]').forEach(function (b) {
        b.addEventListener('click', function () { aPatch('drivers', b.getAttribute('data-ddest'), { destaque: b.getAttribute('data-st') === '1' }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('select[data-dplano-id]').forEach(function (sel) {
        sel.addEventListener('change', function () { aPatch('drivers', sel.getAttribute('data-dplano-id'), { plano: sel.value }).then(function () {}); });
      });

      // Actions on Leads
      container.querySelectorAll('[data-lead-delete]').forEach(function (b) {
        b.addEventListener('click', function () { if (!confirm('Excluir permanentemente o lead ' + b.getAttribute('data-lead-name') + '?')) return; fetch(B('city_leads?id=eq.' + encodeURIComponent(b.getAttribute('data-lead-delete'))), { method: 'DELETE', headers: aH() }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('select[data-lead-status]').forEach(function (sel) {
        sel.addEventListener('change', function () { aAdminRpc('admin_set_lead_status', { p_lead_id: sel.getAttribute('data-lead-status'), p_status: sel.value }).then(function () { pageAdmin(); }); });
      });
      container.querySelectorAll('[data-lead-convert]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var lead = leadsList.filter(function(x){ return x.id === btn.getAttribute('data-lead-convert'); })[0];
          var box = $('#leadConvertRoot'); if (!lead || !box) return;
          box.innerHTML = leadConvertForm(lead);
          window.scrollTo(0, 0);
          var close = $('#closeLeadConvert'); if (close) close.addEventListener('click', function(){ box.innerHTML = ''; });
          var form = $('#leadConvertForm');
          if (form) form.addEventListener('submit', function(e){
            e.preventDefault(); var msg = $('#leadConvertMsg'), fd = new FormData(form), cSlug = fd.get('city_slug'), nome = String(fd.get('nome')||'').trim(), cat = fd.get('categoria');
            if (!nome || !cat) { msg.textContent = 'Preencha nome e categoria.'; msg.className = 'sm:col-span-2 text-xs text-peao-400'; return; }
            var subBtn = form.querySelector('button[type=submit]'); if (subBtn) { subBtn.disabled = true; subBtn.textContent = 'Publicando…'; }
            convertLead({
              p_lead_id: fd.get('lead_id'), p_nome: nome, p_categoria: cat,
              p_plano: fd.get('plano')||'gratis', p_destaque: fd.get('destaque') === 'on',
              p_whatsapp: String(fd.get('whatsapp')||'').trim(), p_responsavel: String(fd.get('responsavel')||'').trim(),
              p_descricao_curta: String(fd.get('descricao_curta')||'').trim()
            }).then(function(){
              msg.textContent = '✓ Empresa publicada com sucesso!'; msg.className = 'sm:col-span-2 text-xs text-emerald-400';
              setTimeout(pageAdmin, 800);
            }).catch(function(err){
              msg.textContent = err.message || 'Erro ao publicar.'; msg.className = 'sm:col-span-2 text-xs text-peao-400';
              if (subBtn) { subBtn.disabled = false; subBtn.textContent = 'Revisar e publicar empresa →'; }
            });
          });
        });
      });
    }

    renderAdminView();
  }

  var LojistaAuth = {
    tok: function () { return localStorage.getItem('ata_lojista_token'); },
    uid: function () { return localStorage.getItem('ata_lojista_uid'); },
    logout: function () { localStorage.removeItem('ata_lojista_token'); localStorage.removeItem('ata_lojista_uid'); location.href = 'cadastro.html'; },
    login: function (email, pass) {
      return fetch(CONFIG.supabase.url + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: CONFIG.supabase.anonKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, password: pass }) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error_description || j.msg || 'Erro ao entrar'); return j; }); });
    },
    signup: function (email, pass) {
      return fetch(CONFIG.supabase.url + '/auth/v1/signup', { method: 'POST', headers: { apikey: CONFIG.supabase.anonKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, password: pass }) })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.msg || j.message || 'Erro ao criar conta'); return j; }); });
    }
  };
  function lojistaHeaders() { var t = LojistaAuth.tok(); return { apikey: CONFIG.supabase.anonKey, Authorization: 'Bearer ' + (t || CONFIG.supabase.anonKey) }; }
  function lojistaGet(path) { return fetch(B(path), { headers: lojistaHeaders() }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }); }

  /* PAINEL DO LOJISTA / GESTAO DE EMPRESA */
  function pagePainel() {
    var root = $('#painelRoot'); if (!root) return;
    if (!AUTH.tok()) { location.href = 'login.html'; return; }
    root.innerHTML = '<p class="text-center text-silver-500 py-10">Carregando...</p>';
    var _isLojista = !AUTH.tok() && !!LojistaAuth.tok();
    var storeQuery = _isLojista ? ('stores?select=*&owner_id=eq.' + LojistaAuth.uid() + '&order=criado_em.desc') : 'stores?select=*&order=criado_em.desc';
    aGet(storeQuery).then(function (stores) {
      if (!stores.length) { root.innerHTML = emptyState('Nenhuma empresa ainda', 'Cadastre ou aprove uma empresa primeiro.', false); return; }
      renderPainel(root, stores, params().get('id') || stores[0].id);
    });
  }
  function renderPainel(root, stores, selId) {
    var s = stores.filter(function (x) { return x.id === selId; })[0] || stores[0];
    var opts = stores.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === s.id ? ' selected' : '') + '>' + esc(x.nome) + '</option>'; }).join('');
    root.innerHTML = '<div class="flex items-center justify-between mb-6"><h1 class="font-display text-2xl md:text-3xl font-extrabold">Gestão da empresa</h1><a href="admin.html" class="text-sm text-peao-600 hover:underline">Painel admin</a></div><select id="storeSel" class="w-full mb-6 px-4 py-3 rounded-xl bg-white ring-silver">' + opts + '</select><div id="pStore"></div>';
    $('#storeSel').addEventListener('change', function () { renderPainel(root, stores, this.value); });
    loadStoreManage(s);
  }
  function loadStoreManage(s) {
    var box = $('#pStore');
    var mesInicio = new Date(); mesInicio.setDate(1); mesInicio.setHours(0, 0, 0, 0);
    Promise.all([aGet('metrics_events?select=tipo&store_id=eq.' + encodeURIComponent(s.id)), aGet('metrics_events?select=tipo&store_id=eq.' + encodeURIComponent(s.id) + '&criado_em=gte.' + mesInicio.toISOString()), aGet('offers?select=*&store_id=eq.' + encodeURIComponent(s.id) + '&order=criado_em.desc'), Stores.photos(s.id)]).then(function (r) {
      box.innerHTML = painelMetrics(r[0], r[1]) + painelIdentity(s) + painelEditForm(s) + painelPhotos(s, r[3]) + painelOffers(s, r[2]) + painelMapPicker(s);
      wireEdit(s); wireIdentity(s); wireOffers(s, r[2]); wirePainelPhotos(s, r[3]); wireMapPicker(s);
    });
  }
  function painelMetrics(met, metMes) {
    metMes = metMes || [];
    return '<div class="rounded-2xl bg-silver-50 ring-silver p-5 mb-6"><p class="text-[11px] text-silver-500 font-bold uppercase tracking-wide mb-3">Relatório de desempenho</p><div class="grid grid-cols-3 gap-3">' + statCard('\u{1F441}\u{FE0F}', countBy(met, 'tipo', 'view'), 'Visualizações') + statCard('\u{1F4AC}', countBy(met, 'tipo', 'click_whatsapp'), 'Cliques WhatsApp') + statCard('\u{1F4CD}', countBy(met, 'tipo', 'click_mapa'), 'Cliques mapa') + '</div><p class="text-[11px] text-slate-400 mt-3">Este mês: <b>' + countBy(metMes, 'tipo', 'view') + '</b> views · <b>' + countBy(metMes, 'tipo', 'click_whatsapp') + '</b> cliques no WhatsApp</p></div>';
  }
  function painelIdentity(s) {
    var logo = s.logo_url ? '<img src="' + esc(s.logo_url) + '" class="aquitem-identity-logo" alt="Logo atual">' : '<div class="aquitem-identity-logo aquitem-store-initials">' + esc(initials(s.nome)) + '</div>';
    var cover = s.capa_url ? '<img src="' + esc(s.capa_url) + '" class="aquitem-identity-cover" alt="Capa atual">' : '<div class="aquitem-identity-cover aquitem-identity-empty">Adicione uma foto de capa que represente a empresa</div>';
    return '<section class="aquitem-identity-panel"><div><p class="text-[11px] text-amber-600 font-bold uppercase tracking-wide">Identidade do perfil</p><h2 class="font-display font-bold text-xl mt-1">Como turistas enxergam esta empresa</h2><p class="text-sm text-silver-500 mt-1">Logo e capa são os elementos mais importantes do perfil.</p></div><div class="aquitem-identity-preview"><div>' + logo + '<label class="aquitem-upload-button">Trocar logo<input id="profileLogoInput" type="file" accept="image/*"></label></div><div class="flex-1">' + cover + '<label class="aquitem-upload-button mt-2">Trocar capa<input id="profileCoverInput" type="file" accept="image/*"></label></div></div><p id="identityMsg" class="text-sm"></p></section>';
  }
  function wireIdentity(s) {
    function bind(id, field, label) { var inp = $(id); if (!inp) return; inp.addEventListener('change', function () { var f = inp.files[0], msg = $('#identityMsg'); if (!f || !f.type || f.type.indexOf('image/') !== 0 || f.size > 5 * 1024 * 1024) { msg.textContent='Use uma imagem de até 5MB.'; msg.className='text-sm text-peao-600'; return; } msg.textContent='Enviando '+label+'…'; msg.className='text-sm text-silver-500'; uploadPhoto(f).then(function(url){ return aPatch('stores',s.id,(function(){var o={};o[field]=url;return o;})()); }).then(function(ok){ msg.textContent=ok?'✓ '+label+' atualizada!':'Erro ao salvar '+label+'.'; msg.className='text-sm '+(ok?'text-emerald-600':'text-peao-600'); if(ok) aGet('stores?select=*&id=eq.'+encodeURIComponent(s.id)).then(function(rows){loadStoreManage((rows&&rows[0])||s);}); }); }); }
    bind('#profileLogoInput','logo_url','logo'); bind('#profileCoverInput','capa_url','capa');
  }
  function painelPhotos(s, photos) {
    photos = photos || [];
    var lim = (CONFIG.planLimits && CONFIG.planLimits.fotos[s.plano || 'gratis']) || 3;
    var used = photos.length, remaining = Math.max(0, lim-used);
    var imgs = photos.map(function (p) { return '<figure class="aquitem-gallery-item"><img src="' + esc(p.url) + '" alt="Foto da empresa"><button data-delphoto="' + esc(p.id) + '" aria-label="Remover foto">×</button></figure>'; }).join('');
    return '<section class="aquitem-gallery-panel"><div class="flex items-start justify-between gap-3"><div><p class="text-[11px] text-amber-600 font-bold uppercase tracking-wide">Galeria profissional</p><h2 class="font-display font-bold text-xl mt-1">Fotos da empresa</h2><p class="text-sm text-silver-500 mt-1">' + used + '/' + lim + ' fotos publicadas. Adicione várias de uma vez.</p></div><span class="aquitem-gallery-count">' + remaining + ' vagas</span></div>' + (imgs ? '<div class="aquitem-gallery-grid">' + imgs + '</div>' : '<div class="aquitem-gallery-empty">Adicione fotos da fachada, recepção, equipe ou ambiente.</div>') + (remaining ? '<div class="aquitem-gallery-upload"><label class="aquitem-upload-drop">Selecionar fotos<input id="photoInput" type="file" accept="image/*" multiple><span>Você pode selecionar até '+remaining+' fotos de uma vez</span></label><button id="btnAddPhoto" class="aquitem-primary-action">Adicionar fotos</button></div>' : '<p class="text-xs text-amber-600 font-semibold mt-4">Limite do plano atingido.</p>') + '<span id="photoMsg" class="text-sm"></span></section>';
  }
  function wirePainelPhotos(s, photos) {
    var btn = $('#btnAddPhoto');
    if (btn) btn.addEventListener('click', function () {
      var inp = $('#photoInput'), files = inp ? Array.prototype.slice.call(inp.files || []) : [], msg = $('#photoMsg');
      var lim = (CONFIG.planLimits && CONFIG.planLimits.fotos[s.plano || 'gratis']) || 3, remaining = Math.max(0, lim-(photos||[]).length);
      files = files.slice(0, remaining);
      if (!files.length || files.some(function(f){return !f.type || f.type.indexOf('image/') !== 0 || f.size > 5 * 1024 * 1024;})) { msg.className='text-sm text-peao-600'; msg.textContent='Selecione imagens de até 5MB.'; return; }
      btn.disabled=true; btn.textContent='Enviando '+files.length+' foto(s)…';
      Promise.all(files.map(function(f){return uploadPhoto(f).then(function(url){return apiPost('store_photos',{store_id:s.id,url:url});});})).then(function(){loadStoreManage(s);}).catch(function(){msg.className='text-sm text-peao-600';msg.textContent='Não foi possível enviar todas as fotos.';btn.disabled=false;btn.textContent='Adicionar fotos';});
    });
    document.querySelectorAll('[data-delphoto]').forEach(function (b) { b.addEventListener('click', function () { if (!confirm('Remover esta foto?')) return; fetch(B('store_photos?id=eq.'+encodeURIComponent(b.getAttribute('data-delphoto'))),{method:'DELETE',headers:aH()}).then(function(){loadStoreManage(s);}); }); });
  }

  function painelEditForm(s) {
    function val(v) { return esc(v == null ? '' : v); }
    return '<form id="formEdit" class="bg-white rounded-2xl ring-silver shadow-soft p-5 space-y-4 mb-6"><h2 class="font-display font-bold">Editar informações</h2>'
      + '<div><label class="block text-xs font-semibold mb-1">Nome</label><input name="nome" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.nome) + '"></div>'
      + '<div><label class="block text-xs font-semibold mb-1">Descrição curta</label><input name="descricao_curta" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.descricao_curta) + '"></div>'
      + '<div><label class="block text-xs font-semibold mb-1">Descrição completa</label><textarea name="descricao" rows="2" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver">' + val(s.descricao) + '</textarea></div>'
      + '<div class="grid sm:grid-cols-2 gap-3"><div><label class="block text-xs font-semibold mb-1">Categoria ✏️</label><select name="categoria" id="editCatSelect" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver"><option value="">Selecione a categoria…</option>' + CATS.map(function(c){ return '<option value="'+esc(c.id)+'"'+(s.categoria===c.id?' selected':'')+'>'+esc(c.emoji)+' '+esc(c.nome)+'</option>'; }).join('') + '</select></div><div><label class="block text-xs font-semibold mb-1">Tipo / Subcategoria</label><input name="subcategoria" id="editSubcatInput" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.subcategoria) + '" placeholder="Ex: Hamburgueria, Academia…"></div></div>'
      + '<div class="grid sm:grid-cols-2 gap-3"><div><label class="block text-xs font-semibold mb-1">WhatsApp</label><input name="whatsapp" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.whatsapp) + '"></div><div><label class="block text-xs font-semibold mb-1">Telefone</label><input name="telefone" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.telefone) + '"></div></div>'
      + '<div class="grid sm:grid-cols-2 gap-3"><div><label class="block text-xs font-semibold mb-1">Endereço</label><input name="endereco" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.endereco) + '"></div><div><label class="block text-xs font-semibold mb-1">Bairro</label><input name="bairro" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.bairro) + '"></div></div>'
      + '<div class="grid sm:grid-cols-2 gap-3"><div><label class="block text-xs font-semibold mb-1">Horário</label><input name="horario" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.horario) + '"></div><div><label class="block text-xs font-semibold mb-1">Pagamento</label><input name="pagamento" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.pagamento) + '"></div></div>'
      + '<div class="grid sm:grid-cols-2 gap-3"><div><label class="block text-xs font-semibold mb-1">Instagram</label><input name="instagram" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.instagram) + '"></div><div><label class="block text-xs font-semibold mb-1">Site</label><input name="site" class="w-full px-3 py-2 rounded-lg bg-silver-50 ring-silver" value="' + val(s.site) + '"></div></div>'
      + '<fieldset class="pt-2 border-t border-silver-200"><legend class="text-xs font-semibold mb-2 mt-3">Selos (marque o que se aplica)</legend><div class="flex flex-wrap gap-3 text-sm">'        + '<label class="flex items-center gap-1"><input type="checkbox" name="tag_24h" class="w-4 h-4 accent-peao-500"' + (s.tags && s.tags.indexOf('24h') > -1 ? ' checked' : '') + '> Aberto 24h</label>'        + '<label class="flex items-center gap-1"><input type="checkbox" name="tag_plantao" class="w-4 h-4 accent-peao-500"' + (s.tags && s.tags.indexOf('plantao') > -1 ? ' checked' : '') + '> Plantão</label>'        + '<label class="flex items-center gap-1"><input type="checkbox" name="tag_madrugada" class="w-4 h-4 accent-peao-500"' + (s.tags && s.tags.indexOf('madrugada') > -1 ? ' checked' : '') + '> Atende madrugada</label>'        + '</div></fieldset>'
      + '<label class="flex items-center gap-2 text-sm mt-3"><input type="checkbox" name="destaque" class="w-4 h-4 accent-peao-500"' + (s.destaque ? ' checked' : '') + '> Destacar empresa</label>'
      + '<button class="btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold px-5 py-2.5 rounded-xl">Salvar</button><span id="editMsg" class="text-sm text-emerald-600 ml-2"></span></form>';
  }
  function wireEdit(s) {
    var f = $('#formEdit'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var obj = {};
      new FormData(f).forEach(function (v, k) { var el = f.querySelector('[name=' + k + ']'); obj[k] = (el && el.type === 'checkbox') ? el.checked : v; });
      // Garantir que categoria e subcategoria do select/input são incluídas
      var catSel = f.querySelector('#editCatSelect'); if(catSel && catSel.value) obj.categoria = catSel.value;
      var subInp = f.querySelector('#editSubcatInput'); if(subInp) obj.subcategoria = subInp.value;
      var tagsArr = [];
      ['24h', 'plantao', 'madrugada'].forEach(function (t) { if (f.querySelector('[name=tag_' + t + ']') && f.querySelector('[name=tag_' + t + ']').checked) tagsArr.push(t); });
      ['24h', 'plantao', 'madrugada'].forEach(function (t) { delete obj['tag_' + t]; });
      var m = $('#editMsg'); if(m){m.textContent='Salvando…';m.className='text-sm ml-2 text-silver-500';}
      aPatch('stores', s.id, obj).then(function (ok) {
        if (ok) aPatch('stores', s.id, { tags: tagsArr });
        if (m) { m.textContent = ok ? '✅ Salvo com sucesso!' : '❌ Erro ao salvar'; m.className = 'text-sm ml-2 ' + (ok ? 'text-emerald-600' : 'text-peao-600'); }
        if (ok) setTimeout(function(){ if(m) m.textContent=''; }, 3000);
      });
    });
  }
  function painelOffers(s, offers) {
    var list = offers.map(function (o) {
      return '<div class="bg-white rounded-xl ring-silver p-3 flex items-center gap-3"><div class="flex-1 min-w-0"><p class="font-semibold truncate">' + esc(o.titulo) + '</p><p class="text-xs text-silver-500">' + esc(o.preco_atual || '') + ' - ' + esc(o.status) + (o.termino ? ' — até ' + esc(formatDate(o.termino)) : '') + '</p></div><button data-oftog="' + esc(o.id) + '" data-st="' + (o.status === 'ativa' ? 'arquivada' : 'ativa') + '" class="text-xs font-semibold text-navy-700 hover:underline">' + (o.status === 'ativa' ? 'Arquivar' : 'Ativar') + '</button></div>';
    }).join('');
    return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-5"><h2 class="font-display font-bold mb-3">Ofertas</h2><div class="space-y-2 mb-4">' + (list || '<p class="text-sm text-silver-500">Nenhuma oferta ainda.</p>') + '</div>'
      + '<form id="formOffer" class="grid sm:grid-cols-2 gap-3"><input name="titulo" placeholder="Título da oferta *" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver"><input name="preco_atual" placeholder="Preço (ex.: R$ 29)" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver"><input name="preco_anterior" placeholder="Preço antigo (opcional)" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver"><input name="termino" type="date" class="px-3 py-2 rounded-lg bg-silver-50 ring-silver"><input name="condicoes" placeholder="Condições (opcional)" class="sm:col-span-2 px-3 py-2 rounded-lg bg-silver-50 ring-silver"><input name="imagem" type="file" accept="image/*" class="sm:col-span-2 text-sm"><button class="sm:col-span-2 btn-shine bg-navy-800 hover:bg-navy-700 text-white font-bold py-2.5 rounded-lg">Adicionar oferta</button></form><span id="offerMsg" class="text-sm"></span></div>';
  }
  function wireOffers(s, offers) {
    var f = $('#formOffer');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = { store_id: s.id, status: 'aguardando' };
      var imgFile = f.querySelector('[name=imagem]').files[0];
      new FormData(f).forEach(function (v, k) { if (k !== 'imagem') o[k] = v; });
      var msg = $('#offerMsg');
      if (!o.titulo || !o.titulo.trim()) { msg.className = 'text-sm text-peao-600'; msg.textContent = 'Informe o título.'; return; }
      var limO = (CONFIG.planLimits && CONFIG.planLimits.ofertas[s.plano || 'gratis']) || 1;
      var ativasO = (offers || []).filter(function (oo) { return oo.status === 'ativa'; }).length;
      if (ativasO >= limO) { msg.className = 'text-sm text-peao-600'; msg.textContent = 'Limite de ofertas do seu plano atingido (' + limO + '). Faça upgrade para mais.'; return; }
      function finalizeOferta() { aPost('offers', o).then(function (arr) { var created = arr && arr[0]; if (!created) { msg.className = 'text-sm text-peao-600'; msg.textContent = 'Erro ao criar oferta.'; return; } aPatch('offers', created.id, { status: 'ativa' }).then(function () { loadStoreManage(s); }); }); }
      if (imgFile) { if (!imgFile.type || imgFile.type.indexOf('image/') !== 0 || imgFile.size > 3 * 1024 * 1024) { msg.className = 'text-sm text-peao-600'; msg.textContent = 'Imagem inválida (use até 3MB).'; return; } uploadPhoto(imgFile).then(function (u) { o.imagem_url = u; finalizeOferta(); }); }
      else finalizeOferta();
    });
    document.querySelectorAll('[data-oftog]').forEach(function (b) {
      b.addEventListener('click', function () { aPatch('offers', b.getAttribute('data-oftog'), { status: b.getAttribute('data-st') }).then(function () { loadStoreManage(s); }); });
    });
  }

  /* MAPA INTERATIVO (Leaflet + OpenStreetMap, auto-hospedado) */
  function loadLeaflet() {
    return new Promise(function (res) {
      if (window.L) { res(); return; }
      ['leaflet.css', 'MarkerCluster.css', 'MarkerCluster.Default.css'].forEach(function (f) { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'assets/vendor/' + f; document.head.appendChild(l); });
      var s = document.createElement('script'); s.src = 'assets/vendor/leaflet.js';
      s.onload = function () { var m = document.createElement('script'); m.src = 'assets/vendor/leaflet.markercluster.js'; m.onload = function () { res(); }; m.onerror = function () { res(); }; document.head.appendChild(m); };
      s.onerror = function () { res(); };
      document.head.appendChild(s);
    });
  }
  var BARRETOS = [-20.5578, -48.5686];
  function pinIcon(emoji) { return L.divIcon({ className: '', html: '<div style="font-size:28px;line-height:1;filter:drop-shadow(0 2px 3px rgba(0,0,0,.45))">' + (emoji || '🏪') + '</div>', iconSize: [32, 32], iconAnchor: [16, 30], popupAnchor: [0, -28] }); }
  function haversine(a, b) { var R = 6371, dLat = (b[0] - a[0]) * Math.PI / 180, dLng = (b[1] - a[1]) * Math.PI / 180, x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2); return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)); }
  function pageMapa() {
    var box = $('#mapaBox'); if (!box) return;
    Promise.all([Categories.list(), Stores.list()]).then(function (r) { renderMapaPage(box, r[0], r[1]); });
  }
  function renderMapaPage(box, cats, stores) {
    var comCoords = stores.filter(function (s) { return s.lat && s.lng; });
    var chipsIds = ['all'].concat(cats.map(function (c) { return c.id; }));
    box.innerHTML = '<div class="flex flex-wrap gap-2 mb-4">' + chipsIds.map(function (cid) { var c = cid === 'all' ? { id: 'all', nome: 'Todas', emoji: '📍' } : cats.filter(function (x) { return x.id === cid; })[0]; return '<button data-fcat="' + cid + '" class="filt-btn px-3 py-1.5 rounded-full text-xs font-semibold bg-white ring-silver">' + (c.emoji || '') + ' ' + esc(c.nome) + '</button>'; }).join('') + '</div>'
      + '<button id="btnNear" class="btn-shine bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold px-4 py-2 rounded-xl mb-4">📍 Encontre perto de você</button>'
      + '<div id="leaf" style="height:440px;border-radius:1rem;overflow:hidden" class="ring-silver"></div>'
      + '<div id="nearList" class="mt-4"></div>'
      + '<p class="text-xs text-silver-500 mt-3">' + comCoords.length + ' de ' + stores.length + ' empresas com localização no mapa. Defina a localização no painel da empresa.</p>';
    var active = 'all';
    loadLeaflet().then(function () {
      if (!window.L) { var el = box.querySelector('#leaf'); if (el) el.innerHTML = '<div class="p-6 text-sm text-silver-500">Não foi possível carregar o mapa.</div>'; return; }
      var map = L.map('leaf').setView(BARRETOS, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
      var markers = (L.markerClusterGroup ? L.markerClusterGroup() : L.layerGroup()); markers.addTo(map);
      function apply() {
        markers.clearLayers();
        comCoords.filter(function (s) { return active === 'all' || s.categoria === active; }).forEach(function (s) {
          var c = cats.filter(function (x) { return x.id === s.categoria; })[0];
          var mk = L.marker([s.lat, s.lng], { icon: pinIcon(c ? c.emoji : '🏪') });
          mk.bindPopup('<b>' + esc(s.nome) + '</b><br><span style="color:#64748b;font-size:12px">' + esc(c ? c.nome : '') + '</span><br><a href="loja.html?id=' + encodeURIComponent(s.id) + '">Ver empresa</a> · <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/dir/?api=1&destination=' + s.lat + ',' + s.lng + '">Como chegar</a>');
          markers.addLayer(mk);
        });
        box.querySelectorAll('.filt-btn').forEach(function (b) { b.className = 'filt-btn px-3 py-1.5 rounded-full text-xs font-semibold ' + (b.getAttribute('data-fcat') === active ? 'bg-peao-500 text-white' : 'bg-white ring-silver'); });
      }
      apply();
      box.querySelectorAll('.filt-btn').forEach(function (b) { b.addEventListener('click', function () { active = b.getAttribute('data-fcat'); apply(); }); });
      var btn = $('#btnNear'); if (btn) btn.addEventListener('click', function () {
        if (!navigator.geolocation) { alert('Seu dispositivo não permite obter a localização.'); return; }
        navigator.geolocation.getCurrentPosition(function (pos) {
          var me = [pos.coords.latitude, pos.coords.longitude];
          map.setView(me, 14);
          L.marker(me, { icon: pinIcon('🧭') }).addTo(map).bindPopup('Você está aqui').openPopup();
          var ord = comCoords.map(function (s) { return { s: s, d: haversine(me, [s.lat, s.lng]) }; }).sort(function (a, b) { return a.d - b.d; }).slice(0, 8);
          $('#nearList').innerHTML = '<h3 class="font-display font-bold mb-2">Mais próximas de você</h3><div class="grid sm:grid-cols-2 gap-2">' + ord.map(function (o) { var s = o.s, c = cats.filter(function (x) { return x.id === s.categoria; })[0]; return '<a href="loja.html?id=' + encodeURIComponent(s.id) + '" class="bg-white rounded-xl ring-silver p-3 flex items-center gap-3"><span class="text-2xl">' + (c ? c.emoji : '🏪') + '</span><span><b>' + esc(s.nome) + '</b><br><span class="text-xs text-silver-500">' + (o.d < 1 ? Math.round(o.d * 1000) + ' m' : o.d.toFixed(1) + ' km') + '</span></span></a>'; }).join('') + '</div>';
        }, function () { alert('Não foi possível obter sua localização.'); });
      });
    });
  }
  function painelMapPicker(s) {
    var query = encodeURIComponent([s.endereco,s.bairro,s.cidade||currentCityName()].filter(Boolean).join(', '));
    return '<section class="aquitem-map-panel"><div><p class="text-[11px] text-amber-600 font-bold uppercase tracking-wide">Localização</p><h2 class="font-display font-bold text-xl mt-1">Localização no mapa</h2><p class="text-sm text-silver-500 mt-1">Toque no mapa para ajustar o ponto exato. O endereço continua visível para turistas.</p></div><div id="pickMap" class="aquitem-map-canvas"><div class="aquitem-map-loading">Carregando mapa…</div></div><div class="aquitem-map-actions"><a href="https://www.google.com/maps/search/?api=1&query='+query+'" target="_blank" rel="noopener noreferrer" class="aquitem-secondary-action">Abrir no Google Maps</a><button id="btnSavePin" class="aquitem-primary-action">Salvar localização</button></div><span id="pinMsg" class="text-sm"></span></section>';
  }
  function wireMapPicker(s) {
    var box=$('#pickMap'); if (!box) return; var pin=null; var mapObj=null;
    function geocodeAndUpdateMap(query){
      if(!mapObj||!query||query.length<5)return;
      fetch('https://photon.komoot.io/api/?limit=1&lang=pt&q='+encodeURIComponent(query+', Barretos, SP, Brasil'))
        .then(function(r){return r.json();})
        .then(function(data){
          var feat=data.features&&data.features[0];
          if(!feat||!feat.geometry)return;
          var lat=feat.geometry.coordinates[1], lng=feat.geometry.coordinates[0];
          if(pin)pin.setLatLng([lat,lng]); else pin=L.marker([lat,lng],{icon:pinIcon('📍'),draggable:true}).addTo(mapObj);
          mapObj.setView([lat,lng],16);
          var pm=$('#pinMsg'); if(pm){pm.textContent='📍 Mapa sincronizado com o endereço. Ajuste o pino se necessário.';pm.className='text-sm text-emerald-600';}
        }).catch(function(){});
    }
    loadLeaflet().then(function(){
      if(!window.L){box.innerHTML='<div class="aquitem-map-error">Mapa indisponível agora. Use “Abrir no Google Maps” para conferir o endereço.</div>';return;}
      try {
        mapObj=L.map('pickMap').setView((s.lat&&s.lng)?[s.lat,s.lng]:BARRETOS,15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(mapObj);
        if(s.lat&&s.lng)pin=L.marker([s.lat,s.lng],{icon:pinIcon('📍'),draggable:true}).addTo(mapObj);
        mapObj.on('click',function(e){if(pin)pin.setLatLng(e.latlng);else pin=L.marker(e.latlng,{icon:pinIcon('📍'),draggable:true}).addTo(mapObj);});
        setTimeout(function(){
          mapObj.invalidateSize();
          // Geocodificar endereço atual ao abrir o mapa (se não tiver coords)
          if(!s.lat||!s.lng){
            var formEl=$('#formEdit')||document;
            var endEl=formEl.querySelector('input[name=endereco]'), bairEl=formEl.querySelector('input[name=bairro]');
            var initialAddr=[(endEl?endEl.value.trim():s.endereco||''),(bairEl?bairEl.value.trim():s.bairro||'')].filter(Boolean).join(' ');
            if(initialAddr.length>4) geocodeAndUpdateMap(initialAddr);
          }
        },400);
        var editForm=$('#formEdit')||document;
        var endInput=editForm.querySelector('input[name=endereco]'), bairroInput=editForm.querySelector('input[name=bairro]'); var geoTimer=null;
        function scheduleGeo(){clearTimeout(geoTimer);var addr=(endInput?endInput.value.trim():'')+' '+(bairroInput?bairroInput.value.trim():''); if(addr.trim().length<4)return; geoTimer=setTimeout(function(){geocodeAndUpdateMap(addr.trim());},900);}
        if(endInput){endInput.addEventListener('input',scheduleGeo);endInput.addEventListener('change',scheduleGeo);}
        if(bairroInput){bairroInput.addEventListener('input',scheduleGeo);bairroInput.addEventListener('change',scheduleGeo);}
        var btn=$('#btnSavePin');if(btn)btn.addEventListener('click',function(){var m=$('#pinMsg');if(!pin){m.textContent='Toque no mapa para marcar o local.';m.className='text-sm text-peao-600';return;}var ll=pin.getLatLng();aPatch('stores',s.id,{lat:ll.lat,lng:ll.lng}).then(function(ok){m.textContent=ok?'✓ Localização salva!':'Erro ao salvar localização.';m.className='text-sm '+(ok?'text-emerald-600':'text-peao-600');});});
      } catch(_e){box.innerHTML='<div class="aquitem-map-error">Não foi possível abrir o mapa. Use o Google Maps como alternativa.</div>';}
    });
  }


  function pageObrigado() {
    var el = $('#obg'); if (!el) return;
    document.title = 'Obrigado! · Aqui Tem Achadinhos';
    var p = params();
    var st = (p.get('status') || p.get('collection_status') || '').toLowerCase();
    var ext = p.get('external_reference') || '';
    var quem = '';
    if (ext) { var pp = ext.split(':'); quem = (pp[0] === 'driver') ? 'do seu perfil de motorista' : (pp[0] === 'listing' ? 'do seu anúncio' : 'da sua empresa'); if (pp[2]) quem += ' (Plano ' + (pp[2] === 'pro' ? 'Pro' : 'Destaque') + ')'; }
    var emoji, titulo, texto, ok = true;
    if (st === 'approved' || st === 'authorized' || st === 'accredited') {
      emoji = '🎉'; titulo = 'Tudo certo! Pagamento confirmado.';
      texto = 'Recebemos o pagamento' + (quem ? ' ' + quem : '') + '. <b>Seu plano está sendo ativado agora.</b> Em instantes o selo de Destaque/Pro aparece no seu perfil no guia de Barretos.';
    } else if (st === 'pending' || st === 'in_process' || st === 'pending_contingency') {
      emoji = '⏳'; ok = false; titulo = 'Quase lá! Pagamento em processamento.';
      texto = 'Seu pagamento' + (quem ? ' ' + quem : '') + ' está sendo analisado pelo Mercado Pago. Assim que for confirmado, ativamos seu plano automaticamente — pode deixar com a gente!';
    } else if (st === 'rejected' || st === 'failure' || st === 'cancelled' || st === 'declined') {
      emoji = '😕'; ok = false; titulo = 'Pagamento não concluído.';
      texto = 'Não foi possível concluir o pagamento agora. Sem problema: dá pra tentar de novo. Se travar em algo, chama a gente no WhatsApp.';
    } else {
      emoji = '💚'; titulo = 'Obrigado por fazer parte do Aqui Tem Achadinhos!';
      texto = 'Seu apoio fortalece o comércio de Barretos. 🙏 Se você acabou de assinar um plano, ele será ativado em instantes.';
    }
    var passos = ok ? '<div class="mt-8 text-left"><h3 class="font-display font-bold mb-3 text-center">O que acontece agora</h3><div class="space-y-3">' +
      '<div class="flex gap-3 items-start"><span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold grid place-items-center shrink-0">1</span><p class="text-sm text-slate-600"><b>Ativamos seu plano.</b> Em instantes o selo Destaque/Pro aparece no seu perfil.</p></div>' +
      '<div class="flex gap-3 items-start"><span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold grid place-items-center shrink-0">2</span><p class="text-sm text-slate-600"><b>Mais visibilidade.</b> Você ganha prioridade e destaque nas buscas e no mapa.</p></div>' +
      '<div class="flex gap-3 items-start"><span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold grid place-items-center shrink-0">3</span><p class="text-sm text-slate-600"><b>Aproveite a Festa do Peão.</b> É a época ideal pra ser encontrado em Barretos.</p></div>' +
      '</div></div>' : '';
    el.innerHTML = '<div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16"><div class="bg-white rounded-3xl shadow-soft ring-silver p-8 text-center"><div class="text-6xl mb-3">' + emoji + '</div><h1 class="font-display text-2xl md:text-3xl font-extrabold">' + titulo + '</h1><p class="text-slate-600 mt-3 leading-relaxed">' + texto + '</p>' + passos + '<div class="mt-7 flex flex-col sm:flex-row gap-3 justify-center"><a href="index.html" class="btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold px-6 py-3 rounded-xl">Voltar ao início</a><a href="motoristas.html" class="btn-shine bg-navy-800 hover:bg-navy-700 text-white font-bold px-6 py-3 rounded-xl">Ver no guia</a></div><a href="' + waLink('Oi! Tive uma dúvida sobre meu plano.') + '" target="_blank" rel="noopener noreferrer" class="block mt-5 text-sm text-silver-500 hover:text-navy-700">Precisa de ajuda? Fale no WhatsApp 💬</a></div></div>';
  }

  function assinarPlano(entity, id, plan, email) {
    var fallbackLinks = {
      'store:destaque': 'https://mpago.la/25UHZqr',
      'store:pro': 'https://mpago.la/2HBxp5v',
      'driver:destaque': 'https://mpago.la/2ZSErEf',
      'driver:pro': 'https://mpago.la/11BbdJs',
      'listing:destaque': 'https://mpago.la/25UHZqr'
    };
    var directLink = fallbackLinks[entity + ':' + plan] || fallbackLinks['store:destaque'];

    fetch('/api/upgrade-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity: entity, id: id, plan: plan, email: email })
    }).then(function (r) {
      if (!r.ok) throw new Error('status ' + r.status);
      return r.json();
    }).then(function (j) {
      if (j && j.init_point) {
        window.location.href = j.init_point;
      } else {
        window.location.href = directLink;
      }
    }).catch(function () {
      window.location.href = directLink;
    });
  }
  function wireAssinar() {
    document.querySelectorAll('[data-assinar]').forEach(function (b) {
      if (b.getAttribute('data-bound')) return; b.setAttribute('data-bound', '1');
      b.addEventListener('click', function () {
        var parts = b.getAttribute('data-assinar').split(':');
        var card = b.closest('div'); var ei = card ? card.querySelector('[data-email]') : null;
        var email = ei ? ei.value.trim() : '';
        if (!email || email.indexOf('@') === -1) { alert('Digite seu e-mail para assinar.'); if (ei) ei.focus(); return; }
        assinarPlano(parts[0], parts[1], parts[2], email);
      });
    });
  }
  function upsellCard(entity, id, nome) {
    var claim = nome ? '<a href="' + waLink('Sou o dono de ' + nome + ' e quero reivindicar meu anúncio no Aqui Tem Achadinhos (adicionar meu WhatsApp e detalhes).') + '" target="_blank" rel="noopener noreferrer" class="block text-center text-xs font-semibold text-peao-600 hover:underline mt-3">🙋 Sou o dono — reivindicar anúncio</a>' : '';
    return '<div class="bg-silver-50 ring-silver rounded-xl p-4 mt-4"><p class="text-sm text-silver-200 mb-3">É dono(a) deste perfil?</p><input data-email type="email" placeholder="Seu melhor e-mail" class="w-full px-3 py-2 rounded-xl text-navy-900 mb-3"><div class="flex flex-wrap gap-2"><button data-assinar="' + entity + ':' + id + ':destaque" class="btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold text-sm px-4 py-2 rounded-xl">Assinar Destaque</button><button data-assinar="' + entity + ':' + id + ':pro" class="btn-shine bg-white text-navy-900 font-bold text-sm px-4 py-2 rounded-xl">Assinar Pro</button></div>' + claim + '</div>';
  }

  /* MOTORISTAS / CORRIDAS (diretório: conecta via WhatsApp) */
  var Drivers = {
    list: function () { if (isRemote()) return apiGet('drivers?select=*&status=eq.ativo&order=disponivel_agora.desc,destaque.desc,rating_avg.desc,criado_em.desc'); return Promise.resolve(JSON.parse(localStorage.getItem('ata_drivers') || '[]').filter(function (d) { return d.status === 'ativo'; })); },
    get: function (id) { if (!id) return Promise.resolve(null); if (isRemote()) return apiGet('drivers?select=*&id=eq.' + encodeURIComponent(id) + '&status=eq.ativo').then(function (a) { return a[0] || null; }); return Promise.resolve((JSON.parse(localStorage.getItem('ata_drivers') || '[]').filter(function (d) { return d.id === id; })[0]) || null); },
    create: function (obj) { obj.id = uuid(); obj.status = 'pendente'; obj.criado_em = new Date().toISOString(); return apiPost('drivers', obj).then(function (ok) { return ok ? obj : null; }); },
    reviews: function (id) { if (isRemote()) return apiGet('driver_reviews?select=*&driver_id=eq.' + encodeURIComponent(id) + '&status=eq.ativo&order=criado_em.desc'); return Promise.resolve([]); }
  };
  function driverCard(d) {
    var foto = d.foto_url ? '<img src="' + esc(d.foto_url) + '" alt="' + esc(d.nome) + '" class="w-16 h-16 rounded-2xl object-cover">' : '<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-white text-xl">🚗</div>';
    return '<a href="motorista.html?id=' + encodeURIComponent(d.id) + '" class="card-hover bg-white rounded-2xl p-5 shadow-soft ring-silver text-center"><div class="mx-auto w-fit relative">' + foto + (d.disponivel_agora ? '<span class="absolute -bottom-1 -right-1 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">no ar</span>' : '') + '</div><h3 class="font-display font-bold mt-3">' + esc(d.nome) + '</h3><p class="text-xs text-silver-500">' + esc(d.tipo_veiculo || 'Motorista') + (d.disponibilidade ? ' · ' + esc(d.disponibilidade) : '') + '</p>' + (d.rating_count > 0 ? '<span class="inline-block mt-1 text-[11px] font-semibold text-amber-600">' + ratingMini(d) + '</span>' : '') + (d.plano === 'pro' ? '<span class="inline-block mt-1 text-[10px] font-bold text-white bg-navy-800 px-2 py-0.5 rounded">Pro</span>' : '') + (d.destaque ? '<span class="inline-block mt-1 text-[10px] font-bold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">Destaque</span>' : '') + '</a>';
  }
  function pageMotoristas() {
    var box = $('#motBox'); if (!box) return; box.innerHTML = loadingHTML();
    var filt = params().get('f') || 'all';
    Drivers.list().then(function (drivers) {
      var chips = [{ id: 'all', label: '👥 Todos' }, { id: 'agora', label: '🟢 Disponíveis agora' }, { id: '24h', label: '🕐 24h' }, { id: 'noite', label: '🌙 Noite/madrugada' }];
      var f = function (d) { if (filt === 'agora') return d.disponivel_agora; if (filt === '24h') return (d.disponibilidade || '').indexOf('24') !== -1; if (filt === 'noite') return (d.disponibilidade || '').toLowerCase().indexOf('noite') !== -1; return true; };
      var lista = drivers.filter(f); lista = sortByPlano(lista);
      box.innerHTML = '<div class="flex flex-wrap gap-2 mb-6">' + chips.map(function (ch) { return '<a href="motoristas.html?f=' + ch.id + '" class="px-3 py-1.5 rounded-full text-xs font-semibold ' + (ch.id === filt ? 'bg-peao-500 text-white' : 'bg-white ring-silver') + '">' + ch.label + '</a>'; }).join('') + '</div>' + (lista.length ? '<div class="grid grid-cols-2 md:grid-cols-4 gap-5">' + lista.map(driverCard).join('') + '</div>' : emptyState('Nenhum motorista disponível', 'Conhece motoristas em Barretos? Indique o cadastro — grátis no lançamento!', true));
    });
  }
  function pageMotorista() {
    var el = $('#motPerfil'); if (!el) return; el.innerHTML = loadingHTML();
    var id = params().get('id');
    Drivers.get(id).then(function (d) {
      if (!d) { el.innerHTML = emptyState('Motorista não encontrado', 'Esse perfil não está disponível ou não foi aprovado.', false); return; }
      Drivers.reviews(d.id).then(function (reviews) {
        el.innerHTML = driverProfile(d, reviews);
        document.title = d.nome + ' — motorista em Barretos · Aqui Tem Achadinhos';
        wireDriverReview(d); wireHelpful('driver'); wireAssinar();
      });
    });
  }
  function driverProfile(d, reviews) {
    var wa = 'https://wa.me/' + (digits(d.whatsapp) || CONFIG.whatsapp) + '?text=' + encodeURIComponent('Olá ' + d.nome + '! Vi seu perfil no Aqui Tem Achadinhos e preciso de uma corrida em Barretos.');
    var foto = d.foto_url ? '<img src="' + esc(d.foto_url) + '" alt="" class="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow">' : '<div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-navy-700 to-navy-500 grid place-items-center text-white text-4xl">🚗</div>';
    return '<div class="max-w-3xl mx-auto px-4 sm:px-6 py-6"><a href="motoristas.html" class="text-silver-500 text-sm hover:text-navy-700">← Motoristas</a><div class="mt-3 bg-white rounded-3xl shadow-soft ring-silver p-6"><div class="flex items-center gap-4">' + foto + '<div><div class="flex items-center gap-2 flex-wrap"><span class="text-xs font-semibold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">🚗 Motorista</span>' + (d.disponivel_agora ? '<span class="text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">🟢 Disponível agora</span>' : '') + (d.verificada ? '<span class="text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">✓ Verificado</span>' : '') + '</div><h1 class="font-display text-2xl md:text-3xl font-extrabold mt-1">' + esc(d.nome) + '</h1></div></div><div class="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">' + (d.tipo_veiculo ? '<p>🚙 Veículo: ' + esc(d.tipo_veiculo) + (d.lotacao ? ' · até ' + esc(d.lotacao) + ' pax' : '') + '</p>' : '') + (d.disponibilidade ? '<p>🕐 Disponibilidade: ' + esc(d.disponibilidade) + '</p>' : '') + (d.area ? '<p>🗺️ Atende: ' + esc(d.area) + '</p>' : '') + (d.bairro ? '<p>📍 Base: ' + esc(d.bairro) + '</p>' : '') + (d.telefone ? '<p>☎ ' + esc(d.telefone) + '</p>' : '') + '</div>' + (d.descricao ? '<p class="text-slate-700 mt-3 leading-relaxed">' + esc(d.descricao) + '</p>' : '') + (d.bairro || d.endereco ? '<div class="mt-3 rounded-2xl overflow-hidden ring-silver"><iframe title="Mapa" class="w-full h-48" style="border:0" loading="lazy" src="https://www.google.com/maps?q=' + encodeURIComponent([d.endereco, d.bairro, (d.cidade || 'Barretos')].filter(Boolean).join(', ')) + '&output=embed"></iframe></div>' : '')
      + '<div class="mt-5"><a href="' + wa + '" target="_blank" rel="noopener noreferrer" class="btn-shine bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl">💬 Pedir corrida no WhatsApp</a></div><p class="text-[11px] text-slate-400 mt-3">O Aqui Tem Achadinhos é um diretório: conecta passageiro e motorista via WhatsApp. A corrida e o pagamento são combinados diretamente com o motorista.</p></div><div class="mt-6">' + ratingSummary(d, reviews) + driverReviewForm(d) + reviewList(reviews, 'driver') + upsellCard('driver', d.id, d.nome) + '<a href="' + waLink('Den\u00fancia sobre: ' + d.nome) + '" target="_blank" rel="noopener noreferrer" class="block mt-4 text-center text-xs text-slate-400 hover:text-peao-600">🚩 Denunciar conteúdo incorreto</a></div></div>';
  }
  function driverReviewForm(d) { return reviewForm(d, 'driver'); }
  function wireDriverReview(d) {
    var si = $('#starInput'); if (!si) return; var val = 0;
    function paint(n) { si.querySelectorAll('.star').forEach(function (el, idx) { el.className = 'star cursor-pointer text-3xl transition ' + (idx < n ? 'text-amber-400' : 'text-silver-300 hover:text-amber-400'); }); }
    si.querySelectorAll('.star').forEach(function (el) { function sel() { val = parseInt(el.getAttribute('data-s'), 10); si.setAttribute('data-val', val); paint(val); } el.addEventListener('click', sel); el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); sel(); } }); });
    var f = $('#formReview'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var msg = $('#reviewMsg'); var nota = parseInt(si.getAttribute('data-val'), 10);
      if (!nota || nota < 1) { msg.className = 'text-sm ml-2 text-peao-600'; msg.textContent = 'Selecione de 1 a 5 estrelas.'; return; }
      var o = { driver_id: d.id, nota: nota, nome: f.querySelector('[name=nome]').value.trim(), titulo: f.querySelector('[name=titulo]').value.trim(), perfil: f.querySelector('[name=perfil]').value, comentario: f.querySelector('[name=comentario]').value.trim(), status: 'ativo' };
      fetch(B('driver_reviews'), { method: 'POST', headers: H({ 'Content-Type': 'application/json' }), body: JSON.stringify(o) }).then(function (r) { if (r.ok) { msg.className = 'text-sm ml-2 text-emerald-600'; msg.textContent = '✓ Avaliação enviada! Será publicada após análise.'; f.reset(); val = 0; paint(0); } else { msg.className = 'text-sm ml-2 text-peao-600'; msg.textContent = 'Erro ao enviar. Tente novamente.'; } });
    });
  }
  function pageCadastroMotorista() {
    var form = $('#formMotorista'); if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var o = {}; new FormData(form).forEach(function (v, k) { var el = form.querySelector('[name=' + k + ']'); o[k] = (el && el.type === 'checkbox') ? el.checked : v; });
      if (!o.nome || !o.nome.trim()) { showMsg('#msg', '⚠️ Informe seu nome.', false); return; }
      if (!o.whatsapp || !o.whatsapp.trim()) { showMsg('#msg', '⚠️ Informe seu WhatsApp.', false); return; }
      if (!form.querySelector('[name=aceite]').checked) { showMsg('#msg', '⚠️ É necessário aceitar os termos.', false); return; }
      var btn = form.querySelector('[type=submit]'); btn.disabled = true; btn.textContent = 'Enviando…';
      var fotoFile = form.querySelector('[name=foto]').files[0];
      function go() { o.cidade = 'Barretos'; Drivers.create(o).then(function (ok) { if (!ok) throw 0; form.classList.add('hidden'); $('#motOk').classList.remove('hidden'); window.scrollTo(0, 0); }).catch(function () { showMsg('#msg', '❌ Erro ao enviar. Tente novamente.', false); btn.disabled = false; btn.textContent = 'Cadastrar'; }); }
      if (fotoFile && fotoFile.type.indexOf('image/') === 0 && fotoFile.size <= 3 * 1024 * 1024) { uploadPhoto(fotoFile).then(function (u) { o.foto_url = u; go(); }); } else if (fotoFile) { showMsg('#msg', '❌ Foto inválida (use imagem até 3MB).', false); btn.disabled = false; btn.textContent = 'Cadastrar'; } else go();
    });
  }

  function wireMP() { if (!CONFIG.mp || !CONFIG.mp.links) return; document.querySelectorAll('[data-mp]').forEach(function (el) { var k = el.getAttribute('data-mp'); var link = CONFIG.mp.links[k]; if (link) { el.setAttribute('href', link); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); } }); }

  /* ANALYTICS (privacy-friendly; só ativa se configurado + com consentimento) */
  function loadAnalytics() { var p = CONFIG.analytics.plausible; var s = document.createElement('script'); s.defer = true; s.setAttribute('data-domain', p.domain); s.src = p.src || 'https://plausible.io/js/script.js'; document.head.appendChild(s); }
  function initAnalytics() {
    var d = CONFIG.analytics && CONFIG.analytics.plausible && CONFIG.analytics.plausible.domain;
    if (!d) return;
    var consent = localStorage.getItem('ata_consent');
    if (consent === 'yes') { loadAnalytics(); return; }
    if (consent === 'no') return;
    var b = document.createElement('div');
    b.className = 'fixed bottom-0 inset-x-0 z-[60] bg-navy-950 text-white px-4 py-3 text-sm flex flex-col sm:flex-row items-center gap-3 shadow-2xl';
    b.innerHTML = '<p class="flex-1 text-silver-200">Usamos medição anônima (sem cookies invasivos) para melhorar o guia. Tudo bem?</p><button id="accYes" class="bg-peao-500 hover:bg-peao-600 px-4 py-2 rounded-lg font-semibold">Aceitar</button><button id="accNo" class="text-silver-300 px-3 py-2">Recusar</button>';
    document.body.appendChild(b);
    $('#accYes').addEventListener('click', function () { localStorage.setItem('ata_consent', 'yes'); b.remove(); loadAnalytics(); });
    $('#accNo').addEventListener('click', function () { localStorage.setItem('ata_consent', 'no'); b.remove(); });
  }

  /* ============================================================
     CLASSIFICADOS E VAGAS — Multi-cidades e Nacional (Ultra Completo)
     ============================================================ */
  var CLASSIFIED_CATS = [
    { id: 'vagas-empresa', nome: 'Vagas de Emprego', emoji: '📢', slug: 'vagas', desc: 'Empresas contratando' },
    { id: 'vagas-candidato', nome: 'Banco de Talentos', emoji: '🙋', slug: 'vagas', desc: 'Candidatos e Profissionais (Grátis)' },
    { id: 'imoveis', nome: 'Imóveis', emoji: '🏠', slug: 'imoveis', desc: 'Aluguel, Venda e Temporada' },
    { id: 'veiculos', nome: 'Veículos & Náutica', emoji: '🚗', slug: 'veiculos', desc: 'Carros, Motos, Náutica e Máquinas' },
    { id: 'servicos', nome: 'Serviços Profissionais', emoji: '🔧', slug: 'servicos', desc: 'Reformas, Aulas, Fretes e TI' },
    { id: 'eletronicos', nome: 'Eletrônicos & Tech', emoji: '📱', slug: 'eletronicos', desc: 'Smartphones, PCs e Games' },
    { id: 'agro-campo', nome: 'Agro & Fazendas', emoji: '🌾', slug: 'agro-campo', desc: 'Gado, Tratores e Sítios' },
    { id: 'moda-beleza', nome: 'Moda & Beleza', emoji: '👗', slug: 'moda-beleza', desc: 'Roupas, Calçados e Joias' },
    { id: 'animais', nome: 'Animais & Pets', emoji: '🐾', slug: 'animais', desc: 'Adoção, Acessórios e Cuidados' },
    { id: 'esportes-lazer', nome: 'Esportes & Lazer', emoji: '🏄', slug: 'esportes-lazer', desc: 'Bikes, Fitness e Camping' },
    { id: 'moveis-eletro', nome: 'Móveis & Eletro', emoji: '🛋️', slug: 'moveis-eletro', desc: 'Para casa e escritório' },
    { id: 'eventos-peao', nome: 'Festas & Turismo', emoji: '🤠', slug: 'eventos-peao', desc: 'Ingressos e Hospedagem' },
    { id: 'trocas-doacoes', nome: 'Trocas & Doações', emoji: '🤝', slug: 'trocas-doacoes', desc: 'Escambo e Solidariedade' },
    { id: 'infantil-bebes', nome: 'Infantil & Bebês', emoji: '🍼', slug: 'infantil-bebes', desc: 'Carrinhos, Berços e Brinquedos' },
    { id: 'negocios-comercio', nome: 'Negócios & Atacado', emoji: '💼', slug: 'negocios-comercio', desc: 'Pontos e Lotes' },
    { id: 'nacionais', nome: 'Nacional / Remoto', emoji: '🇧🇷', slug: 'classificados', desc: 'Envio para todo o Brasil' }
  ];
  function catClassified(id, cats) { var c = (cats || CLASSIFIED_CATS).filter(function (x) { return x.id === id; })[0]; return c ? (c.emoji + ' ' + c.nome) : '📋 Anúncio'; }
  function catEmoji(id, cats) { var c = (cats || CLASSIFIED_CATS).filter(function (x) { return x.id === id; })[0]; return c ? (c.emoji || '📋') : '📋'; }

  /* Campos dinâmicos por categoria (vão pra coluna 'atributos' em JSON) */
  var LISTING_FIELDS = {
    'imoveis': [
      { k: 'subcategoria', label: 'Tipo de negócio', type: 'select', opts: [['alugar', 'Aluguel Residencial'], ['vender', 'Venda de Imóvel'], ['temporada', 'Temporada / Festa / Turismo'], ['quartos', 'Quartos / Repúblicas / Co-living'], ['terrenos', 'Terrenos & Lotes'], ['comercial', 'Ponto Comercial / Sala / Galpão'], ['sitios', 'Sítio / Chácara / Fazenda']] },
      { k: 'quartos', label: 'Quartos', ph: 'Ex.: 2' }, { k: 'banheiros', label: 'Banheiros', ph: 'Ex.: 1' },
      { k: 'vagas', label: 'Vagas de garagem', ph: 'Ex.: 1' }, { k: 'area', label: 'Área aproximada (m²)', ph: 'Ex.: 75' }
    ],
    'veiculos': [
      { k: 'subcategoria', label: 'Tipo de veículo', type: 'select', opts: [['carros', 'Carro de Passeio'], ['motos', 'Moto / Ciclomotor'], ['caminhoes', 'Caminhão / Van / Utilitário'], ['nautica', 'Náutica (Barco / Lancha / Jet-ski)'], ['agricola', 'Trator / Máquina Agrícola'], ['pecas', 'Peças / Acessórios / Som'], ['outro', 'Outro Veículo']] },
      { k: 'marca', label: 'Marca / Modelo', ph: 'Ex.: Honda Civic 2.0 / CG 160' },
      { k: 'ano', label: 'Ano de Fabricação/Modelo', ph: 'Ex.: 2022' }, { k: 'km', label: 'Quilometragem (KM)', ph: 'Ex.: 42000' },
      { k: 'cambio', label: 'Câmbio / Combustível', ph: 'Ex.: Automático / Flex' }
    ],
    'vagas-empresa': [
      { k: 'subcategoria', label: 'Tipo de contratação', type: 'select', opts: [['temporario', 'Temporário / Festa do Peão / Eventos'], ['clt', 'CLT (Carteira Assinada)'], ['freelancer', 'Freelancer / Diária'], ['estagio', 'Estágio'], ['pj', 'PJ (Prestador de Serviço)'], ['trainee', 'Trainee'], ['aprendiz', 'Jovem Aprendiz'], ['home-office', 'Home Office / 100% Remoto'], ['hibrido', 'Híbrido']] },
      { k: 'cargo', label: 'Cargo / Função ofertada', ph: 'Ex.: Garçom, Cozinheiro, Atendente, Vendedor' },
      { k: 'jornada', label: 'Horário / Escala de trabalho', ph: 'Ex.: Seg a Sex 8h-18h ou Noturno Peão' },
      { k: 'requisitos', label: 'Requisitos / Experiência', ph: 'Ex.: Ensino Médio, experiência com atendimento' }
    ],
    'vagas-candidato': [
      { k: 'subcategoria', label: 'Disponibilidade', type: 'select', opts: [['temporario', 'Procuro Temporário / Festa do Peão'], ['clt', 'Procuro CLT'], ['freelancer', 'Procuro Freelancer / Diárias'], ['estagio', 'Busco Estágio'], ['pj', 'Sou PJ'], ['home-office', 'Trabalho Remoto / Home Office'], ['viagens', 'Disponível para Viagens']] },
      { k: 'funcao_desejada', label: 'Cargo / Área que procura', ph: 'Ex.: Atendente, Caixa, Garçom, Segurança, Cozinha' },
      { k: 'experiencia', label: 'Resumo das suas experiências', ph: 'Ex.: 3 anos em atendimento e vendas no comércio' },
      { k: 'escolaridade', label: 'Escolaridade / Cursos', ph: 'Ex.: Ensino Médio completo, Informática básica' }
    ],
    'servicos': [
      { k: 'subcategoria', label: 'Área do serviço', type: 'select', opts: [['reformas', 'Reformas, Pedreiro, Pintor, Construção'], ['eletrica', 'Eletricista, Encanador, Ar Condicionado'], ['fretes', 'Fretes, Carretos e Mudanças'], ['beleza', 'Beleza, Estética, Cabelo a domicílio'], ['ti', 'TI, Informática, Sites, Design'], ['eventos', 'Festas, Buffet, Churrasqueiro, Garçom'], ['aulas', 'Aulas particulares, Treinamentos, Personal'], ['faxina', 'Diarista, Limpeza residencial/comercial'], ['outro', 'Outros Serviços']] },
      { k: 'tipo_servico', label: 'Especialidade / Detalhes', ph: 'Ex.: Pintura residencial e impermeabilização' },
      { k: 'disponibilidade', label: 'Dias / Horários de atendimento', ph: 'Ex.: Seg a Sáb das 7h às 19h' }
    ],
    'eletronicos': [
      { k: 'subcategoria', label: 'Tipo de eletrônico', type: 'select', opts: [['celulares', 'Smartphones / Celulares / Tablets'], ['computadores', 'Computadores / Notebooks / Monitores'], ['games', 'Consoles / Jogos / Acessórios Gamer'], ['tv-audio', 'TVs / Caixas de Som / Fones'], ['cameras', 'Câmeras / Drones / Acessórios'], ['outro', 'Outros Tech']] },
      { k: 'estado', label: 'Condição do item', type: 'select', opts: [['novo', 'Novo / Lacrado'], ['semi', 'Seminovo (Excelente estado)'], ['usado', 'Usado (Funcionando perfeitamente)'], ['defeito', 'Com detalhe / Para peças']] },
      { k: 'marca', label: 'Marca / Modelo / Capacidade', ph: 'Ex.: iPhone 14 Pro 128GB / Dell i7 16GB' }
    ],
    'moveis-eletro': [
      { k: 'subcategoria', label: 'Ambiente / Tipo', type: 'select', opts: [['sala', 'Sala de Estar / Sofás / Racks'], ['quarto', 'Quarto / Camas / Guarda-roupas'], ['cozinha', 'Cozinha / Mesas / Armários'], ['eletrodomesticos', 'Geladeiras, Fogões, Máquinas de Lavar'], ['escritorio', 'Escritório / Mesas / Cadeiras Gamer'], ['decoracao', 'Decoração, Tapetes, Cortinas']] },
      { k: 'estado', label: 'Condição', type: 'select', opts: [['novo', 'Novo'], ['semi', 'Seminovo'], ['usado', 'Usado']] }
    ],
    'agro-campo': [
      { k: 'subcategoria', label: 'Segmento agro', type: 'select', opts: [['gado', 'Gado de Corte / Leite / Equinos'], ['tratores', 'Tratores, Colheitadeiras e Implementos'], ['insumos', 'Sementes, Fertilizantes e Rações'], ['fazendas', 'Sítios, Chácaras e Fazendas Rurais'], ['outro', 'Outros Produtos do Campo']] },
      { k: 'detalhe_agro', label: 'Raça / Marca / Quantidade', ph: 'Ex.: Nelore PO / Massey Ferguson 4292 / 50 sacas' }
    ],
    'moda-beleza': [
      { k: 'subcategoria', label: 'Tipo de item', type: 'select', opts: [['feminino', 'Roupas Femininas'], ['masculino', 'Roupas Masculinas'], ['calcados', 'Calçados e Tênis'], ['festas', 'Vestidos de Festa / Ternos'], ['bolsas', 'Bolsas, Malas e Mochilas'], ['joias', 'Joias, Relógios e Semijoias'], ['cosmeticos', 'Perfumes e Cosméticos']] },
      { k: 'tamanho', label: 'Tamanho / Numeração', ph: 'Ex.: M / 38 / 42' }
    ],
    'animais': [
      { k: 'subcategoria', label: 'Tipo', type: 'select', opts: [['adocao', 'Adoção Responsável'], ['acessorios', 'Acessórios, Gaiolas, Rações'], ['servicos-pet', 'Banho & Tosa, Hotelzinho Pet'], ['veterinario', 'Clínica Veterinária / Adestramento']] },
      { k: 'especie', label: 'Espécie / Raça / Porte', ph: 'Ex.: Cão / Golden Retriever / Porte Grande' }
    ],
    'eventos-peao': [
      { k: 'subcategoria', label: 'Tipo de oportunidade', type: 'select', opts: [['temporada', 'Aluguel Temporada / Hospedagem'], ['ingressos', 'Ingressos / Passaportes / Camarotes'], ['transporte', 'Vans, Transfers e Motoristas'], ['estruturas', 'Tendas, Som, Iluminação e Palcos'], ['servicos-evento', 'Segurança, Garçom, Barman, Churrasqueiro']] }
    ],
    'infantil-bebes': [
      { k: 'subcategoria', label: 'Categoria infantil', type: 'select', opts: [['carrinhos', 'Carrinhos, Bebê Conforto e Cadeirinhas'], ['moveis-bebe', 'Berços, Cômodas e Móveis'], ['brinquedos', 'Brinquedos e Jogos Infantis'], ['roupas', 'Roupas e Calçados de Bebê/Criança'], ['enxoval', 'Enxoval e Acessórios']] }
    ],
    'esportes-lazer': [
      { k: 'subcategoria', label: 'Modalidade', type: 'select', opts: [['bikes', 'Bicicletas e Acessórios'], ['fitness', 'Equipamentos Fitness / Musculação'], ['musica', 'Instrumentos Musicais / Áudio'], ['camping', 'Camping, Pesca e Ecoturismo'], ['surf-aquatico', 'Pranchas, Kite, Stand Up, Mergulho'], ['outro', 'Outros Esportes']] }
    ],
    'negocios-comercio': [
      { k: 'subcategoria', label: 'Tipo de negócio', type: 'select', opts: [['pontos', 'Repasse de Ponto Comercial / Loja'], ['atacado', 'Lotes de Mercadorias no Atacado'], ['maquinas-comerciais', 'Máquinas para Indústria/Comércio'], ['franquias', 'Franquias e Oportunidades']] }
    ],
    'trocas-doacoes': [
      { k: 'subcategoria', label: 'Tipo', type: 'select', opts: [['trocas', 'Trocas (Escambo de Produtos)'], ['doacoes', 'Doações Solidárias (Roupas, Móveis, Livros)']] }
    ],
    'nacionais': [
      { k: 'subcategoria', label: 'Tipo de anúncio nacional', type: 'select', opts: [['produtos-envio', 'Produto físico com envio (Correios/Transportadora)'], ['remoto', 'Serviço Digital / Remoto (Atende todo o Brasil)'], ['parcerias', 'Parcerias / Oportunidades Nacionais']] }
    ],
    'vagas-nac-empresa': [
      { k: 'subcategoria', label: 'Modalidade', type: 'select', opts: [['remoto', '100% Remoto / Home Office'], ['clt-nacional', 'CLT Nacional'], ['pj-nacional', 'PJ Nacional'], ['temporario-nac', 'Temporário Nacional']] },
      { k: 'cargo', label: 'Cargo / Função', ph: 'Ex.: Desenvolvedor, Suporte, Vendas Remotas' }
    ],
    'vagas-nac-candidato': [
      { k: 'subcategoria', label: 'Pretensão', type: 'select', opts: [['remoto', 'Aceito Remoto / Home Office'], ['relocacao', 'Disponível para Relocação'], ['clt-qualquer', 'Busco CLT em qualquer cidade'], ['pj-qualquer', 'Busco PJ']] },
      { k: 'funcao_desejada', label: 'Área pretendida', ph: 'Ex.: Marketing Digital, Programação, Atendimento' }
    ],
    'empregos': [
      { k: 'subcategoria', label: 'Contratação', type: 'select', opts: [['temporario', 'Temporário / Peão'], ['clt', 'CLT'], ['freelancer', 'Freelancer'], ['estagio', 'Estágio'], ['pj', 'PJ']] },
      { k: 'salario', label: 'Salário', ph: 'Ex.: R$ 2.000 ou A combinar' }
    ]
  };

  var Classifieds = {
    cats: function () { if (isRemote()) return apiGet('classified_categories?select=*&order=ordem.asc').then(function (a) { return a.length ? a : CLASSIFIED_CATS; }); return Promise.resolve(CLASSIFIED_CATS); },
    list: function (cat) {
      if (!isRemote()) return Promise.resolve([]);
      var base = 'listings?select=*&status=eq.ativo', order = '&order=destaque.desc,criado_em.desc';
      return apiGet(cat ? (base + '&categoria=eq.' + encodeURIComponent(cat) + order) : (base + order));
    },
    get: function (key) {
      if (!key || !isRemote()) return Promise.resolve(null);
      return apiGet('listings?select=*&or=(id.eq.' + encodeURIComponent(key) + ',slug.eq.' + encodeURIComponent(key) + ')&status=eq.ativo').then(function (a) { return a[0] || null; });
    },
    photos: function (lid) { if (isRemote()) return apiGet('listings_photos?select=id,url&listing_id=eq.' + encodeURIComponent(lid) + '&order=criado_em.asc'); return Promise.resolve([]); },
    create: function (obj) { obj.id = uuid(); obj.status = 'pendente'; obj.criado_em = new Date().toISOString(); return apiPost('listings', obj).then(function (ok) { return ok ? obj : null; }); },
    search: function (q) { q = (q || '').trim(); if (!q) return Classifieds.list(); if (!isRemote()) return Promise.resolve([]); var t = encodeURIComponent(q); return apiGet('listings?select=*&status=eq.ativo&or=(titulo.ilike.*' + t + '*,descricao.ilike.*' + t + '*,bairro.ilike.*' + t + '*,subcategoria.ilike.*' + t + '*)&order=destaque.desc,criado_em.desc'); }
  };

  function listingCard(l, cats) {
    var capa = l.foto_capa_url
      ? '<img src="' + esc(l.foto_capa_url) + '" alt="' + esc(l.titulo) + '" class="h-44 w-full object-cover group-hover:scale-105 transition duration-300" loading="lazy">'
      : '<div class="h-44 w-full grid place-items-center text-5xl bg-gradient-to-br from-navy-800 to-navy-600">' + esc(catEmoji(l.categoria, cats)) + '</div>';

    var cObj = (cats || CLASSIFIED_CATS).filter(function (x) { return x.id === l.categoria; })[0];
    var catName = cObj ? (cObj.emoji + ' ' + cObj.nome) : '📋 Classificado';
    var isNational = l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional';
    var uf = CITY_UFS[l.city_slug] || (l.cidade === 'Barretos' ? 'SP' : (l.cidade === 'Gramado' ? 'RS' : (l.cidade === 'Uberlândia' ? 'MG' : (l.cidade === 'Florianópolis' ? 'SC' : (l.cidade === 'Salvador' ? 'BA' : 'SP')))));
    var cityLabel = (l.cidade || 'Barretos') + (uf && uf !== 'BR' ? '/' + uf : '');
    var local = isNational ? '🌐 Brasil Todo (Nacional / Remoto)' : ([l.bairro, cityLabel].filter(Boolean).join(' · '));

    var waMsg = 'Olá! Vi seu anúncio "' + l.titulo + '" no Aqui Tem Achadinhos e tenho interesse.';
    var wa = 'https://wa.me/' + (digits(l.whatsapp) || CONFIG.whatsapp) + '?text=' + encodeURIComponent(waMsg);

    return '<div class="card-hover bg-white rounded-3xl overflow-hidden shadow-soft ring-silver flex flex-col justify-between group border border-white/5">' +
      '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="block">' +
        '<div class="relative overflow-hidden">' +
          capa +
          (l.destaque ? '<span class="absolute top-2.5 right-2.5 text-[11px] font-extrabold text-amber-950 bg-amber-400 px-2 py-0.5 rounded-lg shadow-md flex items-center gap-1">⭐ Destaque</span>' : '') +
          (l.subcategoria ? '<span class="absolute top-2.5 left-2.5 text-[10px] font-bold text-white bg-navy-950/80 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">' + esc(l.subcategoria.toUpperCase()) + '</span>' : '') +
        '</div>' +
        '<div class="p-4">' +
          '<div class="text-[10px] font-bold text-peao-400 uppercase tracking-wider">' + esc(catName) + '</div>' +
          '<h3 class="font-display font-bold text-base mt-1 text-white group-hover:text-peao-400 transition line-clamp-2 leading-snug">' + esc(l.titulo) + '</h3>' +
          (l.preco ? '<p class="text-emerald-400 font-extrabold text-lg mt-1.5">💰 ' + esc(l.preco) + '</p>' : '') +
          (local ? '<p class="text-xs text-silver-400 mt-2 truncate">📍 ' + esc(local) + '</p>' : '') +
        '</div>' +
      '</a>' +
      '<div class="px-4 pb-4 pt-1 flex items-center gap-2">' +
        '<a href="' + wa + '" target="_blank" rel="noopener noreferrer" class="btn-shine flex-1 text-center bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition shadow-soft flex items-center justify-center gap-1.5">' +
          '💬 WhatsApp' +
        '</a>' +
        '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="text-xs font-semibold text-silver-400 hover:text-white px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition" title="Ver detalhes">' +
          'Detalhes →' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  /* ============================================================
     SUPER PORTAL DE CLASSIFICADOS NACIONAL (AQUITEM BRASIL)
     ============================================================ */
  function pageClassificadosHub() {
    var gridRoot = $('#classGridRoot') || $('#classGrid');
    var catsGrid = $('#classCatsGrid');
    var subChipsBox = $('#classSubChips');
    var totalCountEl = $('#totalClassCount');
    var resHeader = $('#classResultsHeader');

    if (!gridRoot) return;
    gridRoot.innerHTML = loadingHTML();

    var selectedCat = params().get('cat') || 'all';
    var activeSub = '';
    var searchQuery = '';
    var selectedCity = '';
    var sortOrder = 'destaque';
    var allListings = [];
    var cats = CLASSIFIED_CATS;

    var pCity = params().get('cidade') || params().get('c') || '';
    var citySel = $('#classCityFilter');
    if (citySel) {
      if (pCity && citySel.querySelector('option[value="' + pCity + '"]')) {
        citySel.value = pCity;
        selectedCity = pCity;
      } else {
        selectedCity = citySel.value || '';
      }
      citySel.addEventListener('change', function () {
        selectedCity = this.value || '';
        renderListings();
      });
    }

    var sortSel = $('#classSortFilter');
    if (sortSel) {
      sortOrder = sortSel.value || 'destaque';
      sortSel.addEventListener('change', function () {
        sortOrder = this.value;
        renderListings();
      });
    }

    var sInp = $('#classSearchInput');
    if (sInp) {
      var timer = null;
      sInp.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          searchQuery = (sInp.value || '').trim().toLowerCase();
          renderListings();
        }, 200);
      });
    }

    var SUB_OPTS = {
      'imoveis': [
        { k: '', l: 'Todos Imóveis' }, { k: 'alugar', l: '🔑 Aluguel' }, { k: 'vender', l: '🏷️ Venda' },
        { k: 'temporada', l: '🤠 Temporada / Peão' }, { k: 'quartos', l: '🛏️ Quartos / Repúblicas' },
        { k: 'terrenos', l: '📐 Terrenos / Lotes' }, { k: 'comercial', l: '🏢 Salas & Galpões' }, { k: 'sitios', l: '🌳 Sítios / Chácaras' }
      ],
      'veiculos': [
        { k: '', l: 'Todos Veículos' }, { k: 'carros', l: '🚗 Carros' }, { k: 'motos', l: '🏍️ Motos' },
        { k: 'caminhoes', l: '🚚 Caminhões / Vans' }, { k: 'nautica', l: '🚤 Náutica / Jet' },
        { k: 'agricola', l: '🚜 Tratores & Máquinas' }, { k: 'pecas', l: '⚙️ Peças & Acessórios' }
      ],
      'vagas-empresa': [
        { k: '', l: 'Todas as Vagas' }, { k: 'temporario', l: '🤠 Temporário / Peão' }, { k: 'clt', l: '📋 CLT' },
        { k: 'freelancer', l: '⚡ Freelancer' }, { k: 'estagio', l: '🎓 Estágio / Aprendiz' }, { k: 'pj', l: '🏢 PJ' }, { k: 'home-office', l: '💻 100% Remoto' }
      ],
      'vagas-candidato': [
        { k: '', l: 'Todos os Candidatos' }, { k: 'temporario', l: '🤠 Disponível Peão' }, { k: 'clt', l: '💼 Busca CLT' },
        { k: 'freelancer', l: '⚡ Freelancer' }, { k: 'estagio', l: '🎓 Estágio' }, { k: 'remoto', l: '💻 Remoto' }
      ],
      'servicos': [
        { k: '', l: 'Todos Serviços' }, { k: 'reformas', l: '🔨 Reformas & Construção' }, { k: 'eletrica', l: '⚡ Elétrica & Ar' },
        { k: 'fretes', l: '📦 Fretes & Mudanças' }, { k: 'beleza', l: '✂️ Beleza & Estética' }, { k: 'ti', l: '💻 TI & Design' },
        { k: 'eventos', l: '🎉 Festas & Buffet' }, { k: 'aulas', l: '📚 Aulas & Cursos' }
      ],
      'eletronicos': [
        { k: '', l: 'Todos Eletrônicos' }, { k: 'celulares', l: '📱 Smartphones' }, { k: 'computadores', l: '💻 PCs & Notebooks' },
        { k: 'games', l: '🎮 Games & Consoles' }, { k: 'tv-audio', l: '📺 TVs & Áudio' }
      ],
      'moda-beleza': [
        { k: '', l: 'Toda Moda' }, { k: 'country', l: '🤠 Country & Botas' }, { k: 'feminino', l: '👗 Feminino' },
        { k: 'masculino', l: '👔 Masculino' }, { k: 'calcados', l: '👟 Calçados' }, { k: 'acessorios', l: '👜 Bolsas & Joias' }
      ],
      'moveis-eletro': [
        { k: '', l: 'Todos Móveis' }, { k: 'sala', l: '🛋️ Sala & Sofás' }, { k: 'quarto', l: '🛏️ Quartos & Camas' },
        { k: 'cozinha', l: '🍳 Eletrodomésticos' }, { k: 'decoracao', l: '🖼️ Decoração' }
      ],
      'agro-campo': [
        { k: '', l: 'Todo o Agro' }, { k: 'gado', l: '🐂 Gado & Bovinos' }, { k: 'equinos', l: '🐎 Cavalos' },
        { k: 'tratores', l: '🚜 Tratores & Implementos' }, { k: 'fazendas', l: '🌾 Sítios & Fazendas' }, { k: 'insumos', l: '🌱 Sementes & Adubos' }
      ]
    };

    function renderSubChips() {
      if (!subChipsBox) return;
      var opts = SUB_OPTS[selectedCat] || [];
      if (!opts.length || selectedCat === 'all' || selectedCat === 'nacionais') {
        subChipsBox.innerHTML = '';
        subChipsBox.classList.add('hidden');
        return;
      }
      subChipsBox.classList.remove('hidden');
      subChipsBox.innerHTML = opts.map(function (o) {
        var isAct = activeSub === o.k;
        return '<button type="button" data-sub-chip="' + esc(o.k) + '" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition ' + (isAct ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:bg-white/10') + '">' + esc(o.l) + '</button>';
      }).join('');

      subChipsBox.querySelectorAll('[data-sub-chip]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          activeSub = btn.getAttribute('data-sub-chip') || '';
          renderSubChips();
          renderListings();
        });
      });
    }

    function renderCatPills() {
      if (!catsGrid) return;
      var pillAll = '<button type="button" data-class-cat="all" class="class-cat-btn px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ' + (selectedCat === 'all' ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:bg-white/10') + '"><span>🔥</span> Todos (' + allListings.length + ')</button>';
      
      var pills = cats.map(function (c) {
        var cnt = allListings.filter(function (l) {
          if (c.id === 'vagas-empresa') return l.categoria === 'vagas-empresa' || l.categoria === 'empregos';
          if (c.id === 'vagas-candidato') return l.categoria === 'vagas-candidato';
          if (c.id === 'nacionais') return l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional';
          return l.categoria === c.id;
        }).length;
        var isSel = selectedCat === c.id;
        return '<button type="button" data-class-cat="' + esc(c.id) + '" class="class-cat-btn px-4 py-2 rounded-2xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ' + (isSel ? 'bg-peao-500 text-white shadow-soft' : 'bg-white text-silver-300 ring-silver hover:bg-white/10') + '"><span>' + c.emoji + '</span> ' + esc(c.nome) + ' <span class="opacity-75 text-[10px]">(' + cnt + ')</span></button>';
      }).join('');

      catsGrid.innerHTML = pillAll + pills;

      catsGrid.querySelectorAll('[data-class-cat]').forEach(function (btn) {
        btn.onclick = function (e) {
          e.preventDefault();
          selectedCat = btn.getAttribute('data-class-cat') || 'all';
          activeSub = '';
          renderCatPills();
          renderSubChips();
          renderListings();
        };
      });
    }

    function renderListings() {
      var filtered = allListings.slice();

      if (selectedCat !== 'all') {
        if (selectedCat === 'nacionais') {
          filtered = filtered.filter(function (l) { return l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional'; });
        } else if (selectedCat === 'vagas-empresa') {
          filtered = filtered.filter(function (l) { return l.categoria === 'vagas-empresa' || l.categoria === 'empregos'; });
        } else {
          filtered = filtered.filter(function (l) { return l.categoria === selectedCat; });
        }
      }

      if (selectedCity && selectedCat !== 'nacionais') {
        filtered = filtered.filter(function (l) {
          var cSlug = (l.city_slug || '').toLowerCase();
          var cName = (l.cidade || '').toLowerCase();
          var sel = selectedCity.toLowerCase();
          return cSlug === sel || cName === sel || cName.indexOf(sel) !== -1 || l.city_slug === 'nacional';
        });
      }

      if (activeSub) {
        filtered = filtered.filter(function (l) {
          var sub = ((l.subcategoria || '') + ' ' + JSON.stringify(l.atributos || '')).toLowerCase();
          return sub.indexOf(activeSub) !== -1;
        });
      }

      if (searchQuery) {
        filtered = filtered.filter(function (l) {
          var haystack = [l.titulo, l.descricao, l.anunciante_nome, l.bairro, l.cidade, l.preco, JSON.stringify(l.atributos || '')].filter(Boolean).join(' ').toLowerCase();
          return haystack.indexOf(searchQuery) !== -1;
        });
      }

      if (sortOrder === 'destaque') {
        filtered.sort(function (a, b) { return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0); });
      } else if (sortOrder === 'recentes') {
        filtered.sort(function (a, b) { return new Date(b.criado_em || 0) - new Date(a.criado_em || 0); });
      } else if (sortOrder === 'menor_preco') {
        filtered.sort(function (a, b) {
          var pa = parseFloat(String(a.preco || '').replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
          var pb = parseFloat(String(b.preco || '').replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
          return pa - pb;
        });
      } else if (sortOrder === 'maior_preco') {
        filtered.sort(function (a, b) {
          var pa = parseFloat(String(a.preco || '').replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
          var pb = parseFloat(String(b.preco || '').replace(/[^0-9,.]/g, '').replace(',', '.')) || 0;
          return pb - pa;
        });
      }

      if (resHeader) {
        var catObj = cats.filter(function (x) { return x.id === selectedCat; })[0];
        var catTitle = catObj ? (catObj.emoji + ' ' + catObj.nome) : '🔥 Todos os Anúncios';
        var cDisplay = selectedCity ? (CITY_NAMES[selectedCity] || selectedCity) : 'Brasil Todo';
        resHeader.textContent = catTitle + ' em ' + cDisplay + ' (' + filtered.length + ')';
      }

      if (!filtered.length) {
        gridRoot.innerHTML = '<div class="col-span-full bg-white rounded-3xl p-10 text-center ring-silver shadow-soft max-w-xl mx-auto my-8">' +
          '<div class="text-5xl mb-3">🔍</div>' +
          '<h3 class="font-display font-bold text-xl text-white">Nenhum anúncio encontrado</h3>' +
          '<p class="text-silver-400 text-sm mt-2">Seja o primeiro a anunciar nesta categoria! Cadastro rápido e gratuito.</p>' +
          '<a href="cadastro-anuncio.html' + (selectedCat !== 'all' ? '?cat=' + encodeURIComponent(selectedCat) : '') + '" class="btn-shine inline-block mt-6 bg-peao-500 hover:bg-peao-600 text-white font-bold px-6 py-3 rounded-xl shadow-redglow">📢 Criar Anúncio Grátis</a>' +
        '</div>';
        return;
      }

      gridRoot.innerHTML = filtered.map(function (l) { return listingCard(l, cats); }).join('');
    }

    apiGet('listings?select=*&status=eq.ativo&order=destaque.desc,criado_em.desc').then(function (all) {
      allListings = all || [];
      cats = CLASSIFIED_CATS;
      if (totalCountEl) totalCountEl.textContent = allListings.length + ' anúncios ativos';
      renderCatPills();
      renderSubChips();
      renderListings();
    }).catch(function (err) {
      console.error('[Classificados Load Error]:', err);
      gridRoot.innerHTML = '<div class="col-span-full text-center py-12 text-silver-400">Erro ao carregar anúncios. <button onclick="location.reload()" class="underline text-amber-400">Tentar novamente</button></div>';
    });
  }

  /* ============================================================
     PÁGINA DEDICADA DE VAGAS E BANCO DE TALENTOS
     ============================================================ */
  /* ============================================================
     HUB DE VAGAS & RECRUTAMENTO NACIONAL (AQUITEM BRASIL)
     ============================================================ */
  function pageVagas() {
    var root = $('#vagasRoot'); if (!root) return;
    root.innerHTML = loadingHTML();

    var currentTab = 'empresa';
    var activeSub = '';
    var searchQuery = '';
    var selectedCity = '';
    var allListings = [];
    var cats = CLASSIFIED_CATS;

    // Check URL parameters (?cidade=... or ?tab=... or ?q=...)
    var pCity = params().get('cidade') || params().get('c') || '';
    var pTab = params().get('tab') || '';
    if (pTab && ['empresa','candidato','nacional','all'].indexOf(pTab) !== -1) {
      currentTab = pTab;
    }

    var citySel = $('#vagasCityFilter');
    if (citySel) {
      if (pCity && citySel.querySelector('option[value="' + pCity + '"]')) {
        citySel.value = pCity;
        selectedCity = pCity;
      } else {
        selectedCity = citySel.value || '';
      }
      citySel.addEventListener('change', function () {
        selectedCity = this.value || '';
        render();
      });
    }

    var sInp = $('#vagasSearchInput');
    if (sInp) {
      var timer = null;
      sInp.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          searchQuery = (sInp.value || '').trim().toLowerCase();
          render();
        }, 200);
      });
    }

    function renderSubFilters() {
      var subBox = $('#vagasSubFilters'); if (!subBox) return;
      var subLabels = {
        'empresa': [
          { k: '', l: 'Todos' }, { k: 'temporario', l: '🤠 Temporário / Peão' }, { k: 'clt', l: '📋 CLT' },
          { k: 'freelancer', l: '⚡ Freelancer / Diária' }, { k: 'estagio', l: '🎓 Estágio' },
          { k: 'pj', l: '🏢 PJ' }, { k: 'home-office', l: '💻 Remoto / Home Office' }
        ],
        'candidato': [
          { k: '', l: 'Todos os Candidatos' }, { k: 'temporario', l: '🤠 Disponível Peão' }, { k: 'clt', l: '💼 Busca CLT' },
          { k: 'freelancer', l: '⚡ Freelancer' }, { k: 'estagio', l: '🎓 Estágio' }, { k: 'remoto', l: '💻 Home Office' }
        ],
        'nacional': [
          { k: '', l: 'Todas as Oportunidades' }, { k: 'remoto', l: '💻 100% Remoto' }, { k: 'clt-nacional', l: '🇧🇷 CLT Nacional' },
          { k: 'pj-nacional', l: '🏢 PJ Nacional' }
        ],
        'all': [
          { k: '', l: 'Todos' }, { k: 'temporario', l: '🤠 Temporário' }, { k: 'clt', l: '📋 CLT' },
          { k: 'freelancer', l: '⚡ Freelancer' }, { k: 'estagio', l: '🎓 Estágio' }
        ]
      };
      var list = subLabels[currentTab] || subLabels['empresa'];
      subBox.innerHTML = list.map(function (item) {
        var isAct = activeSub === item.k;
        return '<button type="button" data-vsub="' + esc(item.k) + '" class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition ' + (isAct ? 'bg-navy-800 text-white ring-1 ring-peao-500 shadow-sm' : 'bg-white text-silver-300 ring-silver hover:bg-white/10') + '">' + esc(item.l) + '</button>';
      }).join('');
      subBox.querySelectorAll('[data-vsub]').forEach(function (b) {
        b.addEventListener('click', function () {
          activeSub = b.getAttribute('data-vsub') || '';
          renderSubFilters();
          render();
        });
      });
    }

    function wireTabButtons() {
      document.querySelectorAll('[data-vagas-tab]').forEach(function (btn) {
        var tabId = btn.getAttribute('data-vagas-tab');
        if (tabId === currentTab) {
          btn.classList.remove('bg-white', 'text-silver-300', 'ring-silver');
          btn.classList.add('bg-peao-500', 'text-white', 'shadow-soft');
        } else {
          btn.classList.remove('bg-peao-500', 'text-white', 'shadow-soft');
          btn.classList.add('bg-white', 'text-silver-300', 'ring-silver');
        }
        btn.onclick = function (e) {
          e.preventDefault();
          document.querySelectorAll('[data-vagas-tab]').forEach(function (b) {
            b.classList.remove('bg-peao-500', 'text-white', 'shadow-soft');
            b.classList.add('bg-white', 'text-silver-300', 'ring-silver');
          });
          btn.classList.remove('bg-white', 'text-silver-300', 'ring-silver');
          btn.classList.add('bg-peao-500', 'text-white', 'shadow-soft');
          currentTab = btn.getAttribute('data-vagas-tab') || 'empresa';
          activeSub = '';
          renderSubFilters();
          render();
        };
      });
    }

    function vagaCardHTML(l) {
      var isCandidate = l.categoria === 'vagas-candidato' || l.categoria === 'vagas-nac-candidato';
      var isNational = l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional';
      
      var waMsg = isCandidate
        ? ('Olá ' + (l.anunciante_nome || '') + '! Vi seu perfil profissional ("' + l.titulo + '") no Aqui Tem Achadinhos e gostaria de conversar.')
        : ('Olá! Vi a vaga de "' + l.titulo + '" no Aqui Tem Achadinhos e gostaria de me candidatar.');
      var wa = 'https://wa.me/' + (digits(l.whatsapp) || CONFIG.whatsapp) + '?text=' + encodeURIComponent(waMsg);

      var tagBadge = isCandidate
        ? '<span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mr-1.5">🙋 Candidato</span>'
        : '<span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-peao-500/20 text-peao-400 border border-peao-500/30 mr-1.5">📢 Vaga Aberta</span>';

      var modalidade = l.subcategoria || (l.atributos && l.atributos.subcategoria) || '';
      var modBadge = modalidade ? ('<span class="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/10 text-silver-200 mr-1.5">' + esc(modalidade.toUpperCase()) + '</span>') : '';
      var destBadge = l.destaque ? '<span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 mr-1.5">⭐ Destaque</span>' : '';
      var nacBadge = isNational ? '<span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🇧🇷 Nacional / Remoto</span>' : '';

      var preco = l.preco ? '<div class="mt-2 text-sm font-extrabold text-emerald-400 flex items-center gap-1.5"><span>💰</span><span>' + esc(l.preco) + '</span></div>' : '';
      var desc = l.descricao ? '<p class="text-xs text-silver-300 mt-2 line-clamp-3 leading-relaxed">' + esc(l.descricao) + '</p>' : '';
      var anunciante = l.anunciante_nome ? '<span class="font-semibold text-white">' + esc(l.anunciante_nome) + '</span>' : '';

      var uf = CITY_UFS[l.city_slug] || (l.cidade === 'Barretos' ? 'SP' : (l.cidade === 'Gramado' ? 'RS' : (l.cidade === 'Uberlândia' ? 'MG' : (l.cidade === 'Florianópolis' ? 'SC' : (l.cidade === 'Salvador' ? 'BA' : 'SP')))));
      var cityLabel = (l.cidade || 'Barretos') + (uf && uf !== 'BR' ? '/' + uf : '');
      var local = isNational ? '🌐 Brasil Todo (Remoto)' : ([l.bairro, cityLabel].filter(Boolean).join(' · '));

      var btnLabel = isCandidate ? '💬 Entrevistar no WhatsApp' : '💬 Candidatar-se via WhatsApp';
      var btnBg = isCandidate ? 'bg-purple-600 hover:bg-purple-700' : 'bg-peao-500 hover:bg-peao-600';

      return '<div class="bg-white rounded-2xl ring-silver shadow-soft p-5 flex flex-col justify-between card-hover border border-white/5 relative">' +
        '<div>' +
          '<div class="flex items-center gap-1.5 flex-wrap mb-2.5">' + tagBadge + modBadge + destBadge + nacBadge + '</div>' +
          '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="block group">' +
            '<h3 class="font-display font-bold text-lg text-white group-hover:text-peao-400 transition leading-snug">' + esc(l.titulo) + '</h3>' +
          '</a>' +
          '<div class="text-xs text-silver-400 mt-1 flex items-center gap-2 flex-wrap">' +
            (anunciante ? '<span>🏢 ' + anunciante + '</span>' : '') +
            (local ? '<span>📍 ' + esc(local) + '</span>' : '') +
          '</div>' +
          preco + desc +
        '</div>' +
        '<div class="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">' +
          '<a href="' + wa + '" target="_blank" rel="noopener noreferrer" class="btn-shine flex-1 text-center text-xs font-bold text-white py-2.5 px-4 rounded-xl ' + btnBg + ' transition shadow-soft flex items-center justify-center gap-1.5">' +
            btnLabel +
          '</a>' +
          '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="text-xs font-semibold text-silver-400 hover:text-white px-2 py-2 transition" title="Ver detalhes">' +
            'Detalhes →' +
          '</a>' +
        '</div>' +
      '</div>';
    }

    function render() {
      var filtered = allListings.slice();

      if (currentTab === 'empresa') {
        filtered = filtered.filter(function (l) { return l.categoria === 'vagas-empresa' || l.categoria === 'empregos'; });
      } else if (currentTab === 'candidato') {
        filtered = filtered.filter(function (l) { return l.categoria === 'vagas-candidato'; });
      } else if (currentTab === 'nacional') {
        filtered = filtered.filter(function (l) { return l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional'; });
      }

      if (selectedCity && currentTab !== 'nacional') {
        filtered = filtered.filter(function (l) {
          var cSlug = (l.city_slug || '').toLowerCase();
          var cName = (l.cidade || '').toLowerCase();
          var sel = selectedCity.toLowerCase();
          return cSlug === sel || cName === sel || cName.indexOf(sel) !== -1 || l.city_slug === 'nacional';
        });
      }

      if (activeSub) {
        filtered = filtered.filter(function (l) {
          var sub = ((l.subcategoria || '') + ' ' + JSON.stringify(l.atributos || '')).toLowerCase();
          if (activeSub === 'temporario') return sub.indexOf('temp') !== -1 || sub.indexOf('peao') !== -1;
          if (activeSub === 'clt') return sub.indexOf('clt') !== -1;
          if (activeSub === 'freelancer') return sub.indexOf('free') !== -1 || sub.indexOf('diaria') !== -1;
          if (activeSub === 'estagio') return sub.indexOf('estag') !== -1 || sub.indexOf('aprendiz') !== -1;
          if (activeSub === 'pj') return sub.indexOf('pj') !== -1;
          if (activeSub === 'home-office' || activeSub === 'remoto') return sub.indexOf('remoto') !== -1 || sub.indexOf('home') !== -1;
          return sub.indexOf(activeSub) !== -1;
        });
      }

      if (searchQuery) {
        filtered = filtered.filter(function (l) {
          var haystack = [l.titulo, l.descricao, l.anunciante_nome, l.bairro, l.cidade, l.preco, JSON.stringify(l.atributos || '')].filter(Boolean).join(' ').toLowerCase();
          return haystack.indexOf(searchQuery) !== -1;
        });
      }

      if (!filtered.length) {
        var emptyTitle = currentTab === 'candidato'
          ? 'Nenhum perfil de candidato encontrado'
          : (currentTab === 'nacional' ? 'Nenhuma vaga nacional no momento' : 'Nenhuma vaga de emprego encontrada');
        var emptyDesc = currentTab === 'candidato'
          ? 'Seja o primeiro profissional a cadastrar seu perfil na cidade. É 100% grátis!'
          : 'Sua empresa precisa de funcionários? Cadastre uma vaga gratuitamente agora!';
        var ctaUrl = currentTab === 'candidato' ? 'cadastro-anuncio.html?cat=vagas-candidato' : 'cadastro-anuncio.html?cat=vagas-empresa';
        var ctaText = currentTab === 'candidato' ? '🙋 Cadastrar meu Perfil Grátis' : '📢 Anunciar Vaga Grátis';

        root.innerHTML = '<div class="bg-white rounded-3xl p-10 text-center ring-silver shadow-soft max-w-xl mx-auto my-8">' +
          '<div class="text-5xl mb-3">💼</div>' +
          '<h3 class="font-display font-bold text-xl text-white">' + esc(emptyTitle) + '</h3>' +
          '<p class="text-silver-400 text-sm mt-2 leading-relaxed">' + esc(emptyDesc) + '</p>' +
          '<a href="' + ctaUrl + '" class="btn-shine inline-block mt-6 bg-peao-500 hover:bg-peao-600 text-white font-bold px-6 py-3 rounded-xl shadow-redglow">' + esc(ctaText) + '</a>' +
        '</div>';
        return;
      }

      root.innerHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">' +
        filtered.map(vagaCardHTML).join('') +
      '</div>';
    }

    // Initial load
    wireTabButtons();
    renderSubFilters();

    Promise.all([
      Classifieds.cats(),
      apiGet('listings?select=*&status=eq.ativo&or=(categoria.eq.vagas-empresa,categoria.eq.vagas-candidato,categoria.eq.vagas-nac-empresa,categoria.eq.vagas-nac-candidato,categoria.eq.nacionais,categoria.eq.empregos)&order=destaque.desc,criado_em.desc')
    ]).then(function (res) {
      cats = res[0] || CLASSIFIED_CATS;
      allListings = res[1] || [];

      var cEmp = allListings.filter(function (l) { return l.categoria === 'vagas-empresa' || l.categoria === 'empregos'; }).length;
      var cCand = allListings.filter(function (l) { return l.categoria === 'vagas-candidato'; }).length;
      var cNac = allListings.filter(function (l) { return l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional'; }).length;

      var elEmp = $('#countVagasEmpresa'); if (elEmp) elEmp.textContent = cEmp;
      var elCand = $('#countVagasCandidato'); if (elCand) elCand.textContent = cCand;
      var elNac = $('#countVagasNac'); if (elNac) elNac.textContent = cNac;

      wireTabButtons();
      renderSubFilters();
      render();
    }).catch(function(err) {
      console.error('[Vagas Load Error]:', err);
      root.innerHTML = '<div class="text-center py-12 text-silver-400">Erro ao carregar vagas. <button onclick="location.reload()" class="underline text-amber-400">Tentar novamente</button></div>';
    });
  }

  function pageListings() {
    var root = $('#listingsRoot'); if (!root) return; root.innerHTML = loadingHTML();
    var cat = params().get('cat') || document.body.dataset.cat || '';
    Promise.all([Classifieds.cats(), Classifieds.list(cat)]).then(function (r) {
      var cats = r[0], all = r[1];
      var c = cats.filter(function (x) { return x.id === cat; })[0];
      var titleEl = $('#listingsTitle'); if (titleEl) titleEl.textContent = c ? (c.emoji + ' ' + c.nome) : 'Todos os anúncios';
      var navCats = '<div class="flex flex-wrap gap-2 mb-6">' + cats.map(function (cc) { return '<a href="' + (cc.slug || cc.id) + '.html" class="px-3 py-1.5 rounded-full text-xs font-semibold ' + (cc.id === cat ? 'bg-peao-500 text-white' : 'bg-white ring-silver') + '">' + esc(cc.emoji || '') + ' ' + esc(cc.nome) + '</a>'; }).join('') + '</div>';
      var subLabel = { 'temporada': '🤠 Temporada/Peão', 'alugar': '🔑 Alugar', 'vender': '🏷️ Vender', 'temporario': '⏱️ Temporário', 'clt': 'CLT', 'freelancer': 'Freelancer', 'estagio': 'Estágio' };
      var activeSub = '';
      function render() {
        var sMap = {}; all.forEach(function (l) { if (l.subcategoria) sMap[l.subcategoria] = (sMap[l.subcategoria] || 0) + 1; });
        var subChips = Object.keys(sMap).length > 1 ? '<div class="flex flex-wrap gap-2 mb-4">' + [''].concat(Object.keys(sMap)).map(function (s) { var lbl = s ? (subLabel[s] || s) : 'Todos'; return '<button data-sub="' + esc(s) + '" class="px-3 py-1.5 rounded-full text-xs font-semibold ' + (activeSub === s ? 'bg-navy-800 text-white' : 'bg-white ring-silver') + '">' + esc(lbl) + '</button>'; }).join('') + '</div>' : '';
        var filt = all.filter(function (l) { return !activeSub || l.subcategoria === activeSub; });
        var body = filt.length ? '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">' + filt.map(function (l) { return listingCard(l, cats); }).join('') + '</div>' : emptyState('Nenhum anúncio aqui ainda', 'Seja o primeiro a anunciar em ' + esc(c ? c.nome : 'Barretos') + '. Cadastro grátis no lançamento!', true);
        root.innerHTML = navCats + subChips + body;
        root.querySelectorAll('[data-sub]').forEach(function (b) { b.addEventListener('click', function () { activeSub = b.getAttribute('data-sub'); render(); }); });
      }
      render();
    });
  }

  function listingProfile(l, photos, cats) {
    var waMsg = 'Olá! Vi seu anúncio "' + l.titulo + '" no Aqui Tem Achadinhos e tenho interesse.';
    var wa = 'https://wa.me/' + (digits(l.whatsapp) || CONFIG.whatsapp) + '?text=' + encodeURIComponent(waMsg);
    var capa = l.foto_capa_url ? '<div class="h-48 md:h-64 bg-cover bg-center" style="background-image:url(' + esc(l.foto_capa_url) + ')"></div>' : '<div class="h-48 md:h-64 grid place-items-center text-6xl navy-hero">' + esc(catEmoji(l.categoria, cats)) + '</div>';
    var attrs = l.atributos || {};
    var attrRows = Object.keys(attrs).filter(function (k) { return k !== 'subcategoria'; }).map(function (k) { return '<span class="text-xs bg-silver-50 ring-silver px-2 py-1 rounded"><b>' + esc(k) + ':</b> ' + esc(attrs[k]) + '</span>'; }).join('');
    var gal = photos.length ? '<div class="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">' + photos.map(function (p) { return '<img src="' + esc(p.url) + '" class="w-full h-24 md:h-28 object-cover rounded-xl ring-silver" loading="lazy">'; }).join('') + '</div>' : '';

    var isNational = l.categoria === 'vagas-nac-empresa' || l.categoria === 'vagas-nac-candidato' || l.categoria === 'nacionais' || l.city_slug === 'nacional';
    var uf = CITY_UFS[l.city_slug] || (l.cidade === 'Barretos' ? 'SP' : (l.cidade === 'Gramado' ? 'RS' : (l.cidade === 'Uberlândia' ? 'MG' : (l.cidade === 'Florianópolis' ? 'SC' : (l.cidade === 'Salvador' ? 'BA' : 'SP')))));
    var cityLabel = isNational ? '🌐 Oportunidade Nacional / 100% Remoto (Brasil)' : (esc(l.cidade || 'Barretos') + (uf && uf !== 'BR' ? '/' + uf : '') + ' · Brasil');
    var locString = [l.endereco, l.bairro, cityLabel].filter(Boolean).join(' — ');

    return '<div class="max-w-4xl mx-auto px-4 sm:px-6 py-6"><a href="javascript:history.back()" class="text-silver-500 text-sm hover:text-navy-700">← Voltar</a><div class="mt-3 bg-white rounded-3xl shadow-soft ring-silver overflow-hidden">' + capa + '<div class="p-6"><div class="flex items-center gap-2 flex-wrap"><span class="text-xs font-semibold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">' + esc(catClassified(l.categoria, cats)) + '</span>' + (l.subcategoria ? '<span class="text-xs font-semibold text-navy-700 bg-silver-100 px-2 py-0.5 rounded">' + esc(l.subcategoria) + '</span>' : '') + (l.destaque ? '<span class="text-xs font-semibold text-peao-600 bg-peao-500/10 px-2 py-0.5 rounded">⭐ Destaque</span>' : '') + '</div><h1 class="font-display text-2xl md:text-3xl font-extrabold mt-2">' + esc(l.titulo) + '</h1>' + (l.preco ? '<p class="text-2xl font-extrabold text-peao-500 mt-1">' + esc(l.preco) + '</p>' : '') + (l.descricao ? '<p class="text-slate-700 mt-3 leading-relaxed whitespace-pre-line">' + esc(l.descricao) + '</p>' : '') + (attrRows ? '<div class="mt-4 flex flex-wrap gap-2">' + attrRows + '</div>' : '') + '<div class="mt-4 text-sm text-slate-700 space-y-1"><p>📍 <b>Local:</b> ' + locString + '</p>' + (l.anunciante_nome ? '<p>👤 <b>Anunciante:</b> ' + esc(l.anunciante_nome) + '</p>' : '') + '</div><div class="mt-5"><a href="' + wa + '" target="_blank" rel="noopener noreferrer" class="btn-shine bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl">💬 Tenho interesse (WhatsApp)</a></div></div></div>' + gal + '<div class="bg-silver-50 ring-silver rounded-xl p-4 mt-4"><p class="text-sm font-semibold text-slate-700">⭐ Quer aparecer no topo?</p><p class="text-xs text-slate-500 mt-1 mb-3">Destaque seu anúncio por <b>R$ 19,90/mês</b>: aparece primeiro nos resultados e ganha o selo ⭐. Ativação automática após o pagamento; cancele quando quiser.</p><input data-email type="email" placeholder="Seu melhor e-mail" class="w-full px-4 py-2.5 rounded-xl text-navy-900 mb-3"><button data-assinar="listing:' + esc(l.id) + ':destaque" class="btn-shine bg-peao-500 hover:bg-peao-600 text-white font-bold text-sm px-4 py-3 rounded-xl w-full">⭐ Impulsionar anúncio — R$ 19,90/mês</button><p class="text-[11px] text-slate-400 mt-2 text-center">Pagamento seguro via Mercado Pago</p></div><a href="' + waLink('Sou o dono do anúncio ' + l.titulo + ' e quero reivindicar (adicionar meu WhatsApp).') + '" target="_blank" rel="noopener noreferrer" class="block text-center text-xs font-semibold text-peao-600 hover:underline mt-2">🙋 Sou o dono — reivindicar anúncio</a><a href="' + waLink('Denúncia sobre o anúncio: ' + l.titulo) + '" target="_blank" rel="noopener noreferrer" class="block mt-4 text-center text-xs text-slate-400 hover:text-peao-600">🚩 Denunciar conteúdo incorreto</a></div>';
  }

  function pageAnuncio() {
    var el = $('#anuncioRoot'); if (!el) return; el.innerHTML = loadingHTML();
    var key = params().get('id') || params().get('slug');
    Classifieds.get(key).then(function (l) {
      if (!l) { el.innerHTML = emptyState('Anúncio não encontrado', 'Esse anúncio não está disponível ou foi removido.', false); return; }
      Classifieds.photos(l.id).then(function (photos) {
        el.innerHTML = listingProfile(l, photos, CLASSIFIED_CATS);
        wireAssinar();
        var uf = CITY_UFS[l.city_slug] || (l.cidade === 'Barretos' ? 'SP' : (l.cidade === 'Gramado' ? 'RS' : 'SP'));
        var cityTitle = (l.cidade || 'Barretos') + (uf && uf !== 'BR' ? '/' + uf : '');
        document.title = l.titulo + ' — ' + cityTitle + ' · Aqui Tem Achadinhos';
        setMeta('description', (l.descricao_curta || l.titulo) + ' — ' + catClassified(l.categoria) + ' em ' + cityTitle + '.');
      });
    });
  }

  function pageCadastroAnuncio() {
    var form = $('#formAnuncio'); if (!form) return;
    var catSel = form.querySelector('[name=categoria]');
    var extra = $('#extraFields');
    var preCat = params().get('cat');

    function renderExtra(cat) {
      if (!extra) return;
      var fields = LISTING_FIELDS[cat] || [];
      extra.innerHTML = fields.map(function (f) {
        if (f.type === 'select') return '<div><label class="block text-sm font-semibold mb-1.5">' + esc(f.label) + '</label><select data-attr="' + esc(f.k) + '" class="w-full px-4 py-3 rounded-xl bg-silver-50 ring-silver outline-none focus:ring-2 focus:ring-navy-500"><option value="">Selecione…</option>' + f.opts.map(function (o) { return '<option value="' + esc(o[0]) + '">' + esc(o[1]) + '</option>'; }).join('') + '</select></div>';
        return '<div><label class="block text-sm font-semibold mb-1.5">' + esc(f.label) + '</label><input data-attr="' + esc(f.k) + '" type="text" placeholder="' + esc(f.ph || '') + '" class="w-full px-4 py-3 rounded-xl bg-silver-50 ring-silver outline-none focus:ring-2 focus:ring-navy-500"></div>';
      }).join('');
    }

    Classifieds.cats().then(function (cats) {
      if (catSel) {
        catSel.innerHTML = '<option value="">Selecione…</option>' + cats.map(function (c) { return '<option value="' + c.id + '"' + (preCat === c.id ? ' selected' : '') + '>' + (c.emoji || '📋') + ' ' + esc(c.nome) + '</option>'; }).join('');
        if (preCat) {
          catSel.value = preCat;
          renderExtra(preCat);
        }
      }
    });

    if (catSel) catSel.addEventListener('change', function () { renderExtra(catSel.value); });
    var _pin = null;
    loadLeaflet().then(function () {
      if (!window.L || !$('#pickMap')) return;
      var pm = L.map('pickMap').setView(BARRETOS, 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(pm);
      var mk = null;
      pm.on('click', function (e) { if (mk) mk.setLatLng(e.latlng); else { mk = L.marker(e.latlng, { icon: pinIcon('📍'), draggable: true }).addTo(pm); } _pin = { lat: e.latlng.lat, lng: e.latlng.lng }; });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = '#msg';
      if (!catSel.value) { showMsg(msg, '⚠️ Selecione uma categoria.', false); return; }
      if (!form.querySelector('[name=titulo]').value.trim()) { showMsg(msg, '⚠️ Informe o título do anúncio.', false); return; }
      if (!form.querySelector('[name=whatsapp]').value.trim()) { showMsg(msg, '⚠️ Informe seu WhatsApp para contato.', false); return; }
      if (!form.querySelector('[name=aceite]').checked) { showMsg(msg, '⚠️ É necessário aceitar os termos para continuar.', false); return; }
      var btn = form.querySelector('[type=submit]'); var orig = btn.textContent; btn.disabled = true; btn.textContent = 'Enviando…';
      var o = {
        categoria: catSel.value,
        titulo: form.querySelector('[name=titulo]').value.trim(),
        descricao: form.querySelector('[name=descricao]').value.trim(),
        preco: form.querySelector('[name=preco]').value.trim(),
        anunciante_nome: form.querySelector('[name=anunciante_nome]').value.trim(),
        whatsapp: form.querySelector('[name=whatsapp]').value.trim(),
        email: form.querySelector('[name=email]').value.trim(),
        cidade: form.querySelector('[name=cidade]').value.trim() || 'Barretos',
        bairro: form.querySelector('[name=bairro]').value.trim(),
        endereco: form.querySelector('[name=endereco]').value.trim()
      };
      var atributos = {};
      extra.querySelectorAll('[data-attr]').forEach(function (el2) { var v = (el2.value || '').trim(); if (v) { if (el2.getAttribute('data-attr') === 'subcategoria') o.subcategoria = v; else atributos[el2.getAttribute('data-attr')] = v; } });
      if (Object.keys(atributos).length) o.atributos = atributos;
      if (_pin) { o.lat = _pin.lat; o.lng = _pin.lng; }
      var capaFile = form.querySelector('[name=capa]').files[0];
      var galFiles = Array.prototype.slice.call(form.querySelector('[name=galeria]').files).slice(0, 6);
      function validImg(f) { return f && f.type.indexOf('image/') === 0 && f.size <= 3 * 1024 * 1024; }
      if (capaFile && !validImg(capaFile)) { showMsg(msg, '❌ Capa: use imagem até 3MB.', false); btn.disabled = false; btn.textContent = orig; return; }
      for (var i = 0; i < galFiles.length; i++) { if (!validImg(galFiles[i])) { showMsg(msg, '❌ Uma foto da galeria excede 3MB.', false); btn.disabled = false; btn.textContent = orig; return; } }
      var tasks = [];
      if (capaFile) tasks.push(uploadPhoto(capaFile).then(function (u) { o.foto_capa_url = u; }));
      var galUrls = []; galFiles.forEach(function (f) { tasks.push(uploadPhoto(f).then(function (u) { galUrls.push(u); })); });
      Promise.all(tasks).then(function () {
        return Classifieds.create(o).then(function (created) {
          if (!created) throw new Error('insert');
          var pTasks = galUrls.map(function (u) { return apiPost('listings_photos', { listing_id: created.id, url: u }); });
          return Promise.all(pTasks).then(function () { return created; });
        });
      }).then(function () {
        Metrics.log('anuncio_cadastrado');
        form.classList.add('hidden');
        var ok = $('#anuncioOk'); if (ok) ok.classList.remove('hidden');
        window.scrollTo(0, 0);
      }).catch(function (err) {
        showMsg(msg, '❌ Não foi possível enviar. Verifique sua internet e tente novamente. (' + (err && err.message ? err.message : 'erro') + ')', false);
        btn.disabled = false; btn.textContent = orig;
      });
    });
  }

  function renderSocialProof() {
    var box = $('#socialProof'); if (!box) return;
    var slug = currentCitySlug(), city = currentCityName(), uf = currentCityUF();
    function cnt(p) { return fetch(B(p), { headers: H({ Prefer: 'count=exact' }) }).then(function (r) { var cr = (r.headers.get('content-range') || '').split('/'); return parseInt(cr[1], 10) || 0; }).catch(function () { return 0; }); }

    var isNacional = slug === 'nacional' || slug === 'www' || city === 'Brasil';
    var pStores = isNacional ? 'stores?select=id&status=eq.ativo' : ('stores?select=id&status=eq.ativo&city_slug=eq.' + encodeURIComponent(slug));
    var pListings = isNacional ? 'listings?select=id&status=eq.ativo' : ('listings?select=id&status=eq.ativo&or=(city_slug.eq.' + encodeURIComponent(slug) + ',cidade.ilike.*' + encodeURIComponent(city) + '*)');
    var pDrivers = isNacional ? 'drivers?select=id&status=eq.ativo' : ('drivers?select=id&status=eq.ativo&city_slug=eq.' + encodeURIComponent(slug));

    Promise.all([cnt(pStores), cnt(pListings), cnt(pDrivers)]).then(function (r) {
      var labelCity = isNacional ? 'no Brasil' : ('em ' + city + (uf && uf !== 'BR' ? '/' + uf : ''));
      var stats = [['🏢', r[0], 'empresas ' + labelCity], ['🏷️', r[1], 'anúncios e vagas ' + labelCity], ['🚗', r[2], 'motoristas conectados']].filter(function (x) { return x[1] > 0; });
      var total = r[0] + r[1] + r[2];
      var grid = stats.map(function (x) { return '<div><div class="text-3xl">' + x[0] + '</div><div class="font-display text-2xl md:text-3xl font-extrabold text-chrome">' + x[1] + '</div><div class="text-xs text-silver-400 mt-0.5">' + esc(x[2]) + '</div></div>'; }).join('');
      var cols = stats.length >= 3 ? 'grid-cols-3' : (stats.length === 2 ? 'grid-cols-2' : 'grid-cols-1');
      var register = cityRegistrationUrl();
      var caption = isNacional ? '✦ Números reais, ao vivo · Brasil' : ('✦ Números reais, ao vivo · ' + esc(city) + '/' + esc(uf));
      box.innerHTML = total > 0 ? '<div class="max-w-5xl mx-auto px-4 py-8"><div class="grid ' + cols + ' gap-5 text-center">' + grid + '</div><p class="text-center text-xs text-silver-500 mt-5">' + caption + '</p></div>' : '<div class="max-w-5xl mx-auto px-4 py-8 text-center text-silver-400 text-sm">Conectando ' + (isNacional ? 'o Brasil' : esc(city)) + ' — <a href="' + register + '" class="text-peao-400 font-semibold underline">cadastre sua empresa</a></div>';
    });
  }

  /* BUSCADOR DE CEP (ViaCEP) — auto-preenche endereço */
  document.addEventListener('blur', function (e) {
    var el = e.target;
    if (el.name !== 'cep' && el.id !== 'cep' && el.id !== 'as_cep') return;
    var cep = (el.value || '').replace(/\D/g, '');
    if (cep.length !== 8) return;
    el.value = cep.slice(0,5) + '-' + cep.slice(5);
    fetch('https://viacep.com.br/ws/' + cep + '/json/').then(function (r) { return r.json(); }).then(function (d) {
      if (d.erro) return;
      var ctx = el.closest('form') || el.closest('#addStoreForm') || document;
      function setVal(sel, val) { var e2 = ctx.querySelector(sel); if (e2 && val) e2.value = val; }
      if (el.id === 'as_cep') {
        setVal('#as_end', d.logradouro); setVal('#as_bairro', d.bairro);
      } else {
        setVal('[name=endereco]', d.logradouro); setVal('[name=bairro]', d.bairro);
        var cid = ctx.querySelector('[name=cidade]'); if (cid && d.localidade) cid.value = d.localidade;
      }
    }).catch(function () {});
  }, true);


  var RECENT_KEY = 'ata_recent';
  function getRecent() { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); }
  function addRecent(id) { var r = getRecent(); r = r.filter(function (x) { return x !== id; }); r.unshift(id); if (r.length > 8) r = r.slice(0, 8); localStorage.setItem(RECENT_KEY, JSON.stringify(r)); }
  function renderRecent() {
    var box = $('#recentStrip'); if (!box) return; var ids = getRecent(); if (!ids.length) return;
    Promise.all([Categories.list(), Promise.all(ids.slice(0, 5).map(function (id) { return Stores.get(id); }))]).then(function (r) {
      var cats = r[0], stores = r[1].filter(Boolean); if (!stores.length) return;
      box.innerHTML = '<div class="max-w-7xl mx-auto px-4 sm:px-6 py-8"><h2 class="font-display text-xl font-extrabold mb-4">👀 Vistos recentemente</h2><div class="grid grid-cols-2 md:grid-cols-5 gap-4">' + stores.map(function (s) { return storeCard(s, cats); }).join('') + '</div></div>';
      box.style.display = 'block';
    });
  }

  /* ===== INTELIGÊNCIA: Máscaras + Busca com sugestões ===== */
  /* Máscara de telefone (WhatsApp/Telefone) — formata enquanto digita */
  document.addEventListener('input', function (e) {
    var el = e.target;
    var isPhone = el.name === 'whatsapp' || el.name === 'telefone' || el.id === 'as_wa' || el.id === 'as_tel';
    var isCep = el.name === 'cep' || el.id === 'cep' || el.id === 'as_cep';
    if (!isPhone && !isCep) return;
    if (isPhone) {
      var v = el.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) el.value = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
      else if (v.length > 2) el.value = '(' + v.slice(0,2) + ') ' + v.slice(2);
      else if (v.length > 0) el.value = '(' + v;
      el.style.borderColor = v.length >= 10 ? '#34D399' : (v.length > 0 ? '#F25563' : '');
    }
    if (isCep) {
      var c = el.value.replace(/\D/g, '').slice(0, 8);
      if (c.length > 5) el.value = c.slice(0,5) + '-' + c.slice(5);
      else el.value = c;
    }
  }, true);

  /* Busca com sugestões (autocomplete tipo Google) */
  function wireSearchAutocomplete() {
    document.querySelectorAll('input[name=q]').forEach(function (inp) {
      if (inp.getAttribute('data-ac')) return; inp.setAttribute('data-ac', '1');
      var wrap = inp.closest('form') || inp.parentElement;
      if (wrap) wrap.style.position = 'relative';
      var box = document.createElement('div');
      box.className = 'absolute left-0 right-0 top-full mt-1 bg-navy-900 rounded-xl shadow-glow ring-silver z-50 max-h-80 overflow-auto hidden text-sm';
      if (wrap) wrap.appendChild(box);
      var timer = null;
      inp.addEventListener('input', function () {
        clearTimeout(timer);
        var q = inp.value.trim();
        if (q.length < 2) { box.classList.add('hidden'); return; }
        timer = setTimeout(function () {
          Promise.all([Stores.search(q), Classifieds.search(q)]).then(function (r) {
            var stores = r[0].slice(0, 5), listings = r[1].slice(0, 3), html = '';
            if (stores.length) html += '<div class="px-3 py-1.5 text-[10px] font-bold uppercase text-silver-500 tracking-wide border-b border-white/10">Lojas e empresas</div>';
            stores.forEach(function (s) { html += '<a href="loja.html?id=' + encodeURIComponent(s.id) + '" class="block px-3 py-2 text-silver-200 hover:bg-white/5">🏪 ' + esc(s.nome) + (s.bairro ? ' <span class="text-silver-500 text-xs">' + esc(s.bairro) + '</span>' : '') + '</a>'; });
            if (listings.length) html += '<div class="px-3 py-1.5 text-[10px] font-bold uppercase text-silver-500 tracking-wide border-b border-white/10 border-t border-white/10 mt-1">Anúncios</div>';
            listings.forEach(function (l) { html += '<a href="anuncio.html?id=' + encodeURIComponent(l.id) + '" class="block px-3 py-2 text-silver-200 hover:bg-white/5">' + esc(catEmoji(l.categoria)) + ' ' + esc(l.titulo) + (l.preco ? ' <span class="text-peao-400 text-xs">' + esc(l.preco) + '</span>' : '') + '</a>'; });
            if (!html) html = '<div class="px-3 py-3 text-silver-400">Nada encontrado pra "' + esc(q) + '"</div>';
            box.innerHTML = html;
            box.classList.remove('hidden');
          });
        }, 300);
      });
      inp.addEventListener('blur', function () { setTimeout(function () { box.classList.add('hidden'); }, 200); });
      inp.addEventListener('focus', function () { if (inp.value.trim().length >= 2) inp.dispatchEvent(new Event('input')); });
    });
  }

  /* BOOT */
  document.addEventListener('DOMContentLoaded', function () {
    injectLayout(); renderSocialProof(); initCountdown(); initCityParallax(); Metrics.log('pageview'); wireSearchAutocomplete(); renderRecent(); registerSW(); initAnalytics(); wireMP();
    document.addEventListener('click', function (e) { var b = e.target.closest('[data-fav]'); if (b) { e.preventDefault(); e.stopPropagation(); var added = toggleFav(b.getAttribute('data-fav')); b.innerHTML = added ? '❤️' : '🤍'; } });
    var p = document.body.dataset.page;
    var ROUTES = { home: pageHome, categoria: pageCategoria, loja: pageLoja, ofertas: pageOfertas, busca: pageBusca, cadastro: pageCadastro, turista: pageTurista, login: pageLogin, admin: pageAdmin, painel: pagePainel, mapa: pageMapa, motoristas: pageMotoristas, motorista: pageMotorista, cadmotorista: pageCadastroMotorista, obrigado: pageObrigado, favoritos: pageFavoritos, classificados: pageClassificadosHub, listings: pageListings, vagas: pageVagas, empregos: pageVagas, anuncio: pageAnuncio, cadanuncio: pageCadastroAnuncio };
    if (ROUTES[p]) ROUTES[p]();
  });
})();
