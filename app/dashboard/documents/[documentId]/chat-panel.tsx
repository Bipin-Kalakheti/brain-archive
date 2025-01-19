import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import { QuestionForm } from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-gray-900  rounded-xl flex flex-col gap-2 p-6">
      <div className="h-[350px] overflow-y-auto space-y-2">
        <div className="bg-slate-950 p-2 rounded">
          Ask any question to chatgpt about your document.
        </div>

        {chats?.map((chat, index) => (
          <div
            key={index}
            className={cn(
              {
                "bg-slate-800": chat.isHuman,
                "bg-slate-950": !chat.isHuman,
                "text-right": chat.isHuman,
              },
              "rounded-lg p-4 whitespace-pre-line"
            )}
          >
            {chat.isHuman ? "You" : "AI"}:{chat.text}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}
