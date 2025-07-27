import React from "react";
import { PostContainer } from "@/components/post-container";
import { markdownContent } from "@/data/markdown-content";
import prisma from "@/lib/prisma";
import { PostType } from "@/types/posts.type";
import { PostMapper } from "@/types/mapper/post.mapper";
export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const blog = await prisma.post.findFirst({
    where: {
      slug,
    },
    include: {
      user: {
        include: {
          socialMedias: true,
        },
      },
    },
  });

  if (!blog) {
    throw new Error("Not found");
  }

  const postMapper = PostMapper.toResponse(blog);
  console.log(postMapper);

  return (
    <PostContainer
      title={blog.title}
      authorName={postMapper.user.name}
      avatar={postMapper.user.avatarUrl}
      content={postMapper.content}
      noticeFontLink={postMapper.newsSourceUrl}
      noticeFontTitle={postMapper.newsSource}
      socialMedias={postMapper.user.socialMedias}
      banner={postMapper.imageUrl}
    />
  );
}
