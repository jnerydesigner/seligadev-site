"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LinkGeneral } from "./link-general";

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
    <div className="halftone-blue my-2 flex h-14 items-center justify-between overflow-hidden rounded-sm bg-black px-4 py-2 text-white">
      <h2 className="rounded-sm bg-white px-2.5 py-2 text-black">Notícias</h2>
      <div className="rounded-sm px-2.5 py-2 whitespace-nowrap text-black transition-all duration-500">
        <LinkGeneral
          title={postsTitleSlug[index].title}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${postsTitleSlug[index].slug}`}
          key={postsTitleSlug[index].slug}
          blank={true}
          image="/dedo.svg"
        />
      </div>
    </div>
  );
};
