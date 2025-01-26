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
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DocumentCard({ document }: { document: Doc<"documents"> }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="line-clamp-1">{document.title}</CardTitle>
        <CardDescription className="line-clamp-1">
          Added on {new Date(document._creationTime).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="h-[80px] overflow-hidden text-muted-foreground">
          {!document.description ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-accent" />
            </div>
          ) : (
            <span className="line-clamp-3">{document.description}</span>
          )}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="secondary"
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300"
        >
          <Link
            href={`/dashboard/documents/${document._id}`}
            className="flex gap-2 items-center"
          >
            <Eye className="w-4 h-4" />
            View Document
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
