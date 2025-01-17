import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";

export default function ChatPanel({
    documentId
}: {documentId: Id<"documents">}) {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-gray-900 w-60 rounded flex flex-col gap-2 p-4">
      <div className="h-[350px] overflow-y-auto ">
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
        <div>hello world</div>
        <div className="">hello world</div>
        <div>wow how is it</div>
      </div>
      <div className="flex gap-1">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;
            await askQuestion({ question: text, documentId }).then(console.log);
          }}
        >
          <Input type="text" required name="text" />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
}
