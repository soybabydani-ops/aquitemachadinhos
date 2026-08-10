-- ============================================================
-- BÔNUS DE LANÇAMENTO — "destaque grátis aos primeiros" (REAL e automático)
-- Rode no SQL Editor do Supabase.
-- O que faz: quando você APROVA uma loja/motorista, o sistema
-- MARCA destaque=TRUE AUTOMATICAMENTE para os primeiros:
--   • Lojistas: os 20 primeiros aprovados ganham destaque grátis
--   • Motoristas: os 10 primeiros aprovados ganham destaque grátis
-- A partir do 21º lojista (ou 11º motorista), NÃO ganha mais.
-- Assim a promessa "os 20 primeiros ganham destaque grátis" é 100% verdadeira.
-- ============================================================

-- Lojistas: 20 primeiros
create or replace function public.grant_launch_destaque_stores() returns trigger as $$
declare n int;
begin
  if NEW.status = 'ativo' and coalesce(OLD.status, 'ativo') <> 'ativo' then
    select count(*) into n from public.stores where status = 'ativo' and id <> NEW.id;
    if n < 20 then
      NEW.destaque := true;
    end if;
  end if;
  return NEW;
end; $$ language plpgsql;

drop trigger if exists trg_launch_destaque_stores on public.stores;
create trigger trg_launch_destaque_stores before update on public.stores
  for each row execute function public.grant_launch_destaque_stores();

-- Motoristas: 10 primeiros
create or replace function public.grant_launch_destaque_drivers() returns trigger as $$
declare n int;
begin
  if NEW.status = 'ativo' and coalesce(OLD.status, 'ativo') <> 'ativo' then
    select count(*) into n from public.drivers where status = 'ativo' and id <> NEW.id;
    if n < 10 then
      NEW.destaque := true;
    end if;
  end if;
  return NEW;
end; $$ language plpgsql;

drop trigger if exists trg_launch_destaque_drivers on public.drivers;
create trigger trg_launch_destaque_drivers before update on public.drivers
  for each row execute function public.grant_launch_destaque_drivers();
