/**
 * AQUI TEM ACHADINHOS — HIGH-SPEED AFFILIATE TRACKER & DYNAMIC INJECTOR (< 20ms)
 * Rede Global: Udemy (Impact Radius 1101l435760), Hotmart, Monetizze, Kiwify, ClickBank, Wise, Shopee, Amazon, SHEIN, ML
 */

(function(window, document) {
  'use strict';

  const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";
  
  const IMPACT_UDEMY_DEFAULT = "https://udemy.sjv.io/c/1101l435760/aquitem_cursos";
  const CACHE_KEY = "aquitem_aff_cache_v3";
  const MEM_CACHE = new Map();

  // 1. Resolução em menos de 20ms a partir do cache local
  function getCachedLink(categoryOrSlug) {
    if (MEM_CACHE.has(categoryOrSlug)) return MEM_CACHE.get(categoryOrSlug);
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[categoryOrSlug]) {
          MEM_CACHE.set(categoryOrSlug, parsed[categoryOrSlug]);
          return parsed[categoryOrSlug];
        }
      }
    } catch (e) {}
    return null;
  }

  function setCachedLink(key, val) {
    MEM_CACHE.set(key, val);
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[key] = val;
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
    } catch (e) {}
  }

  // 2. Detecção rápida de cidade e plataforma da URL
  function detectContext() {
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const city = params.get('cidade') || params.get('city') || '';
    
    let platform = 'Geral';
    let category = 'Geral';

    if (path.includes('/cursos') || path.includes('udemy') || path.includes('capacitacao') || path.includes('treinamento')) {
      platform = 'Udemy (Impact Radius)';
      category = 'Infoprodutos_Udemy';
    } else if (path.includes('/infoprodutos') || path.includes('hotmart')) {
      platform = 'Hotmart Oficial';
      category = 'Infoprodutos_Financas';
    } else if (path.includes('/estudante') || path.includes('carteirinha')) {
      platform = 'Monetizze Oficial';
      category = 'Utilidade_Estudantil';
    } else if (path.includes('/clube-invest') || path.includes('kiwify')) {
      platform = 'Kiwify Oficial';
      category = 'Infoprodutos_Kiwify';
    } else if (path.includes('/energy-system') || path.includes('clickbank')) {
      platform = 'ClickBank Oficial';
      category = 'Infoprodutos_ClickBank_USD';
    } else if (path.includes('/shopee') || path.includes('achadinhos')) {
      platform = 'Shopee';
      category = 'Eletrônicos';
    }

    return { city, platform, category, path };
  }

  // 3. Injetor de Links de Alta Velocidade (< 20ms)
  async function injectTrackingLinks() {
    const ctx = detectContext();
    const t0 = performance.now();

    // Seletores de botões e links de ação
    const targets = document.querySelectorAll('a[href*="udemy"], a[href*="sjv.io"], a[href*="ir.html"], a.btn-action, a.btn-afiliado, a.btn-comprar, a.btn-gold-action, a[data-impact], a[data-udemy], a[data-tracking]');

    // Se já estiver em cache, injeta instantaneamente (< 1ms)
    const cachedUrl = getCachedLink(ctx.category);
    if (cachedUrl) {
      targets.forEach(el => {
        if (el.tagName === 'A' && !el.dataset.injected) {
          el.href = cachedUrl;
          el.dataset.injected = "true";
        }
      });
    }

    // Busca assíncrona para aquecer o cache e atualizar caso necessário
    try {
      const res = await fetch(`${SUPABASE_URL}/achadinhos_produtos_monetizados?categoria=eq.${encodeURIComponent(ctx.category)}&select=slug,link_afiliado_final,plataforma&limit=5`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          const mainLink = rows[0].link_afiliado_final || IMPACT_UDEMY_DEFAULT;
          setCachedLink(ctx.category, mainLink);
          
          targets.forEach((el, idx) => {
            const row = rows[idx % rows.length];
            const targetUrl = row ? row.link_afiliado_final : mainLink;
            if (el.tagName === 'A') {
              el.href = targetUrl;
              el.dataset.injected = "true";
              el.setAttribute('rel', 'noopener noreferrer sponsored');
            }
          });
        }
      }
    } catch (err) {}

    // 4. Listener de Log de Cliques em Alta Frequência
    targets.forEach(el => {
      if (!el.dataset.tracked) {
        el.dataset.tracked = "true";
        el.addEventListener('click', function(e) {
          logClickTelemetry(ctx, el.href);
        }, { passive: true });
      }
    });

    const elapsed = performance.now() - t0;
    if (window.__AQUITEM_DEBUG) {
      console.log(`[AQUITEM Tracker] Links injetados em ${elapsed.toFixed(2)}ms para ${ctx.platform}`);
    }
  }

  // 5. Registro de Telemetria de Conversão e Auditoria Anti-Bot
  function logClickTelemetry(ctx, finalUrl) {
    const isHuman = Boolean(window.__humanInteraction);
    const duration = window.__pageStartTime ? Math.round((performance.now() - window.__pageStartTime) / 1000) : 0;
    
    let comissao = 15.00;
    let moeda = 'BRL';
    if (ctx.platform.includes('Udemy') || ctx.platform.includes('Impact')) {
      comissao = 6.50; // USD
      moeda = 'USD';
    } else if (ctx.platform.includes('ClickBank')) {
      comissao = 28.50; // USD
      moeda = 'USD';
    }

    const payload = {
      cidade_destino: ctx.city || 'Nacional',
      tipo_transporte: ctx.platform,
      rota: ctx.path,
      user_agent: navigator.userAgent.slice(0, 250),
      ip_origem: isHuman ? 'human-verified' : 'automated-test',
      pais_origem: 'BR',
      cidade_local: ctx.city || 'São Paulo',
      plataforma_afiliado: ctx.platform,
      url_origem: window.location.href.slice(0, 250),
      comissao_estimada_usd_brl: comissao,
      moeda: moeda,
      criado_em: new Date().toISOString()
    };

    try {
      const url = `${SUPABASE_URL}/cliques_afiliados_logs`;
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: body,
          keepalive: true
        }).catch(function() {});
      }
    } catch (e) {}
  }

  // Inicialização no DOMContentLoaded e imediata se já carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectTrackingLinks);
  } else {
    injectTrackingLinks();
  }

  // Hook global
  window.__AQUITEM_AFFILIATE_TRACKER = {
    inject: injectTrackingLinks,
    logClick: logClickTelemetry,
    context: detectContext
  };

})(window, document);
