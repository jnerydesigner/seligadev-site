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
    <div className="border-oliver-dark my-10 min-h-screen w-full rounded-sm border-2 bg-gray-50 text-gray-900 shadow-sm md:min-w-[100%]">
      <Image
        src={banner || "/no-image.png"}
        alt="Banner do Post"
        className="w-full rounded-t-[4px]"
        width={1200}
        height={1200}
      />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <h1 className="mt-6 text-3xl font-bold text-gray-800 sm:text-4xl">{title}</h1>

        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row">
          <Image
            src={avatar}
            alt={authorName}
            className="h-16 w-16 rounded-full border-2 border-gray-300"
            width={300}
            height={300}
          />
          <div className="fex-col flex h-10 items-center justify-center gap-2">
            <h2 className="flex h-10 items-center justify-center px-4 text-lg font-semibold">
              {authorName}
            </h2>
            <div className="mt-0 flex h-10 items-center justify-center gap-3 px-4 text-gray-600">
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
          className={`mt-4 font-sans text-base leading-relaxed tracking-normal text-zinc-800 dark:text-zinc-100 ${inter.className}`}
        >
          <MarkdownRenderer markdown={content} />
        </div>

        <footer className="mt-10 flex h-auto w-full flex-col items-center justify-center border-t border-gray-300 p-0 pt-4 text-sm text-gray-500 md:flex-row md:p-10">
          <p>Fonte {noticeFontTitle}: </p>
          <Link
            href={noticeFontLink}
            className="w-full text-blue-600 hover:underline"
            target="_blank"
          >
            {noticeFontLink}
          </Link>
        </footer>
      </div>
    </div>
  );
};
