import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./Card.scss";
import { AppContext } from "../context";
import noImage from "../../assets/images/no-image.png";
import SmallButton from "../SmallButton/SmallButton";
import UserScore from "../UserScore/UserScore";

function Card({ id, image, title, userScore, releaseDate, type }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt");
  const { setId, setType } = useContext(AppContext);
  const history = useHistory();

  const viewDetails = () => {
    setId(id);
    setType(type);
    history.push("/details");
    window.scrollTo(0, 0);
  };

  const addToFavorite = async () => {
    try {
      await axios({
        method: "post",
        url: "https://moviesdb-react.herokuapp.com/favourites",
        headers: {
          Authorization: token,
        },
        data: {
          image,
          title,
          userScore,
          releaseDate,
          userId: user._id,
          id,
          type,
        },
      });
    } catch (err) {
      console.log("could not add to favorites");
    }
  };

  const addToWatchlist = async () => {
    try {
      await axios({
        method: "post",
        url: "https://moviesdb-react.herokuapp.com/watchlist",
        headers: {
          Authorization: token,
        },
        data: {
          image,
          title,
          userScore,
          releaseDate,
          userId: user._id,
          id,
          type,
        },
      });
    } catch (err) {
      console.log("could not add to watchlist");
    }
  };

  return (
    <div className="card">
      <div className="image" onClick={viewDetails}>
        <img
          src={image ? `https://image.tmdb.org/t/p/w500${image}` : noImage}
          alt="card"
        />
      </div>
      <div className="card-user-score">
        <UserScore score={Math.round(userScore * 10)} />
      </div>
      <div className="card-buttons">
        <div onClick={addToWatchlist} className="btn-watchlist">
          <SmallButton icon={<i className="fas fa-plus"></i>} />
        </div>
        <div onClick={addToFavorite} className="btn-favourite">
          <SmallButton icon={<i className="fas fa-heart"></i>} />
        </div>
      </div>
      <div className="title-and-date">
        <p className="bold">{title}</p>
        <p className="light">{releaseDate}</p>
      </div>
    </div>
  );
}

export default Card;
