import LoginButton from "./LoginButton";

function LandingPage() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Welcome to Our Platform
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          A place where innovation meets execution. Join us and take your skills
          to the next level.
        </p>
        <LoginButton />
      </div>
    </section>
  );
}

export default LandingPage;
