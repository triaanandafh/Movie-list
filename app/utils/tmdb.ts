import { Movie } from "../components/HeroBanner";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Action",
  16: "Animation", 
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Animation",
  14: "Sci-Fi",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Action",
  10752: "War",
  37: "Western",
};

export async function fetchTrendingMovies(): Promise<Movie[]> {
    if (!API_KEY) {
    console.warn("⚠️ NEXT_PUBLIC_TMDB_API_KEY belum dipasang di .env.local");
    return [];
  }

  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) {
      console.error("❌ TMDB Fetch Failed:", res.status, res.statusText);
      return [];
    }

    if (!data.results || !Array.isArray(data.results)) {
      console.error("❌ Respons TMDB tidak memiliki properti results:", data);
      return [];
    }

    
    return data.results.map((item: any) => {
        const mappedGenres =
        item.genre_ids && item.genre_ids.length > 0
          ? item.genre_ids
              .map((id: number) => GENRE_MAP[id])
              .filter((g: any): g is string => Boolean(g))
          : ["Drama"];

    return {
      id: item.id,
      title: item.title || item.name,
      type: "Movie",
      year: new Date(item.release_date || Date.now()).getFullYear(),
      rating: Number(item.vote_average.toFixed(1)),
      genre: mappedGenres.length > 0 ? mappedGenres : ["Drama"], 
      posterUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/placeholder.jpg",
      backdropUrl: item.backdrop_path ? `${BACKDROP_BASE_URL}${item.backdrop_path}` : "/placeholder-bg.jpg",
      overview: item.overview,
      duration: "2h 15m",
      director: "TMDB Featured",
      cast: ["Popular Cast"],
    };
    });
  } catch (error) {
    console.error("Error fetching TMDB movies:", error);
    return [];
  }
}