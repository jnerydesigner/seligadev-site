import Image from "next/image";
import Link from "next/link";
import { LinkGeneral } from "./link-general";

export interface ShortsProps {
  title: string;
  thumb: string;
  url: string;
}

export const CardShorts = ({ thumb, title, url }: ShortsProps) => {
  return (
    <div className="halftone-blue border-oliver-dark flex flex-col items-center justify-center rounded-sm border-2 p-4">
      <div className="relative z-10 w-full overflow-hidden rounded-md pb-[177.77%] shadow-md">
        <Image
          src={thumb}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover p-2"
          fill
        />
      </div>

      <div className="z-10 flex w-full flex-col gap-2 p-3 text-center">
        <h2 className="line-clamp-2 text-lg font-medium">{title}</h2>
        <LinkGeneral
          image="/youtube-bg-white.svg"
          title="Ver no Youtube"
          url={url}
          blank={true}
          className="text-[1rem] md:text-[0.8rem]"
        />
      </div>
    </div>
  );
};
