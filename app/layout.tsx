"use client";

import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const bricolage_grotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={bricolage_grotesque.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
