"use client";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

function LoginButton() {
  return (
    <a className="w-full sm:w-1/2 md:w-1/5 lg:w-1/4 xl:w-1/5" href={env.NEXT_PUBLIC_LOGIN_URL}>
      <Button className="w-full text-zinc-900 font-bold hover:bg-primary/75 transition duration-300">
      Get Started
      </Button>
    </a>
  );
}

export default LoginButton;
