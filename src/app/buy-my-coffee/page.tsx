import { CardBlog } from "@/components/card-blog";
import TitleTop from "@/components/title";
import { TitleHalftone } from "@/components/title-halftone";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/by-my-coffee`;
  const image = `${baseUrl}/logo.png`;

  return {
    title: `Compre meu Café | Se Liga Dev`,
    description: "Contribua com o projeto Se Liga Dev comprando um café virtual.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Compre meu Café | Se Liga Dev`,
      type: "website",
      description: "Contribua com o projeto Se Liga Dev comprando um café virtual.",
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Imagem do Blog Se Liga Dev",
        },
      ],
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary_large_image",
      title: `Compre meu Café | Se Liga Dev`,
      description: "Contribua com o projeto Se Liga Dev comprando um café virtual.",
      images: [image],
    },
  };
}

export default async function PageByMyCoffee() {
  const findPost = await prisma.post.findMany();
  return (
    <section className="flex h-208 w-full flex-col items-center justify-center p-4">
      <div className="halftone-blue border-oliver-dark flex h-full w-full flex-col items-center justify-center gap-4 rounded-sm border-2 bg-red-300 p-6">
        <TitleHalftone
          h2Exists={true}
          title="Seja Nosso Patrocinador, Ajude com um Pix de Qualaquer Valor"
        />
        <div className="flex h-[300px] w-full items-center justify-center">
          <Image
            src="/pix-new.png"
            alt="WhatsApp de Jander Nery"
            title="WhatsApp de Jander Nery"
            className="h-full w-[300px]"
            width={500}
            height={500}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
