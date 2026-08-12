/**
 * AQUITEM ACHADINHOS — COMPILADOR DE SEGURANÇA, OFUSCAÇÃO & ANTI-BOT BEHAVIORAL SHIELD
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

const SECURITY_SHIELD_SOURCE = `
(function() {
  'use strict';

  // 1. Variáveis de Telemetria Comportamental Humana
  window.__humanInteraction = false;
  window.__pageStartTime = performance.now();

  window.addEventListener('mousemove', function() { window.__humanInteraction = true; }, { passive: true, once: true });
  window.addEventListener('touchstart', function() { window.__humanInteraction = true; }, { passive: true, once: true });
  window.addEventListener('scroll', function() { window.__humanInteraction = true; }, { passive: true, once: true });
  window.addEventListener('keydown', function() { window.__humanInteraction = true; }, { passive: true, once: true });

  // 2. Bloqueio de Botão Direito (Context Menu)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true, passive: false });

  // 3. Bloqueio de Teclas de Atalho de Inspeção e Cópia (F12, Ctrl+Shift+I, Ctrl+U, etc)
  document.addEventListener('keydown', function(e) {
    var k = e.key || e.keyCode;
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    
    if (k === 'F12' || k === 123) { e.preventDefault(); return false; }
    if (ctrl && shift && (k === 'I' || k === 'i' || k === 'J' || k === 'j' || k === 'C' || k === 'c' || k === 73 || k === 74 || k === 67)) { e.preventDefault(); return false; }
    if (ctrl && (k === 'U' || k === 'u' || k === 85)) { e.preventDefault(); return false; }
    if (ctrl && (k === 'S' || k === 's' || k === 83)) { e.preventDefault(); return false; }
  }, { capture: true, passive: false });

  // 4. Bloqueio de Drag & Drop de Imagens
  document.addEventListener('dragstart', function(e) { e.preventDefault(); return false; }, false);

  // 5. Injeção de CSS Anti-Seleção Global
  try {
    var style = document.createElement('style');
    style.innerHTML = 'body, html, .aquitem-card, .item-card { -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; } input, textarea, select { -webkit-user-select: auto !important; user-select: auto !important; }';
    document.head.appendChild(style);
  } catch (err) {}

  // 6. Anti-Debugging & Console Wiper
  try {
    if (window.console) {
      setInterval(function() {
        try { console.clear(); } catch(e) {}
      }, 5000);
    }
  } catch (err) {}

})();
`;

function obfuscateJS(code) {
  const regex = /'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"/g;
  let obfuscated = code.replace(regex, (match, single, double) => {
    const str = single !== undefined ? single : double;
    if (str.length === 0) return "''";
    const hex = str.split('').map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return `'${hex}'`;
  });
  return `/* [AQUITEM SHIELD v36.0 - AUDITED BEHAVIORAL RUNTIME] */\n(function(_0x1a,_0x2b){var _0x3c=function(_0x4d){return decodeURIComponent(_0x4d);};${obfuscated}})();`;
}

function compileSecurityShield() {
  console.log("🚀 Compilando Escudo de Segurança com Auditoria Comportamental Anti-Bot...");

  const obfuscatedShield = obfuscateJS(SECURITY_SHIELD_SOURCE);
  const shieldPath = path.join(REPO_ROOT, 'assets', 'security-shield.js');
  fs.writeFileSync(shieldPath, obfuscatedShield, 'utf8');
  console.log("✓ assets/security-shield.js compilado com detecção de interação humana.");

  const trackerPath = path.join(REPO_ROOT, 'assets', 'affiliate-tracker.js');
  if (fs.existsSync(trackerPath)) {
    const trackerRaw = fs.readFileSync(trackerPath, 'utf8');
    const obfuscatedTracker = obfuscateJS(trackerRaw);
    fs.writeFileSync(trackerPath, obfuscatedTracker, 'utf8');
    console.log("✓ assets/affiliate-tracker.js ofuscado e protegido contra bots.");
  }
}

if (require.main === module) {
  compileSecurityShield();
}

module.exports = { compileSecurityShield };
