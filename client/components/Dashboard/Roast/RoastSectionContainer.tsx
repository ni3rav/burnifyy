"use client";
import { useUserData } from "@/context/UserDataContext";
import { useRoast } from "@/context/RoastContext";
import { RoastSectionPresenter } from "./RoastSectionPresenter";

export function RoastSectionContainer() {
  const { topTracks, topArtists } = useUserData();
  const { isLoading, roast, fetchRoast } = useRoast(); // Changed from roasts to roast

  const handleRoast = () => {
    fetchRoast(
      topTracks?.map((track) => track.artistName) ?? [],
      topArtists?.map((artist) => artist.artistName) ?? []
    );
  };

  return (
    <RoastSectionPresenter
      isLoading={isLoading}
      roast={roast} // Changed from roasts to roast
      onRoast={handleRoast}
    />
  );
}
