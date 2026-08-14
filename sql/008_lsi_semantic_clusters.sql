-- ============================================================
-- LSI SEMANTIC CLUSTERS + EXPANDED Q&A BLOCKS (White Hat Protocol)
-- Protocolo de Clusters de Relevância LSI - RankBrain Optimization
-- ============================================================

CREATE TABLE IF NOT EXISTS public.lsi_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_slug TEXT NOT NULL,
  cluster_type TEXT NOT NULL, -- 'home_office', 'recrutamento', 'seguranca_vento'
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  year INTEGER DEFAULT 2026,
  location_context TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast edge retrieval and LSI relevance
CREATE INDEX IF NOT EXISTS idx_lsi_tenant_type ON public.lsi_clusters(tenant_slug, cluster_type);
CREATE INDEX IF NOT EXISTS idx_lsi_year ON public.lsi_clusters(year);
CREATE INDEX IF NOT EXISTS idx_lsi_created ON public.lsi_clusters(created_at DESC);

-- Enable RLS - Public read for SEO crawlers (White Hat)
ALTER TABLE public.lsi_clusters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read LSI clusters" ON public.lsi_clusters 
  FOR SELECT USING (true);

-- Optional: upsert helper function for automation
CREATE OR REPLACE FUNCTION public.upsert_lsi_cluster(
  p_tenant_slug TEXT,
  p_cluster_type TEXT,
  p_question TEXT,
  p_answer TEXT,
  p_year INT DEFAULT 2026,
  p_location_context TEXT DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.lsi_clusters (tenant_slug, cluster_type, question, answer, year, location_context)
  VALUES (p_tenant_slug, p_cluster_type, p_question, p_answer, p_year, p_location_context)
  ON CONFLICT (tenant_slug, cluster_type, question) 
  DO UPDATE SET 
    answer = EXCLUDED.answer,
    location_context = EXCLUDED.location_context,
    updated_at = NOW()
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.lsi_clusters IS 'Clusters de Relevância LSI para RankBrain: Blocos Q&A expandidos para vagas e alertas climáticos. Otimização White Hat Core Web Vitals + EEAT.';
