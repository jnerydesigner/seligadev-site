import { CardProductContainer } from "@/components/card-product-container";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PageSetup() {
  const setups = await prisma.setup.findMany();

  return (
    <section className="w-full h-auto flex justify-center items-center flex-col p-4">
      <div className="w-full h-auto flex justify-center items-center flex-col p-4">
        <div className="h1-rectangle-path">
          <h1 className="z-10 text-[1.8rem]">Produtos que eu Uso</h1>
        </div>
      </div>

      <CardProductContainer cardProducts={setups} />
    </section>
  );
}
