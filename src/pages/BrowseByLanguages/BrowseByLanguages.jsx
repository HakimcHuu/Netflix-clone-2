// import { useState, useEffect } from "react";
// import "./BrowseByLanguages.css";

// const fallbackLanguages = [
//   {
//     name: "English",
//     image: "https://flagcdn.com/w320/gb.png",
//     titles: [
//       {
//         title: "The Shadow Protocol",
//         image:
//           "https://images.unsplash.com/photo-1536440136628-397737d69e43?auto=format&fit=crop&w=800&q=80",
//         genre: "Action, Thriller",
//         description: "A rogue agent uncovers a global conspiracy.",
//         media_id: null,
//         media_type: "movie",
//       },
//       {
//         title: "Echoes of Time",
//         image:
//           "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
//         genre: "Sci-Fi, Drama",
//         description: "A scientist grapples with time travel’s consequences.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
//   {
//     name: "Spanish",
//     image: "https://flagcdn.com/w320/es.png",
//     titles: [
//       {
//         title: "La Casa de las Sombras",
//         image:
//           "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
//         genre: "Horror, Mystery",
//         description: "A family moves into a haunted mansion.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
//   {
//     name: "French",
//     image: "https://flagcdn.com/w320/fr.png",
//     titles: [
//       {
//         title: "L’Amour Éternel",
//         image:
//           "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
//         genre: "Romance, Drama",
//         description: "A love story spanning decades.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
//   {
//     name: "German",
//     image: "https://flagcdn.com/w320/de.png",
//     titles: [
//       {
//         title: "Der Sturm",
//         image:
//           "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
//         genre: "Adventure, Drama",
//         description: "A sailor battles nature and fate.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
//   {
//     name: "Japanese",
//     image: "https://flagcdn.com/w320/jp.png",
//     titles: [
//       {
//         title: "星の旅人",
//         image:
//           "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
//         genre: "Fantasy, Adventure",
//         description: "A warrior seeks a mystical artifact.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
//   {
//     name: "Korean",
//     image: "https://flagcdn.com/w320/kr.png",
//     titles: [
//       {
//         title: "어둠의 심장",
//         image:
//           "https://images.unsplash.com/photo-1518709263857-4f6842f04228?auto=format&fit=crop&w=800&q=80",
//         genre: "Thriller, Crime",
//         description: "A detective hunts a serial killer.",
//         media_id: null,
//         media_type: "movie",
//       },
//     ],
//   },
// ];

// function BrowseByLanguages() {
//   const [languages, setLanguages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const [selectedTitle, setSelectedTitle] = useState(null);
//   const [trailerUrl, setTrailerUrl] = useState(null);

//   const API_KEY = import.meta.env.VITE_API_KEY;

//   // Map language names to TMDb language codes
//   const languageCodes = {
//     English: "en",
//     Spanish: "es",
//     French: "fr",
//     German: "de",
//     Japanese: "ja",
//     Korean: "ko",
//   };

//   useEffect(() => {
//     if (!API_KEY) {
//       console.error(
//         "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
//       );
//       setError("API key missing. Showing fallback data.");
//       setLanguages(fallbackLanguages);
//       setLoading(false);
//       return;
//     }

//     const fetchLanguages = async () => {
//       try {
//         const genreResponse = await fetch(
//           `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
//         );
//         if (!genreResponse.ok) throw new Error("Failed to fetch genres");
//         const genreData = await genreResponse.json();
//         const genreMap = genreData.genres.reduce((acc, genre) => {
//           acc[genre.id] = genre.name;
//           return acc;
//         }, {});

//         const languagePromises = fallbackLanguages.map(async (lang) => {
//           const langCode = languageCodes[lang.name] || "en";
//           const response = await fetch(
//             `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc&page=1`
//           );
//           if (!response.ok)
//             throw new Error(`Failed to fetch ${lang.name} movies`);
//           const data = await response.json();

//           const titles = data.results.slice(0, 3).map((item) => ({
//             title: item.title,
//             image: item.poster_path
//               ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
//               : lang.titles[0]?.image || "https://via.placeholder.com/500x750",
//             genre: item.genre_ids
//               .slice(0, 2)
//               .map((id) => genreMap[id] || "Unknown")
//               .join(", "),
//             description: item.overview || "No description available.",
//             media_id: item.id,
//             media_type: "movie",
//           }));

//           return { ...lang, titles };
//         });

//         const updatedLanguages = await Promise.all(languagePromises);
//         setLanguages(updatedLanguages);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch languages:", err);
//         setError("Failed to load languages. Showing fallback data.");
//         setLanguages(fallbackLanguages);
//         setLoading(false);
//       }
//     };

//     fetchLanguages();
//   }, [API_KEY]);

//   useEffect(() => {
//     if (!selectedTitle || !selectedTitle.media_id || !API_KEY) {
//       setTrailerUrl(null);
//       return;
//     }

//     const fetchTrailer = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/${selectedTitle.media_type}/${selectedTitle.media_id}/videos?api_key=${API_KEY}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch trailer");
//         const data = await response.json();
//         const trailer = data.results.find(
//           (video) => video.type === "Trailer" && video.site === "YouTube"
//         );
//         setTrailerUrl(
//           trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
//         );
//       } catch (err) {
//         console.error("Failed to fetch trailer:", err);
//         setTrailerUrl(null);
//       }
//     };

//     fetchTrailer();
//   }, [selectedTitle, API_KEY]);

//   const openLanguageModal = (lang) => {
//     setSelectedLanguage(lang);
//     setSelectedTitle(null);
//     setTrailerUrl(null);
//   };

//   const openTitleModal = (title) => {
//     setSelectedTitle(title);
//   };

//   const closeModal = () => {
//     setSelectedLanguage(null);
//     setSelectedTitle(null);
//     setTrailerUrl(null);
//   };

//   if (loading) {
//     return (
//       <div className="languages-container">
//         <h2 className="languages-title">Browse by Languages</h2>
//         <div className="loading">Loading languages...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="languages-container">
//         <h2 className="languages-title">Browse by Languages</h2>
//         <div className="error">{error}</div>
//         <div className="languages-grid">
//           {languages.map((lang, idx) => (
//             <div
//               className="language-card"
//               key={idx}
//               onClick={() => openLanguageModal(lang)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={(e) => e.key === "Enter" && openLanguageModal(lang)}
//               aria-label={`Browse ${lang.name} content`}
//             >
//               <img
//                 src={lang.image}
//                 alt={`${lang.name} flag`}
//                 className="language-flag"
//                 loading="lazy"
//               />
//               <h3>{lang.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="languages-container">
//       <h2 className="languages-title">Browse by Languages</h2>
//       <div className="languages-grid">
//         {languages.map((lang, idx) => (
//           <div
//             className="language-card"
//             key={idx}
//             onClick={() => openLanguageModal(lang)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => e.key === "Enter" && openLanguageModal(lang)}
//             aria-label={`Browse ${lang.name} content`}
//           >
//             <img
//               src={lang.image}
//               alt={`${lang.name} flag`}
//               className="language-flag"
//               loading="lazy"
//             />
//             <h3>{lang.name}</h3>
//           </div>
//         ))}
//       </div>

//       {selectedLanguage && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="modal-close"
//               onClick={closeModal}
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//             <h2>{selectedLanguage.name} Content</h2>
//             <div className="titles-grid">
//               {selectedLanguage.titles.length > 0 ? (
//                 selectedLanguage.titles.map((title, idx) => (
//                   <div
//                     className="title-card"
//                     key={idx}
//                     onClick={() => openTitleModal(title)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) =>
//                       e.key === "Enter" && openTitleModal(title)
//                     }
//                     aria-label={`View details for ${title.title}`}
//                   >
//                     <img
//                       src={title.image}
//                       alt={title.title}
//                       className="title-image"
//                       loading="lazy"
//                     />
//                     <h3>{title.title}</h3>
//                     <p className="genre">{title.genre}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="no-titles">
//                   No titles available for {selectedLanguage.name}.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {selectedTitle && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="modal-close"
//               onClick={closeModal}
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//             <img
//               src={selectedTitle.image}
//               alt={selectedTitle.title}
//               className="modal-image"
//             />
//             <h2>{selectedTitle.title}</h2>
//             <p>
//               <strong>Genre:</strong> {selectedTitle.genre}
//             </p>
//             <p className="modal-description">{selectedTitle.description}</p>
//             {trailerUrl ? (
//               <a
//                 href={trailerUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="modal-button"
//                 aria-label={`Watch trailer for ${selectedTitle.title}`}
//               >
//                 Watch Trailer
//               </a>
//             ) : (
//               <p className="no-trailer">No trailer available</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BrowseByLanguages;
import { useState, useEffect } from "react";
import "./BrowseByLanguages.css";

const fallbackLanguages = [
  {
    name: "English",
    image: "https://flagcdn.com/w320/gb.png",
    titles: [
      {
        title: "The Shadow Protocol",
        image:
          "https://images.unsplash.com/photo-1536440136628-397737d69e43?auto=format&fit=crop&w=800&q=80",
        genre: "Action, Thriller",
        description: "A rogue agent uncovers a global conspiracy.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "Spanish",
    image: "https://flagcdn.com/w320/es.png",
    titles: [
      {
        title: "La Casa de las Sombras",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        genre: "Horror, Mystery",
        description: "A family moves into a haunted mansion.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "French",
    image: "https://flagcdn.com/w320/fr.png",
    titles: [
      {
        title: "L’Amour Éternel",
        image:
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
        genre: "Romance, Drama",
        description: "A love story spanning decades.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "German",
    image: "https://flagcdn.com/w320/de.png",
    titles: [
      {
        title: "Der Sturm",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        genre: "Adventure, Drama",
        description: "A sailor battles nature and fate.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "Japanese",
    image: "https://flagcdn.com/w320/jp.png",
    titles: [
      {
        title: "星の旅人",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
        genre: "Fantasy, Adventure",
        description: "A warrior seeks a mystical artifact.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "Korean",
    image: "https://flagcdn.com/w320/kr.png",
    titles: [
      {
        title: "어둠의 심장",
        image:
          "https://images.unsplash.com/photo-1518709263857-4f6842f04228?auto=format&fit=crop&w=800&q=80",
        genre: "Thriller, Crime",
        description: "A detective hunts a serial killer.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
  {
    name: "Amharic",
    image: "https://flagcdn.com/w320/et.png",
    titles: [
      {
        title: "Affini",
        image: "https://via.placeholder.com/500x750?text=Affini",
        genre: "Drama",
        description:
          "A gripping drama set in the Sidama region, exploring tradition, vengeance, and cross-cultural relationships.",
        media_id: null,
        media_type: "movie",
      },
      {
        title: "Made in Ethiopia",
        image: "https://via.placeholder.com/500x750?text=Made+in+Ethiopia",
        genre: "Documentary",
        description:
          "A documentary on the impact of Chinese industrial investments in Ethiopia, following three women navigating economic changes.",
        media_id: null,
        media_type: "movie",
      },
      {
        title: "Tizita",
        image: "https://via.placeholder.com/500x750?text=Tizita",
        genre: "Romantic Thriller",
        description:
          "A tale of love and memory lost, blending romance and suspense.",
        media_id: null,
        media_type: "movie",
      },
    ],
  },
];

function BrowseByLanguages() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const languageCodes = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Japanese: "ja",
    Korean: "ko",
    Amharic: "am",
  };

  useEffect(() => {
    if (!API_KEY) {
      console.error(
        "TMDb API key is missing. Please set VITE_TMDB_API_KEY in .env."
      );
      setError("API key missing. Showing fallback data.");
      setLanguages(fallbackLanguages);
      setLoading(false);
      return;
    }

    const fetchLanguages = async () => {
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

        const languagePromises = fallbackLanguages.map(async (lang) => {
          const langCode = languageCodes[lang.name] || "en";
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc&page=1`
          );
          const movieData = movieResponse.ok
            ? await movieResponse.json()
            : { results: [] };

          const tvResponse = await fetch(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=popularity.desc&page=1`
          );
          const tvData = tvResponse.ok
            ? await tvResponse.json()
            : { results: [] };

          const titles = [
            ...movieData.results.slice(0, 2).map((item) => ({
              title: item.title,
              image: item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : lang.titles[0]?.image ||
                  "https://via.placeholder.com/500x750",
              genre: item.genre_ids
                .slice(0, 2)
                .map((id) => genreMap[id] || "Unknown")
                .join(", "),
              description: item.overview || "No description available.",
              media_id: item.id,
              media_type: "movie",
            })),
            ...tvData.results.slice(0, 1).map((item) => ({
              title: item.name,
              image: item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : lang.titles[0]?.image ||
                  "https://via.placeholder.com/500x750",
              genre: item.genre_ids
                .slice(0, 2)
                .map((id) => genreMap[id] || "Unknown")
                .join(", "),
              description: item.overview || "No description available.",
              media_id: item.id,
              media_type: "tv",
            })),
          ];

          return { ...lang, titles: titles.length > 0 ? titles : lang.titles };
        });

        const updatedLanguages = await Promise.all(languagePromises);
        setLanguages(updatedLanguages);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
        setError("Failed to load languages. Showing fallback data.");
        setLanguages(fallbackLanguages);
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [API_KEY]);

  useEffect(() => {
    if (!selectedTitle || !selectedTitle.media_id || !API_KEY) {
      setTrailerUrl(null);
      return;
    }

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${selectedTitle.media_type}/${selectedTitle.media_id}/videos?api_key=${API_KEY}`
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
  }, [selectedTitle, API_KEY]);

  const openLanguageModal = (lang) => {
    setSelectedLanguage(lang);
    setSelectedTitle(null);
    setTrailerUrl(null);
  };

  const openTitleModal = (title) => {
    setSelectedTitle(title);
  };

  const closeModal = () => {
    setSelectedLanguage(null);
    setSelectedTitle(null);
    setTrailerUrl(null);
  };

  if (loading) {
    return (
      <div className="languages-container">
        <h2 className="languages-title">Browse by Languages</h2>
        <div className="loading">Loading languages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="languages-container">
        <h2 className="languages-title">Browse by Languages</h2>
        <div className="error">{error}</div>
        <div className="languages-grid">
          {languages.map((lang, idx) => (
            <div
              className="language-card"
              key={idx}
              onClick={() => openLanguageModal(lang)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLanguageModal(lang)}
              aria-label={`Browse ${lang.name} content`}
            >
              <img
                src={lang.image}
                alt={`${lang.name} flag`}
                className="language-flag"
                loading="lazy"
              />
              <h3>{lang.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="languages-container">
      <h2 className="languages-title">Browse by Languages</h2>
      <div className="languages-grid">
        {languages.map((lang, idx) => (
          <div
            className="language-card"
            key={idx}
            onClick={() => openLanguageModal(lang)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLanguageModal(lang)}
            aria-label={`Browse ${lang.name} content`}
          >
            <img
              src={lang.image}
              alt={`${lang.name} flag`}
              className="language-flag"
              loading="lazy"
            />
            <h3>{lang.name}</h3>
          </div>
        ))}
      </div>

      {selectedLanguage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2>{selectedLanguage.name} Content</h2>
            <div className="titles-grid">
              {selectedLanguage.titles.length > 0 ? (
                selectedLanguage.titles.map((title, idx) => (
                  <div
                    className="title-card"
                    key={idx}
                    onClick={() => openTitleModal(title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === "Enter" && openTitleModal(title)
                    }
                    aria-label={`View details for ${title.title}`}
                  >
                    <img
                      src={title.image}
                      alt={title.title}
                      className="title-image"
                      loading="lazy"
                    />
                    <h3>{title.title}</h3>
                    <p className="genre">{title.genre}</p>
                  </div>
                ))
              ) : (
                <p className="no-titles">
                  No titles available for {selectedLanguage.name}.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTitle && (
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
              src={selectedTitle.image}
              alt={selectedTitle.title}
              className="modal-image"
            />
            <h2>{selectedTitle.title}</h2>
            <p>
              <strong>Genre:</strong> {selectedTitle.genre}
            </p>
            <p className="modal-description">{selectedTitle.description}</p>
            <div className="modal-buttons">
              {trailerUrl ? (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-button trailer"
                  aria-label={`Watch trailer for ${selectedTitle.title}`}
                >
                  Watch Trailer
                </a>
              ) : (
                <p className="no-trailer">No trailer available</p>
              )}
              <a
                href="https://youtube.com" // Placeholder; replace with actual streaming link
                target="_blank"
                rel="noopener noreferrer"
                className="modal-button watch-now"
                aria-label={`Watch ${selectedTitle.title} now`}
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowseByLanguages;