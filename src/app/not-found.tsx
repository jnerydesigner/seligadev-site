import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="halftone-blue bg-principal-seligadev flex min-h-screen flex-col items-center justify-center px-4 text-center text-black">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Página não encontrada</p>
      <p className="mt-2">A página que você está procurando não existe ou foi movida.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-[#F7F0E9] px-6 py-2 font-semibold text-[#101928] transition hover:bg-white"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
