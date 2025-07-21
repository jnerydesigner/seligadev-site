/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";

interface AdsBannerProps {
  dataAdClient: string;
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
}

export const AdsBanner = ({
  dataAdClient,
  dataAdFormat,
  dataAdSlot,
  dataFullWidthResponsive,
}: AdsBannerProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={dataAdClient}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive}
    ></ins>
  );
};
