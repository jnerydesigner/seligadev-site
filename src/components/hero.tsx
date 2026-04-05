import Image from "next/image";
import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { AuthorDirectusTypeData } from "@/types/author.type";
import { isRemoteImage, normalizeImageSrc } from "@/helpers/image.helper";
import { showIcon } from "@/lib/show-icon";
import { AuthorDirectusType } from "@/types/resume.type";

interface HeroProps {
  className: string;
  author: AuthorDirectusType;
}

export default function Hero(props: HeroProps) {
  const authorPage = props.author;
  const author = authorPage?.user_author[0]?.author_id;
  const authorAvatarUrl = normalizeImageSrc(
    author?.avatar_url,
    "/logo-jander-nery-dev-redondo.svg"
  );

  return (
    <section
      className={twMerge(
        "halftone-blue border-oliver-dark relative col-span-8 flex min-h-[360px] w-full items-center justify-center rounded-sm border-2 px-0 py-6 md:min-h-[370px]",
        props.className
      )}
    >
      <div className="relative z-10 flex w-full flex-col items-center gap-3 p-4 text-center">
        <div className="mt-4 h-[120px] w-[120px] md:mt-0 md:h-[150px] md:w-[150px]">
          <Image
            src={authorAvatarUrl}
            width={500}
            height={500}
            alt={author?.name || "Imagem do Perfil do Criador do site Se Liga Dev"}
            className="h-full w-full rounded-full object-cover"
            priority
            unoptimized={isRemoteImage(authorAvatarUrl)}
          />
        </div>

        <div className="max-w-[640px] font-bangers leading-tight">
          <h1>{authorPage?.name_full} 👨‍💻</h1>
          <p>{authorPage?.bio_one} 🚀</p>
          <p>{authorPage?.bio_two} 🚀</p>
        </div>

        <ul className="mt-2 flex w-full flex-wrap items-center justify-center gap-2 px-2 md:gap-4 md:px-10">
          {(author?.author_social_medias ?? []).map(({ social_media_id }) => (
            <li
              key={social_media_id.id}
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-white shadow"
            >
              <Link
                href={social_media_id.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social_media_id.name}
                className="flex h-full w-full items-center justify-center"
              >
                {showIcon(social_media_id.slug)}
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
