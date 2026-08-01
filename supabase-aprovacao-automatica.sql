-- ============================================================
-- APROVAÇÃO AUTOMÁTICA (híbrido) — Aqui Tem Achadinhos
-- LOJAS e AVALIAÇÕES publicam SOZINHAS (sem você aprovar).
-- IMÓVEIS, EMPREGOS e MOTORISTAS continuam com moderação (mais seguro).
-- Idempotente. Rode no SQL Editor do Supabase.
-- ============================================================

-- Lojas: permitem inserção pública já como ATIVO (publica sozinho)
drop policy if exists "stores_insert_public" on public.stores;
create policy "stores_insert_public" on public.stores
  for insert with check (status in ('pendente', 'ativo'));

-- Avaliações de lojas: publicam sozinhas (nota 1-5)
drop policy if exists "reviews_insert_public" on public.reviews;
create policy "reviews_insert_public" on public.reviews
  for insert with check (status in ('pendente', 'ativo') and nota between 1 and 5);

-- Avaliações de motoristas: publicam sozinhas (nota 1-5)
drop policy if exists "drev_insert_public" on public.driver_reviews;
create policy "drev_insert_public" on public.driver_reviews
  for insert with check (status in ('pendente', 'ativo') and nota between 1 and 5);

-- ============================================================
-- MANTIDO com moderação (NÃO mudou):
--   • listings (imóveis/empregos/classificados) → continua pendente
--   • drivers (motoristas) → continua pendente
--   • offers → o lojista ativa sozinho no painel (já era assim)
--
-- Como reverter (se quiser voltar a aprovar tudo):
--   basta eu mudar o app.js de volta (o SQL já aceita os dois status).
-- ============================================================
