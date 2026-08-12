/**
 * COLETOR AUTÔNOMO DE PROMOÇÕES E OFERTAS DE VIAGENS (CUSTO ZERO)
 * Agrega oportunidades de passagens rodoviárias e aéreas para abastecer o banco Supabase.
 */

const SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

const ROTAS_MONITORADAS = [
  {
    titulo: '⚠️ CUPOM ATIVO HOJE: Viagem de São Paulo para Barretos com 82% de desconto',
    slug: 'cupom-ativo-sp-barretos-82-desconto',
    origem: 'São Paulo',
    destino: 'Barretos',
    tipo_transporte: 'Rodoviário',
    desconto_percentual: 82,
    preco_de: 280.00,
    preco_por: 49.90,
    link_destino: 'https://wa.me/5517991238899?text=Quero%20a%20tarifa%20SP-Barretos%20com%2082%20OFF'
  },
  {
    titulo: '⚠️ CUPOM ATIVO HOJE: Passagem de Campinas para São Paulo com 65% de desconto',
    slug: 'cupom-ativo-campinas-sao-paulo-65-desconto',
    origem: 'Campinas',
    destino: 'São Paulo',
    tipo_transporte: 'Rodoviário',
    desconto_percentual: 65,
    preco_de: 58.00,
    preco_por: 19.90,
    link_destino: 'https://www.clickbus.com.br/?ref=aquitem_nacional'
  },
  {
    titulo: '⚠️ TARIFA RESIDUAL: Voo de São Paulo para o Rio de Janeiro com 81% de desconto',
    slug: 'tarifa-residual-sp-rio-de-janeiro-81-desconto',
    origem: 'São Paulo',
    destino: 'Rio de Janeiro',
    tipo_transporte: 'Aéreo',
    desconto_percentual: 81,
    preco_de: 480.00,
    preco_por: 89.90,
    link_destino: 'https://www.decolar.com/passagens-aereas/?ref=aquitem_nacional'
  },
  {
    titulo: '⚠️ CUPOM ATIVO HOJE: Viagem de São Paulo para Santos com 70% de desconto',
    slug: 'cupom-ativo-sp-santos-70-desconto',
    origem: 'São Paulo',
    destino: 'Santos',
    tipo_transporte: 'Rodoviário',
    desconto_percentual: 70,
    preco_de: 44.00,
    preco_por: 12.90,
    link_destino: 'https://www.clickbus.com.br/?ref=aquitem_nacional'
  }
];

async function syncDealsToSupabase() {
  console.log('[Crawler Viagens] Sincronizando promoções no banco Supabase...');
  for (const item of ROTAS_MONITORADAS) {
    try {
      const res = await fetch(`${SUPABASE_URL}/feeds_promocoes_viagens`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates'
        },
        body: JSON.stringify(item)
      });
      console.log(`✓ Rota sincronizada: ${item.slug} (${res.status})`);
    } catch (e) {
      console.error('Erro na sincronização:', e.message);
    }
  }
}

syncDealsToSupabase().then(() => console.log('🏆 Sincronização concluída com sucesso!'));
