-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 32
-- HIGH-FREQUENCY GROWTH: SHOWS, BUGS DE CUPONS, BENEFÍCIOS & BARRETOS 2026
-- ==============================================================================

-- 1. GRANDES SHOWS E FESTIVAIS
CREATE TABLE IF NOT EXISTS public.eventos_grandes_shows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artista_evento TEXT NOT NULL,
    slug TEXT NOT NULL,
    cidade TEXT NOT NULL DEFAULT 'São Paulo',
    local_arena TEXT NOT NULL,
    data_evento TEXT NOT NULL,
    status_ingressos TEXT DEFAULT 'Últimos Ingressos / Lote Extra',
    guia_transporte TEXT NOT NULL,
    hospedagens_proximas TEXT NOT NULL,
    link_passagens TEXT DEFAULT 'https://meli.la/1U3rtgV',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. PAINEL HACKER DE CUPONS & BUGS RELÂMPAGO
CREATE TABLE IF NOT EXISTS public.cupons_bugs_relampago (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_nome TEXT NOT NULL,
    slug TEXT NOT NULL,
    loja TEXT NOT NULL,
    preco_normal TEXT NOT NULL,
    preco_bug TEXT NOT NULL,
    desconto_pct INT NOT NULL DEFAULT 70,
    cupom_codigo TEXT DEFAULT 'BUGAPLICADO',
    link_afiliado TEXT NOT NULL,
    status_verificado BOOLEAN NOT NULL DEFAULT true,
    visualizacoes INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. CONSULTAS DE CALENDÁRIOS E BENEFÍCIOS SOCIAIS
CREATE TABLE IF NOT EXISTS public.consultas_beneficios_calendarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficio_nome TEXT NOT NULL,
    slug TEXT NOT NULL,
    orgao_emissor TEXT NOT NULL,
    publico_alvo TEXT NOT NULL,
    calendario_json JSONB NOT NULL,
    regras_saque TEXT NOT NULL,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. GUIA ESTRATÉGICO FESTA DO PEÃO DE BARRETOS 2026
CREATE TABLE IF NOT EXISTS public.barretos_guia_estrategico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tema_duvida TEXT NOT NULL,
    slug TEXT NOT NULL,
    categoria TEXT NOT NULL,
    conteudo_guia TEXT NOT NULL,
    dicas_urgentes TEXT NOT NULL,
    link_acao TEXT DEFAULT 'https://meli.la/1U3rtgV',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. LOOKS & MODA COUNTRY BARRETOS
CREATE TABLE IF NOT EXISTS public.looks_country_achadinhos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_nome TEXT NOT NULL,
    slug TEXT NOT NULL,
    marca_estilo TEXT NOT NULL,
    categoria_peca TEXT NOT NULL,
    preco_original TEXT NOT NULL,
    preco_promocional TEXT NOT NULL,
    desconto_pct INT NOT NULL DEFAULT 65,
    loja TEXT NOT NULL,
    link_afiliado TEXT NOT NULL,
    inspiracao_artista TEXT DEFAULT 'Ana Castela / Gusttavo Lima',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_shows_slug ON public.eventos_grandes_shows (slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_bugs_slug ON public.cupons_bugs_relampago (slug, status_verificado);
CREATE INDEX IF NOT EXISTS idx_beneficios_slug ON public.consultas_beneficios_calendarios (slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_barretos_slug ON public.barretos_guia_estrategico (slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_looks_slug ON public.looks_country_achadinhos (slug, status_ativo);

-- Row Level Security
ALTER TABLE public.eventos_grandes_shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cupons_bugs_relampago ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultas_beneficios_calendarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barretos_guia_estrategico ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.looks_country_achadinhos ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'eventos_grandes_shows' AND policyname = 'Permitir leitura publica shows') THEN
        CREATE POLICY "Permitir leitura publica shows" ON public.eventos_grandes_shows FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cupons_bugs_relampago' AND policyname = 'Permitir leitura publica bugs') THEN
        CREATE POLICY "Permitir leitura publica bugs" ON public.cupons_bugs_relampago FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'consultas_beneficios_calendarios' AND policyname = 'Permitir leitura publica consultas') THEN
        CREATE POLICY "Permitir leitura publica consultas" ON public.consultas_beneficios_calendarios FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'barretos_guia_estrategico' AND policyname = 'Permitir leitura publica barretos') THEN
        CREATE POLICY "Permitir leitura publica barretos" ON public.barretos_guia_estrategico FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'looks_country_achadinhos' AND policyname = 'Permitir leitura publica looks') THEN
        CREATE POLICY "Permitir leitura publica looks" ON public.looks_country_achadinhos FOR SELECT USING (true);
    END IF;
END $$;
