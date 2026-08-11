// ============================================================
// AQUITEM — Multi-Domain Fantasma Engine (Rede de Domínios PBN)
// Injeta paletas CSS dinâmicas, logos e nomes de marca com base no Hostname
// Permite dominar múltiplas posições no Google usando a mesma base Supabase.
// ============================================================

(function() {
  'use strict';

  var DOMAIN_THEMES = {
    // 1. Rede de Guias Locais Parceiros
    'guiadebarretos.com.br': {
      brandName: 'GUIA DE BARRETOS',
      tagline: 'O Guia Oficial da Capital do Rodeio',
      primaryColor: '#F59E0B',
      accentColor: '#D97706',
      bgDark: '#0A1118',
      cityDefault: 'barretos',
      badgeText: '👑 GUIA OFICIAL DE BARRETOS'
    },
    'guiadeolimpia.com.br': {
      brandName: 'GUIA DE OLÍMPIA',
      tagline: 'O Portal Oficial das Águas Quentes',
      primaryColor: '#06B6D4',
      accentColor: '#0891B2',
      bgDark: '#081726',
      cityDefault: 'olimpia',
      badgeText: '🌊 PARQUES & ÁGUAS QUENTES'
    },
    'achadinhosribeirao.com.br': {
      brandName: 'ACHADINHOS RIBEIRÃO',
      tagline: 'O Maior Guia Comercial de Ribeirão Preto',
      primaryColor: '#10B981',
      accentColor: '#059669',
      bgDark: '#061A14',
      cityDefault: 'ribeirao-preto',
      badgeText: '🌾 POLO REGIONAL RIBEIRÃO'
    },
    'guiadegramado.com.br': {
      brandName: 'GUIA DE GRAMADO',
      tagline: 'O Guia Premium da Serra Gaúcha',
      primaryColor: '#E11D48',
      accentColor: '#BE123C',
      bgDark: '#190A10',
      cityDefault: 'gramado',
      badgeText: '❄️ SERRA GAÚCHA OFICIAL'
    },
    'marcas.aquitemachadinhos.com.br': {
      brandName: 'VITRINE NACIONAL DE MARCAS',
      tagline: 'Grandes Marcas, Franquias e Indústrias do Brasil',
      primaryColor: '#F5D77F',
      accentColor: '#D9AA42',
      bgDark: '#050F22',
      cityDefault: '',
      badgeText: '🏢 REDE B2B NACIONAL'
    }
  };

  function applyGhostDomainTheme() {
    var host = (window.location.hostname || '').toLowerCase();
    
    // Procura correspondência exata ou subdomínio
    var theme = DOMAIN_THEMES[host];
    var citySlug = '';

    if (!theme) {
      // Checa subdomínio tipo: barretos.aquitemachadinhos.com.br
      var parts = host.split('.');
      if (parts.length >= 3 && parts[0] !== 'www' && parts[0] !== 'api' && parts[0] !== 'marcas') {
        citySlug = parts[0];
        var cityNameCap = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
        theme = {
          brandName: 'AQUITEM ' + cityNameCap.toUpperCase(),
          tagline: 'Guia Local, Vagas e Comércio em ' + cityNameCap,
          primaryColor: '#F5D77F',
          accentColor: '#D9AA42',
          bgDark: '#07142B',
          cityDefault: citySlug,
          badgeText: '📍 GUIA LOCAL · ' + cityNameCap.toUpperCase()
        };
      }
    }

    if (theme) {
      // Injeta variáveis CSS dinâmicas
      var root = document.documentElement;
      if (theme.primaryColor) root.style.setProperty('--gold-500', theme.primaryColor);
      if (theme.accentColor) root.style.setProperty('--gold-600', theme.accentColor);
      if (theme.bgDark) root.style.setProperty('--bg-dark', theme.bgDark);

      // Injeta Estilo Customizado de Sobrescrita
      var styleEl = document.createElement('style');
      styleEl.id = 'aquitem-ghost-theme';
      styleEl.innerHTML = '\
        :root { --primary-ghost: ' + theme.primaryColor + '; }\
        .text-amber-400, .text-amber-300 { color: ' + theme.primaryColor + ' !important; }\
        .bg-amber-400, .bg-amber-500 { background-color: ' + theme.primaryColor + ' !important; }\
        .border-amber-400\\/30 { border-color: ' + theme.primaryColor + '44 !important; }\
      ';
      document.head.appendChild(styleEl);

      // Atualiza Elementos de Marca Visíveis
      document.addEventListener('DOMContentLoaded', function() {
        var logoTexts = document.querySelectorAll('.ghost-brand-name, #header-brand-name');
        logoTexts.forEach(function(el) {
          el.textContent = theme.brandName;
        });

        var badgeEls = document.querySelectorAll('.ghost-badge, #header-location-badge');
        badgeEls.forEach(function(el) {
          el.textContent = theme.badgeText;
        });
      });
    }
  }

  applyGhostDomainTheme();
})();
