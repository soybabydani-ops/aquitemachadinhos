/**
 * AQUITEM ACHADINHOS — GERADOR DO PINTEREST GLOBAL CATALOG (XML INTERNACIONAL)
 * Feed RSS 2.0 / Pinterest Catalog em Inglês e Espanhol com moedas USD / EUR.
 */

const fs = require('fs');
const path = require('path');
const { DESTINOS_MASTER } = require('./seeder-global-destinos-travel-gear');

const REPO_ROOT = path.join(__dirname, '..');

const GLOBAL_PINTEREST_ITEMS = DESTINOS_MASTER.map(d => {
  const priceVal = d.tarifa.includes('USD') ? d.tarifa.split('USD')[1].trim() : (d.tarifa.includes('EUR') ? d.tarifa.split('EUR')[1].trim() : '199');
  const currency = d.tarifa.includes('EUR') ? 'EUR' : 'USD';

  return {
    id: `global-dest-${d.slug}`,
    title: `⚠️ PRICE DROP: Secret Flight & Hotel Deals in ${d.cidade} (${d.pais})`,
    description: `Airline price error detected! ${d.desc_en} Book before seats sell out at ${d.cidade}.`,
    link: `https://www.aquitemachadinhos.com.br/en/destinations/${d.slug}-cheap-flights-hotel-deals.html`,
    affiliateLink: `https://www.aquitemachadinhos.com.br/ir.html?url=https%3A%2F%2Fmeli.la%2F1U3rtgV&origem=pinterest_global_${d.slug}`,
    image: `https://www.aquitemachadinhos.com.br/assets/pins-global/${d.slug}-global-badge.svg`,
    price: `${priceVal}.00 ${currency}`,
    brand: 'AQUITEM Global Travel',
    category: 'Travel & Vacations > Flights & Hotels'
  };
});

function gerarXMLPinterestGlobal() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>AQUITEM Global Travel &amp; Secret Fares - International Pinterest Catalog</title>
    <link>https://www.aquitemachadinhos.com.br/en/destinations</link>
    <description>Official high-CPM international product feed for global flight deals, luxury resort errors, and travel gear.</description>
`;

  GLOBAL_PINTEREST_ITEMS.forEach(p => {
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

const xmlContent = gerarXMLPinterestGlobal();
fs.writeFileSync(path.join(REPO_ROOT, 'pinterest-global-catalog.xml'), xmlContent, 'utf8');
console.log(`✓ Feed do Pinterest Global gerado: pinterest-global-catalog.xml (${GLOBAL_PINTEREST_ITEMS.length} itens internacionais, ${Buffer.byteLength(xmlContent)} bytes)`);
