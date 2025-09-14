// Google AdSense integration for website monetization

// Initialize Google AdSense
export const initAdSense = () => {
  const adsenseClientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID;

  if (!adsenseClientId) {
    console.warn('Missing Google AdSense Client ID: VITE_GOOGLE_ADSENSE_CLIENT_ID');
    return;
  }

  // Add Google AdSense script to the head
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  // Initialize AdSense
  if (typeof window !== 'undefined') {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
  }
};

// Load ad unit
export const loadAdUnit = (adSlot: string, adFormat = 'auto', fullWidthResponsive = true) => {
  const adsenseClientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID;
  
  if (!adsenseClientId || typeof window === 'undefined') return;

  try {
    ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
  } catch (error) {
    console.error('AdSense error:', error);
  }
};

// Refresh ads when content changes
export const refreshAds = () => {
  if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense refresh error:', error);
    }
  }
};