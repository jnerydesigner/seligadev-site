import { CardVideosContainer } from "@/components/card-video-container";
import TitleTop from "@/components/title";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const revalidate = 360;

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/shorts`;
  const image = `${url}/logo.png`;
  return {
    title: "Shorts do Youtube | Se Liga Dev",
    description: "Veja alguns shorts do youtube relevantes do canal jander nery dev",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Setup que eu utilizo",
      description: "Veja alguns shorts do youtube relevantes do canal jander nery dev",
      url,
      siteName: "Se Liga Dev",
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Imagem do Blog Se Liga Dev",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "Setup que eu utilizo",
      description: "Veja alguns shorts do youtube relevantes do canal jander nery dev",
    },
  };
}

export default async function PageShorts() {
  const shorts = await prisma.shorts.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <TitleTop titleStr="Shorts do Canal Jander Nery Dev" notH1 />

      <CardVideosContainer cardVideos={[]} cardShorts={shorts} shorts={true} />
    </section>
  );
}
