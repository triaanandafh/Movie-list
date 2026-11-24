"use client";
import Navbar from "./components/Navbar";
import HeroBanner, { Movie } from "./components/HeroBanner";
import moviesData from "./data/movies.json";
import { useState } from "react";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const featuredMovie = moviesData[0] as Movie;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <HeroBanner 
        movie={featuredMovie} 
        onSelect={(movie) => setSelectedMovie(movie)} 
      />
      
      {/* Container Konten Utama */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-100">
          Selamat Datang di movieList
        </h1>
        <p className="mt-2 text-slate-400">
          Koleksi Movie & Series Pilihan.
        </p>
      </div>
    </main>
  );
}