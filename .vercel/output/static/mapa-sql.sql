-- ============================================================
-- MAPA INTERATIVO — adicionar coordenadas (lat/lng) às empresas
-- Rode no SQL Editor do Supabase.
-- ============================================================
alter table public.stores add column if not exists lat double precision;
alter table public.stores add column if not exists lng double precision;
-- lat/lng herdam as políticas RLS já existentes da tabela stores:
--  - público vê só empresas ativas
--  - admin (autenticado) edita (inclusive define a localização no painel)
-- ============================================================
