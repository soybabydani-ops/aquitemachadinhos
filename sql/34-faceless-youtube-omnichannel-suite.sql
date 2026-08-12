-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 34
-- FACELESS YOUTUBE SHORTS ENGINE & OMNICHANNEL VIRAL SCRIPTS
-- ==============================================================================

-- 1. TABELA DE ROTEIROS VIRAIS YOUTUBE SHORTS (FACELESS ENGINE)
CREATE TABLE IF NOT EXISTS public.automacao_youtube_roteiros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo_alerta TEXT NOT NULL CHECK (tipo_alerta IN ('Bug_Produto', 'Alerta_Viagem', 'Barretos', 'Concurso', 'Clima')),
    titulo_video TEXT NOT NULL,
    texto_roteiro TEXT NOT NULL,
    primeiro_comentario_fixado TEXT NOT NULL,
    url_destino_site TEXT NOT NULL,
    status_gerado BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE ROTEIROS DE VÍDEOS CURTOS SINCRONIZADOS (OMNICHANNEL ENGINE)
CREATE TABLE IF NOT EXISTS public.automacao_videos_roteiros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_viagem_id TEXT,
    tipo_midia TEXT DEFAULT 'Shorts_Reels_TikTok',
    texto_roteiro_curto TEXT NOT NULL,
    audio_duracao_est TEXT DEFAULT '30s',
    url_destino TEXT NOT NULL,
    status_sincronizado BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_yt_tipo ON public.automacao_youtube_roteiros (tipo_alerta, status_gerado);
CREATE INDEX IF NOT EXISTS idx_videos_sync ON public.automacao_videos_roteiros (status_sincronizado);

-- Row Level Security
ALTER TABLE public.automacao_youtube_roteiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automacao_videos_roteiros ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'automacao_youtube_roteiros' AND policyname = 'Permitir leitura publica youtube_roteiros') THEN
        CREATE POLICY "Permitir leitura publica youtube_roteiros" ON public.automacao_youtube_roteiros FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'automacao_videos_roteiros' AND policyname = 'Permitir leitura publica videos_roteiros') THEN
        CREATE POLICY "Permitir leitura publica videos_roteiros" ON public.automacao_videos_roteiros FOR SELECT USING (true);
    END IF;
END $$;
