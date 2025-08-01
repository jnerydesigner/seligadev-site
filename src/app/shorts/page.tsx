import { CardVideosContainer } from "@/components/card-video-container";
import TitleTop from "@/components/title";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 360;

export default async function PageShorts() {
  const shorts = await prisma.shorts.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <TitleTop titleStr="Shorts do Canal Jander Nery Dev" />

      <CardVideosContainer cardVideos={[]} cardShorts={shorts} shorts={true} />
    </section>
  );
}
