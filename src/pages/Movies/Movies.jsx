import { useState, useEffect } from "react";
import "./Movies.css";

// Fallback data
const fallbackMovies = [
  {
    title: "The Silent Storm",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    genre: "Drama",
    released: "May 2025",
    description: "A poignant tale of love and loss in a coastal town.",
    movie_id: null,
  },
  {
    title: "Cosmic Chase",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    genre: "Sci-Fi",
    released: "April 2025",
    description: "A high-stakes pursuit across the galaxy.",
    movie_id: null,
  },
  {
    title: "Crimson Tide",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
    genre: "Action",
    released: "March 2025",
    description: "A tense submarine thriller with global stakes.",
    movie_id: null,
  },
  {
    title: "Echoes of Time",
    image:
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=800&q=80",
    genre: "Mystery",
    released: "February 2025",
    description: "A detective unravels secrets spanning decades.",
    movie_id: null,
  },
  {
    title: "Midnight Whisper",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
    genre: "Thriller",
    released: "January 2025",
    description: "A chilling story of suspense in the shadows.",
    movie_id: null,
  },
];

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
      );
      setError("API key missing. Showing fallback data.");
      setMovies(fallbackMovies);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        if (!genreResponse.ok) throw new Error("Failed to fetch genres");
        const genreData = await genreResponse.json();
        const genreMap = genreData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();

        const transformedData = data.results.map((item) => ({
          title: item.title,
          image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : fallbackMovies[0].image,
          genre: item.genre_ids
            .slice(0, 2)
            .map((id) => genreMap[id] || "Unknown")
            .join(", "),
          released: item.release_date
            ? new Date(item.release_date).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Unknown",
          description: item.overview || "No description available.",
          movie_id: item.id,
        }));

        setMovies(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Showing fallback data.");
        setMovies(fallbackMovies);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY]);

  useEffect(() => {
    if (!selectedMovie || !selectedMovie.movie_id || !API_KEY) {
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.movie_id}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch trailer");
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerUrl(
          trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
        );
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
        setTrailerUrl(null);
      }
    };

    fetchTrailer();
  }, [selectedMovie, API_KEY]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setTrailerUrl(null);
  };

  if (loading) {
    return (
      <div className="movies-container">
        <h2 className="movies-title">Top Movies</h2>
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-container">
        <h2 className="movies-title">Top Movies</h2>
        <div className="error">{error}</div>
        <div className="movies-grid">
          {movies.map((movie, idx) => (
            <div className="movie-card" key={idx} style={{ "--index": idx }}>
              <div className="image-wrapper">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="movie-image"
                  loading="lazy"
                />
                <div className="image-overlay" />
                <span className="release-badge">{movie.released}</span>
              </div>
              <div className="card-content">
                <h3>{movie.title}</h3>
                <p className="genre">{movie.genre}</p>
                <button
                  className="view-details"
                  onClick={() => openModal(movie)}
                  aria-label={`View details for ${movie.title}`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="movies-container">
      <h2 className="movies-title">Top Movies</h2>
      <div className="movies-grid">
        {movies.map((movie, idx) => (
          <div className="movie-card" key={idx} style={{ "--index": idx }}>
            <div className="image-wrapper">
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-image"
                loading="lazy"
              />
              <div className="image-overlay" />
              <span className="release-badge">{movie.released}</span>
            </div>
            <div className="card-content">
              <h3>{movie.title}</h3>
              <p className="genre">{movie.genre}</p>
              <button
                className="view-details"
                onClick={() => openModal(movie)}
                aria-label={`View details for ${movie.title}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              className="modal-image"
            />
            <h2>{selectedMovie.title}</h2>
            <p>
              <strong>Genre:</strong> {selectedMovie.genre}
            </p>
            <p>
              <strong>Released:</strong> {selectedMovie.released}
            </p>
            <p className="modal-description">{selectedMovie.description}</p>
            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-button"
                aria-label={`Watch trailer for ${selectedMovie.title}`}
              >
                Watch Trailer
              </a>
            ) : (
              <p className="no-trailer">No trailer available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
