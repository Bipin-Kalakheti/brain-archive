import { ModeToggle } from "@/components/ui/theme-toggle";

import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";

export function Header() {
  return (
    <div className="bg-slate-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-12 item-center">
          <Link href="/" className="flex items-center gap-4 text-2xl">
            <Image
              src="/Brain-Archive-.png"
              alt="Brain-Archive"
              width={50}
              height={50}
              className="rounded"
            />
            BRAIN ARCHIVE
          </Link>
          <nav className="flex items-center">
            <Link href="/" className="hover:text-slate-300">
              Documents
            </Link>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
