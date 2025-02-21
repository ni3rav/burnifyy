"use client";
import { useUserData } from "@/context/UserDataContext";
import { RoastSectionPresenter } from "./RoastSectionPresenter";

export function RoastSectionContainer() {
  const { isLoading, roasts, fetchRoast } = useUserData();

  return (
    <RoastSectionPresenter
      isLoading={isLoading}
      roasts={roasts}
      onRoast={fetchRoast}
    />
  );
}
