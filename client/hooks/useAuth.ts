"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/lib/env";

export function useAuth(redirectTo: string = "/") {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/auth/status`, {
      credentials: "include", // Send cookies with the request
    })
      .then((res) => {
        if (res.status === 401) {
          router.replace(redirectTo); // Unauthorized → Redirect
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.access_token) {
          setIsAuthenticated(true); // Authenticated
        }
      })
      .catch(() => {
        router.replace(redirectTo); // Error handling → Redirect
      });
  }, [router, redirectTo]);

  return isAuthenticated;
}
