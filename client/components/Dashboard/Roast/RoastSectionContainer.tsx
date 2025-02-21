import { useState } from "react";
import { RoastSectionPresenter } from "./RoastSectionPresenter";
import { env } from "@/lib/env";

export function RoastSectionContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [roasts, setRoasts] = useState<string[]>([]);

  const handleRoast = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/roast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topTracks: [
            "Tujhe Bhula Diya",
            "Agar Tum Saath Ho",
            "Channa Mereya",
            "Bhula Dena",
          ],
          topArtists: ["Arijit Singh", "Mohit Chauhan", "Jubin Nautiyal", "KK"],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roast");
      }

      let roastText = await response.text();

      // remove unnecessary characters and "roast:" prefix if it exists
      roastText = roastText.replace(/[{}"\\]/g, "").trim(); // Removes special characters
      roastText = roastText.replace(/^roast:/i, "").trim(); // Removes "roast:" at the start
      roastText = roastText.replace(/n$/, "").trim();

      setRoasts((prev) => [...prev, roastText]);
    } catch (error) {
      console.error("Error fetching roast:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RoastSectionPresenter
      isLoading={isLoading}
      roasts={roasts}
      onRoast={handleRoast}
    />
  );
}
