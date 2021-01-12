import React from "react";

function Zipcodes(props) {
  return (
    <div>
      <div className="result-header">
        <h2>{props.cityName}</h2>
      </div>
      <div className="result-box">
        <ul>{props.zipcodes}</ul>
      </div>
    </div>
  );
}

export default Zipcodes;
