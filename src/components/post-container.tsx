import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MarkdownRenderer } from "./markdown-renderer";
import Link from "next/link";
import { showIcon } from "@/lib/show-icon";
import { SocialMediaType } from "@/types/social-media.type";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface PostContainerProps {
  title: string;
  authorName: string;
  avatar: string;
  content: string;
  noticeFontLink: string;
  noticeFontTitle: string;
  banner: string;
  socialMedias: SocialMediaType[];
}

export const PostContainer = ({
  title,
  authorName,
  avatar,
  content,
  noticeFontLink,
  noticeFontTitle,
  socialMedias,
  banner,
}: PostContainerProps) => {
  return (
    <div className="my-10 min-h-screen bg-gray-50 text-gray-900">
      <div className="relative h-64 w-full">
        <Image
          src={banner || "/no-image.png"}
          alt="Banner do Post"
          className="absolute h-full w-full object-cover"
          width={800}
          height={800}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mt-6 text-3xl font-bold text-gray-800 sm:text-4xl">{title}</h1>

        <div className="mt-6 flex items-center gap-4">
          <Image
            src={avatar}
            alt={authorName}
            className="h-16 w-16 rounded-full border-2 border-gray-300"
            width={300}
            height={300}
          />
          <div>
            <h2 className="text-lg font-semibold">{authorName}</h2>
            <div className="mt-2 flex gap-3 text-gray-600">
              {socialMedias.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  className="hover:text-blue-500"
                  target="_blank"
                >
                  {showIcon(social.slug)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`font-sans text-base leading-relaxed tracking-normal text-zinc-800 dark:text-zinc-100 ${inter.className}`}
        >
          <MarkdownRenderer markdown={content} />
        </div>

        <footer className="mt-10 border-t border-gray-300 p-10 pt-4 text-sm text-gray-500">
          <p>
            Fonte {noticeFontTitle}:{" "}
            <Link href={noticeFontLink} className="text-blue-600 hover:underline" target="_blank">
              {noticeFontLink}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};
