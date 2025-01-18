"use client"
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Form,FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { generateUploadUrl, createDocument } from "@/convex/documents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(1).max(250),
});

export function QuestionForm({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Ask any question over your document." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Submitting..."
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
