import React from "react";

interface TitleHalftoneProps {
  title: string;
  h2Exists: boolean;
  className?: string;
}

export const TitleHalftone = ({ title, h2Exists = true, className }: TitleHalftoneProps) => {
  if (!className) {
    className = "";
  }
  return (
    <div
      className={`halftone-yellow border-oliver-dark my-1 flex h-auto w-full items-center justify-center rounded-sm border-2 px-2.5 py-1.5 ${className}`}
    >
      {h2Exists ? (
        <h2 className="flex w-full flex-col items-center justify-center rounded-sm bg-white px-1 py-0.5 text-black md:flex-row">
          {title}
        </h2>
      ) : (
        <p className="flex w-full flex-col items-center justify-center rounded-sm bg-white px-1 py-0.5 text-black md:flex-row">
          {title}
        </p>
      )}
    </div>
  );
};
