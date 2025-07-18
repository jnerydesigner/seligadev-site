export const dynamic = "force-dynamic";

import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { CardProductContainer } from "@/components/card-product-container";

export default async function PageSetup() {
  const setups = await prisma.setup.findMany();

  return (
    <section className="w-full h-auto flex justify-center items-center flex-col p-4">
      <section className="w-full h-auto flex justify-center items-center flex-col p-4">
        <div className="h1-rectangle-path">
          <h1 className="z-10 text-[1.8rem]">Produtos que eu Uso</h1>
        </div>
      </section>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {setups.map((product) => (
          <div
            key={product.id}
            className="bg-secondary-seligadev rounded-xl shadow-sm hover:shadow-md transition text-sm"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-contain p-2 bg-gray-50 rounded-t-xl"
              width={300}
              height={300}
            />
            <div className="p-3 flex flex-col gap-2">
              <h2 className="font-medium line-clamp-2">{product.name}</h2>
              <span className="text-green-600 font-semibold">
                R${" "}
                {Number(product.price).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-center text-white bg-yellow-500 hover:bg-yellow-600 transition rounded-md py-1 text-sm"
              >
                Ver na Amazon
              </a>
            </div>
          </div>
        ))}
      </div> */}

      <CardProductContainer cardProducts={setups} />
    </section>
  );
}
