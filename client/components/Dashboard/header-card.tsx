import { ArrowRight, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function HeaderCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
    </Card>
  )
}

