"use client";

import { useState, useEffect } from "react";
import { RoastSectionPresenter } from "./RoastSectionPresenter";
import { env } from "@/lib/env";

export function RoastSectionContainer() {
  const [roasts, setRoasts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedRoasts = localStorage.getItem("roasts");
    if (savedRoasts) setRoasts(JSON.parse(savedRoasts));
  }, []);

  async function fetchRoast() {
    try {
      setIsLoading(true);

      // Fetch user's top artists
      const artistsResponse = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/user/top-artists`,
        {
          credentials: "include",
        }
      );

      if (!artistsResponse.ok) throw new Error("Failed to fetch top artists");

      const { artists } = await artistsResponse.json();
      if (!artists.length) throw new Error("No artists found");

      // Generate roast using Gemini API
      const prompt = `Roast this user's music taste based on these top artists: ${artists.join(
        ", "
      )}`;
      const geminiResponse = await fetch("/api/generate-roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!geminiResponse.ok) throw new Error("Gemini API failed");

      const { roast } = await geminiResponse.json();
      const newRoasts = [...roasts, roast];

      // Save to state & LocalStorage
      setRoasts(newRoasts);
      localStorage.setItem("roasts", JSON.stringify(newRoasts));
    } catch (error) {
      console.error("Error fetching roast:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <RoastSectionPresenter
      isLoading={isLoading}
      roasts={roasts}
      onRoast={fetchRoast}
    />
  );
}
