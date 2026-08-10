// AQUITEM — confirmação institucional de Empresa Fundadora
// Requer variáveis Vercel: AUTOMATION_SECRET, RESEND_API_KEY, AUTOMATION_FROM
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const auth = req.headers.authorization || '';
  if (!process.env.AUTOMATION_SECRET || auth !== `Bearer ${process.env.AUTOMATION_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { email, company, city } = req.body || {};
  if (!email || !company || !city) return res.status(400).json({ error: 'Missing email, company or city' });
  if (!process.env.RESEND_API_KEY || !process.env.AUTOMATION_FROM) {
    return res.status(503).json({ error: 'Email channel is not configured' });
  }
  const subject = `Recebemos a inscrição da ${company} como Empresa Fundadora`;
  const html = `
    <div style="font-family:Arial,sans-serif;background:#07142B;color:#EEF4FC;padding:32px;max-width:640px;margin:auto">
      <div style="font-weight:800;letter-spacing:.12em;color:#F5D77F;font-size:20px">AQUITEM</div>
      <p style="color:#D9AA42;font-size:12px;font-weight:700;letter-spacing:.14em">EMPRESAS FUNDADORAS</p>
      <h1 style="font-family:Georgia,serif;font-size:30px">Inscrição recebida.</h1>
      <p style="line-height:1.6">Olá! Recebemos a inscrição da <b>${escapeHtml(company)}</b> para participar como Empresa Fundadora em <b>${escapeHtml(city)}</b>.</p>
      <p style="line-height:1.6">A AQUITEM revisará os dados enviados e retornará pelos canais informados. Enquanto isso, você pode preparar logo, fotos, descrição, horário e Instagram para acelerar a publicação.</p>
      <p style="color:#B9C9DD;font-size:13px;margin-top:28px">AQUITEM | Guias Locais<br>aquitemachadinhos.com.br</p>
    </div>`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.AUTOMATION_FROM, to: [email], subject, html })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) return res.status(502).json({ error: 'Provider error', details: payload });
  return res.status(200).json({ sent: true, provider_id: payload.id || null });
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}