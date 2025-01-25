"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { DeleteNoteButton } from "../delete-note-button";

export default function NotesPage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, { noteId: noteId });

  if (!note) {
    return <div>Please Select a note</div>;
  }

  return (
    <main className="relative bg-slate-800 rounded-xl p-4">
      <DeleteNoteButton noteId={note._id} />

      <div className="pr-3 whitespace-pre-line">{note?.text}</div>
    </main>
  );
}
