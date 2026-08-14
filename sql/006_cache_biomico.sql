-- 006_cache_biomico.sql
-- Support table for extreme payload compaction + cache mutation

CREATE TABLE IF NOT EXISTS public.cache_payloads (
  id BIGSERIAL PRIMARY KEY,
  tenant_slug TEXT NOT NULL,
  page_path TEXT NOT NULL,
  compacted_json JSONB,
  last_mutated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_slug, page_path)
);

CREATE INDEX IF NOT EXISTS idx_cache_tenant ON public.cache_payloads(tenant_slug);
ALTER TABLE public.cache_payloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.cache_payloads FOR SELECT USING (true);
