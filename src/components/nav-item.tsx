import Link from "next/link";
import React from "react";

interface NavItemProps {
  path: string;
  label: string;
  onClick: () => void;
}

export default function NavItem({ label, onClick, path }: NavItemProps) {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`bg-oliver-light cursor-pointer rounded-xl px-4 py-2 text-white transition-colors duration-200 hover:bg-white hover:text-gray-700`}
    >
      {label}
    </Link>
  );
}
