'use client';

import React from 'react';

interface LSIClusterProps {
  tenant: string;
  clusterType: 'home_office' | 'recrutamento' | 'seguranca_vento';
  question: string;
  answer: string;
}

/**
 * LSIClusterBlock - Bloco de Resposta Expandida
 * Glassmorphism leve para Core Web Vitals (sub-5ms render)
 * Otimizado para RankBrain + EEAT
 */
const LSIClusterBlock: React.FC<LSIClusterProps> = ({ tenant, clusterType, question, answer }) => {
  const icon = {
    home_office: '🏠',
    recrutamento: '📋',
    seguranca_vento: '🌬️'
  }[clusterType] || '💡';

  return (
    <div 
      className="lsi-cluster-block my-6 p-6 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl shadow-xl transition-all hover:scale-[1.01]"
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3 leading-tight">
            {question}
          </h3>
          <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">{answer}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
              {tenant} • 2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium">
              LSI Cluster • RankBrain
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSIClusterBlock;
