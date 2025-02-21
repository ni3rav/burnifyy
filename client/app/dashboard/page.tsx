"use client";
import DashboardContainer from "@/components/Dashboard/DashboardContainer";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { UserDataProvider } from "@/context/UserDataContext";

export default function Dashboard() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null)
    return (
      <div className="w-screen min-h-screen grid place-items-center">
        <DashboardSkeleton />
      </div>
    );

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <UserDataProvider>
        <DashboardContainer />
      </UserDataProvider>
    </div>
  );
}
