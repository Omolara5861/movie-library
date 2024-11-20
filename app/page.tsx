"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from "./components/loader/Loader";
import MovieCard from "./components/movieCard/MovieCard";
import SearchBar from "./components/searchBar/SearchBar";
import { fetchPopularMovies, fetchTrendingMovies } from "./utils/api";
import { Movie } from "./utils/types/types";
import SkeletonLoader from "./components/loader/SkeletonLoader";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

  // Fetch movies for the selected sort option
  const fetchMovies = async (page: number, sortBy: string) => {
    try {
      let response;
      if (sortBy === "trending.day") {
        // Fetch trending movies (daily)
        response = await fetchTrendingMovies("day");
      } else if (sortBy === "trending.week") {
        // Fetch trending movies (weekly)
        response = await fetchTrendingMovies("week");
      } else {
        // Fetch regular movies based on other sort options
        response = await fetchPopularMovies(page, sortBy);
      }

      const fetchedMovies = response.data.results;

      // Update movie state
      setMovies((prevMovies) =>
        sortBy.includes("trending")
          ? fetchedMovies
          : [...prevMovies, ...fetchedMovies]
      );

      // Check if there are more movies to load
      if (sortBy.includes("trending") || page >= response.data.total_pages) {
        setHasMore(false); // Trending movies don't have pagination
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    }
  };

  // Load movies when page or sortBy changes
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
      <div className="flex justify-between items-center mb-4 gap-3">
        <SearchBar value={query} onChange={setQuery} />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded px-4 py-2 !text-[#28231d]"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="trending.day">Trending Today</option>
          <option value="trending.week">Trending This Week</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="revenue.desc">Highest Revenue</option>
          <option value="release_date.desc">Future Releases</option>
          <option value="release_date.asc">Oldest Releases</option>
        </select>
      </div>

      {/* Infinite Scrolling */}
      <InfiniteScroll
        dataLength={filteredMovies.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<SkeletonLoader />}
        endMessage={
          <p className="text-center mt-4">
            No more movies to load at this time, pls comeback later!
          </p>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
          {filteredMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
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
