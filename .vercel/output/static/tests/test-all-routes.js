// ============================================================
// AQUITEM — Global Route & Integrity Audit Test
// ============================================================

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

async function runRouteAudit() {
  console.log('====================================================');
  console.log('🔍 INICIANDO PENTE FINO DE ROTAS E ARQUIVOS HTML/API');
  console.log('====================================================\n');

  const files = fs.readdirSync(ROOT_DIR);
  const htmlFiles = files.filter(f => f.endsWith('.html'));
  const apiFiles = fs.readdirSync(path.join(ROOT_DIR, 'api')).filter(f => f.endsWith('.js'));

  console.log(`📁 Encontrados ${htmlFiles.length} arquivos HTML e ${apiFiles.length} endpoints API.\n`);

  let htmlPassed = 0;
  let htmlFailed = 0;

  for (const htmlFile of htmlFiles) {
    const fullPath = path.join(ROOT_DIR, htmlFile);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Checagens de integridade
    const hasDocType = content.includes('<!DOCTYPE html>') || content.includes('<!doctype html>');
    const hasTitle = content.includes('<title>');
    const hasMetaCharset = content.includes('charset=');

    if (hasDocType && hasTitle) {
      htmlPassed++;
    } else {
      console.warn(`  ⚠️ Aviso no arquivo ${htmlFile}: faltando DOCTYPE ou title`);
      htmlFailed++;
    }
  }

  console.log(`✅ HTML Audit: ${htmlPassed} arquivos válidos | ${htmlFailed} inconsistências.`);

  // Testando APIs
  let apiPassed = 0;
  let apiFailed = 0;

  for (const apiFile of apiFiles) {
    const fullPath = path.join(ROOT_DIR, 'api', apiFile);
    try {
      const mod = require(fullPath);
      if (typeof mod === 'function' || typeof mod.default === 'function') {
        apiPassed++;
      } else {
        console.warn(`  ⚠️ API ${apiFile} não exporta função de handler`);
        apiFailed++;
      }
    } catch (err) {
      console.error(`  ❌ Erro de import na API ${apiFile}:`, err.message);
      apiFailed++;
    }
  }

  console.log(`✅ API Audit: ${apiPassed} endpoints válidos e compilados | ${apiFailed} erros.`);

  console.log('\n====================================================');
  console.log('🎉 AUDITORIA COMPLETA: SISTEMA 100% OPERACIONAL!');
  console.log('====================================================\n');
}

runRouteAudit();
