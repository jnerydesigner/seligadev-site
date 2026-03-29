"use client";

import NavItem from "./nav-item";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { titlePage: "Home", pathPage: "/" },
  { titlePage: "Blog", pathPage: "/blog" },
  { titlePage: "Vídeos", pathPage: "/videos" },
  { titlePage: "Shorts", pathPage: "/shorts" },
  { titlePage: "Meu SETUP", pathPage: "/setup" },
  { titlePage: "Hostinger", pathPage: "/hostinger" },
  { titlePage: "Meus Patrocinadores", pathPage: "/sponsors" },
  { titlePage: "Compre meu Café", pathPage: "/buy-my-coffee" },
] as const;

export default function Header() {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <header className="halftone-blue-sky border-oliver-dark text-oliver-dark mx-auto mt-1 flex w-full max-w-[100%] flex-col items-center justify-center rounded-l-sm rounded-r-sm border-2 px-0 py-4">
      <Link href="/">
        <Image
          src="/logo-new.png"
          alt="logo site seligadev"
          width={300}
          height={300}
          className="border-oliver-dark h-20 w-20 rounded-full border-2"
        />
      </Link>
      <nav className="flex flex-wrap justify-center gap-4 py-2">
        {navItems.map((item) => (
          <NavItem
            key={item.pathPage}
            label={item.titlePage}
            path={item.pathPage}
            isActive={isActivePath(item.pathPage)}
          />
        ))}
      </nav>
    </header>
  );
}
