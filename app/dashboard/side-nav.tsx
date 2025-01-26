"use client";
import { cn } from "@/lib/utils";
import { GearIcon } from "@radix-ui/react-icons";
import { ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-4 relative">
      <ul className="space-y-2 relative">
        {[
          { href: "/dashboard/search", icon: Search, label: "Search" },
          { href: "/dashboard/documents", icon: FilesIcon, label: "Documents" },
          { href: "/dashboard/notes", icon: ClipboardPen, label: "Notes" },
        ].map((item) => (
          <li key={item.href} className="relative">
            <div
              className={cn(
                "absolute inset-0 rounded-lg transition-all duration-300 ease-out",
                "bg-accent/10 opacity-0",
                pathname.endsWith(item.href.split("/").pop()!) && "opacity-100"
              )}
            />
            <Link
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-lg",
                "transition-all duration-300 ease-out group",
                pathname.endsWith(item.href.split("/").pop()!)
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  "transition-all duration-300 ease-out",
                  "group-hover:scale-110",
                  pathname.endsWith(item.href.split("/").pop()!) && "scale-110"
                )}
              />
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
