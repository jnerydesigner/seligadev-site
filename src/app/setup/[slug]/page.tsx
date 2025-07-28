// src/app/setup/[slug]/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaAmazon } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkGeneral } from "@/components/link-general";

export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const product = await prisma.setup.findFirst({
    where: { slug },
    select: {
      slug: true,
      name: true,
      nameFull: true,
      imageUrl: true,
    },
  });

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto que você está procurando não existe.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/setup/${product.slug}`;
  const description = product.nameFull || product.name;
  const image = product.imageUrl ?? `${baseUrl}/og-default.png`;

  return {
    title: `${product.name} | Se Liga Dev`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;

  const product = await prisma.setup.findFirst({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  return (
    <div>
      <div className="flex h-auto w-full flex-col items-center justify-center p-4">
        <div className="h1-rectangle-path">
          <h1 className="z-10 text-[1.4rem]">{product.name}</h1>
        </div>
      </div>

      <div className="halftone-red z-10 mt-10 flex h-90 items-center gap-2 bg-white p-4">
        <div className="z-10 h-60">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.nameFull || product.name}
              className="h-full w-full object-contain p-2"
              width={300}
              height={300}
              priority
            />
          ) : null}
        </div>

        <div className="relative flex h-60 flex-1 flex-col items-center justify-center p-2">
          <h2 className="rounded-sm bg-white p-4 text-center text-xl font-bold shadow-sm">
            {product.nameFull ?? product.name}
          </h2>
          <div className="mt-4 flex h-auto w-full items-center justify-center gap-4">
            <span className="rounded-sm bg-white p-2 text-center font-semibold text-green-600 shadow-sm">
              R${" "}
              {Number(product.price).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>

            {product.productUrl ? (
              <LinkGeneral
                title="Ver na Amazon"
                url={product.productUrl}
                icon={<FaAmazon className="h-6 w-6 text-black" />}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
