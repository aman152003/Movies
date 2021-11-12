import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../components/context";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading";

function ShowsList() {
  const { state } = useContext(AppContext);
  const [showsList, setShowsList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const fetchShowsList = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false`
      );
      const data = await result.json();
      setShowsList(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      alert("could not load data");
    }
  };

  const searchShows = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US&page=${page}&query=${searchTerm}&include_adult=false`
      );
      const data = await result.json();
      setShowsList(data);
    } catch (err) {
      console.log(
        "something bad happened while searching for shows, please try again"
      );
    }
  };

  useEffect(() => {
    if (!state) {
      history.push("/");
    } else {
      if (isSearching) {
        if (searchTerm === "") {
          fetchShowsList();
        } else {
          searchShows();
        }
      } else {
        fetchShowsList();
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
            placeholder="Search TV Shows..."
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="list">
          {showsList.results.map((show) => {
            return (
              <div key={show.id}>
                <Card
                  id={show.id}
                  image={show.poster_path}
                  title={show.name}
                  userScore={show.vote_average}
                  releaseDate={show.first_air_date}
                  type="tv"
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

export default ShowsList;
