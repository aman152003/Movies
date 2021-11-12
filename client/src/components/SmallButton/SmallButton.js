import React from "react";

import "./SmallButton.scss";

function SmallButton({ icon }) {
  return (
    <div className="small-button">
      <button>{icon}</button>
    </div>
  );
}

export default SmallButton;
