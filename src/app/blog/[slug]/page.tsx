import React from "react";
import { PostContainer } from "@/components/post-container";
import prisma from "@/lib/prisma";
import { PostMapper } from "@/types/mapper/post.mapper";
import { Metadata } from "next";
import { ConvertMdToText } from "@/lib/convert-md-to-text";
import { getPostBySlug } from "@/lib/directus";
import { PostContainerDirectus } from "@/components/post-container-directus";
import { JsonLd } from "@/components/json-ld";
import { getDirectusAssetUrl } from "@/helpers/image.helper";
export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const directusPost = await getPostBySlug(slug);

  if (directusPost) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const url = `${baseUrl}/blog/${directusPost.slug}`;
    const description = directusPost.content
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
    const image = getDirectusAssetUrl(
      directusPost.banner,
      "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png"
    );

    return {
      title: directusPost.title,
      description: description || directusPost.title,
      keywords: [directusPost.title, "blog", "desenvolvimento web", "programação"],
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: directusPost.title,
        type: "article",
        description: description || directusPost.title,
        url,
        images: [
          {
            url: image,
            width: 800,
            height: 600,
            alt: directusPost.title,
          },
        ],
        siteName: "Se Liga Dev",
      },
      twitter: {
        card: "summary_large_image",
        title: directusPost.title,
        description: description || directusPost.title,
        images: [image],
      },
    };
  }

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
  const image = post.imageUrl ?? `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`;

  return {
    title: post.title,
    description: textMD,
    keywords: [post.title, "blog", "desenvolvimento web", "programação"],
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

  const post = await getPostBySlug(slug);

  if (post?.title) {
    const postDescription = post.content?.substring(0, 160).replace(/<[^>]*>/g, "") || post.title;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: postDescription,
      image: post.banner || "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png",
      datePublished: post.date_created,
      author: {
        "@type": "Person",
        name: "Jander Nery",
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

  if (!blog) {
    throw new Error("Not found");
  }

  const postMapper = PostMapper.toResponse(blog);
  const blogDescription =
    postMapper.content?.substring(0, 160).replace(/<[^>]*>/g, "") || blog.title;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blogDescription,
    image: postMapper.imageUrl || "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png",
    datePublished: (blog as unknown as { createdAt: string }).createdAt || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: postMapper.user.name,
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
    </>
  );
}
