-- ============================================================
-- NOVA CATEGORIA: Saúde e Bem-estar (profissionais de Barretos)
-- Dentistas, acupuntura, massagem, fisioterapia, psicólogos, etc.
-- Rode no SQL Editor do Supabase. Idempotente.
-- ============================================================

insert into public.categories (id, nome, emoji, slug, ordem) values
  ('saude', 'Saúde e Bem-estar', '🩺', 'saude', 13)
  on conflict (id) do nothing;

-- Como funciona:
-- A especialidade de cada profissional vai no campo "subcategoria"
-- quando ele se cadastra (ex.: subcategoria = "Dentista", "Acupuntura"...).
-- Sugestões de especialidades já aparecem sozinhas no formulário de cadastro.
