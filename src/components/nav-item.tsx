import Link from "next/link";
import React from "react";

interface NavItemProps {
  path: string;
  label: string;
  isActive: boolean;
}

export default function NavItem({ label, path, isActive }: NavItemProps) {
  return (
    <Link
      href={path}
      className={`cursor-pointer rounded-xl px-3 py-2 text-center text-sm leading-tight transition-colors duration-200 sm:px-4 ${
        isActive
          ? "bg-pink-light text-white"
          : "bg-oliver-light text-white hover:bg-white hover:text-gray-700"
      }`}
    >
      {label}
    </Link>
  );
}
