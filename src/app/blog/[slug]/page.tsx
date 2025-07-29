import React from "react";
import { PostContainer } from "@/components/post-container";
import { markdownContent } from "@/data/markdown-content";
import prisma from "@/lib/prisma";
import { PostType } from "@/types/posts.type";
import { PostMapper } from "@/types/mapper/post.mapper";
import { Metadata } from "next";
import { ConvertMdToText } from "@/lib/convert-md-to-text";
export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
  });

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não existe.",
    };
  }
  const textMD = await ConvertMdToText(post?.content);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/blog/${post.slug}`;
  const image = post.imageUrl ?? `${baseUrl}/logo.png`;

  return {
    title: `${post.title} | Se Liga Dev`,
    description: textMD,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      type: "article",
      description: textMD,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: textMD,
      images: [image],
    },
  };
}

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
