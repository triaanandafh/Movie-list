import { Movie } from "../components/HeroBanner";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

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

    // 2. Cek status respon HTTP
    if (!res.ok) {
      console.error("❌ TMDB Fetch Failed:", res.status, res.statusText);
      return [];
    }

    // 3. Validasi bahwa data.results memang berbentuk array
    if (!data.results || !Array.isArray(data.results)) {
      console.error("❌ Respons TMDB tidak memiliki properti results:", data);
      return [];
    }

    // Transform data TMDB ke format Interface Movie milikmu
    return data.results.map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      type: "Movie",
      year: new Date(item.release_date || Date.now()).getFullYear(),
      rating: Number(item.vote_average.toFixed(1)),
      genre: ["Action", "Sci-Fi"], // Atau fetch genre list TMDB
      posterUrl: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : "/placeholder.jpg",
      backdropUrl: item.backdrop_path ? `${BACKDROP_BASE_URL}${item.backdrop_path}` : "/placeholder-bg.jpg",
      overview: item.overview,
      duration: "2h 15m",
      director: "TMDB Featured",
      cast: ["Popular Cast"],
    }));
  } catch (error) {
    console.error("Error fetching TMDB movies:", error);
    return [];
  }
}