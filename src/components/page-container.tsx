import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageContainerProps {
  children: ReactNode;
  className: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={twMerge(
        "font-bangers mx-auto flex w-full items-start justify-center px-4 text-black md:max-w-[100%] md:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </div>
  );
}
