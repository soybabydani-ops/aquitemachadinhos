-- ==========================================================================
-- AQUI TEM ACHADINHOS - SUITE DE MONETIZAÇÃO E RASTREAMENTO DE AFILIADOS (v28.0)
-- ==========================================================================

-- 1. Tabela Principal de Links de Afiliados
CREATE TABLE IF NOT EXISTS public.links_afiliados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cidade_destino TEXT NOT NULL,
  cidade_origem TEXT DEFAULT 'São Paulo',
  tipo_transporte TEXT NOT NULL, -- 'Aéreo' ou 'Rodoviário'
  url_rastreamento TEXT NOT NULL,
  cliques_total INTEGER DEFAULT 0,
  comissao_estimada_reais NUMERIC(10,2) DEFAULT 0.00,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Logs de Cliques em Tempo Real
CREATE TABLE IF NOT EXISTS public.cliques_afiliados_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_afiliado_id UUID REFERENCES public.links_afiliados(id) ON DELETE SET NULL,
  cidade_destino TEXT NOT NULL,
  tipo_transporte TEXT NOT NULL,
  rota TEXT,
  ip_origem TEXT,
  user_agent TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas ultra-rápidas (< 0.01s)
CREATE INDEX IF NOT EXISTS idx_links_afiliados_busca ON public.links_afiliados (cidade_destino, tipo_transporte);
CREATE INDEX IF NOT EXISTS idx_cliques_afiliados_logs_destino ON public.cliques_afiliados_logs (cidade_destino, criado_em);

-- 3. Stored Procedure RPC para Registro Atômico de Cliques
CREATE OR REPLACE FUNCTION public.registrar_clique_afiliado(
  p_cidade_destino TEXT,
  p_tipo_transporte TEXT,
  p_rota TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_link RECORD;
  v_url TEXT;
BEGIN
  -- Busca o link correspondente ou pega o fallback da cidade
  SELECT * INTO v_link
  FROM public.links_afiliados
  WHERE LOWER(cidade_destino) = LOWER(p_cidade_destino)
    AND LOWER(tipo_transporte) = LOWER(p_tipo_transporte)
  ORDER BY cliques_total ASC
  LIMIT 1;

  IF FOUND THEN
    -- Incrementa contador total
    UPDATE public.links_afiliados
    SET cliques_total = cliques_total + 1,
        atualizado_em = NOW()
    WHERE id = v_link.id;

    -- Registra log individual
    INSERT INTO public.cliques_afiliados_logs (link_afiliado_id, cidade_destino, tipo_transporte, rota)
    VALUES (v_link.id, p_cidade_destino, p_tipo_transporte, p_rota);

    v_url := v_link.url_rastreamento;
  ELSE
    -- Link fallback inteligente
    v_url := 'https://wa.me/5517991238899?text=' || urlencode('Olá! Quero emitir minha passagem com desconto para ' || p_cidade_destino || ' via Aqui Tem Achadinhos.');
    
    INSERT INTO public.cliques_afiliados_logs (cidade_destino, tipo_transporte, rota)
    VALUES (p_cidade_destino, p_tipo_transporte, p_rota);
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'cidade_destino', p_cidade_destino,
    'tipo_transporte', p_tipo_transporte,
    'url_rastreamento', v_url,
    'timestamp', NOW()
  );
END;
$$;

-- 4. Permissões de Leitura Segura
GRANT SELECT, INSERT ON public.links_afiliados TO anon, authenticated;
GRANT SELECT, INSERT ON public.cliques_afiliados_logs TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.registrar_clique_afiliado(TEXT, TEXT, TEXT) TO anon, authenticated;

-- 5. Seed de Links de Afiliados Iniciais
INSERT INTO public.links_afiliados (cidade_destino, cidade_origem, tipo_transporte, url_rastreamento)
VALUES
  ('Barretos', 'São Paulo', 'Rodoviário', 'https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20a%20tarifa%20afiliada%20SP-Barretos%20por%20R$%2049,90.'),
  ('Barretos', 'Rio de Janeiro', 'Rodoviário', 'https://wa.me/5517997814500?text=Ol%C3%A1!%20Quero%20a%20tarifa%20afiliada%20Rio-Barretos.'),
  ('Gramado', 'São Paulo', 'Aéreo', 'https://wa.me/5517991238899?text=Ol%C3%A1!%20Quero%20a%20tarifa%20aerea%20promocional%20Gramado.'),
  ('Santos', 'São Paulo', 'Rodoviário', 'https://wa.me/5511996552211?text=Ol%C3%A1!%20Quero%20a%20passagem%20SP-Santos%20promocional.'),
  ('Campinas', 'São Paulo', 'Rodoviário', 'https://wa.me/5511997814500?text=Ol%C3%A1!%20Quero%20a%20passagem%20Campinas-SP%20promocional.'),
  ('São Paulo', 'Guarulhos', 'Rodoviário', 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Quero%20o%20transfer%20Guarulhos-SP.'),
  ('Rio de Janeiro', 'São Paulo', 'Aéreo', 'https://wa.me/5511991238899?text=Ol%C3%A1!%20Quero%20o%20voo%20promocional%20Rio-SP.')
ON CONFLICT DO NOTHING;
