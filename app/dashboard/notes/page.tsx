"use client";
import { api } from "@/convex/_generated/api";
import CreateNoteButton from "./create-note-button";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);
  return <div className="text-2xl font-semibold">Please Select a note</div>;
}
