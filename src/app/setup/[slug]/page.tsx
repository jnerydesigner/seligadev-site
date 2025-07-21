import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaAmazon } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await prisma.setup.findFirst({
    where: { slug: params.slug },
  });
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/setup/${product?.slug}`;

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto que você está procurando não existe.",
    };
  }

  return {
    title: `${product.name} | Se Liga Dev`,
    description: product.nameFull || product.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description: product.nameFull || product.name,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/setup/${params.slug}`,
      images: [
        {
          url: product.imageUrl,
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
      description: product.nameFull || product.name,
      images: [product.imageUrl],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.setup.findFirst({
    where: {
      slug,
    },
  });

  if (!product) {
    throw new Error("Not Found");
  }
  return (
    <div>
      <div className="flex h-auto w-full flex-col items-center justify-center p-4">
        <div className="h1-rectangle-path">
          <h1 className="z-10 text-[1.4rem]">{product?.name}</h1>
        </div>
      </div>

      <div className="halftone-red z-10 mt-10 flex h-90 items-center gap-2 bg-white p-4">
        <div className="z-10 h-60">
          <Image
            src={product?.imageUrl}
            alt="Imagem exemplo"
            className="h-full w-full object-contain p-2"
            width={300}
            height={300}
          />
        </div>
        <div className="relative flex h-60 flex-1 flex-col items-center justify-center p-2">
          <h2 className="rounded-sm bg-white p-4 text-center text-xl font-bold shadow-sm">
            {product.nameFull}
          </h2>
          <Link
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-10 w-50 items-center justify-center gap-4 rounded-md bg-yellow-500 py-1 text-center text-sm text-gray-800 shadow-sm transition hover:bg-yellow-600 hover:text-white"
          >
            <FaAmazon /> Ver na Amazon
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/setup`}
            className="absolute top-[-70px] right-2 mt-6 flex h-10 w-50 items-center justify-center gap-4 rounded-md bg-yellow-500 py-1 text-center text-sm text-gray-800 shadow-sm transition hover:bg-yellow-600 hover:text-white"
          >
            <FaComputer /> Voltar para o Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
