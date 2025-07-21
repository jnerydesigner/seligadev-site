import { CardProductContainer } from "@/components/card-product-container";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/setup`;
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
    },
    twitter: {
      card: "summary",
      title: "Setup que eu utilizo",
      description: "Veja os produtos, equipamentos e serviços que eu uso no meu setup.",
    },
  };
}

export default async function PageSetup() {
  const setups = await prisma.setup.findMany();

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <div className="flex h-auto w-full flex-col items-center justify-center p-4">
        <div className="h1-rectangle-path">
          <h1 className="z-10 text-[1.8rem]">Produtos que eu Uso</h1>
        </div>
      </div>

      <CardProductContainer cardProducts={setups} />
    </section>
  );
}
