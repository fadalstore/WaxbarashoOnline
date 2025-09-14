// SEO and Search Console integration component
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

export default function SEOHead({
  title = "Macaamiil - Online Learning Platform | Koorsooyin Casri ah",
  description = "Baro koorsooyin casri ah oo ku saabsan teknooloji, ganacsi, iyo xirfado kale. Macaamiil waa barashada mustaqbalka.",
  keywords = "koorsooyin online, barashada teknoolajiyada, ganacsi, programming, somali courses, macaamiil",
  image = "/assets/generated_images/Somali_students_learning_digitally_a61f37a8.png",
  url = "",
  type = "website",
  siteName = "Macaamiil Learning Platform"
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#3b82f6');

    // Open Graph meta tags for social media
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url || window.location.href, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'so_SO', true);
    updateMetaTag('og:locale:alternate', 'en_US', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Google Search Console verification
    const searchConsoleVerification = import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION;
    if (searchConsoleVerification) {
      updateMetaTag('google-site-verification', searchConsoleVerification);
    }

    // Add structured data for courses
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": siteName,
      "description": description,
      "url": url || window.location.href,
      "logo": image,
      "sameAs": [],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SO"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "24.99",
        "highPrice": "39.99"
      }
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href;

    // Add language alternates
    const addLanguageAlternate = (lang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    const currentUrl = url || window.location.href;
    addLanguageAlternate('so', currentUrl + '?lang=so');
    addLanguageAlternate('en', currentUrl + '?lang=en');
    addLanguageAlternate('x-default', currentUrl);

  }, [title, description, keywords, image, url, type, siteName]);

  return null; // This component doesn't render anything
}