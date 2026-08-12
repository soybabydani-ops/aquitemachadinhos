-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 37
-- GLOBAL VIDEO FACTORY & INTERNATIONAL PINTEREST CATALOG (HIGH-CPM)
-- ==============================================================================

-- 1. TABELA DE JOBS DA FÁBRICA GLOBAL DE VÍDEOS CURTOS (EN / ES / PT)
CREATE TABLE IF NOT EXISTS public.global_video_factory_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_destination_or_product TEXT NOT NULL,
    language TEXT NOT NULL CHECK (language IN ('EN', 'ES', 'PT')),
    market_region TEXT NOT NULL DEFAULT 'US/Tier-1',
    video_title TEXT NOT NULL,
    script_30s TEXT NOT NULL,
    voice_model_id TEXT DEFAULT 'elevenlabs_en_adam_neural',
    rendering_status TEXT NOT NULL DEFAULT 'rendered' CHECK (rendering_status IN ('queued', 'rendering', 'rendered', 'syndicated')),
    video_mp4_url TEXT NOT NULL,
    thumbnail_badge_url TEXT NOT NULL,
    bio_caption TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    syndication_tiktok TEXT DEFAULT 'syndicated',
    syndication_reels TEXT DEFAULT 'syndicated',
    syndication_youtube_shorts TEXT DEFAULT 'syndicated',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE PINS DO PINTEREST CATALOG INTERNACIONAL (USD / EUR)
CREATE TABLE IF NOT EXISTS public.pinterest_global_catalog_pins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_pin_id TEXT NOT NULL,
    category_board TEXT NOT NULL,
    target_language TEXT NOT NULL DEFAULT 'EN',
    pin_title TEXT NOT NULL,
    pin_description TEXT NOT NULL,
    price_currency TEXT NOT NULL DEFAULT 'USD',
    price_value TEXT NOT NULL,
    badge_image_url TEXT NOT NULL,
    affiliate_landing_url TEXT NOT NULL,
    status_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_global_video_lang ON public.global_video_factory_jobs (language, market_region);
CREATE INDEX IF NOT EXISTS idx_global_pin_board ON public.pinterest_global_catalog_pins (category_board, target_language);

-- Row Level Security
ALTER TABLE public.global_video_factory_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pinterest_global_catalog_pins ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'global_video_factory_jobs' AND policyname = 'Permitir leitura publica global_video') THEN
        CREATE POLICY "Permitir leitura publica global_video" ON public.global_video_factory_jobs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pinterest_global_catalog_pins' AND policyname = 'Permitir leitura publica global_pins') THEN
        CREATE POLICY "Permitir leitura publica global_pins" ON public.pinterest_global_catalog_pins FOR SELECT USING (true);
    END IF;
END $$;
