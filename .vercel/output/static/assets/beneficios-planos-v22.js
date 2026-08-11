/**
 * AQUI TEM ACHADINHOS - RENDERIZADOR DE PRIVILÉGIOS DE PLANO (v22.0 / v28.0)
 * Renderização estrita de privilégios (Ouro vs Bronze vs Gratuito) e Alerta de Leads
 */

(function(window) {
  'use strict';

  // Base inicial rica de Barretos (Festa do Peão 2026)
  const INITIAL_BARRETOS_STORES = [
    {
      id: 'sp-bar-001',
      nome_fantasia: 'Churrascaria Barretos Gourmet & Costelaria',
      razao_social: 'Churrascaria Barretos Gourmet LTDA',
      categoria: 'Onde Comer / Churrascaria & Restaurante',
      ramo: 'onde comer',
      endereco: 'Av. 43, nº 1420 - Centro, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'ouro',
      whatsapp_contato: '(17) 99781-4500',
      destaque: true
    },
    {
      id: 'sp-bar-002',
      nome_fantasia: 'Pousada Recanto dos Peões & Chalés',
      razao_social: 'Recanto dos Peões Hospedagem ME',
      categoria: 'Pousadas / Hospedagem & Chalés',
      ramo: 'pousadas',
      endereco: 'Rodovia Faria Lima, Km 428, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'ouro',
      whatsapp_contato: '(17) 99655-2211',
      destaque: true
    },
    {
      id: 'sp-bar-003',
      nome_fantasia: 'Vans & Translados Barretos VIP Express',
      razao_social: 'VIP Express Transportes LTDA',
      categoria: 'Motoristas / Translados & Vans Executivas',
      ramo: 'motoristas',
      endereco: 'Rua 20, nº 880 - Bairro América, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'ouro',
      whatsapp_contato: '(17) 99123-8899',
      destaque: true
    },
    {
      id: 'sp-bar-004',
      nome_fantasia: 'Cooperativa de Táxi & Motoristas 24h Barretos',
      razao_social: 'Cooperativa Táxi Barretos',
      categoria: 'Motoristas / Táxi & Aplicativo 24h',
      ramo: 'motoristas',
      endereco: 'Terminal Rodoviário - Box 04, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'bronze',
      whatsapp_contato: '(17) 98111-3344',
      destaque: false
    },
    {
      id: 'sp-bar-005',
      nome_fantasia: 'Hotel & Suítes Conforto Peão 2026',
      razao_social: 'Conforto Peão Hospedagem LTDA',
      categoria: 'Pousadas / Hotel & Hospedagem',
      ramo: 'pousadas',
      endereco: 'Av. 21, nº 650 - Centro, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'bronze',
      whatsapp_contato: '(17) 98822-7711',
      destaque: false
    },
    {
      id: 'sp-bar-006',
      nome_fantasia: 'Restaurante & Fogão a Lenha Tropeiro da Serra',
      razao_social: 'Tropeiro Barretos Alimentação ME',
      categoria: 'Onde Comer / Gastronomia Típica',
      ramo: 'onde comer',
      endereco: 'Via das Comitivas, nº 310, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'bronze',
      whatsapp_contato: '(17) 99234-5678',
      destaque: false
    },
    {
      id: 'sp-bar-007',
      nome_fantasia: 'Agência de Vagas Temporárias Arena Peão 2026',
      razao_social: 'Barretos Empregos & RH ME',
      categoria: 'Vagas Temporárias / Barman, Segurança e Apoio',
      ramo: 'vagas temporarias',
      endereco: 'Rua 18, nº 1100 - Centro, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'pre_cadastro',
      whatsapp_contato: '',
      destaque: false
    },
    {
      id: 'sp-bar-008',
      nome_fantasia: 'Auto Elétrica e Guincho 24h Barretos',
      razao_social: 'Trevo Socorro Automotivo LTDA',
      categoria: 'Serviços Automotivos / Socorro 24h',
      ramo: 'servicos',
      endereco: 'Av. Pedro Vicentini, nº 200, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'pre_cadastro',
      whatsapp_contato: '',
      destaque: false
    },
    {
      id: 'sp-bar-009',
      nome_fantasia: 'Camping & Chalés Rancho do Boiadeiro',
      razao_social: 'Rancho Rodeio Camping ME',
      categoria: 'Pousadas / Camping & Acomodações Rurais',
      ramo: 'pousadas',
      endereco: 'Estrada Municipal BRT-010, Km 4, Barretos/SP',
      cidade: 'Barretos',
      cidade_slug: 'barretos',
      tipo_plano: 'pre_cadastro',
      whatsapp_contato: '',
      destaque: false
    }
  ];

  const StoreRenderer = {
    allStores: INITIAL_BARRETOS_STORES,
    filteredStores: INITIAL_BARRETOS_STORES,
    containerSelector: '#stores-container',
    cidadeAtual: 'Barretos',
    cidadeSlug: 'barretos',

    init: function(stores, containerSelector, cidadeInfo) {
      if (Array.isArray(stores) && stores.length > 0) {
        this.allStores = [...stores];
        this.filteredStores = [...stores];
      }
      if (containerSelector) this.containerSelector = containerSelector;
      if (cidadeInfo) {
        this.cidadeAtual = cidadeInfo.nome || this.cidadeAtual;
        this.cidadeSlug = cidadeInfo.slug || this.cidadeSlug;
      }

      this.render();
      console.log(`✅ [StoreRenderer v22.0] Inicializado com ${this.allStores.length} estabelecimentos.`);
    },

    setStores: function(stores) {
      if (Array.isArray(stores) && stores.length > 0) {
        this.allStores = [...stores];
        this.filteredStores = [...stores];
        this.render();
      }
    },

    filterBySpecialCategory: function(filterKey, allowedCategories) {
      const statusEl = document.getElementById('barretos-filter-status');
      const labelMap = {
        'todos': 'Exibindo todos os estabelecimentos e serviços em Barretos/SP',
        'motoristas': 'Exibindo Motoristas, Vans e Translados em Barretos/SP',
        'pousadas': 'Exibindo Pousadas, Hotéis e Chalés em Barretos/SP',
        'onde-comer': 'Exibindo Restaurantes, Churrascarias e Onde Comer em Barretos/SP',
        'vagas-temporarias': 'Exibindo Vagas e Empregos Temporários Festa do Peão 2026'
      };

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

      if (statusEl) {
        statusEl.innerHTML = `📍 <strong>${labelMap[filterKey] || 'Resultados Filtrados'}</strong> (${this.filteredStores.length} disponíveis)`;
      }

      this.render();

      // Scroll suave para visualização do resultado no celular
      const container = document.querySelector(this.containerSelector);
      if (container && typeof container.scrollIntoView === 'function') {
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
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
              📞 WhatsApp: <strong style="color: #F8FAFC;">${phoneFormatted}</strong>
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
              🔒 Telefone e WhatsApp ocultos pelo modo gratuito
            </div>
            <div class="aquitem-badge-lead-urgente" onclick="window.StoreRenderer.triggerLockModal('${encodedStore}')">
              <span>🔥</span>
              <span>Há 1 cliente aguardando orçamento de <strong>${categoria}</strong> nesta cidade. Clique para liberar</span>
            </div>
            <button type="button" class="btn-desbloquear-leads" style="width: 100%;" onclick="window.StoreRenderer.triggerLockModal('${encodedStore}')">
              🚀 Reivindicar e Liberar Leads →
            </button>
          </div>
        `;
      }

      return `
        <div class="${cardClass}" data-store-id="${store.id || ''}" data-plan="${plano}">
          <div>
            ${badgeHTML}
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #FFFFFF; margin-bottom: 4px;">
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
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(7, 21, 48, 0.5); border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.2);">
            <p style="color: #94A3B8; font-size: 1rem;">Nenhum estabelecimento encontrado nesta categoria no momento.</p>
            <button onclick="window.BarretosBanner.applyFilter('todos')" class="barretos-filter-btn active" style="margin-top: 16px;">
              Limpar Filtro e Exibir Todos
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StoreRenderer.init());
  } else {
    StoreRenderer.init();
  }

  window.StoreRenderer = StoreRenderer;
  window.filterStoresState = function(filterKey, allowedCategories) {
    StoreRenderer.filterBySpecialCategory(filterKey, allowedCategories);
  };
})(typeof window !== 'undefined' ? window : global);
