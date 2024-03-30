"use client";

import NavBar from "@/components/NavBar";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <NavBar />
      {children}
    </SessionProvider>
  );
};
