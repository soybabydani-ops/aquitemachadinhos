/**
 * GERADOR AUTOMÁTICO DE FEED XML DO PINTEREST (PINTEREST CATALOG & RSS 2.0)
 * Gera feed de produtos para criação de Pins automáticos 24h por dia.
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_FOR_PINTEREST = [
  {
    id: 'shopee-fone-tws',
    title: 'Fone de Ouvido Sem Fio Bluetooth TWS Cancelamento Ruído',
    description: 'Fone TWS bluetooth potente com cancelamento de ruído, som surround HD e bateria de 28h com frete grátis na Shopee.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-fone-tws-noise-cancelling.html',
    affiliateLink: 'https://s.shopee.com.br/30n7ohzzU6',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '38.90 BRL',
    brand: 'Shopee Brasil',
    category: 'Eletrônicos > Áudio'
  },
  {
    id: 'shein-kit-vestidos',
    title: 'Kit 3 Vestidos Femininos Casuais Tendência Verão Shein',
    description: 'Vestidos femininos leves, caimento perfeito e tecido acetinado premium. Tendência de moda feminina na Shein Brasil.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-kit-vestidos-elegance-shein.html',
    affiliateLink: 'https://onelink.shein.com/47/5ylqchgphidl',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '54.90 BRL',
    brand: 'SHEIN Brasil',
    category: 'Vestuário & Acessórios > Roupas'
  },
  {
    id: 'shein-bota-western',
    title: 'Bota Texana Feminina Western Cano Médio Bordada Rodeio 2026',
    description: 'Bota country texana com bordados finos e palmilha acolchoada para Festas do Peão e rodeios sertanejos.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-bota-western-country-shein.html',
    affiliateLink: 'https://onelink.shein.com/47/5ylqchgphidl',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '89.90 BRL',
    brand: 'SHEIN Brasil',
    category: 'Calçados > Botas'
  },
  {
    id: 'amazon-mala-bordo',
    title: 'Mala de Viagem de Bordo Rígida Padrão ANAC Rodas 360°',
    description: 'Mala de bordo em ABS de alta resistência, rodas duplas 360 graus e cadeado de segurança na Amazon.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-mala-viagem-bordo-360-amazon.html',
    affiliateLink: 'https://link.amazon/B0hmLsxcH',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '169.00 BRL',
    brand: 'Amazon Brasil',
    category: 'Viagem & Malas'
  },
  {
    id: 'amazon-powerbank',
    title: 'Carregador Portátil Power Bank 20.000mAh Turbo Fast Charge',
    description: 'Bateria externa turbo com display digital, saídas USB-C e Lightning para celulares e tablets na Amazon.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-powerbank-turbo-20000mah-amazon.html',
    affiliateLink: 'https://link.amazon/B0hmLsxcH',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '74.90 BRL',
    brand: 'Amazon Brasil',
    category: 'Eletrônicos > Baterias'
  },
  {
    id: 'ml-panelas-inducao',
    title: 'Jogo de Panelas 5 Peças Antiaderente Cerâmica Cerâmica Full Indução',
    description: 'Conjunto completo de panelas cerâmicas antiaderentes com cabos soft touch amadeirados no Mercado Livre Full.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-jogo-panelas-ceramica-inducao-ml.html',
    affiliateLink: 'https://meli.la/1U3rtgV',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '179.00 BRL',
    brand: 'Mercado Livre',
    category: 'Casa & Cozinha'
  },
  {
    id: 'ml-robo-aspirador',
    title: 'Robô Aspirador de Pó Inteligente 3 em 1 Varre, Aspira e Passa Pano',
    description: 'Robô aspirador bivolt com sensores antiqueda e envio Full 24h em todo o Brasil pelo Mercado Livre.',
    link: 'https://www.aquitemachadinhos.com.br/achadinhos/oferta-urgente-robo-aspirador-inteligente-ml.html',
    affiliateLink: 'https://meli.la/1U3rtgV',
    image: 'https://www.aquitemachadinhos.com.br/assets/og-image.png',
    price: '129.90 BRL',
    brand: 'Mercado Livre',
    category: 'Smart Home'
  }
];

function gerarXMLPinterest() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AQUITEM Achadinhos & Ofertas Virais - Catálogo Pinterest</title>
    <link>https://www.aquitemachadinhos.com.br</link>
    <description>Feed oficial de produtos virais, achadinhos e cupons de desconto do Mercado Livre, Shopee, Amazon e SHEIN.</description>
`;

  PRODUCTS_FOR_PINTEREST.forEach(p => {
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
console.log('✓ Feed do Pinterest gerado: pinterest-catalog.xml (' + Buffer.byteLength(xmlContent) + ' bytes)');
