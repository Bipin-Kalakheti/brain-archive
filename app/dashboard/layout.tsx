import { GearIcon } from "@radix-ui/react-icons";
import { ClipboardPen, FilesIcon } from "lucide-react";
import Link from "next/link";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex gap-12 container mx-auto pt-10">
     <SideNav />
      {children}
    </div>
  );
}
