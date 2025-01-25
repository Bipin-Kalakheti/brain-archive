"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  return (
    <main className="p-24 space-y-8">
      <h1>Search Page</h1>

      <div>
        <SearchForm setResults={setResults} />
      </div>
      <ul className="flex flex-col gap-4 ">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <Link href={`/dashboard/notes/${result.record._id}`}>
                <li className=" hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  typeL: Note
                  {result.record.text.substring(0, 200) + "..."}
                </li>
              </Link>
            );
          } else {
            return (
              <Link href={`/dashboard/documents/${result.record._id}`}>
                <li className=" hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  type: Document
                  {result.record.title}
                  {result.record.description}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </main>
  );
}
