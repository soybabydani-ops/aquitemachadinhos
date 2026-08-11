// ============================================================
// AQUITEM — Programmatic SEO & Connected Knowledge Graph Engine
// Vercel Serverless Function com ISR Edge Cache (stale-while-revalidate)
// e Cabeçalhos Condicionais HTTP 304 (If-Modified-Since).
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc';

const WIKIDATA_MAP = {
  'sao-paulo': 'https://www.wikidata.org/wiki/Q174',
  'rio-de-janeiro': 'https://www.wikidata.org/wiki/Q8678',
  'belo-horizonte': 'https://www.wikidata.org/wiki/Q42800',
  'brasilia': 'https://www.wikidata.org/wiki/Q2844',
  'curitiba': 'https://www.wikidata.org/wiki/Q4361',
  'barretos': 'https://www.wikidata.org/wiki/Q808889',
  'gramado': 'https://www.wikidata.org/wiki/Q949791',
  'campinas': 'https://www.wikidata.org/wiki/Q171092',
  'ribeirao-preto': 'https://www.wikidata.org/wiki/Q188981',
  'bebedouro': 'https://www.wikidata.org/wiki/Q1760472',
  'olimpia': 'https://www.wikidata.org/wiki/Q1760361',
  'colombia': 'https://www.wikidata.org/wiki/Q1796541'
};

async function fetchSupabase(path) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`
    }
  });
  if (!resp.ok) return null;
  return resp.json();
}

/**
 * Construtor do Grafo JSON-LD Conectado (@graph)
 */
function buildConnectedKnowledgeGraph(listing, store, city) {
  const cityName = city.nome || listing.cidade || 'Brasil';
  const uf = city.uf || 'BR';
  const citySlug = city.slug || listing.city_slug || 'nacional';
  const wikiUrl = WIKIDATA_MAP[citySlug] || `https://pt.wikipedia.org/wiki/${encodeURIComponent(cityName.replace(/ /g, '_'))}`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Nó da Cidade (AdministrativeArea)
      {
        '@type': 'AdministrativeArea',
        '@id': `https://www.aquitemachadinhos.com.br/#city-${citySlug}`,
        name: cityName,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressRegion: uf,
          addressCountry: 'BR'
        },
        sameAs: [wikiUrl]
      },

      // 2. Nó da Empresa (LocalBusiness / Organization)
      {
        '@type': 'LocalBusiness',
        '@id': store ? `https://www.aquitemachadinhos.com.br/loja.html?id=${store.id}#business` : `https://www.aquitemachadinhos.com.br/#org-${encodeURIComponent(listing.anunciante_nome || 'empresa')}`,
        name: (store && store.nome) || listing.anunciante_nome || 'Empresa Anunciante',
        description: (store && store.descricao_curta) || 'Empresa verificada na rede oficial AQUITEM.',
        telephone: (store && store.telefone) || listing.whatsapp || '+5517992641746',
        url: store ? `https://www.aquitemachadinhos.com.br/loja.html?id=${store.id}` : 'https://www.aquitemachadinhos.com.br',
        address: {
          '@type': 'PostalAddress',
          streetAddress: (store && store.endereco) || listing.endereco || 'Centro Comercial',
          addressLocality: cityName,
          addressRegion: uf,
          addressCountry: 'BR'
        },
        areaServed: {
          '@id': `https://www.aquitemachadinhos.com.br/#city-${citySlug}`
        }
      },

      // 3. Nó da Vaga (JobPosting) conectado à Empresa e Cidade
      {
        '@type': 'JobPosting',
        '@id': `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listing.id}#job`,
        title: listing.titulo,
        description: listing.descricao || `${listing.titulo} em ${cityName}/${uf}. Oportunidade com contato direto no WhatsApp.`,
        datePosted: listing.criado_em || new Date().toISOString(),
        validThrough: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        employmentType: (listing.subcategoria === 'clt' || listing.subcategoria === 'clt-nacional') ? 'FULL_TIME' : (listing.subcategoria === 'temporario' ? 'TEMPORARY' : (listing.subcategoria === 'estagio' ? 'INTERN' : 'CONTRACTOR')),
        hiringOrganization: {
          '@id': store ? `https://www.aquitemachadinhos.com.br/loja.html?id=${store.id}#business` : `https://www.aquitemachadinhos.com.br/#org-${encodeURIComponent(listing.anunciante_nome || 'empresa')}`
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            streetAddress: listing.bairro ? `${listing.bairro}, Centro` : 'Centro',
            addressLocality: cityName,
            addressRegion: uf,
            addressCountry: 'BR'
          }
        },
        baseSalary: listing.preco ? {
          '@type': 'MonetaryAmount',
          currency: 'BRL',
          value: {
            '@type': 'QuantitativeValue',
            value: parseFloat(String(listing.preco).replace(/[^0-9,.]/g, '').replace(',', '.')) || 2500,
            unitText: 'MONTH'
          }
        } : undefined,
        directApply: true
      }
    ]
  };

  return graph;
}

module.exports = async function handler(req, res) {
  // Configuração Vercel ISR & Edge Cache
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400');
  res.setHeader('Vary', 'Accept-Encoding');

  const { id, slug, cidade, categoria } = req.query || {};

  try {
    let listing = null;
    let store = null;
    let city = null;

    if (id) {
      const data = await fetchSupabase(`listings?id=eq.${encodeURIComponent(id)}&limit=1`);
      if (data && data.length) listing = data[0];
    } else if (slug) {
      const data = await fetchSupabase(`listings?slug=eq.${encodeURIComponent(slug)}&limit=1`);
      if (data && data.length) listing = data[0];
    }

    // Se encontrou vaga específica
    if (listing) {
      const lastModifiedDate = new Date(listing.atualizado_em || listing.criado_em || Date.now());
      const ifModifiedSince = req.headers['if-modified-since'];

      // Validação HTTP 304 Condicional para Economia de Crawl Budget
      if (ifModifiedSince) {
        const reqDate = new Date(ifModifiedSince);
        if (reqDate >= lastModifiedDate) {
          return res.status(304).end();
        }
      }

      res.setHeader('Last-Modified', lastModifiedDate.toUTCString());

      // Busca dados da empresa e cidade relacionada
      const citySlug = listing.city_slug || 'nacional';
      const [cityData, storeData] = await Promise.all([
        fetchSupabase(`cities?slug=eq.${encodeURIComponent(citySlug)}&limit=1`),
        listing.anunciante_nome ? fetchSupabase(`stores?nome=ilike.*${encodeURIComponent(listing.anunciante_nome)}*&limit=1`) : Promise.resolve(null)
      ]);

      city = (cityData && cityData[0]) || { nome: listing.cidade, uf: 'SP', slug: citySlug };
      store = storeData && storeData[0];

      const jsonLdGraph = buildConnectedKnowledgeGraph(listing, store, city);

      return res.status(200).json({
        type: 'job_detail',
        listing,
        store,
        city,
        jsonLdGraph,
        canonical: `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listing.id}`
      });
    }

    // Hub programático por categoria e cidade (ex.: /[categoria]-em-[cidade])
    if (cidade || categoria) {
      const targetCity = cidade || 'brasil';
      const targetCat = categoria || 'vagas';

      const [cityData, listingsData, storesData] = await Promise.all([
        fetchSupabase(`cities?slug=eq.${encodeURIComponent(targetCity)}&limit=1`),
        fetchSupabase(`listings?city_slug=eq.${encodeURIComponent(targetCity)}&status=eq.ativo&limit=20`),
        fetchSupabase(`stores?city_slug=eq.${encodeURIComponent(targetCity)}&status=eq.ativo&limit=20`)
      ]);

      const cObj = (cityData && cityData[0]) || { nome: targetCity, uf: 'BR', slug: targetCity };

      return res.status(200).json({
        type: 'programmatic_hub',
        city: cObj,
        category: targetCat,
        listings: listingsData || [],
        stores: storesData || [],
        total_items: (listingsData ? listingsData.length : 0) + (storesData ? storesData.length : 0),
        canonical: `https://www.aquitemachadinhos.com.br/guia.html?cidade=${encodeURIComponent(targetCity)}`
      });
    }

    return res.status(200).json({
      status: 'ready',
      endpoint: '/api/seo-page',
      cache_strategy: 'stale-while-revalidate',
      features: ['Connected Knowledge Graph', 'HTTP 304 Validation', 'Google for Jobs Compatibility']
    });

  } catch (err) {
    console.error('[SEO Page Handler Error]:', err);
    return res.status(500).json({ error: err.message });
  }
};
