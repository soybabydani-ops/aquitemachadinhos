/**
 * AQUITEM ACHADINHOS — COMPILADOR DE OVERLAYS INTERNACIONAIS PINTEREST (USD / EUR / EN / ES)
 * Gera imagens com tarja de alto impacto: "⚠️ PRICE DROP - CLICK HERE TO CLAIM COUPON"
 */

const fs = require('fs');
const path = require('path');
const { DESTINOS_MASTER } = require('./seeder-global-destinos-travel-gear');

const REPO_ROOT = path.join(__dirname, '..');
const GLOBAL_PINS_DIR = path.join(REPO_ROOT, 'assets', 'pins-global');

function generateGlobalSvgPin({ city, country, price, badgeText }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1500" width="1000" height="1500">
  <defs>
    <linearGradient id="globalBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#0B0F19" />
    </linearGradient>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <filter id="shadowG" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <rect width="1000" height="1500" fill="url(#globalBg)" />

  <!-- Grid Header -->
  <line x1="0" y1="180" x2="1000" y2="180" stroke="#1E293B" stroke-width="2" />
  <text x="50" y="90" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" letter-spacing="2">AQUITEM GLOBAL TRAVEL</text>
  <text x="950" y="90" text-anchor="end" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28">TIER-1 SECRET FARES</text>

  <!-- TARJA DE ALTO IMPACTO EM INGLÊS -->
  <g filter="url(#shadowG)">
    <rect x="50" y="130" width="900" height="120" rx="24" fill="#F59E0B" />
    <text x="500" y="205" text-anchor="middle" fill="#000000" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" letter-spacing="1">
      ${badgeText}
    </text>
  </g>

  <!-- CARD PRINCIPAL -->
  <rect x="50" y="300" width="900" height="950" rx="32" fill="#0F172A" stroke="#334155" stroke-width="3" filter="url(#shadowG)" />

  <!-- ÍCONE DE VOO GLOBAL -->
  <circle cx="500" cy="520" r="150" fill="#1E293B" stroke="#38BDF8" stroke-width="4" />
  <text x="500" y="565" text-anchor="middle" fill="#FFFFFF" font-size="110">✈️</text>

  <!-- DESTINO -->
  <text x="500" y="760" text-anchor="middle" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" letter-spacing="2">
    ${country.toUpperCase()}
  </text>
  <text x="500" y="850" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="68">
    ${city}
  </text>

  <!-- PREÇOS & DESCONTO -->
  <g transform="translate(500, 980)">
    <text x="0" y="0" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="32">
      SECRET FARES STARTING AT
    </text>
    <text x="0" y="80" text-anchor="middle" fill="#38BDF8" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="70">
      ${price}
    </text>
  </g>

  <!-- BADGE VERIFICADO -->
  <rect x="350" y="1120" width="300" height="60" rx="30" fill="#10B981" opacity="0.2" stroke="#10B981" stroke-width="2" />
  <text x="500" y="1162" text-anchor="middle" fill="#34D399" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28">
    ✓ AIRLINE ERROR ACTIVE
  </text>

  <!-- BOTÃO CTA EM INGLÊS -->
  <g filter="url(#shadowG)">
    <rect x="100" y="1300" width="800" height="130" rx="30" fill="url(#skyGrad)" />
    <text x="500" y="1382" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="38" letter-spacing="1">
      👉 CLAIM SECRET FARE &amp; HOTELS →
    </text>
  </g>
</svg>`;
}

function compileAllGlobalPins() {
  console.log("🚀 Compilando Imagens com Overlay Internacional para Pinterest Global...");

  if (!fs.existsSync(GLOBAL_PINS_DIR)) {
    fs.mkdirSync(GLOBAL_PINS_DIR, { recursive: true });
  }

  let count = 0;
  DESTINOS_MASTER.forEach(d => {
    const svg = generateGlobalSvgPin({
      city: d.cidade,
      country: d.pais,
      price: d.tarifa,
      badgeText: "⚠️ PRICE DROP - CLICK HERE TO CLAIM COUPON"
    });
    fs.writeFileSync(path.join(GLOBAL_PINS_DIR, `${d.slug}-global-badge.svg`), svg, 'utf8');
    count++;
  });

  console.log(`🏆 Total de ${count} cartões visuais globais compilados em assets/pins-global/!`);
}

if (require.main === module) {
  compileAllGlobalPins();
}

module.exports = { compileAllGlobalPins, generateGlobalSvgPin };
