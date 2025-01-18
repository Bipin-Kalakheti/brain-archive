"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className=" p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <CreateDocumentButton />
      </div>
      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill(null).map((_, index) => (
            <Card className="h-[200px] p-6 flex flex-col justify-between">
              <Skeleton className="h-6 w-full" />

              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-8 w-24" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="flex flex-col justify-center items-center space-y-8">
          <Image
            src="/upload-document.svg"
            width={200}
            height={200}
            alt="Upload Document"
          />
          <h2 className="text-2xl font-semibold">You have no documents.</h2>
          <CreateDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc, index) => (
            <DocumentCard key={index} document={doc} />
          ))}
        </div>
      )}
    </main>
  );
}
