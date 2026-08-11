/**
 * AQUI TEM ACHADINHOS - BANNER TEMÁTICO FESTA DO PEÃO DE BARRETOS 2026 (v27.0)
 * Controlador de atalhos rápidos e filtragem reativa no Frontend (Zero Reload)
 */

(function(window) {
  'use strict';

  const BarretosBannerController = {
    currentFilter: 'todos',
    initialized: false,

    filterCategories: {
      'todos': [],
      'motoristas': ['motoristas', 'transporte', 'vans', 'taxis', 'motorista', 'translado'],
      'pousadas': ['pousadas', 'hospedagem', 'hoteis', 'hotel', 'camping', 'ranchos', 'chales'],
      'onde-comer': ['onde comer', 'restaurantes', 'churrascarias', 'bares', 'gastronomia', 'lanchonetes'],
      'vagas-temporarias': ['vagas temporarias', 'vagas', 'empregos', 'temporarios', 'trabalho temporario']
    },

    init: function() {
      const filterButtons = document.querySelectorAll('.barretos-filter-btn');
      if (!filterButtons || filterButtons.length === 0) return;

      filterButtons.forEach(btn => {
        // Remove listener duplicado se houver
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetFilter = btn.getAttribute('data-filter') || 'todos';
          this.applyFilter(targetFilter, btn);
        };
      });

      this.initialized = true;
      console.log('✅ [Banner Barretos v27.0] Inicializado e botões vinculados com sucesso.');
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

      // 2. Filtragem Instantânea no StoreRenderer
      if (window.StoreRenderer && typeof window.StoreRenderer.filterBySpecialCategory === 'function') {
        window.StoreRenderer.filterBySpecialCategory(filterKey, this.filterCategories[filterKey]);
      } else if (typeof window.filterStoresState === 'function') {
        window.filterStoresState(filterKey, this.filterCategories[filterKey]);
      }

      // 3. Evento customizado
      const event = new CustomEvent('barretos:filter-changed', {
        detail: {
          filterKey: filterKey,
          allowedCategories: this.filterCategories[filterKey],
          timestamp: Date.now()
        }
      });
      window.dispatchEvent(event);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => BarretosBannerController.init());
  } else {
    BarretosBannerController.init();
  }

  window.BarretosBanner = BarretosBannerController;
})(typeof window !== 'undefined' ? window : global);
