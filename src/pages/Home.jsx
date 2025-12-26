import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../../appwrite.js";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_OPTIONS } from "../../utils.js";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [genresMap, setGenresMap] = useState({});

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/genre/movie/list?language=en`,
        API_OPTIONS
      );
      const data = await response.json();
      const map = {};
      data.genres.forEach((g) => (map[g.id] = g.name));
      setGenresMap(map);
    } catch (error) {
      console.error("Failed to fetch genres", error);
      navigate("/error", { state: { error: error } });
    }
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=${sort}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();

      if (data.results) {
        const sortedData = data.results.sort((a, b) => sortData(a, b));
        setMovieList(sortedData);

        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching movies", error);
      navigate("/error", { state: { error: error } });
    } finally {
      setIsLoading(false);
    }
  };

  const sortData = (a, b) => {
    switch (sort) {
      case "title.asc":
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        else return 1;
      case "primary_release_date.desc":
        if (b.release_date < a.release_date) return -1;
        else return 1;
      case "vote_average.desc":
        if (b.vote_average < a.vote_average) return -1;
        else return 1;
      default:
        break;
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error("Error fetching trending movies", error);
      navigate("/error", { state: { error: error } });
    }
  };

  useEffect(() => {
    fetchGenres();
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, sort]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>
          <div className="filters flex justify-end">
            <p className="text-white p-2">Sort By</p>
            <select
              onChange={(event) => setSort(event.target.value)}
              className="bg-dark-100 text-white p-2 rounded border border-gray-700"
            >
              <option value="">Default (Popularity)</option>
              <option value="title.asc">Name</option>
              <option value="vote_average.desc">Rating</option>
              <option value="primary_release_date.desc">Newest</option>
            </select>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genresMap={genresMap} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
