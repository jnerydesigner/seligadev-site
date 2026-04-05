import Link from "next/link";
import Image from "next/image";
import { normalizeImageSrc } from "@/helpers/image.helper";

interface HomeFeaturedPostCardProps {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  banner?: string | null;
  imageUrl?: string | null;
  dateCreated?: string;
}

export function HomeFeaturedPostCard({
  title,
  slug,
  content,
  banner,
  imageUrl,
  dateCreated,
}: HomeFeaturedPostCardProps) {
  const imageSrc = normalizeImageSrc(banner || imageUrl || "/no-image.png");
  const summary =
    content && content.length > 180 ? content.substring(0, 180).trim() + "..." : content || "";

  return (
    <Link href={`/blog/${slug}`} className="group block h-full w-full">
      <article className="halftone-blue border-oliver-dark flex h-full flex-col overflow-hidden rounded-sm border-2 transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="font-bangers text-2xl leading-tight font-bold text-black group-hover:underline">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-700">{summary}</p>
          <span className="font-bangers text-oliver-dark mt-auto text-sm">Ler artigo →</span>
        </div>
      </article>
    </Link>
  );
}
