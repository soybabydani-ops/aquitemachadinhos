-- ╔══════════════════════════════════════════════════════════════╗
-- ║  AQUITEM — Novas Categorias para Barretos                    ║
-- ║  Execute este SQL no Supabase SQL Editor                     ║
-- ╚══════════════════════════════════════════════════════════════╝

-- Desativar RLS temporariamente para inserção admin
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

INSERT INTO categories (id, nome, emoji, slug, ordem) VALUES
  ('sorveterias', 'Sorveterias e Açaí',       '🍦', 'sorveterias-e-acai',      23),
  ('suplementos', 'Suplementos e Vitaminas',   '💪', 'suplementos-e-vitaminas', 24),
  ('padarias',    'Padarias e Confeitarias',   '🥖', 'padarias-e-confeitarias', 25),
  ('bares',       'Bares e Bebidas',           '🍺', 'bares-e-bebidas',         26),
  ('grafica',     'Gráficas e Papelarias',     '🖨️', 'graficas-e-papelarias',   27),
  ('clinicas',    'Clínicas e Laboratórios',   '🏥', 'clinicas-e-laboratorios', 28)
ON CONFLICT (id) DO NOTHING;

-- Reativar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Corrigir categorias das empresas cadastradas errado
UPDATE stores SET categoria = 'lanches',    subcategoria = 'Hamburgueria'           WHERE id = 'e1d5e93e-8d3e-423c-aafc-e5c114f22885';
UPDATE stores SET categoria = 'suplementos', subcategoria = 'Suplementos e Vitaminas' WHERE id = '97b16d0f-f7d5-4f46-8667-f7ba76ca8535';

-- Verificar resultado
SELECT id, nome, categoria, subcategoria FROM stores ORDER BY criado_em DESC LIMIT 5;
SELECT id, nome FROM categories ORDER BY ordem;
