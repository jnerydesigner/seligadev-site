import { HostingerPlans } from "@/components/hostingerPlans";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/setup`;
  return {
    title: "Planos Hostinger | Se Liga Dev",
    description:
      "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Planos Hostinger",
      description:
        "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/hostinger`,
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary",
      title: "Planos Hostinger",
      description:
        "Planos Hostinger para você elevar o nível de seu desenvolvimento, com VPS e não tem desculpa de que na minha máquina não funciona.",
    },
  };
}

export default function Page() {
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <HostingerPlans />
    </section>
  );
}
