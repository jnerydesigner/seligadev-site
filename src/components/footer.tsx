import TitleTop from "./title";

export default function Footer() {
  return (
    <footer className="halftone-blue-no-border my-0 flex h-10 w-full items-center justify-center p-0 px-10 text-[1.4rem] md:h-10 md:text-[1rem]">
      <TitleTop titleStr={`&copy; 2024 Seligadev. Todos os direitos reservados.`} notH1={false}>
        <p className="z-10 flex w-[50%] items-center justify-center rounded-sm bg-white px-10 py-1 md:p-0">
          &copy; {new Date().getFullYear()} Seligadev. Todos os direitos reservados.
        </p>
      </TitleTop>
    </footer>
  );
}
