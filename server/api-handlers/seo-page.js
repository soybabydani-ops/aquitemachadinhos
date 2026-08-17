// ============================================================
// AQUITEM — Programmatic SEO & Connected Knowledge Graph Engine
// Vercel Serverless Function com ISR Edge Cache (s-maxage=86400, swr=60),
// HTTP 304 Condicional, Anti-Thin Content e Sequestro Semântico.
// ============================================================

const fs = require('fs');
const path = require('path');
const { supabase } = require('./_lib/supabase');
const { getGeoData, generateAntiThinContent } = require('./_lib/geo-enrich');

/**
 * Construtor do Grafo JSON-LD Unificado (@graph)
 */
function buildConnectedKnowledgeGraph(listing, store, city, geo) {
  const cityName = city.nome || listing.cidade || 'Brasil';
  const uf = city.uf || 'BR';
  const citySlug = city.slug || listing.city_slug || 'nacional';
  const wikiUrl = geo.wikipedia_url || `https://pt.wikipedia.org/wiki/${encodeURIComponent(cityName.replace(/ /g, '_'))}`;
  const wikidataUrl = geo.wikidata_id ? `https://www.wikidata.org/wiki/${geo.wikidata_id}` : `https://www.wikidata.org/wiki/Q155`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Nó do Portal Principal (WebSite)
      {
        '@type': 'WebSite',
        '@id': 'https://www.aquitemachadinhos.com.br/#website',
        url: 'https://www.aquitemachadinhos.com.br/',
        name: 'Aqui Tem Achadinhos',
        description: 'Super Portal Nacional de Guias Locais, Empregos e Classificados nos 5.581 Municípios Brasileiros.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.aquitemachadinhos.com.br/busca?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },

      // 2. Nó da Cidade (AdministrativeArea) com SameAs para Wikidata e Wikipedia
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
        sameAs: [wikiUrl, wikidataUrl]
      },

      // 3. Nó da Empresa (LocalBusiness / Organization)
      {
        '@type': 'LocalBusiness',
        '@id': store ? `https://www.aquitemachadinhos.com.br/loja.html?id=${store.id}#business` : `https://www.aquitemachadinhos.com.br/#org-${encodeURIComponent(listing.anunciante_nome || 'empresa')}`,
        name: (store && store.nome) || listing.anunciante_nome || 'Empresa Anunciante',
        description: (store && store.descricao_curta) || `Empresa e comércio verificado em ${cityName}/${uf} na rede AQUITEM.`,
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

      // 4. Nó da Vaga (JobPosting) conectado à Empresa e Cidade
      {
        '@type': 'JobPosting',
        '@id': `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listing.id}#job`,
        title: listing.titulo,
        description: listing.descricao || `${listing.titulo} em ${cityName}/${uf}. Oportunidade de contratação com contato direto via WhatsApp oficial.`,
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
      },

      // 5. Nó de Navegação BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Brasil',
            item: 'https://www.aquitemachadinhos.com.br/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: cityName,
            item: `https://www.aquitemachadinhos.com.br/guia.html?cidade=${citySlug}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: listing.titulo,
            item: `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listing.id}`
          }
        ]
      }
    ]
  };

  return graph;
}

module.exports = async function handler(req, res) {
  // 1. Injeção de Cache Edge de Alta Velocidade (Vercel CDN)
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=60');
  res.setHeader('Vary', 'Accept-Encoding');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { id, slug, cidade, categoria, render_html = 'false' } = req.query || {};

  try {
    let listing = null;
    let store = null;
    let city = null;
    let alternatives = [];
    let isExpired = false;

    // 2. Busca da Vaga / Anúncio
    if (id) {
      const { data } = await supabase.from('listings').select('*').eq('id', id).limit(1).execute();
      if (data && data.length) listing = data[0];
    } else if (slug) {
      const { data } = await supabase.from('listings').select('*').eq('slug', slug).limit(1).execute();
      if (data && data.length) listing = data[0];
    }

    // 3. Processamento de Vaga Encontrada
    if (listing) {
      // Checagem de Sequestro Semântico (Se estiver inativa, não dá 404!)
      if (listing.status !== 'ativo') {
        isExpired = true;
        // Busca 3 alternativas ativas mais próximas da mesma cidade ou categoria
        const { data: altData } = await supabase
          .from('listings')
          .select('*')
          .eq('status', 'ativo')
          .eq('city_slug', listing.city_slug || 'barretos')
          .order('criado_em', { ascending: false })
          .limit(3)
          .execute();

        alternatives = altData || [];
      }

      // Validação HTTP 304 Condicional
      const lastModifiedDate = new Date(listing.atualizado_em || listing.criado_em || Date.now());
      const ifModifiedSince = req.headers['if-modified-since'];

      if (ifModifiedSince && !isExpired) {
        const reqDate = new Date(ifModifiedSince);
        if (Math.floor(reqDate.getTime() / 1000) >= Math.floor(lastModifiedDate.getTime() / 1000)) {
          return res.status(304).end();
        }
      }

      res.setHeader('Last-Modified', lastModifiedDate.toUTCString());

      // Busca dados complementares da Cidade e Empresa
      const citySlug = listing.city_slug || 'nacional';
      const [cityRes, storeRes] = await Promise.all([
        supabase.from('cities').select('*').eq('slug', citySlug).limit(1).execute(),
        listing.anunciante_nome ? supabase.from('stores').select('*').ilike('nome', `%${listing.anunciante_nome}%`).limit(1).execute() : Promise.resolve({ data: null })
      ]);

      city = (cityRes.data && cityRes.data[0]) || { nome: listing.cidade, uf: 'SP', slug: citySlug };
      store = storeRes.data && storeRes.data[0];

      const geo = getGeoData(citySlug, city.nome, city.uf);
      const jsonLdGraph = buildConnectedKnowledgeGraph(listing, store, city, geo);
      const antiThin = generateAntiThinContent({
        citySlug,
        cityName: city.nome,
        uf: city.uf,
        category: listing.categoria || 'vagas',
        totalListings: 1,
        totalStores: store ? 1 : 0
      });

      const responsePayload = {
        type: 'job_detail',
        is_expired: isExpired,
        listing,
        store,
        city,
        geo,
        alternatives,
        anti_thin_content: antiThin,
        jsonLdGraph,
        canonical: `https://www.aquitemachadinhos.com.br/anuncio.html?id=${listing.id}`,
        og_image_url: `https://www.aquitemachadinhos.com.br/api/og?title=${encodeURIComponent(listing.titulo)}&city=${encodeURIComponent(city.nome)}&uf=${encodeURIComponent(city.uf)}&category=${encodeURIComponent(listing.categoria || 'Vagas')}&salary=${encodeURIComponent(listing.preco || '')}`
      };

      // Se solicitado renderização HTML em runtime
      if (render_html === 'true') {
        const htmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${listing.titulo} em ${city.nome}/${city.uf} · Aqui Tem Achadinhos</title>
  <meta name="description" content="${listing.descricao || antiThin.metaDescription}">
  <link rel="canonical" href="${responsePayload.canonical}">
  <meta property="og:title" content="${listing.titulo} · ${city.nome}">
  <meta property="og:description" content="${listing.descricao || antiThin.metaDescription}">
  <meta property="og:image" content="${responsePayload.og_image_url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(jsonLdGraph)}</script>
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  ${isExpired ? `
    <div style="background: #eab308; color: #000; padding: 1rem; text-align: center; font-weight: bold;">
      ⚠️ Esta vaga/oportunidade expirou ou já foi preenchida. Veja abaixo outras opções ativas em ${city.nome}!
    </div>
  ` : ''}
  <main class="max-w-4xl mx-auto p-4 md:p-8">
    <h1 class="text-3xl font-black text-amber-400 mb-4">${listing.titulo}</h1>
    <p class="text-slate-400 mb-6">📍 ${city.nome} - ${city.uf} | Anunciado por: ${listing.anunciante_nome || 'Empresa Local'}</p>
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
      <h2 class="text-xl font-bold mb-3 text-white">Descrição da Oportunidade</h2>
      <p class="text-slate-300 leading-relaxed whitespace-pre-line">${listing.descricao || 'Oportunidade de trabalho com candidatura direta sem intermediários.'}</p>
      ${listing.whatsapp ? `
        <div class="mt-6">
          <a href="https://wa.me/55${listing.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Olá! Vi a vaga de ' + listing.titulo + ' no portal Aqui Tem Achadinhos.')}" class="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl transition" target="_blank">
            💬 Candidatar-se via WhatsApp Oficial
          </a>
        </div>
      ` : ''}
    </div>
    ${antiThin.contentHtml}
  </main>
</body>
</html>`;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(htmlTemplate);
      }

      return res.status(200).json(responsePayload);
    }

    // 4. Hub Programático de Cidades (ex.: ?cidade=barretos)
    if (cidade || categoria) {
      const targetCity = (cidade || 'barretos').toLowerCase().trim();
      const targetCat = (categoria || 'vagas').toLowerCase().trim();

      const [cityRes, listingsRes, storesRes] = await Promise.all([
        supabase.from('cities').select('*').eq('slug', targetCity).limit(1).execute(),
        supabase.from('listings').select('*').eq('city_slug', targetCity).eq('status', 'ativo').limit(30).execute(),
        supabase.from('stores').select('*').eq('city_slug', targetCity).eq('status', 'ativo').limit(30).execute()
      ]);

      const cObj = (cityRes.data && cityRes.data[0]) || { nome: targetCity, uf: 'BR', slug: targetCity };
      const listingsData = listingsRes.data || [];
      const storesData = storesRes.data || [];

      const geo = getGeoData(targetCity, cObj.nome, cObj.uf);
      const antiThin = generateAntiThinContent({
        citySlug: targetCity,
        cityName: cObj.nome,
        uf: cObj.uf,
        category: targetCat,
        totalListings: listingsData.length,
        totalStores: storesData.length
      });

      return res.status(200).json({
        type: 'programmatic_hub',
        city: cObj,
        geo,
        category: targetCat,
        listings: listingsData,
        stores: storesData,
        anti_thin_content: antiThin,
        total_items: listingsData.length + storesData.length,
        canonical: `https://www.aquitemachadinhos.com.br/guia.html?cidade=${encodeURIComponent(targetCity)}`
      });
    }

    return res.status(200).json({
      status: 'ready',
      endpoint: '/api/seo-page',
      cache_strategy: 'stale-while-revalidate',
      features: ['Unified @graph JSON-LD', 'HTTP 304 Validation', 'Anti-Thin Content Geo-Injector', 'Semantic Sequestration']
    });

  } catch (err) {
    console.error('[SEO Page Handler Error]:', err);
    return res.status(500).json({ error: err.message });
  }
};
