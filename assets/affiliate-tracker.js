/**
 * AQUI TEM ACHADINHOS - MONITOR & INJETOR DINÂMICO DE LINKS DE AFILIADOS (v28.0)
 * Substitui o botão de compra pela url_rastreamento do Supabase e registra cliques em tempo real.
 */

(function(window) {
  'use strict';

  const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

  const AffiliateTracker = {
    init: function() {
      this.bindButtons();
    },

    bindButtons: async function() {
      const buttons = document.querySelectorAll('[data-affiliate-dest], #btnFinalCta, #btnArbitrageCta, [data-affiliate-btn]');
      if (!buttons || buttons.length === 0) return;

      buttons.forEach(async (btn) => {
        const destino = btn.getAttribute('data-affiliate-dest') || this.detectCity();
        const tipo = btn.getAttribute('data-affiliate-type') || 'Rodoviário';
        const rota = btn.getAttribute('data-affiliate-route') || `SP-${destino}`;

        // Busca a url_rastreamento do Supabase
        const trackingUrl = await this.getTrackingUrl(destino, tipo, rota);
        
        // Atualiza a URL do botão se já tiver destravado
        if (btn.tagName === 'A' && btn.href && !btn.href.includes('javascript:')) {
          btn.setAttribute('data-target-url', trackingUrl);
        }

        // Listener de clique para contagem atômica no Supabase
        btn.addEventListener('click', () => {
          this.logClick(destino, tipo, rota);
        });
      });
    },

    detectCity: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const c = urlParams.get('cidade') || urlParams.get('destino') || '';
      if (c) return c;

      const path = window.location.pathname.toLowerCase();
      if (path.includes('barretos')) return 'Barretos';
      if (path.includes('gramado')) return 'Gramado';
      if (path.includes('santos')) return 'Santos';
      if (path.includes('campinas')) return 'Campinas';
      if (path.includes('rio')) return 'Rio de Janeiro';
      return 'São Paulo';
    },

    getTrackingUrl: async function(destino, tipo, rota) {
      try {
        const res = await fetch(`${SUPABASE_URL}/links_afiliados?cidade_destino=ilike.${encodeURIComponent(destino)}&tipo_transporte=ilike.${encodeURIComponent(tipo)}&select=*&limit=1`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
          }
        });

        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0) {
            return rows[0].url_rastreamento;
          }
        }
      } catch (e) {
        console.warn('[AffiliateTracker] Usando fallback de rastreamento:', e);
      }

      return `https://wa.me/5517991238899?text=${encodeURIComponent(`Olá! Quero minha passagem promocional para ${destino} via Aqui Tem Achadinhos.`)}`;
    },

    logClick: function(destino, tipo, rota) {
      try {
        // Envia requisição assíncrona para contagem no Supabase
        fetch(`${SUPABASE_URL}/cliques_afiliados_logs`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            cidade_destino: destino,
            tipo_transporte: tipo,
            rota: rota || `SP-${destino}`,
            user_agent: navigator.userAgent || 'browser',
            criado_em: new Date().toISOString()
          })
        }).catch(() => {});
      } catch (err) {}
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AffiliateTracker.init());
  } else {
    AffiliateTracker.init();
  }

  window.AffiliateTracker = AffiliateTracker;
})(typeof window !== 'undefined' ? window : global);
