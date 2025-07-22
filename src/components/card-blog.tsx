import Link from "next/link";
import React from "react";

export const CardBlog = () => {
  return (
    <div className="halftone-red hover:bg-red-dark z-10 mt-10 flex h-32 cursor-pointer items-center p-4">
      <Link href="/blog/1234567" className="z-10 flex h-full flex-1 items-center gap-4 p-10">
        <div className="flex-1">
          <h2 className="text-xl font-bold">Título da Notícia</h2>
          <p className="line-clamp-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt doloremque sint quam
            beatae tenetur eum porro ipsa, molestiae illum itaque et odit? Nisi libero deserunt,
            rerum tempore nostrum numquam adipisci?
          </p>
        </div>
      </Link>
    </div>
  );
};
