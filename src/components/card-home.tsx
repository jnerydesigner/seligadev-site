import Link from "next/link";

interface CardHomeProps {
  title: string;
  description: string;
  link: string;
}

export const CardHome = (props: CardHomeProps) => {
  return (
    <div className="mb-2">
      <Link href={props.link}>
        <div className="halftone-blue z-10 mt-2 flex h-auto flex-col items-center justify-between rounded-xl p-4 shadow-lg ring-1 ring-blue-300 transition-shadow duration-300 hover:shadow-2xl md:h-32 md:flex-row">
          <div>
            <h1 className="flex items-center justify-center rounded-sm bg-white px-6 py-2 text-2xl font-bold text-black drop-shadow-lg">
              {props.title}
            </h1>
            <p className="mt-4 flex items-center justify-center rounded-sm bg-white px-6 py-2 text-sm text-black md:mt-2">
              {props.description}
            </p>
          </div>

          <button className="mt-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow transition-colors duration-300 hover:bg-blue-100 md:mt-0">
            Saiba Mais
          </button>
        </div>
      </Link>
    </div>
  );
};
