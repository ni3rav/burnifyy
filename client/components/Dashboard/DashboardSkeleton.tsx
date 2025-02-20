import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-background p-4 space-y-6">
      {/* Header Area */}
      <div className="w-full flex items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <Skeleton className="h-8 w-8" />
      </div>

      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {/* Top Tracks Section */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" /> {/* Section Title */}
            {[...Array(4)].map((_, i) => (
              <div key={`track-${i}`} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Top Artists Section */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" /> {/* Section Title */}
            {[...Array(3)].map((_, i) => (
              <div key={`artist-${i}`} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roast Section */}
        <div className="w-[300px] space-y-4">
          <Skeleton className="h-8 w-32" /> {/* Section Title */}
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={`roast-${i}`} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
