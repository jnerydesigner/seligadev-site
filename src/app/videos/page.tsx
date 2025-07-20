import { CardVideosContainer } from "@/components/card-video-container";
import prisma from "@/lib/prisma";


export const dynamic = "force-dynamic";

export interface VideoResponseDB {
  id: string;
  title: string;
  content: string;
  thumb: string;
  url: string;
  createdAt: Date;
}

export default async function PageVideos() {
  const videos = await prisma.videos.findMany();
  return (
    <section className="w-full h-auto flex justify-center items-center flex-col p-4">
      <div className="h1-rectangle-path">
        <h1 className="z-10 text-[1.8rem]">Vídeos</h1>
      </div>

      <CardVideosContainer cardVideos={videos} />
    </section>
  );
}
