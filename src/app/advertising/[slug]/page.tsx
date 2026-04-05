import { getDirectusAdvertisingBySlug } from "@/api/directus";
import TitleTop from "@/components/title";
import { getImageUrl } from "@/helpers/image.helper";
import { AdvertisingDirectusTypeData } from "@/types/advertising.type";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

async function getAdvertisingBySlug(slug: string) {
  const response = await getDirectusAdvertisingBySlug<AdvertisingDirectusTypeData>(slug);
  return response.data[0] ?? null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const advertising = await getAdvertisingBySlug(slug);

  if (!advertising) {
    return {
      title: "Publicidade não encontrada",
      description: "A publicidade que você está procurando não existe.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/advertising/${advertising.slug}`;
  const image = getImageUrl(advertising.image);

  return {
    title: advertising.title,
    description: `Saiba mais sobre ${advertising.title}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: advertising.title,
      description: `Saiba mais sobre ${advertising.title}.`,
      url,
      siteName: "Se Liga Dev",
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: advertising.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: advertising.title,
      description: `Saiba mais sobre ${advertising.title}.`,
      images: [image],
    },
  };
}

export default async function AdvertisingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const advertising = await getAdvertisingBySlug(slug);

  if (!advertising) {
    notFound();
  }

  return (
    <section className="flex w-full flex-col items-center justify-center p-3 sm:p-4">
      <TitleTop titleStr={advertising.title} notH1 />

      <div className="halftone-blue border-oliver-dark flex w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-sm border-2 p-4 sm:p-6">
        <div className="border-oliver-dark flex w-full items-center justify-center rounded-sm border-2 bg-white p-4">
          <Image
            src={getImageUrl(advertising.image)}
            alt={advertising.title}
            width={600}
            height={600}
            className="h-auto max-h-[320px] w-auto max-w-full object-contain"
          />
        </div>

        <div className="border-oliver-dark flex w-full flex-col gap-3 rounded-sm border-2 bg-white p-4 text-center text-zinc-800">
          <h2 className="font-bangers text-2xl leading-tight sm:text-3xl">{advertising.title}</h2>
          <p className="text-sm uppercase tracking-wide text-zinc-600 sm:text-base">
            Posicao: {advertising.position}
          </p>
          <p className="text-sm text-zinc-700 sm:text-base">
            Esta e a pagina de detalhes da publicidade selecionada.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/"
              className="border-oliver-dark bg-oliver-dark rounded-sm border-2 px-4 py-2 text-white"
            >
              Voltar para home
            </Link>
            <Link
              href="/contato"
              className="border-oliver-dark rounded-sm border-2 bg-white px-4 py-2 text-zinc-900"
            >
              Quero anunciar tambem
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
