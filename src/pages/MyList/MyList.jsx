import { useState, useEffect } from "react";
import "./MyList.css";

const fallbackMyList = [
  {
    title: "Lost in the City",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    status: "In Progress",
    genre: "Drama, Romance",
    description: "A journey of self-discovery in a bustling metropolis.",
    media_id: null,
    media_type: "movie",
  },
  {
    title: "Nightfall",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    status: "Watched",
    genre: "Thriller, Mystery",
    description: "A chilling tale of secrets unveiled in darkness.",
    media_id: null,
    media_type: "movie",
  },
  {
    title: "Ocean Blue",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    status: "Planned",
    genre: "Adventure, Drama",
    description: "An exploration of life’s depths on the open sea.",
    media_id: null,
    media_type: "movie",
  },
  {
    title: "Silent Horizon",
    image:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
    status: "Watched",
    genre: "Sci-Fi, Drama",
    description: "A meditative look at humanity’s future among the stars.",
    media_id: null,
    media_type: "movie",
  },
  {
    title: "Golden Hour",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    status: "In Progress",
    genre: "Romance, Comedy",
    description: "Love blossoms in the glow of life’s perfect moments.",
    media_id: null,
    media_type: "movie",
  },
];

function MyList() {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
      );
      setError("API key missing. Showing fallback data.");
      setMyList(fallbackMyList);
      setLoading(false);
      return;
    }

    const fetchMyList = async () => {
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
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();

        const transformedData = data.results.slice(0, 5).map((item) => ({
          title: item.title,
          image: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : fallbackMyList[0].image,
          status:
            fallbackMyList[Math.floor(Math.random() * fallbackMyList.length)]
              .status,
          genre: item.genre_ids
            .slice(0, 2)
            .map((id) => genreMap[id] || "Unknown")
            .join(", "),
          description: item.overview || "No description available.",
          media_id: item.id,
          media_type: "movie",
        }));

        setMyList(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch list:", err);
        setError("Failed to load list. Showing fallback data.");
        setMyList(fallbackMyList);
        setLoading(false);
      }
    };

    fetchMyList();
  }, [API_KEY]);

  useEffect(() => {
    if (!selectedItem || !selectedItem.media_id || !API_KEY) {
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${selectedItem.media_type}/${selectedItem.media_id}/videos?api_key=${API_KEY}`
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
  }, [selectedItem, API_KEY]);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setTrailerUrl(null);
  };

  if (loading) {
    return (
      <div className="mylist-container">
        <h2 className="mylist-title">My List</h2>
        <div className="loading">Loading list...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mylist-container">
        <h2 className="mylist-title">My List</h2>
        <div className="error">{error}</div>
        <div className="mylist-grid">
          {myList.map((item, idx) => (
            <div className="mylist-card" key={idx} style={{ "--index": idx }}>
              <div className="image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mylist-image"
                  loading="lazy"
                />
                <div className="image-overlay" />
                <span
                  className={`status-badge status-${item.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p className="genre">{item.genre}</p>
                <button
                  className="view-details"
                  onClick={() => openModal(item)}
                  aria-label={`View details for ${item.title}`}
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
    <div className="mylist-container">
      <h2 className="mylist-title">My List</h2>
      <div className="mylist-grid">
        {myList.map((item, idx) => (
          <div className="mylist-card" key={idx} style={{ "--index": idx }}>
            <div className="image-wrapper">
              <img
                src={item.image}
                alt={item.title}
                className="mylist-image"
                loading="lazy"
              />
              <div className="image-overlay" />
              <span
                className={`status-badge status-${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="genre">{item.genre}</p>
              <button
                className="view-details"
                onClick={() => openModal(item)}
                aria-label={`View details for ${item.title}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
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
              src={selectedItem.image}
              alt={selectedItem.title}
              className="modal-image"
            />
            <h2>{selectedItem.title}</h2>
            <p>
              <strong>Genre:</strong> {selectedItem.genre}
            </p>
            <p>
              <strong>Status:</strong> {selectedItem.status}
            </p>
            <p className="modal-description">{selectedItem.description}</p>
            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-button"
                aria-label={`Watch trailer for ${selectedItem.title}`}
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

export default MyList;
