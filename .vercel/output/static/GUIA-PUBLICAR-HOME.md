# 🐂 GUIA — PUBLICAR A HOME OFICIAL PREMIUM (para leigos)

**O que você vai fazer:** colocar **3 arquivos** no repositório do site no GitHub, na posição certa. A Vercel publica sozinha depois.

---

## 🗂️ O que tem dentro do `home-oficial.zip`

```
home-oficial.zip
├── index.html              ← a home nova (vai SUBSTITUIR a atual)
└── assets/                 ← pasta (JÁ CRIADA)
    ├── touro-hero.webp     ← imagem do touro grande
    └── touro-detalhe.webp  ← imagem do touro detalhe
```

---

## ETAPA 1 — Extrair o arquivo (1 min)

1. Baixe o **`home-oficial.zip`**
2. **Windows:** botão direito → "Extrair Tudo..." → Extrair
   **Mac:** 2 cliques (descompacta sozinho)
3. Vai aparecer a pasta **`home-oficial`** com:
   - o arquivo `index.html`
   - a pasta `assets` (com as 2 imagens do touro dentro)

---

## ETAPA 2 — Entrar no GitHub (1 min)

1. Abra **github.com** → **Sign in** (mesma conta de antes)
2. Clique no repositório do site (o mesmo onde você publicou os artigos)

---

## ETAPA 3 — Subir os 3 arquivos (3 min) ⭐ O PASSO MAIS IMPORTANTE

Você vai fazer **UM upload só**, arrastando a pasta inteira — o GitHub monta a estrutura sozinho.

1. No repositório, clique em **"Add file"** → **"Upload files"**
2. Abra a pasta **`home-oficial`** no seu computador
3. **Arraste os 2 itens de UMA VEZ** para a área pontilhada:
   - o arquivo **`index.html`**
   - a pasta **`assets`** (com as imagens dentro)
4. Vai aparecer um aviso: *"Your repository has files with the same name..."* → **isso é normal** (o `index.html` antigo será substituído). Pode continuar.
5. Role para baixo → escreva: `Home premium com touro 3D`
6. Clique no botão verde **"Commit changes"**

> ✅ **Para conferir se a pasta foi montada certa:** depois do upload, a lista de arquivos do repositório deve mostrar:
> - `index.html` (no topo, junto dos outros arquivos)
> - `assets/` (a pasta — clique nela e devem estar lá `touro-hero.webp` e `touro-detalhe.webp` **junto com os outros arquivos que já existiam**, como `app.js`, `tailwind.css` etc. — NÃO apague os antigos!)

---

## ETAPA 4 — Esperar (2–3 min)

A Vercel publica sozinha. Não precisa fazer nada.

---

## ETAPA 5 — Conferir (1 min)

Abra **https://www.aquitemachadinhos.com.br/** e veja se:
- 🐂 O **touro dourado 3D** aparece no topo (flutuando, com brilho)
- ⏱️ O **contador regressivo** mostra dias/horas/min/seg para a Festa
- 🎪 Os **artistas passando** no letreiro
- 🗂️ As **12 categorias** em cards
- O **menu** de cima e o **rodapé** continuam iguais

Se o touro aparecer: **PARABÉNS! Seu site agora tem cara de Apple!** 🎉

---

## ⚠️ CUIDADOS (para não errar)

| Erro comum | Como evitar |
|---|---|
| Enviar só o `index.html` e esquecer a pasta `assets` | Arraste **os 2 juntos** (arquivo + pasta) no mesmo upload |
| As imagens irem para a raiz (fora de `assets/`) | Use a **pasta `assets` do zip** — não tire as imagens de dentro dela |
| Apagar arquivos antigos da pasta `assets` | **NÃO apague nada** — só ADICIONE os 2 novos |
| Depois de publicar, "não apareceu" | Espere 2–3 min e aperte **Ctrl+F5** (recarrega sem cache) |

---

## 🔄 SE VOCÊ JÁ TIVER ENVIADO O index.html ANTES SEM A PASTA

Sem problema — faça só a parte das imagens:
1. Entre no repositório → clique na pasta **`assets`**
2. **Add file → Upload files** → arraste `touro-hero.webp` e `touro-detalhe.webp` (a pasta que você arrastar pode ser a `assets` inteira; o GitHub adiciona os arquivos)
3. Commit → esperar → conferir

---

**Dúvida em qualquer passo? Me chama aqui que eu te guio em tempo real! E depois de publicar, me avisa que eu verifico o site ao vivo para você.** 🤠🐂
