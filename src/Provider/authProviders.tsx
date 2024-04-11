"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/ui/Footer";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export const AuthProvider = ({ children, session }: { children: ReactNode, session: Session | null }) => {
  return (
    <SessionProvider session={session}>
      <NavBar />
      {children}
      <Footer />
    </SessionProvider>
  );
};
