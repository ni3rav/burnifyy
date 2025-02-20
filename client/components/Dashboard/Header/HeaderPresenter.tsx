import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { LogOutButton } from "./LogOutButton";
import { SpotifyUserProfile } from "@/lib/types";

type HeaderPresenterProps = {
  userData: SpotifyUserProfile | null;
  isLoading: boolean;
  error: string | null;
};

export function HeaderPresenter({
  userData,
  isLoading,
  error,
}: HeaderPresenterProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {userData?.images?.[0]?.url ? (
                <AvatarImage
                  src={userData.images[0].url}
                  alt={userData.display_name}
                />
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
            {isLoading ? (
              <Skeleton className="h-4 w-[150px]" />
            ) : error ? (
              <span className="text-destructive text-sm">{error}</span>
            ) : (
              <div className="flex flex-col">
                <span className="font-medium">{userData?.display_name}</span>
                <div className="flex items-center gap-2 text-sm text-foreground/75">
                  <span>{userData?.followers.total} followers</span>
                  {userData?.product === "premium" && (
                    <Badge variant="secondary" className="capitalize">
                      {userData.product}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          <LogOutButton />
        </div>
      </CardHeader>
    </Card>
  );
}
