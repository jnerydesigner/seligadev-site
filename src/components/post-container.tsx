import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MarkdownRenderer } from "./markdown-renderer";
import Link from "next/link";

interface PostContainerProps {
  title: string;
  authorName: string;
  avatar: string;
  content: string;
  noticeFontLink: string;
  noticeFontTitle: string;
}

export const PostContainer = ({
  title,
  authorName,
  avatar,
  content,
  noticeFontLink,
  noticeFontTitle,
}: PostContainerProps) => {
  return (
    <div className="my-10 min-h-screen bg-gray-50 text-gray-900">
      <div className="relative h-64 w-full">
        <Image
          src="/blog/images/banner.jpg"
          alt="Banner do Post"
          className="absolute inset-0 h-full w-full object-cover"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-black/30"></div>
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
              <a href="#" className="hover:text-blue-500">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-700">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-gray-800">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="prose prose-gray mt-8 max-w-none">
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
