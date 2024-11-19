"use client"
import Loader from '@/app/components/loader/Loader';
import { fetchMovieDetails } from '@/app/utils/api';
import { MovieDetails } from '@/app/utils/types/types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';



const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (id) {
        setLoading(true);
        const response = await fetchMovieDetails(id as string);
        setMovie(response.data);
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [id]);

  if (loading) return <Loader />;

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg"
        width={800}
        height={800}
      />
          <h3 className="text-2xl font-bold mt-3">{movie.title}</h3>
      <p className="mt-4"><strong>Movie Overview:</strong> {movie.overview}</p>
      <p className="mt-2"><strong>Movie Genres:</strong> {movie.genres?.map((g) => g.name).join(', ')}</p>
    </div>
  );
};

export default MovieDetailsPage;
