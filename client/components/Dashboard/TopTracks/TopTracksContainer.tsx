"use client";
import { useUserData } from "@/context/UserDataContext";
import { TopTracksPresenter } from "./TopTracksPresenter";

export function TopTracksContainer() {
  const { topTracks, isLoading, error } = useUserData();

  return (
    <TopTracksPresenter
      topTracksData={topTracks}
      isLoading={isLoading}
      error={error}
    />
  );
}
