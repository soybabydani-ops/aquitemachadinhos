-- 003_historical_consistency.sql
-- Protocolo de Consistência Histórica (Google Search Guidelines)

CREATE TABLE IF NOT EXISTS public.faculdade_paginas_interativas (
  id BIGSERIAL PRIMARY KEY,
  tenant_slug TEXT NOT NULL,
  page_path TEXT NOT NULL,
  title TEXT,
  content_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_modified TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_slug, page_path)
);

CREATE INDEX IF NOT EXISTS idx_faculdade_tenant_path ON public.faculdade_paginas_interativas(tenant_slug, page_path);
CREATE INDEX IF NOT EXISTS idx_faculdade_last_modified ON public.faculdade_paginas_interativas(last_modified DESC);

-- Trigger to auto-update last_modified
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_faculdade_last_modified ON public.faculdade_paginas_interativas;
CREATE TRIGGER trg_faculdade_last_modified
  BEFORE UPDATE ON public.faculdade_paginas_interativas
  FOR EACH ROW EXECUTE FUNCTION update_last_modified();

ALTER TABLE public.faculdade_paginas_interativas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.faculdade_paginas_interativas FOR SELECT USING (true);