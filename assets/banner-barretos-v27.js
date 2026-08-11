/**
 * AQUI TEM ACHADINHOS - BANNER TEMÁTICO FESTA DO PEÃO DE BARRETOS 2026 (v27.0)
 * Controlador de atalhos rápidos e filtragem reativa no Frontend (Zero Reload)
 */

(function(window) {
  'use strict';

  const BarretosBannerController = {
    currentFilter: 'todos',
    initialized: false,

    // Mapeamento semântico de categorias de alta demanda para Barretos 2026
    filterCategories: {
      'todos': [],
      'motoristas': ['motoristas', 'transporte', 'vans', 'taxis', 'motorista', 'translado'],
      'pousadas': ['pousadas', 'hospedagem', 'hoteis', 'hotel', 'camping', 'ranchos'],
      'onde-comer': ['onde comer', 'restaurantes', 'churrascarias', 'bares', 'gastronomia', 'lanchonetes'],
      'vagas-temporarias': ['vagas temporarias', 'vagas', 'empregos', 'temporarios', 'trabalho temporario']
    },

    init: function() {
      if (this.initialized) return;

      const filterButtons = document.querySelectorAll('.barretos-filter-btn');
      if (!filterButtons || filterButtons.length === 0) return;

      filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetFilter = btn.getAttribute('data-filter') || 'todos';
          this.applyFilter(targetFilter, btn);
        });
      });

      this.initialized = true;
      console.log('✅ [Banner Barretos v27.0] Inicializado com sucesso. Modo State-Only ativo.');
    },

    applyFilter: function(filterKey, activeBtnElement) {
      this.currentFilter = filterKey;

      // 1. Atualização visual dos botões de atalho
      const filterButtons = document.querySelectorAll('.barretos-filter-btn');
      filterButtons.forEach(b => b.classList.remove('active'));

      if (activeBtnElement) {
        activeBtnElement.classList.add('active');
      } else {
        const matchingBtn = document.querySelector(`.barretos-filter-btn[data-filter="${filterKey}"]`);
        if (matchingBtn) matchingBtn.classList.add('active');
      }

      // 2. Filtragem Instantânea no Estado do Frontend (Zero Reload)
      if (window.StoreRenderer && typeof window.StoreRenderer.filterBySpecialCategory === 'function') {
        window.StoreRenderer.filterBySpecialCategory(filterKey, this.filterCategories[filterKey]);
      } else if (typeof window.filterStoresState === 'function') {
        window.filterStoresState(filterKey, this.filterCategories[filterKey]);
      }

      // 3. Disparo de evento customizado para módulos complementares
      const event = new CustomEvent('barretos:filter-changed', {
        detail: {
          filterKey: filterKey,
          allowedCategories: this.filterCategories[filterKey],
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(event);
    },

    matchesFilter: function(itemCategory, filterKey) {
      if (!filterKey || filterKey === 'todos') return true;
      const targets = this.filterCategories[filterKey];
      if (!targets || targets.length === 0) return true;

      const normalized = (itemCategory || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return targets.some(target => {
        const normTarget = target.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return normalized.includes(normTarget) || normTarget.includes(normalized);
      });
    }
  };

  // Auto-inicialização quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BarretosBannerController.init());
  } else {
    BarretosBannerController.init();
  }

  window.BarretosBanner = BarretosBannerController;
})(typeof window !== 'undefined' ? window : global);
