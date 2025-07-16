"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lightbulb, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  brand: z.string().min(2, "Brand name must be at least 2 characters.").max(50),
  insight: z.string().min(10, "Brief must be at least 10 characters.").max(200, "Brief cannot exceed 200 characters."),
  festival: z.string().min(3, "Festival name must be at least 3 characters.").max(50),
  targetAudience: z.string().min(10, "Target audience must be at least 10 characters.").max(100),
  toneOfVoice: z.string({ required_error: "Please select a tone of voice."}),
});

type FormValues = z.infer<typeof formSchema>;

interface FestiveSparkFormProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
}

export function FestiveSparkForm({ onSubmit, isLoading }: FestiveSparkFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      insight: "",
      festival: "",
      targetAudience: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Coca-Cola" {...field} />
              </FormControl>
              <FormDescription>Your brand's name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Product/Service Brief</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A refreshing drink that brings people together."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your product/service and its audience insight.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="festival"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Festival or Special Day</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Diwali, Christmas, New Year's Day" {...field} />
              </FormControl>
              <FormDescription>
                The cultural event to focus on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Target Audience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Young professionals, 25-35, who value tradition but are short on time."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Who is this content for?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toneOfVoice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Tone of Voice</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Humorous">Humorous & Witty</SelectItem>
                  <SelectItem value="Inspirational">Inspirational & Uplifting</SelectItem>
                  <SelectItem value="Nostalgic">Nostalgic & Heartfelt</SelectItem>
                  <SelectItem value="Modern">Modern & Edgy</SelectItem>
                  <SelectItem value="Formal">Formal & Elegant</SelectItem>
                  <SelectItem value="Playful">Playful & Fun</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                The desired style of the content.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full font-headline">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generating Ideas..." : "Spark Inspiration"}
        </Button>
      </form>
    </Form>
  );
}
