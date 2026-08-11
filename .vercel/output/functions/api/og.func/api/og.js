// ============================================================
// AQUITEM — Dynamic Edge OpenGraph Image Generator (Vercel Edge)
// Gera imagens 1200x630 em SVG direto na borda (Edge) em <15ms
// sem sobrecarregar banco de dados ou renderizar navegadores pesados.
// ============================================================

module.exports = async function handler(req, res) {
  const {
    title = 'Aqui Tem Achadinhos — Guia Local & Vagas',
    city = 'Brasil',
    uf = 'BR',
    category = 'Oportunidades & Comércio',
    salary = '',
    badge = '✦ VERIFICADO'
  } = req.query || {};

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');

  // Limpeza de caracteres para SVG seguro
  const esc = (str) => String(str || '').replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  })[m]);

  const cleanTitle = esc(title.length > 55 ? title.slice(0, 52) + '...' : title);
  const cleanCity = esc(city.toUpperCase());
  const cleanUF = esc(uf.toUpperCase());
  const cleanCategory = esc(category.toUpperCase());
  const cleanSalary = salary ? esc(salary) : '';
  const cleanBadge = esc(badge);

  const salaryBox = cleanSalary ? `
    <g transform="translate(80, 440)">
      <rect width="320" height="54" rx="16" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5" />
      <text x="24" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#34d399">💰 ${cleanSalary}</text>
    </g>
  ` : '';

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#050F22" />
      <stop offset="50%" stop-color="#0A1D3D" />
      <stop offset="100%" stop-color="#081426" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F5D77F" />
      <stop offset="100%" stop-color="#D9AA42" />
    </linearGradient>
    <radialGradient id="glowTop" cx="80%" cy="10%" r="60%">
      <stop offset="0%" stop-color="rgba(217, 170, 66, 0.25)" />
      <stop offset="100%" stop-color="rgba(217, 170, 66, 0)" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(0,0,0,0.5)" />
    </filter>
  </defs>

  <!-- Fundo com gradiente e iluminação -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glowTop)" />

  <!-- Borda dourada sutil -->
  <rect x="24" y="24" width="1152" height="582" rx="32" stroke="rgba(245, 215, 127, 0.25)" stroke-width="2" />

  <!-- Topo: Marca e Badge -->
  <g transform="translate(80, 75)">
    <!-- Ícone da Marca -->
    <rect width="64" height="64" rx="18" fill="url(#goldGrad)" />
    <text x="32" y="44" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" fill="#07142B">A</text>
    
    <!-- Wordmark -->
    <text x="82" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" letter-spacing="3" fill="#FFFFFF">AQUITEM</text>
    <text x="82" y="56" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" letter-spacing="2.5" fill="#F5D77F">AQUI TEM ACHADINHOS</text>

    <!-- Badge de Localização -->
    <g transform="translate(750, 6)">
      <rect width="290" height="48" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <text x="145" y="31" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#F5D77F">📍 ${cleanCity} · ${cleanUF}</text>
    </g>
  </g>

  <!-- Tag de Categoria -->
  <g transform="translate(80, 200)">
    <rect width="280" height="38" rx="19" fill="rgba(217, 170, 66, 0.15)" stroke="rgba(217, 170, 66, 0.4)" />
    <text x="140" y="25" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="1" fill="#F5D77F">${cleanCategory} ${cleanBadge}</text>
  </g>

  <!-- Título Principal em Destaque -->
  <text x="80" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" fill="#FFFFFF" width="1040">
    ${cleanTitle}
  </text>

  <!-- Subtítulo -->
  <text x="80" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#CBD5E1">
    Contato direto no WhatsApp sem intermediários · 100% Gratuito
  </text>

  <!-- Caixa de Salário / Preço (Se Houver) -->
  ${salaryBox}

  <!-- Rodapé do Card -->
  <g transform="translate(80, 525)">
    <line x1="0" y1="0" x2="1040" y2="0" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <text x="0" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#94A3B8">aquitemachadinhos.com.br</text>
    <text x="1040" y="38" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#22C55E">💬 Contato Direto via WhatsApp ↗</text>
  </g>
</svg>`;

  return res.status(200).send(svg);
};
