import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { MouseEvent, ReactNode } from "react";

export function LoadingButton({
  isLoading,
  children,
  loadingText,
  onClick,
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) {
  return (
    <Button
      className="flex gap-1 items-center"
      disabled={isLoading}
      type="submit"
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      {isLoading && <Loader className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
