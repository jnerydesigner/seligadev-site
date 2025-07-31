import { CardBlog } from "@/components/card-blog";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/blog`;
  const image = `${baseUrl}/logo.png`;

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

export default async function PageBlog() {
  const findPost = await prisma.post.findMany();
  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="h1-rectangle-path w-full">
        <h1 className="z-10 text-[1.4rem] md:text-[1.8rem]">
          Blog do Se Liga Dev - Notícias Gerais
        </h1>
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
