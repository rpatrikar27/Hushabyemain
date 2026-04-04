'use client';

import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  schemaMarkup?: any;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  schemaMarkup,
}: SEOHeadProps) {
  const siteTitle = title ? `${title} | Hushabye` : 'Hushabye - Premium Baby Care';
  const siteDescription = description || 'Premium Indian baby care brand providing gentle and effective products for your little ones.';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hushabye.in';
  const fullOgImage = ogImage || `${siteUrl}/og-image.jpg`;

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={keywords.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={fullOgImage} />
        
        {/* Canonical */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Structured Data */}
        {schemaMarkup && (
          <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
          </script>
        )}
      </Helmet>
    </>
  );
}
