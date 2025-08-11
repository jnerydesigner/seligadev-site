import Link from "next/link";
import { TitleHalftone } from "./title-halftone";

interface CardHomeProps {
  title: string;
  description: string;
  link: string;
}

export const CardHome = (props: CardHomeProps) => {
  return (
    <div className="mb-2">
      <Link href={props.link}>
        <div className="halftone-blue border-oliver-dark z-10 mt-2 flex h-auto flex-col items-center justify-between rounded-xl border-2 p-4 duration-300 hover:bg-amber-100 hover:shadow-2xl md:h-40 md:flex-row md:gap-2">
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
