import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function TopArtists() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Top Artists</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

