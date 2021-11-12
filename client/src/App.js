import React, { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MoviesList from "../src/pages/MoviesList/MoviesList";
import ShowsList from "./pages/ShowsList/ShowsList";
import Details from "./pages/Details/Details";
import Watchlist from "./pages/Watchlist/Watchlist";
import Favourites from "./pages/Favourites/Favourites";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ToggledNav from "./components/ToggledNav/ToggledNav";
import { AppContext } from "./components/context";

function App() {
  const { dispatch } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "USER", payload: user });
    history.push("/login");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app-container">
      <Navbar />
      <div className="app">
        <ToggledNav />
        <Switch>
          <Route path="/movies">
            <MoviesList />
          </Route>
          <Route path="/shows">
            <ShowsList />
          </Route>
          <Route path="/watchlist">
            <Watchlist />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
