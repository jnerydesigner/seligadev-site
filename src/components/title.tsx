import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TitleTopProps {
  titleStr: string;
  notH1: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function TitleTop({ titleStr, notH1, className, children }: TitleTopProps) {
  return (
    <>
      {notH1 ? (
        <div
          className={twMerge(
            "halftone-blue border-oliver-dark my-2 flex h-auto w-full items-center justify-center rounded-sm border-2 p-2 px-4 text-center text-[1.05rem] sm:px-6 sm:text-[1.2rem] md:h-20 md:px-10 md:text-[1.8rem] ",
            className ? className : ""
          )}
        >
          <h1 className="z-10 flex w-full items-center justify-center rounded-sm bg-white px-3 py-4 text-center sm:px-6 md:p-0 md:px-10 border-b-2 border-b-blue-400">
            {titleStr}
          </h1>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
