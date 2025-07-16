import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="w-full flex justify-center text-tertiary-seligadev">
      <div className="w-full max-w-4xl px-4">{children}</div>
    </div>
  );
}
