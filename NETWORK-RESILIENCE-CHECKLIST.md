# 🧪 CHECKLIST DE VALIDAÇÃO — AQUITEM v3.5 Network Resilience

## Como executar os testes

Abra `aquitemachadinhos.com.br/admin.html` ou `painel.html` no DevTools do Safari/Chrome.
Para cada teste: abra a aba **Network** → filtre por **Fetch/XHR**.

---

## ✅ TESTE 1 — Compressão de Imagens

**Objetivo**: Toda imagem > 200KB deve ser comprimida para ≤ 1200px/80% antes do upload.

### Passos:
1. Vá para `painel.html` (área do lojista)
2. Clique em "Trocar logo" ou "Adicionar fotos"
3. Selecione uma imagem JPEG de > 1MB e > 1200px
4. Abra o Console DevTools — você deve ver:
   ```
   [AQUITEM] compressImage: 2048KB → 312KB (1200x900)
   ```
5. Abra a aba **Network** — observe o tamanho do upload para `/storage/v1/object/fotos/`

### Critérios de aprovação:
- [ ] Log de compressão aparece no console
- [ ] Tamanho do upload é menor que o original
- [ ] A imagem no perfil aparece corretamente após upload
- [ ] Imagens PNG preservam transparência (fundo branco em JPEG)
- [ ] Evento `ata:compress` disparado (`window.addEventListener('ata:compress', console.log)`)

---

## ✅ TESTE 2 — Exponential Backoff (aPatch)

**Objetivo**: Se o Supabase retornar erro 5xx, o sistema tenta automaticamente 3x antes de desistir.

### Simulação (DevTools):
1. Abra `admin.html` logado como admin
2. No DevTools → aba **Network** → clique em **⬛ No throttling** → selecione **Offline**
3. Tente aprovar uma empresa (clique em "✓ Aprovar")
4. Observe o console:
   ```
   [AQUITEM] Retry 1/3 em 1000ms — Failed to fetch
   [AQUITEM] Retry 2/3 em 2000ms — Failed to fetch
   [AQUITEM] Retry 3/3 em 4000ms — Failed to fetch
   [AQUITEM] aPatch falhou após retries: stores [id] Failed to fetch
   ```
5. Desative o modo Offline
6. Tente novamente — deve funcionar na primeira tentativa

### Critérios de aprovação:
- [ ] 3 tentativas acontecem com delays crescentes (1s, 2s, 4s)
- [ ] Mensagem de erro amigável aparece na tela após falha total
- [ ] Após restaurar rede, operação funciona normalmente
- [ ] Cache SWR não é corrompido durante o período offline

---

## ✅ TESTE 3 — Cache SWR (Stale-While-Revalidate)

**Objetivo**: Admin panel carrega instantaneamente na segunda visita usando cache.

### Passos:
1. Abra `admin.html` logado
2. Meça o tempo de carregamento inicial (aba Network → "Time")
3. Feche e reabra `admin.html` (sem fechar o navegador — só pressione F5)
4. Observe no console e no topo da página o indicador "⚡ Carregado do cache — atualizando…"

### Critérios de aprovação:
- [ ] Segunda visita mostra dados imediatamente (sem spinner longo)
- [ ] Indicador "⚡ Carregado do cache" aparece
- [ ] Em background, uma nova requisição ao Supabase é feita
- [ ] Após ~500ms, dados frescos substituem os do cache
- [ ] Modificar uma empresa e voltar ao admin mostra os dados atualizados (cache invalidado)

---

## ✅ TESTE 4 — Mapeador de Erros Supabase

**Objetivo**: Erros de banco retornam mensagens em PT-BR amigáveis (não JSON técnico).

### Simulação:
1. Vá para `cadastro.html`
2. Tente cadastrar uma empresa **duplicada** (mesmo nome + WhatsApp de uma existente)
3. Observe a mensagem de erro exibida

### Critérios de aprovação:
- [ ] Mensagem: "Esta empresa já está cadastrada com esse nome ou WhatsApp." (não código 23505)
- [ ] Mensagem de campo obrigatório vazio: "Nome da empresa é obrigatório."
- [ ] Erro de FK de categoria: "Categoria inválida ou não encontrada."
- [ ] Sessão expirada: "Sessão expirada. Faça login novamente."

---

## ✅ TESTE 5 — Validação de Schema (wireEdit)

**Objetivo**: O formulário de edição valida campos antes de chamar o Supabase.

### Passos:
1. Vá para `painel.html?id=[qualquer-id]`
2. Limpe o campo "Nome" completamente
3. Clique em "Salvar"

### Critérios de aprovação:
- [ ] Mensagem de erro aparece IMEDIATAMENTE (sem requisição ao Supabase)
- [ ] DevTools Network mostra 0 chamadas de PATCH
- [ ] Mensagem: "Nome da empresa é obrigatório."
- [ ] Insira um Instagram com caracteres inválidos → erro específico aparece
- [ ] Com dados válidos, o PATCH é enviado e "✅ Salvo com sucesso!" aparece

---

## ✅ TESTE 6 — Trilha de Auditoria

**Objetivo**: Toda ação de edição ou deleção cria um registro em `admin_audit_log`.

### Passos:
1. Faça login como admin em `admin.html`
2. Modifique o status de uma empresa (Aprovar / Rejeitar)
3. Exclua um lead
4. Abra o Supabase Table Editor → Tabela `admin_audit_log`

### Critérios de aprovação:
- [ ] Registros aparecem em `admin_audit_log` com `action='UPDATE'` ou `action='DELETE'`
- [ ] Campo `before_data` contém o estado anterior
- [ ] Campo `after_data` contém as alterações feitas
- [ ] Campo `performed_at` tem timestamp correto
- [ ] Usuário anon NÃO consegue inserir (testa via curl sem auth)
- [ ] Usuário anon NÃO consegue deletar registros de auditoria

---

## ✅ TESTE 7 — Invalidação de Cache após Mutações

**Objetivo**: Após aprovar/editar/deletar uma empresa, o cache SWR é invalidado.

### Passos:
1. Abra `admin.html` (carrega do Supabase, cria cache)
2. Aprove uma empresa pendente
3. Observe que a lista atualiza (recarrega do Supabase, não do cache)
4. Volte ao `admin.html` imediatamente

### Critérios de aprovação:
- [ ] Após aprovação, a empresa some da aba "Pendentes" imediatamente
- [ ] A empresa aparece em "Ativas" (dados frescos)
- [ ] `swrInvalidate('stores')` é chamado (visível no console com `window._swrCache`)

---

## 🚀 Execução Automatizada (Console DevTools)

Cole este script no Console do DevTools para rodar uma bateria básica:

```javascript
// Teste 1: Verificar cache SWR
console.log('Cache atual:', Object.keys(window._swrCache || {}).length, 'entradas');

// Teste 2: Verificar withRetry disponível  
console.log('withRetry:', typeof withRetry === 'function' ? '✅' : '❌');

// Teste 3: Verificar validateStore
var v = validateStore({ nome: '', whatsapp: '' });
console.log('Validation empty:', v.ok === false && v.errors.length > 0 ? '✅' : '❌', v.errors);

// Teste 4: Verificar mapSupabaseError
console.log('Error map 23505:', mapSupabaseError({ code: '23505' }, 409));

// Teste 5: Simular compressImage com arquivo pequeno (fast-path)
var fakeFile = new File(['a'], 'test.jpg', { type: 'image/jpeg' });
compressImage(fakeFile).then(function(r) { console.log('Fast-path compress:', r === fakeFile ? '✅' : '❌'); });
```

---

## 📊 Resultado Esperado

| Teste | Métrica | Meta |
|-------|---------|------|
| Compressão | Redução de tamanho | > 40% para imagens > 1MB |
| Backoff | Retry após offline | 3 tentativas em ≤ 7s |
| Cache SWR | Tempo de 2ª carga | < 50ms (instantâneo) |
| Error Mapper | Mensagens PT-BR | 100% dos códigos mapeados |
| Validação | Rejeição sem request | Imediata (0ms) |
| Auditoria | Registros criados | 1 por ação destrutiva |
| Cache Invalidação | Dados frescos | Imediato após mutação |
