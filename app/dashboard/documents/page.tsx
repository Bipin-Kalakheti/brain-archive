"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const organization = useOrganization();
  const [isLoading, setIsLoading] = useState(true);
  const documents = useQuery(api.documents.getDocuments, {
    orgId: organization.organization?.id,
  });

  useEffect(() => {
    // Add a minimum loading time of 500ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [documents]);

  return (
    <main className="w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl font-bold text-foreground">My Documents</h1>
        <CreateDocumentButton />
      </motion.div>

      {(isLoading || !documents) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {new Array(6).fill("").map((_, i) => (
            <Card key={i} className="h-[200px] p-6">
              <div className="space-y-4 animate-pulse">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-end">
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && documents && documents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="py-12 flex flex-col justify-center items-center gap-8"
        >
          <div className="relative w-[200px] h-[200px]">
            <Image
              src="/documents.svg"
              fill
              className="animate-float"
              alt="Empty documents illustration"
            />
          </div>
          <h2 className="text-2xl text-foreground">You have no documents</h2>
          <CreateDocumentButton />
        </motion.div>
      )}

      {!isLoading && documents && documents.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {documents?.map((doc, index) => (
            <motion.div key={doc._id} variants={item}>
              <DocumentCard document={doc} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
