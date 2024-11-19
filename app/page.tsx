"use client";

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './components/loader/Loader';
import MovieCard from './components/movieCard/MovieCard';
import SearchBar from './components/searchBar/SearchBar';
import { fetchPopularMovies } from './utils/api';
import { Movie } from './utils/types/types';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  // Fetch movies for a specific page
  const fetchMovies = async (page: number) => {
    try {
      const response = await fetchPopularMovies(page);
      const fetchedMovies = response.data.results;

      // Update movie state
      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);

      // Check if there are more movies to load
      if (page >= response.data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    }
  };

  // Load initial movies on mount
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <SearchBar value={query} onChange={setQuery} />
      <InfiniteScroll
        dataLength={filteredMovies.length} // Length of currently loaded movies
        next={() => setPage((prevPage) => prevPage + 1)} // Load the next page
        hasMore={hasMore} // Check if more data is available
        loader={<Loader />} // Loader component
        endMessage={<p className="text-center mt-4">You have seen it all!</p>} // End message
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
