# 🤖 AUTOMAÇÃO 100% DOS PAGAMENTOS (Mercado Pago)

Ativa/desativa o plano da loja ou motorista **automaticamente** conforme o pagamento.

## Como funciona (resumo)
1. Lojista/motorista clica em **"Assinar"** → a função `upgrade-checkout` cria a assinatura no MP **marcando qual loja/motorista** (`external_reference`).
2. O cliente paga no MP.
3. O MP avisa a função `mp-webhook` → ela **ativa o plano** no site sozinha.
4. Se **cancelar/estornar/rejeitar** → a função **desativa** sozinha (volta p/ Grátis).

## PRÉ-REQUISITO (importante)
⚠️ **O site precisa estar no ar** (a URL do webhook e o redirecionamento do checkout precisam de um endereço público). Por isso o ideal é:
1. Publicar a **v2** primeiro (no domínio).
2. Depois ativar a automação (passos abaixo).

---

## PASSOS PARA ATIVAR

### 1) Pegar o Access Token do Mercado Pago
- MP → **Suas integrações / Credenciais** → copie o **Access Token** (produção).
- (Guarde em segredo — **não me mande**.)

### 2) Pegar a service_role key do Supabase
- Supabase → **Project Settings → API** → copie a **service_role key** (secret).
- (Também secreta — **não me mande**.)

### 3) Criar os secrets no Supabase (no terminal com Supabase CLI) ou pelo dashboard
```
supabase secrets set MP_ACCESS_TOKEN=SEU_ACCESS_TOKEN
supabase secrets set SUPABASE_URL=https://efvuzxdhsirpvxclgdfg.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
```

### 4) Publicar as 2 funções
```
supabase functions deploy upgrade-checkout --no-verify-jwt
supabase functions deploy mp-webhook --no-verify-jwt
```
> As funções estão prontas na pasta `supabase/functions/`.

### 5) Configurar o Webhook no Mercado Pago
- MP → **Suas integrações → Notificações/Webhooks** → criar webhook com a URL:
  `https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/mp-webhook`
- Eventos: **`subscription_preapproval`** e **`subscription_authorized_payment`**.

### 6) Ligar no site
- No `assets/app.js`, em `CONFIG.mp`, preencha `autoUrl` com:
  `https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/upgrade-checkout`
- Redeploy. Pronto: os botões "Assinar" criam a assinatura e a ativação fica automática. ✅

---

## Estados tratados
| Evento MP | O que o site faz |
|---|---|
| Assinatura **autorizada** / pagamento **aprovado** | **Ativa** o plano (Destaque/Pro) + selo |
| Assinatura **pausada/cancelada** | **Desativa** (volta a Grátis) |
| Pagamento **rejeitado/estornado** | **Desativa** |

> 🔒 O Access Token e a service_role ficam **só no servidor (secrets)** — nunca no site.
> ✅ A função sempre responde "ok" ao MP (boa prática p/ não reenviar infinito).
