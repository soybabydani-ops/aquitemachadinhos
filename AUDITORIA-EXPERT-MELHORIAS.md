# 🔬 AUDITORIA EXPERT — O que ajustar, falta e agregar
### Aqui Tem Achadinhos · Análise sênior de produto/web (priorizada por impacto)

---

## 🥇 TIER 1 — Alto impacto (recomendo fazer primeiro)

### 1. 🔐 Contas próprias p/ lojistas e motoristas (self-service) — **o maior gap**
- **Hoje:** só você (admin) gerencia tudo. Lojista/motorista não tem login próprio.
- **Por que importa:** pra escalar (dezenas/centenas de lojas), cada um precisa editar SUA loja/ofertas/fotos/disponibilidade sozinho — sem você no meio.
- **O que fazer:** login (Supabase Auth) + vínculo loja↔dono (owner_id) + RLS por dono + painel self-service. É o salto de "site gerenciado" pra "plataforma de verdade".

### 2. 🗜️ Compressão de imagem no upload (performance)
- **Hoje:** fotos até 3MB vão inteiras → site pesado com muitas lojas.
- **O que fazer:** redimensionar/comprimir a imagem **no navegador antes de enviar** (ex.: max 1200px, JPEG 80%). Site voa + economiza storage. Fácil e impacto enorme.

### 3. ⏳ Estados de carregamento + tratamento de erro (UX profissional)
- **Hoje:** conteúdo aparece "do nada" (sem loading); se falha, fica vazio silencioso.
- **O que fazer:** skeletons/spinners enquanto carrega + mensagens amigáveis de erro/offline. Parece muito mais profissional.

### 4. 🗺️ Sitemap dinâmico (SEO) — lojas no Google
- **Hoje:** sitemap estático (só páginas fixas). Lojas individuais não entram.
- **O que fazer:** uma *edge function* que gera o sitemap com todas as lojas ativas → cada loja vira uma URL indexável. **Essencial** pra "aparecer no Google".

### 5. 🚩 Botão "Denunciar" (confiança/segurança)
- **Hoje:** não há como um usuário sinalizar conteúdo errado.
- **O que fazer:** botão "Denunciar" em loja/motorista/avaliação → vai pra uma fila no admin. Combate spam/conteúdo inadequado.

---

## 🥈 TIER 2 — Médio impacto

### 6. 📍 "Perto de você" nas listagens (não só no mapa)
- Hoje só o mapa tem GPS. Listagens (categoria/busca) poderiam ordenar por distância.

### 7. ⭐ Favoritos (salvar lojas) — engajamento
- Usuário salva lojas (localStorage) → volta mais. Aumenta retenção.

### 8. 🕒 Horário estruturado ("aberto agora")
- Hoje o horário é texto livre. Estruturar (dias/horas) + selo "Aberto agora" = ótimo pra turista.

### 9. 🔔 Prompt de instalação do app (PWA)
- Oferecer "Instalar app" no celular (captura de tela inicial). Aumenta retorno.

### 10. 📄 Página 404 amigável
- Hoje, URL errada → tela genérica. Uma 402/404 bonita com busca/links melhora a experiência.

### 11. 🍪 Banner de cookies (LGPD) — ao ativar analytics
- Quando ligar o Plausible/Vercel Analytics, é preciso o banner de consentimento (já tenho a base pronta).

### 12. ✅ Fluxo de "empresa verificada"
- Hoje o selo existe mas não há processo. Definir critérios (ex.: foto do local/CNPJ) e um fluxo de verificação → mais confiança.

---

## 🥉 TIER 3 — Bom pra depois (crescimento)

### 13. 📄 Páginas individuais de oferta (/oferta/id) + compartilhar
- Cada oferta com página própria + link de WhatsApp "vi esta oferta no guia".

### 14. 🎟️ Cupons/códigos de oferta
- O campo "código da oferta" já existe no banco; bastar exibir/validar.

### 15. 📧 Automações de e-mail
- Confirmação de cadastro, oferta aprovada, lembrete de completar perfil, relatório mensal. (Precisa serviço de e-mail.)

### 16. 🤝 Indicação (referral)
- Lojista indica outro lojista → ganha benefício. Crescimento orgânico.

### 17. 📰 Newsletter / captura de e-mail de consumidores
- Lista de e-mail pra enviar "achadinhos da semana".

---

## 🔧 AJUSTES FINOS (polimento milimétrico)

| Onde | Ajuste |
|---|---|
| 🏠 Botões "Assinar" | Hoje aparecem pra todos no perfil. Tornar discretos ("É dono? Assinar") pra não poluir a vista do consumidor. |
| 🖼️ Logo do app | O ícone "A" é bom; dá pra refinar pra um símbolo mais icônico (sacola/pino) se quiser. |
| 🔎 Busca | Adicionar sugestões automáticas enquanto digita (lojas/categorias populares). |
| 📱 Mobile | Revisar todos os toques ≥44px e zero scroll horizontal em telas pequenas. |
| 🎨 Microinterações | Adicionar transições suaves ao abrir FAQ, filtros, etc. (já tem algumas). |
| ♿ Acessibilidade | Revisar contraste, `alt` em todas as imagens, navegação por teclado (parcial). |
| ⚡ app.js | Está em um arquivo (~90KB). Dá pra deixar só o essencial no início e carregar o resto sob demanda (code-splitting) — mas é detalhe. |

---

## 🎯 MINHA RECOMENDAÇÃO DE EXECUÇÃO
1. **Faça o Tier 1 (1 a 5)** — é onde está o maior salto de qualidade/escala.
2. Depois, **ative o Vercel Analytics** (grátis) + banner de cookies (Tier 2.11) pra ter dados.
3. Tier 3 conforme o negócio crescer.

> 💡 Se eu fosse escolher **UM só** pra fazer agora: **as contas próprias (Tier 1.1)** — é o que transforma de "site que você administra" em "plataforma que roda sozinha". Mas é o maior build. O **Tier 1.2 (compressão de imagens)** é o de melhor custo-benefício imediato (rápido + impacto grande na velocidade).
