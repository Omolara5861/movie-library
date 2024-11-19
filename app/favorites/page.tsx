"use client";

import { useState, useEffect } from "react";
import { Movie } from "../utils/types/types";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/loader/Loader";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    setLoading(true); // Start loading
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoading(false); // Stop loading
  }, []);

  const removeFavorite = (id: number): void => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : favorites.length === 0 ? (
        <div className="h-[85vh] flex flex-col justify-center items-center">
          <h3 className="mt-4 text-gray-400 text-2xl mb-4">
            No movie has been added to your favorite list!
          </h3>
          <Link
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {favorites.map((movie) => (
            <div className="bg-gray-800 rounded-lg p-4" key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full"
                  width={300}
                  height={450}
                />
              </Link>
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mt-2 text-gray-300">
                  {movie.title}
                </h2>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
