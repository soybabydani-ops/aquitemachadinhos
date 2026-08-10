-- ============================================================
-- MELHORIAS FINAIS — contas próprias + horário estruturado
-- Rode no SQL Editor do Supabase.
-- ============================================================

-- Contas próprias: vincular loja/motorista a um usuário (auth.users)
alter table public.stores add column if not exists owner_id uuid;
alter table public.drivers add column if not exists owner_id uuid;

-- Horário estruturado ("aberto agora")
-- horario_dias: dias da semana separados por vírgula (0=Dom, 1=Seg, ..., 6=Sáb). Ex: "1,2,3,4,5" = Seg-Sex
-- horario_abre: horário de abertura. Ex: "08:00"
-- horario_fecha: horário de fechamento. Ex: "18:00"
alter table public.stores add column if not exists horario_dias text;
alter table public.stores add column if not exists horario_abre text;
alter table public.stores add column if not exists horario_fecha text;
