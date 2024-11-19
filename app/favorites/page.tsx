"use client";

import { useState, useEffect } from 'react';
import { Movie } from '../utils/types/types';
import Image from 'next/image';
import Link from 'next/link';

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
            {favorites.length === 0 ? (
                <p className="mt-4 text-gray-400">No favorite movies yet!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {favorites.map((movie) => (
                        <Link href={`/movie/${movie.id}`} key={movie.id}>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-md w-full"
                                    width={300}
                                    height={450}
                                />
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
                                    <button
                                        className="text-red-500 mt-2"
                                        onClick={() => removeFavorite(movie.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
