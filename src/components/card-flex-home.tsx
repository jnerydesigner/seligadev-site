import Link from "next/link";
import { TitleHalftone } from "./title-halftone";
import { twMerge } from "tailwind-merge";

interface CardHomeProps {
  title: string;
  description: string;
  link: string;
  className: string;
}

export const CardFlexHome = (props: CardHomeProps) => {
  return (
    <div
      className={twMerge(
        "border-oliver-dark col-span-4 h-full rounded-sm border-2 p-4",
        props.className
      )}
    >
      <Link href={props.link} className="block h-full">
        <div className="hover:halftone-yellow z-10 flex min-h-[220px] h-full flex-col items-center justify-between gap-6 px-2 py-4 text-center duration-300 hover:z-10 hover:shadow-sm md:min-h-full">
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
            <h2 className="flex items-center justify-center rounded-sm bg-white px-4 py-2 text-xl font-bold text-black drop-shadow-lg sm:px-6 sm:text-2xl">
              {props.title}
            </h2>

            <TitleHalftone
              title={props.description}
              h2Exists={false}
              className="flex w-full items-center justify-center"
            />
          </div>

          <TitleHalftone title="Saiba Mais" h2Exists={false} className="w-full max-w-40" />
        </div>
      </Link>
    </div>
  );
};
