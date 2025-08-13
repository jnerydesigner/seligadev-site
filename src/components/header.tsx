"use client";

import { useState } from "react";
import NavItem from "./nav-item";
import Link from "next/link";
import { useAppContext } from "@/context/app.context";

const navItems = [
  { titlePage: "Home", pathPage: "/" },
  { titlePage: "Blog", pathPage: "/blog" },
  { titlePage: "Vídeos", pathPage: "/videos" },
  { titlePage: "Shorts", pathPage: "/shorts" },
  { titlePage: "Meu Setup", pathPage: "/setup" },
  { titlePage: "Meus Patrocinadores", pathPage: "/sponsors" },
  { titlePage: "Compre meu Café", pathPage: "/buy-my-coffee" },
] as const;

type NavItemType = (typeof navItems)[number]["pathPage"];

export default function Header() {
  const { activePath, setActivePath } = useAppContext();

  return (
    <header className="text-oliver-dark flex w-full flex-col justify-center px-0">
      {/* <Link href="/" className="mb-6 flex items-center justify-center">
        <div className="halftone-blue mx-2 flex h-10 w-100 animate-pulse cursor-pointer items-center justify-center rounded-sm text-2xl font-bold text-indigo-600 select-none">
          SeLigaDev
        </div>
      </Link> */}
      <Link href="/" className="flex items-center justify-center">
        <div className="halftone-blue border-oliver-dark mb-2 flex h-10 w-full cursor-pointer items-center justify-center border-b-[2px] text-2xl font-bold text-indigo-600 select-none">
          <p className="animate-pulse">SeLigaDev</p>
        </div>
      </Link>
      <nav className="flex flex-wrap justify-center gap-4">
        {navItems.map((item) => (
          <NavItem
            key={item.pathPage}
            label={item.titlePage}
            path={item.pathPage}
            isActive={
              item.pathPage === "/"
                ? activePath === "/"
                : activePath.startsWith(item.pathPage + "/") || activePath === item.pathPage
            }
            onClick={() => setActivePath(item.pathPage)}
          />
        ))}
      </nav>
    </header>
  );
}
