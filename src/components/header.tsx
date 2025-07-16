"use client";

import { useState } from "react";
import NavItem from "./nav-item";

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

  return (
    <header className="w-full px-4 py-3 flex justify-center">
      <nav className="flex gap-4 flex-wrap">
        {navItems.map((item) => (
          <NavItem
            key={item.pathPage}
            label={item.titlePage}
            active={active === item.pathPage}
            onClick={() => setActive(item.pathPage)}
            path={item.pathPage}
          />
        ))}
      </nav>
    </header>
  );
}
