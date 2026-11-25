import { Search } from "lucide-react";

const CATEGORIES = ["All titles", "Action", "Sci-Fi", "Drama", "Animation"];

interface SearchFilterProps {
  query: string;
  setQuery: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
}

export default function SearchFilter({
  query,
  setQuery,
  category,
  setCategory,
}: SearchFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Input Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          aria-label="Search titles"
          placeholder="Search titles, genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-12 py-2.5 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      {/* Genre Pills */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by genre">
        {CATEGORIES.map((item) => {
          const isActive = category === item;
          return (
            <button
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={isActive}
              className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                  : "bg-slate-900/60 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}