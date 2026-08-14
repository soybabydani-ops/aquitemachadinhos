import React from 'react';

// Static import of cities list (JSON)
const citiesData = require('../../cities-list.json');
const cities = citiesData.cities || [];

export default async function CityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city;
  
  const cityData = cities.find((c: any) => c.slug === citySlug) || {
    slug: citySlug,
    name: citySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
    state: 'SP',
    type: 'regional'
  };

  const relatedCities = cities
    .filter((c: any) => c.state === cityData.state && c.slug !== citySlug)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {cityData.name} - {cityData.state}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Guia completo • Vagas • Classificados • Clima e Utilidades
          </p>
        </header>

        <section className="p-6 bg-gray-50 rounded-xl mb-8">
          <h2 className="text-2xl font-semibold mb-4">🌡️ Boletim Climático Oficial</h2>
          <p>Dados climáticos em tempo real para {cityData.name}. Integração com Open-Meteo.</p>
          <div className="mt-4 p-4 bg-white rounded border">
            <strong>Temperatura atual:</strong> Carregando... (componente ClimateWidget em produção)
          </div>
        </section>

        <section className="prose max-w-none">
          <h2>Manual de Otimização Residencial</h2>
          <p>Conteúdo original de eficiência energética disponível nesta seção.</p>
        </section>

        <footer className="mt-12 text-sm text-gray-500">
          Navegação contextual entre cidades do mesmo estado.
        </footer>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return cities.map((city: any) => ({
    city: city.slug,
  }));
}
