import React from "react";

import "./UserScore.scss";

function UserScore({ score }) {
  return (
    <div
      style={
        score >= 80
          ? { borderColor: "var(--Great-Green)" }
          : score < 80 && score >= 50
          ? { borderColor: "var(--Average-Yellow)" }
          : { borderColor: "var(--Poor-Red)" }
      }
      className="user-score"
    >
      <p className="bold">{score}</p>
    </div>
  );
}

export default UserScore;
