"use client";
import CreateNoteButton from "./create-note-button";

export default function NotesPage() {
  return (
    <main className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateNoteButton />
      </div>
    </main>
  );
}
