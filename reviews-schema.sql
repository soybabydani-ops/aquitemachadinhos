-- ============================================================
-- AVALIAÇÕES (reviews) + TERMÔMETRO DE RECOMENDAÇÃO
-- Rode no SQL Editor do Supabase.
-- - Qualquer visitante pode avaliar (nota 1–5 + comentário).
-- - Fica PENDENTE até o admin aprovar (zero avaliações falsas).
-- - Agregado (média + total) recalculado AUTOMATICAMENTE na loja.
-- ============================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  nome text,
  nota smallint not null check (nota between 1 and 5),
  comentario text,
  status text default 'pendente',          -- pendente | ativo | rejeitado
  criado_em timestamptz default now()
);
alter table public.reviews enable row level security;

-- público vê só avaliações ATIVAS
create policy "reviews_read_public" on public.reviews for select using (status = 'ativo');
-- qualquer pessoa pode avaliar (sempre entra como pendente)
create policy "reviews_insert_public" on public.reviews
  for insert with check (status = 'pendente' and nota between 1 and 5);
-- admin (autenticado) gerencia tudo
create policy "reviews_read_auth"   on public.reviews for select to authenticated using (true);
create policy "reviews_update_auth" on public.reviews for update to authenticated using (true) with check (true);
create policy "reviews_delete_auth" on public.reviews for delete to authenticated using (true);

-- agregado denormalizado nas empresas (performance nos cards/listas)
alter table public.stores add column if not exists rating_avg numeric(3,1) default 0;
alter table public.stores add column if not exists rating_count integer default 0;

-- recalcula média/total da loja a partir das avaliações ATIVAS
create or replace function public.recalc_store_rating(sid uuid) returns void as $$
begin
  update public.stores s set
    rating_avg   = coalesce((select round(avg(nota)::numeric,1) from public.reviews where store_id = sid and status = 'ativo'), 0),
    rating_count = coalesce((select count(*) from public.reviews where store_id = sid and status = 'ativo'), 0)
  where s.id = sid;
end; $$ language plpgsql;

-- gatilho: sempre que uma avaliação muda, recalcula a loja
create or replace function public.tg_recalc_rating() returns trigger as $$
begin
  perform public.recalc_store_rating(coalesce(new.store_id, old.store_id));
  return null;
end; $$ language plpgsql;
drop trigger if exists trg_reviews_recalc on public.reviews;
create trigger trg_reviews_recalc after insert or update or delete on public.reviews
  for each row execute function public.tg_recalc_rating();
