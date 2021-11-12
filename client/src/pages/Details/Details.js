import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Details.scss";
import { AppContext } from "../../components/context";
import noImage from "../../assets/images/no-image.png";
import UserScore from "../../components/UserScore/UserScore";
import CastList from "../../components/CastList/CastList";
import Similar from "../../components/Similar/Similar";
import Loading from "../../components/Loading";

function Details() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { state, Id, type } = useContext(AppContext);

  const getDetails = async () => {
    try {
      const result = await fetch(
        `https://api.themoviedb.org/3/${type}/${Id}?api_key=bef15a7f1783a7d9f49210d8b88ceea4&language=en-US`
      );
      const data = await result.json();
      setDetails(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      alert("could not load data");
    }
  };

  useEffect(() => {
    if (!state) {
      history.push("/login");
    } else {
      getDetails();
    }
  }, [Id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="details">
        <div
          style={{
            backgroundImage:
              "url(" +
              `https://image.tmdb.org/t/p/original/${details.backdrop_path}` +
              ")",
          }}
          className="details-main-container"
        >
          <div className="overflow"></div>
          <div className="details-main">
            <div className="details-main-left">
              <img
                src={
                  details.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                    : noImage
                }
                alt="poster"
              />
            </div>
            <div className="details-main-right">
              <h1>{type === "movie" ? details.title : details.name}</h1>
              <div className="other-details">
                <p
                  style={
                    type === "movie"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  First Air Date:{" "}
                  <span className="info">{details.first_air_date}</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  Last Air Date:{" "}
                  <span className="info">{details.last_air_date}</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Release Date:{" "}
                  <span className="info">{details.release_date}</span>
                </p>
                <p>
                  Genre:{" "}
                  <span className="info">
                    Action, Adventure, Fantasy, Science Fiction
                  </span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Runtime:{" "}
                  <span className="info">{details.runtime} minutes</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Budget: <span className="info">${details.budget}</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Revenue: <span className="info">${details.revenue}</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  Total Seasons:{" "}
                  <span className="info">{details.number_of_seasons}</span>
                </p>
                <p
                  style={
                    type === "movie"
                      ? { display: "none" }
                      : { display: "block" }
                  }
                >
                  Total Episodes:{" "}
                  <span className="info">{details.number_of_episodes}</span>
                </p>
                <p>
                  Status: <span className="info">{details.status}</span>
                </p>
                <p>
                  Tagline: <span className="info">{details.tagline}</span>
                </p>
              </div>
              <div className="score-and-rating">
                <UserScore score={details.vote_average * 10} />
                <h3>User Score</h3>
              </div>
              <div className="overview">
                <h2>Overview</h2>
                <p>{details.overview}</p>
              </div>
              <button className="official-site">
                <a target="_blank" rel="noreferrer" href={details.homepage}>
                  Visit Official Site
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="cast">
          <CastList />
        </div>
        <div className="similar-movies">
          <Similar />
        </div>
      </div>
    );
  }
}

export default Details;
