"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SpotifyUserProfile, ArtistData, TrackData } from "@/lib/types";
import { env } from "@/lib/env";

interface UserDataContextProps {
  userData: SpotifyUserProfile | null;
  topArtists: ArtistData[] | null;
  topTracks: TrackData[] | null;
  roasts: string[];
  isLoading: boolean;
  error: string | null;
  fetchRoast: () => Promise<void>;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<SpotifyUserProfile | null>(null);
  const [topArtists, setTopArtists] = useState<ArtistData[] | null>([]);
  const [topTracks, setTopTracks] = useState<TrackData[] | null>([]);
  const [roasts, setRoasts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/user`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/user/top-artists`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch artists data");
        const data = await response.json();
        setTopArtists(data);
      } catch (err) {
        setError("Failed to load artists data");
        console.error(err);
      }
    };

    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/user/top-tracks`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch tracks data");
        const data = await response.json();
        setTopTracks(data);
      } catch (err) {
        setError("Failed to load tracks data");
        console.error(err);
      }
    };

    const fetchAllData = async () => {
      await Promise.all([fetchUserData(), fetchTopArtists(), fetchTopTracks()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  const fetchRoast = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/roast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topTracks: topTracks?.map((track) => track.trackName) ?? [],
          topArtists: topArtists?.map((artist) => artist.artistName) ?? [],
        }),
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
    <UserDataContext.Provider
      value={{
        userData,
        topArtists,
        topTracks,
        roasts,
        isLoading,
        error,
        fetchRoast,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}
