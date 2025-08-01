import React from "react";

interface TitleTopProps {
  titleStr: string;
}

export default function TitleTop({ titleStr }: TitleTopProps) {
  return (
    <div className="halftone-blue my-2 flex h-20 w-full items-center justify-center rounded-sm">
      <h1 className="z-10 rounded-sm bg-white p-2 px-10 text-[1.4rem] md:text-[1.8rem]">
        {titleStr}
      </h1>
    </div>
  );
}
