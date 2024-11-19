"use client";

import { Movie } from "@/app/utils/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    // Check if the movie is already in favorites
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.some((fav: Movie) => fav.id === movie.id));
    }
  }, [movie.id]);

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: Movie[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      favorites.push(movie);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 cursor-pointer">
      <Link href={`/movie/${movie.id}`}>
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="rounded-md w-full"
            width={300}
            height={300}
          />
          <h2 className="text-lg font-semibold mt-2 text-gray-300">
            {movie.title}
          </h2>
          <div className="flex mt-3 gap-3 justify-between">
            <p className="text-sm text-gray-400">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="text-sm text-yellow-500">
              <strong>Average Rating: </strong>
              {movie.vote_average} ⭐
            </p>
          </div>
        </div>
      </Link>
      <button
        onClick={toggleFavorite}
        className={`mt-2 px-4 py-2 rounded text-white ${
          isFavorite ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
