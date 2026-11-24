import { Clapperboard } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <a 
          href="#top" 
          aria-label="Cinématique home"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 transition-colors group-hover:border-purple-500/40 group-hover:bg-purple-500/20">
            <Clapperboard size={20} />
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            movie<span className="text-purple-400">List</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8" aria-label="Main navigation">
          <a 
            href="#discover" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Discover
          </a>
          <a 
            href="#collection" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            My Collection
          </a>
        </nav>
      </div>
    </header>
  );
}