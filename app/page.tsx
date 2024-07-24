"use client";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

import Image from "next/image";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocuments = useMutation(api.documents.createDocument);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />

        <button
          onClick={() => {
            createDocuments({
              title: "Hello World",
              content: "This is a test",
            });
          }}
        >
          Click me
        </button>

        {documents?.map((doc) => <div key={doc._id}>{doc.title}</div>)}
      </Authenticated>
    </main>
  );
}
