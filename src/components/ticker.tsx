"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LinkGeneral } from "./link-general";
import { TitleHalftone } from "./title-halftone";

const news = [
  "🚨 Última hora: Ações da XP sobem 12% após anúncio",
  "📢 Governo anuncia novo plano de investimento",
  "🌐 OpenAI lança nova atualização do GPT",
  "💰 Bitcoin ultrapassa US$ 70 mil novamente",
];

interface TickerProps {
  postsTitleSlug: {
    title: string;
    slug: string;
  }[];
}

export const NewsTicker = ({ postsTitleSlug }: TickerProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % postsTitleSlug.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [postsTitleSlug]);

  return (
    <div className="halftone-blue border-oliver-dark my-2 flex h-auto flex-col items-center justify-between overflow-hidden rounded-sm border-2 bg-black px-4 py-2 text-white md:h-14 md:flex-row">
      <TitleHalftone title="noticias" h2Exists className="md:w-30" />
      <div className="flex-grow overflow-hidden rounded-sm px-2.5 py-2 text-black transition-all duration-500">
        <LinkGeneral
          title={postsTitleSlug[index].title}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${postsTitleSlug[index].slug}`}
          key={postsTitleSlug[index].slug}
          blank={true}
          image="/dedo.svg"
          className="md:flex-1"
        />
      </div>
    </div>
  );
};
