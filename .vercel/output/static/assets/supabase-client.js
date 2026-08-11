/**
 * AQUI TEM ACHADINHOS - CLIENTE SUPABASE & DATA ADAPTER (v28.0)
 * Gerenciador de conexão assíncrona para consultas e submissão de orçamentos.
 */

(function(window) {
  'use strict';

  const SUPABASE_CONFIG = {
    url: window.__SUPABASE_URL__ || 'https://efvuzxdhsirpvxclgdfg.supabase.co',
    anonKey: window.__SUPABASE_ANON_KEY__ || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc',
    isMock: false
  };

  class SupabaseClientAdapter {
    constructor(config) {
      this.url = config.url;
      this.anonKey = config.anonKey;
    }

    async insertCotacao(cotacaoData) {
      try {
        if (!cotacaoData.nome_cliente || !cotacaoData.contato_cliente || !cotacaoData.cidade_slug) {
          throw new Error('Campos obrigatórios ausentes para cotação.');
        }

        if (this.url && !this.url.includes('sua-url-supabase')) {
          const response = await fetch(`${this.url}/rest/v1/cotacoes_clientes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': this.anonKey,
              'Authorization': `Bearer ${this.anonKey}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              nome_cliente: cotacaoData.nome_cliente,
              contato_cliente: cotacaoData.contato_cliente,
              cidade_id: cotacaoData.cidade_id || null,
              cidade_slug: cotacaoData.cidade_slug,
              cidade_nome: cotacaoData.cidade_nome || cotacaoData.cidade_slug,
              categoria_busca: cotacaoData.categoria_busca,
              descricao_servico: cotacaoData.descricao_servico || '',
              status: 'aberto',
              criado_em: new Date().toISOString()
            })
          });

          if (!response.ok) {
            console.warn('[Supabase] Falha no envio REST, ativando fallback resiliente:', response.statusText);
          } else {
            const data = await response.json();
            return { success: true, data, source: 'supabase_rest' };
          }
        }

        const mockResult = {
          id: 'cot-' + Math.random().toString(36).substr(2, 9),
          ...cotacaoData,
          status: 'aberto',
          criado_em: new Date().toISOString()
        };

        const cotacoesLocais = JSON.parse(localStorage.getItem('aquitem_cotacoes_locais') || '[]');
        cotacoesLocais.push(mockResult);
        localStorage.setItem('aquitem_cotacoes_locais', JSON.stringify(cotacoesLocais));

        return { success: true, data: [mockResult], source: 'resilient_local' };
      } catch (error) {
        console.error('[SupabaseClientAdapter] Erro ao inserir cotação:', error);
        return { success: false, error: error.message };
      }
    }

    async getEmpresasPorCidade(cidadeSlug) {
      try {
        if (this.url && !this.url.includes('sua-url-supabase')) {
          const response = await fetch(`${this.url}/rest/v1/stores?city_slug=eq.${encodeURIComponent(cidadeSlug)}&status=eq.ativo&select=*`, {
            headers: {
              'apikey': this.anonKey,
              'Authorization': `Bearer ${this.anonKey}`
            }
          });
          if (response.ok) {
            return await response.json();
          }
        }
        return null;
      } catch (error) {
        console.warn('[SupabaseClientAdapter] Erro na consulta de empresas:', error);
        return null;
      }
    }
  }

  window.SupabaseAdapter = new SupabaseClientAdapter(SUPABASE_CONFIG);
})(typeof window !== 'undefined' ? window : global);
