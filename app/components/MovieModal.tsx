import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Star, Clock3, Film, Plus, X, Check } from "lucide-react";
import { Movie } from "./HeroBanner";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  inWatchlist: boolean;
  onToggleWatchlist: (m: Movie) => void;
}

export default function MovieModal({ movie, onClose, inWatchlist, onToggleWatchlist }: MovieModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!movie) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md transition-all"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header Image */}
        <div
          className="relative flex h-64 w-full flex-col justify-between p-6 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, #0f172a 0%, rgba(15, 23, 42, 0.4) 100%), url("${movie.backdropUrl}")`,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close details"
            className="self-end rounded-full bg-slate-950/60 p-2 text-slate-300 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div>
            <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
              {movie.type} · {movie.year}
            </span>
            <h2 id="modal-title" className="text-3xl font-extrabold text-white mt-1">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="p-6 pt-2">
          {/* Stats Bar */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 border-b border-white/10 pb-4">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="h-4 w-4 fill-amber-400" />
              {movie.rating} <span className="text-slate-500 font-normal">/ 10</span>
            </span>
            {movie.duration && (
              <span className="flex items-center gap-1">
                <Clock3 className="h-4 w-4 text-slate-400" />
                {movie.duration}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Film className="h-4 w-4 text-slate-400" />
              {movie.genre.join(" · ")}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-300 mb-6">
            {movie.overview}
          </p>

          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/5 p-4 border border-white/5 text-xs mb-6">
            <div>
              <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">
                DIRECTOR
              </span>
              <strong className="text-white font-medium">{movie.director || "-"}</strong>
            </div>
            <div>
              <span className="block text-slate-500 font-semibold uppercase tracking-wider mb-1">
                STARRING
              </span>
              <strong className="text-white font-medium">
                {movie.cast ? movie.cast.join(", ") : "-"}
              </strong>
            </div>
          </div>

          {/* Dynamic Button Add / Remove */}
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all ${
              inWatchlist
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
                : "bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/20"
            }`}
          >
            {inWatchlist ? (
              <>
                <Check className="h-4 w-4" /> Added to Watchlist
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add to Watchlist
              </>
            )}
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}