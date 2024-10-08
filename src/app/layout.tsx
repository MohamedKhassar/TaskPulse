import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "@/Provider/authProviders"
import { Session } from "next-auth";
import StoreProvider from "@/Provider/storeProvider";
import { Bounce, ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode, session: Session | null
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#252729] min-h-screen flex flex-col  h-screen"}>
        <StoreProvider>
          <AuthProvider session={session}>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
            {children}
          </AuthProvider>
        </StoreProvider>

      </body>
    </html>
  );
}
