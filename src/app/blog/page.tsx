import { CardBlog } from "@/components/card-blog";
import prisma from "@/lib/prisma";
import React from "react";

export default async function PageBlog() {
  const findPost = await prisma.post.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="h1-rectangle-path">
        <h1 className="z-10 text-[1.8rem]">Blog</h1>
      </div>
      {findPost.map((post) => (
        <CardBlog
          key={post.id}
          title={post.title}
          content={post.content}
          slug={post.slug}
          imageUrl={post.imageUrl || ""}
        />
      ))}
    </section>
  );
}
