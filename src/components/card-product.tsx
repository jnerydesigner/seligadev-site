import Image from "next/image";
import Link from "next/link";
import { LinkGeneral } from "./link-general";

export interface CardProps {
  id?: string;
  name: string;
  price: number;
  productUrl: string;
  imageUrl: string;
  slug: string;
}

export const CardProduct = ({ name, imageUrl, productUrl, price, slug }: CardProps) => {
  return (
    <div className="halftone-blue flex h-auto flex-col items-center justify-center p-4">
      <div className="z-10 h-40 w-full border-2 border-amber-50">
        <Image
          src={imageUrl}
          alt={name}
          className="h-full w-full bg-gray-50 object-contain p-2"
          width={300}
          height={300}
        />
      </div>
      <div className="z-10 flex flex-col gap-2 p-3">
        <h2 className="line-clamp-2 font-medium">{name}</h2>
        <span className="rounded-sm bg-white p-2 text-center font-semibold text-green-600 shadow-sm">
          R${" "}
          {Number(price).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
        <LinkGeneral
          title="Ver Produto"
          image="/dedo.svg"
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/setup/${slug}`}
          blank={false}
        />
      </div>
    </div>
  );
};
