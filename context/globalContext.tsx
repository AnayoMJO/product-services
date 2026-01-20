"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext<{
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
