"use client";

import { useState } from "react";

import { generateContentIdeas, type GenerateContentIdeasOutput } from "@/ai/flows/generate-content-ideas";
import { Header } from "@/components/Header";
import { FestiveSparkForm } from "@/components/FestiveSparkForm";
import { IdeaCard } from "@/components/IdeaCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormValues {
  brand: string;
  insight: string;
  festival: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateContentIdeasOutput | null>(null);
  const [formInputs, setFormInputs] = useState<FormValues | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setFormInputs(values);

    try {
      const contentIdea = await generateContentIdeas({
        festival: values.festival,
        brand: values.brand,
        insight: values.insight,
      });
      setResult(contentIdea);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Something went wrong while generating ideas. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    </div>
  );
  
  const WelcomeMessage = () => (
    <Card className="w-full animate-in fade-in duration-500">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
        <Sparkles className="h-12 w-12 text-primary/50 mb-4" />
        <h2 className="text-xl font-semibold font-headline">Welcome to FestiveSpark</h2>
        <p className="mt-2 text-muted-foreground max-w-sm">
          Fill out the form to generate creative content ideas for any festival or special occasion.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Card className="sticky top-8 shadow-lg">
              <CardContent className="p-6">
                <FestiveSparkForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
             <div className="space-y-8">
              {isLoading && <LoadingSkeleton />}
              {!isLoading && result && formInputs && (
                <div className="space-y-8 animate-in fade-in-50 duration-500">
                  <IdeaCard idea={result} brand={formInputs.brand} festival={formInputs.festival} />
                </div>
              )}
              {!isLoading && !result && <WelcomeMessage />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
