// AdSense Ad Unit Component
import { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseUnit({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style,
  className = ''
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adsenseClientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!adsenseClientId) return;
    
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense unit error:', error);
    }
  }, [adsenseClientId]);

  if (!adsenseClientId) {
    return null;
  }

  return (
    <div 
      ref={adRef}
      className={`adsense-container ${className}`}
      style={style}
    >
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adsenseClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        data-testid={`adsense-unit-${adSlot}`}
      />
    </div>
  );
}