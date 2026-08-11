-- =========================================================================
-- AQUITEM — SUPABASE BLACK OPS & PROGRAMMATIC SEO SETUP (v10.0)
-- Configuração de Alta Performance para 5.581 Cidades e Tráfego Massivo
-- =========================================================================

-- 1. Habilitação de Extensões Essenciais de Performance
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- 2. Tabela de Cidades (Cobertura 100% IBGE)
CREATE TABLE IF NOT EXISTS public.cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  uf CHAR(2) NOT NULL,
  populacao INTEGER DEFAULT 0,
  pib_per_capita TEXT,
  microrregiao TEXT,
  vocacao TEXT,
  wikidata_id TEXT,
  wikipedia_url TEXT,
  polos_vizinhos TEXT[],
  destaque_turistico BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Estabelecimentos e Lojas (Empresas Locais)
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  slug TEXT,
  city_slug TEXT NOT NULL REFERENCES public.cities(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  descricao TEXT,
  descricao_curta TEXT,
  endereco TEXT,
  bairro TEXT,
  cidade TEXT,
  uf CHAR(2),
  telefone TEXT,
  whatsapp TEXT,
  instagram TEXT,
  logo_url TEXT,
  fotos TEXT[],
  plano TEXT DEFAULT 'gratis' CHECK (plano IN ('gratis', 'destaque', 'pro', 'fundador', 'master')),
  destaque BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'pausado')),
  status_aprovacao TEXT DEFAULT 'aprovado' CHECK (status_aprovacao IN ('aprovado', 'pendente', 'rejeitado')),
  visualizacoes INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Vagas de Emprego e Classificados
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo TEXT NOT NULL,
  slug TEXT,
  city_slug TEXT NOT NULL REFERENCES public.cities(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
  categoria TEXT NOT NULL,
  subcategoria TEXT,
  descricao TEXT,
  preco TEXT,
  anunciante_nome TEXT,
  whatsapp TEXT,
  cidade TEXT,
  uf CHAR(2),
  bairro TEXT,
  fotos TEXT[],
  destaque BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'expirado', 'preenchida')),
  visualizacoes INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Tabela de Marcas Nacionais B2B (Vitrine de Grandes Marcas)
CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  segmento TEXT NOT NULL,
  descricao TEXT,
  logo_url TEXT,
  website TEXT,
  plano TEXT DEFAULT 'destaque',
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  ordem INTEGER DEFAULT 0,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Tabela de Auditoria e Logs de Indexação Googlebot
CREATE TABLE IF NOT EXISTS public.seo_indexation_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  http_status INTEGER,
  response_payload JSONB,
  last_submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Tabela de Domínios Fantasma (PBN & White-Label)
CREATE TABLE IF NOT EXISTS public.domain_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain TEXT UNIQUE NOT NULL,
  city_slug TEXT,
  brand_name TEXT NOT NULL,
  tagline TEXT,
  theme_config JSONB,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tabela de Impressões do Widget de Backlinks
CREATE TABLE IF NOT EXISTS public.widget_impressions (
  id BIGSERIAL PRIMARY KEY,
  domain_origin TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  widget_type TEXT DEFAULT 'vagas',
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ÍNDICES DE ALTA PERFORMANCE (B-TREE & GIN TRIGRAM)
-- =========================================================================

-- Índices nas Cidades
CREATE INDEX IF NOT EXISTS idx_cities_slug ON public.cities(slug);
CREATE INDEX IF NOT EXISTS idx_cities_uf ON public.cities(uf);
CREATE INDEX IF NOT EXISTS idx_cities_nome_trgm ON public.cities USING gin (nome gin_trgm_ops);

-- Índices nos Comércios e Lojas
CREATE INDEX IF NOT EXISTS idx_stores_lookup ON public.stores(status, status_aprovacao, city_slug, destaque DESC);
CREATE INDEX IF NOT EXISTS idx_stores_city ON public.stores(city_slug);
CREATE INDEX IF NOT EXISTS idx_stores_categoria ON public.stores(categoria);
CREATE INDEX IF NOT EXISTS idx_stores_nome_trgm ON public.stores USING gin (nome gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_stores_updated ON public.stores(atualizado_em DESC);

-- Índices nas Vagas e Classificados
CREATE INDEX IF NOT EXISTS idx_listings_lookup ON public.listings(status, city_slug, destaque DESC, criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_listings_city ON public.listings(city_slug);
CREATE INDEX IF NOT EXISTS idx_listings_categoria ON public.listings(categoria);
CREATE INDEX IF NOT EXISTS idx_listings_subcategoria ON public.listings(subcategoria);
CREATE INDEX IF NOT EXISTS idx_listings_titulo_trgm ON public.listings USING gin (titulo gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_listings_updated ON public.listings(atualizado_em DESC);

-- Índices de SEO e Auditoria
CREATE INDEX IF NOT EXISTS idx_seo_url ON public.seo_indexation_log(url);
CREATE INDEX IF NOT EXISTS idx_seo_last_sub ON public.seo_indexation_log(last_submitted_at DESC);

-- =========================================================================
-- PROCEDURES & TRIGGERS DE ATUALIZAÇÃO E AUTO-APROVAÇÃO INTELIGENTE
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de Auto-Aprovação Inteligente para Lojas e Empresas
CREATE OR REPLACE FUNCTION public.handle_store_auto_approval()
RETURNS TRIGGER AS $$
BEGIN
  -- Se o nome e cidade forem válidos e não houver rejeição explícita, auto-aprova na hora!
  IF NEW.nome IS NOT NULL AND length(trim(NEW.nome)) >= 3 AND NEW.city_slug IS NOT NULL THEN
    NEW.status_aprovacao = 'aprovado';
    NEW.status = 'ativo';
    NEW.destaque = true;
  END IF;
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_stores_auto_approval ON public.stores;
CREATE TRIGGER trg_stores_auto_approval
  BEFORE INSERT ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_store_auto_approval();

-- Trigger de Auto-Aprovação Inteligente para Vagas e Classificados
CREATE OR REPLACE FUNCTION public.handle_listing_auto_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.titulo IS NOT NULL AND length(trim(NEW.titulo)) >= 3 AND NEW.city_slug IS NOT NULL THEN
    NEW.status = 'ativo';
    NEW.destaque = true;
  END IF;
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_listings_auto_approval ON public.listings;
CREATE TRIGGER trg_listings_auto_approval
  BEFORE INSERT ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_listing_auto_approval();

DROP TRIGGER IF EXISTS trg_stores_updated_at ON public.stores;
CREATE TRIGGER trg_stores_updated_at
  BEFORE UPDATE ON public.stores
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_listings_updated_at ON public.listings;
CREATE TRIGGER trg_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_cities_updated_at ON public.cities;
CREATE TRIGGER trg_cities_updated_at
  BEFORE UPDATE ON public.cities
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =========================================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- =========================================================================

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_indexation_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domain_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widget_impressions ENABLE ROW LEVEL SECURITY;

-- Leitura Pública para Todos os Visitantes
DROP POLICY IF EXISTS "Public read cities" ON public.cities;
CREATE POLICY "Public read cities" ON public.cities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read stores" ON public.stores;
CREATE POLICY "Public read stores" ON public.stores FOR SELECT USING (status = 'ativo' AND status_aprovacao = 'aprovado');

DROP POLICY IF EXISTS "Public read listings" ON public.listings;
CREATE POLICY "Public read listings" ON public.listings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read brands" ON public.brands;
CREATE POLICY "Public read brands" ON public.brands FOR SELECT USING (status = 'ativo');

DROP POLICY IF EXISTS "Public read domain_themes" ON public.domain_themes;
CREATE POLICY "Public read domain_themes" ON public.domain_themes FOR SELECT USING (ativo = true);

-- Inserção Pública de Anúncios e Lojas (com status pendente/ativo controlado)
DROP POLICY IF EXISTS "Public insert stores" ON public.stores;
CREATE POLICY "Public insert stores" ON public.stores FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert listings" ON public.listings;
CREATE POLICY "Public insert listings" ON public.listings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert widget_impressions" ON public.widget_impressions;
CREATE POLICY "Public insert widget_impressions" ON public.widget_impressions FOR INSERT WITH CHECK (true);
