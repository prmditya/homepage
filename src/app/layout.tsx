import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "prmditya@homepage:~$",
  description: "A terminal-style homepage following suckless philosophy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} bg-black`}>
        <div className="custom-gradient pointer-events-none fixed left-0 top-0 w-full z-30 h-screen animate-pan-overlay opacity-4" />
        <Header />
        <main className="min-h-full hp-5">{children}</main>
        <Footer />
        <div className="pointer-events-none fixed bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent z-40" />
      </body>
    </html>
  );
}
