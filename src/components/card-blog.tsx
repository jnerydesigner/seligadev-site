import { getImageUrl } from "@/helpers/image.helper";
import { ConvertMdToText } from "@/lib/convert-md-to-text";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostProps {
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  imageId?: string | null;
}

export const CardBlog = async ({ title, slug, content, imageUrl, imageId }: PostProps) => {
  if (imageId) {
    imageUrl = getImageUrl(imageId);
  }

  const plainContent = await ConvertMdToText(content, 180);

  return (
    <div className="halftone-blue border-oliver-dark z-10 mt-6 flex w-full cursor-pointer flex-col items-center justify-center rounded-sm border-2 p-3 hover:bg-blue-200 sm:p-4 md:mt-10 md:h-40">
      <Link
        href={`/blog/${slug}`}
        className="z-10 flex h-full w-full flex-col items-center gap-4 p-4 md:flex-row"
      >
        <div className="h-30 w-full flex-shrink-0 overflow-hidden rounded md:h-full md:w-32">
          <Image
            src={imageUrl || "/no-image.png"}
            alt={title}
            className="h-full w-full md:object-cover"
            width={600}
            height={600}
          />
        </div>

        <div className="w-full rounded bg-white p-3 shadow md:w-[80%]">
          <h2 className="text-lg font-bold text-black sm:text-xl">{title}</h2>
          <p className="line-clamp-3 text-sm text-gray-700">{plainContent}</p>
        </div>
      </Link>
    </div>
  );
};
