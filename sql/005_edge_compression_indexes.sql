-- 005_edge_compression_indexes.sql
-- Parallel indexes + Edge compression support

CREATE INDEX IF NOT EXISTS idx_faculdade_lang ON public.faculdade_paginas_interativas (tenant_slug) WHERE tenant_slug LIKE 'en-%' OR tenant_slug LIKE 'es-%';
CREATE INDEX IF NOT EXISTS idx_faculdade_currency ON public.faculdade_paginas_interativas (page_path) WHERE page_path LIKE '%usd%' OR page_path LIKE '%gbp%';
CREATE INDEX IF NOT EXISTS idx_faculdade_city ON public.faculdade_paginas_interativas (tenant_slug);

-- Add compression hint column
ALTER TABLE public.faculdade_paginas_interativas 
ADD COLUMN IF NOT EXISTS payload_size_kb INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.faculdade_paginas_interativas ENABLE ROW LEVEL SECURITY;
