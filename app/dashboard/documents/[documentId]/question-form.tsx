"use client";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SendHorizontal } from "lucide-react";

const formSchema = z.object({
  text: z.string().min(1).max(250),
});

export function QuestionForm({ documentId }: { documentId: Id<"documents"> }) {
  const askQuestion = useAction(api.documents.askQuestion);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({ question: values.text, documentId });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Ask any question about your document..."
                  {...field}
                  className="bg-accent/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          size="icon"
          isLoading={form.formState.isSubmitting}
          loadingText=""
          className="shrink-0"
        >
          <SendHorizontal className="w-4 h-4" />
        </LoadingButton>
      </form>
    </Form>
  );
}
