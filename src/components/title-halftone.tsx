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
    <div className={`halftone-yellow my-1 rounded-sm px-2.5 py-1.5 ${className}`}>
      {h2Exists ? (
        <h2 className="rounded-sm bg-white px-1 py-0.5 text-black">{title}</h2>
      ) : (
        <p className="rounded-sm bg-white px-1 py-0.5 text-black">{title}</p>
      )}
    </div>
  );
};
