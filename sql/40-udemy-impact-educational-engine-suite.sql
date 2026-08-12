-- =============================================================================
-- AQUITEM ACHADINHOS — SUITE 40: MOTOR DE MONETIZAÇÃO EDUCACIONAL UDEMY & IMPACT RADIUS
-- Categoria: Infoprodutos_Udemy
-- Publisher ID Impact: 1101l435760
-- =============================================================================

-- 1. Inserir Categoria e Produtos de Cursos Udemy na tabela achadinhos_produtos_monetizados
INSERT INTO public.achadinhos_produtos_monetizados 
(nome_produto, slug, plataforma, categoria, link_afiliado_final, preco_de, preco_por, desconto_pct, imagem_url, cliques_total, ativo, criado_em, atualizado_em)
VALUES
(
  'Formação Completa Desenvolvedor Web & Fullstack 2026 com Certificado Oficial — Udemy Brasil',
  'cursos-capacitacao-profissional-udemy-certificado',
  'Udemy (Impact Radius)',
  'Infoprodutos_Udemy',
  'https://udemy.sjv.io/c/1101l435760/aquitem_cursos_fullstack',
  279.90,
  27.90,
  90,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Cupom de Desconto Ativo e Promoções Relâmpago para Cursos da Udemy Hoje — Todos os Cursos com 90% OFF',
  'cupom-desconto-promocoes-relampago-udemy',
  'Udemy (Impact Radius)',
  'Infoprodutos_Udemy',
  'https://udemy.sjv.io/c/1101l435760/aquitem_cupom_udemy_hoje',
  399.00,
  34.90,
  91,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Treinamentos e Cursos Técnicos Mais Vendidos com Vagas Abertas na Região — Certificado Válido',
  'treinamentos-cursos-tecnicos-mais-vendidos-udemy',
  'Udemy (Impact Radius)',
  'Infoprodutos_Udemy',
  'https://udemy.sjv.io/c/1101l435760/aquitem_cursos_tecnicos_vagas',
  349.90,
  29.90,
  91,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Formação Especialista em Inteligência Artificial, Python & Engenharia de Prompts 2026',
  'curso-inteligencia-artificial-python-prompts-udemy',
  'Udemy (Impact Radius)',
  'Infoprodutos_Udemy',
  'https://udemy.sjv.io/c/1101l435760/aquitem_ia_python_udemy',
  319.90,
  27.90,
  91,
  'https://www.aquitemachadinhos.com.br/assets/og-image.png',
  0,
  true,
  NOW(),
  NOW()
),
(
  'Curso Prático de Excel Avançado, Dashboards Interativos & Power BI para o Mercado de Trabalho',
  'curso-excel-avancado-powerbi-dashboards-udemy',
  'Udemy (Impact Radius)',
  'Infoprodutos_Udemy',
  'https://udemy.sjv.io/c/1101l435760/aquitem_excel_powerbi_udemy',
  249.90,
  24.90,
  90,
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
('Nacional', 'Nacional', 'Udemy', 'https://udemy.sjv.io/c/1101l435760/aquitem_cursos', 0, 15.00, NOW(), NOW()),
('Nacional', 'Cursos_Online', 'Impact_Radius', 'https://udemy.sjv.io/c/1101l435760/aquitem_cursos', 0, 15.00, NOW(), NOW()),
('Nacional', 'Capacitacao_Profissional', 'Udemy', 'https://udemy.sjv.io/c/1101l435760/aquitem_cursos_tecnicos', 0, 15.00, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Garantir Políticas RLS para Leitura Pública dos Cursos
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'achadinhos_produtos_monetizados' AND policyname = 'Leitura publica produtos') THEN
        CREATE POLICY "Leitura publica produtos" ON public.achadinhos_produtos_monetizados FOR SELECT USING (true);
    END IF;
END $$;
