// ============================================================
// AQUITEM — Criação de Checkout / Assinatura Mercado Pago
// Gera link de pagamento seguro com external_reference vinculada.
// ============================================================

const PLANOS = {
  'store:destaque': { titulo: 'Plano Destaque — Lojista (Aqui Tem Achadinhos)', valor: 79 },
  'store:pro': { titulo: 'Plano Pro — Lojista (Aqui Tem Achadinhos)', valor: 149 },
  'driver:destaque': { titulo: 'Plano Destaque — Motorista (Aqui Tem Achadinhos)', valor: 49 },
  'driver:pro': { titulo: 'Plano Pro — Motorista (Aqui Tem Achadinhos)', valor: 99 },
  'listing:destaque': { titulo: 'Impulsionar Anúncio — Destaque (Aqui Tem Achadinhos)', valor: 19.90 }
};

module.exports = async function handler(req, res) {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { entity, id, plan, email } = req.body || {};
    const key = `${entity}:${plan}`;
    const p = PLANOS[key];

    if (!p || !id || !email) {
      return res.status(400).json({ error: 'Parâmetros inválidos (entity, id, plan, email)' });
    }

    const MP_TOKEN = process.env.MP_ACCESS_TOKEN || '';
    if (!MP_TOKEN) {
      // Se não tiver token configurado na Vercel, retorna link manual de fallback
      const fallbackLinks = {
        'store:destaque': 'https://mpago.la/25UHZqr',
        'store:pro': 'https://mpago.la/2HBxp5v',
        'driver:destaque': 'https://mpago.la/2ZSErEf',
        'driver:pro': 'https://mpago.la/11BbdJs'
      };
      const fb = fallbackLinks[key] || 'https://mpago.la/25UHZqr';
      return res.status(200).json({ init_point: fb });
    }

    const external_reference = `${entity}:${id}:${plan}`;

    const resp = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason: p.titulo,
        external_reference,
        payer_email: email,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: p.valor,
          currency_id: 'BRL'
        },
        back_url: 'https://aquitemachadinhos.com.br/obrigado.html'
      })
    });

    const data = await resp.json();
    if (!data.init_point) {
      return res.status(400).json({ error: data.message || 'Erro ao criar assinatura', detail: data });
    }

    return res.status(200).json({ init_point: data.init_point });
  } catch (err) {
    console.error('[Upgrade Checkout Error]:', err);
    return res.status(500).json({ error: String(err) });
  }
};
