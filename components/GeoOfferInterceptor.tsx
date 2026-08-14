'use client';
import React from 'react';

interface Props {
  country: string;
}

export default function GeoOfferInterceptor({ country }: Props) {
  const isInternational = ['US','CA','GB','DE','FR','ES'].includes(country);
  
  return (
    <div className="glassmorphism p-4">
      {isInternational ? (
        <>
          <div className="text-emerald-400 font-semibold">High Ticket International</div>
          <a href="https://nordvpn.com" className="block text-sm hover:underline">NordVPN • USD/GBP</a>
          <a href="https://cyberghost.com" className="block text-sm hover:underline">CyberGhost • EUR</a>
          <a href="https://expedia.com" className="block text-sm hover:underline">Expedia • Luxury Card</a>
        </>
      ) : (
        <>
          <div className="text-amber-400 font-semibold">Ofertas Nacionais</div>
          <a href="https://samsung.com/br" className="block text-sm hover:underline">Samsung Brasil</a>
          <a href="https://shopee.com.br" className="block text-sm hover:underline">Shopee • Dell • Temu</a>
        </>
      )}
    </div>
  );
}
