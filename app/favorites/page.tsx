"use client"
import { useState, useEffect } from 'react';
import { Movie } from '../utils/types/types';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (id: number): void => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Favorite Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {favorites.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
            <h2>{movie.title}</h2>
            <button
              className="text-red-500 mt-2"
              onClick={() => removeFavorite(movie.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
