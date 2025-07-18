import Link from "next/link";
import React from "react";

interface NavItemProps {
  path: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function NavItem({
  label,
  active,
  onClick,
  path,
}: NavItemProps) {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer
        ${
          active
            ? "bg-oliver-light text-white"
            : "bg-white text-oliver-dark hover:bg-[#101928] hover:text-[#F7F0E9]"
        }`}
    >
      {label}
    </Link>
  );
}
