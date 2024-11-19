"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./components/loader/Loader";
import MovieCard from "./components/movieCard/MovieCard";
import SearchBar from "./components/searchBar/SearchBar";
import { fetchPopularMovies } from "./utils/api";
import { Movie } from "./utils/types/types";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  // Fetch movies for a specific page
  const fetchMovies = async (page: number, sortBy: string) => {
    try {
      const response = await fetchPopularMovies(page, sortBy);
      const fetchedMovies = response.data.results;

      // Update movie state
      setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);

      // Check if there are more movies to load
      if (page >= response.data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  // Load initial movies and subsequent pages
  useEffect(() => {
    fetchMovies(page, sortBy);
  }, [page, sortBy]);

  // Filter movies based on search query and ensure movies have a poster
  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .filter((movie) => movie.poster_path); // Exclude movies without images

  // Handle sort option change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
    setMovies([]);
    setPage(1);
    setHasMore(true);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show "Go to Top" button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Search and Sort */}
      <div className="flex justify-between items-center mb-4">
        <SearchBar value={query} onChange={setQuery} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded px-4 py-2"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.asc">Oldest Releases</option>
          <option value="release_date.desc">Future Releases</option>
          <option value="revenue.desc">Highest Revenue</option>
        </select>
      </div>

      {/* Infinite Scrolling */}
      <InfiniteScroll
        dataLength={filteredMovies.length} // Length of currently loaded movies
        next={() => setPage((prevPage) => prevPage + 1)} // Load the next page
        hasMore={hasMore} // Check if more data is available
        loader={<Loader />} // Loader component
        endMessage={<p className="text-center mt-4">You have seen it all!</p>} // End message
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
          {filteredMovies.length === 0 && !hasMore
            ? // Skeleton Loader for Loading State
              Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height={300} />
              ))
            : filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      </InfiniteScroll>

      {/* "Go to Top" Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default HomePage;
