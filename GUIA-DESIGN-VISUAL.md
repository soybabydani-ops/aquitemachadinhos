# 🎨 DEPLOY VISUAL + TUDO (versão completa atual)

Este pacote é a **versão completa e mais recente** do site (pode substituir os pacotes anteriores).

## 🆕 Destaques desta versão
- **Arte da Festa do Peão no hero**: imagem original (rodeo ao pôr do sol) agora no fundo das páginas-chave (home, Guia do Peão, Imóveis, Eventos do Peão), com overlay navy pra manter a identidade e a leitura.
- Avaliações ultra + botão "Reivindicar" + aprovação automática (lojas/avaliações) + selos 24h + Guia do Peão + busca com anúncios + mapas (tudo das etapas anteriores).

---

## 📤 Como publicar

### A) SQLs no Supabase (se ainda não rodou) — nesta ordem:
1. `supabase-aprovacao-automatica.sql`
2. `supabase-avaliacoes-ultra.sql`
3. `supabase-tags.sql`

### B) GitHub
**Na pasta `assets`** (3 arquivos):
- `app.js`, `styles.css`, `peao-hero.jpg`

**Na raiz** (6 arquivos):
- `sw.js`, `index.html`, `guia-peao.html`, `imoveis.html`, `eventos-peao.html`, `cadastro-anuncio.html`

> ⚠️ O `peao-hero.jpg` é NOVO — precisa subir ele também (senão o fundo não aparece).
> O `sw.js` virou **v7** — garante que todos peguem a imagem nova.

---

## 🧪 Testar (aba anônima)
1. Abra a **home** → o hero agora tem o fundo do rodeio 🤠🌅
2. `/guia-peao` e `/imoveis` → mesma arte temática
3. Texto continua legível (overlay navy)

## 💡 Quer outra arte?
Se quiser um **estilo diferente** (ex.: mais focado em comida/cidade, ou uma cor diferente, ou uma versão de dia vs. noite), é só me dizer o clima que você quer que eu gero outra imagem original.
