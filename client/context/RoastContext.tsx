"use client";

import { createContext, useContext, useState } from "react";
import { env } from "@/lib/env";

interface RoastContextProps {
  roasts: string[];
  isLoading: boolean;
  fetchRoast: (topTracks: string[], topArtists: string[]) => Promise<void>;
}

const RoastContext = createContext<RoastContextProps | undefined>(undefined);

export function RoastProvider({ children }: { children: React.ReactNode }) {
  const [roasts, setRoasts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoast = async (topTracks: string[], topArtists: string[]) => {
    if (!topTracks.length || !topArtists.length) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/roast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topTracks, topArtists }),
      });

      if (!response.ok) throw new Error("Failed to fetch roast");

      let roastText = await response.text();
      roastText = roastText.replace(/[{}"\\]/g, "").trim();
      roastText = roastText.replace(/^roast:/i, "").trim();
      roastText = roastText.replace(/n$/, "").trim();

      setRoasts((prev) => [...prev, roastText]);
    } catch (error) {
      console.error("Error fetching roast:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoastContext.Provider value={{ roasts, isLoading, fetchRoast }}>
      {children}
    </RoastContext.Provider>
  );
}

export function useRoast() {
  const context = useContext(RoastContext);
  if (!context) {
    throw new Error("useRoast must be used within a RoastProvider");
  }
  return context;
}
