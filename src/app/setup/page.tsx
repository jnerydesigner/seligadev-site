import { getDirectusSetupData } from "@/api/directus";
import { CardProductContainer } from "@/components/card-product-container";
import TitleTop from "@/components/title";
import { SetupMapper } from "@/types/mapper/setup.mapper";
import { SetupPageDirectusDataType } from "@/types/setup_page_directus.type";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/setup`;
  const image = `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`;
  return {
    title: "Setup que eu utilizo | Se Liga Dev",
    description: "Veja os produtos, equipamentos e serviços que eu uso no meu setup.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Setup que eu utilizo",
      description: "Veja os produtos, equipamentos e serviços que eu uso no meu setup.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/setup`,
      siteName: "Se Liga Dev",
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Imagem do Blog Se Liga Dev",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "Setup que eu utilizo",
      description: "Veja os produtos, equipamentos e serviços que eu uso no meu setup.",
    },
  };
}

const getParams = "/items/setup?fields=*,setup_items.*,setup_items.setup_items_id.*"

export default async function PageSetup() {
  const setupData = await getDirectusSetupData<SetupPageDirectusDataType>(getParams);
  const { data: setup } = setupData;
  const setupMapper = SetupMapper.toResponse(setup);

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-3 sm:p-4">
      <TitleTop titleStr={setupMapper.title} notH1 />

      <CardProductContainer cardProducts={setupMapper.setup_items} />
    </section>
  );
}
