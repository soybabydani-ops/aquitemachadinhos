-- =============================================================================
-- AQUITEM ACHADINHOS — SUITE 43: PROTOCOLO DE NOTIFICAÇÕES AO VIVO NO TELEGRAM
-- Gatilho em cliques_afiliados_logs -> net.http_post -> Edge Function notify-telegram
-- =============================================================================

-- 1. Função de Disparo Assíncrono para o Telegram via pg_net (< 10ms)
CREATE OR REPLACE FUNCTION public.trg_notify_telegram_clique_afiliado()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  v_url text := 'https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/notify-telegram';
  v_payload jsonb;
BEGIN
  -- Monta o payload padronizado
  v_payload := jsonb_build_object(
    'table', 'cliques_afiliados_logs',
    'record', jsonb_build_object(
      'id', NEW.id,
      'cidade_destino', COALESCE(NEW.cidade_destino, NEW.cidade_local, 'São Paulo'),
      'cidade_local', COALESCE(NEW.cidade_local, 'São Paulo'),
      'plataforma_afiliado', COALESCE(NEW.plataforma_afiliado, NEW.tipo_transporte, 'Afiliado'),
      'tipo_transporte', COALESCE(NEW.tipo_transporte, 'Geral'),
      'rota', COALESCE(NEW.rota, NEW.url_origem, '/'),
      'url_origem', NEW.url_origem,
      'comissao_estimada_usd_brl', NEW.comissao_estimada_usd_brl,
      'moeda', COALESCE(NEW.moeda, 'BRL'),
      'criado_em', NEW.criado_em
    )
  );

  -- Disparo assíncrono não-bloqueante em menos de 10ms
  PERFORM net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := v_payload
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Garante que falhas externas de rede nunca abortem a gravação do clique no banco
  RAISE WARNING 'Falha ao despachar notificação Telegram via pg_net: %', SQLERRM;
  RETURN NEW;
END;
$function$;

-- 2. Vincular o Gatilho na Tabela cliques_afiliados_logs
DROP TRIGGER IF EXISTS trg_cliques_afiliados_telegram ON public.cliques_afiliados_logs;

CREATE TRIGGER trg_cliques_afiliados_telegram
AFTER INSERT ON public.cliques_afiliados_logs
FOR EACH ROW
EXECUTE FUNCTION public.trg_notify_telegram_clique_afiliado();

-- 3. Garantir Políticas RLS para Inserção e Leitura de Telemetria
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cliques_afiliados_logs' AND policyname = 'Insercao publica cliques') THEN
        CREATE POLICY "Insercao publica cliques" ON public.cliques_afiliados_logs FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cliques_afiliados_logs' AND policyname = 'Leitura publica cliques') THEN
        CREATE POLICY "Leitura publica cliques" ON public.cliques_afiliados_logs FOR SELECT USING (true);
    END IF;
END $$;
