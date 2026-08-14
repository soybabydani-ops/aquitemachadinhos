-- AQUITEM white-hat weather integration for the 64 editorial tenants.
-- Portal data stays isolated from all faculdade_* tables.
create table if not exists public.growth_city_weather_config (
  city_slug text primary key references public.cities(slug) on update cascade on delete restrict,
  city_name text not null,
  uf text not null check (char_length(uf) between 2 and 3),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  provider text not null default 'Open-Meteo' check (provider = 'Open-Meteo'),
  forecast_url text not null check (forecast_url = 'https://api.open-meteo.com/v1/forecast'),
  official_alerts_url text not null check (official_alerts_url ~ '^https://'),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.growth_city_weather_config enable row level security;
drop policy if exists growth_city_weather_public_read on public.growth_city_weather_config;
create policy growth_city_weather_public_read
  on public.growth_city_weather_config
  for select to anon, authenticated
  using (active = true);
grant select on public.growth_city_weather_config to anon, authenticated;

alter table public.growth_city_pages
  add column if not exists weather_enabled boolean not null default false;
alter table public.growth_city_pages
  add column if not exists weather_provider text;
update public.growth_city_pages
set weather_enabled = true,
    weather_provider = 'Open-Meteo',
    updated_at = now()
where topic = 'clima_energia' and active = true;

alter table public.growth_city_pages
  drop constraint if exists growth_city_pages_weather_provider_check;
alter table public.growth_city_pages
  add constraint growth_city_pages_weather_provider_check
  check (not weather_enabled or weather_provider = 'Open-Meteo');
