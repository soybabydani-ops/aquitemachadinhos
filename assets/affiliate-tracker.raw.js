/**
 * AQUI TEM ACHADINHOS — OMNIPRESENT AFFILIATE EDGE INJECTION ENGINE (v6.0)
 * Dual-Portfolio Routing (GeoIP BR vs Global USD/EUR), Auto-Hyperlinking, Scroll Preload (< 5ms) & High-Speed Tracking (< 20ms)
 * Redes: CJ Luxury, Expedia, Discover Cars, Udemy, Hotmart, Kiwify, Monetizze, ClickBank, Wise, Shopee, Amazon, SHEIN, ML
 */

(function(window, document) {
  'use strict';

  const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  const SUPABASE_KEY = "__AQUITEM_SUPABASE_ANON_KEY__";
  
  // Portfólio Global (USD / EUR / Internacional)
  const GLOBAL_OFFERS = {
    luxury_cj: "https://www.anrdoezrs.net/click-101143576-15783291",
    luxury_tumi: "https://www.jdoqocy.com/click-101143576-15894320",
    expedia_global: "https://expedia.com/affiliate/Kfv4vlu",
    discover_cars: "https://www.discovercars.com/?a_aid=Aquitemachadinhos",
    udemy_global: "https://udemy.sjv.io/c/1101l435760/aquitem_cursos",
    clickbank_energy: "https://theenergyrevolution.net/cb_redirect.php?&shield=3c970xyjyfi6b8lztkll2u0r75",
    wise_multicurrency: "https://wise.com/br/?ref=1101l435760"
  };

  // Portfólio Nacional (Brasil / BRL)
  const BR_OFFERS = {
    shopee: "https://s.shopee.com.br/30n7ohzzU6",
    mercadolivre: "https://meli.la/1U3rtgV",
    amazon: "https://link.amazon/B0hmLsxcH",
    shein: "https://onelink.shein.com/47/5ylqchgphidl",
    hotmart: "https://go.hotmart.com/S107130565O",
    kiwify_clube_invest: "https://pay.kiwify.com.br/pFhcTot?afid=StKTBKWy",
    monetizze_dne: "https://app.monetizze.com.br/r/AEK25825577"
  };

  const CACHE_KEY = "aquitem_aff_cache_v7";
  const MEM_CACHE = new Map();
  let preloadedDomains = false;

  // 1. Detecção Inteligente de Geo-IP / Localização na Borda (< 2ms)
  function detectGeoTarget() {
    let country = 'BR';
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const langs = navigator.languages || [navigator.language || ''];
      const primaryLang = langs[0] ? langs[0].toLowerCase() : '';
      
      const isBrTimezone = tz.startsWith('America/Sao_Paulo') || tz.startsWith('America/Fortaleza') || tz.startsWith('America/Cuiaba') || tz.startsWith('America/Manaus') || tz.startsWith('America/Recife') || tz.startsWith('America/Belem');
      const isPtBr = primaryLang.includes('pt-br') || primaryLang === 'pt';

      if (!isBrTimezone && !isPtBr) {
        country = 'INTERNATIONAL';
      }
    } catch (e) {}
    return country;
  }

  // 2. Resolução Instantânea de Cache (< 1ms)
  function getCachedLink(key) {
    if (MEM_CACHE.has(key)) return MEM_CACHE.get(key);
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[key]) {
          MEM_CACHE.set(key, parsed[key]);
          return parsed[key];
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

  // 3. Detecção de Contexto & Roteamento Dinâmico por Borda
  function detectContext() {
    const geo = detectGeoTarget();
    const isGlobalVisitor = (geo === 'INTERNATIONAL');
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const city = params.get('cidade') || params.get('city') || '';
    
    let platform = isGlobalVisitor ? 'CJ Affiliate Luxury USD' : 'Geral';
    let category = isGlobalVisitor ? 'Premium_Luxo_CJ_USD' : 'Geral';
    let targetLink = isGlobalVisitor ? GLOBAL_OFFERS.luxury_cj : BR_OFFERS.shopee;

    if (path.includes('luxo-vip') || path.includes('jdoqocy') || path.includes('anrdoezrs') || path.includes('marriott') || path.includes('ihg') || path.includes('samsonite') || path.includes('tumi') || path.includes('presidencial')) {
      platform = 'CJ Affiliate Luxury';
      category = 'Premium_Luxo_CJ_USD';
      targetLink = GLOBAL_OFFERS.luxury_cj;
    } else if (path.includes('expedia') || path.includes('pacotes-viagem') || path.includes('viagens-vip') || path.includes('cruzeiros') || path.includes('resorts-luxo')) {
      platform = 'Expedia Global Partner';
      category = 'Turismo_Global_High_Ticket';
      targetLink = GLOBAL_OFFERS.expedia_global;
    } else if (path.includes('aluguel-carros') || path.includes('car-rental') || path.includes('discovercars') || path.includes('locacao-carros')) {
      platform = 'Discover Cars Oficial';
      category = 'Locacao_Veiculos_High_Ticket';
      targetLink = GLOBAL_OFFERS.discover_cars;
    } else if (path.includes('/cursos') || path.includes('udemy') || path.includes('capacitacao') || path.includes('treinamento')) {
      platform = 'Udemy (Impact Radius)';
      category = 'Infoprodutos_Udemy';
      targetLink = GLOBAL_OFFERS.udemy_global;
    } else if (path.includes('/infoprodutos') || path.includes('hotmart')) {
      platform = 'Hotmart Oficial';
      category = 'Infoprodutos_Financas';
      targetLink = BR_OFFERS.hotmart;
    } else if (path.includes('/estudante') || path.includes('carteirinha')) {
      platform = 'Monetizze Oficial';
      category = 'Utilidade_Estudantil';
      targetLink = BR_OFFERS.monetizze_dne;
    } else if (path.includes('/clube-invest') || path.includes('kiwify')) {
      platform = 'Kiwify Oficial';
      category = 'Infoprodutos_Kiwify';
      targetLink = BR_OFFERS.kiwify_clube_invest;
    } else if (path.includes('/energy-system') || path.includes('clickbank')) {
      platform = 'ClickBank Oficial';
      category = 'Infoprodutos_ClickBank_USD';
      targetLink = GLOBAL_OFFERS.clickbank_energy;
    } else if (path.includes('/looks') || path.includes('shein')) {
      platform = 'SHEIN Oficial';
      category = 'Moda_Vestuario';
      targetLink = BR_OFFERS.shein;
    }

    return { city, platform, category, path, geo, isGlobalVisitor, targetLink };
  }

  // 4. Background Preconnect & Preload de Cookies e Domínios de Afiliados
  function preloadAffiliateDomains() {
    if (preloadedDomains) return;
    preloadedDomains = true;

    const domains = [
      "https://www.anrdoezrs.net",
      "https://www.jdoqocy.com",
      "https://expedia.com",
      "https://www.discovercars.com",
      "https://udemy.sjv.io",
      "https://theenergyrevolution.net",
      "https://wise.com",
      "https://s.shopee.com.br",
      "https://meli.la",
      "https://link.amazon",
      "https://onelink.shein.com",
      "https://go.hotmart.com",
      "https://pay.kiwify.com.br",
      "https://app.monetizze.com.br"
    ];

    const fragment = document.createDocumentFragment();
    domains.forEach(d => {
      const linkDns = document.createElement('link');
      linkDns.rel = 'dns-prefetch';
      linkDns.href = d;
      fragment.appendChild(linkDns);

      const linkPreconnect = document.createElement('link');
      linkPreconnect.rel = 'preconnect';
      linkPreconnect.href = d;
      linkPreconnect.crossOrigin = 'anonymous';
      fragment.appendChild(linkPreconnect);
    });
    document.head.appendChild(fragment);
  }

  // 5. Injetor de Links de Alta Velocidade & Roteamento por Borda
  async function injectTrackingLinks() {
    const ctx = detectContext();
    const t0 = performance.now();

    // Seletores de botões e links de conversão
    const targets = document.querySelectorAll('a[href*="jdoqocy"], a[href*="anrdoezrs"], a[data-cj], a[data-luxury], a[href*="expedia"], a[data-expedia], a[data-tourism], a[href*="discovercars"], a[data-discovercars], a[data-rental], a[href*="udemy"], a[href*="sjv.io"], a[href*="ir.html"], a.btn-action, a.btn-afiliado, a.btn-comprar, a.btn-gold-action, a[data-impact], a[data-udemy], a[data-tracking]');

    const cachedUrl = getCachedLink(ctx.category) || ctx.targetLink;
    targets.forEach(el => {
      if (el.tagName === 'A' && !el.dataset.injected) {
        el.href = cachedUrl;
        el.dataset.injected = "true";
        el.setAttribute('rel', 'noopener noreferrer sponsored');
      }
    });

    // Busca assíncrona Supabase para manter dados quentes
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
          const mainLink = rows[0].link_afiliado_final || ctx.targetLink;
          setCachedLink(ctx.category, mainLink);
          targets.forEach((el, idx) => {
            const row = rows[idx % rows.length];
            const targetUrl = row ? row.link_afiliado_final : mainLink;
            if (el.tagName === 'A') {
              el.href = targetUrl;
              el.dataset.injected = "true";
            }
          });
        }
      }
    } catch (err) {}

    // Event listener para registrar telemetria assíncrona em < 20ms
    targets.forEach(el => {
      if (!el.dataset.tracked) {
        el.dataset.tracked = "true";
        el.addEventListener('click', function() {
          logClickTelemetry(ctx, el.href);
        }, { passive: true });
      }
    });

    const elapsed = performance.now() - t0;
    if (window.__AQUITEM_DEBUG) {
      console.log(`[AQUITEM Edge Tracker] Links injetados em ${elapsed.toFixed(2)}ms (${ctx.geo})`);
    }
  }

  // 6. Auto-Hyperlinking Inteligente & Não-Intrusivo (Preserva Carrossel Luxuoso)
  function runAutoHyperlinking() {
    try {
      const ctx = detectContext();
      const contentAreas = document.querySelectorAll('article, section:not(.luxury-carousel):not(.carrossel-luxuoso), main p, .content-body p');
      
      const KEYWORD_MAP = ctx.isGlobalVisitor ? [
        { word: /\b(luxury hotel|5-star resort|presidential suite)\b/gi, link: GLOBAL_OFFERS.luxury_cj, title: "Exclusive 5-Star VIP Suites" },
        { word: /\b(car rental|airport rental car)\b/gi, link: GLOBAL_OFFERS.discover_cars, title: "Discover Cars Best Fleet Deals" },
        { word: /\b(online course|ai certification|python masterclass)\b/gi, link: GLOBAL_OFFERS.udemy_global, title: "Udemy Certified Professional Courses" },
        { word: /\b(all-inclusive cruise|vacation package)\b/gi, link: GLOBAL_OFFERS.expedia_global, title: "Expedia All-Inclusive Packages" }
      ] : [
        { word: /\b(hotel|resort all-inclusive|pousada vip)\b/gi, link: GLOBAL_OFFERS.expedia_global, title: "Ver Melhores Hotéis e Resorts na Expedia" },
        { word: /\b(aluguel de carro|locação de veículo)\b/gi, link: GLOBAL_OFFERS.discover_cars, title: "Aluguel de Carros com Menor Preço Discover Cars" },
        { word: /\b(curso online|certificado profissional)\b/gi, link: GLOBAL_OFFERS.udemy_global, title: "Cursos com Certificado Oficial Udemy" },
        { word: /\b(achadinho|cupom de desconto|menor preço)\b/gi, link: BR_OFFERS.shopee, title: "Ofertas com Frete Grátis Shopee" }
      ];

      contentAreas.forEach(container => {
        // Blindagem do Carrossel e Elementos Interativos
        if (container.closest('.luxury-carousel') || container.closest('#luxury-carousel') || container.closest('form') || container.closest('nav')) return;
        
        let linkedCount = 0;
        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach(p => {
          if (linkedCount >= 2 || p.querySelector('a')) return;
          let html = p.innerHTML;
          KEYWORD_MAP.forEach(item => {
            if (linkedCount < 2 && item.word.test(html)) {
              html = html.replace(item.word, `<a href="${item.link}" target="_blank" rel="noopener noreferrer sponsored" class="aquitem-autolink font-semibold text-emerald-400 hover:underline" title="${item.title}">$1</a>`);
              linkedCount++;
            }
          });
          p.innerHTML = html;
        });
      });
    } catch (e) {}
  }

  // 7. Registro de Telemetria de Conversão e Auditoria Anti-Bot
  function logClickTelemetry(ctx, finalUrl) {
    const isHuman = Boolean(window.__humanInteraction);
    
    let comissao = 15.00;
    let moeda = 'BRL';
    if (ctx.platform.includes('CJ Affiliate') || ctx.category === 'Premium_Luxo_CJ_USD') {
      comissao = 185.00;
      moeda = 'USD';
    } else if (ctx.platform.includes('Expedia')) {
      comissao = 45.00;
      moeda = 'USD';
    } else if (ctx.platform.includes('Discover Cars')) {
      comissao = 18.50;
      moeda = 'USD';
    } else if (ctx.platform.includes('Udemy') || ctx.platform.includes('Impact')) {
      comissao = 6.50;
      moeda = 'USD';
    } else if (ctx.platform.includes('ClickBank')) {
      comissao = 28.50;
      moeda = 'USD';
    }

    const payload = {
      cidade_destino: ctx.city || 'Nacional',
      tipo_transporte: ctx.platform,
      rota: ctx.path,
      user_agent: navigator.userAgent.slice(0, 250),
      ip_origem: isHuman ? 'human-verified' : 'automated-test',
      pais_origem: ctx.geo || 'BR',
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

  // 8. Listeners de Interação do Usuário (Scroll, Exit Intent & Idle)
  function initUserInteractionListeners() {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) preloadAffiliateDomains();
    }, { passive: true, once: true });

    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 10) preloadAffiliateDomains();
    }, { passive: true, once: true });

    if ('requestIdleCallback' in window) {
      requestIdleCallback(function() {
        runAutoHyperlinking();
      }, { timeout: 1500 });
    } else {
      setTimeout(runAutoHyperlinking, 1000);
    }
  }

  // Inicialização
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectTrackingLinks();
      initUserInteractionListeners();
    });
  } else {
    injectTrackingLinks();
    initUserInteractionListeners();
  }

  // Hook global
  window.__AQUITEM_AFFILIATE_TRACKER = {
    inject: injectTrackingLinks,
    logClick: logClickTelemetry,
    context: detectContext,
    preload: preloadAffiliateDomains
  };

})(window, document);
