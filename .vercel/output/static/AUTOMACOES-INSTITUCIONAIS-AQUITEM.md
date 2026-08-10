# Automação institucional — AQUITEM

## Objetivo
Automatizar triagem e follow-up sem expor nome pessoal. Mensagens saem de `AQUITEM | Parcerias Locais` por canal corporativo configurado.

## Fila de eventos
A tabela `automation_queue` recebe eventos e aguarda um conector seguro (n8n/Make) para executar a ação.

| Evento | Condição | Ação sugerida |
|---|---|---|
| founder_lead_received | Lead Fundadora com consentimento | Aviso interno e resposta institucional de recebimento |
| profile_incomplete | Empresa ativa sem fotos/descrição | Lembrete para completar o perfil |
| first_result | Empresa recebe primeiros cliques | Mensagem de prova de valor |
| upgrade_eligible | Demanda/cliques acima do limite | Oferta de plano Destaque |
| renewal_window | 21/14/7 dias antes do fim | Lembrete de renovação |

## Modelo de mensagem institucional — Fundadora

**Assunto:** Sua inscrição como Empresa Fundadora foi recebida

> Olá! A AQUITEM recebeu a inscrição da sua empresa para o programa Empresas Fundadoras em {{cidade}}.
>
> Nossa equipe revisará os dados e retornará pelos canais informados. Enquanto isso, você pode preparar logo, fotos, descrição, horário e Instagram para acelerar a publicação.
>
> AQUITEM | Guias Locais

## Regras obrigatórias

- enviar somente com consentimento registrado;
- usar remetente institucional;
- registrar resultado da mensagem na fila/CRM;
- oferecer opção de não receber novos contatos;
- não disparar campanhas massivas sem segmentação;
- respeitar limites e termos de e-mail/WhatsApp Business;
- não usar nome pessoal da fundadora.

## Conector n8n/Make

1. Criar uma conexão segura com Supabase.
2. Ler somente `automation_queue` com `status = pending` e `scheduled_for <= now()`.
3. Enviar pelo canal autorizado.
4. Atualizar evento para `sent`, `skipped` ou `failed`.
5. Nunca salvar chave de serviço no front-end ou GitHub.
