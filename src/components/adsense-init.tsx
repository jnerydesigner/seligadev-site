"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsenseInitialized?: boolean;
    adsbygoogle?: object[];
  }
}

export function AdSenseInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.adsenseInitialized) {
      window.adsenseInitialized = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-1600331961556195",
        enable_page_level_ads: true,
      });
    }
  }, []);

  return null;
}
