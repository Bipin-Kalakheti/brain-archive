"use client";
import { Doc } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { SearchForm } from "./search-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, NotebookPen } from "lucide-react";
import { motion } from "framer-motion";

function SearchResult({
  url,
  score,
  type,
  text,
  index,
}: {
  url: string;
  score: number;
  type: string;
  text: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={url}>
        <li className="group relative overflow-hidden">
          <div className="space-y-4 bg-card hover:bg-accent/5 rounded-xl p-6 transition-all duration-300 ease-out">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors">
                  {type === "note" ? (
                    <NotebookPen className="w-5 h-5" />
                  ) : (
                    <FileIcon className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {type === "note" ? "Note" : "Document"}
                  </span>
                </div>
                <div className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent">
                  Score: {score.toFixed(2)}
                </div>
              </div>
              <p className="text-muted-foreground line-clamp-3">
                {text.substring(0, 500)}...
              </p>
            </div>
          </div>
        </li>
      </Link>
    </motion.div>
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
    <main className="max-w-4xl mx-auto p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Search</h1>
        <div className="mb-12">
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
      </motion.div>

      <ul className="flex flex-col gap-4">
        {results?.map((result, index) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                key={result.record._id}
                type="note"
                url={`/dashboard/notes/${result.record._id}`}
                score={result.score}
                text={result.record.text}
                index={index}
              />
            );
          } else {
            return (
              <SearchResult
                key={result.record._id}
                type="document"
                url={`/dashboard/documents/${result.record._id}`}
                score={result.score}
                text={result.record.title + ": " + result.record.description}
                index={index}
              />
            );
          }
        })}
      </ul>
    </main>
  );
}
