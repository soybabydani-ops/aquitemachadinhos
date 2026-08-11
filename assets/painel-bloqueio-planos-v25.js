/**
 * AQUI TEM ACHADINHOS - PAINEL DE BLOQUEIO DE PLANOS & GATILHOS DE CONVERSÃO (v25.0)
 * Modal de Oportunidade Bloqueada, Efeito Booking e Prova Social Flutuante
 */

(function(window) {
  'use strict';

  // Configuração dos links de checkout dos planos
  const CHECKOUT_CONFIG = {
    urlCheckoutBronze: 'https://pay.aquitemachadinhos.com.br/checkout-bronze',
    urlCheckoutOuro: 'https://pay.aquitemachadinhos.com.br/checkout-ouro'
  };

  const PainelBloqueioController = {
    config: CHECKOUT_CONFIG,
    socialProofInterval: null,

    init: function() {
      this.ensureModalDOM();
      this.ensureToastDOM();
      this.bindEvents();
      this.startSocialProofRotation();
      console.log('✅ [Painel Bloqueio v25.0] Inicializado com sucesso.');
    },

    ensureModalDOM: function() {
      if (document.getElementById('aquitem-modal-bloqueio')) return;

      const modalHTML = `
        <div id="aquitem-modal-bloqueio" class="modal-bloqueio-overlay" aria-hidden="true" role="dialog">
          <div class="modal-bloqueio-content">
            <button type="button" class="modal-close-btn" id="btn-close-modal-bloqueio" aria-label="Fechar">&times;</button>
            
            <h2 class="modal-title-lock">🔒 Oportunidade Bloqueada por Escassez</h2>
            <p class="modal-subtitle-lock" id="modal-lock-subtitle">
              Um cliente real solicitou um orçamento no seu setor nas últimas horas. Ative seu plano para liberar os dados de contato imediatamente.
            </p>

            <div class="booking-access-counter" id="modal-booking-counter">
              🔥 Este setor recebeu uma média de <span id="booking-views-count">142</span> buscas comerciais nesta região esta semana.
            </div>

            <div class="plans-grid-modal">
              <!-- PLANO BRONZE -->
              <div class="aquitem-card-bronze-modal">
                <div>
                  <h4 style="color: #CD7F32; font-size: 1.2rem; font-weight: 800;">Plano Bronze</h4>
                  <div class="modal-plan-price">R$ 49,90 <span>/mês</span></div>
                  <ul class="modal-benefits-list">
                    <li>✓ Liberação de leads e orçamentos</li>
                    <li>✓ Botão de WhatsApp direto ativo</li>
                    <li>✓ Exibição completa de endereço e fone</li>
                    <li>✓ Indexação básica no Google</li>
                  </ul>
                </div>
                <a href="${this.config.urlCheckoutBronze}" class="btn-checkout-bronze" id="btn-modal-checkout-bronze" target="_blank" rel="noopener">
                  Ativar Plano Bronze
                </a>
              </div>

              <!-- PLANO OURO (DESTAQUE RECOMENDADO) -->
              <div class="aquitem-card-ouro-modal">
                <span class="modal-plan-badge">🔥 MAIS VENDIDO</span>
                <div>
                  <h4 style="color: #F5D77F; font-size: 1.2rem; font-weight: 800;">Plano Ouro</h4>
                  <div class="modal-plan-price">R$ 89,90 <span>/mês</span></div>
                  <ul class="modal-benefits-list">
                    <li>✓ <strong>Tudo do Plano Bronze</strong></li>
                    <li>✓ <strong>Topo Absoluto</strong> nas buscas da cidade</li>
                    <li>✓ Selo de Empresa Verificada Ouro</li>
                    <li>✓ Borda Dourada com Shimmer animado</li>
                    <li>✓ Publicação de Vagas e Ofertas Ilimitadas</li>
                  </ul>
                </div>
                <a href="${this.config.urlCheckoutOuro}" class="btn-checkout-ouro" id="btn-modal-checkout-ouro" target="_blank" rel="noopener">
                  Ativar Plano Ouro Premiado
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    ensureToastDOM: function() {
      if (document.getElementById('aquitem-social-proof-toast')) return;

      const toastHTML = `
        <div id="aquitem-social-proof-toast" role="status" aria-live="polite">
          <div style="font-size: 1.5rem;">⚡</div>
          <div>
            <div id="toast-social-proof-title" style="font-weight: 800; color: #F5D77F; font-size: 0.85rem;">
              Nova Ativação Ouro!
            </div>
            <div id="toast-social-proof-desc" style="font-size: 0.8rem; color: #E2E8F0;">
              Churrascaria Barretos Gourmet acabou de ativar o Plano Ouro em Barretos/SP.
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', toastHTML);
    },

    bindEvents: function() {
      const closeBtn = document.getElementById('btn-close-modal-bloqueio');
      const modalOverlay = document.getElementById('aquitem-modal-bloqueio');

      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal());
      }

      if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
            this.closeModal();
          }
        });
      }

      // Escutar tecla ESC para fechar modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeModal();
      });

      // Vinculação do formulário de orçamentos se existir na página
      const formOrcamento = document.getElementById('form-orcamento-dinamico');
      if (formOrcamento) {
        formOrcamento.addEventListener('submit', (e) => this.handleFormSubmit(e));
      }
    },

    openModal: function(empresaData, cotacaoData) {
      this.ensureModalDOM();
      const modal = document.getElementById('aquitem-modal-bloqueio');
      if (!modal) return;

      const subtitle = document.getElementById('modal-lock-subtitle');
      const bookingViews = document.getElementById('booking-views-count');
      const btnBronze = document.getElementById('btn-modal-checkout-bronze');
      const btnOuro = document.getElementById('btn-modal-checkout-ouro');

      const cidade = (empresaData && empresaData.cidade) || (cotacaoData && cotacaoData.cidade_nome) || 'sua região';
      const categoria = (empresaData && empresaData.categoria) || (cotacaoData && cotacaoData.categoria_busca) || 'seu setor';
      const nomeEmpresa = (empresaData && (empresaData.nome_fantasia || empresaData.nome)) || '';

      if (subtitle) {
        subtitle.innerHTML = `Um cliente real em <strong>${cidade}</strong> solicitou um orçamento de <strong>${categoria}</strong> nas últimas horas. Ative seu plano para liberar os dados de contato imediatamente.`;
      }

      // Efeito Booking: gera contagem psicológica realista entre 80 e 250
      if (bookingViews) {
        const randomSearches = Math.floor(Math.random() * (250 - 80 + 1)) + 80;
        bookingViews.textContent = randomSearches;
      }

      // Conexão dos botões de checkout com parâmetros de identificação
      const queryParams = `?empresa=${encodeURIComponent(nomeEmpresa)}&cidade=${encodeURIComponent(cidade)}&categoria=${encodeURIComponent(categoria)}`;
      if (btnBronze) btnBronze.href = `${this.config.urlCheckoutBronze}${queryParams}`;
      if (btnOuro) btnOuro.href = `${this.config.urlCheckoutOuro}${queryParams}`;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    closeModal: function() {
      const modal = document.getElementById('aquitem-modal-bloqueio');
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    handleFormSubmit: async function(e) {
      e.preventDefault();
      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '⏳ Enviando Oportunidade...';
        }

        const formData = {
          nome_cliente: form.nome_cliente ? form.nome_cliente.value : (form.querySelector('[name="nome_cliente"]') || {}).value,
          contato_cliente: form.contato_cliente ? form.contato_cliente.value : (form.querySelector('[name="contato_cliente"]') || {}).value,
          cidade_slug: form.cidade_slug ? form.cidade_slug.value : (form.querySelector('[name="cidade_slug"]') || {}).value || 'barretos',
          cidade_nome: form.cidade_nome ? form.cidade_nome.value : (form.querySelector('[name="cidade_nome"]') || {}).value || 'Barretos',
          categoria_busca: form.categoria_busca ? form.categoria_busca.value : (form.querySelector('[name="categoria_busca"]') || {}).value || 'Geral',
          descricao_servico: form.descricao_servico ? form.descricao_servico.value : (form.querySelector('[name="descricao_servico"]') || {}).value || ''
        };

        // Envio assíncrono ao Supabase Client Adapter
        const result = await window.SupabaseAdapter.insertCotacao(formData);

        if (result && result.success) {
          alert('✅ Orçamento enviado com sucesso! Os prestadores verificados foram notificados.');
          form.reset();

          // Abre o Modal de Bloqueio por Escassez para fins de homologação e conversão
          this.openModal(null, formData);
        } else {
          alert('⚠️ Ocorreu um erro no envio. Tente novamente.');
        }
      } catch (err) {
        console.error('[PainelBloqueio] Erro na submissão:', err);
        alert('Erro ao processar cotação.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    },

    startSocialProofRotation: function() {
      const sampleEvents = [
        { store: 'Churrascaria Barretos Gourmet', city: 'Barretos/SP', plan: 'Plano Ouro' },
        { store: 'Pousada Recanto dos Peões', city: 'Barretos/SP', plan: 'Plano Ouro' },
        { store: 'Vans & Translados Premium', city: 'Barretos/SP', plan: 'Plano Bronze' },
        { store: 'Auto Mecânica Express', city: 'São Paulo/SP', plan: 'Plano Ouro' },
        { store: 'Hotel das Palmeiras 24h', city: 'Barretos/SP', plan: 'Plano Ouro' },
        { store: 'Restaurante Sabor Sertanejo', city: 'Barretos/SP', plan: 'Plano Ouro' }
      ];

      const showToast = () => {
        const toast = document.getElementById('aquitem-social-proof-toast');
        if (!toast) return;

        const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
        const titleEl = document.getElementById('toast-social-proof-title');
        const descEl = document.getElementById('toast-social-proof-desc');

        if (titleEl) titleEl.textContent = `⚡ Nova Ativação ${randomEvent.plan}!`;
        if (descEl) descEl.textContent = `${randomEvent.store} em ${randomEvent.city} acabou de ativar o ${randomEvent.plan}!`;

        toast.classList.add('visible');

        // Exibe por 5 segundos
        setTimeout(() => {
          toast.classList.remove('visible');
        }, 5000);
      };

      // Dispara a cada 60 segundos
      if (this.socialProofInterval) clearInterval(this.socialProofInterval);
      this.socialProofInterval = setInterval(showToast, 60000);
      if (this.socialProofInterval && typeof this.socialProofInterval.unref === 'function') {
        this.socialProofInterval.unref();
      }
    }
  };

  // Auto-inicialização
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PainelBloqueioController.init());
  } else {
    PainelBloqueioController.init();
  }

  window.PainelBloqueio = PainelBloqueioController;
})(typeof window !== 'undefined' ? window : global);
