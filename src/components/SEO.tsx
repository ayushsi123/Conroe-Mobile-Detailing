import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "Award-winning mobile detailing in Conroe, TX. Premium ceramic coating and paint correction.",
  keywords = "mobile detailing, conroe detailing, ceramic coating conroe, paint correction tx, auto spa conroe",
  image = "/og-image.jpg",
  url = "https://conroedetailing.com"
}) => {
  const fullTitle = title ? `${title} | Conroe Mobile Detailing` : "Conroe Mobile Detailing | Premium Ceramic Coating & Auto Spa";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
