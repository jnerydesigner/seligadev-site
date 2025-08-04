import TitleTop from "@/components/title";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

export default function PageSponsors() {
  return (
    <section className="container mx-auto px-4 py-8">
      <TitleTop titleStr="Meus Patrocinadores" notH1 />
      <div className="h-[60vh]"> </div>
      {/* <h1 className="border-b-2 border-blue-500 pb-2 text-2xl font-bold text-gray-900">
          Mentoria para você deslanchar nas suas conquistas
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-blue-600">Tecnologias</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              id: 1,
              title: "Node.js",
              desc: "Back-end performático e escalável.",
            },
            {
              id: 2,
              title: "NestJS",
              desc: "APIs robustas e arquitetura modular.",
            },
            { id: 3, title: "Java", desc: "Aplicações robustas com Java 11+." },
            { id: 4, title: "Spring Boot", desc: "Soluções ágeis e seguras." },
          ].map((tech) => (
            <div key={tech.id} className="rounded-md border-l-4 border-blue-500 bg-gray-100 p-4">
              <h3 className="font-semibold text-gray-900">{tech.title}</h3>
              <p className="text-gray-700">{tech.desc}</p>
            </div>
          ))}
        </div> */}

      {/* <h4 className="mt-6 text-xl font-semibold text-blue-600">Serviços</h4>
        <ul className="mt-2 list-inside list-disc text-gray-800">
          <li>Code Review</li>
          <li>Arquitetura de Software</li>
          <li>Mentoria</li>
          <li>Otimização de Performance</li>
          <li>Resolução de Problemas</li>
        </ul> */}

      {/* <p className="mt-4 text-gray-900">
          Entre em contato e leve seu conhecimento para o próximo nível! 🚀
        </p> */}
      {/* <div className="flex h-[140px] w-full items-center justify-center">
          <Image
            src="/qrcode_whatsapp.svg"
            alt="WhatsApp de Jander Nery"
            title="WhatsApp de Jander Nery"
            className="h-full"
            width={300}
            height={300}
            loading="eager"
          />
        </div> */}
      {/* <Link
          href="/"
          className="halftone-blue-radial-white absolute top-1.5 right-1.5 flex h-14 w-14 cursor-pointer items-center justify-center rounded-sm shadow-sm"
        >
          <FaHome />
        </Link> */}
      {/* </div> */}
    </section>
  );
}
