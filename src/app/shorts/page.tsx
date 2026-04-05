import { getDirectusShorts } from "@/api/directus";
import { CardVideosContainer } from "@/components/card-video-container";
import TitleTop from "@/components/title";
import { ShortDataType } from "@/types/shorts.type";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/shorts`;
  const image = `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`;
  return {
    title: "Shorts do Youtube",
    description: "Veja alguns shorts do youtube relevantes do canal jander nery dev",
    keywords: ["shorts", "youtube", "vídeos curtos", "tutoriais rápidos", "dicas programação"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Shorts do Youtube | Se Liga Dev",
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
      title: "Shorts do Youtube | Se Liga Dev",
      description: "Veja alguns shorts do youtube relevantes do canal jander nery dev",
    },
  };
}

export default async function PageShorts() {
  const shortsDirectus = await getDirectusShorts<ShortDataType>();
  const shorts = shortsDirectus.data;

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <TitleTop titleStr="Shorts do Canal Jander Nery Dev" notH1 />

      <CardVideosContainer cardVideos={[]} cardShorts={shorts} shorts={true} />
    </section>
  );
}
