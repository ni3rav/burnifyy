"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;

  return <div>Welcome to the Dashboard! 🎉</div>;
}
