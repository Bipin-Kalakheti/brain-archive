"use client";

import { ModeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Authenticated } from "convex/react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="z-10   border-b shadow-sm backdrop-blur-sm bg-card/80 sticky top-0"
    >
      <div className="container mx-auto flex justify-between items-center h-16">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-semibold group"
          >
            <div className="relative">
              <Image
                src="/Brain-Archive.png"
                width={36}
                height={36}
                className="rounded-lg transition-transform group-hover:scale-110"
                alt="Brain Archive logo"
              />
            </div>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BRAIN ARCHIVE
            </span>
          </Link>

          <nav className="flex items-center gap-8">
            <div className="p-[2px] rounded-lg bg-accent/10">
              <OrganizationSwitcher />
            </div>

            <Authenticated>
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors font-medium"
              >
                Dashboard
              </Link>
            </Authenticated>
          </nav>
        </div>

        <div className="flex gap-4 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </motion.div>
  );
}
