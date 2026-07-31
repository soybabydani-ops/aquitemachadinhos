-- ============================================================
-- FASE 2 — Painel administrativo (login Supabase)
-- Rode isto no SQL Editor do Supabase (depois do schema principal).
-- Permite que VOCÊ (autenticado) veja todas as empresas, aprove,
-- rejeite, destaque e veja métricas. O público continua só vendo as ativas.
-- ============================================================

-- Autenticado (você/admin) vê TODAS as empresas (inclusive pendentes)
create policy "stores_read_auth"   on public.stores for select to authenticated using (true);
-- Autenticado atualiza (aprovar/rejeitar/destaque/plano/suspender)
create policy "stores_update_auth" on public.stores for update  to authenticated using (true) with check (true);
-- Autenticado exclui
create policy "stores_delete_auth" on public.stores for delete  to authenticated using (true);
-- Ofertas: ler e atualizar (admin)
create policy "offers_read_auth"   on public.offers for select to authenticated using (true);
create policy "offers_update_auth" on public.offers for update  to authenticated using (true) with check (true);
-- Métricas: ler totais (admin)
create policy "metrics_read_auth"  on public.metrics_events for select to authenticated using (true);

-- ============================================================
-- COMO CRIAR SEU LOGIN DE ADMINISTRADOR:
-- 1) No Supabase → Authentication → Sign In / Providers: deixe "Email" ATIVADO.
-- 2) Em Authentication → Users → "Add user": coloque SEU e-mail + senha
--    e marque "Auto Confirm User". Pronto — esse é seu login de admin.
-- 3) Use a página /login.html do site com esse e-mail e senha.
-- ============================================================
