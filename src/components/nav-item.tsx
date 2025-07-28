import Link from "next/link";
import React from "react";

interface NavItemProps {
  path: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function NavItem({ label, path, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={path}
      onClick={onClick}
      className={`cursor-pointer rounded-xl px-4 py-2 transition-colors duration-200 ${
        isActive
          ? "bg-pink-light text-white"
          : "bg-oliver-light text-white hover:bg-white hover:text-gray-700"
      }`}
    >
      {label}
    </Link>
  );
}
