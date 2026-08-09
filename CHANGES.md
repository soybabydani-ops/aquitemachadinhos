# CHANGES.md — Resumo de alterações (pasta `repo-corrigido`)

Todos os arquivos desta pasta são cópias dos arquivos **publicados hoje** no site, já corrigidos.
**Como usar:** substitua os arquivos correspondentes no seu repositório GitHub e faça o deploy (a Vercel publica sozinha após o push).

---

## 📄 Alterações por arquivo

| Arquivo | O que mudou |
|---|---|
| **11 páginas HTML** (index, anuncie, cadastro, cadastro-anuncio, categoria, busca, loja, imoveis, empregos, veiculos, guia-peao, motoristas, etc.) | Todas as URLs absolutas `https://aquitemachadinhos.com.br` → **`https://www.aquitemachadinhos.com.br`** (corrige o canonical contraditório e og:url) |
| **11 páginas HTML** | `og:image` trocada de `icon-512.png` → **`assets/og-image.png`** + dimensões 1200×630 |
| **index.html** | + **JSON-LD WebSite** (com caixa de busca no Google / SearchAction) |
| **favoritos.html** | + `<meta name="robots" content="noindex, nofollow">` (login.html e painel.html já tinham) |
| **sitemap.xml** | Substituído: **26 URLs** com www, incluindo páginas que faltavam (guia-peao, imoveis, empregos, veiculos, motoristas, classificados, eventos-peao, etc.) |
| **assets/app.js** | ① Nova função `setListingSEO()` — cada ficha de empresa agora gera **título único, meta description, Open Graph e JSON-LD LocalBusiness dinamicamente** (o Google passa a entender cada loja) ② `Stores.create`: cadastro público agora envia **`status='pendente'`** (antes ia direto como 'ativo' — sem moderação!) |
| **assets/og-image.png** | **NOVO** — arte 1200×630 da marca (gerada no kit) |

## ⚠️ O que NÃO alterei (e por quê)

- **Links internos com `.html`** (ex.: `href="anuncie.html"`): funcionam via redirect 308 da Vercel (cleanUrls). Trocar por URLs limpas é boa prática futura, mas mexer em 142 KB de JS sem teste em produção é arriscado — deixei como está para não quebrar o site.
- **Conteúdo do `vercel.json`**: não é servido publicamente (404), então não foi possível baixar. Se existir, não precisa mudar nada nele.
- **CSS/fontes/ícones**: intocados.

## 🔧 O que fazer DEPOIS do deploy

1. **Rodar `01b-limpar-seeds.sql`** no Supabase (remove os 13 cadastros fictícios — o banco já bloqueia escrita anônima, então só pelo painel).
2. **Rodar `01-seguranca-rls.sql`** (o INSERT público ainda está aberto — o script força `pendente` e protege as demais operações). ✅ *Nota: com o app.js corrigido, o cadastro já envia `pendente`, então a nova política não quebra o formulário.*
3. **Search Console:** enviar o novo sitemap e pedir indexação (arquivo `03-google-analytics.md`).
4. Testar o site após o deploy: home, busca, uma ficha de loja, cadastro público e o painel admin (login).

## og: tags todas as cidades — 2026-08-09 15:14
Blumenau, Bonito, Búzios, Campos do Jordão, Caruaru, Florianópolis, Jericoacoara, Porto de Galinhas, Salvador — og:title, og:description e og:image adicionados em todas as home pages e sub-páginas.
