import { PlanConsult } from "@/components/planConsult";
import prisma from "@/lib/prisma";
import { TechsType } from "@/types/techs.type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultoria Para Desenvolvedores | Mentoria Técnica e de Carreira",
  description:
    "Encontre orientação profissional e técnica para acelerar sua carreira como desenvolvedor. Mentorias, arquitetura de sistemas, boas práticas e roadmap personalizado.",
  keywords: [
    "consultoria para desenvolvedores",
    "mentoria para programadores",
    "carreira em tecnologia",
    "arquitetura de software",
    "backend senior",
    "desenvolvedor full stack",
    "dev iniciante",
    "consultoria técnica em programação",
  ],
  openGraph: {
    title: "Consultoria Para Desenvolvedores",
    description: "Apoio técnico e profissional para desenvolvedores em todas as fases da carreira.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/consult`,
    siteName: "Seu Site ou Nome da Marca",
    images: [
      {
        url: `https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`,
        width: 1200,
        height: 630,
        alt: "Consultoria personalizada para devs",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultoria Para Desenvolvedores",
    description: "Acelere sua carreira como desenvolvedor com apoio técnico e estratégico.",
    images: [`https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/consult`,
  },
};
export default async function Consult() {
  const techs: TechsType[] = await prisma.techs.findMany();
  return (
    <>
      <PlanConsult techs={techs} />
    </>
  );
}
