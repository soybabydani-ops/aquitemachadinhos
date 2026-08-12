/**
 * GERADOR AUTOMÁTICO DE FEED XML DO PINTEREST (PINTEREST CATALOG & RSS 2.0)
 * Gera feed de produtos para criação de Pins automáticos 24h por dia.
 */

const fs = require('fs');
const path = require('path');
const { BUGS_DATA, LOOKS_DATA } = require('./seeder-alta-frequencia-cinco-sistemas');
const { TRAVEL_GEAR_DATA } = require('./seeder-global-destinos-travel-gear');

const ALL_PINTEREST_ITEMS = [
  ...BUGS_DATA.map(b => ({
    id: `bug-${b.slug}`,
    title: `🚨 BUG DE PREÇO: ${b.nome} (${b.desconto}% OFF)`,
    description: `Oferta relâmpago na ${b.loja}: ${b.nome} de ${b.normal} por apenas ${b.bug}. Resgate seu cupom no Aqui Tem Achadinhos.`,
    link: `https://www.aquitemachadinhos.com.br/cupons-ativos/${b.slug}.html`,
    affiliateLink: b.link,
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: `${b.bug.replace('R$', '').trim()} BRL`,
    brand: b.loja,
    category: 'Achadinhos & Cupons'
  })),
  ...LOOKS_DATA.map(l => ({
    id: `look-${l.slug}`,
    title: `🤠 LOOK BARRETOS: ${l.nome} (${l.desconto}% OFF)`,
    description: `Moda country e sertaneja para a Festa do Peão: ${l.nome} por apenas ${l.promo}. Inspiração: ${l.inspiracao}.`,
    link: `https://www.aquitemachadinhos.com.br/looks/${l.slug}.html`,
    affiliateLink: l.link,
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: `${l.promo.replace('R$', '').trim()} BRL`,
    brand: l.marca,
    category: 'Moda & Vestuário > Country'
  })),
  ...TRAVEL_GEAR_DATA.map(g => ({
    id: `gear-${g.slug}`,
    title: `✈️ ESSENCIAIS DE VIAGEM: ${g.nome} (${g.desconto}% OFF)`,
    description: `Equipamento de viagem indispensável: ${g.nome} saindo de ${g.normal} por apenas ${g.promo} na ${g.loja}.`,
    link: `https://www.aquitemachadinhos.com.br/malas-e-viagem/${g.slug}.html`,
    affiliateLink: g.link,
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: `${g.promo.replace('R$', '').trim()} BRL`,
    brand: g.loja,
    category: `Viagem & Malas > ${g.cat}`
  }))
];

function gerarXMLPinterest() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AQUITEM Achadinhos &amp; Ofertas Virais - Catálogo Pinterest</title>
    <link>https://www.aquitemachadinhos.com.br</link>
    <description>Feed oficial de produtos virais, achadinhos e cupons de desconto do Mercado Livre, Shopee, Amazon e SHEIN.</description>
`;

  ALL_PINTEREST_ITEMS.forEach(p => {
    xml += `    <item>
      <g:id>${p.id}</g:id>
      <title><![CDATA[${p.title}]]></title>
      <description><![CDATA[${p.description}]]></description>
      <link>${p.link}</link>
      <g:image_link>${p.image}</g:image_link>
      <g:price>${p.price}</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand><![CDATA[${p.brand}]]></g:brand>
      <g:product_type><![CDATA[${p.category}]]></g:product_type>
      <g:custom_label_0><![CDATA[${p.affiliateLink}]]></g:custom_label_0>
    </item>
`;
  });

  xml += `  </channel>
</rss>`;

  return xml;
}

const xmlContent = gerarXMLPinterest();
fs.writeFileSync(path.join(__dirname, '..', 'pinterest-catalog.xml'), xmlContent, 'utf8');
console.log(`✓ Feed do Pinterest gerado: pinterest-catalog.xml (${ALL_PINTEREST_ITEMS.length} itens catalogados, ${Buffer.byteLength(xmlContent)} bytes)`);
