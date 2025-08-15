import { Resume } from "@/components/resume";
import prisma from "@/lib/prisma";
import { ResumeMapper } from "@/types/mapper/resume.mapper";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = `${baseUrl}/resume`;
  const image = `${baseUrl}/logo.png`;

  return {
    title: `Esse é meu Curriculo | Se Liga Dev`,
    description:
      "Meu currículo completo com informações sobre minha experiência, formação e habilidades.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Esse é meu Curriculo | Se Liga Dev`,
      type: "website",
      description:
        "Meu currículo completo com informações sobre minha experiência, formação e habilidades.",
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Imagem do Blog Se Liga Dev",
        },
      ],
      siteName: "Se Liga Dev",
    },
    twitter: {
      card: "summary_large_image",
      title: `Esse é meu Curriculo | Se Liga Dev`,
      description:
        "Meu currículo completo com informações sobre minha experiência, formação e habilidades.",
      images: [image],
    },
  };
}

export default async function PageResume({ params }: { params: tParams }) {
  const { slug }: { slug: string } = await params;
  const resume = await prisma.personalInfo.findFirst({
    where: {
      slug,
    },
    include: {
      contact: true,
      education: true,
      certification: true,
      skills: {
        include: {
          skillFrontend: true,
          skillDatabase: true,
          skillTool: true,
          skillMethodology: true,
          skillBackend: true,
        },
      },
      experience: {
        include: {
          descriptions: true,
        },
      },
      languages: true,
    },
  });

  const mapper = ResumeMapper.toResponse(resume);

  return (
    <section className="flex h-auto w-full flex-col items-center justify-center p-4">
      <Resume resumeDataInfo={mapper} />
    </section>
  );
}
