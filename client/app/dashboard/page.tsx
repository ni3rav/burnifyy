"use client";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;

  return <div className="w-screen min-h-screen grid place-items-center"><DashboardContainer /></div>;
}
