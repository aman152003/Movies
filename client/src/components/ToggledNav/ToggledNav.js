import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "./ToggledNav.scss";
import { AppContext } from "../context";

function ToggledNav() {
  const { isNavToggled, setIsNavToggled, dispatch, state } =
    useContext(AppContext);
  const hideToggledNav = () => setIsNavToggled(false);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    dispatch({ type: "CLEAR" });
    history.push("/login");
  };
  return (
    <div
      style={isNavToggled ? { display: "block" } : { display: "none" }}
      className="toggled-nav"
    >
      <ul>
        <div style={state ? { display: "block" } : { display: "none" }}>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/movies"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/shows"
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/watchlist"
            >
              Watchlist
            </Link>
          </li>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/favourites"
            >
              Favourites
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                logout();
                hideToggledNav();
              }}
              style={{ color: "var(--White)" }}
              to="#"
            >
              Logout
            </Link>
          </li>
        </div>
        <div style={state ? { display: "none" } : { display: "block" }}>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              onClick={hideToggledNav}
              style={{ color: "var(--White)" }}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default ToggledNav;
