import { Movie } from '@/app/utils/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
    <Link href={`/movie/${movie.id}`}>
        <div className="bg-gray-800 rounded-lg p-4 cursor-pointer">

            <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md" width={800}
                height={800}/>
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-sm text-gray-400"> <strong>Release Date:</strong> {movie.release_date}</p>
            <p className="text-sm text-yellow-500"> <strong>Average Rating: </strong>{movie.vote_average} ⭐</p>
        </div>
    </Link>
);

export default MovieCard;
