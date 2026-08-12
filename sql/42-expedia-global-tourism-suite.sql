-- =============================================================================
-- AQUITEM ACHADINHOS — SUITE 42: MOTOR DE TURISMO GLOBAL & EXPEDIA HIGH-TICKET
-- Categoria: Turismo_Global_High_Ticket
-- Partner Link: https://expedia.com/affiliate/Kfv4vlu
-- =============================================================================

-- 1. Inserir Categoria e Pacotes de Turismo Global High Ticket em achadinhos_produtos_monetizados
INSERT INTO public.achadinhos_produtos_monetizados 
(nome_produto, slug, plataforma, categoria, link_afiliado_final, preco_de, preco_por, desconto_pct, imagem_url, cliques_total, ativo, criado_em, atualizado_em)
VALUES
(
  'Pacotes de Cruzeiros Marítimos e Resorts All-Inclusive com Tudo Incluso — Expedia Global VIP',
  'pacotes-cruzeiros-maritimos-resorts-all-inclusive-expedia',
  'Expedia Global Partner',
  'Turismo_Global_High_Ticket',
  'https://expedia.com/affiliate/Kfv4vlu',
  4800.00,
  1440.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Bugs de Passagens Aéreas Internacionais em Classe Executiva e Premium — Expedia Flights',
  'bugs-passagens-aereas-internacionais-executiva-expedia',
  'Expedia Global Partner',
  'Turismo_Global_High_Ticket',
  'https://expedia.com/affiliate/Kfv4vlu',
  6500.00,
  1950.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Melhores Hotéis Boutique e Resorts de Alto Luxo no Brasil e no Mundo — Tarifas Secretas Expedia',
  'hoteis-boutique-resorts-luxo-tarifas-secretas-expedia',
  'Expedia Global Partner',
  'Turismo_Global_High_Ticket',
  'https://expedia.com/affiliate/Kfv4vlu',
  1200.00,
  360.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Last-Minute Premium Flight Deals & 5-Star Luxury Hotel Bookings — Expedia International',
  'last-minute-premium-flights-luxury-hotels-expedia',
  'Expedia Global Partner',
  'Turismo_Global_High_Ticket',
  'https://expedia.com/affiliate/Kfv4vlu',
  1500.00,
  450.00,
  70,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Secret Travel Coupons for Corporate, VIP & Business Flight Engines — Worldwide VIP Hub',
  'secret-travel-coupons-corporate-business-flights-expedia',
  'Expedia Global Partner',
  'Turismo_Global_High_Ticket',
  'https://expedia.com/affiliate/Kfv4vlu',
  2200.00,
  660.00,
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
('Nacional', 'Turismo_VIP', 'Expedia', 'https://expedia.com/affiliate/Kfv4vlu', 0, 120.00, NOW(), NOW()),
('Internacional', 'Pacotes_Cruzeiros', 'Expedia', 'https://expedia.com/affiliate/Kfv4vlu', 0, 250.00, NOW(), NOW()),
('Global', 'Hoteis_Luxo', 'Expedia', 'https://expedia.com/affiliate/Kfv4vlu', 0, 180.00, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Garantir Políticas RLS para Leitura Pública
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achadinhos_produtos_monetizados' AND policyname = 'Leitura publica produtos') THEN
        CREATE POLICY "Leitura publica produtos" ON public.achadinhos_produtos_monetizados FOR SELECT USING (true);
    END IF;
END $$;
