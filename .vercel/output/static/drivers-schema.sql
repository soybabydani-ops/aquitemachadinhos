-- ============================================================
-- MOTORISTAS / CORRIDAS — diretório (conecta passageiro e motorista via WhatsApp)
-- Rode no SQL Editor do Supabase.
-- - Motorista se cadastra (grátis), fica PENDENTE até o admin aprovar.
-- - Público vê só motoristas ATIVOS.
-- - Avaliações (motorista) com moderação + agregado automático.
-- ============================================================

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text,
  telefone text,
  tipo_veiculo text,          -- Carro / Moto / Van / Outro
  placa text,
  lotacao text,               -- nº de passageiros
  area text,                  -- onde atende
  disponibilidade text,       -- 24h / Somente à noite / Diurno / Plantão
  disponivel_agora boolean default false,
  descricao text,
  foto_url text,
  cidade text default 'Barretos',
  bairro text,
  verificada boolean default false,
  destaque boolean default false,
  plano text default 'gratis',
  status text default 'pendente',   -- pendente | ativo | rejeitado | suspenso
  aceite_termos boolean default false,
  rating_avg numeric(3,1) default 0,
  rating_count integer default 0,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);
alter table public.drivers enable row level security;
create policy "drivers_read_public"   on public.drivers for select using (status = 'ativo');
create policy "drivers_insert_public" on public.drivers for insert with check (status = 'pendente');
create policy "drivers_read_auth"     on public.drivers for select to authenticated using (true);
create policy "drivers_update_auth"   on public.drivers for update to authenticated using (true) with check (true);
create policy "drivers_delete_auth"   on public.drivers for delete to authenticated using (true);

-- avaliações de motoristas (mesmo modelo das lojas)
create table if not exists public.driver_reviews (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references public.drivers(id) on delete cascade,
  nome text,
  nota smallint not null check (nota between 1 and 5),
  comentario text,
  status text default 'pendente',
  criado_em timestamptz default now()
);
alter table public.driver_reviews enable row level security;
create policy "drev_read_public"   on public.driver_reviews for select using (status = 'ativo');
create policy "drev_insert_public" on public.driver_reviews for insert with check (status = 'pendente' and nota between 1 and 5);
create policy "drev_read_auth"     on public.driver_reviews for select to authenticated using (true);
create policy "drev_update_auth"   on public.driver_reviews for update to authenticated using (true) with check (true);
create policy "drev_delete_auth"   on public.driver_reviews for delete to authenticated using (true);

-- agregado de nota + gatilho automático
create or replace function public.recalc_driver_rating(did uuid) returns void as $$
begin
  update public.drivers d set
    rating_avg   = coalesce((select round(avg(nota)::numeric,1) from public.driver_reviews where driver_id = did and status = 'ativo'), 0),
    rating_count = coalesce((select count(*) from public.driver_reviews where driver_id = did and status = 'ativo'), 0)
  where d.id = did;
end; $$ language plpgsql;
create or replace function public.tg_recalc_driver_rating() returns trigger as $$
begin perform public.recalc_driver_rating(coalesce(new.driver_id, old.driver_id)); return null; end; $$ language plpgsql;
drop trigger if exists trg_drev_recalc on public.driver_reviews;
create trigger trg_drev_recalc after insert or update or delete on public.driver_reviews
  for each row execute function public.tg_recalc_driver_rating();
