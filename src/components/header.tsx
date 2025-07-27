"use client";

import { useState } from "react";
import NavItem from "./nav-item";
import Link from "next/link";

const navItems = [
  { titlePage: "Home", pathPage: "/" },
  { titlePage: "Blog", pathPage: "/blog" },
  { titlePage: "Vídeos", pathPage: "/videos" },
  { titlePage: "Shorts", pathPage: "/shorts" },
  { titlePage: "Meu Setup", pathPage: "/setup" },
  { titlePage: "Meus Patrocinadores", pathPage: "/sponsors" },
] as const;

type NavItemType = (typeof navItems)[number]["pathPage"];

export default function Header() {
  const [active, setActive] = useState<NavItemType>("/");
  console.log(active);

  return (
    <header className="text-oliver-dark flex w-full flex-col justify-center px-4 py-3">
      <Link href="/" className="mb-6 flex items-center justify-center">
        <div className="halftone-blue mx-2 flex h-10 w-100 animate-pulse cursor-pointer items-center justify-center rounded-sm text-2xl font-bold text-indigo-600 select-none">
          SeLigaDev
        </div>
      </Link>
      <nav className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => (
          <NavItem
            key={item.pathPage}
            label={item.titlePage}
            onClick={() => setActive(item.pathPage)}
            path={item.pathPage}
          />
        ))}
      </nav>
    </header>
  );
}
