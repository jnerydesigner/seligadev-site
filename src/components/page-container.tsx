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
        "font-bangers mx-auto flex w-full max-w-4xl justify-center text-black",
        className
      )}
    >
      {children}
    </div>
  );
}
