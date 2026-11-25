"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Search, ArrowRight, Clapperboard } from "lucide-react";

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

  const gridRef = useRef<HTMLDivElement>(null);
  // const movies = moviesData as unknown as Movie[];

  useEffect(() => {
  async function loadData() {
    setLoading(true);
    const apiMovies = await fetchTrendingMovies();
    
    // Fallback: Jika API error / key belum dipasang, pakai movies.json lokal
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
  }, [loading, filtered]);

   const featuredMovie = movies[0] || (moviesData[0] as Movie);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroBanner 
        movie={featuredMovie} 
        onSelect={(movie) => setSelectedMovie(movie)} 
      />
      
      <section id="collection" className="mx-auto max-w-7xl px-6 py-12">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
              <span className="h-px w-6 bg-purple-500" />
              <span>CURATED FOR YOUR NEXT WATCH</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Your watchlist<span className="text-purple-500">.</span>
            </h2>
          </div>
          {/* <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <span className="text-white font-bold">
              {filtered.length.toString().padStart(2, "0")}
            </span>
            <span>titles to explore</span>
            <ArrowRight className="h-3.5 w-3.5 text-purple-400" />
          </div> */}
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
        ) : filtered.length ? (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
          >
            {filtered.map((movie) => (
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
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-400">
              <Clapperboard size={14} />
            </span>
            <span>ciné<span className="text-purple-400">matique</span></span>
          </a>
          <span>A little more cinema in your everyday.</span>
          <span>© 2026 movieList</span>
        </div>
      </footer>

      {/* Modal Detail Film */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </main>
  );
}