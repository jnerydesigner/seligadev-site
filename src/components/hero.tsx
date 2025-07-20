import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-rectangle-path relative w-full h-[320px] md:h-[380px] flex items-center justify-center px-4">
      <div className="w-full relative z-10 flex flex-col items-center gap-3 text-center mt-[-50px] p-4">
        <div className="h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
          <Image
            src="/logo-jander-nery-dev-redondo.svg"
            width={500}
            height={500}
            alt="Imagem do Perfil do Criador do site Se Liga Dev"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="font-bangers leading-tight">
          <p>Jander da Costa Nery 👨‍💻</p>
          <p>Apaixonado por tecnologia 🚀</p>
          <p>Apaixonado por ensinar 📚</p>
        </div>

        <ul className="flex justify-center items-center gap-4 mt-2">
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
              className="h-10 w-10 flex justify-center items-center bg-white rounded-sm shadow"
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
