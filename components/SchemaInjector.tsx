'use client';

import React from 'react';

interface SchemaInjectorProps {
  type: 'Product' | 'Review' | 'Article' | 'LocalBusiness';
  data: any;
  city?: string;
}

function numericPrice(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) return value.toFixed(2);
  if (typeof value !== 'string') return null;
  const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed.toFixed(2) : null;
}

const SchemaInjector: React.FC<SchemaInjectorProps> = ({ type, data }) => {
  const generateSchema = () => {
    if (type === 'Product') {
      const price = numericPrice(data.price);
      const hasVerifiedOffer = price && typeof data.url === 'string' && data.url.startsWith('https://');
      if (!hasVerifiedOffer) {
        return { '@context': 'https://schema.org', '@type': 'WebPage', name: data.title, description: data.description, url: data.canonicalUrl || data.url };
      }
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.title,
        description: data.description,
        ...(data.image ? { image: data.image } : {}),
        ...(data.brand ? { brand: { '@type': 'Brand', name: data.brand } } : {}),
        offers: {
          '@type': 'Offer',
          url: data.url,
          priceCurrency: data.priceCurrency || 'BRL',
          price,
          ...(data.availability ? { availability: data.availability } : {}),
          ...(data.priceValidUntil ? { priceValidUntil: data.priceValidUntil } : {}),
          ...(data.shippingDetails ? { shippingDetails: data.shippingDetails } : {}),
          ...(data.merchantReturnPolicy ? { hasMerchantReturnPolicy: data.merchantReturnPolicy } : {})
        },
        ...(data.review?.verified === true ? { review: { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: data.review.rating, bestRating: '5' }, author: { '@type': 'Person', name: data.review.author } } } : {})
      };
    }
    if (type === 'Review') return { '@context': 'https://schema.org', '@type': 'Review', itemReviewed: { '@type': 'Product', name: data.productName }, reviewRating: { '@type': 'Rating', ratingValue: data.rating, bestRating: '5' }, author: { '@type': 'Person', name: data.author }, datePublished: data.datePublished, reviewBody: data.reviewText };
    if (type === 'Article') return { '@context': 'https://schema.org', '@type': 'Article', headline: data.title, description: data.description, author: { '@type': 'Organization', name: 'Aqui Tem Achadinhos' }, datePublished: data.publishedAt, mainEntityOfPage: { '@type': 'WebPage', '@id': data.canonicalUrl } };
    return {};
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()).replace(/</g, '\\u003c') }} />;
};

export default SchemaInjector;
