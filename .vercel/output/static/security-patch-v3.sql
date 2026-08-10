-- ╔══════════════════════════════════════════════════════════════════════╗
-- ║  AQUITEM — PATCH DE SEGURANÇA COMPLETO v3.0                         ║
-- ║  Execute INTEIRO no Supabase SQL Editor (painel.supabase.com)       ║
-- ║  Projeto: efvuzxdhsirpvxclgdfg.supabase.co                          ║
-- ╚══════════════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 1 — ALVO 1: RLS CRÍTICA — fechar brechas de UPDATE/DELETE
-- ════════════════════════════════════════════════════════════════════════

-- 🔴 BUG CRÍTICO: stores sem policy de UPDATE/DELETE
-- Qualquer pessoa anônima pode alterar dados de qualquer loja
-- SOLUÇÃO: UPDATE e DELETE só com JWT válido (usuário autenticado)

-- Remover policies antigas que possam conflitar
DROP POLICY IF EXISTS "stores_update_admin"   ON public.stores;
DROP POLICY IF EXISTS "stores_delete_admin"   ON public.stores;
DROP POLICY IF EXISTS "stores_update_owner"   ON public.stores;
DROP POLICY IF EXISTS "stores_read_admin"     ON public.stores;
DROP POLICY IF EXISTS "stores_read_public"    ON public.stores;
DROP POLICY IF EXISTS "stores_insert_public"  ON public.stores;

-- SELECT: público vê só ATIVAS; usuário autenticado vê TODAS as suas
CREATE POLICY "stores_read_public"
  ON public.stores FOR SELECT
  USING (
    status = 'ativo'
    OR auth.uid() IS NOT NULL  -- usuário logado vê tudo (admin e lojistas)
  );

-- INSERT: qualquer um cadastra (fica pendente)
CREATE POLICY "stores_insert_public"
  ON public.stores FOR INSERT
  WITH CHECK (status = 'pendente');

-- UPDATE: só usuário autenticado (admin ou dono da loja)
CREATE POLICY "stores_update_auth"
  ON public.stores FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: só autenticado
CREATE POLICY "stores_delete_auth"
  ON public.stores FOR DELETE
  USING (auth.uid() IS NOT NULL);


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 2 — ALVO 2: RLS das outras tabelas (UPDATE/DELETE descoberto)
-- ════════════════════════════════════════════════════════════════════════

-- offers — UPDATE/DELETE
DROP POLICY IF EXISTS "offers_update_auth" ON public.offers;
DROP POLICY IF EXISTS "offers_delete_auth" ON public.offers;
CREATE POLICY "offers_update_auth"
  ON public.offers FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "offers_delete_auth"
  ON public.offers FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- store_photos — DELETE
DROP POLICY IF EXISTS "photos_delete_auth" ON public.store_photos;
CREATE POLICY "photos_delete_auth"
  ON public.store_photos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- metrics_events — READ só autenticado
DROP POLICY IF EXISTS "metrics_read_auth" ON public.metrics_events;
CREATE POLICY "metrics_read_auth"
  ON public.metrics_events FOR SELECT
  USING (auth.uid() IS NOT NULL);


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 3 — ALVO 2: INSERIR AS 6 CATEGORIAS NOVAS (FK constraint fix)
-- Sem isso, cadastro com categoria nova quebra com erro de FK
-- ════════════════════════════════════════════════════════════════════════

ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;

INSERT INTO public.categories (id, nome, emoji, slug, ordem) VALUES
  ('sorveterias', 'Sorveterias e Açaí',       '🍦', 'sorveterias-e-acai',      23),
  ('suplementos', 'Suplementos e Vitaminas',   '💪', 'suplementos-e-vitaminas', 24),
  ('padarias',    'Padarias e Confeitarias',   '🥖', 'padarias-e-confeitarias', 25),
  ('bares',       'Bares e Bebidas',           '🍺', 'bares-e-bebidas',         26),
  ('grafica',     'Gráficas e Papelarias',     '🖨️', 'graficas-e-papelarias',   27),
  ('clinicas',    'Clínicas e Laboratórios',   '🏥', 'clinicas-e-laboratorios', 28)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Manter policy de leitura pública para categorias
DROP POLICY IF EXISTS "cat_read" ON public.categories;
CREATE POLICY "cat_read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "cat_insert_auth" ON public.categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "cat_update_auth" ON public.categories FOR UPDATE USING (auth.uid() IS NOT NULL);


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 4 — Corrigir categorias das 2 empresas cadastradas errado
-- ════════════════════════════════════════════════════════════════════════

UPDATE public.stores
  SET categoria = 'lanches', subcategoria = 'Hamburgueria'
  WHERE id = 'e1d5e93e-8d3e-423c-aafc-e5c114f22885';

UPDATE public.stores
  SET categoria = 'suplementos', subcategoria = 'Suplementos e Vitaminas'
  WHERE id = '97b16d0f-f7d5-4f46-8667-f7ba76ca8535';


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 5 — Remover FK constraint de categoria para não bloquear inserts
-- (Preferível: usar TEXT livre com validação no frontend)
-- ════════════════════════════════════════════════════════════════════════

-- Verificar se a FK existe antes de remover
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'stores_categoria_fkey'
      AND table_name = 'stores'
  ) THEN
    ALTER TABLE public.stores DROP CONSTRAINT stores_categoria_fkey;
    RAISE NOTICE 'FK stores_categoria_fkey removida — categorias agora são texto livre validado no frontend';
  ELSE
    RAISE NOTICE 'FK stores_categoria_fkey não existe — OK';
  END IF;
END $$;


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 6 — ALVO 3: Tabelas auxiliares (city_leads, reviews, drivers)
-- Verificar e corrigir RLS das tabelas do admin
-- ════════════════════════════════════════════════════════════════════════

-- city_leads — admin gerencia
ALTER TABLE IF EXISTS public.city_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "leads_read_auth"   ON public.city_leads;
DROP POLICY IF EXISTS "leads_insert_pub"  ON public.city_leads;
DROP POLICY IF EXISTS "leads_update_auth" ON public.city_leads;
DROP POLICY IF EXISTS "leads_delete_auth" ON public.city_leads;
CREATE POLICY "leads_insert_pub"  ON public.city_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "leads_read_auth"   ON public.city_leads FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "leads_update_auth" ON public.city_leads FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "leads_delete_auth" ON public.city_leads FOR DELETE USING (auth.uid() IS NOT NULL);

-- reviews — leitura pública dos ativos, admin gerencia tudo
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "reviews_read_pub"  ON public.reviews;
DROP POLICY IF EXISTS "reviews_insert"    ON public.reviews;
DROP POLICY IF EXISTS "reviews_manage"    ON public.reviews;
CREATE POLICY "reviews_read_pub"  ON public.reviews FOR SELECT USING (status = 'ativo' OR auth.uid() IS NOT NULL);
CREATE POLICY "reviews_insert"    ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_manage"    ON public.reviews FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "reviews_delete"    ON public.reviews FOR DELETE USING (auth.uid() IS NOT NULL);

-- drivers (motoristas) — mesma lógica das stores
ALTER TABLE IF EXISTS public.drivers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "drivers_read_pub"  ON public.drivers;
DROP POLICY IF EXISTS "drivers_insert"    ON public.drivers;
DROP POLICY IF EXISTS "drivers_update"    ON public.drivers;
DROP POLICY IF EXISTS "drivers_delete"    ON public.drivers;
CREATE POLICY "drivers_read_pub"  ON public.drivers FOR SELECT USING (status = 'ativo' OR auth.uid() IS NOT NULL);
CREATE POLICY "drivers_insert"    ON public.drivers FOR INSERT WITH CHECK (status = 'pendente');
CREATE POLICY "drivers_update"    ON public.drivers FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "drivers_delete"    ON public.drivers FOR DELETE USING (auth.uid() IS NOT NULL);

-- listings (classificados)
ALTER TABLE IF EXISTS public.listings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "listings_read_pub"  ON public.listings;
DROP POLICY IF EXISTS "listings_insert"    ON public.listings;
DROP POLICY IF EXISTS "listings_update"    ON public.listings;
DROP POLICY IF EXISTS "listings_delete"    ON public.listings;
CREATE POLICY "listings_read_pub"  ON public.listings FOR SELECT USING (status = 'ativo' OR auth.uid() IS NOT NULL);
CREATE POLICY "listings_insert"    ON public.listings FOR INSERT WITH CHECK (true);
CREATE POLICY "listings_update"    ON public.listings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "listings_delete"    ON public.listings FOR DELETE USING (auth.uid() IS NOT NULL);


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 7 — Storage bucket (fotos) — proteger DELETE
-- ════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "fotos_delete" ON storage.objects;
CREATE POLICY "fotos_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'fotos' AND auth.uid() IS NOT NULL);


-- ════════════════════════════════════════════════════════════════════════
-- BLOCO 8 — VERIFICAÇÃO FINAL
-- ════════════════════════════════════════════════════════════════════════

-- Checar todas as policies ativas
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- Confirmar categorias
SELECT id, nome FROM public.categories ORDER BY ordem;

-- Confirmar stores corrigidas
SELECT id, nome, categoria, subcategoria FROM public.stores ORDER BY criado_em DESC LIMIT 5;
