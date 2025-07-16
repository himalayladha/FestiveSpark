"use client";

import { useState } from "react";
import { Clipboard, Check, FileText, ImageIcon, Film, MessageSquare, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { GenerateContentIdeasOutput } from "@/ai/flows/generate-content-ideas";

interface IdeaCardProps {
  idea: GenerateContentIdeasOutput;
  brand: string;
  festival: string;
}

function getFormatIcon(format: string) {
    const lowerFormat = format.toLowerCase();
    if (lowerFormat.includes("video")) return <Film className="h-4 w-4 text-muted-foreground" />;
    if (lowerFormat.includes("image")) return <ImageIcon className="h-4 w-4 text-muted-foreground" />;
    if (lowerFormat.includes("text") || lowerFormat.includes("post")) return <FileText className="h-4 w-4 text-muted-foreground" />;
    return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
}

export function IdeaCard({ idea, brand, festival }: IdeaCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = `
Festival: ${festival}
Brand: ${brand}
---
Idea: ${idea.idea}
Format: ${idea.format}
Visual Cue: ${idea.visualCue}
Copy Line: ${idea.copyLine}
Rationale: ${idea.rationale}
    `.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "The content idea is now on your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Could not copy the text.",
      });
    });
  };

  return (
    <Card className="w-full relative shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-8 w-8"
        onClick={copyToClipboard}
        aria-label="Copy to clipboard"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
      </Button>
      <CardHeader>
        <CardTitle className="font-headline">Content Idea</CardTitle>
        <CardDescription>Generated for {brand} during {festival}.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-semibold text-sm font-headline">Idea</h4>
          <p className="text-muted-foreground">{idea.idea}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm font-headline">Format</h4>
          <div className="flex items-center gap-2">
             {getFormatIcon(idea.format)}
            <p className="text-muted-foreground">{idea.format}</p>
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm font-headline">Visual Cue</h4>
          <p className="text-muted-foreground">{idea.visualCue}</p>
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-sm font-headline">Copy Line</h4>
          <p className="text-muted-foreground font-medium italic">"{idea.copyLine}"</p>
        </div>
        <Separator />
         <div className="space-y-2 rounded-lg bg-muted/50 p-4">
          <h4 className="font-semibold text-sm font-headline flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            Rationale
          </h4>
          <p className="text-muted-foreground text-sm">{idea.rationale}</p>
        </div>
      </CardContent>
    </Card>
  );
}
