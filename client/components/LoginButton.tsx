"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

function LoginButton() {
  return (
    <a className="w-1/12" href={env.NEXT_PUBLIC_LOGIN_URL}>
      <Button className="w-full text-black font-bold hover:bg-primary/75 transition duration-300">
        Get Started
      </Button>
    </a>
  );
}

export default LoginButton;
