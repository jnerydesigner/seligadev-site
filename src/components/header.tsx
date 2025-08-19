"use client";

import { useState } from "react";
import NavItem from "./nav-item";
import Link from "next/link";
import { useAppContext } from "@/context/app.context";
import Image from "next/image";

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
    <header className="halftone-blue border-oliver-dark text-oliver-dark mx-auto flex w-full max-w-4xl flex-col items-center justify-center border-r-2 border-b-2 border-l-2 px-0 py-4">
      <Image
        src="https://seligadev-site-bk.s3.us-east-1.amazonaws.com/logo_site_se_liga_dev.png"
        alt="logo site seligadev"
        width={300}
        height={300}
        className="h-20 w-20 rounded-full"
      />
      <nav className="flex flex-wrap justify-center gap-4 py-2">
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
