-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 35
-- DATABASE HARDENING & ROW LEVEL SECURITY (RLS) ZERO-TRUST FIREWALL
-- ==============================================================================

-- 1. Ativação de RLS em 100% das Tabelas Públicas
ALTER TABLE IF EXISTS public.achadinhos_produtos_monetizados ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.cliques_afiliados_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dominios_expirados_radar ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.feeds_promocoes_viagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.leads_b2b_corporativo ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.links_afiliados ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.monetizacao_urgente ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.redirecionamentos_afiliados_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.rotas_internacionais_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.trafego_arbitragem_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.watchdog_integridade_logs ENABLE ROW LEVEL SECURITY;

-- 2. Políticas Estritas de Leitura Pública
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achadinhos_produtos_monetizados' AND policyname = 'Leitura publica produtos') THEN
        CREATE POLICY "Leitura publica produtos" ON public.achadinhos_produtos_monetizados FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'monetizacao_urgente' AND policyname = 'Leitura publica monetizacao') THEN
        CREATE POLICY "Leitura publica monetizacao" ON public.monetizacao_urgente FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'feeds_promocoes_viagens' AND policyname = 'Leitura publica promocoes') THEN
        CREATE POLICY "Leitura publica promocoes" ON public.feeds_promocoes_viagens FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'rotas_internacionais_feed' AND policyname = 'Leitura publica rotas_int') THEN
        CREATE POLICY "Leitura publica rotas_int" ON public.rotas_internacionais_feed FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'links_afiliados' AND policyname = 'Leitura publica links') THEN
        CREATE POLICY "Leitura publica links" ON public.links_afiliados FOR SELECT USING (true);
    END IF;
END $$;

-- 3. Políticas Estritas de Inserção de Logs / Cliques (Bloqueio Total de UPDATE/DELETE para Anon)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cliques_afiliados_logs' AND policyname = 'Insercao anonima cliques') THEN
        CREATE POLICY "Insercao anonima cliques" ON public.cliques_afiliados_logs FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cliques_afiliados_logs' AND policyname = 'Leitura publica cliques') THEN
        CREATE POLICY "Leitura publica cliques" ON public.cliques_afiliados_logs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads_b2b_corporativo' AND policyname = 'Insercao publica leads') THEN
        CREATE POLICY "Insercao publica leads" ON public.leads_b2b_corporativo FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'trafego_arbitragem_logs' AND policyname = 'Insercao publica trafego_logs') THEN
        CREATE POLICY "Insercao publica trafego_logs" ON public.trafego_arbitragem_logs FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'redirecionamentos_afiliados_stats' AND policyname = 'Insercao stats') THEN
        CREATE POLICY "Insercao stats" ON public.redirecionamentos_afiliados_stats FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'redirecionamentos_afiliados_stats' AND policyname = 'Leitura stats') THEN
        CREATE POLICY "Leitura stats" ON public.redirecionamentos_afiliados_stats FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'watchdog_integridade_logs' AND policyname = 'Insercao watchdog') THEN
        CREATE POLICY "Insercao watchdog" ON public.watchdog_integridade_logs FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'watchdog_integridade_logs' AND policyname = 'Leitura watchdog') THEN
        CREATE POLICY "Leitura watchdog" ON public.watchdog_integridade_logs FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'dominios_expirados_radar' AND policyname = 'Leitura dominios') THEN
        CREATE POLICY "Leitura dominios" ON public.dominios_expirados_radar FOR SELECT USING (true);
    END IF;
END $$;
