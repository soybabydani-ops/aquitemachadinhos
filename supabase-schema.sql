-- ============================================================
-- AQUI TEM ACHADINHOS — Banco de dados (Supabase / PostgreSQL)
-- Rode isto no SQL Editor do Supabase (painel.supabase.com)
-- ============================================================

-- Extensões
create extension if not exists "pgcrypto";
create extension if not exists "unaccent";

-- ---------- CATEGORIAS ----------
create table if not exists public.categories (
  id text primary key,
  nome text not null,
  emoji text,
  slug text unique,
  ordem int default 0
);

-- ---------- EMPRESAS / LOJAS ----------
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  nome text not null,
  categoria text references public.categories(id),
  subcategoria text,
  responsavel text,
  whatsapp text,
  telefone text,
  cidade text default 'Barretos',
  bairro text,
  endereco text,
  instagram text,
  site text,
  logo_url text,
  capa_url text,
  descricao_curta text,
  descricao text,
  horario text,
  pagamento text,
  entrega boolean default false,
  retirada boolean default false,
  estacionamento boolean default false,
  acessibilidade text,
  faixa_preco text,
  turista boolean default false,
  verificada boolean default false,
  destaque boolean default false,
  plano text default 'gratis',
  status text default 'pendente',        -- pendente | ativo | rejeitado | suspenso
  aceite_termos boolean default false,
  autorizacao_contato boolean default false,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- ---------- GALERIA DE FOTOS ----------
create table if not exists public.store_photos (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  url text not null,
  criado_em timestamptz default now()
);

-- ---------- OFERTAS ----------
create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  titulo text not null,
  descricao text,
  categoria text,
  imagem_url text,
  preco_atual text,
  preco_anterior text,
  inicio date,
  termino date,                          -- validade (ofertas vencidas somem sozinhas)
  condicoes text,
  whatsapp_contato text,
  status text default 'rascunho',        -- rascunho | aguardando | ativa | expirada | rejeitada | arquivada
  criado_em timestamptz default now()
);

-- ---------- ASSINATURAS / PLANOS ----------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  plano text not null,                   -- gratis | destaque | pro
  status text default 'ativa',
  gateway text,
  inicio date default current_date,
  renovacao date,
  criado_em timestamptz default now()
);

-- ---------- MÉTRICAS (somente reais) ----------
create table if not exists public.metrics_events (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  tipo text not null,                    -- view | click_whatsapp | click_mapa | click_telefone | cadastro_iniciado | cadastro_concluido
  criado_em timestamptz default now()
);

-- ---------- AUDITORIA ----------
create table if not exists public.audit_log (
  id bigserial primary key,
  acao text,
  detalhe text,
  ator text,
  criado_em timestamptz default now()
);

-- ============================================================
-- FUNÇÕES / GATILHOS
-- ============================================================
create or replace function public.slugify(v text) returns text as $$
  select lower(regexp_replace(unaccent(coalesce(v,'')), '[^a-z0-9]+', '-', 'gi'));
$$ language sql immutable;

create or replace function public.set_store_slug() returns trigger as $$
begin
  if new.slug is null and new.nome is not null then
    new.slug := public.slugify(new.nome) || '-' || substr(new.id::text,1,4);
  end if;
  return new;
end; $$ language plpgsql;
drop trigger if exists trg_store_slug on public.stores;
create trigger trg_store_slug before insert on public.stores
  for each row execute function public.set_store_slug();

create or replace function public.touch_updated() returns trigger as $$
begin new.atualizado_em = now(); return new; end; $$ language plpgsql;
drop trigger if exists trg_stores_touch on public.stores;
create trigger trg_stores_touch before update on public.stores
  for each row execute function public.touch_updated();

-- ============================================================
-- SEGURANÇA (RLS) — quem vê/edita o quê
-- ============================================================
alter table public.categories     enable row level security;
alter table public.stores         enable row level security;
alter table public.store_photos   enable row level security;
alter table public.offers         enable row level security;
alter table public.subscriptions  enable row level security;
alter table public.metrics_events enable row level security;

-- Categorias: leitura pública
create policy "cat_read" on public.categories for select using (true);

-- Empresas: o público SÓ vê as ATIVAS; cadastro público fica PENDENTE (moderação)
create policy "stores_read_public" on public.stores
  for select using (status = 'ativo');
create policy "stores_insert_public" on public.stores
  for insert with check (status = 'pendente');   -- força moderação no banco
-- (update/delete só com login de admin — painel autenticado)

-- Fotos: leitura pública; upload permitido (vinculado à loja)
create policy "photos_read"  on public.store_photos for select using (true);
create policy "photos_insert" on public.store_photos for insert with check (true);

-- Ofertas: o público SÓ vê ATIVAS e NÃO vencidas
create policy "offers_read_public" on public.offers
  for select using (status = 'ativa' and (termino is null or termino >= current_date));
create policy "offers_insert" on public.offers
  for insert with check (status in ('rascunho','aguardando'));  -- lojista não auto-aprova

-- Métricas: contagem anônima real (insert liberado, sem leitura pública)
create policy "metrics_insert" on public.metrics_events for insert with check (true);

-- ============================================================
-- CATEGORIAS INICIAIS (Barretos)
-- ============================================================
insert into public.categories (id,nome,emoji,slug,ordem) values
 ('restaurantes','Restaurantes','🍔','restaurantes',1),
 ('lanches','Lanches','🍟','lanches',2),
 ('farmacias','Farmácias','💊','farmacias',3),
 ('mercados','Mercados','🛒','mercados',4),
 ('moda','Moda','👗','moda',5),
 ('beleza','Beleza','💅','beleza',6),
 ('eletronicos','Eletrônicos','📱','eletronicos',7),
 ('petshops','Pet Shops','🐾','pet-shops',8),
 ('hoteis','Hotéis e Pousadas','🏨','hoteis-e-pousadas',9),
 ('moveis','Móveis','🛋️','moveis',10),
 ('automotivo','Automotivo','🚗','automotivo',11),
 ('servicos','Serviços','🔧','servicos',12)
 on conflict (id) do nothing;

-- ============================================================
-- ARMAZENAMENTO DE FOTOS (bucket público "fotos")
-- ============================================================
insert into storage.buckets (id, name, public) values ('fotos','fotos', true)
  on conflict (id) do nothing;
create policy "fotos_read"   on storage.objects for select using (bucket_id = 'fotos');
create policy "fotos_upload" on storage.objects for insert with check (bucket_id = 'fotos');

-- ============================================================
-- PRONTO. Próximo passo: copiar a URL e a anon key (Project Settings > API)
-- e colar em ata-v2/assets/app.js -> CONFIG.supabase
-- ============================================================
