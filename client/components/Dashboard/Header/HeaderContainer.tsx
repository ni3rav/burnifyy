"use client";
import { useUserData } from "@/context/UserDataContext";
import { HeaderPresenter } from "./HeaderPresenter";

export function HeaderContainer() {
  const { userData, isLoading, error } = useUserData();

  return (
    <HeaderPresenter userData={userData} isLoading={isLoading} error={error} />
  );
}
