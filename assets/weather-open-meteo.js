/* Open-Meteo client for the 64 editorial tenant guides. No geolocation or personal data. */
(function () {
  'use strict';

  var WEATHER_CODES = {
    0: 'céu limpo', 1: 'predominantemente limpo', 2: 'parcialmente nublado', 3: 'encoberto',
    45: 'nevoeiro', 48: 'nevoeiro com geada', 51: 'garoa leve', 53: 'garoa moderada',
    55: 'garoa intensa', 61: 'chuva leve', 63: 'chuva moderada', 65: 'chuva forte',
    71: 'neve leve', 73: 'neve moderada', 75: 'neve forte', 80: 'pancadas leves',
    81: 'pancadas moderadas', 82: 'pancadas fortes', 95: 'trovoadas', 96: 'trovoadas com granizo',
    99: 'trovoadas fortes com granizo'
  };
  var CACHE_MS = 10 * 60 * 1000;

  function text(node, value) {
    var target = node.querySelector('[data-weather-' + value[0] + ']');
    if (target) target.textContent = value[1];
  }

  function formatNumber(value, unit) {
    var number = Number(value);
    return Number.isFinite(number) ? number.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' ' + unit : '—';
  }

  function render(card, payload, fromCache) {
    var current = payload.current || {};
    var daily = payload.daily || {};
    var units = payload.current_units || {};
    text(card, ['temperature', formatNumber(current.temperature_2m, units.temperature_2m || '°C')]);
    text(card, ['apparent', formatNumber(current.apparent_temperature, units.apparent_temperature || '°C')]);
    text(card, ['wind', formatNumber(current.wind_speed_10m, units.wind_speed_10m || 'km/h')]);
    text(card, ['gust', formatNumber(current.wind_gusts_10m, units.wind_gusts_10m || 'km/h')]);
    text(card, ['condition', WEATHER_CODES[current.weather_code] || 'condição não classificada']);
    text(card, ['range', formatNumber(daily.temperature_2m_min && daily.temperature_2m_min[0], '°C') + ' a ' + formatNumber(daily.temperature_2m_max && daily.temperature_2m_max[0], '°C')]);
    text(card, ['rain', formatNumber(daily.precipitation_probability_max && daily.precipitation_probability_max[0], '%')]);
    var observed = current.time ? new Date(current.time).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : 'horário indisponível';
    text(card, ['updated', observed + (fromCache ? ' · cache local de até 10 min' : '')]);
    card.dataset.weatherState = 'ready';
  }

  function renderError(card) {
    text(card, ['status', 'Dados meteorológicos temporariamente indisponíveis. Use os links oficiais abaixo.']);
    card.dataset.weatherState = 'error';
  }

  async function load(card) {
    var latitude = Number(card.dataset.latitude);
    var longitude = Number(card.dataset.longitude);
    var city = card.dataset.city || 'cidade';
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return renderError(card);
    var cacheKey = 'aquitem_weather_v1_' + city;
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.savedAt < CACHE_MS) return render(card, cached.payload, true);
    } catch (_) {}

    var params = new URLSearchParams({
      latitude: String(latitude), longitude: String(longitude),
      current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      forecast_days: '1', timezone: 'auto'
    });
    try {
      var response = await fetch('https://api.open-meteo.com/v1/forecast?' + params.toString(), {
        method: 'GET', mode: 'cors', credentials: 'omit', referrerPolicy: 'no-referrer'
      });
      if (!response.ok) throw new Error('weather_http_' + response.status);
      var payload = await response.json();
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), payload: payload })); } catch (_) {}
      render(card, payload, false);
    } catch (_) { renderError(card); }
  }

  document.querySelectorAll('[data-open-meteo]').forEach(load);
})();
