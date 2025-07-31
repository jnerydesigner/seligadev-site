import { CardVideosContainer } from "@/components/card-video-container";
import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";

export default async function PageShorts() {
  const shorts = await prisma.shorts.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="h1-rectangle-path">
        <h1 className="z-10 text-[1.8rem]">Shorts do Canal Jander Nery Dev</h1>
      </div>

      <CardVideosContainer cardVideos={[]} cardShorts={shorts} shorts={true} />
    </section>
  );
}
