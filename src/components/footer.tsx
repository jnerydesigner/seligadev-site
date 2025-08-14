import TitleTop from "./title";

export default function Footer() {
  return (
    <footer className="halftone-blue-no-border border-oliver-dark my-0 flex h-20 w-full items-center justify-center border-t-[2px] p-0 px-10 text-[0.8rem] md:h-10 md:px-2 md:text-[1rem]">
      <TitleTop titleStr={`&copy; 2024 Seligadev. Todos os direitos reservados.`} notH1={false}>
        <p className="z-10 flex w-[100%] items-center justify-center gap-2 rounded-sm bg-white px-10 py-1 md:w-[50%] md:p-0">
          <span>&copy; {new Date().getFullYear()} Seligadev.</span>{" "}
          <span>Todos os direitos reservados.</span>
        </p>
      </TitleTop>
    </footer>
  );
}
