// src/app/setup/[slug]/page.tsx
import { getDirectusSetupData } from "@/api/directus";
import { CardProductContainer } from "@/components/card-product-container";
import Image from "next/image";
import { FaAmazon } from "react-icons/fa";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinkGeneral } from "@/components/link-general";
import TitleTop from "@/components/title";
import { SetupMapper } from "@/types/mapper/setup.mapper";
import { SetupPageDirectusDataType } from "@/types/setup_page_directus.type";

export const dynamic = "force-dynamic";

type tParams = Promise<{ slug: string }>;
const getParams = "/items/setup?fields=*,setup_items.*,setup_items.setup_items_id.*";

async function getSetupPageData() {
  const setupData = await getDirectusSetupData<SetupPageDirectusDataType>(getParams);
  return SetupMapper.toResponse(setupData.data);
}

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const { slug }: { slug: string } = await params;
  const setupPageData = await getSetupPageData();
  const product = setupPageData.setup_items.find((item) => item.slug === slug);

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
    keywords: [product.name, "setup", "equipamento", "produto"],
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
  const setupPageData = await getSetupPageData();
  const product = setupPageData.setup_items.find((item) => item.slug === slug);
  const recommendedProducts = setupPageData.setup_items
    .filter((item) => item.slug !== slug)
    .slice(0, 4);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center p-4">
      <div className="flex h-auto w-full flex-col items-center justify-center rounded-sm p-4">
        <TitleTop titleStr={product.name} notH1 />
      </div>

      <div className="halftone-red z-10 mt-10 flex h-90 w-full items-center gap-2 rounded-sm bg-white p-4">
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
                key={product.id}
                blank={true}
              />
            ) : null}
          </div>
        </div>
      </div>

      {recommendedProducts.length > 0 ? (
        <section className="mt-10 flex w-full flex-col items-center">
          <span className="halftone-yellow border-oliver-dark rounded-sm border-2 bg-white px-4 py-2 text-sm font-semibold tracking-[0.2em] text-black uppercase">
            Recomendados
          </span>
          <p className="mt-3 text-center text-sm text-gray-700">
            Continue navegando por outros itens do setup sem sair da página.
          </p>
          <div className="mt-6 w-full">
            <CardProductContainer cardProducts={recommendedProducts} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
