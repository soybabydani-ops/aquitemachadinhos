/**
 * AQUI TEM ACHADINHOS - MOTOR AUTÔNOMO DA VITRINE DE MARCAS (v28.0)
 * Sincronização em tempo real com Supabase para marcas Premium/Nacionais e Afiliados.
 */

(function(window) {
  'use strict';

  const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  const SUPABASE_KEY = "__AQUITEM_SUPABASE_ANON_KEY__";

  // Base rica de marcas oficiais com afiliação automática
  const BASE_MARCAS_NACIONAIS = [
    {
      id: 'marca-01',
      nome: 'Pralana Chapéus',
      categoria: 'moda',
      cidade: 'Limeira',
      uf: 'SP',
      descricao_curta: 'Tradição centenária em chapéus country, feltro nobre e palha fina.',
      site_url: 'https://www.pralana.com.br',
      whatsapp: '19999998888',
      plano: 'master',
      destaque: true,
      tag_afiliado: 'aquitem_pralana'
    },
    {
      id: 'marca-02',
      nome: 'Botas Goyazes',
      categoria: 'moda',
      cidade: 'Goiânia',
      uf: 'GO',
      descricao_curta: 'Couros nobres e exóticos, botas texanas de alta performance e durabilidade.',
      site_url: 'https://www.botasgoyazes.com.br',
      whatsapp: '62988887777',
      plano: 'master',
      destaque: true,
      tag_afiliado: 'aquitem_goyazes'
    },
    {
      id: 'marca-03',
      nome: 'Cervejaria Colorado',
      categoria: 'gastronomia',
      cidade: 'Ribeirão Preto',
      uf: 'SP',
      descricao_curta: 'Cervejas artesanais premiadas com ingredientes 100% brasileiros.',
      site_url: 'https://www.cervejariacolorado.com.br',
      whatsapp: '16977776666',
      plano: 'master',
      destaque: true,
      tag_afiliado: 'aquitem_colorado'
    },
    {
      id: 'marca-04',
      nome: 'Thermas dos Laranjais',
      categoria: 'turismo',
      cidade: 'Olímpia',
      uf: 'SP',
      descricao_curta: 'O parque aquático de águas termais mais visitado da América Latina.',
      site_url: 'https://www.termas.com.br',
      whatsapp: '17966665555',
      plano: 'master',
      destaque: true,
      tag_afiliado: 'aquitem_termas'
    },
    {
      id: 'marca-05',
      nome: 'Prawer Chocolates',
      categoria: 'gastronomia',
      cidade: 'Gramado',
      uf: 'RS',
      descricao_curta: 'O primeiro chocolate artesanal do Brasil, tradição da Serra Gaúcha.',
      site_url: 'https://www.prawer.com.br',
      whatsapp: '54955554444',
      plano: 'destaque',
      destaque: false,
      tag_afiliado: 'aquitem_prawer'
    },
    {
      id: 'marca-06',
      nome: 'Casa Valduga Vinhos',
      categoria: 'gastronomia',
      cidade: 'Bento Gonçalves',
      uf: 'RS',
      descricao_curta: 'Vinhos e espumantes premiados internacionalmente no Vale dos Vinhedos.',
      site_url: 'https://www.casavalduga.com.br',
      whatsapp: '54944443333',
      plano: 'destaque',
      destaque: false,
      tag_afiliado: 'aquitem_valduga'
    },
    {
      id: 'marca-07',
      nome: 'Agrishow Brasil',
      categoria: 'agro',
      cidade: 'Ribeirão Preto',
      uf: 'SP',
      descricao_curta: 'A maior feira de tecnologia agrícola do Brasil e polo de negócios do agronegócio.',
      site_url: 'https://www.agrishow.com.br',
      whatsapp: '16933332222',
      plano: 'diamante',
      destaque: true,
      tag_afiliado: 'aquitem_agrishow'
    },
    {
      id: 'marca-08',
      nome: 'Salinas Maragogi Resort',
      categoria: 'turismo',
      cidade: 'Maragogi',
      uf: 'AL',
      descricao_curta: 'Resort all inclusive eleito um dos melhores do mundo no Caribe Brasileiro.',
      site_url: 'https://www.salinas.com.br',
      whatsapp: '82922221111',
      plano: 'diamante',
      destaque: true,
      tag_afiliado: 'aquitem_salinas'
    },
    {
      id: 'marca-09',
      nome: 'Porto Digital',
      categoria: 'tecnologia',
      cidade: 'Recife',
      uf: 'PE',
      descricao_curta: 'Um dos principais parques tecnológicos e polos de inovação da América do Sul.',
      site_url: 'https://www.portodigital.org',
      whatsapp: '81911110000',
      plano: 'diamante',
      destaque: true,
      tag_afiliado: 'aquitem_portodigital'
    }
  ];

  const MarcasEngine = {
    allBrands: [...BASE_MARCAS_NACIONAIS],
    currentCategory: 'all',
    searchQuery: '',

    init: async function() {
      this.bindEvents();
      await this.syncSupabaseBrands();
      this.render();
      console.log('✅ [MarcasEngine v28.0] Sincronização de marcas ativada.');
    },

    syncSupabaseBrands: async function() {
      try {
        const response = await fetch(`${SUPABASE_URL}/stores?is_premium=eq.true&status=eq.ativo&select=*`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
          }
        });

        if (response.ok) {
          const supabaseStores = await response.json();
          if (supabaseStores && supabaseStores.length > 0) {
            const mapped = supabaseStores.map(s => ({
              id: s.id,
              nome: s.nome || s.nome_fantasia,
              categoria: s.categoria || 'gastronomia',
              cidade: s.cidade || 'São Paulo',
              uf: s.uf || 'SP',
              descricao_curta: s.descricao_curta || s.descricao || 'Marca e loja verificada no guia nacional.',
              site_url: s.site_url || `https://wa.me/55${(s.whatsapp || '').replace(/\D/g, '')}`,
              whatsapp: s.whatsapp || s.telefone || '',
              plano: s.tipo_plano || 'master',
              destaque: s.destaque || true,
              tag_afiliado: 'aquitem_partner'
            }));

            // Mescla sem duplicatas
            const existingIds = new Set(this.allBrands.map(b => b.nome.toLowerCase()));
            mapped.forEach(m => {
              if (!existingIds.has(m.nome.toLowerCase())) {
                this.allBrands.push(m);
                existingIds.add(m.nome.toLowerCase());
              }
            });
          }
        }
      } catch (err) {
        console.warn('[MarcasEngine] Utilizando base de marcas local:', err);
      }
    },

    bindEvents: function() {
      const searchInp = document.getElementById('brandSearchInput');
      const pillBtns = document.querySelectorAll('.brand-pill-btn');

      if (searchInp) {
        searchInp.addEventListener('input', (e) => {
          this.searchQuery = (e.target.value || '').trim().toLowerCase();
          this.render();
        });
      }

      pillBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          pillBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.currentCategory = btn.getAttribute('data-cat') || 'all';
          this.render();
        });
      });
    },

    render: function() {
      const grid = document.getElementById('brandsGrid');
      const totalCount = document.getElementById('totalBrandsCount');
      if (!grid) return;

      let filtered = [...this.allBrands];

      if (this.currentCategory !== 'all') {
        filtered = filtered.filter(b => {
          const cat = (b.categoria || '').toLowerCase();
          return cat.includes(this.currentCategory) || this.currentCategory.includes(cat);
        });
      }

      if (this.searchQuery) {
        filtered = filtered.filter(b => {
          const str = [b.nome, b.descricao_curta, b.cidade, b.uf, b.categoria].filter(Boolean).join(' ').toLowerCase();
          return str.includes(this.searchQuery);
        });
      }

      if (totalCount) totalCount.textContent = this.allBrands.length;

      if (!filtered.length) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; background: #0d2244; border-radius: 20px; padding: 40px 20px; text-align: center; border: 1px dashed rgba(245,215,127,0.3);">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🏢</div>
            <h3 style="font-size: 1.2rem; font-weight: 800; color: #FFFFFF;">Nenhuma marca encontrada neste segmento</h3>
            <p style="color: #94A3B8; font-size: 0.85rem; margin: 8px 0 16px 0;">Deseja anunciar sua marca com abrangência nacional?</p>
            <a href="#planos-marcas" style="display: inline-block; background: linear-gradient(135deg, #FFE259, #FFA751); color: #1A0D00; font-weight: 900; padding: 10px 20px; border-radius: 10px; text-decoration: none; font-size: 0.85rem;">
              🚀 Cadastrar Minha Marca
            </a>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(b => {
        const isDiamante = b.plano === 'diamante';
        const isMaster = b.plano === 'master';

        const logoHtml = `
          <div style="width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #FFE259 0%, #FFA751 100%); color: #1A0D00; font-weight: 900; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245,215,127,0.3);">
            ${b.nome.slice(0, 2).toUpperCase()}
          </div>
        `;

        let badgePlano = '';
        if (isDiamante) {
          badgePlano = `<span style="font-size: 0.68rem; font-weight: 900; color: #FFFFFF; background: linear-gradient(90deg, #1E40AF, #3B82F6); padding: 4px 10px; border-radius: 999px; text-transform: uppercase;">💎 Diamante Oficial</span>`;
        } else if (isMaster) {
          badgePlano = `<span style="font-size: 0.68rem; font-weight: 900; color: #1A0D00; background: linear-gradient(90deg, #FFE259, #FFA751); padding: 4px 10px; border-radius: 999px; text-transform: uppercase;">★ Marca Master</span>`;
        } else {
          badgePlano = `<span style="font-size: 0.68rem; font-weight: 800; color: #CD7F32; border: 1px solid #CD7F32; padding: 3px 8px; border-radius: 999px;">✓ Verificada</span>`;
        }

        const siteUrl = b.site_url ? `${b.site_url}?ref=${b.tag_afiliado || 'aquitem'}` : '#';
        const waLink = b.whatsapp ? `https://wa.me/${b.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá! Encontrei a ${b.nome} na Vitrine Nacional de Marcas da AQUITEM e gostaria de atendimento.`)}` : '';

        return `
          <div class="brand-card-v1">
            <div>
              <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 14px;">
                ${logoHtml}
                ${badgePlano}
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 900; color: #FFFFFF; margin-bottom: 4px;">${b.nome}</h3>
              <div style="font-size: 0.8rem; color: #F5D77F; font-weight: 700; margin-bottom: 8px;">
                📍 ${b.cidade}/${b.uf} · <span style="text-transform: capitalize; color: #CBD5E1;">${b.categoria}</span>
              </div>
              <p style="font-size: 0.82rem; color: #CBD5E1; line-height: 1.45; margin-bottom: 16px;">
                ${b.descricao_curta}
              </p>
            </div>
            
            <div style="padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <a href="${siteUrl}" target="_blank" rel="noopener" style="font-size: 0.82rem; font-weight: 800; color: #F5D77F; text-decoration: none;">
                Visitar Site &rarr;
              </a>
              ${waLink ? `
                <a href="${waLink}" target="_blank" rel="noopener" style="background: #25D366; color: #FFFFFF; font-weight: 800; font-size: 0.78rem; padding: 7px 12px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                  <span>💬</span> WhatsApp
                </a>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MarcasEngine.init());
  } else {
    MarcasEngine.init();
  }

  window.MarcasEngine = MarcasEngine;
})(typeof window !== 'undefined' ? window : global);
