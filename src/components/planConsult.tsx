import Image from "next/image";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { TechsType } from "@/types/techs.type";
import TitleTop from "./title";

interface TechsProps {
  techs: TechsType[];
}

export const PlanConsult = ({ techs }: TechsProps) => {
  return (
    <section className="halftone-blue border-oliver-dark relative mx-auto my-2 w-full max-w-4xl rounded-lg border-2 p-6 shadow-lg">
      <h1 className="border-b-2 border-blue-500 pb-2 text-2xl font-bold text-gray-900">
        Mentoria para você deslanchar nas suas conquistas
      </h1>

      <h2 className="mt-4 text-xl font-semibold text-blue-600">Tecnologias</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center justify-between gap-4 rounded-md border-l-4 border-blue-500 bg-gray-100 p-4"
          >
            <div className="h-18 w-18">
              <Image
                src={`${tech.slug}.svg`}
                alt="Logo Java"
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-start justify-center">
              <h3 className="font-semibold text-gray-900">{tech.title}</h3>
              <p className="text-gray-700">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mt-6 text-xl font-semibold text-blue-600">Serviços</h4>
      {[
        { id: 1, title: "Code Review", className: "my-0 border-0 p-0 text-2xl" },
        { id: 2, title: "Arquitetura de Software", className: "my-0 border-0 p-0 text-2xl" },
        { id: 3, title: "Mentoria", className: "my-0 border-0 p-0 text-2xl" },
        { id: 4, title: "Otimização de Performance", className: "my-0 border-0 p-0 text-2xl" },
        { id: 5, title: "Resolução de Problemas", className: "my-0 border-0 p-0 text-2xl" },
      ].map((service) => (
        <TitleTop
          key={service.id}
          titleStr={service.title}
          notH1
          className={service.className}
        ></TitleTop>
      ))}

      <p className="mt-4 text-gray-900">
        Entre em contato e leve seu conhecimento para o próximo nível! 🚀
      </p>
      <div className="flex h-[140px] w-full items-center justify-center">
        <Image
          src="/seligadev-qrcode-whatsapp.png"
          alt="WhatsApp de Jander Nery"
          title="WhatsApp de Jander Nery"
          className="h-full w-[140px]"
          width={500}
          height={500}
          loading="eager"
        />
      </div>
      {/* <Link
        href="/"
        className="halftone-blue-radial-white absolute top-1.5 right-1.5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-sm shadow-sm"
      >
        <FaHome />
      </Link> */}
    </section>
  );
};
