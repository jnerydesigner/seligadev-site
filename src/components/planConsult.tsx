import Image from "next/image";
import TitleTop from "./title";
import { ConsultType, TechnologyGeneral } from "@/types/consult.type";
import { getImageUrl, getTechLogoSrc, isRemoteImage } from "@/helpers/image.helper";

interface TechsProps {
  consult: ConsultType;
  techsGeneral: TechnologyGeneral;
}

export const PlanConsult = ({ consult, techsGeneral }: TechsProps) => {
  const qrcodeSrc = getImageUrl(consult.image);

  console.log("Consult object:", qrcodeSrc);

  return (
    <section className="halftone-blue border-oliver-dark relative mx-auto my-2 w-full max-w-4xl rounded-lg border-2 p-6 shadow-lg">
      <h1 className="border-b-2 border-blue-500 pb-2 text-2xl font-bold text-gray-900 p-2 bg-gray-50 rounded-sm">
        {consult.title}
      </h1>

      <h2 className="mt-4 text-xl font-semibold text-blue-600">Tecnologias</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {techsGeneral.tech.map((tech) => {
          const logoSrc = getTechLogoSrc([], tech.tech_id.name, tech.tech_id.image);
          return (
            <div
              key={tech.tech_id.id}
              className="flex items-center justify-between gap-4 rounded-md border-l-4 border-blue-500 bg-gray-100 p-4"
            >
              <div className="h-18 w-18">
                <Image
                  src={logoSrc}
                  alt={`Logo ${tech.tech_id.name}`}
                  width={200}
                  height={200}
                  unoptimized={isRemoteImage(logoSrc)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start justify-center">
                <h3 className="font-semibold text-gray-900">{tech.tech_id.name}</h3>
                <p className="text-gray-700">{tech.tech_id.description}</p>
              </div>
            </div>
          );
        })}
      </div>


      <h4 className="mt-6 text-xl font-semibold text-blue-600">Serviços</h4>

      {techsGeneral.services.map((service) => (
        <div key={service.services_id.id}>
          <TitleTop

            titleStr={service.services_id.title}
            notH1
            className="my-0 border-0 p-0 text-2xl"
          ></TitleTop>
          <div className="p-2 bg-gray-50 rounded-sm">
            {service.services_id.description_large}
          </div>
        </div>

      ))}

      <p className="mt-4 text-gray-900">
        {techsGeneral.footer}
      </p>
      <div className="flex h-[140px] w-full items-center justify-center">
        <Image
          src={qrcodeSrc}
          alt="WhatsApp de Jander Nery"
          title="WhatsApp de Jander Nery"
          className="h-full w-[140px]"
          width={500}
          height={500}
          loading="eager"
          unoptimized={isRemoteImage(qrcodeSrc)}
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
