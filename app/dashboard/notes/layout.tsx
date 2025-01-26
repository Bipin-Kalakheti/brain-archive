"use client";
import { api } from "@/convex/_generated/api";
import CreateNoteButton from "./create-note-button";
import { useQuery } from "convex/react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl font-bold text-foreground">My Notes</h1>
        <CreateNoteButton />
      </motion.div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-1/3 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ))}
          </div>
          <div className="flex-1">
            <Skeleton className="h-[600px] rounded-lg" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center space-y-8 py-12"
        >
          <div className="relative w-[200px] h-[200px]">
            <Image
              src="/upload-document.svg"
              fill
              className="animate-float"
              alt="No notes illustration"
            />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            You have no notes
          </h2>
          <CreateNoteButton />
        </motion.div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex gap-6 h-[calc(100vh-12rem)]">
          <ScrollArea className="w-1/3 pr-4">
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {notes?.map((note) => (
                <motion.li key={note._id} variants={item}>
                  <Link href={`/dashboard/notes/${note._id}`}>
                    <div
                      className={cn(
                        "p-4 rounded-lg transition-all duration-300",
                        "hover:bg-accent/10 hover:shadow-md",
                        "group relative overflow-hidden",
                        noteId === note._id
                          ? "bg-accent/10 shadow-md"
                          : "bg-card"
                      )}
                    >
                      <p className="font-medium text-foreground line-clamp-2">
                        {note.text}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(note._creationTime).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </ScrollArea>
          <div className="flex-1 bg-card rounded-lg p-6">{children}</div>
        </div>
      )}
    </main>
  );
}
