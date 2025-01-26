"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Calendar, Clock, Loader2, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { DeleteNoteButton } from "../delete-note-button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, { noteId: noteId });

  if (!note) {
    return (
      <div className="h-full space-y-4 p-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-x-4">
          <Skeleton className="h-5 w-32 inline-block" />
          <Skeleton className="h-5 w-32 inline-block" />
        </div>
        <Skeleton className="h-[calc(100%-100px)] w-full" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-start p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              Created on {format(new Date(note._creationTime), "MMMM d, yyyy")}
            </span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{format(new Date(note._creationTime), "h:mm a")}</span>
          </div>
        </div>
        <div className="relative">
          <DeleteNoteButton noteId={note._id} />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg p-6 mb-4"
        >
          <div className="whitespace-pre-line text-foreground">
            {note?.text}
          </div>
        </motion.div>
      </ScrollArea>
    </div>
  );
}
