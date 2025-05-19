import React, { useEffect, useState, useRef } from "react";
import movieTrailer from "movie-trailer";
import axios from "../../../utils/axios";
import "./row.css";
import TrailerModal from "../../../Components/modelComponent/TrailerModal";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
        setShowModal(true);
      })
      .catch((error) => console.error("Trailer not found:", error));
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTrailerUrl("");
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        <button
          className="row__arrow row__arrow--left"
          onClick={() => scroll("left")}
        >
          ‹
        </button>

        <div className="row__posters" ref={rowRef}>
          {movies.map((movie, index) => (
            <div className="row__movieCard" key={index}>
              <img
                onClick={() => handleClick(movie)}
                className={`row__poster ${
                  isLargeRow ? "row__posterLarge" : ""
                }`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name || movie.title}
              />
              <p className="row__movieTitle">{movie.name || movie.title}</p>
            </div>
          ))}
        </div>

        <button
          className="row__arrow row__arrow--right"
          onClick={() => scroll("right")}
        >
          ›
        </button>
      </div>

      {showModal && trailerUrl && (
        <TrailerModal trailerUrl={trailerUrl} onClose={closeModal} />
      )}
    </div>
  );
};

export default Row;










