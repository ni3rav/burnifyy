"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { env } from "@/lib/env";

interface RoastData {
  text: string;
  timestamp: number;
}

interface RoastContextProps {
  roast: string | null;
  isLoading: boolean;
  fetchRoast: (topTracks: string[], topArtists: string[]) => Promise<void>;
}

const RoastContext = createContext<RoastContextProps | undefined>(undefined);

const STORAGE_KEY = "burnify_roast";
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function RoastProvider({ children }: { children: React.ReactNode }) {
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isRoastExpired = (timestamp: number): boolean => {
    return Date.now() - timestamp > WEEK_IN_MS;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const roastData: RoastData = JSON.parse(storedData);
        if (!isRoastExpired(roastData.timestamp)) {
          setRoast(roastData.text);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading roast from LocalStorage:", error);
    }
  }, []);

  const fetchRoast = async (topTracks: string[], topArtists: string[]) => {
    if (!topTracks.length || !topArtists.length) return;

    // Check if we already have a valid roast
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const roastData: RoastData = JSON.parse(storedData);
        if (!isRoastExpired(roastData.timestamp)) {
          setRoast(roastData.text);
          return;
        }
      }
    } catch (error) {
      console.error("Error checking stored roast:", error);
    }

    // If we don't have a valid roast, fetch a new one
    setIsLoading(true);
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/roast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topTracks, topArtists }),
      });

      if (!response.ok) throw new Error("Failed to fetch roast");

      let roastText = await response.text();
      roastText = roastText
        .replace(/[{}"\\]/g, "")
        .replace(/^roast:/i, "")
        .replace(/n$/, "")
        .trim();

      const roastData: RoastData = {
        text: roastText,
        timestamp: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(roastData));
      setRoast(roastText);
    } catch (error) {
      console.error("Error fetching roast:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoastContext.Provider value={{ roast, isLoading, fetchRoast }}>
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
