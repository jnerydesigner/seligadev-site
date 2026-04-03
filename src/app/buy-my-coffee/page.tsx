import { CardBlog } from "@/components/card-blog";
import { PixCopyAndPaste } from "@/components/pix-copy-and-paste";
import TitleTop from "@/components/title";
import { TitleHalftone } from "@/components/title-halftone";
import { Article } from "@/helpers/article-convert.helper";
import { getImageUrl } from "@/helpers/image.helper";
import { getBlog, getByMyCoffe } from "@/lib/directus";
import prisma from "@/lib/prisma";
import { ByMyCoofeType } from "@/types/bymycoffe.type";
import { PostBlogType } from "@/types/post_blog.type";
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
  const bymycoffe: ByMyCoofeType = await getByMyCoffe();
  return (
    <section className="flex w-full flex-col items-center justify-center p-3 sm:p-4">
      <div className="halftone-blue border-oliver-dark flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-sm border-2 bg-red-300 p-4 sm:p-6">
        <TitleHalftone
          h2Exists={true}
          title={bymycoffe.title}
        />
        <div className="flex w-full items-center justify-center">
          <Image
            src={getImageUrl(bymycoffe.qrcode_pix)}
            alt={`QR Code para ${bymycoffe.description}`}
            title={`QR Code para ${bymycoffe.description}`}
            className="h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px]"
            width={500}
            height={500}
            loading="eager"
          />
        </div>
        <div className="mt-4 text-gray-900">
          <PixCopyAndPaste textToCopy={bymycoffe.pix} />
        </div>
      </div>
    </section>
  );
}
