import Link from "next/link";
import Image from "next/image";
import { normalizeImageSrc } from "@/helpers/image.helper";

interface HomePostMiniCardProps {
  id: number | string;
  title: string;
  slug: string;
  content: string;
  banner?: string | null;
  imageUrl?: string | null;
  dateCreated?: string;
}

export function HomePostMiniCard({
  title,
  slug,
  content,
  banner,
  imageUrl,
  dateCreated,
}: HomePostMiniCardProps) {
  const imageSrc = normalizeImageSrc(banner || imageUrl || "/no-image.png");
  const summary =
    content && content.length > 100 ? content.substring(0, 100).trim() + "..." : content || "";

  return (
    <Link href={`/blog/${slug}`} className="group block h-full w-full">
      <article className="halftone-yellow border-oliver-dark flex h-full flex-col overflow-hidden rounded-sm border-2 transition-transform duration-300 hover:scale-[1.02]">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h4 className="font-bangers text-lg leading-tight font-bold text-black group-hover:underline">
            {title}
          </h4>
          <p className="line-clamp-2 text-xs text-gray-700">{summary}</p>
        </div>
      </article>
    </Link>
  );
}
