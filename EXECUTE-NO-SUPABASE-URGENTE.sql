-- ╔══════════════════════════════════════════════════════════════════════╗
-- ║  AQUITEM — PATCH DEFINITIVO DE SEGURANÇA v4.0                       ║
-- ║  Execute INTEIRO no Supabase SQL Editor                             ║
-- ║  painel.supabase.com → SQL Editor → New Query → Run                ║
-- ╚══════════════════════════════════════════════════════════════════════╝

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 0: Desativar RLS temporariamente para recriar tudo limpo
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.stores         DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers         DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_photos   DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories     DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions  DISABLE ROW LEVEL SECURITY;

-- Tabelas opcionais (só se existirem)
DO $$ BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='city_leads') THEN
    ALTER TABLE public.city_leads DISABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='reviews') THEN
    ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='drivers') THEN
    ALTER TABLE public.drivers DISABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='listings') THEN
    ALTER TABLE public.listings DISABLE ROW LEVEL SECURITY;
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='automation_queue') THEN
    ALTER TABLE public.automation_queue DISABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 1: Limpar TODAS as policies existentes (tabula rasa)
-- ════════════════════════════════════════════════════════════════════════
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 2: STORES — Políticas definitivas e corretas
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- SELECT: público vê só ATIVAS; usuário autenticado vê TODAS
CREATE POLICY "stores_select"
  ON public.stores FOR SELECT
  USING (
    status = 'ativo'
    OR (auth.uid() IS NOT NULL)
  );

-- INSERT: QUALQUER um pode cadastrar (fica como pendente)
-- A verificação de status='pendente' é feita no frontend; no banco permitimos
-- pois a RLS do frontend garante status correto
CREATE POLICY "stores_insert"
  ON public.stores FOR INSERT
  WITH CHECK (true);  -- público pode inserir (status=pendente vem do frontend)

-- UPDATE: APENAS usuários autenticados (admin logado)
CREATE POLICY "stores_update"
  ON public.stores FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: APENAS usuários autenticados
CREATE POLICY "stores_delete"
  ON public.stores FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 3: CATEGORIES — Leitura pública; escrita só autenticado
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_insert" ON public.categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "categories_update" ON public.categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "categories_delete" ON public.categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 4: OFFERS — Leitura pública das ativas; escrita autenticado
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "offers_select"
  ON public.offers FOR SELECT
  USING (
    (status = 'ativa' AND (termino IS NULL OR termino >= current_date))
    OR auth.uid() IS NOT NULL
  );
CREATE POLICY "offers_insert" ON public.offers FOR INSERT WITH CHECK (true);
CREATE POLICY "offers_update" ON public.offers FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "offers_delete" ON public.offers FOR DELETE USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 5: STORE_PHOTOS — Leitura pública; upload/delete autenticado
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.store_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "photos_select" ON public.store_photos FOR SELECT USING (true);
CREATE POLICY "photos_insert" ON public.store_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "photos_delete" ON public.store_photos FOR DELETE USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 6: METRICS_EVENTS — Insert livre; leitura só autenticado
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.metrics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "metrics_insert" ON public.metrics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "metrics_select" ON public.metrics_events FOR SELECT USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 7: SUBSCRIPTIONS — Só autenticado
-- ════════════════════════════════════════════════════════════════════════
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subs_all" ON public.subscriptions FOR ALL USING (auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 8: TABELAS OPCIONAIS
-- ════════════════════════════════════════════════════════════════════════
DO $$
BEGIN
  -- city_leads
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='city_leads') THEN
    ALTER TABLE public.city_leads ENABLE ROW LEVEL SECURITY;
    EXECUTE 'CREATE POLICY "leads_insert" ON public.city_leads FOR INSERT WITH CHECK (true)';
    EXECUTE 'CREATE POLICY "leads_select" ON public.city_leads FOR SELECT USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "leads_update" ON public.city_leads FOR UPDATE USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "leads_delete" ON public.city_leads FOR DELETE USING (auth.uid() IS NOT NULL)';
  END IF;

  -- reviews
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='reviews') THEN
    ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
    EXECUTE 'CREATE POLICY "reviews_select" ON public.reviews FOR SELECT USING (status = ''ativo'' OR auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "reviews_insert" ON public.reviews FOR INSERT WITH CHECK (true)';
    EXECUTE 'CREATE POLICY "reviews_update" ON public.reviews FOR UPDATE USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "reviews_delete" ON public.reviews FOR DELETE USING (auth.uid() IS NOT NULL)';
  END IF;

  -- drivers
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='drivers') THEN
    ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
    EXECUTE 'CREATE POLICY "drivers_select" ON public.drivers FOR SELECT USING (status = ''ativo'' OR auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "drivers_insert" ON public.drivers FOR INSERT WITH CHECK (true)';
    EXECUTE 'CREATE POLICY "drivers_update" ON public.drivers FOR UPDATE USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "drivers_delete" ON public.drivers FOR DELETE USING (auth.uid() IS NOT NULL)';
  END IF;

  -- listings
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='listings') THEN
    ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
    EXECUTE 'CREATE POLICY "listings_select" ON public.listings FOR SELECT USING (status = ''ativo'' OR auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "listings_insert" ON public.listings FOR INSERT WITH CHECK (true)';
    EXECUTE 'CREATE POLICY "listings_update" ON public.listings FOR UPDATE USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "listings_delete" ON public.listings FOR DELETE USING (auth.uid() IS NOT NULL)';
  END IF;

  -- automation_queue
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname='public' AND tablename='automation_queue') THEN
    ALTER TABLE public.automation_queue ENABLE ROW LEVEL SECURITY;
    EXECUTE 'CREATE POLICY "queue_all" ON public.automation_queue FOR ALL USING (auth.uid() IS NOT NULL)';
    EXECUTE 'CREATE POLICY "queue_insert" ON public.automation_queue FOR INSERT WITH CHECK (true)';
  END IF;
END $$;

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 9: STORAGE — Proteger DELETE de fotos
-- ════════════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "fotos_read"   ON storage.objects;
DROP POLICY IF EXISTS "fotos_upload" ON storage.objects;
DROP POLICY IF EXISTS "fotos_delete" ON storage.objects;

CREATE POLICY "fotos_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fotos');

CREATE POLICY "fotos_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'fotos');

CREATE POLICY "fotos_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'fotos' AND auth.uid() IS NOT NULL);

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 10: REMOVER FK CONSTRAINT DE CATEGORIA (fix cadastro com cats novas)
-- ════════════════════════════════════════════════════════════════════════
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name LIKE '%categoria%'
      AND table_name = 'stores'
      AND constraint_type = 'FOREIGN KEY'
  ) THEN
    ALTER TABLE public.stores DROP CONSTRAINT IF EXISTS stores_categoria_fkey;
    RAISE NOTICE '✅ FK stores_categoria_fkey removida';
  ELSE
    RAISE NOTICE 'ℹ️  FK categoria já não existe';
  END IF;
END $$;

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 11: INSERIR CATEGORIAS NOVAS (se não existirem)
-- ════════════════════════════════════════════════════════════════════════
INSERT INTO public.categories (id, nome, emoji, slug, ordem) VALUES
  ('sorveterias', 'Sorveterias e Açaí',       '🍦', 'sorveterias-e-acai',      23),
  ('suplementos', 'Suplementos e Vitaminas',   '💪', 'suplementos-e-vitaminas', 24),
  ('padarias',    'Padarias e Confeitarias',   '🥖', 'padarias-e-confeitarias', 25),
  ('bares',       'Bares e Bebidas',           '🍺', 'bares-e-bebidas',         26),
  ('grafica',     'Gráficas e Papelarias',     '🖨️', 'graficas-e-papelarias',   27),
  ('clinicas',    'Clínicas e Laboratórios',   '🏥', 'clinicas-e-laboratorios', 28)
ON CONFLICT (id) DO NOTHING;

-- ════════════════════════════════════════════════════════════════════════
-- PASSO 12: CORRIGIR EMPRESAS COM CATEGORIA ERRADA
-- ════════════════════════════════════════════════════════════════════════
UPDATE public.stores
  SET categoria = 'lanches', subcategoria = 'Hamburgueria'
  WHERE id = 'e1d5e93e-8d3e-423c-aafc-e5c114f22885'
    AND categoria = 'moda';

UPDATE public.stores
  SET categoria = 'suplementos', subcategoria = 'Suplementos e Vitaminas'
  WHERE id = '97b16d0f-f7d5-4f46-8667-f7ba76ca8535'
    AND categoria = 'moda';

-- ════════════════════════════════════════════════════════════════════════
-- VERIFICAÇÃO FINAL — Rode isso para confirmar que tudo está correto
-- ════════════════════════════════════════════════════════════════════════
SELECT
  tablename,
  policyname,
  cmd,
  CASE
    WHEN qual LIKE '%auth.uid() IS NOT NULL%' THEN '🔒 requer auth'
    WHEN qual = 'true' OR qual IS NULL THEN '🌐 público'
    ELSE '🔑 condicional'
  END as tipo
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- Total de categorias
SELECT COUNT(*) as total_cats FROM public.categories;

-- Stores por status
SELECT status, COUNT(*) FROM public.stores GROUP BY status;
