import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          FestiveSpark
        </h1>
      </div>
    </header>
  );
}
