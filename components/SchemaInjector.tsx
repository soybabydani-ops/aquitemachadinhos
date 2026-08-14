'use client';

import React from 'react';

interface SchemaInjectorProps {
  type: 'Product' | 'Review' | 'Article' | 'LocalBusiness';
  data: any;
  city?: string;
}

// Componente para injeção de Schema.org legítimo
// Permite rich snippets (Product + Review) no Google
const SchemaInjector: React.FC<SchemaInjectorProps> = ({ type, data, city }) => {
  const generateSchema = () => {
    if (type === 'Product') {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.title,
        "description": data.description,
        "brand": {
          "@type": "Brand",
          "name": data.brand || "Parceiro Oficial"
        },
        "offers": {
          "@type": "Offer",
          "url": data.url,
          "priceCurrency": "BRL",
          "price": data.price || "Consultar",
          "availability": "https://schema.org/InStock"
        },
        ...(data.review && {
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": data.review.rating,
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": data.review.author
            }
          }
        })
      };
    }

    if (type === 'Review') {
      return {
        "@context": "https://schema.org",
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": data.productName
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": data.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": data.author
        },
        "datePublished": data.datePublished,
        "reviewBody": data.reviewText
      };
    }

    if (type === 'Article') {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.description,
        "author": {
          "@type": "Organization",
          "name": "Aqui Tem Achadinhos"
        },
        "datePublished": data.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.canonicalUrl
        }
      };
    }

    return {};
  };

  const schema = generateSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SchemaInjector;