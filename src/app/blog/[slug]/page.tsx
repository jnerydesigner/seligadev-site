import React from "react";
import { Metadata } from "next";
import { getPostBySlug } from "@/lib/directus";
import { PostContainerDirectus } from "@/components/post-container-directus";
import { JsonLd } from "@/components/json-ld";
import { getDirectusAssetUrl } from "@/helpers/image.helper";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não existe.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/blog/${post.slug}`;
  const description = post.content
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const image = getDirectusAssetUrl(
    post.banner,
    "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png"
  );

  return {
    title: post.title,
    description: description || post.title,
    keywords: [post.title, "blog", "desenvolvimento web", "programação"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      type: "article",
      description: description || post.title,
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
      description: description || post.title,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postDescription = post.content?.substring(0, 160).replace(/<[^>]*>/g, "") || post.title;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: postDescription,
    image: getDirectusAssetUrl(post.banner, "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png"),
    datePublished: post.date_created,
    author: {
      "@type": "Person",
      name: post.post_author[0]?.author_id?.name || "Jander Nery",
      url: "https://seligadev.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Se Liga Dev",
      logo: {
        "@type": "ImageObject",
        url: "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png",
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PostContainerDirectus post={post} />
    </>
  );
}
