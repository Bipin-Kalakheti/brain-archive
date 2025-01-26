import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import { QuestionForm } from "./question-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User } from "lucide-react";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-card rounded-xl flex flex-col gap-4 p-6 h-full border shadow-sm">
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-450px)]">
          <div className="space-y-4 pr-4">
            <div className="bg-accent/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <p className="text-muted-foreground">
                Ask me any questions about your document. I'll help you
                understand and analyze its content.
              </p>
            </div>

            {chats?.map((chat, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 items-start",
                  chat.isHuman && "flex-row-reverse"
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  {chat.isHuman ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-lg p-4 max-w-[80%]",
                    chat.isHuman
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent/10",
                    "whitespace-pre-line"
                  )}
                >
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="pt-4 border-t">
        <QuestionForm documentId={documentId} />
      </div>
    </div>
  );
}
