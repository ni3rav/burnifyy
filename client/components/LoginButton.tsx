"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

function LoginButton() {
  // const handleLogin = () => {};

  return (
    // <Button className="w-1/4" onClick={handleLogin}>
    <Button className="w-1/4" >
      <a href={env.NEXT_PUBLIC_LOGIN_URL}>Get Started</a>
    </Button>
  );
}

export default LoginButton;
