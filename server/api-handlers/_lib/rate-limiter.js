// ==============================================================================
// AQUITEM ACHADINHOS — DEVSECOPS RATE LIMITER & ANTI-BOT WAF MIDDLEWARE
// ==============================================================================

const IP_REQUESTS = new Map();
const WINDOW_MS = 60 * 1000; // Janela de 1 minuto
const MAX_REQUESTS_PER_WINDOW = 60; // Máximo de 60 requisições/minuto por IP

const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'masscan',
  'wpscan',
  'acunetix',
  'nessus',
  'dirbuster',
  'gobuster',
  'python-requests/2.0',
  'curl/7.0'
];

function checkRateLimitAndSecurity(req, res) {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();

  // 1. Bloqueio de Scrapers e Scanners Maliciosos Conhecidos
  for (const bot of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(bot)) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Acesso bloqueado por WAF Perimetral (Assinatura Maliciosa).' }));
      return false;
    }
  }

  // 2. Extração Segura do IP do Cliente
  const ip = req.headers['x-forwarded-for'] 
    ? req.headers['x-forwarded-for'].split(',')[0].trim() 
    : (req.socket && req.socket.remoteAddress) || '127.0.0.1';

  const now = Date.now();
  let record = IP_REQUESTS.get(ip);

  if (!record || now - record.startTime > WINDOW_MS) {
    record = { startTime: now, count: 1 };
    IP_REQUESTS.set(ip, record);
  } else {
    record.count++;
  }

  // 3. Limpeza Periódica de Memória
  if (IP_REQUESTS.size > 5000) {
    for (const [k, v] of IP_REQUESTS.entries()) {
      if (now - v.startTime > WINDOW_MS) {
        IP_REQUESTS.delete(k);
      }
    }
  }

  // 4. Rate Limiting Protection (Anti-DDoS / Anti-Cota Exaustiva)
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': '60',
      'X-RateLimit-Limit': String(MAX_REQUESTS_PER_WINDOW),
      'X-RateLimit-Remaining': '0'
    });
    res.end(JSON.stringify({
      error: 'Limite de requisições excedido. Tente novamente em 1 minuto.',
      code: 'RATE_LIMIT_EXCEEDED'
    }));
    return false;
  }

  res.setHeader('X-RateLimit-Limit', String(MAX_REQUESTS_PER_WINDOW));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, MAX_REQUESTS_PER_WINDOW - record.count)));
  return true;
}

module.exports = { checkRateLimitAndSecurity };
