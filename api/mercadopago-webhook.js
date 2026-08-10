// ============================================================
// AQUITEM — Webhook Mercado Pago (Vercel Serverless Function)
// Atualiza automaticamente o plano da loja, motorista ou classificado.
// Suporta assinaturas recorrentes (preapproval) e pagamentos únicos (payment).
// ============================================================

module.exports = async function handler(req, res) {
  // Sempre responde 200 para evitar loops de retry do MP
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', message: 'Webhook Mercado Pago ativo' });
  }

  try {
    const body = req.body || {};
    const query = req.query || {};

    const type = body.type || body.topic || query.topic || query.type;
    const id = (body.data && body.data.id) || body.id || query['data.id'] || query.id;

    const MP_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-67890-test';
    const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || '';

    // Se não tiver credenciais completas configuradas, apenas confirma recebimento
    if (!id || !MP_TOKEN) {
      return res.status(200).json({ received: true });
    }

    async function mpFetch(path) {
      const resp = await fetch(`https://api.mercadopago.com${path}`, {
        headers: { Authorization: `Bearer ${MP_TOKEN}` }
      });
      if (!resp.ok) return null;
      return resp.json();
    }

    async function aplicarPlano(externalRef, ativo) {
      if (!externalRef || !SERVICE_ROLE) return;
      const parts = String(externalRef).split(':');
      const entity = parts[0]; // store | driver | listing
      const targetId = parts[1];
      const plan = parts[2] || (ativo ? 'destaque' : 'gratis');

      if (!targetId) return;

      const tableMap = {
        driver: 'drivers',
        listing: 'listings',
        store: 'stores'
      };
      const table = tableMap[entity] || 'stores';

      const updateData = ativo
        ? { plano: plan, destaque: true }
        : { plano: 'gratis', destaque: false };

      await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(targetId)}`, {
        method: 'PATCH',
        headers: {
          apikey: SERVICE_ROLE,
          Authorization: `Bearer ${SERVICE_ROLE}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(updateData)
      });
    }

    if (type === 'subscription_preapproval') {
      const pa = await mpFetch(`/preapproval/${id}`);
      if (pa && pa.external_reference) {
        const isAuthorized = pa.status === 'authorized';
        await aplicarPlano(pa.external_reference, isAuthorized);
      }
    } else if (type === 'subscription_authorized_payment') {
      const ap = await mpFetch(`/authorized_payment/${id}`);
      const ext = ap && ap.preapproval && ap.preapproval.external_reference;
      if (ext) {
        const isApproved = ap.status === 'approved';
        await aplicarPlano(ext, isApproved);
      }
    } else if (type === 'payment') {
      const pay = await mpFetch(`/v1/payments/${id}`);
      if (pay && pay.external_reference) {
        const isApproved = pay.status === 'approved';
        await aplicarPlano(pay.external_reference, isApproved);
      }
    }

    return res.status(200).json({ received: true, type, id });
  } catch (err) {
    console.error('[MP Webhook Error]:', err);
    return res.status(200).json({ received: true, error: err.message });
  }
};
