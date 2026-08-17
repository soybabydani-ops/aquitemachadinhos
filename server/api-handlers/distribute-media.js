// ============================================================
// AQUITEM — Media Backlink & Social Distribution Dispatcher
// Envia imagens geradas e URLs para indexação e backlinks.
// ============================================================

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ready',
      endpoint: '/api/distribute-media',
      supported_targets: ['Pinterest API', 'Google Image Indexing', 'Social Webhooks'],
      timestamp: new Date().toISOString()
    });
  }

  try {
    const { title, city, uf, target_url, image_url, category } = req.body || {};

    if (!title || !target_url) {
      return res.status(400).json({ error: 'title e target_url são obrigatórios.' });
    }

    const ogImageUrl = image_url || `https://www.aquitemachadinhos.com.br/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city || 'Brasil')}&uf=${encodeURIComponent(uf || 'BR')}&category=${encodeURIComponent(category || 'Vagas')}`;

    const webhookPayload = {
      source: 'AQUITEM Programmatic Engine',
      title: title,
      description: `${title} em ${city}/${uf}. Veja no guia oficial com contato no WhatsApp: ${target_url}`,
      destination_url: target_url,
      media_url: ogImageUrl,
      tags: ['emprego', 'vagas', 'achadinhos', city.toLowerCase().replace(/ /g, ''), uf.toLowerCase()],
      created_at: new Date().toISOString()
    };

    // Disparo opcional para Webhook externo de automação (Make/n8n/Zapier)
    const SOCIAL_WEBHOOK_URL = process.env.SOCIAL_DISTRIBUTION_WEBHOOK;
    let webhookStatus = 'simulated';

    if (SOCIAL_WEBHOOK_URL) {
      try {
        const hookResp = await fetch(SOCIAL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload)
        });
        webhookStatus = hookResp.ok ? 'dispatched' : 'failed';
      } catch (e) {
        webhookStatus = 'error';
      }
    }

    return res.status(200).json({
      success: true,
      media_url: ogImageUrl,
      target_url,
      distribution_status: webhookStatus,
      payload: webhookPayload
    });

  } catch (err) {
    console.error('[Media Distribution Error]:', err);
    return res.status(500).json({ error: err.message });
  }
};
