/**
 * AQUI TEM ACHADINHOS - RENDERIZADOR DE PRIVILÉGIOS DE PLANO (v22.0 / v28.0)
 * Renderização estrita de privilégios (Ouro vs Bronze vs Gratuito) e Alerta de Leads
 */

(function(window) {
  'use strict';

  const StoreRenderer = {
    allStores: [],
    filteredStores: [],
    containerSelector: '#stores-container',
    cidadeAtual: 'Barretos',
    cidadeSlug: 'barretos',

    init: function(stores, containerSelector, cidadeInfo) {
      if (Array.isArray(stores)) {
        this.allStores = [...stores];
        this.filteredStores = [...stores];
      }
      if (containerSelector) this.containerSelector = containerSelector;
      if (cidadeInfo) {
        this.cidadeAtual = cidadeInfo.nome || this.cidadeAtual;
        this.cidadeSlug = cidadeInfo.slug || this.cidadeSlug;
      }

      this.render();
      console.log(`✅ [StoreRenderer v22.0] Inicializado com ${this.allStores.length} empresas.`);
    },

    setStores: function(stores) {
      this.allStores = Array.isArray(stores) ? [...stores] : [];
      this.filteredStores = [...this.allStores];
      this.render();
    },

    filterBySpecialCategory: function(filterKey, allowedCategories) {
      if (!filterKey || filterKey === 'todos' || !allowedCategories || allowedCategories.length === 0) {
        this.filteredStores = [...this.allStores];
      } else {
        this.filteredStores = this.allStores.filter(store => {
          const cat = (store.categoria || store.ramo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          const nome = (store.nome_fantasia || store.nome || store.razao_social || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          
          return allowedCategories.some(target => {
            const normTarget = target.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return cat.includes(normTarget) || normTarget.includes(cat) || nome.includes(normTarget);
          });
        });
      }
      this.render();
    },

    sortStoresByPlan: function(stores) {
      const planWeight = {
        'ouro': 3,
        'premium': 3,
        'bronze': 2,
        'gratuito': 1,
        'pre_cadastro': 1
      };

      return [...stores].sort((a, b) => {
        const weightA = planWeight[a.tipo_plano || 'pre_cadastro'] || 1;
        const weightB = planWeight[b.tipo_plano || 'pre_cadastro'] || 1;
        return weightB - weightA;
      });
    },

    renderCardHTML: function(store) {
      const plano = (store.tipo_plano || 'pre_cadastro').toLowerCase();
      const isOuro = plano === 'ouro' || plano === 'premium';
      const isBronze = plano === 'bronze';
      const isGratuito = !isOuro && !isBronze;

      const nome = store.nome_fantasia || store.nome || store.razao_social || 'Empresa Local';
      const categoria = store.categoria || store.ramo || 'Comércio & Serviços';
      const endereco = store.endereco || `${store.bairro || 'Centro'}, ${store.cidade || this.cidadeAtual}`;
      const telefone = store.whatsapp_contato || store.telefone || '';
      const cleanPhone = telefone.replace(/\D/g, '');

      // Card Classes
      let cardClass = 'aquitem-card';
      if (isOuro) cardClass += ' aquitem-card-ouro shimmer-gold-border';
      else if (isBronze) cardClass += ' aquitem-card-bronze';
      else cardClass += ' aquitem-card-gratis';

      // Badge Topo
      let badgeHTML = '';
      if (isOuro) {
        badgeHTML = `<div class="badge-ouro-verificado">👑 Empresa Verificada Ouro</div>`;
      } else if (isBronze) {
        badgeHTML = `<div class="badge-bronze-membro">🥉 Membro Verificado Bronze</div>`;
      } else {
        badgeHTML = `<div class="badge-gratis-institucional">✓ Pré-Cadastro Institucional</div>`;
      }

      // Badges Adicionais do Ouro
      let extraBadgesOuro = '';
      if (isOuro) {
        extraBadgesOuro = `
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
            <span style="background: rgba(245, 215, 127, 0.15); color: #F5D77F; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(245, 215, 127, 0.3);">
              ✦ Vagas Ativas
            </span>
            <span style="background: rgba(239, 68, 68, 0.15); color: #FCA5A5; font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(239, 68, 68, 0.3);">
              🔥 Oferta Especial
            </span>
          </div>
        `;
      }

      // Seção de Contato e Botões
      let actionHTML = '';
      if (isOuro || isBronze) {
        const phoneFormatted = telefone || '(17) 99999-0000';
        const waLink = cleanPhone ? `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá! Encontrei a ${nome} no portal Aqui Tem Achadinhos e gostaria de um orçamento.`)}` : '#';
        actionHTML = `
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="font-size: 0.85rem; color: #94A3B8; margin-bottom: 4px;">
              📞 WhatsApp / Contato: <strong style="color: #F8FAFC;">${phoneFormatted}</strong>
            </div>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-whatsapp-direct" style="width: 100%;">
              <span>💬</span> Chamar no WhatsApp
            </a>
          </div>
        `;
      } else {
        // Empresa Gratuita: Contato Oculto + Alerta de Novos Leads (< 48h)
        const encodedStore = encodeURIComponent(JSON.stringify({
          nome: nome,
          cidade: store.cidade || this.cidadeAtual,
          categoria: categoria
        }));

        actionHTML = `
          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="font-size: 0.82rem; color: #64748B; font-style: italic;">
              🔒 Telefone e WhatsApp ocultos pelo modo institucional gratuito
            </div>
            <div class="aquitem-badge-lead-urgente" onclick="window.StoreRenderer.triggerLockModal('${encodedStore}')">
              <span>🔥</span>
              <span>Há 1 cliente aguardando orçamento de <strong>${categoria}</strong> nesta cidade. Clique aqui para ativar o plano e liberar</span>
            </div>
            <button type="button" class="btn-desbloquear-leads" style="width: 100%;" onclick="window.StoreRenderer.triggerLockModal('${encodedStore}')">
              🚀 Reivindicar Perfil e Liberar Leads →
            </button>
          </div>
        `;
      }

      return `
        <div class="${cardClass}" data-store-id="${store.id || ''}" data-plan="${plano}">
          <div>
            ${badgeHTML}
            <h3 style="font-size: 1.2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 4px;">
              ${nome}
            </h3>
            <div style="font-size: 0.85rem; color: ${isOuro ? '#F5D77F' : '#94A3B8'}; font-weight: 600; margin-bottom: 8px;">
              📍 ${categoria}
            </div>
            <div style="font-size: 0.85rem; color: #CBD5E1; line-height: 1.4;">
              🏢 ${endereco}
            </div>
            ${extraBadgesOuro}
          </div>
          <div>
            ${actionHTML}
          </div>
        </div>
      `;
    },

    render: function() {
      const container = document.querySelector(this.containerSelector);
      if (!container) return;

      if (!this.filteredStores || this.filteredStores.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(7, 21, 48, 0.5); border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.2);">
            <p style="color: #94A3B8; font-size: 1.1rem;">Nenhuma empresa encontrada com os filtros selecionados.</p>
            <button onclick="window.BarretosBanner.applyFilter('todos')" class="barretos-filter-btn active" style="margin-top: 16px;">
              Limpar Filtro e Exibir Todas
            </button>
          </div>
        `;
        return;
      }

      const sorted = this.sortStoresByPlan(this.filteredStores);
      container.innerHTML = sorted.map(store => this.renderCardHTML(store)).join('');
    },

    triggerLockModal: function(encodedStoreJson) {
      try {
        const storeData = JSON.parse(decodeURIComponent(encodedStoreJson));
        if (window.PainelBloqueio && typeof window.PainelBloqueio.openModal === 'function') {
          window.PainelBloqueio.openModal(storeData);
        }
      } catch (e) {
        console.error('[StoreRenderer] Erro ao abrir modal:', e);
        if (window.PainelBloqueio) window.PainelBloqueio.openModal();
      }
    }
  };

  window.StoreRenderer = StoreRenderer;
  window.filterStoresState = function(filterKey, allowedCategories) {
    StoreRenderer.filterBySpecialCategory(filterKey, allowedCategories);
  };
})(typeof window !== 'undefined' ? window : global);
