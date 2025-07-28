// AppContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface AppContextProps {
  activePath: string;
  setActivePath: (path: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activePath, setActivePath] = useState("/");

  return (
    <AppContext.Provider value={{ activePath, setActivePath }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
