import Hero from "@/components/hero";

import { CardHome } from "@/components/card-home";
import { Metadata } from "next";
import { NewsTicker } from "@/components/ticker";
import { CardFlexHome } from "@/components/card-flex-home";

import { getGlobals } from "@/lib/directus";
import { getDirectusAdvertising, getDirectusPostsHome, getDirectusResume } from "@/api/directus";
import { JsonLd } from "@/components/json-ld";
import { HomePostsSection } from "@/components/home-posts-section";
import { ResumeDirectusTypeData } from "@/types/resume.type";
import { PostHomeDirectusTypeHome } from "@/types/post-directus.type";
import { AdvertisingDirectusTypeData } from "@/types/advertising.type";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobals();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const image = global.image_url;
  return {
    title: {
      absolute: global.title,
    },
    description: global.description,
    keywords: [
      "desenvolvimento web",
      "programação",
      "blog tech",
      "tutoriais",
      "carreira developer",
      "javascript",
      "react",
      "next.js",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: global.title,
      type: "website",
      description: global.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}`,
      siteName: "Se Liga Dev",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Logo Site Se Liga Dev",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: global.title,
      description: global.description,
      images: [global.image_url],
    },
  };
}

export default async function Home() {
  const resume = await getDirectusResume<ResumeDirectusTypeData>();
  const { data: postsHome } = await getDirectusPostsHome<PostHomeDirectusTypeHome>();
  const advertising = await getDirectusAdvertising<AdvertisingDirectusTypeData>();
  const global = await getGlobals();
  const featuredPost = postsHome[0] ?? null;
  const recentPosts = postsHome.slice(1, 5);
  const titleWithSlug = postsHome.map((post) => ({
    title: post.title,
    slug: post.slug,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Se Liga Dev",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://seligadev.com",
    description: global.description,
    publisher: {
      "@type": "Organization",
      name: "Se Liga Dev",
      logo: {
        "@type": "ImageObject",
        url: global.image_url,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_BASE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="w-full">
        <NewsTicker postsTitleSlug={titleWithSlug} />
        <div className="grid h-auto w-full auto-rows-auto grid-cols-12 gap-2 md:items-stretch">
          <div className="col-span-12 grid gap-2 md:col-span-8">
            <Hero className="col-span-12 h-full" author={resume.data[0].User[0].User_id} />
            <CardHome
              title="🌏 Quer uma VPS para aumentar sua produtividade 🚀"
              description="Vem para Hostinger e seja feliz"
              link="/hostinger"
              className="halftone-emerald border-oliver-dark col-span-12 rounded-sm border-2"
            />
          </div>

          <CardFlexHome
            title="Consultoria Premium 🚀"
            description="A orientação certa para levar seu projeto ao próximo nível."
            link="/consult"
            className="halftone-purple col-span-12 h-full md:col-span-4"
          />
        </div>

        <HomePostsSection
          postsHome={postsHome}
          featuredPost={featuredPost}
          recentPosts={recentPosts}
          advertising={advertising}
        />
      </div>
    </>
  );
}
