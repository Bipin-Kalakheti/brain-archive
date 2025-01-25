"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, NotebookPen } from "lucide-react";

function SearchReuslt({
  url,
  score,
  type,
  text,
}: {
  url: string;
  score: number;
  type: string;
  text: string;
}) {
  return (
    <Link href={url}>
      <li className="space-y-4 hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
        <div className="flex justify-between text-l items-center gap-2">
          <div className="flex gap-2 items-center">
            {type === "note" ? <NotebookPen /> : <FileIcon />}
            {type === "note" ? "Note" : "Document"}
          </div>
          <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
          <div className="">{text.substring(0, 500) + "..."}</div>
        </div>
      </li>
    </Link>
  );
}

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);

  return (
    <main className="p-24 space-y-8">
      <h1>Search Page</h1>

      <div>
        <SearchForm
          setResults={(searchResults) => {
            setResults(searchResults);
            localStorage.setItem(
              "searchResults",
              JSON.stringify(searchResults)
            );
          }}
        />
      </div>
      <ul className="flex flex-col gap-4 ">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchReuslt
                type="note"
                url={`/dashboard/notes/${result.record._id}`}
                score={result.score}
                text={result.record.text}
              />
            );
          } else {
            return (
              <SearchReuslt
                type="document"
                url={`/dashboard/documents/${result.record._id}`}
                score={result.score}
                text={result.record.title + ":" + result.record.description}
              />
            );
          }
        })}
      </ul>
    </main>
  );
}
