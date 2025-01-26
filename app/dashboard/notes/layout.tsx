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

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes,{
    orgId: organization.organization?.id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  const hasNotes = notes && notes.length > 0;

  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-1/3 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div className="flex flex-col justify-center items-center space-y-8">
          <Image
            src="/upload-document.svg"
            width={200}
            height={200}
            alt="Upload Document"
          />
          <h2 className="text-2xl font-semibold">You have no notes.</h2>
          <CreateNoteButton />
        </div>
      )}

      {notes && notes?.length > 0 && (
        <div className="flex gap-2">
          <ul className=" w-1/3">
            {notes?.map((note) => (
              <li key={note._id} className=" mb-5 mt-5 w-full">
                <Link
                  className={cn(
                    "bg-stone-800 p-2  rounded-md shadow-md hover:shadow-lg hover:bg-orange-900 w-full",
                    {
                      "bg-orange-900": noteId === note._id,
                    }
                  )}
                  href={`/dashboard/notes/${note._id}`}
                >
                  {note.text.substring(0, 24) + "..."}
                </Link>
              </li>
            ))}
          </ul>
          <div className=" w-full">{children}</div>
        </div>
      )}
    </main>
  );
}
