import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { API_BASE_URL, API_OPTIONS } from "../../utils.js";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);

      if (!response.ok) throw new Error("Failed to load movie");

      const data = await response.json();

      setMovie(data);
    } catch (error) {
      console.error(error);
      navigate("/error", { state: { error: error } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-primary flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <main className="min-h-screen bg-primary text-white relative">
      <div className="pattern opacity-50" />

      <div className="wrapper relative z-10">
        <Link
          to="/"
          className="text-light-200 hover:text-white mb-8 inline-block"
        >
          &larr; Back to Home
        </Link>

        {movie && (
          <div className="flex flex-col md:flex-row gap-10 mt-5">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/no-movie.png"
              }
              alt={movie.title}
              className="w-full md:w-87.5 rounded-xl shadow-lg"
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-left m-0">{movie.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-300">
                <span>{movie.original_language.toUpperCase()}</span>
                <span>•</span>
                <span>{movie.release_date?.split("-")[0]}</span>
                <span>•</span>
                <span>{movie.runtime} min</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  ⭐ {movie.vote_average?.toFixed(1)} ({movie.vote_count} votes)
                </span>
              </div>

              <div className="flex gap-2 flex-wrap my-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-dark-100 px-3 py-1 rounded-full text-sm border border-gray-700"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MovieDetails;
