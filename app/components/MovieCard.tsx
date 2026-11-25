import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Movie } from "./HeroBanner";

interface MovieCardProps {
  movie: Movie;
  onOpen: (m: Movie) => void;
}

export default function MovieCard({ movie, onOpen }: MovieCardProps) {
  return (
    <button
      onClick={() => onOpen(movie)}
      aria-label={`View ${movie.title} details`}
      className="movie-card group flex flex-col text-left transition-all duration-300 focus:outline-none"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-900 border border-white/10 group-hover:border-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/10 cursor-pointer transition-all duration-300">
        <Image
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        {/* Badges Overlay */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="rounded-md bg-slate-950/70 backdrop-blur-md px-2 py-1 text-[11px] font-medium text-white border border-white/10">
            {movie.type}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-slate-950/70 backdrop-blur-md px-2 py-1 text-[11px] font-semibold text-amber-400 border border-white/10">
            <Star className="h-3 w-3 fill-amber-400" />
            {movie.rating}
          </span>
        </div>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </span>
        </div>
      </div>

      {/* Info Bottom */}
      <div className="mt-3 flex flex-col gap-1 px-1 mb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <span className="text-xs text-slate-400 font-medium">{movie.year}</span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-1">
          {movie.genre.slice(0, 2).join(" · ")}
        </p>
      </div>
    </button>
  );
}