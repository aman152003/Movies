import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import { AppContext } from "../context";
import TMDBLogo from "../../assets/images/TMDB.svg";

function Navbar() {
  const { state, dispatch, isNavToggled, setIsNavToggled } =
    useContext(AppContext);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };

  const toggleNavbar = () => {
    setIsNavToggled(!isNavToggled);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">
            <h1>MoviesDB</h1>
          </div>
          <ul
            style={state ? { display: "flex" } : { display: "none" }}
            className="navbar-links"
          >
            <li>
              <Link style={{ color: "var(--White)" }} to="/movies">
                Movies
              </Link>
            </li>
            <li>
              <Link style={{ color: "var(--White)" }} to="/shows">
                TV Shows
              </Link>
            </li>
            <li>
              <Link style={{ color: "var(--White)" }} to="/watchlist">
                Watchlist
              </Link>
            </li>
            <li>
              <Link style={{ color: "var(--White)" }} to="/favourites">
                Favourites
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <li
            style={state ? { display: "flex" } : { display: "none" }}
            onClick={logout}
          >
            Logout
          </li>
          <img src={TMDBLogo} alt="tmdb" />
        </div>
        <div onClick={toggleNavbar} className="navbar-toggle">
          {isNavToggled ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
