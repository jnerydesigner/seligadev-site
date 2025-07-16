import Image from "next/image";
import React from "react";

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
      <p>Jander da Costa Nery</p>
      <p>Apaixonado por tecnologia</p>
      <p>Apaixonado por ensinar</p>
    </section>
  );
}
