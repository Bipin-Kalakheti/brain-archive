"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { TrashIcon } from "lucide-react";
import { DeleteDocumentButton } from "./delete-document-button";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  return (
    <main className=" p-24 space-y-8">
      {!document && (
        <div className="space-y-4">
          <div>
            <Skeleton className="h-16 w-96" />
          </div>

          <div className="flex gap-1">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      )}

      {document && (
        <>
          {" "}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{document.title}</h1>
            <DeleteDocumentButton documentId={document._id} />
          </div>
          <div className="flex gap-12">
            <Tabs defaultValue="document" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="document">document</TabsTrigger>
                <TabsTrigger value="chat">chat</TabsTrigger>
              </TabsList>
              <TabsContent value="document">
                <div className="bg-gray-900 p-4 rounded-xl flex-1 h-96">
                  {document.documentUrl && (
                    <iframe
                      className="w-full h-full"
                      src={document.documentUrl}
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <ChatPanel documentId={document._id} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </main>
  );
}
