import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../components/context";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading";

function MoviesList() {
  const { state } = useContext(AppContext);
  const [isSearching, setIsSearching] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const fetchMoviesList = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=bef15a7f1783a7d9f49210d8b88ceea4&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`
      );
      const data = await result.json();
      setMoviesList(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      alert("could not load data");
    }
  };
  const searchMovies = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US&query=${searchTerm}&page=${page}&include_adult=true`
      );
      const data = await result.json();
      setMoviesList(data);
    } catch (err) {
      console.log("Something bad happened while searching please try again");
    }
  };

  useEffect(() => {
    if (!state) {
      history.push("/login");
    } else {
      if (isSearching) {
        if (searchTerm === "") {
          fetchMoviesList();
        } else {
          searchMovies();
        }
      } else {
        fetchMoviesList();
      }
    }
  }, [page, searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="second-list">
        <div className="search">
          <input
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearching(true);
            }}
            type="text"
            placeholder="Search Movies..."
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="list">
          {moviesList.results.map((movie) => {
            return (
              <div key={movie.id}>
                <Card
                  id={movie.id}
                  image={movie.poster_path}
                  title={movie.title}
                  userScore={movie.vote_average}
                  releaseDate={movie.release_date}
                  type="movie"
                />
              </div>
            );
          })}
        </div>
        <div className="change-page">
          <div
            onClick={() => {
              if (page === 1) {
                setPage(1);
              } else {
                setPage(page - 1);
              }
              window.scrollTo(0, 0);
            }}
            className="prev"
          >
            <Button name="Previous" />
          </div>
          <div
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
            className="next"
          >
            <Button name="Next" />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesList;
