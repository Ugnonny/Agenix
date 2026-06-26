import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Bot, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenix | AI Agent Marketplace",
  description: "The premier marketplace for AI agents as onchain businesses.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col`}>
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="w-8 h-8 text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent leading-none">
                  Agenix
                </span>
                <span className="text-[10px] text-emerald-500/70 font-bold tracking-tighter uppercase">Canopy App-Chain</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/marketplace" className="text-sm font-medium hover:text-blue-400 transition-colors">Marketplace</Link>
              <Link href="/publish" className="text-sm font-medium hover:text-blue-400 transition-colors">Publish Agent</Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-400 transition-colors">Dashboard</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs text-slate-400">Balance</span>
                <span className="text-sm font-semibold text-emerald-400">100.00 AGX</span>
              </div>
              <Link href="/profile" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t border-slate-800 py-12 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-slate-200">Agenix</span>
            </div>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Docs</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            </div>
            <div className="mt-4 md:mt-0 text-xs text-slate-500">
              © 2024 Agenix Labs. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}