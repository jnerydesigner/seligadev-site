import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostProps {
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
}

export const CardBlog = async ({ title, slug, content, imageUrl }: PostProps) => {
  return (
    <div className="halftone-blue z-10 mt-10 flex h-40 cursor-pointer items-center p-4 hover:bg-blue-200">
      <Link href={`/blog/${slug}`} className="z-10 flex h-full w-full items-center gap-4 p-4">
        <div className="h-full w-32 flex-shrink-0 overflow-hidden rounded">
          <Image
            src={imageUrl || "/no-image.png"}
            alt={title}
            className="h-full w-full object-cover"
            width={600}
            height={600}
          />
        </div>

        <div className="flex-1 rounded bg-white p-3 shadow">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <p className="line-clamp-2 text-sm text-gray-700">{content}</p>
        </div>
      </Link>
    </div>
  );
};
