import { CardBlog } from "@/components/card-blog";
import TitleTop from "@/components/title";
import { ApiKeyGenerator } from "@/lib/api-key-generator";
import prisma from "@/lib/prisma";
import { env } from "@/lib/zod-env";
import { PostType } from "@/types/posts.type";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/blog`;
  const image = `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`;

  return {
    title: `Blog | Se Liga Dev`,
    description: "Blog do Se Liga Dev",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Blog do Se Liga Dev",
      type: "website",
      description: "Blog do Se Liga Dev",
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Imagem do Blog Se Liga Dev",
        },
      ],
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog do Se Liga Dev",
      description: "Blog do Se Liga Dev",
      images: [image],
    },
  };
}

const hash = new ApiKeyGenerator();

export default async function PageBlog() {
  const keyHeaders = await hash.generateApiKeyHash();

  const url = `${env.NEXT_PUBLIC_BASE_BFF}/posts`;

  const postsFetch = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": keyHeaders,
    },
  });

  let findPost: PostType[] = await postsFetch.json();

  if (!findPost) {
    findPost = [];
  }

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <TitleTop titleStr="Blog do Se Liga Dev - Notícias Gerais" notH1 />
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
