import Image from "next/image";
import Link from "next/link";

export interface CardProps {
  id?: string;
  name: string;
  price: number;
  productUrl: string;
  imageUrl: string;
}

export const CardProduct = ({ name, imageUrl, productUrl, price }: CardProps) => {
  return (
    <div className="div-rectangle-path flex justify-center items-center flex-col p-4">
      <div className="w-full h-40 z-10 border-2 border-amber-50">
        <Image
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-2 bg-gray-50"
          width={300}
          height={300}
        />
      </div>
      <div className="p-3 flex flex-col gap-2 z-10">
        <h2 className="font-medium line-clamp-2">{name}</h2>
        <span className="text-green-600 font-semibold bg-white p-2 rounded-sm text-center shadow-sm ">
          R${" "}
          {Number(price).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
        <Link
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-center text-gray-800 bg-yellow-500 hover:bg-yellow-600 transition rounded-md py-1 text-sm halftone-bg"
        >
          Ver na Amazon
        </Link>
      </div>
    </div>
  );
};
