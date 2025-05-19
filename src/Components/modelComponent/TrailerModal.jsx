// TrailerModal.jsx
import React from "react";
import YouTube from "react-youtube";
import "./TrailerModal.css";

const TrailerModal = ({ trailerUrl, onClose }) => {
  const youtubeOpts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <YouTube videoId={trailerUrl} opts={youtubeOpts} />
      </div>
    </div>
  );
};

export default TrailerModal;




//method 2
// import React from "react";

// const TrailerModal = ({ trailerUrl, onClose }) => {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <iframe
//           width="100%"
//           height="500"
//           src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
//           title="YouTube video player"
//           frameBorder="0"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//         ></iframe>
//         <button onClick={onClose} className="modal-close">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TrailerModal;

