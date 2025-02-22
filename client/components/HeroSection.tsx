import LoginButton from "./LoginButton";

function LandingPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground max-w-3xl">
            Your Spotify Stats, <br />Roasted to Perfection
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Get brutally honest insights into your music taste. See your top
            tracks, artists, and let Burnify roast your listening habits.
          </p>

          <LoginButton />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
