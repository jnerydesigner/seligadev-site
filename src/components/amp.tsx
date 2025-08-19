import Script from "next/script";

interface AdsenseProps {
  pid: string;
}

export function AmpAdsense({ pid }: AdsenseProps) {
  return (
    <Script
      id="amp-auto-ads-script"
      dangerouslySetInnerHTML={{
        __html: `<amp-auto-ads type="adsense" data-ad-client="${pid}"></amp-auto-ads>`,
      }}
    />
  );
}
