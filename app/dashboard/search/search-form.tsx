"use client";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { generateUploadUrl, createDocument } from "@/convex/documents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useOrganization } from "@clerk/nextjs";

const formSchema = z.object({
  search: z.string().min(1).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const organization = useOrganization();
  const searchAction = useAction(api.search.searchAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchAction({
      search: values.search,
      orgId: organization.organization?.id,
    }).then(setResults);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    className="flex-1"
                    placeholder="Search over all your notes and documents using vector search"
                    {...field}
                  />
                </FormControl>
                <LoadingButton
                  isLoading={form.formState.isSubmitting}
                  loadingText="Searching..."
                >
                  Search
                </LoadingButton>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
