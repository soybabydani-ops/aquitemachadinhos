/**
 * AQUITEM ACHADINHOS — COMPILADOR DE SEGURANÇA E OFUSCAÇÃO DE CÓDIGO (DEVSECOPS)
 * 1. Gera e ofusca o escudo perimetral de segurança (assets/security-shield.js)
 * 2. Ofusca o rastreador de afiliados (assets/affiliate-tracker.js)
 * 3. Injeta regras anti-plágio (user-select: none, anti-F12, anti-inspeção)
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

// 1. CÓDIGO DO ESCUDO DE SEGURANÇA CLIENT-SIDE
const SECURITY_SHIELD_SOURCE = `
(function() {
  'use strict';

  // 1. Bloqueio de Botão Direito (Context Menu)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true, passive: false });

  // 2. Bloqueio de Teclas de Atalho de Inspeção e Cópia (F12, Ctrl+Shift+I, Ctrl+U, etc)
  document.addEventListener('keydown', function(e) {
    var k = e.key || e.keyCode;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    
    // F12
    if (k === 'F12' || k === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I / J / C (DevTools)
    if (ctrl && shift && (k === 'I' || k === 'i' || k === 'J' || k === 'j' || k === 'C' || k === 'c' || k === 73 || k === 74 || k === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (ctrl && (k === 'U' || k === 'u' || k === 85)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Salvar Página)
    if (ctrl && (k === 'S' || k === 's' || k === 83)) {
      e.preventDefault();
      return false;
    }
  }, { capture: true, passive: false });

  // 3. Bloqueio de Drag & Drop de Imagens
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  }, false);

  // 4. Injeção de CSS Anti-Seleção Global
  try {
    var style = document.createElement('style');
    style.innerHTML = 'body, html, .aquitem-card, .item-card { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; } input, textarea, select { -webkit-user-select: auto !important; user-select: auto !important; }';
    document.head.appendChild(style);
  } catch (err) {}

  // 5. Anti-Debugging e Console Wiper Contínuo
  try {
    if (window.console) {
      var noop = function() {};
      var methods = ['log', 'debug', 'info', 'warn', 'error', 'table'];
      // Limpeza de logs periódica
      setInterval(function() {
        try { console.clear(); } catch(e) {}
      }, 5000);
    }
  } catch (err) {}

})();
`;

// 2. FUNÇÃO DE OFUSCAÇÃO ROBUSTA (HEX STRING ENCODING & IIFE MANGLE)
function obfuscateJS(code) {
  const hexStrings = [];
  const regex = /'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"/g;

  // Codificação de strings literais em hexadecimais para ilegibilidade
  let obfuscated = code.replace(regex, (match, single, double) => {
    const str = single !== undefined ? single : double;
    if (str.length === 0) return "''";
    const hex = str.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return `'${hex}'`;
  });

  // Envoltório autodefensivo
  return `/* [AQUITEM SHIELD v35.0 - PROTECTED RUNTIME] */\n(function(_0x1a,_0x2b){var _0x3c=function(_0x4d){return decodeURIComponent(_0x4d);};${obfuscated}})();`;
}

function compileSecurityShield() {
  console.log("🚀 Compilando Escudo Perimetral e Ofuscador de Código...");

  // 1. Gera assets/security-shield.js ofuscado
  const obfuscatedShield = obfuscateJS(SECURITY_SHIELD_SOURCE);
  const shieldPath = path.join(REPO_ROOT, 'assets', 'security-shield.js');
  fs.writeFileSync(shieldPath, obfuscatedShield, 'utf8');
  console.log("✓ assets/security-shield.js compilado e ofuscado com sucesso.");

  // 2. Ofusca assets/affiliate-tracker.js preservando funcionalidade
  const trackerPath = path.join(REPO_ROOT, 'assets', 'affiliate-tracker.js');
  if (fs.existsSync(trackerPath)) {
    const trackerRaw = fs.readFileSync(trackerPath, 'utf8');
    const obfuscatedTracker = obfuscateJS(trackerRaw);
    fs.writeFileSync(trackerPath, obfuscatedTracker, 'utf8');
    console.log("✓ assets/affiliate-tracker.js ofuscado contra roubo de IDs.");
  }

  // 3. Injeta chamada do security-shield.js nas páginas mestres se necessário
  const rootPages = [
    'index.html',
    'marcas.html',
    'viagens.html',
    'ofertas.html',
    'cidades.html',
    'cidade.html',
    'motoristas.html',
    'classificados.html'
  ];

  let injectedCount = 0;
  rootPages.forEach(file => {
    const p = path.join(REPO_ROOT, file);
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf8');
      if (!content.includes('security-shield.js')) {
        content = content.replace('</head>', '  <script src="/assets/security-shield.js" defer></script>\n</head>');
        fs.writeFileSync(p, content, 'utf8');
        injectedCount++;
      }
    }
  });

  console.log(`🏆 Escudo perimetral injetado em ${injectedCount} páginas mestres com sucesso!`);
}

if (require.main === module) {
  compileSecurityShield();
}

module.exports = { compileSecurityShield };
