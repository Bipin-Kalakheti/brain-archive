import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-gray-900  rounded flex flex-col gap-2 p-4">
      <div className="h-[350px] overflow-y-auto space-y-2">
        <div className="bg-slate-950 p-2 rounded">Ask any question to chatgpt about your document.</div>
        <div className={cn({
          "bg-slate-800":true,
        }, "rounded p-2 text-right"
        )}>Ask any question to chatgpt about your document.</div>
      </div>
      <div className="flex gap-1">
        <form className="flex-1"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;
            await askQuestion({ question: text, documentId }).then(console.log);
          }}
        >
          <div className="flex gap-2">
            <Input type="text" className="w-full" required name="text" />
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
