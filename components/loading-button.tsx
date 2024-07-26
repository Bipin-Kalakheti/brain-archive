import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export function LoadingButton({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
}) {
  return (
    <Button
      className="flex gap-1 items-center"
      disabled={isLoading}
      type="submit"
    >
      {isLoading && <Loader className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
