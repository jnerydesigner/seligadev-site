import Hero from "@/components/hero";

import { CardHome } from "@/components/card-home";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  return {
    title: "SeLigaDev",
    description:
      "A SeLigaDev é uma empresa de criação e desenvolvimento de Sistemas de Informação.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "SeLigaDev",
      description:
        "A SeLigaDev é uma empresa de criação e desenvolvimento de Sistemas de Informação.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}`,
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary",
      title: "SeLigaDev",
      description:
        "A SeLigaDev é uma empresa de criação e desenvolvimento de Sistemas de Informação.",
    },
  };
}

export default function Home() {
  return (
    <div className="h-[1000px] w-full">
      <Hero />
      {/* <AdsBanner
        dataAdClient="ca-pub-1600331961556195"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="6139750906"
      /> */}
      {/* <Consult /> */}
      <CardHome
        title="Consultoria Premium 🚀"
        description="A orientação certa para levar seu projeto ao próximo nível."
        link="/consult"
      />
      <CardHome
        title="🌏 Quer uma VPS para aumentar sua produtividade 🚀"
        description="Vem para Hostinger e seja feliz"
        link="/hostinger"
      />
    </div>
  );
}
