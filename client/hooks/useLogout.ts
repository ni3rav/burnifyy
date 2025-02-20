"use client";

import { env } from "@/lib/env";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include", // Ensure cookies are sent
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to home page after logout
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return { logout };
}
