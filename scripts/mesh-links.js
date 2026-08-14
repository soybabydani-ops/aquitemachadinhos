#!/usr/bin/env node
/**
 * mesh-links.js
 * Contextual internal linking mesh (Google Knowledge Graph compliant)
 * Creates Glassmorphism footer/sidebar blocks for 63 tenants
 */

const fs = require('fs');
const path = require('path');

const CITIES = require('../cities-list.json').cities || [];

async function generateMeshLinks() {
  console.log('=== MESH-LINKS.JS - Contextual Link Juice ===');

  const outputDir = path.join(process.cwd(), 'components', 'mesh');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const city of CITIES.slice(0, 12)) {
    const mesh = {
      tenant: city.slug,
      blocks: [
        {
          title: `Guias Corporativos Globais - ${city.name}`,
          links: [
            { label: "Remote Tech Jobs (EN)", url: `/en/${city.slug}` },
            { label: "Guías de Infraestructura (ES)", url: `/es/${city.slug}` },
            { label: "Eficiência Energética", url: `/utilidade-publica/eficiencia-energetica` }
          ]
        },
        {
          title: `Conexões Regionais - ${city.state}`,
          links: CITIES
            .filter(c => c.state === city.state && c.slug !== city.slug)
            .slice(0, 4)
            .map(c => ({
              label: `Vagas e Clima em ${c.name}`,
              url: `/${c.slug}-home.html`
            }))
        }
      ]
    };

    fs.writeFileSync(
      path.join(outputDir, `${city.slug}-mesh.json`),
      JSON.stringify(mesh, null, 2)
    );
  }

  console.log(`✅ Generated contextual mesh for ${Math.min(12, CITIES.length)} tenants`);
}

generateMeshLinks();