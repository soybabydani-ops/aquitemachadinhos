-- ============================================================
-- AVALIAÇÕES ULTRA — Aqui Tem Achadinhos
-- Identidade rica do avaliador (perfil), título do comentário,
-- e contador de "foi útil". Idempotente.
-- ============================================================

-- Lojas
alter table public.reviews add column if not exists perfil text;        -- cliente | morador | turista | ex-funcionario
alter table public.reviews add column if not exists titulo text;        -- titulo/headline opcional
alter table public.reviews add column if not exists helpful integer default 0;  -- votos "foi util"

-- Motoristas
alter table public.driver_reviews add column if not exists perfil text;
alter table public.driver_reviews add column if not exists titulo text;
alter table public.driver_reviews add column if not exists helpful integer default 0;

-- ============================================================
-- RPC: incrementar "foi util" (voto publico anonimo, seguro)
-- Permite que qualquer visitante vote "util" sem expor UPDATE direto.
-- ============================================================
create or replace function public.review_helpful(p_id uuid, p_table text)
returns void
language plpgsql
security definer
as $$
begin
  if p_table = 'driver' then
    update public.driver_reviews set helpful = coalesce(helpful, 0) + 1 where id = p_id;
  else
    update public.reviews set helpful = coalesce(helpful, 0) + 1 where id = p_id;
  end if;
end;
$$;

-- Garantir que a funcao seja chamavel pelo anonimo (public)
grant execute on function public.review_helpful(uuid, text) to anon, authenticated;

-- ============================================================
-- Como funciona (depois de rodar):
-- - No formulario de avaliacao aparecem: "Sou um: [Cliente/Morador/Turista]",
--   um titulo opcional, nome, comentario e estrelas.
-- - Cada avaliacao mostra avatar com iniciais, selo do perfil, titulo e botao "Util".
-- - "Util" incrementa o contador (1 voto por navegador).
-- ============================================================
