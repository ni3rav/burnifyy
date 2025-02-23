"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SpotifyUserProfile, ArtistData, TrackData } from "@/lib/types";
import { env } from "@/lib/env";

interface UserDataContextProps {
  userData: SpotifyUserProfile | null;
  topArtists: ArtistData[] | null;
  topTracks: TrackData[] | null;
  isLoading: boolean;
  error: string | null;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined
);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<SpotifyUserProfile | null>(null);
  const [topArtists, setTopArtists] = useState<ArtistData[] | null>(null);
  const [topTracks, setTopTracks] = useState<TrackData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionUserData = sessionStorage.getItem("userData");
    const sessionTopArtists = sessionStorage.getItem("topArtists");
    const sessionTopTracks = sessionStorage.getItem("topTracks");

    if (sessionUserData && sessionTopArtists && sessionTopTracks) {
      setUserData(JSON.parse(sessionUserData));
      setTopArtists(JSON.parse(sessionTopArtists));
      setTopTracks(JSON.parse(sessionTopTracks));
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/user`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
        sessionStorage.setItem("userData", JSON.stringify(data));
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
        const data: ArtistData[] = await response.json();
        setTopArtists(data);
        sessionStorage.setItem("topArtists", JSON.stringify(data));
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
        const data: TrackData[] = await response.json();
        setTopTracks(data);
        sessionStorage.setItem("topTracks", JSON.stringify(data));
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

  return (
    <UserDataContext.Provider
      value={{
        userData,
        topArtists,
        topTracks,
        isLoading,
        error,
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
