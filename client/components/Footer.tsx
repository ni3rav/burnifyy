import { Code, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden border-t-2 border-dashed border-border">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 py-8 md:flex-row sm:px-8 md:px-12 lg:px-20">
        <div className="text-primary">
          <h3 className="mb-4 text-2xl font-bold">burnifyy</h3>
          <p className="max-w-xs text-sm text-muted-foreground">
            created with 😻 by ni3rav
          </p>
        </div>
        <div className="flex flex-col items-start">
          <div className="relative flex flex-wrap gap-4">
            {[
              { href: "https://x.com/ni3rav", icon: <Twitter /> },
              { href: "https://github.com/ni3rav/burniffy", icon: <Code /> },
              { href: "https://github.com/ni3rav", icon: <Github /> },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-border transition-colors hover:border-primary sm:size-12 md:size-14 text-primary/60 hover:text-primary"
                rel="noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
