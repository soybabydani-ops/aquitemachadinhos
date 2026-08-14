'use client';

import React from 'react';

interface InternalLinkingFooterProps {
  currentCity: string;
  currentState: string;
  currentType: string;
  relatedCities: Array<{
    slug: string;
    name: string;
    state: string;
  }>;
}

// Componente de Linkagem Interna em Cascata Contextual
// Melhora SEO, tempo de permanência e distribuição de autoridade
const InternalLinkingFooter: React.FC<InternalLinkingFooterProps> = ({
  currentCity,
  currentState,
  currentType,
  relatedCities
}) => {
  return (
    <footer className="internal-linking-footer">
      <div className="linking-container">
        <h3 className="linking-title">
          Explore mais sobre {currentCity} e cidades vizinhas
        </h3>

        <div className="linking-grid">
          {/* Card principal contextual */}
          <div className="context-card">
            <div className="card-header">
              <span className="badge">Mesmo Estado</span>
              <h4>Guias e Vagas em {currentState}</h4>
            </div>
            <p className="card-text">
              Descubra oportunidades de emprego, pousadas e serviços em outras cidades do {currentState}.
            </p>
            <a 
              href={`https://www.aquitemachadinhos.com.br/cidades.html?state=${currentState.toLowerCase()}`} 
              className="linking-button"
            >
              Ver todas as cidades de {currentState} →
            </a>
          </div>

          {/* Cidades relacionadas */}
          <div className="related-cities">
            <h4 className="section-title">Cidades próximas e recomendadas</h4>
            <div className="cities-list">
              {relatedCities.slice(0, 6).map((city, index) => (
                <a 
                  key={index}
                  href={`https://www.aquitemachadinhos.com.br/${city.slug}-home.html`}
                  className="city-link"
                >
                  {city.name} ({city.state})
                </a>
              ))}
            </div>
          </div>

          {/* Sugestão de conteúdo relacionado */}
          <div className="content-suggestion">
            <h4 className="section-title">Leia também</h4>
            <ul className="suggestion-list">
              <li>
                <a href="/articles/eficiencia-energetica">
                  Manual de Otimização Residencial: Eficiência Energética
                </a>
              </li>
              <li>
                <a href="/articles/tendencias-utilidades">
                  Análise de Tendências: Utilidades Domésticas e Organização
                </a>
              </li>
              <li>
                <a href="/vagas.html">
                  Vagas de Emprego Temporárias em {currentCity}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="seo-note">
          <small>
            Navegação contextual para melhorar sua experiência e ajudar na descoberta de novas oportunidades.
          </small>
        </div>
      </div>

      <style jsx>{`
        .internal-linking-footer {
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid #e5e7eb;
        }
        .linking-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .linking-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }
        .linking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .context-card, .related-cities, .content-suggestion {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.25rem;
          border: 1px solid #e2e8f0;
        }
        .badge {
          display: inline-block;
          background: #3b82f6;
          color: white;
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 0.5rem;
        }
        .linking-button {
          display: inline-block;
          margin-top: 0.75rem;
          background: #1e40af;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .linking-button:hover {
          background: #1e3a8a;
        }
        .section-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #374151;
        }
        .cities-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .city-link {
          background: white;
          border: 1px solid #cbd5e1;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.85rem;
          text-decoration: none;
          color: #1e40af;
          transition: all 0.2s;
        }
        .city-link:hover {
          background: #eff6ff;
          border-color: #3b82f6;
        }
        .suggestion-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .suggestion-list li {
          margin-bottom: 0.5rem;
        }
        .suggestion-list a {
          color: #1e40af;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .seo-note {
          margin-top: 1.5rem;
          text-align: center;
          opacity: 0.6;
        }
      `}</style>
    </footer>
  );
};

export default InternalLinkingFooter;