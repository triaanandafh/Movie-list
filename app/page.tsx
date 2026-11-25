"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Search, ArrowRight, Clapperboard } from "lucide-react";
import Image from "next/image";

import Navbar from "./components/Navbar";
import HeroBanner, { Movie } from "./components/HeroBanner";
import moviesData from "./data/movies.json";
import SearchFilter from "./components/SearchFilter";
import MovieCard from "./components/MovieCard";
import SkeletonCard from "./components/SkeletonCard";
import MovieModal from "./components/MovieModal";
import { fetchTrendingMovies } from "./utils/tmdb";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All titles");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlistIds, setWatchlistIds] = useState<(string | number)[]>([]);
  const [activeTab, setActiveTab] = useState<"discover" | "my-list">("discover");

  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      try {
        setWatchlistIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  useEffect(() => {
  async function loadData() {
    setLoading(true);
    const apiMovies = await fetchTrendingMovies();
    
    // Fallback
    if (apiMovies.length > 0) {
      setMovies(apiMovies);
    } else {
      setMovies(moviesData as unknown as Movie[]);
    }
    setLoading(false);
  }
  loadData();
}, []);

  // Filter Logic
  const filtered = useMemo(() => {
    return movies.filter((movie) => {
      const matchesQuery = `${movie.title} ${movie.genre.join(" ")} ${movie.type}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory =
        category === "All titles" || movie.genre.includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [query, category, movies]);

  const scrollToCollection = () => {
  setActiveTab("discover");
  setTimeout(() => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

  const toggleWatchlist = (movie: Movie) => {
  setWatchlistIds((prev) => {
    const exists = prev.includes(movie.id);
    const next = exists
      ? prev.filter((id) => id !== movie.id)
      : [...prev, movie.id];
    localStorage.setItem("watchlist", JSON.stringify(next));
    return next;
  });
};

      const displayedMovies = useMemo(() => {
      let sourceMovies = movies;

      if (activeTab === "my-list") {
        sourceMovies = movies.filter((movie) => watchlistIds.includes(movie.id));
      }

      // Filter berdasarkan search query & kategori genre
      return sourceMovies.filter((movie) => {
        const matchesQuery = `${movie.title} ${movie.genre.join(" ")} ${movie.type}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === "All titles" || movie.genre.includes(category);
        return matchesQuery && matchesCategory;
      });
    }, [query, category, movies, activeTab, watchlistIds]);

     // Animasi GSAP untuk Cards
  useEffect(() => {
    if (loading || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".movie-card");
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }, [loading, displayedMovies, activeTab]);

   const featuredMovie = movies[0] || (moviesData[0] as Movie);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab)} 
      />
      {activeTab === "discover" && (
      <HeroBanner 
        movie={featuredMovie} 
        onSelect={(movie) => setSelectedMovie(movie)} 
        onBrowse={scrollToCollection} 
  />
      )}
      
      <section id="collection" className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 ${activeTab === "my-list" ? "pt-12" : "py-12"}`}>
        {/* Section Heading */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="tracking-wider uppercase">
                 {activeTab === "discover" ? "FIND YOUR NEXT WATCH" : "YOUR SAVED COLLECTION"}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              {activeTab === "discover" ? (
                <>Explore Collection<span className="text-purple-500">.</span></>
              ) : (
                <>My Watchlist <span className="text-purple-500">.</span></>
              )}
            </h2>
          </div>
        </div>

        {/* Search & Filter Component */}
        <SearchFilter
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
        />

        {/* Grid / Loading / Empty State */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedMovies.length ? (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
          >
            {displayedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onOpen={setSelectedMovie} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-white/5 bg-white/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 border border-white/10 text-slate-400 mb-4">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No titles found</h3>
            <p className="text-xs text-slate-400 mb-4">
              Try another title or switch up your filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All titles");
              }}
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row text-xs text-slate-500">
          <a href="#top" className="flex items-center gap-2 text-white font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 transition-colors group-hover:border-purple-500/40 group-hover:bg-purple-500/20">
                <Image src="/logo1.png" alt="Cinématique Logo" width={40} height={40} />
             </span>
            <span className="text-xl font-bold tracking-tight text-white">
                watch<span className="text-purple-400">List</span>
            </span>
          </a>
          <span>A little more cinema in your everyday.</span>
          <span>© 2026 watchList</span>
        </div>
      </footer>

      {/* Modal Detail Film */}
      <MovieModal 
      movie={selectedMovie} 
      onClose={() => setSelectedMovie(null)} 
      inWatchlist={selectedMovie ? watchlistIds.includes(selectedMovie.id) : false}
      onToggleWatchlist={toggleWatchlist} 
    />
    </main>
  );
}