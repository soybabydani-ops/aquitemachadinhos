'use client';

import React from 'react';

interface MeshLinksProps {
  tenant: string;
  state: string;
}

const MeshLinks: React.FC<MeshLinksProps> = ({ tenant, state }) => {
  return (
    <div className="mesh-links glassmorphism">
      <h4 className="text-lg font-semibold mb-3">Rede de Conhecimento Contextual</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-medium text-blue-400 mb-1">Guias Globais</div>
          <a href={`/en/${tenant}`} className="block hover:underline">Remote Tech Jobs (EN)</a>
          <a href={`/es/${tenant}`} className="block hover:underline">Guías de Infraestructura (ES)</a>
          <a href="/utilidade-publica/eficiencia-energetica" className="block hover:underline">Economia de Energia</a>
        </div>
        
        <div>
          <div className="font-medium text-blue-400 mb-1">Regiões {state}</div>
          <a href="/cidades.html" className="block hover:underline">Explorar cidades vizinhas</a>
          <a href="/vagas.html" className="block hover:underline">Vagas na macrorregião</a>
          <a href="/clima" className="block hover:underline">Alertas climáticos regionais</a>
        </div>
      </div>

      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 1.25rem;
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
};

export default MeshLinks;