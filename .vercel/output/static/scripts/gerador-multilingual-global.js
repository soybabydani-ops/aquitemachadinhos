/**
 * GERADOR MULTILÍNGUE DE PÁGINAS INTERNACIONAIS (EN & ES) COM HREFLANG
 * Captura de tráfego de alto poder aquisitivo (USD & EUR) para o Brasil e São Paulo.
 */

const fs = require('fs');
const path = require('path');

const GLOBAL_PAGES = [
  // ENGLISH (EN)
  {
    lang: 'en',
    dir: 'en',
    slug: 'last-minute-flights-miami-to-sao-paulo-gru',
    title: '⚠️ Last-Minute Flights from Miami to São Paulo (GRU) - Secret Fares Detected',
    desc: 'Algorithmic fare drop detected: Direct and 1-stop flights from Miami (MIA) to São Paulo (GRU) up to 65% off. Book verified partner seats.',
    h1: 'Last-Minute Flights from Miami to São Paulo (GRU) from $389 USD',
    dealPrice: '$389 USD',
    normalPrice: '$890 USD',
    btnText: '👉 UNLOCK SECRET FARE & BOOK NOW &rarr;',
    affiliateUrl: 'https://www.booking.com/index.html?aid=aquitem_nacional&lang=en',
    localAdvice: 'Looking for verified airport transfer or private executive cars in São Paulo? Connect directly via WhatsApp.'
  },
  {
    lang: 'en',
    dir: 'en',
    slug: 'cheap-private-transfer-gru-airport-to-sao-paulo',
    title: 'Fast Private Transfer from GRU Airport to São Paulo (Paulista & Hotels)',
    desc: 'Executive airport transfer from Guarulhos GRU to Av. Paulista, Jardins and Faria Lima. Direct English-speaking support on WhatsApp.',
    h1: 'Executive Private Transfer from GRU Airport to São Paulo Hotels',
    dealPrice: '$35 USD',
    normalPrice: '$95 USD',
    btnText: '💬 BOOK PRIVATE TRANSFER ON WHATSAPP &rarr;',
    affiliateUrl: 'https://wa.me/5511991238899?text=Hello!%20I%20need%20a%20private%20airport%20transfer%20from%20GRU%20to%20Sao%20Paulo.',
    localAdvice: 'Official drivers verified by AQUITEM Brazil with 24/7 flight tracking and airport meet-and-greet.'
  },
  {
    lang: 'en',
    dir: 'en',
    slug: 'emergency-hotels-near-guarulhos-airport',
    title: '⚠️ EMERGENCY ALLOCATION: Best Hotels with Free Shuttle near Guarulhos Airport - Book Now',
    desc: 'Missed flight or long layover at GRU? Best hotels with free 24/7 airport shuttle and guaranteed room availability.',
    h1: 'Emergency Hotels with Free Shuttle Near GRU Airport (São Paulo)',
    dealPrice: '$49 USD / night',
    normalPrice: '$130 USD',
    btnText: '🏨 VIEW VERIFIED AIRPORT HOTELS &rarr;',
    affiliateUrl: 'https://www.booking.com/index.html?aid=aquitem_nacional&lang=en',
    localAdvice: 'Instant check-in available 24/7 with direct WhatsApp support.'
  },

  // SPANISH (ES)
  {
    lang: 'es',
    dir: 'es',
    slug: 'vuelos-baratos-buenos-aires-a-sao-paulo-gru',
    title: '⚠️ Vuelos Baratos de Buenos Aires a São Paulo (GRU) - Oferta de Última Hora',
    desc: 'Tarifas residuales de vuelos directos de Buenos Aires (EZE/AEP) a São Paulo (GRU). Hasta 60% de descuento verificado.',
    h1: 'Vuelos Baratos de Buenos Aires a São Paulo desde $189 USD',
    dealPrice: '$189 USD',
    normalPrice: '$420 USD',
    btnText: '👉 ACTIVAR TARIFA PROMOCIONAL &rarr;',
    affiliateUrl: 'https://www.booking.com/index.html?aid=aquitem_nacional&lang=es',
    localAdvice: '¿Necesitas traslado en São Paulo o alojamiento sin comisiones? Contacta directamente por WhatsApp.'
  },
  {
    lang: 'es',
    dir: 'es',
    slug: 'traslados-privados-aeropuerto-gru-a-sao-paulo',
    title: 'Traslados Privados y Vans del Aeropuerto GRU a São Paulo y Santos',
    desc: 'Servicio ejecutivo de transfer desde el aeropuerto de Guarulhos a Av. Paulista, Hoteles de SP y Puerto de Santos.',
    h1: 'Traslados Ejecutivos del Aeropuerto GRU a São Paulo',
    dealPrice: '$32 USD',
    normalPrice: '$80 USD',
    btnText: '💬 RESERVAR TRASLADO POR WHATSAPP &rarr;',
    affiliateUrl: 'https://wa.me/5511991238899?text=Hola!%20Necesito%20un%20traslado%20privado%20desde%20GRU%20a%20Sao%20Paulo.',
    localAdvice: 'Conductores oficiales verificados por la red AQUITEM Brasil con seguimiento de vuelo en tiempo real.'
  },
  {
    lang: 'es',
    dir: 'es',
    slug: 'hoteles-y-pousadas-con-descuento-en-brasil',
    title: 'Hoteles, Chalets y Pousadas Boutique en Brasil sin Comisiones',
    desc: 'Reserva directa con propietarios en Barretos, Gramado, São Paulo y principales destinos turísticos de Brasil.',
    h1: 'Hoteles y Pousadas Boutique en Brasil con Descuento Directo',
    dealPrice: '-45% OFF',
    normalPrice: 'Tarifa Agencia',
    btnText: '🏨 VER HOTELES Y POUSADAS VERIFICADAS &rarr;',
    affiliateUrl: 'https://www.booking.com/index.html?aid=aquitem_nacional&lang=es',
    localAdvice: 'Contacto directo por WhatsApp con posadas y anfitriones en más de 60 ciudades de Brasil.'
  }
];

function gerarHTMLGlobal(p) {
  const altLang = p.lang === 'en' ? 'es' : 'en';
  return `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${p.title}</title>
<meta name="description" content="${p.desc}">
<link rel="canonical" href="https://www.aquitemachadinhos.com.br/${p.dir}/${p.slug}">
<link rel="alternate" hreflang="${p.lang}" href="https://www.aquitemachadinhos.com.br/${p.dir}/${p.slug}">
<link rel="alternate" hreflang="${altLang}" href="https://www.aquitemachadinhos.com.br/viagens.html">
<link rel="alternate" hreflang="x-default" href="https://www.aquitemachadinhos.com.br/viagens.html">
<meta name="theme-color" content="#030712">
<link rel="stylesheet" href="../assets/tailwind.css">
<link rel="stylesheet" href="../assets/styles.css?v=28.0">
<style>
  body { background-color: #030712; color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .box-global { background: radial-gradient(circle at 50% 0%, #0d2244 0%, #050d1a 65%, #030712 100%); border: 2px solid #10B981; box-shadow: 0 0 35px rgba(16,185,129,0.25); }
</style>
</head>
<body class="min-h-screen flex flex-col p-4 sm:p-6">
<div class="max-w-2xl mx-auto w-full my-auto">
  <div class="box-global rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl">
    <div class="flex items-center justify-between text-xs font-mono border-b border-emerald-500/30 pb-3 mb-5 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-emerald-400 font-bold uppercase tracking-widest text-[11px]">${p.lang === 'en' ? 'LIVE FARE MONITOR · ACTIVE' : 'MONITOR EN VIVO · ACTIVO'}</span>
      </div>
      <span class="text-amber-300 font-mono font-bold" id="intlTimer">${p.lang === 'en' ? 'EXPIRES IN: 18:42 MIN' : 'EXPIRA EN: 18:42 MIN'}</span>
    </div>

    <h1 class="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">${p.h1}</h1>
    <p class="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">${p.desc}</p>

    <div class="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-center justify-between mb-6">
      <div>
        <span class="text-xs line-through text-slate-500 block">${p.normalPrice}</span>
        <span class="text-3xl font-black text-emerald-400 font-mono">${p.dealPrice}</span>
      </div>
      <span class="bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider">
        ${p.lang === 'en' ? 'VERIFIED DEAL' : 'OFERTA VERIFICADA'}
      </span>
    </div>

    <a href="${p.affiliateUrl}" target="_blank" rel="noopener" class="block w-full text-center bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-xl transition transform hover:scale-105 text-sm sm:text-base uppercase tracking-wider mb-4">
      ${p.btnText}
    </a>

    <div class="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 text-left">
      💡 <strong>${p.lang === 'en' ? 'Local Travel Tip:' : 'Consejo de Viaje:'}</strong> ${p.localAdvice}
    </div>
  </div>
</div>

<script>
var totalSec = 18 * 60 + 42;
setInterval(function() {
  if (totalSec > 0) totalSec--;
  else totalSec = 18 * 60 + 42;
  var m = Math.floor(totalSec / 60);
  var s = totalSec % 60;
  var el = document.getElementById('intlTimer');
  var prefix = "${p.lang === 'en' ? 'EXPIRES IN: ' : 'EXPIRA EN: '}";
  if (el) el.textContent = prefix + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s) + ' MIN';
}, 1000);
</script>
</body>
</html>`;
}

GLOBAL_PAGES.forEach(p => {
  const fileName = `${p.slug}.html`;
  const fullPath = path.join(__dirname, '..', p.dir, fileName);
  fs.writeFileSync(fullPath, gerarHTMLGlobal(p), 'utf8');
  console.log(`✓ Gerada página internacional (${p.lang}): ${p.dir}/${fileName}`);
});
console.log(`\n🏆 Total de ${GLOBAL_PAGES.length} páginas internacionais geradas com sucesso!`);
