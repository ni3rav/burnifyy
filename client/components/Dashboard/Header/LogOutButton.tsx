"use client";

import { LogOut } from "lucide-react";

export function LogOutButton() {
  const handleLogOut = () => {
    alert("Logging out...");
  };

  return (
    <LogOut
      className="h-5 w-5 text-destructive cursor-pointer"
      onClick={handleLogOut}
    />
  );
}
