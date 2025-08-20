import Image from "next/image";
import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface HeroProps {
  className: string;
}

export default function Hero(props: HeroProps) {
  return (
    <section
      className={twMerge(
        "halftone-blue border-oliver-dark relative col-span-8 flex h-[360px] w-full items-center justify-center rounded-sm border-2 px-0 md:h-[370px]",
        props.className
      )}
    >
      <div className="relative z-10 -mt-[50px] flex w-full flex-col items-center gap-3 p-4 text-center">
        <div className="mt-4 h-[120px] w-[120px] md:mt-0 md:h-[150px] md:w-[150px]">
          <Image
            src="/logo-jander-nery-dev-redondo.svg"
            width={500}
            height={500}
            alt="Imagem do Perfil do Criador do site Se Liga Dev"
            className="h-full w-full object-contain"
            priority
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

        <div>
          <Link
            href="/resume/resume-jander-da-costa-nery"
            className="bg-oliver-dark hover:bg-oliver-light rounded-sm px-4 py-2 text-white transition-colors"
          >
            Saiba mais sobre mim
          </Link>
        </div>
      </div>
    </section>
  );
}
