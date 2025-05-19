// import React from 'react';
// import Home from './pages/Home/Home';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./Components/Header/Header"; // Adjust path as needed
// import TVShows from "./pages/TVShows";
// import Home from './pages/Home/Home';
// import Movies from "./pages/Movies";
// import Latest from "./pages/Latest";
// import MyList from "./pages/MyList";
// import BrowseByLanguages from "./pages/BrowseByLanguages";
// import "./App.css"; // Optional: global styles

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/tv-shows" element={<TVShows />} />
//           <Route path="/movies" element={<Movies />} />
//           <Route path="/latest" element={<Latest />} />
//           <Route path="/my-list" element={<MyList />} />
//           <Route path="/browse-by-languages" element={<BrowseByLanguages />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/sharedPages/Header/Header"; // Adjust path as needed
import Home from "./pages/Home/Home";
import TVShows from "./pages/TvShows/TVShows";
import Movies from "./pages/Movies/Movies";
import Latest from "./pages/Latest/Latest";
import MyList from "./pages/MyList/MyList";
import BrowseByLanguages from "./pages/BrowseByLanguages/BrowseByLanguages";
import "./App.css"; // Create this file for global styles
import SharedLayout from "./Components/sharedPages/SharedLayout";

function App() {
  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/latest" element={<Latest />} />
              <Route path="/my-list" element={<MyList />} />
              <Route
                path="/browse-by-languages"
                element={<BrowseByLanguages />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
