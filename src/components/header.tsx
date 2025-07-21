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
  console.log(active);

  return (
    <header className="text-oliver-dark flex w-full justify-center px-4 py-3">
      <nav className="text-oliver-dark flex flex-wrap gap-4">
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
