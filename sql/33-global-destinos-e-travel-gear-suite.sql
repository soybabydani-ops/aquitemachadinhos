-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 33
-- CONQUISTADOR GLOBAL DE DESTINOS & SCANNER DE MALAS E VIAGEM
-- ==============================================================================

-- 1. TABELA DE DESTINOS TURISTICOS GLOBAIS (PT / EN / ES)
CREATE TABLE IF NOT EXISTS public.global_destinos_turisticos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_destino TEXT NOT NULL,
    pais TEXT NOT NULL,
    slug TEXT NOT NULL,
    idioma_pagina TEXT NOT NULL CHECK (idioma_pagina IN ('PT', 'EN', 'ES')),
    sazonalidade TEXT NOT NULL CHECK (sazonalidade IN ('Inverno', 'Verão', 'Ano_Todo')),
    tarifa_media TEXT DEFAULT 'A partir de R$ 389',
    descricao_turistica TEXT NOT NULL,
    hotel_recomendado TEXT NOT NULL,
    link_afiliado_global TEXT DEFAULT 'https://meli.la/1U3rtgV',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    visualizacoes INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE SCANNER GLOBAL DE ACHADINHOS E MALAS DE VIAGEM
CREATE TABLE IF NOT EXISTS public.travel_gear_achadinhos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_nome TEXT NOT NULL,
    slug TEXT NOT NULL,
    categoria_viagem TEXT NOT NULL,
    clima_sazonal TEXT NOT NULL CHECK (clima_sazonal IN ('Inverno', 'Verão', 'Internacional_Longo_Curso', 'Ano_Todo')),
    destinos_recomendados TEXT NOT NULL,
    preco_normal TEXT NOT NULL,
    preco_promo TEXT NOT NULL,
    desconto_pct INT NOT NULL DEFAULT 60,
    loja TEXT NOT NULL,
    link_afiliado TEXT NOT NULL,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_global_destinos_slug ON public.global_destinos_turisticos (slug, idioma_pagina, status_ativo);
CREATE INDEX IF NOT EXISTS idx_travel_gear_slug ON public.travel_gear_achadinhos (slug, status_ativo);

-- Row Level Security
ALTER TABLE public.global_destinos_turisticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_gear_achadinhos ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'global_destinos_turisticos' AND policyname = 'Permitir leitura publica global_destinos') THEN
        CREATE POLICY "Permitir leitura publica global_destinos" ON public.global_destinos_turisticos FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'travel_gear_achadinhos' AND policyname = 'Permitir leitura publica travel_gear') THEN
        CREATE POLICY "Permitir leitura publica travel_gear" ON public.travel_gear_achadinhos FOR SELECT USING (true);
    END IF;
END $$;
