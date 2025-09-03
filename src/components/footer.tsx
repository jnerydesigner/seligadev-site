import TitleTop from "./title";

export default function Footer() {
  return (
    <footer className="halftone-blue border-oliver-dark mx-auto my-0 mb-1 flex h-20 w-full max-w-[100%] items-center justify-center rounded-l-sm rounded-r-sm border-[2px] p-0 px-10 py-6 text-[0.8rem] md:h-10 md:px-2 md:text-[1rem]">
      <TitleTop
        titleStr={`&copy; 2024 Seligadev. Todos os direitos reservados.`}
        notH1={false}
        className="bg-pink-600"
      >
        <p className="z-10 flex w-[100%] flex-1 items-center justify-center gap-2 rounded-sm bg-white px-2 py-1 md:w-[50%] md:p-0 md:px-10">
          <span>&copy; {new Date().getFullYear()} Seligadev.</span>{" "}
          <span>Todos os direitos reservados.</span>
        </p>
      </TitleTop>
    </footer>
  );
}
