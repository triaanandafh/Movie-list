import { Star, ArrowUpRight, ArrowDown } from "lucide-react";

export interface Movie {
  cast: any;
  id: string | number;
  title: string;
  type: string;
  year: number;
  rating: number;
  genre: string[];
  posterUrl: string;
  backdropUrl: string;
  overview: string;
  duration?: string;
  director?: string;
}

interface HeroBannerProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onBrowse?: () => void;
}

export default function HeroBanner({ movie, onSelect, onBrowse }: HeroBannerProps) {
  if (!movie) return null;

  return (
    <section 
      id="featured" 
      className="relative isolate min-h-[440px] overflow-hidden border-b border-white/10 bg-slate-950 sm:min-h-[500px]"
    >
      {/* Background Image */}
      <img
        src={movie.backdropUrl}
        alt={movie.title}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Dark Scrim Gradients for Visual Contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent lg:w-3/4" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="mx-auto flex min-h-[440px] max-w-7xl items-end px-6 py-12 sm:min-h-[500px] sm:items-center sm:px-8 sm:py-16 lg:px-12">
        <div className="max-w-xl">
          {/* Spotlight Tag */}
         <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="tracking-wider uppercase">THIS WEEK'S SPOTLIGHT</span>
        </div>

          {/* Title */}
          <h1 className="max-w-xl text-4xl font-extrabold uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          {/* Metadata: Year, Rating, Genre */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-medium text-slate-300">{movie.year}</span>
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>{movie.rating.toFixed(1)}</span>
            </span>
            <span className="border-l border-white/20 pl-4 text-slate-400">
              {movie.genre.join(" · ")}
            </span>
          </div>

          {/* Overview */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 line-clamp-3 sm:text-base">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelect(movie)}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-95"
            >
              View Details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
            >
              Browse Collection <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}