-- =============================================
-- MIGRATION: Tenant Content & SEO Structure
-- Portal: Aqui Tem Achadinhos (64 tenants)
-- Date: 2026-08-14
-- Purpose: Tables for Climate, Articles, Products, Reviews
-- Compliance: Google Search Console + Product Reviews Update
-- =============================================

-- Tabela principal de tenants (cidades)
CREATE TABLE IF NOT EXISTS tenants (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  type TEXT CHECK (type IN ('turistico', 'capital', 'regional')) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de dados climáticos (ingestão em tempo real)
CREATE TABLE IF NOT EXISTS climate_data (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT REFERENCES tenants(id) ON DELETE CASCADE,
  city TEXT NOT NULL,
  temperature NUMERIC(4,1),
  condition TEXT,
  humidity INTEGER,
  wind_speed NUMERIC(5,1),
  uv_index INTEGER,
  alerts JSONB,
  source TEXT DEFAULT 'open-meteo',
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de artigos (eficiência energética + tendências)
CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT REFERENCES tenants(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content_markdown TEXT,
  type TEXT CHECK (type IN ('energy_efficiency', 'consumption_trends', 'hardware_guide')) NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  canonical_url TEXT,
  schema_json JSONB,
  UNIQUE(tenant_id, slug)
);

-- Tabela de produtos e tendências (e-commerce informativo)
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  tenant_id BIGINT REFERENCES tenants(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price_range TEXT,
  partner_links JSONB, -- { "shopee": "...", "temu": "...", ... }
  image_url TEXT,
  schema_product JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Reviews (Schema Review)
CREATE TABLE IF NOT EXISTS product_reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  author TEXT,
  date_published DATE,
  source TEXT DEFAULT 'portal',
  schema_review JSONB
);

-- Índices para performance e SEO
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_climate_tenant ON climate_data(tenant_id);
CREATE INDEX IF NOT EXISTS idx_articles_tenant_type ON articles(tenant_id, type);
CREATE INDEX IF NOT EXISTS idx_products_tenant ON products(tenant_id);

-- RLS Policies (segurança)
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE climate_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Política pública de leitura
CREATE POLICY "Public read access" ON tenants FOR SELECT USING (true);
CREATE POLICY "Public read access" ON climate_data FOR SELECT USING (true);
CREATE POLICY "Public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON product_reviews FOR SELECT USING (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE tenants IS '64 tenants editoriais - Cidades do portal';
COMMENT ON TABLE climate_data IS 'Dados climáticos reais para Boletim de Utilidade Pública';
COMMENT ON TABLE articles IS 'Artigos White Hat: Eficiência Energética + Tendências de Consumo';
COMMENT ON TABLE products IS 'Vitrine de produtos com Schema Product + Review';