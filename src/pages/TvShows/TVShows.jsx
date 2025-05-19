import { useState, useEffect } from "react";
import "./TvShows.css";

const fallbackTvShows = [
  {
    title: "The Night City",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    seasons: "3 Seasons",
    genre: "Sci-Fi, Drama",
    description: "A gripping tale of intrigue in a futuristic metropolis.",
    show_id: null,
  },
  {
    title: "Wired Reality",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
    seasons: "2 Seasons",
    genre: "Reality, Tech",
    description: "Exploring the blurred lines between virtual and real worlds.",
    show_id: null,
  },
  {
    title: "Digital Shadows",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    seasons: "1 Season",
    genre: "Mystery, Thriller",
    description: "Uncovering secrets in a digital underworld.",
    show_id: null,
  },
  {
    title: "Code 2049",
    image:
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=800&q=80",
    seasons: "5 Seasons",
    genre: "Cyberpunk, Action",
    description: "A high-stakes battle in a coded future.",
    show_id: null,
  },
  {
    title: "Virtual Truth",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
    seasons: "4 Seasons",
    genre: "Drama, Tech",
    description: "A deep dive into the ethics of virtual reality.",
    show_id: null,
  },
];

function TvShows() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
      );
      setError("API key missing. Showing fallback data.");
      setTvShows(fallbackTvShows);
      setLoading(false);
      return;
    }

    const fetchTvShows = async () => {
      try {
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
        );
        if (!genreResponse.ok) throw new Error("Failed to fetch genres");
        const genreData = await genreResponse.json();
        const genreMap = genreData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        const response = await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch TV shows");
        const data = await response.json();

        const transformedData = data.results.map((item) => ({
          title: item.name,
          image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : fallbackTvShows[0].image,
          seasons: item.number_of_seasons
            ? `${item.number_of_seasons} Season${
                item.number_of_seasons > 1 ? "s" : ""
              }`
            : "Unknown",
          genre: item.genre_ids
            .slice(0, 2)
            .map((id) => genreMap[id] || "Unknown")
            .join(", "),
          description: item.overview || "No description available.",
          show_id: item.id,
        }));

        setTvShows(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch TV shows:", err);
        setError("Failed to load TV shows. Showing fallback data.");
        setTvShows(fallbackTvShows);
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [API_KEY]);

  useEffect(() => {
    if (!selectedShow || !selectedShow.show_id || !API_KEY) {
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${selectedShow.show_id}/videos?api_key=${API_KEY}`
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
  }, [selectedShow, API_KEY]);

  const openModal = (show) => {
    setSelectedShow(show);
  };

  const closeModal = () => {
    setSelectedShow(null);
    setTrailerUrl(null);
  };

  if (loading) {
    return (
      <div className="tvshows-container">
        <h2 className="tvshows-title">TV Shows</h2>
        <div className="loading">Loading TV shows...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tvshows-container">
        <h2 className="tvshows-title">TV Shows</h2>
        <div className="error">{error}</div>
        <div className="tvshows-grid">
          {tvShows.map((show, index) => (
            <div className="tv-card" key={index} style={{ "--index": index }}>
              <div className="image-wrapper">
                <img
                  src={show.image}
                  alt={show.title}
                  className="tv-image"
                  loading="lazy"
                />
                <div className="image-overlay" />
                <span className="season-badge">{show.seasons}</span>
              </div>
              <div className="card-content">
                <h3>{show.title}</h3>
                <p className="genre">{show.genre}</p>
                <button
                  className="view-details"
                  onClick={() => openModal(show)}
                  aria-label={`View details for ${show.title}`}
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
    <div className="tvshows-container">
      <h2 className="tvshows-title">TV Shows</h2>
      <div className="tvshows-grid">
        {tvShows.map((show, index) => (
          <div className="tv-card" key={index} style={{ "--index": index }}>
            <div className="image-wrapper">
              <img
                src={show.image}
                alt={show.title}
                className="tv-image"
                loading="lazy"
              />
              <div className="image-overlay" />
              <span className="season-badge">{show.seasons}</span>
            </div>
            <div className="card-content">
              <h3>{show.title}</h3>
              <p className="genre">{show.genre}</p>
              <button
                className="view-details"
                onClick={() => openModal(show)}
                aria-label={`View details for ${show.title}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedShow && (
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
              src={selectedShow.image}
              alt={selectedShow.title}
              className="modal-image"
            />
            <h2>{selectedShow.title}</h2>
            <p>
              <strong>Genre:</strong> {selectedShow.genre}
            </p>
            <p>
              <strong>Seasons:</strong> {selectedShow.seasons}
            </p>
            <p className="modal-description">{selectedShow.description}</p>
            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-button"
                aria-label={`Watch trailer for ${selectedShow.title}`}
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

export default TvShows;
