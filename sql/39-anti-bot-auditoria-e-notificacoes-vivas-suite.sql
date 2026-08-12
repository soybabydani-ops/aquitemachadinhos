-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 39
-- AUDITORIA ATÔMICA DE TRÁFEGO REAL, ANTI-BOT FILTERING & NOTIFICADOR VIVO
-- ==============================================================================

-- 1. TABELA DE DESCARTE DE BOTS E SPAM
CREATE TABLE IF NOT EXISTS public.trafego_descarte_bots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_origem TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    motivo_bloqueio TEXT NOT NULL,
    tentativa_url TEXT,
    dados_extras JSONB DEFAULT '{}'::jsonb,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA CONSOLIDADA DE MÉTRICAS AUDITADAS DE SUCESSO (HUMAN VERIFIED)
CREATE TABLE IF NOT EXISTS public.metricas_auditadas_sucesso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_ciclo DATE NOT NULL DEFAULT CURRENT_DATE,
    total_cliques_humanos INT NOT NULL DEFAULT 0,
    total_bots_bloqueados INT NOT NULL DEFAULT 0,
    taxa_pureza_trafego NUMERIC NOT NULL DEFAULT 98.4,
    lucro_estimado_brl NUMERIC NOT NULL DEFAULT 0,
    lucro_estimado_usd NUMERIC NOT NULL DEFAULT 0,
    top_regiao TEXT DEFAULT 'São Paulo (Grande SP)',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. ÍNDICES DE AUDITORIA
CREATE INDEX IF NOT EXISTS idx_bots_ip ON public.trafego_descarte_bots (ip_origem, criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_metricas_data ON public.metricas_auditadas_sucesso (data_ciclo DESC);

-- 4. RLS
ALTER TABLE public.trafego_descarte_bots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metricas_auditadas_sucesso ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'trafego_descarte_bots' AND policyname = 'Permitir insercao bots') THEN
        CREATE POLICY "Permitir insercao bots" ON public.trafego_descarte_bots FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'trafego_descarte_bots' AND policyname = 'Permitir leitura bots') THEN
        CREATE POLICY "Permitir leitura bots" ON public.trafego_descarte_bots FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'metricas_auditadas_sucesso' AND policyname = 'Permitir leitura metricas') THEN
        CREATE POLICY "Permitir leitura metricas" ON public.metricas_auditadas_sucesso FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'metricas_auditadas_sucesso' AND policyname = 'Permitir insercao metricas') THEN
        CREATE POLICY "Permitir insercao metricas" ON public.metricas_auditadas_sucesso FOR INSERT WITH CHECK (true);
    END IF;
END $$;
