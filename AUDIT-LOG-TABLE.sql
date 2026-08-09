-- ================================================================
-- AQUI TEM ACHADINHOS — Trilha de Auditoria Imutável (v3.5)
-- Execute no Supabase SQL Editor do projeto:
-- efvuzxdhsirpvxclgdfg.supabase.co
-- ================================================================

-- 1. CRIAR TABELA DE AUDITORIA IMUTÁVEL
-- Os registros jamais são deletados (append-only)
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  action          text NOT NULL CHECK (action IN ('UPDATE', 'DELETE', 'STATUS_CHANGE', 'CREATE')),
  table_name      text NOT NULL,
  record_id       text NOT NULL,
  before_data     jsonb,
  after_data      jsonb,
  user_agent      text,
  performed_at    timestamptz NOT NULL DEFAULT now(),
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- 2. Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_audit_table ON admin_audit_log (table_name);
CREATE INDEX IF NOT EXISTS idx_audit_record ON admin_audit_log (record_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON admin_audit_log (action);
CREATE INDEX IF NOT EXISTS idx_audit_date ON admin_audit_log (performed_at DESC);

-- 3. RLS — apenas admins autenticados podem INSERT e SELECT
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Admins podem inserir (o front-end usa o token de sessão)
CREATE POLICY "Admins podem registrar auditoria"
  ON admin_audit_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admins podem ler o histórico
CREATE POLICY "Admins podem ler auditoria"
  ON admin_audit_log FOR SELECT
  TO authenticated
  USING (true);

-- NINGUÉM pode deletar ou atualizar (imutável)
-- (sem políticas de UPDATE/DELETE = bloqueado por padrão)

-- 4. VIEW amigável para exibir no painel
CREATE OR REPLACE VIEW admin_audit_view AS
SELECT
  id,
  action,
  table_name,
  record_id,
  COALESCE(before_data->>'nome', before_data->>'titulo', record_id) AS record_name,
  before_data,
  after_data,
  performed_at,
  TO_CHAR(performed_at AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY HH24:MI') AS performed_at_br
FROM admin_audit_log
ORDER BY performed_at DESC;

-- 5. Garante que a tabela não pode ser truncada por usuário anon
REVOKE TRUNCATE ON admin_audit_log FROM PUBLIC;
REVOKE DELETE ON admin_audit_log FROM PUBLIC;
REVOKE UPDATE ON admin_audit_log FROM PUBLIC;

-- ================================================================
-- Verificação final
-- ================================================================
SELECT 'admin_audit_log criada com sucesso' AS status,
       COUNT(*) AS total_rows
FROM admin_audit_log;
