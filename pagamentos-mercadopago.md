# 💚 Pagamentos — Mercado Pago (como ativar)

## Modelo (honesto e seguro)
- Usamos **links de pagamento/assinatura criados no painel do Mercado Pago**.
- O cliente clica no plano → **paga no site do MP** (ambiente seguro do MP) → volta pro seu site.
- **Nenhuma chave secreta fica no site.** Só usamos links públicos. O *Access Token* fica só no seu painel do MP.

## Como ativar (passo a passo)
1. Entre em **mercadopago.com.br** (sua conta).
2. Crie um **Link de Pagamento** (ou **Assinatura** recorrente) para cada plano:
   - Lojista **Destaque** — R$ 79/mês
   - Lojista **Pro** — R$ 149/mês
   - Motorista **Destaque** — R$ 49/mês
   - Motorista **Pro** — R$ 99/mês
   - *(Caminho no MP: **Cobranças → Link de pagamento** para cobrança única; ou **Assinaturas → Criar plano** para cobrança mensal automática.)*
3. **Copie a URL** de cada link gerado.
4. Abra **`assets/app.js`** e preencha o bloco `CONFIG.mp.links`:
   ```js
   mp: { links: {
     lojista_destaque: 'COLE_A_URL_DO_MP_AQUI',
     lojista_pro:       'COLE_A_URL_DO_MP_AQUI',
     driver_destaque:   'COLE_A_URL_DO_MP_AQUI',
     driver_pro:        'COLE_A_URL_DO_MP_AQUI'
   } }
   ```
5. **Redeploy** (arrastar a pasta na Vercel).

✅ Pronto: os botões **“Quero o Destaque / Pro”** passam a abrir o pagamento no Mercado Pago.

## Como a ativação do plano funciona (lançamento)
1. Cliente paga no MP.
2. Você vê o pagamento no painel do MP (e o cliente pode avisar).
3. No **painel admin** (`/admin`), você muda o **plano** da loja/motorista para **Destaque/Pro**.

> 🤖 **Automação futura (opcional):** dá pra deixar 100% automático com um webhook do MP → uma *Supabase Edge Function* que ativa o plano sozinha. Isso é uma evolução posterior; no lançamento, a confirmação manual já resolve.

## Segurança (importante)
- ❌ **Nunca** cole o **Access Token** no site nem no `app.js`.
- ✅ Só cole as **URLs públicas** dos links de pagamento.
- O Access Token é usado só dentro do painel do Mercado Pago.
