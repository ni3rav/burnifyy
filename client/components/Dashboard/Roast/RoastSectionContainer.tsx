"use client";
import { useUserData } from "@/context/UserDataContext";
import { useRoast } from "@/context/RoastContext";
import { RoastSectionPresenter } from "./RoastSectionPresenter";

export function RoastSectionContainer() {
  const { topTracks, topArtists } = useUserData();
  const { isLoading, roasts, fetchRoast } = useRoast();

  const handleRoast = () => {
    fetchRoast(
      topTracks?.map((track) => track.artistName) ?? [],
      topArtists?.map((artist) => artist.artistName) ?? []
    );
  };

  return (
    <RoastSectionPresenter
      isLoading={isLoading}
      roasts={roasts}
      onRoast={handleRoast}
    />
  );
}
