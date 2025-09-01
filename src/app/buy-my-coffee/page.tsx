import { CardBlog } from "@/components/card-blog";
import { PixCopyAndPaste } from "@/components/pix-copy-and-paste";
import TitleTop from "@/components/title";
import { TitleHalftone } from "@/components/title-halftone";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/by-my-coffee`;
  const image = `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`;

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
  return (
    <section className="flex h-160 w-full flex-col items-center justify-center p-4 md:h-185">
      <div className="halftone-blue border-oliver-dark flex h-full w-full flex-col items-center justify-center gap-4 rounded-sm border-2 bg-red-300 p-6">
        <TitleHalftone
          h2Exists={true}
          title="Seja Nosso Patrocinador, Ajude com um Pix de Qualquer Valor"
        />
        <div className="flex h-[160px] w-full flex-1 items-center justify-center md:h-[300px]">
          <Image
            src="/pix-new.png"
            alt="WhatsApp de Jander Nery"
            title="WhatsApp de Jander Nery"
            className="h-[150px] w-[150px] md:h-[280px] md:w-[280px]"
            width={500}
            height={500}
            loading="eager"
          />
        </div>
        <div className="mt-4 text-gray-900">
          <PixCopyAndPaste />
        </div>
      </div>
    </section>
  );
}
