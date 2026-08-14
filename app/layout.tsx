import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aqui Tem Achadinhos | Guias Locais, Classificados e Vagas',
  description: 'Rede Nacional de Guias Locais & Oportunidades. Encontre empresas, gastronomia, turismo, vagas e classificados.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.aquitemachadinhos.com.br" />
      </head>
      <body>{children}</body>
    </html>
  );
}
