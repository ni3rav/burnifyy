import { HeaderCard } from "@/components/Dashboard/header-card";
import { RoastSection } from "@/components/Dashboard/roast-section";
import { TopArtists } from "@/components/Dashboard/top-artists";
import { TopTracks } from "@/components/Dashboard/top-tracks";
import { Footer } from "../Footer";

export default function DashboardContainer() {
  return (
    <div className="container p-4 space-y-4">
      <HeaderCard />
      <div className="grid gap-4 md:grid-cols-[1fr,400px]">
        <div className="space-y-4">
          <TopTracks />
          <TopArtists />
        </div>
        <RoastSection />
      </div>
      <Footer />
    </div>
  );
}
