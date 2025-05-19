// import React, { useState } from "react";
// import "./Header.css";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import NetflixLogo from "../../assets/images/Netflix_2015_logo.svg";

// function Header() {
//   const [showMenu, setShowMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <div className="header-outer-container">
//       <div className="header-container">
//         <div className="header-left">
//           <img src={NetflixLogo} alt="Netflix Logo" className="logo" />

//           <div className="nav-links desktop-nav">
//             <ul>
//               <li>Home</li>
//               <li>TV Shows</li>
//               <li>Movies</li>
//               <li>Latest</li>
//               <li>My List</li>
//               <li>Browse by Languages</li>
//             </ul>
//           </div>

//           <div className="mobile-menu-icon" onClick={toggleMenu}>
//             {showMenu ? <CloseIcon /> : <MenuIcon />}
//           </div>
//         </div>

//         <div className="header-right">
//           <ul>
//             <li>
//               <SearchIcon />
//             </li>
//             <li>
//               <NotificationsNoneIcon />
//             </li>
//             <li>
//               <AccountBoxIcon />
//             </li>
//             <li>
//               <ArrowDropDownIcon />
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Mobile dropdown menu */}
//       {showMenu && (
//         <div className="mobile-nav-dropdown">
//           <ul>
//             <li>Home</li>
//             <li>TV Shows</li>
//             <li>Movies</li>
//             <li>Latest</li>
//             <li>My List</li>
//             <li>Browse by Languages</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Header;



// method 2

// import React from "react";
// import "./Header.css";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import NetflixLogo from "../../assets//images/Netflix_2015_logo.svg";

// function Header() {
//   return (
//     <div className="header-outer-container">
//       <div className="header-container">
//         <div className="header-left">
//           <ul>
//             <li>
//               <img src={NetflixLogo} alt="Netflix Logo" />
//             </li>
//             <li>Home</li>
//             <li>TV Shows</li>
//             <li>Movies</li>
//             <li>Latest</li>
//             <li>My List</li>
//             <li>Browse by Languages</li>
//           </ul>
//         </div>
//         <div className="header-right">
//           <ul>
//             <li>
//               <SearchIcon />
//             </li>
//             <li>
//               <NotificationsNoneIcon />
//             </li>
//             <li>
//               <AccountBoxIcon />
//             </li>
//             <li>
//               <ArrowDropDownIcon />
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;



// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NetflixLogo from "../../../assets/images/Netflix_2015_logo.svg";
import { Link } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleLinkClick = () => setShowMenu(false);

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "TV Shows", path: "/tv-shows" },
    { label: "Movies", path: "/movies" },
    { label: "Latest", path: "/latest" },
    { label: "My List", path: "/my-list" },
    { label: "Browse by Languages", path: "/browse-by-languages" },
  ];

  // Debugging: Log render
  useEffect(() => {
    console.log("Header rendered, navItems:", navItems);
    return () => console.log("Header unmounted");
  }, []);

  return (
    <div className="header-outer-container">
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img
              src={NetflixLogo}
              alt="Netflix Logo"
              className="logo"
              data-testid="netflix-logo"
              style={{ cursor: "pointer" }} // optional: shows pointer on hover
            />
          </Link>
          <div className="nav-links desktop-nav">
            <ul data-testid="desktop-nav">
              {navItems.map((item) => (
                <li key={item.path} data-testid={`nav-${item.label}`}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
        <div className="header-right">
          <ul>
            <li>
              <SearchIcon />
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <AccountBoxIcon />
            </li>
            <li>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
      {showMenu && (
        <div className="mobile-nav-dropdown">
          <ul data-testid="mobile-nav">
            {navItems.map((item) => (
              <li key={item.path} data-testid={`mobile-nav-${item.label}`}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={handleLinkClick}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default React.memo(Header);