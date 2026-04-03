"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  titlePage: string;
  pathPage: string;
}

interface MobileMenuProps {
  items: readonly NavItem[];
  pathname: string;
}

const isActivePath = (path: string, pathname: string) => {
  if (path === "/") {
    return pathname === "/";
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};

export default function MobileMenu({ items, pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isMounted) {
    return (
      <div className="flex w-full items-center justify-center gap-2 md:hidden">
        {items.map((item) => (
          <Link
            key={item.pathPage}
            href={item.pathPage}
            className={`rounded-xl px-3 py-2 text-sm leading-tight transition-colors duration-200 ${
              isActivePath(item.pathPage, "/")
                ? "bg-pink-light text-white"
                : "bg-oliver-light text-white hover:bg-white hover:text-gray-700"
            }`}
          >
            {item.titlePage}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-oliver-light mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white hover:text-gray-700 md:hidden"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-pointer bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      <nav
        className={`fixed right-0 bottom-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="halftone-blue border-oliver-dark mx-auto max-w-md rounded-t-xl border-t-2 border-r-2 border-l-2 bg-white px-4 pt-4 pb-8 shadow-2xl">
          <div className="mb-4 flex h-8 items-center justify-center">
            <div className="w-12 rounded-full bg-gray-300" />
          </div>

          <div className="flex w-full flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.pathPage}
                href={item.pathPage}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3 text-center text-base leading-tight font-medium transition-colors duration-200 ${
                  isActivePath(item.pathPage, pathname)
                    ? "bg-pink-light text-white"
                    : "bg-oliver-light hover:bg-oliver-dark text-white hover:text-white"
                }`}
              >
                {item.titlePage}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="hidden w-full items-center justify-center gap-2 md:flex">
        {items.map((item) => (
          <Link
            key={item.pathPage}
            href={item.pathPage}
            className={`rounded-xl px-4 py-2 text-sm leading-tight transition-colors duration-200 ${
              isActivePath(item.pathPage, pathname)
                ? "bg-pink-light text-white"
                : "bg-oliver-light text-white hover:bg-white hover:text-gray-700"
            }`}
          >
            {item.titlePage}
          </Link>
        ))}
      </div>
    </>
  );
}
