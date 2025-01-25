"use client";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import { ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="space-y-6">
      <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-blue-500",
              { "text-blue-500": pathname.endsWith("/search") }
            )}
            href="/dashboard/search"
          >
            <Search className="w-6 h-6" />
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-blue-500",
              { "text-blue-500": pathname.endsWith("/documents") }
            )}
            href="/dashboard/documents"
          >
            <FilesIcon className="w-6 h-6" />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-blue-500",
              { "text-blue-500": pathname.endsWith("/notes") }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen className="w-6 h-6" />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex gap-1 items-center text-xl hover:text-blue-500",
              { "text-blue-500": pathname.endsWith("/settings") }
            )}
            href="/dashboard/settings"
          >
            <GearIcon className="w-6 h-6" />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
