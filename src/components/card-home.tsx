import Link from "next/link";
import { TitleHalftone } from "./title-halftone";
import { twMerge } from "tailwind-merge";

interface CardHomeProps {
  title: string;
  description: string;
  link: string;
  className: string;
}

export const CardHome = (props: CardHomeProps) => {
  return (
    <div className={twMerge("w-full", props.className)}>
      <Link href={props.link} className="block h-full">
        <div className="z-10 flex h-full flex-col gap-4 p-3 text-center duration-300 hover:bg-amber-100 hover:shadow-2xl md:grid md:grid-cols-[minmax(0,1fr)_140px] md:grid-rows-[auto_auto] md:items-center md:gap-x-2 md:gap-y-3 md:p-2 md:text-left">
          <div className="w-full">
            <h2 className="flex items-center justify-center rounded-sm bg-white px-4 py-2 text-xl font-bold text-black drop-shadow-lg sm:px-6 sm:text-2xl md:justify-start">
              {props.title}
            </h2>
          </div>

          <TitleHalftone
            title="Saiba Mais"
            h2Exists={false}
            className="w-full md:row-span-2 md:w-[136px]"
          />

          <TitleHalftone
            title={props.description}
            h2Exists={false}
            className="flex w-full items-center justify-center md:justify-start"
          />
        </div>
      </Link>
    </div>
  );
};
