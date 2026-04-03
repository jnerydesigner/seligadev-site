"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

const navItems = [
  { titlePage: "Home", pathPage: "/" },
  { titlePage: "Blog", pathPage: "/blog" },
  { titlePage: "Vídeos", pathPage: "/videos" },
  { titlePage: "Shorts", pathPage: "/shorts" },
  { titlePage: "Meu SETUP", pathPage: "/setup" },
  { titlePage: "Hostinger", pathPage: "/hostinger" },
  { titlePage: "Patrocinadores", pathPage: "/sponsors" },
  { titlePage: "Café", pathPage: "/buy-my-coffee" },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="halftone-blue-sky border-oliver-dark text-oliver-dark mx-auto mt-1 flex w-full max-w-[100%] flex-col items-center justify-center rounded-l-sm rounded-r-sm border-2 px-0 py-4">
      <Link href="/">
        <Image
          src="/logo-new.png"
          alt="logo site seligadev"
          width={300}
          height={300}
          className="border-oliver-dark h-16 w-16 rounded-full border-2 md:h-20 md:w-20"
        />
      </Link>
      <nav className="flex w-full items-center justify-center px-4 py-2">
        <MobileMenu items={navItems} pathname={pathname} />
      </nav>
    </header>
  );
}
