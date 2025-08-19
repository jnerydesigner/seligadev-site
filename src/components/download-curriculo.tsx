import Link from "next/link";
import React from "react";
import { DownloadCurriculoIcon } from "./icons/icon-download-curriculo";

export const DownloadCurriculo = () => {
  return (
    <Link
      href="/curriculo_jander_da_costa_nery.pdf"
      download="curriculo_jander_da_costa_nery"
      className="halftone-gray-light flex h-12 w-full items-center justify-center text-white"
    >
      <p className="px-4 py-2">Aqui o download do curriculo</p>
      <DownloadCurriculoIcon size={36} />
    </Link>
  );
};
