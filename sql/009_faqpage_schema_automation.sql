-- ============================================================
-- FAQPAGE + JOBPOSTING / NEWSARTICLE SCHEMA AUTOMATION (White Hat)
-- Combined @graph injection for Rich Snippets + International SEO
-- ============================================================

CREATE TABLE IF NOT EXISTS public.structured_faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_slug TEXT NOT NULL,
  page_type TEXT NOT NULL,          -- 'vagas', 'viagens', 'utilidade', 'clima'
  faq_json JSONB NOT NULL,
  combined_graph JSONB,             -- full @graph with FAQPage + JobPosting/NewsArticle
  year INTEGER DEFAULT 2026,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_structured_faq_tenant_page ON public.structured_faq(tenant_slug, page_type);
CREATE INDEX IF NOT EXISTS idx_structured_faq_year ON public.structured_faq(year);

ALTER TABLE public.structured_faq ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read structured FAQ" ON public.structured_faq 
  FOR SELECT USING (true);

-- Helper function for automatic injection
CREATE OR REPLACE FUNCTION public.upsert_structured_faq(
  p_tenant_slug TEXT,
  p_page_type TEXT,
  p_faq_json JSONB,
  p_combined_graph JSONB DEFAULT NULL,
  p_year INT DEFAULT 2026
) RETURNS uuid AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.structured_faq (tenant_slug, page_type, faq_json, combined_graph, year)
  VALUES (p_tenant_slug, p_page_type, p_faq_json, p_combined_graph, p_year)
  ON CONFLICT (tenant_slug, page_type) 
  DO UPDATE SET 
    faq_json = EXCLUDED.faq_json,
    combined_graph = EXCLUDED.combined_graph,
    updated_at = NOW()
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.structured_faq IS 'Automated FAQPage + JobPosting/NewsArticle Schema for Rich Snippets (RankBrain / International SEO). Combined @graph for mobile rich results.';
