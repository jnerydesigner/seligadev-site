import Hero from "@/components/hero";

import { CardHome } from "@/components/card-home";
import { Metadata } from "next";
import { NewsTicker } from "@/components/ticker";
import prisma from "@/lib/prisma";
import { CardFlexHome } from "@/components/card-flex-home";

import { getGlobals } from "@/lib/directus";
import { getDirectusAuthor, getDirectusPostsHome, getDirectusResume } from "@/api/directus";
import { AuthorDirectusTypeData } from "@/types/author.type";
import { JsonLd } from "@/components/json-ld";
import { HomePostsSection } from "@/components/home-posts-section";
import { ResumeDirectusTypeData } from "@/types/resume.type";
import { PostHomeDirectusTypeHome } from "@/types/post-home-directus.type";

type HomePostPreview = {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  banner?: string | null;
  imageUrl?: string | null;
  dateCreated?: string;
};

const simulatedHomePosts: HomePostPreview[] = [
  {
    id: 1,
    title: "Prisma + NestJS: iniciando o acesso ao banco de dados",
    slug: "prisma-nestjs-iniciando-o-acesso-ao-banco",
    content: "Aprenda a conectar sua API NestJS ao banco de dados usando Prisma.",
    banner: "/no-image.png",
    dateCreated: "2026-04-05T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Cansei de reescrever a mesma lógica de query no NestJS",
    slug: "cansei-de-reescrever-query-nestjs",
    content: "Uma abordagem simples para reaproveitar filtros e paginação.",
    banner: "/no-image.png",
    dateCreated: "2026-04-04T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Destrinchando o NestJS do zero ao primeiro endpoint",
    slug: "destrinchando-o-nestjs-do-zero",
    content: "Uma introdução prática para começar com NestJS sem complicação.",
    banner: "/no-image.png",
    dateCreated: "2026-04-03T10:00:00.000Z",
  },
  {
    id: 4,
    title: "Como organizar melhor seus módulos no backend",
    slug: "como-organizar-melhor-seus-modulos",
    content: "Dicas para estruturar projetos backend com mais clareza.",
    banner: "/no-image.png",
    dateCreated: "2026-04-02T10:00:00.000Z",
  },
  {
    id: 5,
    title: "Boas práticas para publicar conteúdo técnico no blog",
    slug: "boas-praticas-para-publicar-conteudo-tecnico",
    content: "Como deixar seus artigos mais legíveis, escaneáveis e úteis.",
    banner: "/no-image.png",
    dateCreated: "2026-04-01T10:00:00.000Z",
  },
];

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
  const author = await getDirectusAuthor<AuthorDirectusTypeData>();
  const resume = await getDirectusResume<ResumeDirectusTypeData>();

  const postsHome = await getDirectusPostsHome<PostHomeDirectusTypeHome>();


  console.log("Posts data:", JSON.stringify(postsHome.data[0].slug, null, 2));
  const global = await getGlobals();

  const posts = await prisma.post.findMany({
    take: 5,
  });
  const titleWithSlug = posts.map((post) => {
    return {
      title: post.title,
      slug: post.slug,
    };
  });

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
          featuredPost={simulatedHomePosts[0]}
          recentPosts={simulatedHomePosts.slice(1, 5)}
        />
      </div>
    </>
  );
}
