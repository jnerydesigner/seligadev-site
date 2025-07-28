import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LinkGeneralProps {
  url: string;
  image?: string;
  title: string;
  icon?: ReactNode;
  blank: boolean;
}

export const LinkGeneral = ({ url, image, title, icon, blank = true }: LinkGeneralProps) => {
  return (
    <Link
      href={url}
      target={blank ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="halftone-yellow mt-auto flex h-11 w-auto items-center justify-center gap-2 rounded-md bg-white px-2 py-1 text-center text-sm text-white transition hover:bg-yellow-600"
    >
      {image ? (
        <Image src={image} alt="Logo Youtube" width={200} height={200} className="h-8 w-8" />
      ) : (
        icon
      )}

      <span className="block rounded-sm bg-white px-2 py-0.5 text-black">{title}</span>
    </Link>
  );
};
