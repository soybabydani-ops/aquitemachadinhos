-- 002_global_feeds.sql
-- Additional tables for global feeds + international geo

CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  tenant_slug TEXT,
  title TEXT,
  source TEXT,
  url TEXT,
  inserted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS geo_cache (
  id BIGSERIAL PRIMARY KEY,
  country TEXT,
  tenant_slug TEXT,
  content_variant TEXT, -- 'local-brl' | 'international-usd'
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_tenant ON jobs(tenant_slug);
CREATE INDEX IF NOT EXISTS idx_geo_cache_country ON geo_cache(country);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read" ON geo_cache FOR SELECT USING (true);