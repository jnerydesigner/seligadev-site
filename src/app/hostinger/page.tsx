import { getDirectusHostingerData } from "@/api/directus";
import { HostingerPlans } from "@/components/hostingerPlans";
import { DirectusItemResponse } from "@/types/hostinger_directus_type";
import { Metadata } from "next";
import React from "react";
import { getHostingerData } from "../services/hostinger.service";
import { HostingerPageDataType } from "@/types/hostinger-page-data.type";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/hostinger`;
  const imageHostinger = `${process.env.NEXT_PUBLIC_BASE_URL}/images/image-hostinger.png`;
  return {
    title: "Planos Hostinger",
    description:
      "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
    keywords: ["hostinger", "vps", "hospedagem", "servidor", "desenvolvimento"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Planos Hostinger",
      description:
        "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/hostinger`,
      siteName: "Se Liga Dev",
      type: "website",
      images: [imageHostinger],
    },
    twitter: {
      card: "summary",
      title: "Planos Hostinger",
      description:
        "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
      images: [imageHostinger],
    },
  };
}

const urlParmetersWithSlug =
  "/items/HostingerPage?fields=*,HostingerPageHotingerObject.*,HostingerPageHotingerObject.Hostinger_id.*,HostingerPageHotingerObject.Hostinger_id.hostinger_description.*,HostingerPageHotingerObject.Hostinger_id.hostinger_description.HostingerDescription_id.*,HostingerPageHotingerObject.Hostinger_id.hostinger_discount_description.*,HostingerPageHotingerObject.Hostinger_id.hostinger_discount_description.HostingerDiscountDescription_id.*&filter[slug][_eq]=hostinger";

export default async function Page() {
  const response =
    await getDirectusHostingerData<DirectusItemResponse<HostingerPageDataType>>(
      urlParmetersWithSlug
    );
  const hostingerData = (response.data.HostingerPageHotingerObject ?? [])
    .map((item) => getHostingerData(item.Hostinger_id))
    .filter((item) => item !== undefined);

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <HostingerPlans hostinger={hostingerData} titleTop={response.data.title} />
    </section>
  );
}
