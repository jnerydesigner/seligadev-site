import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full h-auto flex justify-center items-center flex-col p-4">
      <div className="h-[150px] p-2">
        <Image
          src="/logo-jander-nery-dev-redondo.svg"
          width={500}
          height={500}
          alt="Imagem do Perfil do Criador do site se liga dev"
          className="h-full w-full cover"
        />
      </div>
      <p>Jander da Costa Nery 👨‍💻</p>
      <p>Apaixonado por tecnologia 🚀</p>
      <p>Apaixonado por ensinar 📚</p>
      <ul className="h-12 w-90 flex justify-center items-center gap-4 mt-4">
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://www.linkedin.com/in/jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <Image src="/linkedin.svg" width={20} height={20} alt="LinkedIn" />
          </Link>
        </li>
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://www.youtube.com/@jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
          >
            <Image src="/youtube.svg" width={20} height={20} alt="Youtube" />
          </Link>
        </li>
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://twitter.com/jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter/X"
          >
            <Image src="/icon-x.svg" width={20} height={20} alt="X" />
          </Link>
        </li>
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://www.instagram.com/jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <Image
              src="/instagram.svg"
              width={20}
              height={20}
              alt="Instagram"
            />
          </Link>
        </li>
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://www.facebook.com/jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            <Image src="/facebook.svg" width={20} height={20} alt="Facebook" />
          </Link>
        </li>
        <li className="h-10 w-10 flex justify-center items-center bg-white rounded-sm">
          <Link
            href="https://github.com/jandernery"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <Image src="/github.svg" width={20} height={20} alt="Github" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
