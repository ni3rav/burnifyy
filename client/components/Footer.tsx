import { Card, CardHeader } from "@/components/ui/card";

export function Footer() {
  return (
    <Card className="w-full border border-[--border] bg-[--background] rounded-lg shadow-md cursor-default">
      <CardHeader className="py-2 px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between text-[--foreground] font-semibold text-xs sm:text-base">
          <span className="flex items-center gap-1">
            made with <span className="text-lg">😺</span> by{" "}
            <a href="https://x.com/ni3rav" target="_blank" className="font-bold">ni3rav</a>
          </span>
          <a href="https://github.com/ni3rav/burnifyy" target="_blank" className="font-semibold border-foreground border-dashed border-b-2">
            Source Code
          </a>
        </div>
      </CardHeader>
    </Card>
  );
}
