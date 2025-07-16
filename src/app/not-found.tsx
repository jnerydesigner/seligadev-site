import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-principal-seligadev flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#F7F0E9]">404</h1>
      <p className="mt-4 text-xl text-[#F7F0E9]">Página não encontrada</p>
      <p className="mt-2 text-[#F7F0E9]/80">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        href="/home"
        className="mt-6 inline-block bg-[#F7F0E9] text-[#101928] px-6 py-2 rounded-xl font-semibold hover:bg-white transition"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
