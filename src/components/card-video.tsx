import Image from "next/image";
import Link from "next/link";
import { LinkGeneral } from "./link-general";

export interface VideoProps {
  title: string;
  thumb: string;
  url: string;
}

export const CardVideo = ({ thumb, title, url }: VideoProps) => {
  return (
    <div className="div-rectangle-path flex flex-col items-center justify-center p-4">
      <div className="z-10 h-40 w-full">
        <Image
          src={thumb}
          alt={title}
          className="h-full w-full object-contain p-2 shadow-md"
          width={300}
          height={300}
        />
      </div>
      <div className="z-10 flex flex-col gap-2 p-3">
        <h2 className="line-clamp-2 font-medium">{title}</h2>
        <LinkGeneral image="/youtube-bg-white.svg" title="Ver no Youtube" url={url} blank={true} />
      </div>
    </div>
  );
};
