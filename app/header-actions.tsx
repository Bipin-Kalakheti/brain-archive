"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

export function HeaderActions() {
  return (
    <>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <div className="flex gap-4">
          <UserButton />
        </div>
      </Authenticated>
      <AuthLoading> Loading... </AuthLoading>
    </>
  );
}
