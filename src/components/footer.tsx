import TitleTop from "./title";

export default function Footer() {
  return (
    <footer className="halftone-blue border-oliver-dark mx-auto my-0 mb-1 flex w-full items-center justify-center rounded-l-sm rounded-r-sm border-[2px] px-3 py-4 text-[0.8rem] md:px-2 md:py-2 md:text-[1rem]">
      <TitleTop
        titleStr={`&copy; 2024 Seligadev. Todos os direitos reservados.`}
        notH1={false}
        className="bg-pink-600"
      >
        <p className="z-10 flex w-full flex-1 flex-wrap items-center justify-center gap-1 rounded-sm bg-white px-2 py-2 text-center md:w-[50%] md:px-10">
          <span>&copy; {new Date().getFullYear()} Seligadev.</span>
          <span>Todos os direitos reservados.</span>
        </p>
      </TitleTop>
    </footer>
  );
}
