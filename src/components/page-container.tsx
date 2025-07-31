import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="font-bangers flex w-full justify-center text-black">
      <div className="h-full min-h-full w-full max-w-4xl px-4">{children}</div>
    </div>
  );
}
