import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import MyList from "../../pages/MyList/MyList";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [movie, setMovie] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <div
      className={`banner ${showDetail ? "movie-detail-mode" : ""}`}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-buttons">
          {!showDetail ? (
            <>
              <button
                className="banner-button"
                onClick={() => setShowDetail(true)}
              >
                Play
              </button>
              <button
                className="banner-button"
                onClick={() => navigate("/my-list")}
              >
                My List
              </button>
            </>
          ) : (
            <button
              className="banner-button"
              onClick={() => setShowDetail(false)}
            >
              Close
            </button>
          )}
        </div>
        <p className="banner-description">
          {movie?.overview?.length > 150
            ? movie.overview.slice(0, 150) + "..."
            : movie?.overview}
        </p>
      </div>
      {!showDetail && <div className="banner-fadeBottom" />}
    </div>
  );
}

export default Banner;




// function Banner() {
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     (async () => {
//       try {
//         const request = await axios.get(requests.fetchNetflixOriginals);
//         setMovie(
//           request.data.results[
//             Math.floor(Math.random() * request.data.results.length)
//           ]
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })();
//   }, []);

//   return (
//     <div
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="banner-contents">
//         <h1 className="banner-title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <div className="banner-buttons">
//           <button className="banner-button">Play</button>
//           {/* <button className="banner-button">My List</button> */}
//           <button
//             className="banner-button"
//             onClick={() => navigate("<MyList />")}
//           >
//             My List
//           </button>
//         </div>
//         <p className="banner-description">
//           {movie?.overview?.length > 150
//             ? movie.overview.slice(0, 150) + "..."
//             : movie?.overview}
//         </p>
//       </div>
//       <div className="banner-fadeBottom" />
//     </div>
//   );
// }

// export default Banner;

// function Banner() {
//   const [movie, setMovie] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const request = await axios.get(requests.fetchNetflixOriginals);
//         setMovie(
//           request.data.results[
//             Math.floor(Math.random() * request.data.results.length)
//           ]
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })();
//   }, []);

//   const handlePlay = () => {
//     // You can replace this with actual player logic
//     console.log("Play button clicked for:", movie?.title || movie?.name);
//     navigate("/play"); // assuming you have a /play route
//   };

//   const handleMyList = () => {
//     navigate("/my-list");
//   };

//   return (
//     <div
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="banner-contents">
//         <h1 className="banner-title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <div className="banner-buttons">
//           <button className="banner-button" onClick={handlePlay}>
//             Play
//           </button>
//           <button className="banner-button" onClick={handleMyList}>
//             My List
//           </button>
//         </div>
//         <p className="banner-description">
//           {movie?.overview?.length > 150
//             ? movie.overview.slice(0, 150) + "..."
//             : movie?.overview}
//         </p>
//       </div>
//       <div className="banner-fadeBottom" />
//     </div>
//   );
// }

// export default Banner;

// function Banner() {
//   const [movie, setMovie] = useState({});
//   const [showTrailer, setShowTrailer] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const request = await axios.get(requests.fetchNetflixOriginals);
//         setMovie(
//           request.data.results[
//             Math.floor(Math.random() * request.data.results.length)
//           ]
//         );
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })();
//   }, []);

//   const handlePlay = () => {
//     setShowTrailer(true);
//   };

//   const handleMyList = () => {
//     navigate("/my-list");
//   };

//   const closeTrailer = () => {
//     setShowTrailer(false);
//   };

//   return (
//     <div
//       className="banner"
//       style={{
//         backgroundSize: "cover",
//         backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="banner-contents">
//         <h1 className="banner-title">
//           {movie?.title || movie?.name || movie?.original_name}
//         </h1>
//         <div className="banner-buttons">
//           <button className="banner-button" onClick={handlePlay}>
//             Play
//           </button>
//           <button className="banner-button" onClick={handleMyList}>
//             My List
//           </button>
//         </div>
//         <p className="banner-description">
//           {movie?.overview?.length > 150
//             ? movie.overview.slice(0, 150) + "..."
//             : movie?.overview}
//         </p>
//       </div>
//       <div className="banner-fadeBottom" />

//       {/* Trailer Modal */}
//       {showTrailer && (
//         <div className="trailer-modal">
//           <div className="trailer-content">
//             <span className="close-button" onClick={closeTrailer}>
//               &times;
//             </span>
//             <iframe
//               width="100%"
//               height="400"
//               src="https://www.youtube.com/embed/XtMThy8QKqU?autoplay=1"
//               title="YouTube video player"
//               frameBorder="0"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Banner;
