-- ============================================================
-- TAGS DE ESTABELECIMENTO — Aqui Tem Achadinhos
-- Permite selos como "24h", "Plantão", "Madrugada" nas lojas.
-- Rode UMA vez no SQL Editor do Supabase. Idempotente.
-- ============================================================

-- Adiciona coluna de tags (array de texto) nas lojas
alter table public.stores add column if not exists tags text[] default '{}'::text[];

-- Garantir que o público consiga ler as tags (já tem select, mas reforçamos)
-- (as políticas de select existentes já cobrem a coluna nova automaticamente)

-- Exemplos de tags possíveis: '24h', 'plantao', 'madrugada', 'delivery', 'retirada'
-- São definidas pelo lojista/admin no painel de gestão da empresa.

-- ============================================================
-- COMO USAR (depois de rodar):
-- No painel da empresa (painel.html), aparecem caixas pra marcar:
--   ☐ Aberto 24h   ☐ Plantão   ☐ Atende madrugada
-- Ao marcar, o selo aparece automaticamente no card da loja.
-- ============================================================
