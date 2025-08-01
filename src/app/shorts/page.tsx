import { CardVideosContainer } from "@/components/card-video-container";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 360;

export default async function PageShorts() {
  const shorts = await prisma.shorts.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="halftone-blue flex w-full items-center justify-center">
        <h1 className="z-10 p-2 text-[1.4rem] md:text-[1.8rem]">Shorts do Canal Jander Nery Dev</h1>
      </div>

      <CardVideosContainer cardVideos={[]} cardShorts={shorts} shorts={true} />
    </section>
  );
}
