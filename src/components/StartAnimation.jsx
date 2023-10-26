import React from "react";
import start from "../assets/start.svg";
function StartAnimation() {
  return (
    <div className="start-animation">
      <div className="animation-content">
        <img src={start} alt="start" />
      </div>
    </div>
  );
}

export default StartAnimation;
