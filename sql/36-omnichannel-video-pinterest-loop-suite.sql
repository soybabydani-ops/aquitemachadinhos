-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 36
-- OMNICHANNEL SYNTHETIC VIDEO ENGINE & PERPETUAL PINTEREST CATALOG
-- ==============================================================================

-- 1. TABELA DE JOBS DE VÍDEOS SINTÉTICOS OMNICHANNEL (REELS, TIKTOK, SHORTS)
CREATE TABLE IF NOT EXISTS public.omnichannel_video_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_id TEXT NOT NULL,
    titulo_video TEXT NOT NULL,
    roteiro_30s TEXT NOT NULL,
    audio_voice_id TEXT DEFAULT 'elevenlabs_pt_br_narrator',
    midia_status TEXT NOT NULL DEFAULT 'rendered' CHECK (midia_status IN ('queued', 'rendering', 'rendered', 'syndicated')),
    video_mp4_url TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    legenda_bio TEXT NOT NULL,
    url_destino TEXT NOT NULL,
    instagram_status TEXT DEFAULT 'syndicated',
    tiktok_status TEXT DEFAULT 'syndicated',
    youtube_status TEXT DEFAULT 'syndicated',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE PINS DE ALTA CONVERSÃO DO PINTEREST CATALOG
CREATE TABLE IF NOT EXISTS public.pinterest_catalog_pins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pin_id TEXT NOT NULL,
    pasta_categoria TEXT NOT NULL CHECK (pasta_categoria IN ('Eletrônicos & Smart Home', 'Moda & Looks Country', 'Viagens & Malas', 'Casa & Decoração')),
    titulo_pin TEXT NOT NULL,
    descricao_pin TEXT NOT NULL,
    preco_formatado TEXT NOT NULL,
    imagem_com_badge_url TEXT NOT NULL,
    link_rastreado_afiliado TEXT NOT NULL,
    status_pinado BOOLEAN NOT NULL DEFAULT true,
    visualizacoes_pin INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_video_status ON public.omnichannel_video_jobs (midia_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pin_pasta ON public.pinterest_catalog_pins (pasta_categoria, status_pinado);

-- Row Level Security
ALTER TABLE public.omnichannel_video_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pinterest_catalog_pins ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'omnichannel_video_jobs' AND policyname = 'Permitir leitura publica video_jobs') THEN
        CREATE POLICY "Permitir leitura publica video_jobs" ON public.omnichannel_video_jobs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'pinterest_catalog_pins' AND policyname = 'Permitir leitura publica catalog_pins') THEN
        CREATE POLICY "Permitir leitura publica catalog_pins" ON public.pinterest_catalog_pins FOR SELECT USING (true);
    END IF;
END $$;
