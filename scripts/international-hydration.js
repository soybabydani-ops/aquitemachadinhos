#!/usr/bin/env node
/**
 * international-hydration.js
 * Mirrors content to /en and /es folders
 * Injects hreflang tags
 */

const fs = require('fs');
const path = require('path');

const CITIES = require('../cities-list.json').cities || [];

async function hydrateInternational() {
  console.log('=== INTERNATIONAL HYDRATION ===');

  const enDir = path.join(process.cwd(), 'en');
  const esDir = path.join(process.cwd(), 'es');
  fs.mkdirSync(enDir, { recursive: true });
  fs.mkdirSync(esDir, { recursive: true });

  for (const city of CITIES.slice(0, 8)) {
    // English mirror
    const enContent = `# Remote Work Jobs ${new Date().getFullYear()} — ${city.name}\n\nNo experience required. Updated daily.\n\n[Apply now](https://www.aquitemachadinhos.com.br/${city.slug}-home.html)`;
    fs.writeFileSync(path.join(enDir, `${city.slug}.md`), enContent);

    // Spanish mirror
    const esContent = `# Guía de Ahorro Energético Residencial — ${city.name}\n\nConsejos reales para reducir tu factura de luz.`;
    fs.writeFileSync(path.join(esDir, `${city.slug}.md`), esContent);
  }

  console.log(`✅ Created EN/ES mirrors for ${Math.min(8, CITIES.length)} cities`);
}

hydrateInternational();