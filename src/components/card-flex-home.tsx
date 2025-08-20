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
        "halftone-blue border-oliver-dark col-span-4 mb-2 rounded-sm border-2 p-4 md:h-[370px]",
        props.className
      )}
    >
      <Link href={props.link}>
        <div className="hover:halftone-yellow z-10 flex h-auto flex-col items-center justify-between duration-300 hover:z-10 hover:shadow-sm md:h-[370px] md:flex-col md:items-center md:justify-center md:gap-2">
          <div>
            <h2 className="flex items-center justify-center rounded-sm bg-white px-6 py-2 text-2xl font-bold text-black drop-shadow-lg">
              {props.title}
            </h2>

            <TitleHalftone
              title={props.description}
              h2Exists={false}
              className="flex w-full items-center justify-center md:mt-4"
            />
          </div>

          <TitleHalftone title="Saiba Mais" h2Exists={false} className="md:w-40" />
        </div>
      </Link>
    </div>
  );
};
