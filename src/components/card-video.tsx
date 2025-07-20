import Image from "next/image";
import Link from "next/link";

export interface VideoProps {
  title: string;
  thumb: string;
  url: string;
}

export const CardVideo = ({ thumb, title, url }: VideoProps) => {
  return (
    <div className="div-rectangle-path flex justify-center items-center flex-col p-4">
      <div className="w-full h-40 z-10">
        <Image
          src={thumb}
          alt={title}
          className="w-full h-full object-contain p-2 shadow-md"
          width={300}
          height={300}
        />
      </div>
      <div className="p-3 flex flex-col gap-2 z-10">
        <h2 className="font-medium line-clamp-2">{title}</h2>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-center text-gray-800 bg-yellow-500 hover:bg-yellow-600 transition rounded-md py-1 text-sm halftone-bg"
        >
          Ver no Youtube
        </Link>
      </div>
    </div>
  );
};
