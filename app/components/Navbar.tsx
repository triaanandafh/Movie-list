"use client";

import { useState, useEffect } from "react";
import { Clapperboard } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  activeTab: "discover" | "my-list";
  onTabChange: (tab: "discover" | "my-list") => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onTabChange("discover");
    setTimeout(() => {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMyListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onTabChange("my-list");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 py-4">
        {/* Brand Logo */}
        <a 
          href="#top" 
          aria-label="Cinématique home"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 transition-colors group-hover:border-purple-500/40 group-hover:bg-purple-500/20">
            <Image src="/logo1.png" alt="Cinématique Logo" width={40} height={40} />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            watch<span className="text-purple-400">List</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8" aria-label="Main navigation">
          <button 
            onClick={handleDiscoverClick}
            className={`text-sm font-medium transition-colors ${
              activeTab === "discover"
                ? "text-purple-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Discover
          </button>
          <button 
            onClick={handleMyListClick}
            className={`text-sm font-medium transition-colors ${
              activeTab === "my-list"
                ? "text-purple-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }`}
          >
            My List
          </button>
        </nav>
      </div>
    </header>
  );
}