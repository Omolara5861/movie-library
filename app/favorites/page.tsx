"use client";

import { useState, useEffect } from 'react';
import { Movie } from '../utils/types/types';
import Image from 'next/image';

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
            {favorites.length === 0 ? (
                <p className="mt-4 text-gray-400">No favorite movies yet!</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {favorites.map((movie) => (
                        <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-md"
                                width={300}
                                height={450}
                            />
                            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                            <button
                                className="text-red-500 mt-2"
                                onClick={() => removeFavorite(movie.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
