-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 38
-- HIGH-TICKET LUXURY ARBITRAGE & B2B COMMERCIAL INTELLIGENCE MATRIX
-- ==============================================================================

-- 1. TABELA DE ROTAS PREMIUM E ALTO LUXO (JATOS & HELICÓPTEROS)
CREATE TABLE IF NOT EXISTS public.high_ticket_luxo_trafego (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    origem_hub TEXT NOT NULL,
    destino_premium TEXT NOT NULL,
    servico_luxo TEXT NOT NULL CHECK (servico_luxo IN ('Jato_Privado', 'Helicoptero_Executivo', 'Resort_Premium_Heliponto', 'Blindados_Executivos')),
    slug TEXT NOT NULL,
    tempo_estimado TEXT NOT NULL,
    preco_estimado_cotacao TEXT NOT NULL,
    link_afiliado_high_ticket TEXT NOT NULL DEFAULT 'https://meli.la/1U3rtgV',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE INVESTIMENTOS IMOBILIÁRIOS B2B & PONTOS COMERCIAIS
CREATE TABLE IF NOT EXISTS public.investimentos_imobiliarios_b2b (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_polo TEXT NOT NULL,
    tipo_ativo TEXT NOT NULL CHECK (tipo_ativo IN ('Terreno_Industrial', 'Ponto_Comercial_Prime', 'Area_Expansao_Hoteleira', 'Galpao_Logistico')),
    slug TEXT NOT NULL,
    metragem_area TEXT NOT NULL,
    valor_estimado TEXT NOT NULL,
    viabilidade_resumo TEXT NOT NULL,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELA DE INFRAESTRUTURA FINANCEIRA E HEDGE GLOBAL (EN / DE / JA)
CREATE TABLE IF NOT EXISTS public.global_hedge_infrastructure (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ativo_classe TEXT NOT NULL CHECK (ativo_classe IN ('Seguro_Frota', 'Transferencia_Capital', 'Garantia_Contratual', 'Offshore_Trust')),
    pais_origem TEXT NOT NULL,
    idioma_alvo TEXT NOT NULL CHECK (idioma_alvo IN ('EN', 'DE', 'JA')),
    slug TEXT NOT NULL,
    titulo_servico TEXT NOT NULL,
    descricao_compliance TEXT NOT NULL,
    link_afiliado_high_ticket TEXT NOT NULL DEFAULT 'https://meli.la/1U3rtgV',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABELA DE LOGÍSTICA PESADA E ATIVOS CORPORATIVOS
CREATE TABLE IF NOT EXISTS public.logistica_pesada_corporativa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_origem TEXT NOT NULL,
    tipo_operacao TEXT NOT NULL CHECK (tipo_operacao IN ('Fretamento_Cargas_Aereas', 'Transporte_Frotas_Pesadas', 'Contratos_Anuais_Aeronaves')),
    slug TEXT NOT NULL,
    capacidade_toneladas TEXT NOT NULL,
    sla_urgencia TEXT NOT NULL,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_luxo_slug ON public.high_ticket_luxo_trafego (slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_invest_slug ON public.investimentos_imobiliarios_b2b (slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_hedge_slug ON public.global_hedge_infrastructure (slug, idioma_alvo);
CREATE INDEX IF NOT EXISTS idx_logistica_slug ON public.logistica_pesada_corporativa (slug, status_ativo);

-- Row Level Security
ALTER TABLE public.high_ticket_luxo_trafego ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investimentos_imobiliarios_b2b ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_hedge_infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logistica_pesada_corporativa ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'high_ticket_luxo_trafego' AND policyname = 'Permitir leitura publica luxo') THEN
        CREATE POLICY "Permitir leitura publica luxo" ON public.high_ticket_luxo_trafego FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'investimentos_imobiliarios_b2b' AND policyname = 'Permitir leitura publica invest_b2b') THEN
        CREATE POLICY "Permitir leitura publica invest_b2b" ON public.investimentos_imobiliarios_b2b FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'global_hedge_infrastructure' AND policyname = 'Permitir leitura publica hedge') THEN
        CREATE POLICY "Permitir leitura publica hedge" ON public.global_hedge_infrastructure FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'logistica_pesada_corporativa' AND policyname = 'Permitir leitura publica logistica') THEN
        CREATE POLICY "Permitir leitura publica logistica" ON public.logistica_pesada_corporativa FOR SELECT USING (true);
    END IF;
END $$;
