import { TechsType } from "@/types/techs.type";
import { env } from "@/lib/zod-env";

export const getImageUrl = (id: string) => {
  return `${env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${id}`;
};

export const getDirectusAssetUrl = (id?: string | null, fallback: string = "/no-image.png") => {
  if (!id) {
    return fallback;
  }

  return getImageUrl(id);
};

export const normalizeImageSrc = (src?: string | null, fallback: string = "/no-image.png") => {
  if (!src) {
    return fallback;
  }

  if (src.startsWith("http://")) {
    return src.replace("http://", "https://");
  }

  return src;
};

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const localTechLogoMap: Record<string, string> = {
  java: "/java.svg",
  nestjs: "/nestjs.svg",
  "nest js": "/nestjs.svg",
  nodejs: "/nodejs.svg",
  "node js": "/nodejs.svg",
  next: "/next.svg",
  "next.js": "/next.svg",
  nextjs: "/next.svg",
  "spring boot": "/spring-boot.svg",
  springboot: "/spring-boot.svg",
  qrcode: "/qrcode.svg",
  "qr code": "/qrcode.svg",
  whatsapp: "/qrcode_whatsapp.svg",
};

export const getTechLogoSrc = (techs: TechsType[] = [], name: string, image?: string) => {
  const normalizedName = normalizeText(name);

  const localTech = techs.find((tech) => normalizeText(tech.title) === normalizedName);

  if (localTech?.slug) {
    return `/${localTech.slug}.svg`;
  }

  if (localTechLogoMap[normalizedName]) {
    return localTechLogoMap[normalizedName];
  }

  if (image) {
    return getImageUrl(image);
  }

  return "/no-image.png";
};

export const isRemoteImage = (src: string) =>
  src.startsWith("http://") || src.startsWith("https://");
