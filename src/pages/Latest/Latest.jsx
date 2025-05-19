// // // import React from "react";
// // // import "./Latest.css";

// // // const latestReleases = [
// // //   {
// // //     title: "Future Tense",
// // //     image:
// // //       "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
// // //     released: "May 2025",
// // //   },
// // //   {
// // //     title: "Urban Pulse",
// // //     image:
// // //       "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
// // //     released: "April 2025",
// // //   },
// // //   {
// // //     title: "Neon Skies",
// // //     image:
// // //       "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800",
// // //     released: "March 2025",
// // //   },
// // //   {
// // //     title: "Digital Drift",
// // //     image:
// // //       "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
// // //     released: "March 2025",
// // //   },
// // //   {
// // //     title: "Midnight Echo",
// // //     image:
// // //       "https://images.pexels.com/photos/2341837/pexels-photo-2341837.jpeg?auto=compress&cs=tinysrgb&w=800",
// // //     released: "February 2025",
// // //   },
// // // ];

// // // function Latest() {
// // //   return (
// // //     <div className="latest-container">
// // //       <h2 className="latest-title">Latest Releases</h2>
// // //       <div className="latest-grid">
// // //         {latestReleases.map((item, index) => (
// // //           <div className="latest-card" key={index}>
// // //             <div className="image-wrapper">
// // //               <img
// // //                 src={item.image}
// // //                 alt={item.title}
// // //                 className="latest-image"
// // //                 loading="lazy"
// // //               />
// // //               <span className="release-badge">{item.released}</span>
// // //             </div>
// // //             <h3>{item.title}</h3>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Latest;
// // import React, { useState } from "react";
// // import "./Latest.css";

// // const latestReleases = [
// //   {
// //     title: "Future Tense",
// //     image:
// //       "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
// //     released: "May 2025",
// //     genre: "Sci-Fi",
// //     description:
// //       "A thrilling journey through a dystopian future where time is currency.",
// //   },
// //   {
// //     title: "Urban Pulse",
// //     image:
// //       "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
// //     released: "April 2025",
// //     genre: "Drama",
// //     description: "A vibrant tale of city life, music, and ambition.",
// //   },
// //   {
// //     title: "Neon Skies",
// //     image:
// //       "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800",
// //     released: "March 2025",
// //     genre: "Cyberpunk",
// //     description: "Explore a neon-lit world of hackers and corporate espionage.",
// //   },
// //   {
// //     title: "Digital Drift",
// //     image:
// //       "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
// //     released: "March 2025",
// //     genre: "Tech Noir",
// //     description: "A meditative exploration of identity in a digital age.",
// //   },
// //   {
// //     title: "Midnight Echo",
// //     image:
// //       "https://images.pexels.com/photos/2341837/pexels-photo-2341837.jpeg?auto=compress&cs=tinysrgb&w=800",
// //     released: "February 2025",
// //     genre: "Mystery",
// //     description: "A haunting story of secrets uncovered under moonlight.",
// //   },
// // ];

// // function Latest() {
// //   const [selectedRelease, setSelectedRelease] = useState(null);

// //   const openModal = (release) => {
// //     setSelectedRelease(release);
// //   };

// //   const closeModal = () => {
// //     setSelectedRelease(null);
// //   };

// //   return (
// //     <div className="latest-container">
// //       <h2 className="latest-title">Latest Releases</h2>
// //       <div className="latest-grid">
// //         {latestReleases.map((item, index) => (
// //           <div
// //             className="latest-card"
// //             key={index}
// //             onClick={() => openModal(item)}
// //             role="button"
// //             tabIndex={0}
// //             onKeyDown={(e) => e.key === "Enter" && openModal(item)}
// //             aria-label={`View details for ${item.title}`}
// //           >
// //             <div className="image-wrapper">
// //               <img
// //                 src={item.image}
// //                 alt={item.title}
// //                 className="latest-image"
// //                 loading="lazy"
// //               />
// //               <span className="release-badge">{item.released}</span>
// //             </div>
// //             <h3>{item.title}</h3>
// //             <p className="genre">{item.genre}</p>
// //             <button className="learn-more">Learn More</button>
// //           </div>
// //         ))}
// //       </div>

// //       {selectedRelease && (
// //         <div className="modal-overlay" onClick={closeModal}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <button className="modal-close" onClick={closeModal}>
// //               &times;
// //             </button>
// //             <img
// //               src={selectedRelease.image}
// //               alt={selectedRelease.title}
// //               className="modal-image"
// //             />
// //             <h2>{selectedRelease.title}</h2>
// //             <p>
// //               <strong>Genre:</strong> {selectedRelease.genre}
// //             </p>
// //             <p>
// //               <strong>Released:</strong> {selectedRelease.released}
// //             </p>
// //             <p>{selectedRelease.description}</p>
// //             <button className="modal-button">Watch Trailer</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Latest;

// import React, { useState, useEffect } from "react";
// import "./Latest.css";

// // Fallback data in case the API fails
// const fallbackReleases = [
//   {
//     title: "Future Tense",
//     image:
//       "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
//     released: "May 2025",
//     genre: "Sci-Fi",
//     description:
//       "A thrilling journey through a dystopian future where time is currency.",
//   },
//   {
//     title: "Urban Pulse",
//     image:
//       "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
//     released: "April 2025",
//     genre: "Drama",
//     description: "A vibrant tale of city life, music, and ambition.",
//   },
//   {
//     title: "Neon Skies",
//     image:
//       "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800",
//     released: "March 2025",
//     genre: "Cyberpunk",
//     description: "Explore a neon-lit world of hackers and corporate espionage.",
//   },
//   {
//     title: "Digital Drift",
//     image:
//       "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
//     released: "March 2025",
//     genre: "Tech Noir",
//     description: "A meditative exploration of identity in a digital age.",
//   },
//   {
//     title: "Midnight Echo",
//     image:
//       "https://images.pexels.com/photos/2341837/pexels-photo-2341837.jpeg?auto=compress&cs=tinysrgb&w=800",
//     released: "February 2025",
//     genre: "Mystery",
//     description: "A haunting story of secrets uncovered under moonlight.",
//   },
// ];

// function Latest() {
//   const [releases, setReleases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRelease, setSelectedRelease] = useState(null);

//   useEffect(() => {
//     const fetchReleases = async () => {
//       try {
//         // Mock API call (replace with your real API endpoint)
//         // For demo, using a mock response since api.example.com is a placeholder
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/posts?_limit=5"
//         );
//         const data = await response.json();

//         // Transform mock data to match our structure
//         const transformedData = data.map((item, index) => ({
//           title: item.title.slice(0, 20), // Shorten title for demo
//           image: fallbackReleases[index % fallbackReleases.length].image, // Reuse images
//           released: fallbackReleases[index % fallbackReleases.length].released,
//           genre: fallbackReleases[index % fallbackReleases.length].genre,
//           description: item.body.slice(0, 100) + "...", // Use post body as description
//         }));

//         setReleases(transformedData);
//       } catch (err) {
//         console.error("Failed to fetch releases:", err);
//         setError("Failed to load releases. Showing fallback data.");
//         setReleases(fallbackReleases); // Use fallback data on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReleases();
//   }, []);

//   const openModal = (release) => {
//     setSelectedRelease(release);
//   };

//   const closeModal = () => {
//     setSelectedRelease(null);
//   };

//   if (loading) {
//     return (
//       <div className="latest-container">
//         <h2 className="latest-title">Latest Releases</h2>
//         <div className="loading">Loading releases...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="latest-container">
//         <h2 className="latest-title">Latest Releases</h2>
//         <div className="error">{error}</div>
//         <div className="latest-grid">
//           {releases.map((item, index) => (
//             <div
//               className="latest-card"
//               key={index}
//               onClick={() => openModal(item)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => e.key === "Enter" && openModal(item)}
//               aria-label={`View details for ${item.title}`}
//             >
//               <div className="image-wrapper">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="latest-image"
//                   loading="lazy"
//                 />
//                 <span className="release-badge">{item.released}</span>
//               </div>
//               <h3>{item.title}</h3>
//               <p className="genre">{item.genre}</p>
//               <button className="learn-more">Learn More</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="latest-container">
//       <h2 className="latest-title">Latest Releases</h2>
//       <div className="latest-grid">
//         {releases.map((item, index) => (
//           <div
//             className="latest-card"
//             key={index}
//             onClick={() => openModal(item)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => e.key === "Enter" && openModal(item)}
//             aria-label={`View details for ${item.title}`}
//           >
//             <div className="image-wrapper">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="latest-image"
//                 loading="lazy"
//               />
//               <span className="release-badge">{item.released}</span>
//             </div>
//             <h3>{item.title}</h3>
//             <p className="genre">{item.genre}</p>
//             <button className="learn-more">Learn More</button>
//           </div>
//         ))}
//       </div>

//       {selectedRelease && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={closeModal}>
//               ×
//             </button>
//             <img
//               src={selectedRelease.image}
//               alt={selectedRelease.title}
//               className="modal-image"
//             />
//             <h2>{selectedRelease.title}</h2>
//             <p>
//               <strong>Genre:</strong> {selectedRelease.genre}
//             </p>
//             <p>
//               <strong>Released:</strong> {selectedRelease.released}
//             </p>
//             <p>{selectedRelease.description}</p>
//             <button className="modal-button">Watch Trailer</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Latest;

import { useState, useEffect } from "react";
import "./Latest.css";

const fallbackReleases = [
  {
    title: "Future Tense",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
    released: "May 2025",
    genre: "Sci-Fi",
    description:
      "A thrilling journey through a dystopian future where time is currency.",
    movie_id: null,
  },
  {
    title: "Urban Pulse",
    image:
      "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    released: "April 2025",
    genre: "Drama",
    description: "A vibrant tale of city life, music, and ambition.",
    movie_id: null,
  },
  {
    title: "Neon Skies",
    image:
      "https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg?auto=compress&cs=tinysrgb&w=800",
    released: "March 2025",
    genre: "Cyberpunk",
    description: "Explore a neon-lit world of hackers and corporate espionage.",
    movie_id: null,
  },
  {
    title: "Digital Drift",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    released: "March 2025",
    genre: "Tech Noir",
    description: "A meditative exploration of identity in a digital age.",
    movie_id: null,
  },
  {
    title: "Midnight Echo",
    image:
      "https://images.pexels.com/photos/2341837/pexels-photo-2341837.jpeg?auto=compress&cs=tinysrgb&w=800",
    released: "February 2025",
    genre: "Mystery",
    description: "A haunting story of secrets uncovered under moonlight.",
    movie_id: null,
  },
];

function Latest() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
      );
      setError("API key missing. Showing fallback data.");
      setReleases(fallbackReleases);
      setLoading(false);
      return;
    }

    const fetchReleases = async () => {
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
            : fallbackReleases[0].image,
          released: item.release_date
            ? new Date(item.release_date).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Unknown",
          genre: item.genre_ids
            .slice(0, 2)
            .map((id) => genreMap[id] || "Unknown")
            .join(", "),
          description: item.overview || "No description available.",
          movie_id: item.id,
        }));

        setReleases(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch releases:", err);
        setError("Failed to load releases. Showing fallback data.");
        setReleases(fallbackReleases);
        setLoading(false);
      }
    };

    fetchReleases();
  }, [API_KEY]);

  useEffect(() => {
    if (!selectedRelease || !selectedRelease.movie_id || !API_KEY) {
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedRelease.movie_id}/videos?api_key=${API_KEY}`
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
  }, [selectedRelease, API_KEY]);

  const openModal = (release) => {
    setSelectedRelease(release);
  };

  const closeModal = () => {
    setSelectedRelease(null);
    setTrailerUrl(null);
  };

  if (loading) {
    return (
      <div className="latest-container">
        <h2 className="latest-title">Now Playing</h2>
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="latest-container">
        <h2 className="latest-title">Now Playing</h2>
        <div className="error">{error}</div>
        <div className="latest-grid">
          {releases.map((item, index) => (
            <div
              className="latest-card"
              key={index}
              style={{ "--index": index }}
            >
              <div className="image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="latest-image"
                  loading="lazy"
                />
                <div className="image-overlay" />
                <span className="release-badge">{item.released}</span>
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
    <div className="latest-container">
      <h2 className="latest-title">Latest Releases</h2>
      <div className="latest-grid">
        {releases.map((item, index) => (
          <div className="latest-card" key={index} style={{ "--index": index }}>
            <div className="image-wrapper">
              <img
                src={item.image}
                alt={item.title}
                className="latest-image"
                loading="lazy"
              />
              <div className="image-overlay" />
              <span className="release-badge">{item.released}</span>
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

      {selectedRelease && (
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
              src={selectedRelease.image}
              alt={selectedRelease.title}
              className="modal-image"
            />
            <h2>{selectedRelease.title}</h2>
            <p>
              <strong>Genre:</strong> {selectedRelease.genre}
            </p>
            <p>
              <strong>Released:</strong> {selectedRelease.released}
            </p>
            <p className="modal-description">{selectedRelease.description}</p>
            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-button"
                aria-label={`Watch trailer for ${selectedRelease.title}`}
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

export default Latest;