# 📦 BACKUP COMPLETO & ARQUITETURA CLOUD ENTERPRISE — AQUI TEM ACHADINHOS
**Data:** 11/08/2026 | **Versão:** v11.0 Black Ops Programmatic SEO, Extreme Speed Edge Functions, Unified @graph JSON-LD & Multi-Domain Ghost Engine  
**Domínio Oficial:** `aquitemachadinhos.com.br` / `aquitemachadinhos.vercel.app`  
**Repositório GitHub:** `https://github.com/soybabydani-ops/aquitemachadinhos.git` (Branch `main`)  
**Banco de Dados:** Supabase Cloud Project `efvuzxdhsirpvxclgdfg`  

---

## 1. RESUMO EXECUTIVO DA ARQUITETURA BLACK OPS (v11.0)

O ecossistema **Aqui Tem Achadinhos** foi transformado em uma infraestrutura corporativa de alta performance, sem dependência de frameworks monolíticos pesados (0% Next.js / 0% React no client-side), garantindo carregamento sub-50ms via Edge CDN Vercel e indexação massiva no Google.

### Métricas Atuais em Produção:
* **Municípios Ativos (IBGE):** 5.581 cidades cadastradas (100% Brasil).
* **Comércios & Lojas Verificados:** 16.832 empresas reais (`status = 'ativo'`, `status_aprovacao = 'aprovado'`).
* **Vagas de Emprego & Oportunidades:** 16.637 vagas ativas (`status = 'ativo'`).
* **Marcas Nacionais:** 16 grandes marcas registradas.
* **Testes de Integridade:** 35 testes automatizados de endpoints API (100% de aprovação) + 158 templates HTML auditados.

---

## 2. ESTRUTURA DE DIRETÓRIOS E ARQUIVOS (/api & Core)

```
/home/user/aquitemachadinhos/
├── api/
│   ├── _lib/
│   │   ├── supabase.js             # Singleton PostgREST com Keep-Alive e Connection Reuse
│   │   └── geo-enrich.js           # Motor de Injeção de Variáveis Socioeconômicas IBGE (Anti-Thin Content)
│   ├── vagas.js                    # Endpoint Edge Serverless de Vagas (Cache-Control s-maxage=86400, HTTP 304)
│   ├── empresas.js                 # Endpoint Edge Serverless de Comércios (Cache-Control s-maxage=86400, HTTP 304)
│   ├── sitemap.js                  # Gerador Dinâmico de Sitemap XML (5.581 cidades + hubs prioritários)
│   ├── seo-page.js                 # Renderizador SSR Light com Grafo JSON-LD Unificado e Sequestro Semântico
│   ├── google-index.js             # Webhook Supabase + JWT nativo RS256 para Google Indexing API
│   ├── widget.js                   # Script Embed Minificado com Backlinks indexáveis (rel="follow")
│   ├── og.js                       # Gerador Edge SVG 1200x630px para Google Discover & Redes Sociais
│   ├── link-equity.js              # Distribuidor de PageRank Interno via PostgreSQL RPC
│   ├── mercadopago-webhook.js      # Webhook de Ativação Automática de Pagamentos Pix / Cartão
│   ├── upgrade-checkout.js         # Gerador de Checkout Transparente Mercado Pago
│   └── distribute-media.js         # Webhook de Distribuição de Mídia e Backlinks
├── assets/
│   ├── app.js                      # Core JS do Frontend (Autocomplete 5.575 cidades, filtros dinâmicos)
│   ├── domain-themes.js            # Engine Multi-Domain Fantasma (CSS dinâmico por Hostname)
│   ├── cidades-brasil.json         # Base compacta de 5.575 municípios IBGE (293KB)
│   └── style.css                   # Tailwind/Glassmorphism CSS
├── tests/
│   ├── test-serverless-endpoints.js# Testes unitários de Cache, 304, JSON-LD, Geo-Enrich e Webhooks
│   └── test-all-routes.js          # Auditoria global de 158 rotas HTML e 12 endpoints API
├── SUPABASE_BLACK_OPS_SETUP.sql    # Script SQL DDL de alta performance, índices GIN e Triggers
├── .env.example                    # Template seguro de variáveis de ambiente
└── vercel.json                     # Roteamento limpo, headers de segurança e subdomínios
```

---

## 3. CÓDIGOS CORE DAS SERVERLESS FUNCTIONS

### 3.1. Supabase Singleton (`api/_lib/supabase.js`)
```javascript
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || '...';
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON;

class SupabaseClient {
  constructor(url, key, isService = false) {
    this.url = url.replace(/\/+$/, '');
    this.key = key;
    this.isService = isService;
  }
  // Reutiliza Keep-Alive HTTP/1.1 e HTTP/2 nativo do Node.js
  async query(endpoint, options = {}) { ... }
}
```

### 3.2. Anti-Thin Content & Geo-Enrichment (`api/_lib/geo-enrich.js`)
Gera descrições personalizadas com população estimada, PIB per capita, vocação econômica, polos vizinhos e links para Wikidata / Wikipedia, impedindo penalizações de conteúdo duplicado do Google.

### 3.3. Grafo Unificado JSON-LD & Sequestro Semântico (`api/seo-page.js`)
* **Grafo `@graph`:** Interconecta `WebSite` -> `AdministrativeArea` (com `sameAs` Wikidata/Wikipedia) -> `LocalBusiness` -> `JobPosting` -> `BreadcrumbList`.
* **Sequestro Semântico:** Se `status !== 'ativo'`, retorna HTTP 200 amigável com 3 oportunidades ativas semelhantes na mesma região.

### 3.4. Widget Fluido com Backlinks Massivos (`api/widget.js`)
Distribui script JS para blogs e portais locais com container responsivo e links indexáveis `rel="follow"` apontando para o portal oficial.

---

## 4. BANCO DE DADOS SUPABASE (Índices & Triggers)

```sql
-- Extensões de Alta Performance
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Índices Compostos e Trigram
CREATE INDEX IF NOT EXISTS idx_stores_lookup ON public.stores(status, status_aprovacao, city_slug, destaque DESC);
CREATE INDEX IF NOT EXISTS idx_stores_nome_trgm ON public.stores USING gin (nome gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_listings_lookup ON public.listings(status, city_slug, destaque DESC, criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_listings_titulo_trgm ON public.listings USING gin (titulo gin_trgm_ops);
```

---

## 5. TESTES & VALIDAÇÕES CONCLUÍDAS

* ✅ **35/35 Testes de Endpoints Serverless:** Cache Edge (`s-maxage=86400`), HTTP 304 Condicional, JSON-LD `@graph`, Anti-Thin Content, Widget Generator, OpenGraph SVG e Google Indexing Dispatcher.
* ✅ **158/158 Arquivos HTML Auditados:** Validação estrutural de tags semânticas, meta viewport e canonicals.
* ✅ **Deploy Vercel Production:** Ativo em `https://aquitemachadinhos.vercel.app` e sincronizado no GitHub `main`.
