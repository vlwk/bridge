"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Room {
  id: number;
  name: string;
}

interface AppContextType {
  currentRoom: Room | null;
  setCurrentRoom: (room: Room | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const value = {
    currentRoom,
    setCurrentRoom,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
