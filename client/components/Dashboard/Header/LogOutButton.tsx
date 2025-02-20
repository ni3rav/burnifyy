"use client";

import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

export function LogOutButton() {
  const { logout } = useLogout();

  return (
    <LogOut
      className="h-5 w-5 text-destructive cursor-pointer"
      onClick={logout}
    />
  );
}
