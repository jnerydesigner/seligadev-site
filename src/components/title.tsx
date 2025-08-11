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
            "halftone-blue border-oliver-dark my-2 flex h-auto w-full items-center justify-center rounded-sm border-2 p-2 px-10 text-[1.4rem] md:h-20 md:text-[1.8rem]",
            className ? className : ""
          )}
        >
          <h1 className="z-10 flex w-full items-center justify-center rounded-sm bg-white px-10 py-4 md:p-0">
            {titleStr}
          </h1>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
