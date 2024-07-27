import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { Eye, ScanEye, Upload, View } from "lucide-react";
import Link from "next/link";

export function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{document.content}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="flex gap-2 items-center">
          <Link href={`/documents/${document._id}`}>
            <Eye className="w-4 h-4" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
