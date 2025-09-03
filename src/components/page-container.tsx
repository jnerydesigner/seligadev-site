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
        "font-bangers mx-auto flex w-full max-w-4xl items-start justify-center text-black md:max-w-[100%]",
        className
      )}
    >
      {children}
    </div>
  );
}
