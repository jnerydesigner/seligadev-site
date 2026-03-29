import Image from "next/image";
import { getDirectusAssetUrl, isRemoteImage, normalizeImageSrc } from "@/helpers/image.helper";
import type { PostData } from "@/types/post-directus.type";
import Link from "next/link";
import { showIcon } from "@/lib/show-icon";

import { Inter } from "next/font/google";
import { DirectusHtmlRenderer } from "./directus-html-renderer";

const inter = Inter({ subsets: ["latin"] });


interface PostContainerProps {
  post: PostData;
}

export const PostContainerDirectus = ({ post }: PostContainerProps) => {
  const imageUrl = getDirectusAssetUrl(post.banner);
  const author = post.post_author[0]?.author_id;
  const authorAvatarUrl = normalizeImageSrc(author?.avatar_url);


  return (
    <div className="border-oliver-dark my-10 min-h-screen w-full rounded-sm border-2 bg-gray-50 text-gray-900 shadow-sm md:min-w-full"
    >
      <div className="h-[260px] w-full overflow-hidden rounded-t-lg md:h-[380px]">
        <Image
          src={imageUrl}
          alt={post.title}
          className="h-full w-full object-cover object-center"
          width={1200}
          height={1200}
          unoptimized={isRemoteImage(imageUrl)}
        />
      </div>
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 className="mt-6 text-3xl font-bold text-gray-800 sm:text-4xl">{post.title}</h1>
      </div>
      <div className="mt-6 flex flex-col items-center gap-4 md:flex-row">
        <Image
          src={authorAvatarUrl}
          alt={author?.name || "Autor"}
          className="h-16 w-16 rounded-full border-2 border-gray-300"
          width={300}
          height={300}
          unoptimized={isRemoteImage(authorAvatarUrl)}
        />
        <div className="fex-col flex h-10 items-center justify-center gap-2">
          <h2 className="flex h-10 items-center justify-center px-4 text-lg font-semibold">
            {author?.name || "Autor Desconocido"}
          </h2>
          <div className="mt-0 flex h-10 items-center justify-center gap-3 px-4 text-gray-600">
            {(author?.author_social_medias ?? []).map((social) => (
              <Link
                key={social.social_media_id.id}
                href={social.social_media_id.url}
                className="hover:text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                {showIcon(social.social_media_id.slug)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mt-4 px-4 font-sans text-base leading-relaxed tracking-normal text-zinc-800 dark:text-zinc-100 md:px-6 lg:px-8 ${inter.className}`}
      >
        <DirectusHtmlRenderer
          html={post.content}
          className="prose prose-zinc max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-800 prose-strong:text-zinc-900 prose-li:text-zinc-800 prose-a:text-blue-600"
        />
      </div>
    </div>
  );
};
