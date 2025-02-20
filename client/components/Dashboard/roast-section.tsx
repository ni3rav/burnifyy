import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RoastSection() {
  return (
    <Card className="h-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Roast Section</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

