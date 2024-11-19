"use client";

import Loader from "@/app/components/loader/Loader";
import MovieCard from "@/app/components/movieCard/MovieCard";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieRecommendations,
} from "@/app/utils/api";
import { CastMember, Movie, MovieDetails } from "@/app/utils/types/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  // Load movie details
  useEffect(() => {
    const loadMovieDetails = async () => {
      if (id) {
        setLoading(true);
        const response = await fetchMovieDetails(id as string);
        setMovie(response.data);
        setLoading(false);

        // Check if the movie is already a favorite
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          const favorites = JSON.parse(storedFavorites);
          setIsFavorite(
            favorites.some((fav: MovieDetails) => fav.id === Number(id))
          );
        }
      }
    };
    loadMovieDetails();

    const loadCredits = async () => {
      const response = await fetchMovieCredits(id as string);
      setCast(response.data.cast.slice(0, 10)); // Show top 10 cast members
    };
    loadCredits();

    const loadRecommendations = async () => {
      const response = await fetchMovieRecommendations(id as string);
      setRelatedMovies(response.data.results.slice(0, 3));
    };
    loadRecommendations();
  }, [id]);

  // Toggle favorite functionality
  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: MovieDetails[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== movie?.id);
    } else {
      // Add to favorites
      if (movie) favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <Loader />;

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <div
        className="flex flex-col md:flex-row items-center md:items-start md:gap-6 mb-1
      0"
      >
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
            width={400}
            height={600}
          />
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mb-4 text-lg text-gray-400">
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className="mb-4 text-gray-600">
            <strong>Genres:</strong>{" "}
            {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="mb-4 text-yellow-500">
            <strong>Average Rating:</strong> {movie.vote_average} ⭐
          </p>

          <div className="casts my-6">
            <h2
              className="text-xl font-bold mb-3
            "
            >
              Top Cast
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {cast
                .filter((member) => member.profile_path) // Skip cast without a profile picture
                .map((member) => (
                  <div
                    key={member.id}
                    className="w-24 text-center flex-shrink-0"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                      alt={member.name}
                      className="rounded-md"
                      width={96}
                      height={144}
                    />
                    <p className="text-sm mt-2 truncate">{member.name}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`px-6 py-3 rounded text-white ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
      {/* Similar Movies */}
      <h2 className="text-xl font-bold mt-6">Related Movies</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
        {relatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
