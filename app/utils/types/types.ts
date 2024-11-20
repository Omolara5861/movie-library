export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CastMember[];
}

export interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}