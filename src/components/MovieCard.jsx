import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    genre_ids,
  },
  genresMap,
}) => {
  const movieGenres = genre_ids
    ? genre_ids
        .map((id) => genresMap[id])
        .filter((genre) => genre !== undefined)
        .slice(0, 2)
        .join(", ")
    : "N/A";

  return (
    <Link to={`/movie/${id}`}>
      <div className="movie-card group relative cursor-pointer overflow-hidden">
        <div className="relative">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "/no-movie.png"
            }
            alt={title}
            className="group-hover:opacity-50 transition-opacity duration-300"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg p-4 text-center">
            <div className="flex items-center gap-1 mb-2">
              <img src="/star.svg" alt="Star" className="size-4" />
              <p className="font-bold text-white">
                {vote_average ? vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
            <p className="text-white text-sm mb-1">
              Lang: {original_language.toUpperCase()}
            </p>
            <p className="text-gray-200 text-xs">{movieGenres}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
