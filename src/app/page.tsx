import Hero from "@/components/hero";

import { CardHome } from "@/components/card-home";
import { Metadata } from "next";
import { NewsTicker } from "@/components/ticker";
import prisma from "@/lib/prisma";
import { CardFlexHome } from "@/components/card-flex-home";

import { getGlobals } from '@/lib/directus';


export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobals();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const image = global.image_url;
  return {
    title: global.title,
    description: global.description,
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
    }
  };
}



export default async function Home() {

  const posts = await prisma.post.findMany({
    take: 5,
  });
  const titleWithSlug = posts.map((post) => {
    return {
      title: post.title,
      slug: post.slug,
    };
  });

  return (
    <div className="w-full">
      <NewsTicker postsTitleSlug={titleWithSlug} />
      <div className="grid h-auto w-full auto-rows-auto grid-cols-12 gap-2">
        <Hero className="col-span-12 md:col-span-8" />
        <CardFlexHome
          title="Consultoria Premium 🚀"
          description="A orientação certa para levar seu projeto ao próximo nível."
          link="/consult"
          className="halftone-purple col-span-12 md:col-span-4"
        />

        <CardHome
          title="🌏 Quer uma VPS para aumentar sua produtividade 🚀"
          description="Vem para Hostinger e seja feliz"
          link="/hostinger"
          className="halftone-emerald border-oliver-dark col-span-12 rounded-sm border-2"
        />
      </div>
    </div>
  );
}
