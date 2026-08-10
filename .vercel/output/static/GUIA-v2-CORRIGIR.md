# 🐂 GUIA v2 — CORRIGIR A HOME PREMIUM (importante!)

**O que aconteceu:** a home tinha o CSS **dentro** do HTML, e a política de segurança do site (CSP) **bloqueia CSS interno**. Por isso o site apareceu "cru, parecendo texto, com o touro parado".
**A correção:** movi todo o CSS para um **arquivo externo** (`assets/premium.css`) — que a política permite. **Já testei em navegador real: touro flutuando, dourado brilhando, tudo funcionando.** ✅

---

## 📦 O que tem no `home-oficial-v2.zip`

```
home-oficial-v2.zip
├── index.html              ← a home CORRIGIDA (substitui a atual)
└── assets/
    ├── premium.css         ← ⭐ NOVO! o CSS premium (arquivo que faltava)
    ├── touro-hero.webp     ← (já está no site, mas mande junto por garantia)
    └── touro-detalhe.webp  ← (já está no site, mas mande junto por garantia)
```

---

## 🚀 PASSO A PASSO (5 minutos)

### 1️⃣ Extrair o zip
Baixe o `home-oficial-v2.zip` → botão direito → **"Extrair Tudo..."** → pasta `home-oficial-v2`

### 2️⃣ Subir os 4 arquivos no GitHub
1. **github.com** → seu repositório → **"Add file" → "Upload files"**
2. Abra a pasta `home-oficial-v2` no computador
3. **Arraste os 2 itens juntos**: o arquivo `index.html` **e** a pasta `assets`
4. Aparece aviso *"files with the same name..."* → **normal** (vai substituir o index.html) → continue
5. Commit: `Corrige CSS da home premium (arquivo externo)`
6. **ATENÇÃO:** o `premium.css` precisa ficar **DENTRO da pasta `assets`** — quando arrastar a pasta `assets`, o GitHub coloca no lugar certo automaticamente. ✅

### 3️⃣ Esperar 2–3 min (Vercel publica sozinha)

### 4️⃣ Limpar o cache do celular/computador (importante!)
O navegador pode estar mostrando a versão velha guardada:
- **Computador:** aperte **Ctrl + F5** (ou Ctrl + Shift + R) na página
- **Celular (Chrome):** menu ⋮ → **Histórico** → **Limpar dados de navegação** → intervalo "Todo o período" → Limpar → abrir o site de novo
- Ou simplesmente **abra em uma aba anônima** (modo privado) para testar

### 5️⃣ Conferir
Abra **https://www.aquitemachadinhos.com.br/** e veja:
- 🐂 **Touro dourado FLUTUANDO** (sobe e desce devagar, com brilho pulsando)
- ✨ Título **"Onde Barretos encontra."** com dourado brilhando em movimento
- 🎪 Letreiro com os artistas passando
- ⏱️ Contador para a Festa
- 🗂️ Cards de vidro das categorias
- Menu e rodapé normais

**Se o touro flutuar: ESTÁ PERFEITO!** 🎉

---

## ⚠️ Se ainda aparecer "feio" depois de tudo isso

1. **Confira se o `premium.css` foi para a pasta `assets`** (clique na pasta assets no repositório → deve ter `premium.css` junto do `app.js`, `tailwind.css`...)
2. Teste em **outro aparelho** (ex.: computador, se viu no celular)
3. Me avisa que eu **verifico ao vivo** e te digo exatamente o que falta

---

## 🔍 Por que isso resolveu (explicação rápida)

O site tem uma proteção (CSP) que permite CSS de **arquivos** mas bloqueia CSS **dentro do HTML**. Na v1 eu coloquei o CSS dentro do HTML (bloqueado = site feio). Na v2 o CSS virou arquivo `premium.css` (permitido = site lindo). Simples e definitivo. ✅
