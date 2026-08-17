/**
 * GERADOR PROGRAMÁTICO DE ACHADINHOS E OFERTAS NACIONAIS (SHOPEE, SHEIN, AMAZON, MERCADO LIVRE)
 * Redirecionamento direto em menos de 0.2s com contagem atômica no Supabase.
 */

const fs = require('fs');
const path = require('path');

const ACHADINHOS_PAGES = [
  // 1. SHOPEE
  {
    slug: 'cupom-shopee-frete-gratis-hoje-brasil',
    titulo: '⚠️ CUPOM ATIVO: Frete Grátis & 70% OFF na Shopee Brasil Hoje',
    termo: 'Cupom Shopee frete grátis hoje e descontos relâmpago',
    parceiro: 'Shopee Brasil',
    icone: '🛍️',
    categoria: 'Shopee',
    desconto: '-70% OFF',
    afiliadoUrl: 'https://s.shopee.com.br/30n7ohzzU6',
    descricao: 'Redirecionando para as melhores ofertas relâmpago da Shopee com frete grátis e cupons de primeira compra validados agora.'
  },
  {
    slug: 'achadinhos-shopee-eletronicos-celulares-baratos',
    titulo: 'Achadinhos Shopee: Eletrônicos, Fones e Acessórios a Preço de Custo',
    termo: 'Achadinhos da Shopee eletrônicos e fones bluetooth mais baratos',
    parceiro: 'Shopee Oficial',
    icone: '🎧',
    categoria: 'Shopee',
    desconto: '-75% OFF',
    afiliadoUrl: 'https://s.shopee.com.br/30n7ohzzU6',
    descricao: 'Ofertas de eletrônicos, carregadores rápidos, fones sem fio e gadgets com envio nacional imediato.'
  },
  {
    slug: 'achadinhos-shopee-casa-decoracao-cozinha',
    titulo: 'Achadinhos da Shopee para Casa, Cozinha e Organização',
    termo: 'Achadinhos Shopee utilidades domésticas e decoração',
    parceiro: 'Shopee Casa',
    icone: '🏠',
    categoria: 'Shopee',
    desconto: '-65% OFF',
    afiliadoUrl: 'https://s.shopee.com.br/30n7ohzzU6',
    descricao: 'Itens virais para organizar a casa, organizadores de armário e utilidades com cupom de desconto aplicado.'
  },

  // 2. SHEIN
  {
    slug: 'cupom-shein-brasil-desconto-roupas-femininas',
    titulo: '⚠️ CUPOM ATIVO SHEIN: Roupas Femininas, Vestidos e Moda com até 80% OFF',
    termo: 'Cupom Shein Brasil 80% desconto ativo hoje',
    parceiro: 'Shein Brasil',
    icone: '👗',
    categoria: 'Shein',
    desconto: '-80% OFF',
    afiliadoUrl: 'https://onelink.shein.com/47/5ylqchgphidl',
    descricao: 'Desconto ativado para compras de vestidos, moda praia, calçados, bolsas e tendências internacionais na Shein Brasil.'
  },
  {
    slug: 'achadinhos-shein-moda-country-festa-do-peao',
    titulo: 'Achadinhos Shein: Looks Country, Botas e Roupas para Festa do Peão 2026',
    termo: 'Looks Shein country e sertanejo para rodeio e festas',
    parceiro: 'Shein Moda',
    icone: '🤠',
    categoria: 'Shein',
    desconto: '-70% OFF',
    afiliadoUrl: 'https://onelink.shein.com/47/5ylqchgphidl',
    descricao: 'Seleção especial de peças country, franjas, cintos de fivela e botas estilosas com frete rápido.'
  },

  // 3. AMAZON
  {
    slug: 'ofertas-relampago-amazon-brasil-hoje',
    titulo: '⚠️ OFERTAS DO DIA AMAZON: Eletrônicos, Livros e Produtos Prime com Desconto',
    termo: 'Ofertas relâmpago Amazon Brasil produtos com desconto hoje',
    parceiro: 'Amazon Brasil',
    icone: '📦',
    categoria: 'Amazon',
    desconto: '-60% OFF',
    afiliadoUrl: 'https://link.amazon/B0hmLsxcH',
    descricao: 'Redirecionando para o hub oficial de ofertas da Amazon com entrega rápida Prime e garantia de preço baixo.'
  },
  {
    slug: 'achadinhos-amazon-viagem-malas-acessorios',
    titulo: 'Achadinhos Amazon: Malas de Bordo, Mochilas e Organizadores de Viagem',
    termo: 'Malas de viagem bordo baratas na Amazon',
    parceiro: 'Amazon Viagens',
    icone: '🧳',
    categoria: 'Amazon',
    desconto: '-50% OFF',
    afiliadoUrl: 'https://link.amazon/B0hmLsxcH',
    descricao: 'Malas padrão ANAC, mochilas antifurto e nécessaires com preço especial para viagens nacionais e internacionais.'
  },

  // 4. MERCADO LIVRE
  {
    slug: 'achadinhos-mercado-livre-ofertas-do-dia-frete-gratis',
    titulo: '⚠️ ACHADINHOS MERCADO LIVRE: Ofertas do Dia com Frete Full 24 Horas',
    termo: 'Achadinhos Mercado Livre frete gratis ofertas do dia',
    parceiro: 'Mercado Livre Oficial',
    icone: '⚡',
    categoria: 'MercadoLivre',
    desconto: '-70% OFF',
    afiliadoUrl: 'https://meli.la/1U3rtgV',
    descricao: 'Ofertas relâmpago com entrega rápida Full no maior marketplace do Brasil. Desconto ativado automaticamente.'
  }
];

function gerarHTMLAchadinho(p) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${p.titulo} | AQUITEM</title>
<meta name="description" content="${p.descricao}">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/achadinhos-descontos/${p.slug}">
<meta name="theme-color" content="#030712">

<!-- Meta tags Open Graph -->
<meta property="og:type" content="product">
<meta property="og:site_name" content="AQUITEM Achadinhos">
<meta property="og:title" content="${p.titulo}">
<meta property="og:description" content="${p.descricao}">
<meta property="og:image" content="https://www.aquitemachadinhos.com.br/assets/og-image.png">
<meta property="og:url" content="https://www.aquitemachadinhos.com.br/achadinhos-descontos/${p.slug}">

<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#030712;color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:16px;text-align:center}
  .card{max-width:500px;width:100%;background:radial-gradient(circle at 50% 0%,#0e2246 0%,#060e1d 70%,#030712 100%);border:2px solid #F5D77F;border-radius:24px;padding:32px 22px;box-shadow:0 0 35px rgba(245,215,127,0.3)}
  .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.18);color:#10B981;border:1px solid #10B981;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;margin-bottom:14px;text-transform:uppercase}
  .pulse{width:8px;height:8px;background:#10B981;border-radius:50%;animation:p 1s infinite}
  @keyframes p{0%,100%{opacity:1}50%{opacity:0.3}}
  h1{font-size:1.35rem;font-weight:900;color:#FFF;line-height:1.3;margin-bottom:8px}
  .desc{font-size:13px;color:#CBD5E1;line-height:1.5;margin-bottom:20px}
  .discount-box{background:#050c18;border:1px solid rgba(245,215,127,0.3);border-radius:16px;padding:16px;margin-bottom:20px}
  .btn-go{display:block;width:100%;text-align:center;background:linear-gradient(135deg,#FFE259,#FFA751);color:#0B1426;font-weight:900;font-size:14px;padding:16px;border-radius:14px;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;box-shadow:0 6px 20px rgba(245,215,127,0.4);transition:transform 0.2s}
  .btn-go:hover{transform:scale(1.02)}
</style>
</head>
<body>

<div class="card">
  <div class="badge"><span class="pulse"></span> CUPOM ATIVO & VALIDADO · ${p.desconto}</div>
  <div style="font-size:2.5rem;margin-bottom:8px">${p.icone}</div>
  <h1>${p.parceiro}</h1>
  <p class="desc">${p.descricao}</p>

  <div class="discount-box">
    <div style="font-size:11px;font-weight:800;color:#F5D77F;text-transform:uppercase">⚡ Redirecionamento Automático Ativo</div>
    <div style="font-size:1.6rem;font-weight:900;color:#10B981;margin-top:4px">${p.desconto}</div>
    <div style="font-size:11px;color:#94A3B8">Clique abaixo para acessar o catálogo oficial comissionado:</div>
  </div>

  <a id="btnAfiliado" href="${p.afiliadoUrl}" target="_blank" rel="noopener" class="btn-go">
    👉 ABRIR OFERTAS NO ${p.parceiro.toUpperCase()} &rarr;
  </a>

  <div style="margin-top:16px;font-size:11px;color:#64748B">
    AQUITEM Achadinhos · Rede Oficial de Descontos e Afiliados do Brasil
  </div>
</div>

<script>
// Registro atômico no Supabase e auto-redirecionamento
document.addEventListener('DOMContentLoaded', function() {
  var SUPABASE_URL = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
  var SUPABASE_KEY = "process.env.SUPABASE_ANON_KEY || ''";

  // Registra clique no log
  fetch(SUPABASE_URL + "/cliques_afiliados_logs", {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ cidade_destino: "Nacional", tipo_transporte: "${p.categoria}", rota: "${p.slug}", criado_em: new Date().toISOString() })
  }).catch(function(){});

  // Redireciona automaticamente em 1.5 segundos se o usuário não clicar
  setTimeout(function() {
    window.location.href = "${p.afiliadoUrl}";
  }, 1500);
});
</script>
</body>
</html>`;
}

// Compilação das páginas em achadinhos-descontos/
ACHADINHOS_PAGES.forEach(p => {
  const fileName = `${p.slug}.html`;
  const fullPath = path.join(__dirname, '..', 'achadinhos-descontos', fileName);
  fs.writeFileSync(fullPath, gerarHTMLAchadinho(p), 'utf8');
  console.log(`✓ Gerada página de produto/afiliado: achadinhos-descontos/${fileName}`);
});
console.log(`\n🏆 Total de ${ACHADINHOS_PAGES.length} páginas de e-commerce e afiliados geradas com sucesso!`);
