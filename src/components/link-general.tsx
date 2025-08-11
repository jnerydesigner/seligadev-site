import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LinkGeneralProps {
  url: string;
  image?: string;
  title: string;
  icon?: ReactNode;
  blank: boolean;
  className?: string;
}

export const LinkGeneral = ({
  url,
  image,
  title,
  icon,
  className,
  blank = true,
}: LinkGeneralProps) => {
  let classNameProps = "";
  if (className !== undefined) {
    classNameProps = className;
  }
  return (
    <Link
      href={url}
      target={blank ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className={`halftone-yellow border-oliver-dark mt-auto flex h-auto w-auto items-center justify-center gap-2 rounded-md border-2 bg-white px-2 py-1 text-center text-sm text-white transition hover:bg-yellow-600 md:h-12 ${classNameProps}`}
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
