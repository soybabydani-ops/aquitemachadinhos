-- 007_semantic_graph.sql
-- Support for unified @graph JSON-LD entities

CREATE TABLE IF NOT EXISTS public.semantic_entities (
  id BIGSERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL, -- Organization, WebSite, CollectionPage, etc.
  tenant_slug TEXT,
  data JSONB NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_semantic_type ON public.semantic_entities(entity_type);
CREATE INDEX IF NOT EXISTS idx_semantic_tenant ON public.semantic_entities(tenant_slug);

ALTER TABLE public.semantic_entities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.semantic_entities FOR SELECT USING (true);
