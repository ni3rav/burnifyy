import { HeaderContainer } from "@/components/Dashboard/Header/HeaderContainer";
import { RoastSection } from "@/components/Dashboard/roast-section";
import { TopArtists } from "@/components/Dashboard/top-artists";
import { TopTracks } from "@/components/Dashboard/top-tracks";
import { Footer } from "@/components/Footer";
import { TopTracksContainer } from "@/components/Dashboard/TopTracks/TopTracksContainer";

export default function DashboardContainer() {
  return (
    <div className="container p-4 space-y-4">
      <HeaderContainer />
      <div className="grid gap-4 md:grid-cols-[1fr,400px]">
        <div className="space-y-4">
          <TopTracksContainer />
          <TopArtists />
        </div>
        <RoastSection />
      </div>
      <Footer />
    </div>
  );
}
