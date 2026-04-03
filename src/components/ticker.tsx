"use client";

import React, { useEffect, useState } from "react";
import { LinkGeneral } from "./link-general";
import { TitleHalftone } from "./title-halftone";

interface TickerProps {
  postsTitleSlug: {
    title: string;
    slug: string;
  }[];
}

export const NewsTicker = ({ postsTitleSlug }: TickerProps) => {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % postsTitleSlug.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [postsTitleSlug, isMounted]);

  const currentItem = postsTitleSlug[index];

  return (
    <div className="halftone-blue border-oliver-dark my-2 flex h-auto min-h-[60px] flex-col items-center justify-between overflow-hidden rounded-sm border-2 bg-black px-4 py-2 text-white md:h-14 md:min-h-[unset] md:flex-row">
      <TitleHalftone title="noticias" h2Exists className="w-full md:w-30" />
      <div className="flex-grow overflow-hidden rounded-sm px-2.5 py-2 text-black transition-all duration-500">
        <LinkGeneral
          title={currentItem.title}
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${currentItem.slug}`}
          key={currentItem.slug}
          blank={true}
          image="/dedo.svg"
          className="md:flex-1"
        />
      </div>
    </div>
  );
};
