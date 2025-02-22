import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { ArtistData } from "@/lib/types";

type TopArtistsPresenterProps = {
  topArtistsData: ArtistData[] | null;
  isLoading: boolean;
  error: string | null;
};

export function TopArtistsPresenter({
  topArtistsData,
  isLoading,
  error,
}: TopArtistsPresenterProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Top Artists</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))
        ) : error ? (
          <span className="text-destructive text-sm">{error}</span>
        ) : topArtistsData && topArtistsData.length > 0 ? (
          <ScrollArea className="w-full h-[300px]">
            <div className="space-y-4">
              {topArtistsData.map((artist, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* Artist Image */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={artist.imageUrl} alt={artist.name} />
                    <AvatarFallback className="flex items-center justify-center bg-muted">
                      <UserRound className="w-6 h-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  {/* Artist Details */}
                  <div>
                    {/* Name + Followers (Separate, Same Line) */}
                    <div className="flex items-center gap-2">
                      <a
                        href={artist.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-medium text-primary hover:underline"
                      >
                        {artist.name}
                      </a>
                      <span className="text-xs text-muted-foreground">
                        {artist.followers.toLocaleString()} Followers
                      </span>
                    </div>

                    {/* Genres - Limited to 3 with Proper Casing */}
                    <p className="text-sm text-muted-foreground">
                      {artist.genre.length > 0
                        ? artist.genre
                            .slice(0, 3) // Limit to 3 genres
                            .map((g) =>
                              g
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ) // Capitalize each word
                                .join(" ")
                            )
                            .join(", ") // Join with commas
                        : "Unknown Genre"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">No artists available.</p>
        )}
      </CardContent>
    </Card>
  );
}
