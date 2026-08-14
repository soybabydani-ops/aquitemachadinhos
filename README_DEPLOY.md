# AQUITEMACHADINHOS - DEPLOY WHITE HAT PROTOCOL
## Execução Completa: 64 Tenants + SEO Técnico + Monetização

**Data:** 2026-08-14  
**Responsável:** Engenheiro de Software Core + Arquiteto Cloud

---

## ✅ O QUE FOI CONCLUÍDO NESTA SESSÃO

### 1. Integração de Clima em Tempo Real
- Componente `ClimateWidget.tsx` (Glassmorphism)
- Consome API oficial Open-Meteo (sem simulações)
- Boletim Climático + Avisos de Utilidade Pública
- Espaço reservado para Adsterra / PropellerAds

### 2. Artigos Originais White Hat
- `manual-eficiencia-energetica.md`
- `analise-tendencias-utilidades-domesticas.md`
- `guia-hardware-tecnologia.md`

### 3. SEO Técnico (Google Search Console Compliant)
- `middleware.ts` → Redirecionamentos 301 (HTTP→HTTPS + .html)
- Canonical tags implementadas
- Schema.org Product + Review injetado

### 4. Estrutura de E-commerce Informativo
- Cards com links transparentes para Shopee, Temu, UNice, DHgate
- Vitrine de tecnologia (Samsung, Dell)

### 5. Automação de Indexação
- `generate-sitemap.js` (dinâmico via Supabase)
- `InternalLinkingFooter.tsx` (linkagem em cascata)
- Rota dinâmica por cidade: `/[city]`

### 6. Banco de Dados (Supabase Ready)
- Migration completa: `001_create_tenant_content.sql`
- Seed script para 64 tenants

---

## 📁 Estrutura Gerada

```
/home/user/portal-updates/
├── app/
│   ├── [city]/
│   │   └── page.tsx                 # Página dinâmica por tenant
│   ├── layout.tsx
│   └── middleware.ts
├── components/
│   ├── ClimateWidget.tsx
│   ├── InternalLinkingFooter.tsx
│   └── SchemaInjector.tsx
├── articles/
│   ├── manual-eficiencia-energetica.md
│   ├── analise-tendencias-utilidades-domesticas.md
│   └── guia-hardware-tecnologia.md
├── scripts/
│   ├── generate-sitemap.js
│   └── seed-tenants.js
├── migrations/
│   └── 001_create_tenant_content.sql
├── cities-list.json                 # 64 cidades
├── package.json
└── README_DEPLOY.md
```

---

## 🚀 COMANDOS PARA EXECUÇÃO REAL (usar credenciais do .env.production)

### Passo 1: Clonar e Configurar Repositório

```bash
# No seu ambiente local ou servidor
git clone https://github.com/soybabydani-ops/aquitemachadinhos.git
cd aquitemachadinhos

# Copiar estrutura gerada
cp -r /home/user/portal-updates/* ./

# Instalar dependências
npm install
```

### Passo 2: Configurar Variáveis de Ambiente

Crie `.env.local` com o conteúdo de `/home/user/.env.production`:

```env
SUPABASE_URL=https://supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-real-com-letras-e-numeros
SUPABASE_ANON_KEY=sua-chave-anonima-real-com-letras-e-numeros
GITHUB_ACCESS_TOKEN=seu-token-pessoal-gh-real-que-comeca-com-ghp-ou-github-pat
VERCEL_AUTH_TOKEN=seu-token-da-vercel-real-com-letras-e-numeros
```

### Passo 3: Aplicar Migrations no Supabase

```bash
# Via Supabase CLI ou Dashboard SQL Editor
psql $SUPABASE_URL -f migrations/001_create_tenant_content.sql

# Ou cole o conteúdo da migration no SQL Editor do Supabase
```

### Passo 4: Popular os 64 Tenants

```bash
node scripts/seed-tenants.js
```

### Passo 5: Gerar Sitemap Dinâmico

```bash
npm run generate-sitemap
```

### Passo 6: Build e Deploy

```bash
npm run build

# Deploy na Vercel
npx vercel --prod
# ou
vercel --prod
```

---

## 📌 PRÓXIMOS PASSOS OBRIGATÓRIOS

1. Substituir todas as chaves placeholder por valores reais
2. Adicionar API keys de anúncios (Adsterra/PropellerAds) nos componentes
3. Configurar domínio customizado no Vercel (se ainda não estiver)
4. Submeter sitemap no Google Search Console
5. Testar redirecionamentos 301

---

**Status:** Código completo gerado e pronto para ingestão em produção.

**Próxima ação esperada:** "Execute o deploy" ou "Aplique as migrations agora".