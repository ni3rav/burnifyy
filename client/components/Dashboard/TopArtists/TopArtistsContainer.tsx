"use client";

import { env } from "@/lib/env";
import { ArtistData } from "@/lib/types";
import { useEffect, useState } from "react";
import { TopArtistsPresenter } from "./TopArtistsPresenter";

export function TopArtistsContainer() {
  const [topArtists, setTopArtists] = useState<ArtistData[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/user/top-artists`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artists data");
        }
        const data = await response.json();
        setTopArtists(data);
      } catch (err) {
        setError("Failed to load artists data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  return (
    <TopArtistsPresenter
      error={error}
      isLoading={isLoading}
      topArtistsData={topArtists}
    />
  );
}
