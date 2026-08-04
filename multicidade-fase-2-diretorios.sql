-- ============================================================
-- AQUITÉM — FASE 2: DIRETÓRIOS REAIS POR CIDADE
-- Execute depois de multicidade-fase-1.sql.
-- Preserva os dados existentes e classifica tudo que já existe como Barretos.
-- ============================================================

-- Empresas passam a pertencer a uma cidade real.
alter table public.stores add column if not exists city_slug text;
update public.stores set city_slug = 'barretos'
where city_slug is null or btrim(city_slug) = '';
alter table public.stores alter column city_slug set default 'barretos';
alter table public.stores alter column city_slug set not null;

-- A chave estrangeira evita cidade inválida, sem recriar caso já exista.
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'stores_city_slug_fkey') then
    alter table public.stores add constraint stores_city_slug_fkey
      foreign key (city_slug) references public.cities(slug);
  end if;
end $$;
create index if not exists stores_city_status_order_idx
  on public.stores (city_slug, status, destaque desc, criado_em desc);

-- Cadastro público só pode criar empresa pendente e em cidade ativa.
drop policy if exists "stores_insert_public" on public.stores;
create policy "stores_insert_public" on public.stores
  for insert to anon, authenticated
  with check (
    status = 'pendente'
    and city_slug in (select slug from public.cities where ativo = true)
  );

-- Motoristas também ficam preparados para cidades; não altera cadastros atuais.
do $$ begin
  if to_regclass('public.drivers') is not null then
    alter table public.drivers add column if not exists city_slug text;
    update public.drivers set city_slug = 'barretos'
      where city_slug is null or btrim(city_slug) = '';
    alter table public.drivers alter column city_slug set default 'barretos';
    alter table public.drivers alter column city_slug set not null;
    if not exists (select 1 from pg_constraint where conname = 'drivers_city_slug_fkey') then
      alter table public.drivers add constraint drivers_city_slug_fkey
        foreign key (city_slug) references public.cities(slug);
    end if;
    create index if not exists drivers_city_status_order_idx
      on public.drivers (city_slug, status, destaque desc, criado_em desc);
  end if;
end $$;

-- Conferências depois de executar:
-- select city_slug, count(*) from public.stores group by city_slug order by city_slug;
-- select city_slug, count(*) from public.drivers group by city_slug order by city_slug;
