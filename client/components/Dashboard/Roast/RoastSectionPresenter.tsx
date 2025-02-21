import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type RoastSectionPresenterProps = {
  isLoading: boolean;
  roasts: string[];
  onRoast: () => void;
};

export function RoastSectionPresenter({
  isLoading,
  roasts,
  onRoast,
}: RoastSectionPresenterProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Card className="h-full bg-card text-card-foreground border border-border shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold">Get Roasted🔥</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Show button when no roasts available */}
        {roasts.length === 0 && !isLoading && (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground">
              Press the button below to get roasted!
            </p>
            <Button
              onClick={onRoast}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Roast Me
            </Button>
          </div>
        )}

        {/* Show skeleton when loading */}
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ))
          : isVisible &&
            roasts.map((roast, i) => (
              <p key={i} className="text-foreground/80">
                {roast.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ))}

        {/* Show/Hide & Share Buttons (Side by Side) */}
        {roasts.length > 0 && !isLoading && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsVisible(!isVisible)}
              className="text-foreground hover:bg-muted w-full"
            >
              {isVisible ? "Hide Roast" : "Show Roast"}
            </Button>
            {/* {isVisible && (
              <Button variant="secondary" className="w-full">
                Share
              </Button>
            )} */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
