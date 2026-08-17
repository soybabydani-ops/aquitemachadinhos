// ============================================================
// AQUITEM — AI Quality, Compliance & Anti-Spam Evaluator
// Avalia, classifica, higieniza e aprova automaticamente
// empresas, vagas e anúncios nos 5.581 municípios brasileiros.
// ============================================================

const { getGeoData } = require('./geo-enrich');

// Palavras-chave proibidas / Anti-Golpe / Anti-Spam
const BLOCKED_PATTERNS = [
  /\b(cassino|bet|roleta|tigrinho|urubu do pix|piramide|esquema|hack|crack|nudez|porn)\b/i,
  /\b(dinheiro facil|trabalhe de casa ganhando 5000 por dia|renda extra garantida sem esforco)\b/i
];

// Dicionário Semântico de Categorias e Subcategorias
const TAXONOMY_MAP = {
  'pizzaria': { categoria: 'gastronomia', subcategoria: 'Pizzaria', tags: ['pizza', 'delivery', 'forno a lenha', 'lanches'] },
  'restaurante': { categoria: 'gastronomia', subcategoria: 'Restaurante', tags: ['almoco', 'jantar', 'comida', 'refeicao'] },
  'hamburgueria': { categoria: 'gastronomia', subcategoria: 'Hamburgueria', tags: ['hamburguer', 'artesanal', 'lanches', 'fritas'] },
  'dentista': { categoria: 'saude', subcategoria: 'Odontologia', tags: ['dentista', 'implantes', 'aparelho', 'saude bucal'] },
  'clinica': { categoria: 'saude', subcategoria: 'Clínica Médica', tags: ['medico', 'consultas', 'exames', 'saude'] },
  'oficina': { categoria: 'servicos', subcategoria: 'Mecânica Automotiva', tags: ['mecanico', 'carro', 'revisao', 'freios', 'troca de oleo'] },
  'advogado': { categoria: 'servicos', subcategoria: 'Advocacia', tags: ['juridico', 'advogado', 'direito', 'consultoria'] },
  'hotel': { categoria: 'turismo', subcategoria: 'Hotel & Pousada', tags: ['hospedagem', 'pousada', 'resort', 'diaria'] },
  'roupas': { categoria: 'comercio', subcategoria: 'Moda & Vestuário', tags: ['loja de roupas', 'vestuario', 'calcados', 'moda'] }
};

/**
 * Higieniza strings contra injeções XSS e formata para capitalização profissional
 */
function sanitizeText(str) {
  if (!str) return '';
  return String(str)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')   // Remove styles
    .replace(/<[^>]*>?/gm, '')                                          // Remove HTML tags
    .replace(/['"`;]/g, '')                                             // Remove caracteres perigosos
    .trim();
}

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/(?:^|\s|\/|-)\S/g, c => c.toUpperCase());
}

/**
 * Normaliza e valida número de WhatsApp brasileiro
 */
function validateAndCleanWhatsApp(rawPhone) {
  if (!rawPhone) return { valid: false, phone: '' };
  let digits = String(rawPhone).replace(/\D/g, '');

  // Se vier com o DDI 55 na frente (+55 17 99264-1746 -> 13 dígitos)
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  // Validação: Formatos aceitos (10 ou 11 dígitos com DDD válido entre 11 e 99)
  if (digits.length === 10 || digits.length === 11) {
    const ddd = parseInt(digits.slice(0, 2), 10);
    if (ddd >= 11 && ddd <= 99) {
      return { valid: true, phone: digits };
    }
  }

  return { valid: false, phone: digits };
}

/**
 * Avalia conformidade e calcula Quality Score de uma Loja/Empresa
 */
function evaluateStore(input) {
  const issues = [];
  let score = 0;

  const nome = sanitizeText(input.nome);
  const descricao = sanitizeText(input.descricao || input.descricao_curta || '');
  const cidade = sanitizeText(input.cidade || 'Barretos');
  const rawWhatsApp = input.whatsapp || input.telefone || '';

  // 1. Anti-Spam Check
  const fullContent = `${nome} ${descricao}`;
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(fullContent)) {
      return {
        approved: false,
        score: 0,
        reason: 'Conteúdo reprovado por violar diretrizes de segurança e anti-spam.',
        data: null
      };
    }
  }

  // 2. Validação de Nome da Empresa (+30 pts)
  if (nome && nome.length >= 3) {
    score += 30;
  } else {
    issues.push('Nome da empresa muito curto ou ausente.');
  }

  // 3. Validação de WhatsApp / Telefone (+30 pts)
  const phoneCheck = validateAndCleanWhatsApp(rawWhatsApp);
  if (phoneCheck.valid) {
    score += 30;
  } else {
    issues.push('WhatsApp inválido ou com DDD incompleto.');
  }

  // 4. Validação Geográfica (+20 pts)
  const citySlug = (input.city_slug || cidade.toLowerCase().replace(/[^a-z0-9-]/g, '-')).replace(/-+/g, '-');
  const geo = getGeoData(citySlug, cidade);
  if (geo) {
    score += 20;
  }

  // 5. Descrição ou Detalhes Comerciais (+20 pts)
  if (descricao.length >= 10 || input.endereco || input.instagram) {
    score += 20;
  }

  // AI Semantic Classification
  let categoria = (input.categoria || '').toLowerCase().trim();
  let subcategoria = input.subcategoria || '';
  let autoTags = [];

  const searchIndex = `${nome} ${descricao} ${subcategoria}`.toLowerCase();
  for (const [key, meta] of Object.entries(TAXONOMY_MAP)) {
    if (searchIndex.includes(key)) {
      if (!categoria || categoria === 'outros') categoria = meta.categoria;
      if (!subcategoria) subcategoria = meta.subcategoria;
      autoTags = meta.tags;
      break;
    }
  }

  if (!categoria) categoria = 'comercio';
  if (!subcategoria) subcategoria = 'Comércio Local';

  // Regra de Auto-Aprovação: Score >= 60 = APROVADO AUTOMATICAMENTE
  const approved = score >= 60 && issues.length === 0;

  // Gerador de Mensagem de WhatsApp com UTM Tracker
  const cleanPhone = phoneCheck.phone;
  const storeTitleFormatted = toTitleCase(nome);
  const whatsappUtmLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá! Encontrei a ${storeTitleFormatted} no guia oficial Aqui Tem Achadinhos e gostaria de mais informações.`)}` : '';

  const processedData = {
    nome: storeTitleFormatted,
    slug: (input.slug || nome.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/^-|-$/g, ''),
    city_slug: citySlug,
    cidade: geo.nome,
    uf: geo.uf,
    categoria,
    subcategoria,
    descricao: descricao || `${storeTitleFormatted} em ${geo.nome}/${geo.uf}. Atendimento verificado no guia Aqui Tem Achadinhos.`,
    descricao_curta: input.descricao_curta || `Empresa verificada em ${geo.nome}.`,
    endereco: sanitizeText(input.endereco || 'Centro Comercial'),
    bairro: sanitizeText(input.bairro || 'Centro'),
    telefone: sanitizeText(input.telefone || rawWhatsApp),
    whatsapp: cleanPhone,
    instagram: sanitizeText(input.instagram || ''),
    logo_url: input.logo_url || '',
    plano: input.plano || 'destaque',
    destaque: true,
    status: approved ? 'ativo' : 'pausado',
    status_aprovacao: approved ? 'aprovado' : 'pendente',
    score_qualidade: score,
    tags: autoTags,
    whatsapp_utm_link: whatsappUtmLink
  };

  return {
    approved,
    score,
    issues,
    data: processedData,
    message: approved
      ? '✨ Avaliação Concluída: Cadastro verificado e APROVADO AUTOMATICAMENTE com 100% de conformidade!'
      : 'Cadastro recebido. Alguns campos precisam de complementação.'
  };
}

/**
 * Avalia conformidade e calcula Quality Score de uma Vaga ou Classificado
 */
function evaluateListing(input) {
  const issues = [];
  let score = 0;

  const titulo = sanitizeText(input.titulo);
  const descricao = sanitizeText(input.descricao || '');
  const cidade = sanitizeText(input.cidade || 'Barretos');
  const rawWhatsApp = input.whatsapp || '';

  // Anti-Spam
  const fullContent = `${titulo} ${descricao}`;
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(fullContent)) {
      return {
        approved: false,
        score: 0,
        reason: 'Anúncio reprovado por violar termos de uso e segurança.',
        data: null
      };
    }
  }

  // Título (+35 pts)
  if (titulo && titulo.length >= 4) {
    score += 35;
  } else {
    issues.push('Título da vaga muito curto.');
  }

  // WhatsApp (+35 pts)
  const phoneCheck = validateAndCleanWhatsApp(rawWhatsApp);
  if (phoneCheck.valid) {
    score += 35;
  } else {
    issues.push('WhatsApp de contato inválido.');
  }

  // Cidade (+30 pts)
  const citySlug = (input.city_slug || cidade.toLowerCase().replace(/[^a-z0-9-]/g, '-')).replace(/-+/g, '-');
  const geo = getGeoData(citySlug, cidade);
  if (geo) {
    score += 30;
  }

  const approved = score >= 60 && issues.length === 0;
  const cleanPhone = phoneCheck.phone;
  const titleFormatted = toTitleCase(titulo);

  const processedData = {
    titulo: titleFormatted,
    slug: (input.slug || titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/^-|-$/g, ''),
    city_slug: citySlug,
    cidade: geo.nome,
    uf: geo.uf,
    categoria: (input.categoria || 'vagas').toLowerCase(),
    subcategoria: input.subcategoria || 'Geral',
    descricao: descricao || `${titleFormatted} em ${geo.nome}/${geo.uf}. Oportunidade com contato direto no WhatsApp oficial.`,
    preco: input.preco || input.salario || '',
    anunciante_nome: sanitizeText(input.anunciante_nome || input.empresa || 'Empresa Contratante'),
    whatsapp: cleanPhone,
    bairro: sanitizeText(input.bairro || 'Centro'),
    destaque: true,
    status: approved ? 'ativo' : 'inativo',
    score_qualidade: score
  };

  return {
    approved,
    score,
    issues,
    data: processedData,
    message: approved
      ? '✨ Avaliação Concluída: Vaga verificada e APROVADA NA HORA!'
      : 'Vaga recebida para revisão.'
  };
}

module.exports = {
  evaluateStore,
  evaluateListing,
  sanitizeText,
  validateAndCleanWhatsApp
};
