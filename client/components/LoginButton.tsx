"use client";
import { Button } from "@/components/ui/button";

function LoginButton() {
  // const handleLogin = () => {};

  return (
    // <Button className="w-1/4" onClick={handleLogin}>
    <Button className="w-1/4" >
      <a href={process.env.NEXT_PUBLIC_LOGIN_URL}>Get Started</a>
    </Button>
  );
}

export default LoginButton;
