"use client";

import { useState, useEffect } from "react";
import { HeaderPresenter } from "./HeaderPresenter";
import { SpotifyUserProfile } from "@/lib/types";
import { env } from "@/lib/env";

export function HeaderContainer() {
  const [userData, setUserData] = useState<SpotifyUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/user`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <HeaderPresenter userData={userData} isLoading={isLoading} error={error} />
  );
}
