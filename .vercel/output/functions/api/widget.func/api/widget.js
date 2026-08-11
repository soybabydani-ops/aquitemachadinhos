// ============================================================
// AQUITEM — Embeddable Fluid Widget Generator (/api/widget.js)
// Vercel Serverless Function em Node.js (Edge Cache s-maxage=86400)
// Distribui vagas e empresas para blogs locais gerando backlinks massivos.
// ============================================================

module.exports = async function handler(req, res) {
  // 1. Headers para JS minificado e Cache de Borda
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=60');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const widgetScript = `(function() {
  'use strict';
  
  function initAquiTemWidgets() {
    var containers = document.querySelectorAll('[data-aquitem-widget], #aquitem-widget, #aquitem-widget-vagas');
    if (!containers.length) return;

    containers.forEach(function(container) {
      if (container.getAttribute('data-loaded')) return;
      container.setAttribute('data-loaded', 'true');

      var cidade = container.getAttribute('data-cidade') || 'barretos';
      var tipo = container.getAttribute('data-tipo') || 'vagas';
      var limite = parseInt(container.getAttribute('data-limite') || '4', 10);
      var tema = container.getAttribute('data-tema') || 'dark';

      var apiUrl = 'https://www.aquitemachadinhos.com.br/api/' + (tipo === 'empresas' ? 'empresas' : 'vagas') + '?cidade=' + encodeURIComponent(cidade) + '&limit=' + limite;
      
      container.innerHTML = '<div style="padding: 16px; font-family: system-ui, sans-serif; color: #888; font-size: 13px;">Carregando oportunidades em ' + cidade.toUpperCase() + '...</div>';

      fetch(apiUrl)
        .then(function(r) { return r.json(); })
        .then(function(res) {
          var items = (res && res.data) || [];
          if (!items.length) {
            container.innerHTML = '<div style="padding: 16px; font-family: system-ui, sans-serif; color: #888; font-size: 13px;">Nenhuma vaga aberta no momento em ' + cidade + '.</div>';
            return;
          }

          var isDark = tema === 'dark';
          var bgCard = isDark ? '#0B1528' : '#FFFFFF';
          var textTitle = isDark ? '#FFFFFF' : '#0F172A';
          var textSub = isDark ? '#94A3B8' : '#64748B';
          var borderColor = isDark ? 'rgba(217, 170, 66, 0.25)' : '#E2E8F0';
          var accentColor = '#D9AA42';

          var html = '<div style="font-family: system-ui, -apple-system, sans-serif; background: ' + bgCard + '; border: 1px solid ' + borderColor + '; border-radius: 14px; padding: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); max-width: 480px; width: 100%; box-sizing: border-box;">';
          
          // Header do Widget
          html += '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid ' + borderColor + ';">';
          html += '  <div style="display: flex; align-items: center; gap: 8px;">';
          html += '    <span style="background: ' + accentColor + '; color: #07142B; font-weight: 900; font-size: 11px; padding: 3px 6px; border-radius: 4px;">AQUITEM</span>';
          html += '    <span style="font-weight: 700; font-size: 14px; color: ' + textTitle + ';">Vagas em ' + (cidade.charAt(0).toUpperCase() + cidade.slice(1)) + '</span>';
          html += '  </div>';
          html += '  <span style="font-size: 11px; color: #10B981; font-weight: 700;">● Em Tempo Real</span>';
          html += '</div>';

          // Lista de Itens
          html += '<div style="display: flex; flex-direction: column; gap: 10px;">';
          items.slice(0, limite).forEach(function(item) {
            var itemUrl = 'https://www.aquitemachadinhos.com.br/anuncio.html?id=' + (item.id || '');
            var itemTitle = item.titulo || item.nome || 'Oportunidade';
            var itemCompany = item.anunciante_nome || item.categoria || 'Empresa Verificada';
            var itemSalary = item.preco ? (' · ' + item.preco) : '';

            html += '<a href="' + itemUrl + '" target="_blank" rel="follow" style="text-decoration: none; display: block; background: ' + (isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC') + '; border: 1px solid ' + borderColor + '; padding: 10px 12px; border-radius: 8px; transition: all 0.2s ease;">';
            html += '  <div style="font-size: 13px; font-weight: 700; color: ' + (isDark ? '#F5D77F' : '#0F172A') + '; margin-bottom: 3px;">' + itemTitle + '</div>';
            html += '  <div style="font-size: 11px; color: ' + textSub + ';">🏢 ' + itemCompany + itemSalary + '</div>';
            html += '</a>';
          });
          html += '</div>';

          // Rodapé com Backlink Indexável Estratégico (Link Equity Machine)
          var portalCityUrl = 'https://www.aquitemachadinhos.com.br/vagas?cidade=' + encodeURIComponent(cidade);
          html += '<div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid ' + borderColor + '; display: flex; align-items: center; justify-content: space-between; font-size: 11px;">';
          html += '  <a href="' + portalCityUrl + '" target="_blank" rel="follow" style="color: ' + accentColor + '; font-weight: 700; text-decoration: none;">Ver todas as vagas em ' + cidade + ' ↗</a>';
          html += '  <a href="https://www.aquitemachadinhos.com.br" target="_blank" rel="follow" style="color: ' + textSub + '; text-decoration: none; font-size: 10px;">por Aqui Tem Achadinhos</a>';
          html += '</div>';

          html += '</div>';

          container.innerHTML = html;
        })
        .catch(function(err) {
          console.error('[AquiTem Widget Error]:', err);
          container.innerHTML = '<div style="padding: 12px; font-size: 12px; color: #888;">Erro ao carregar widget.</div>';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAquiTemWidgets);
  } else {
    initAquiTemWidgets();
  }
})();`;

  return res.status(200).send(widgetScript);
};
