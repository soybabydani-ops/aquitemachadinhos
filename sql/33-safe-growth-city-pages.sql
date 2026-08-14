-- Safe city growth content registry and verification gates
create table if not exists public.growth_city_pages (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null references public.cities(slug) on update cascade on delete restrict,
  tenant_subdomain text not null,
  topic text not null check (topic in ('city_hub','home_office','concursos','clima_energia','economia_energia','moda_country','tecnologia_social')),
  page_year smallint not null default 2026,
  route text not null unique,
  canonical_url text not null unique,
  headline text not null,
  summary text not null,
  source_policy text not null default 'claims_require_official_source_and_verification_timestamp',
  content_fingerprint text not null,
  generator_version text not null,
  active boolean not null default true,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(city_slug, topic, page_year)
);

alter table public.growth_city_pages enable row level security;
drop policy if exists growth_city_pages_public_read on public.growth_city_pages;
create policy growth_city_pages_public_read on public.growth_city_pages for select to anon, authenticated using (active = true);
grant select on public.growth_city_pages to anon, authenticated;

alter table public.concursos_municipais_editais add column if not exists fonte_oficial_url text;
alter table public.concursos_municipais_editais add column if not exists verificado_em timestamptz;
update public.concursos_municipais_editais
set status_ativo=false
where status_ativo=true and (edital_url is null or edital_url ~* 'aquitemachadinhos\.com\.br');
update public.concursos_municipais_editais
set fonte_oficial_url=edital_url
where fonte_oficial_url is null and edital_url is not null and edital_url !~* 'aquitemachadinhos\.com\.br';

alter table public.alertas_meteorologicos_emergencia add column if not exists fonte_oficial_url text;
alter table public.alertas_meteorologicos_emergencia add column if not exists verificado_em timestamptz;
update public.alertas_meteorologicos_emergencia
set status_ativo=false
where status_ativo=true and (valido_ate is null or valido_ate <= now() or fonte_oficial_url is null or verificado_em is null);

do $$ begin
  if not exists (select 1 from pg_constraint where conname='concursos_active_requires_official_source') then
    alter table public.concursos_municipais_editais add constraint concursos_active_requires_official_source check (not status_ativo or (fonte_oficial_url ~ '^https://' and fonte_oficial_url !~* 'aquitemachadinhos\.com\.br' and verificado_em is not null)) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname='alertas_active_requires_fresh_official_source') then
    alter table public.alertas_meteorologicos_emergencia add constraint alertas_active_requires_fresh_official_source check (not status_ativo or (fonte_oficial_url ~ '^https://' and verificado_em is not null and valido_ate > verificado_em)) not valid;
  end if;
end $$;

alter table public.concursos_municipais_editais validate constraint concursos_active_requires_official_source;
alter table public.alertas_meteorologicos_emergencia validate constraint alertas_active_requires_fresh_official_source;
