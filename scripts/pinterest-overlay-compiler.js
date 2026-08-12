/**
 * AQUITEM ACHADINHOS — COMPILADOR DE IMAGENS COM OVERLAY HACKER PARA PINTEREST
 * Gera cartões visuais com tarja de urgência "⚠️ BUG DE PREÇO - CLIQUE PARA RESGATAR CUPOM".
 */

const fs = require('fs');
const path = require('path');
const { BUGS_DATA, LOOKS_DATA } = require('./seeder-alta-frequencia-cinco-sistemas');
const { TRAVEL_GEAR_DATA } = require('./seeder-global-destinos-travel-gear');

const REPO_ROOT = path.join(__dirname, '..');
const PINS_DIR = path.join(REPO_ROOT, 'assets', 'pins');

function generateHackerSvgPin({ title, price, originalPrice, discount, store, badgeText }) {
  const isRed = badgeText.includes('BUG') || badgeText.includes('ALERTA');
  const badgeBg = isRed ? '#EF4444' : '#F59E0B';
  const badgeTextColor = '#000000';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#060911" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Fundo Escuro de Alta Fidelidade -->
  <rect width="1000" height="1500" fill="url(#bgGrad)" />

  <!-- Grid de Linhas Sutis de Fundo -->
  <line x1="0" y1="200" x2="1000" y2="200" stroke="#1E293B" stroke-width="2" />
  <line x1="0" y1="1300" x2="1000" y2="1300" stroke="#1E293B" stroke-width="2" />

  <!-- HEADER MARCA -->
  <text x="50" y="100" fill="#10B981" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="36" letter-spacing="2">AQUITEM ACHADINHOS</text>
  <text x="950" y="100" text-anchor="end" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28">${store.toUpperCase()} OFICIAL</text>

  <!-- TARJA HACKER DE ALTA CONVERSÃO -->
  <g filter="url(#shadow)">
    <rect x="50" y="150" width="900" height="120" rx="24" fill="${badgeBg}" />
    <text x="500" y="225" text-anchor="middle" fill="${badgeTextColor}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" letter-spacing="1">
      ${badgeText}
    </text>
  </g>

  <!-- CARD PRINCIPAL DO PRODUTO -->
  <rect x="50" y="320" width="900" height="920" rx="32" fill="#0F172A" stroke="#334155" stroke-width="3" filter="url(#shadow)" />

  <!-- ÍCONE CENTRAL / BADGE DE OFERTA -->
  <circle cx="500" cy="540" r="160" fill="#1E293B" stroke="#10B981" stroke-width="4" />
  <text x="500" y="580" text-anchor="middle" fill="#FFFFFF" font-size="120">🛍️</text>

  <!-- TÍTULO DO PRODUTO -->
  <foreignObject x="100" y="740" width="800" height="200">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color: #FFFFFF; font-family: system-ui, -apple-system, sans-serif; font-weight: 800; font-size: 40px; line-height: 1.3; text-align: center;">
      ${title}
    </div>
  </foreignObject>

  <!-- PREÇOS & DESCONTO -->
  <g transform="translate(500, 1020)">
    <text x="-200" y="0" text-anchor="middle" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="36" text-decoration="line-through">
      De ${originalPrice}
    </text>
    <text x="120" y="10" text-anchor="middle" fill="#10B981" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="64">
      Por ${price}
    </text>
  </g>

  <!-- BADGE DE DESCONTO PERCENTUAL -->
  <rect x="375" y="1090" width="250" height="60" rx="30" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" stroke-width="2" />
  <text x="500" y="1132" text-anchor="middle" fill="#FBBF24" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="30">
    -${discount}% OFF REAL
  </text>

  <!-- BOTÃO CTA DE RESGATE -->
  <g filter="url(#shadow)">
    <rect x="100" y="1290" width="800" height="130" rx="30" fill="url(#goldGrad)" />
    <text x="500" y="1372" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="40" letter-spacing="1">
      👉 RESGATAR CUPOM NO SITE OFICIAL →
    </text>
  </g>
</svg>`;
}

function compileAllHackerPins() {
  console.log("🚀 Compilando Imagens com Overlay Hacker para o Pinterest Catalog...");

  if (!fs.existsSync(PINS_DIR)) {
    fs.mkdirSync(PINS_DIR, { recursive: true });
  }

  let count = 0;

  // 1. Bugs de E-commerce
  BUGS_DATA.forEach(b => {
    const svg = generateHackerSvgPin({
      title: b.nome,
      price: b.bug,
      originalPrice: b.normal,
      discount: b.desconto,
      store: b.loja,
      badgeText: "⚠️ BUG DE PREÇO - CLIQUE PARA RESGATAR CUPOM"
    });
    fs.writeFileSync(path.join(PINS_DIR, `${b.slug}-badge.svg`), svg, 'utf8');
    count++;
  });

  // 2. Looks Barretos
  LOOKS_DATA.forEach(l => {
    const svg = generateHackerSvgPin({
      title: l.nome,
      price: l.promo,
      originalPrice: l.normal,
      discount: l.desconto,
      store: l.loja,
      badgeText: "🤠 LOOK BARRETOS - 70% OFF QUEIMA DE ESTOQUE"
    });
    fs.writeFileSync(path.join(PINS_DIR, `${l.slug}-badge.svg`), svg, 'utf8');
    count++;
  });

  // 3. Travel Gear
  TRAVEL_GEAR_DATA.forEach(g => {
    const svg = generateHackerSvgPin({
      title: g.nome,
      price: g.promo,
      originalPrice: g.normal,
      discount: g.desconto,
      store: g.loja,
      badgeText: "✈️ TARIFA DE TEMPORADA - MALAS E ACESSÓRIOS"
    });
    fs.writeFileSync(path.join(PINS_DIR, `${g.slug}-badge.svg`), svg, 'utf8');
    count++;
  });

  console.log(`🏆 Total de ${count} cartões visuais com Overlay Hacker compilados em assets/pins/!`);
}

if (require.main === module) {
  compileAllHackerPins();
}

module.exports = { compileAllHackerPins, generateHackerSvgPin };
