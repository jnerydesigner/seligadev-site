import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="halftone-blue relative flex h-[380px] w-full items-center justify-center rounded-sm px-0 md:h-[350px]">
      <div className="relative z-10 -mt-[50px] flex w-full flex-col items-center gap-3 p-4 text-center">
        <div className="mt-4 h-[120px] w-[120px] md:mt-0 md:h-[150px] md:w-[150px]">
          <Image
            src="/logo-jander-nery-dev-redondo.svg"
            width={500}
            height={500}
            alt="Imagem do Perfil do Criador do site Se Liga Dev"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="font-bangers leading-tight">
          <h1>Jander da Costa Nery 👨‍💻</h1>
          <p>Apaixonado por tecnologia 🚀</p>
          <p>Apaixonado por ensinar 📚</p>
        </div>

        <ul className="mt-2 flex w-full items-center justify-center gap-2 px-0 md:gap-4 md:px-10">
          {[
            {
              href: "https://www.linkedin.com/in/jander-nery",
              alt: "LinkedIn",
              src: "/linkedin.svg",
            },
            {
              href: "https://www.youtube.com/@jandernery",
              alt: "YouTube",
              src: "/youtube.svg",
            },
            {
              href: "https://x.com/jandernerydev",
              alt: "X",
              src: "/icon-x.svg",
            },
            { href: "#", alt: "Instagram", src: "/instagram.svg" },
            { href: "#", alt: "Facebook", src: "/facebook.svg" },
            {
              href: "https://github.com/jnerydesigner",
              alt: "GitHub",
              src: "/github.svg",
            },
          ].map(({ href, alt, src }) => (
            <li
              key={alt}
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-white shadow"
            >
              <Link href={href} target="_blank" rel="noopener noreferrer" title={alt}>
                <Image src={src} width={20} height={20} alt={alt} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
