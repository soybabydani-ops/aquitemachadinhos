# 🗄️ COMO CONFIGURAR O BANCO DE DADOS (Supabase) — passo a passo

> É **grátis** e leva ~10 minutos. Isso transforma o site numa plataforma de verdade
> (lojas vistas por todos, fotos, login, métricas). Eu te guio em cada clique.

---

## 1) Criar a conta
1. Acesse **https://supabase.com** → **"Start your project"** (ou "Sign up").
2. Entre com **GitHub** ou **e-mail** (grátis, sem cartão).

## 2) Criar o projeto
3. Clique em **"New project"**.
4. **Name:** `Aqui Tem Achadinhos` (ou qualquer nome).
5. **Database Password:** crie uma senha forte e **guarde** (anote num lugar seguro — eu não preciso dela).
6. **Region:** escolha a mais próxima (ex.: **South America (São Paulo)**).
7. Clique em **"Create new project"** e aguarde ~2 min (ele prepara o banco).

## 3) Criar as tabelas (rodar o SQL)
8. No menu esquerdo, clique em **"SQL Editor"** → **"New query"**.
9. **Abra o arquivo `supabase-schema.sql`** (que está nesta pasta), **copie tudo** e **cole** na tela do SQL Editor.
10. Clique em **"Run"** (ou CTRL+Enter). Vai aparecer *"Success. No rows returned."* ✅
    - Isso criou as tabelas, a segurança (RLS) e as categorias de Barretos.

## 4) Pegar a URL e a chave
11. No menu esquerdo, vá em **"Project Settings"** (ícone de engrenagem) → **"API"**.
12. Copie dois valores:
    - **Project URL** (ex.: `https://abcdxxxx.supabase.co`)
    - **anon public key** (uma chave longa)

## 5) Ligar no site
13. Abra o arquivo **`assets/app.js`** (desta pasta `ata-v2`).
14. No topo, no bloco `CONFIG`, preencha:
    ```js
    supabase: {
      url: 'COLE_A_URL_AQUI',
      anonKey: 'COLE_A_ANON_KEY_AQUI'
    }
    ```
15. Salve. ✅ Pronto! O site passa a usar o banco de dados real.

---

## 🔒 Sobre segurança (já configurada no SQL)
- O público **só vê empresas ativas** e **ofertas válidas** (não vencidas).
- Todo cadastro novo entra como **"pendente"** — **só você aprova** (no painel admin).
- Lojista **não consegue auto-aprovar** oferta/empresa (o banco impede).
- **Senhas:** nunca ficam em texto aberto (o login, quando ativarmos, usa o sistema seguro do Supabase).

## ❓ Se travar em alguma tela
Me descreve o que apareceu (título + botões) que eu te ajudo. Não me mande senhas — só a **URL** e a **anon key** (essas duas são de uso público por design, não são secretas).
