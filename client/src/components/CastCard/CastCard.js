import React from "react";

import "./CastCard.scss";
import noImage from "../../assets/images/no-image.png";

function CastCard({ name, character, image }) {
  return (
    <div className="cast-card">
      <img
        src={image ? `https://image.tmdb.org/t/p/original${image}` : noImage}
        alt="cast"
      />
      <div className="cast-card-detail">
        <h4>{name}</h4>
        <p>{character}</p>
      </div>
    </div>
  );
}

export default CastCard;
