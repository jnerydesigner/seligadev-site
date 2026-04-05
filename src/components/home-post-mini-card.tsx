import Link from "next/link";
import Image from "next/image";
import { getImageUrl, normalizeImageSrc } from "@/helpers/image.helper";

const getPlainText = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

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
}: HomePostMiniCardProps) {
  const imageSrc = banner
    ? getImageUrl(banner)
    : normalizeImageSrc(imageUrl || "/no-image.png");
  const plainContent = getPlainText(content);
  const summary =
    plainContent && plainContent.length > 100
      ? `${plainContent.substring(0, 100).trim()}...`
      : plainContent;

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
