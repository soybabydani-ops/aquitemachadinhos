-- ============================================================
-- AQUITÉM — FUNDAÇÃO MULTICIDADE (FASE 1)
-- Execute no SQL Editor do Supabase UMA VEZ.
-- Cria as cidades e a caixa de entrada segura de leads por cidade.
-- Não remove nem altera os cadastros atuais de Barretos.
-- ============================================================

create table if not exists public.cities (
  slug text primary key,
  nome text not null,
  uf text not null,
  subdomain text unique not null,
  ativo boolean not null default true,
  ordem smallint not null default 0,
  criado_em timestamptz not null default now()
);

insert into public.cities (slug, nome, uf, subdomain, ordem) values
  ('barretos','Barretos','SP','www',1),
  ('gramado','Gramado','RS','gramado',2),
  ('blumenau','Blumenau','SC','blumenau',3),
  ('bonito','Bonito','MS','bonito',4),
  ('buzios','Búzios','RJ','buzios',5),
  ('campos','Campos do Jordão','SP','campos',6),
  ('caruaru','Caruaru','PE','caruaru',7),
  ('florianopolis','Florianópolis','SC','florianopolis',8),
  ('jericoacoara','Jericoacoara','CE','jericoacoara',9),
  ('porto','Porto de Galinhas','PE','porto',10),
  ('salvador','Salvador','BA','salvador',11)
on conflict (slug) do update set
  nome = excluded.nome, uf = excluded.uf, subdomain = excluded.subdomain,
  ordem = excluded.ordem;

create table if not exists public.city_leads (
  id uuid primary key default gen_random_uuid(),
  city_slug text not null references public.cities(slug),
  empresa_nome text not null check (char_length(empresa_nome) between 2 and 160),
  responsavel text,
  whatsapp text not null check (char_length(whatsapp) between 8 and 30),
  email text,
  categoria text,
  mensagem text,
  origem text not null default 'site',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'novo' check (status in ('novo','contatado','qualificado','cadastro_enviado','ativo','perdido')),
  aceite_contato boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists city_leads_city_status_created_idx
  on public.city_leads (city_slug, status, criado_em desc);

alter table public.cities enable row level security;
alter table public.city_leads enable row level security;

-- Leitura pública apenas da lista de cidades ativas.
drop policy if exists "cities_read_public" on public.cities;
create policy "cities_read_public" on public.cities
  for select using (ativo = true);

-- Formulário público: somente cria lead novo; não lê nem altera dados.
drop policy if exists "city_leads_insert_public" on public.city_leads;
create policy "city_leads_insert_public" on public.city_leads
  for insert to anon, authenticated
  with check (status = 'novo' and city_slug in (select slug from public.cities where ativo = true));

-- Estas duas policies dependem da função public.is_admin() da correção de segurança já aplicada.
drop policy if exists "city_leads_read_admin" on public.city_leads;
create policy "city_leads_read_admin" on public.city_leads
  for select to authenticated using (public.is_admin());

drop policy if exists "city_leads_update_admin" on public.city_leads;
create policy "city_leads_update_admin" on public.city_leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_city_leads_updated()
returns trigger language plpgsql as $$
begin new.atualizado_em = now(); return new; end; $$;

drop trigger if exists trg_city_leads_touch on public.city_leads;
create trigger trg_city_leads_touch before update on public.city_leads
for each row execute function public.touch_city_leads_updated();

-- Verificação após executar:
-- select slug, nome, uf from public.cities order by ordem;
-- select city_slug, status, count(*) from public.city_leads group by 1,2 order by 1,2;
