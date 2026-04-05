import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/helpers/image.helper";
import { AdvertisingDirectusType } from "@/types/advertising.type";

interface HomeAdvertisingCardProps {
  advertising: AdvertisingDirectusType;
}

export function HomeAdvertisingCard({ advertising }: HomeAdvertisingCardProps) {
  return (
    <Link
      href={`/advertising/${advertising.slug}`}
      className="group halftone-blue border-oliver-dark flex items-center justify-center rounded-sm border-2 p-2 transition-transform duration-300 hover:scale-[1.02] sm:p-3"
    >
      <div className="border-oliver-dark flex w-full flex-col items-center justify-center gap-3 rounded-sm border-2 bg-white px-3 py-3 text-center text-zinc-800 shadow-sm sm:px-4 sm:py-4">
        <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:items-center sm:justify-start">
          <Image
            width={100}
            height={100}
            src={getImageUrl(advertising.image)}
            alt={advertising.title}
            className="h-14 w-14 flex-shrink-0 object-contain sm:h-16 sm:w-16"
          />
          <h3 className="w-full max-w-full break-words text-center text-sm leading-tight font-semibold sm:text-left sm:text-base md:text-lg">
            {advertising.title}
          </h3>
        </div>
        <span className="font-bangers text-oliver-dark text-xs sm:text-sm">Quer saber mais?</span>
      </div>
    </Link>
  );
}
