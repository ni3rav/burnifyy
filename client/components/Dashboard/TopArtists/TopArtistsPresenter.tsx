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
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={artist.coverImageUrl} alt={artist.artistName} />
                    <AvatarFallback className="flex items-center justify-center bg-muted">
                      <UserRound className="w-6 h-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium">{artist.artistName}</p>
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
