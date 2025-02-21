"use client";
import { useUserData } from "@/context/UserDataContext";
import { TopArtistsPresenter } from "./TopArtistsPresenter";

export function TopArtistsContainer() {
  const { topArtists, isLoading, error } = useUserData();

  return (
    <TopArtistsPresenter
      topArtistsData={topArtists}
      isLoading={isLoading}
      error={error}
    />
  );
}
