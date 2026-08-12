-- =============================================================================
-- AQUITEM ACHADINHOS — SUITE 41: MOTOR DE MONETIZAÇÃO DISCOVER CARS (LOGÍSTICA VEICULAR)
-- Categoria: Locacao_Veiculos_High_Ticket
-- Partner Link: https://www.discovercars.com/?a_aid=Aquitemachadinhos
-- =============================================================================

-- 1. Inserir Categoria e Produtos de Locação Veicular High Ticket em achadinhos_produtos_monetizados
INSERT INTO public.achadinhos_produtos_monetizados 
(nome_produto, slug, plataforma, categoria, link_afiliado_final, preco_de, preco_por, desconto_pct, imagem_url, cliques_total, ativo, criado_em, atualizado_em)
VALUES
(
  'Aluguel de Carros Blindados, SUVs e Utilitários Executivos — São Paulo Guarulhos (GRU) & Congonhas',
  'aluguel-carros-blindados-executivos-guarulhos-discovercars',
  'Discover Cars Oficial',
  'Locacao_Veiculos_High_Ticket',
  'https://www.discovercars.com/?a_aid=Aquitemachadinhos',
  450.00,
  135.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Locação de Carros e SUVs para a Festa do Peão de Barretos 2026 — Desconto de até 70% com Cancelamento Grátis',
  'locacao-carros-suv-festa-do-peao-barretos-discovercars',
  'Discover Cars Oficial',
  'Locacao_Veiculos_High_Ticket',
  'https://www.discovercars.com/?a_aid=Aquitemachadinhos',
  380.00,
  114.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Luxury Car Hire & SUV Rentals Online — Tokyo Haneda Airport (HND) & Narita (NRT)',
  'luxury-car-hire-suv-rentals-tokyo-haneda-discovercars',
  'Discover Cars Oficial',
  'Locacao_Veiculos_High_Ticket',
  'https://www.discovercars.com/?a_aid=Aquitemachadinhos',
  250.00,
  75.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Best Car Rental Deals with Free Cancellation — Miami International Airport (MIA) & Orlando (MCO)',
  'best-car-rental-deals-free-cancellation-miami-discovercars',
  'Discover Cars Oficial',
  'Locacao_Veiculos_High_Ticket',
  'https://www.discovercars.com/?a_aid=Aquitemachadinhos',
  180.00,
  54.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Compare & Save up to 70% on Business Fleet & Executive Car Rentals Worldwide',
  'business-fleet-executive-car-rentals-compare-save-discovercars',
  'Discover Cars Oficial',
  'Locacao_Veiculos_High_Ticket',
  'https://www.discovercars.com/?a_aid=Aquitemachadinhos',
  320.00,
  96.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  plataforma = EXCLUDED.plataforma,
  categoria = EXCLUDED.categoria,
  link_afiliado_final = EXCLUDED.link_afiliado_final,
  preco_de = EXCLUDED.preco_de,
  preco_por = EXCLUDED.preco_por,
  desconto_pct = EXCLUDED.desconto_pct,
  atualizado_em = NOW();

-- 2. Inserir em links_afiliados para o injetor de rotas multicidade
INSERT INTO public.links_afiliados
(cidade_origem, cidade_destino, tipo_transporte, url_rastreamento, cliques_total, comissao_estimada_reais, criado_em, atualizado_em)
VALUES
('Nacional', 'Aluguel_Carros', 'Discover_Cars', 'https://www.discovercars.com/?a_aid=Aquitemachadinhos', 0, 45.00, NOW(), NOW()),
('Internacional', 'Global_Car_Rental', 'Discover_Cars', 'https://www.discovercars.com/?a_aid=Aquitemachadinhos', 0, 85.00, NOW(), NOW()),
('Barretos', 'Locacao_Veiculos', 'Discover_Cars', 'https://www.discovercars.com/?a_aid=Aquitemachadinhos', 0, 35.00, NOW(), NOW()),
('Sao_Paulo', 'Aluguel_Blindados', 'Discover_Cars', 'https://www.discovercars.com/?a_aid=Aquitemachadinhos', 0, 95.00, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Garantir Políticas RLS para Leitura Pública dos Carros
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achadinhos_produtos_monetizados' AND policyname = 'Leitura publica produtos') THEN
        CREATE POLICY "Leitura publica produtos" ON public.achadinhos_produtos_monetizados FOR SELECT USING (true);
    END IF;
END $$;
