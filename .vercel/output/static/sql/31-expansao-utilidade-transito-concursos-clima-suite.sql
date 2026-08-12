-- ==============================================================================
-- AQUITEM ACHADINHOS — SQL SUITE 31
-- EXPANSÃO MESTRE: UTILIDADE PÚBLICA, TRÂNSITO RMSP, CONCURSOS & CLIMA
-- ==============================================================================

-- 1. TABELA EXPANDIDA DE UTILIDADE PUBLICA, DESAPEGOS & ADOÇÃO DE PETS
CREATE TABLE IF NOT EXISTS public.comunidade_utilidade_publica (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_local TEXT NOT NULL,
    cidade_slug TEXT NOT NULL,
    categoria TEXT NOT NULL CHECK (categoria IN ('Achados', 'Perdidos', 'Doacoes', 'Desapegos', 'Adocao_Pets')),
    subcategoria TEXT DEFAULT 'Geral',
    titulo_item TEXT NOT NULL,
    descricao TEXT NOT NULL,
    imagem_url TEXT,
    bairro TEXT,
    contato_anonimizado TEXT,
    valor_ou_condicao TEXT DEFAULT 'Grátis / Doação',
    recompensa TEXT,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    origem_coleta TEXT DEFAULT 'scanner_publico',
    visualizacoes INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE RADAR DE TRÂNSITO E MOBILIDADE URBANA (RMSP & PRINCIPAIS RODOVIAS)
CREATE TABLE IF NOT EXISTS public.radar_transito_rodovias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rodovia_slug TEXT NOT NULL,
    rodovia_nome TEXT NOT NULL,
    trecho TEXT NOT NULL,
    sentido TEXT NOT NULL,
    km_ponto TEXT,
    tipo_evento TEXT NOT NULL CHECK (tipo_evento IN ('Acidente Grave', 'Paralisação Total', 'Lentidão Extrema', 'Ponto de Alagamento', 'Obras na Pista', 'Bloqueio de Faixa')),
    situacao_atual TEXT NOT NULL,
    tempo_espera_estimado TEXT DEFAULT '+45 min',
    rota_alternativa TEXT NOT NULL,
    concessionaria TEXT DEFAULT 'CCR / Ecovias / DER',
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELA DE CONCURSOS E PROCESSOS SELETIVOS MUNICIPAIS
CREATE TABLE IF NOT EXISTS public.concursos_municipais_editais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_local TEXT NOT NULL,
    cidade_slug TEXT NOT NULL,
    orgao_nome TEXT NOT NULL,
    cargos TEXT NOT NULL,
    vagas_total INT NOT NULL DEFAULT 1,
    salario_ate TEXT NOT NULL,
    escolaridade TEXT NOT NULL,
    banca TEXT DEFAULT 'Comissão Própria / Vunesp',
    periodo_inscricao TEXT NOT NULL,
    taxa_inscricao TEXT DEFAULT 'Grátis ou R$ 50-90',
    edital_url TEXT,
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABELA DE ALERTAS METEOROLÓGICOS E CLIMA DE EMERGÊNCIA (INMET & DEFESA CIVIL)
CREATE TABLE IF NOT EXISTS public.alertas_meteorologicos_emergencia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cidade_local TEXT NOT NULL,
    cidade_slug TEXT NOT NULL,
    tipo_alerta TEXT NOT NULL CHECK (tipo_alerta IN ('Tempestade Severa', 'Ventos Fortes e Rajadas', 'Granizo e Chuva Torrencial', 'Onda de Calor Extremo', 'Risco de Alagamento', 'Frente Fria Intensa')),
    severidade TEXT NOT NULL CHECK (severidade IN ('Vermelho - Perigo Grande', 'Laranja - Perigo', 'Amarelo - Perigo Potencial')),
    temperatura_estimada TEXT,
    descricao_emergencia TEXT NOT NULL,
    recomendacoes_defesa_civil TEXT NOT NULL,
    valido_ate TIMESTAMPTZ DEFAULT (now() + interval '24 hours'),
    status_ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices de busca rápida
CREATE INDEX IF NOT EXISTS idx_utilidade_cidade ON public.comunidade_utilidade_publica (cidade_slug, categoria, status_ativo);
CREATE INDEX IF NOT EXISTS idx_transito_rodovia ON public.radar_transito_rodovias (rodovia_slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_concursos_cidade ON public.concursos_municipais_editais (cidade_slug, status_ativo);
CREATE INDEX IF NOT EXISTS idx_clima_cidade ON public.alertas_meteorologicos_emergencia (cidade_slug, status_ativo);

-- RLS e Políticas de Leitura e Inserção
ALTER TABLE public.comunidade_utilidade_publica ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.radar_transito_rodovias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concursos_municipais_editais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alertas_meteorologicos_emergencia ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_utilidade_publica' AND policyname = 'Permitir leitura publica utilidade') THEN
        CREATE POLICY "Permitir leitura publica utilidade" ON public.comunidade_utilidade_publica FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'comunidade_utilidade_publica' AND policyname = 'Permitir insercao publica utilidade') THEN
        CREATE POLICY "Permitir insercao publica utilidade" ON public.comunidade_utilidade_publica FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'radar_transito_rodovias' AND policyname = 'Permitir leitura publica transito') THEN
        CREATE POLICY "Permitir leitura publica transito" ON public.radar_transito_rodovias FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'concursos_municipais_editais' AND policyname = 'Permitir leitura publica concursos') THEN
        CREATE POLICY "Permitir leitura publica concursos" ON public.concursos_municipais_editais FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'alertas_meteorologicos_emergencia' AND policyname = 'Permitir leitura publica clima') THEN
        CREATE POLICY "Permitir leitura publica clima" ON public.alertas_meteorologicos_emergencia FOR SELECT USING (true);
    END IF;
END $$;
