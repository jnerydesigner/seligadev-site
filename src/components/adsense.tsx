import Script from "next/script";

interface AdsenseProps {
  pid: string;
}

export function Adsense({ pid }: AdsenseProps) {
  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pid}`}
      crossOrigin="anonymous"
    />
  );
}
