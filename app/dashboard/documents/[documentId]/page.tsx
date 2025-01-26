"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import { DeleteDocumentButton } from "./delete-document-button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  if (!document) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 space-y-6 w-full"
      >
        <div className="flex justify-between w-full items-start">
          <div className="space-y-3">
            <Skeleton className="h-12 w-[400px]" />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-5 w-[180px]" />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-20 rounded-lg" />
        </div>

        <div className="space-y-4">
          <div className="border-b pb-2">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>

          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="animate-pulse">
              <div className="flex items-center justify-center h-[calc(100vh-250px)] bg-accent/5">
                <div className="text-center space-y-4">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="p-8 space-y-6 flex-1">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-start"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">{document.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Added on{" "}
              {format(new Date(document._creationTime), "MMMM d, yyyy")}
            </span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{format(new Date(document._creationTime), "h:mm a")}</span>
          </div>
        </div>
        <DeleteDocumentButton documentId={document._id} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="document" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            <div className="bg-card rounded-lg overflow-hidden border shadow-sm h-[calc(100vh-300px)]">
              {document.documentUrl && (
                <div className="h-full overflow-auto custom-scrollbar">
                  <DocViewer
                    documents={[{ uri: document.documentUrl }]}
                    pluginRenderers={DocViewerRenderers}
                    className="h-full"
                    config={{
                      header: {
                        disableHeader: true,
                        disableFileName: true,
                      },
                      pdfZoom: {
                        defaultZoom: 1.1,
                        zoomJump: 0.2,
                      },
                      csvDelimiter: ",",
                    }}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <div className="h-[calc(100vh-300px)]">
              <ChatPanel documentId={document._id} />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
