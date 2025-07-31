import { CardVideosContainer } from "@/components/card-video-container";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export interface VideoResponseDB {
  id: string;
  title: string;
  content: string;
  thumb: string;
  url: string;
  createdAt: Date;
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/blog`;
  const image = `${baseUrl}/logo.png`;

  return {
    title: `Vídeos | Se Liga Dev`,
    description: "Videos do Canal Jander Nery Dev / Se Liga Dev",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Vídeos do Canal Jander Nery Dev",
      type: "website",
      description: "Videos do Canal Jander Nery Dev / Se Liga Dev",
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
      title: "Videos do Canal Jander Nery Dev",
      description: "Videos do Canal Jander Nery Dev / Se Liga Dev",
      images: [image],
    },
  };
}

export default async function PageVideos() {
  const videos = await prisma.videos.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="h1-rectangle-path">
        <h1 className="z-10 text-[1.8rem]">Vídeos do Canal Jander Nery Dev</h1>
      </div>

      <CardVideosContainer cardVideos={videos} cardShorts={[]} shorts={false} />
    </section>
  );
}
