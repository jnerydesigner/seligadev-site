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
    <div className={twMerge("mb-2", props.className)}>
      <Link href={props.link}>
        <div className="z-10 flex h-auto flex-col items-center justify-between gap-4 rounded-xl p-4 text-center duration-300 hover:bg-amber-100 hover:shadow-2xl md:h-40 md:flex-row md:gap-2 md:text-left">
          <div className="w-full">
            <h2 className="flex items-center justify-center rounded-sm bg-white px-4 py-2 text-xl font-bold text-black drop-shadow-lg sm:px-6 sm:text-2xl md:justify-start">
              {props.title}
            </h2>

            <TitleHalftone
              title={props.description}
              h2Exists={false}
              className="flex w-full items-center justify-center md:mt-4 md:justify-start"
            />
          </div>

          <TitleHalftone title="Saiba Mais" h2Exists={false} className="w-full md:w-40" />
        </div>
      </Link>
    </div>
  );
};
