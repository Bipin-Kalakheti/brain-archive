import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export default function ChatPanel() {
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
          onSubmit={(event) => {
            event.preventDefault();
          }}
          action=""
        >
          <Input type="text" required name="text" />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
}
