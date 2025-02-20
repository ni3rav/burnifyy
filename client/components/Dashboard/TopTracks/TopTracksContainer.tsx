"use client";

import { env } from "@/lib/env";
import { TrackData } from "@/lib/types";
import { useEffect, useState } from "react";
import { TopTracksPresenter } from "./TopTracksPresenter";

export function TopTracksContainer() {
  const [topTracks, setTopTracks] = useState<TrackData[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/user/top-tracks`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tracks data");
        }
        const data = await response.json();
        setTopTracks(data);
      } catch (err) {
        setError("Failed to load tracks data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <TopTracksPresenter
      error={error}
      isLoading={isLoading}
      topTracksData={topTracks}
    />
  );
}
