import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Disc2 } from "lucide-react";
import { TrackData } from "@/lib/types";

type TopTracksPresenterProps = {
  topTracksData: TrackData[] | null;
  isLoading: boolean;
  error: string | null;
};

export function TopTracksPresenter({
  topTracksData,
  isLoading,
  error,
}: TopTracksPresenterProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Top Tracks</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))
        ) : error ? (
          <span className="text-destructive text-sm">{error}</span>
        ) : topTracksData && topTracksData.length > 0 ? (
          <ScrollArea className="w-full h-[300px]">
            <div className="space-y-4">
              {topTracksData.map((track, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage
                      src={track.coverImageUrl}
                      alt={track.trackName}
                      className="rounded-md"
                    />
                    <AvatarFallback className="flex items-center justify-center bg-muted rounded-md">
                      <Disc2 className="w-6 h-6 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium">{track.trackName}</p>
                    <p className="text-sm text-muted-foreground">
                      {track.artistName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">No tracks available.</p>
        )}
      </CardContent>
    </Card>
  );
}
