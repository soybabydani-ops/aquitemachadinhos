-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 30
-- COMUNIDADE: ACHADOS & PERDIDOS E PORTAL DE DOAÇÕES NACIONAL
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.comunidade_achados_perdidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_local TEXT NOT NULL,
    cidade_slug TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'Perdido' CHECK (tipo IN ('Perdido', 'Achado')),
    categoria TEXT NOT NULL DEFAULT 'Documentos',
    item_descricao TEXT NOT NULL,
    bairro TEXT,
    contato_anonimizado TEXT,
    recompensa TEXT,
    foto_url TEXT,
    data_registro TIMESTAMPTZ NOT NULL DEFAULT now(),
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    origem_coleta TEXT DEFAULT 'comunidade',
    visualizacoes INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.comunidade_doacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_local TEXT NOT NULL,
    cidade_slug TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'Doação Disponível' CHECK (tipo IN ('Doação Disponível', 'Campanha de Arrecadação', 'Pedido de Ajuda')),
    categoria TEXT NOT NULL DEFAULT 'Roupas e Agasalhos',
    item_descricao TEXT NOT NULL,
    bairro TEXT,
    contato_anonimizado TEXT,
    condicao_item TEXT DEFAULT 'Bom estado',
    data_registro TIMESTAMPTZ NOT NULL DEFAULT now(),
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    origem_coleta TEXT DEFAULT 'comunidade',
    visualizacoes INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices de alta performance para busca e pSEO
CREATE INDEX IF NOT EXISTS idx_achados_cidade ON public.comunidade_achados_perdidos (cidade_slug, status_ativo, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_achados_categoria ON public.comunidade_achados_perdidos (categoria, status_ativo);
CREATE INDEX IF NOT EXISTS idx_doacoes_cidade ON public.comunidade_doacoes (cidade_slug, status_ativo, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_doacoes_categoria ON public.comunidade_doacoes (categoria, status_ativo);

-- Row Level Security (RLS)
ALTER TABLE public.comunidade_achados_perdidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comunidade_doacoes ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_achados_perdidos' AND policyname = 'Permitir leitura publica achados') THEN
        CREATE POLICY "Permitir leitura publica achados" ON public.comunidade_achados_perdidos FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_achados_perdidos' AND policyname = 'Permitir insercao publica achados') THEN
        CREATE POLICY "Permitir insercao publica achados" ON public.comunidade_achados_perdidos FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_doacoes' AND policyname = 'Permitir leitura publica doacoes') THEN
        CREATE POLICY "Permitir leitura publica doacoes" ON public.comunidade_doacoes FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_doacoes' AND policyname = 'Permitir insercao publica doacoes') THEN
        CREATE POLICY "Permitir insercao publica doacoes" ON public.comunidade_doacoes FOR INSERT WITH CHECK (true);
    END IF;
END $$;
