import Link from "next/link";

export const Consult = () => {
  return (
    <div className="mb-20">
      <Link href="/consult">
        <div className="halftone-blue z-10 mt-10 flex h-32 items-center justify-between rounded-xl p-4 shadow-lg ring-1 ring-blue-300 transition-shadow duration-300 hover:shadow-2xl">
          <div>
            <h1 className="flex items-center justify-center rounded-sm bg-white px-6 py-2 text-2xl font-bold text-black drop-shadow-lg">
              Consultoria Premium 🚀
            </h1>
            <p className="mt-1 mt-2 flex items-center justify-center rounded-sm bg-white px-6 py-2 text-sm text-black">
              A orientação certa para levar seu projeto ao próximo nível.
            </p>
          </div>

          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow transition-colors duration-300 hover:bg-blue-100">
            Saiba Mais
          </button>
        </div>
      </Link>
    </div>
  );
};
