-- =============================================================================
-- AQUITEM ACHADINHOS — SUITE 44: MOTOR DE RECEITA HIGH-TICKET CJ AFFILIATE (LUXO GLOBAL)
-- Categoria: Premium_Luxo_CJ_USD
-- Tracking CJ: jdoqocy.com / anrdoezrs.net (Marriott, IHG, Samsonite, TUMI, Booking VIP)
-- =============================================================================

-- 1. Inserir Produtos e Suítes de Alto Luxo em achadinhos_produtos_monetizados
INSERT INTO public.achadinhos_produtos_monetizados 
(nome_produto, slug, plataforma, categoria, link_afiliado_final, preco_de, preco_por, desconto_pct, imagem_url, cliques_total, ativo, criado_em, atualizado_em)
VALUES
(
  'Reservas de Suítes Presidenciais e Resorts de Alto Luxo com Heliponto — Marriott & IHG VIP (CJ)',
  'reservas-suites-presidenciais-resorts-luxo-heliponto-cj',
  'CJ Affiliate (Marriott / IHG)',
  'Premium_Luxo_CJ_USD',
  'https://www.anrdoezrs.net/click-101143576-15783291?url=https%3A%2F%2Fwww.marriott.com',
  12500.00,
  3750.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Malas de Bordo de Alta Resistência em Alumínio e Policarbonato — Samsonite & TUMI Oficial (CJ)',
  'malas-bordo-alta-resistencia-samsonite-tumi-cj',
  'CJ Affiliate (Samsonite / TUMI)',
  'Premium_Luxo_CJ_USD',
  'https://www.jdoqocy.com/click-101143576-15894320?url=https%3A%2F%2Fshop.samsonite.com',
  3890.00,
  1167.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Last-Minute Luxury Villas & 5-Star Hotel Allocation Worldwide — Booking VIP (CJ)',
  'last-minute-luxury-villas-5-star-hotel-allocation-cj',
  'CJ Affiliate (Booking VIP)',
  'Premium_Luxo_CJ_USD',
  'https://www.anrdoezrs.net/click-101143576-15982104?url=https%3A%2F%2Fwww.booking.com%2Fluxury',
  4500.00,
  1350.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Fretamento de Jatos Executivos & Traslado VIP de Helicóptero para Ilhas e Condomínios Fechados',
  'fretamento-jatos-executivos-traslado-helicoptero-cj',
  'CJ Affiliate Luxury',
  'Premium_Luxo_CJ_USD',
  'https://www.jdoqocy.com/click-101143576-15783291',
  18000.00,
  5400.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'TUMI Alpha 3 Continental Dual Access 4 Wheeled Carry-On Luggage — VIP Executive Edition',
  'tumi-alpha-3-continental-carry-on-luggage-cj',
  'CJ Affiliate (TUMI)',
  'Premium_Luxo_CJ_USD',
  'https://www.jdoqocy.com/click-101143576-15894320',
  4850.00,
  1455.00,
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

-- 2. Inserir em links_afiliados para o injetor de rotas de alto luxo
INSERT INTO public.links_afiliados
(cidade_origem, cidade_destino, tipo_transporte, url_rastreamento, cliques_total, comissao_estimada_reais, criado_em, atualizado_em)
VALUES
('Nacional', 'Suites_Presidenciais', 'CJ_Affiliate_Luxo', 'https://www.anrdoezrs.net/click-101143576-15783291', 0, 350.00, NOW(), NOW()),
('Global', 'Luxury_Villas_5Star', 'CJ_Affiliate_Luxo', 'https://www.anrdoezrs.net/click-101143576-15982104', 0, 450.00, NOW(), NOW()),
('Nacional', 'Malas_Samsonite_TUMI', 'CJ_Affiliate_Luxo', 'https://www.jdoqocy.com/click-101143576-15894320', 0, 180.00, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Garantir Políticas RLS para Leitura Pública
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achadinhos_produtos_monetizados' AND policyname = 'Leitura publica produtos') THEN
        CREATE POLICY "Leitura publica produtos" ON public.achadinhos_produtos_monetizados FOR SELECT USING (true);
    END IF;
END $$;
