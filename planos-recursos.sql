-- Permite remover fotos da galeria (painel do lojista/admin autenticado)
-- Necessário pra o recurso "gestão de fotos" funcionar.
create policy "photos_delete_auth" on public.store_photos for delete to authenticated using (true);
