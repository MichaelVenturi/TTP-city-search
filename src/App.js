import React from "react";
import reactDOM from "react-dom";
import "./App.css";
import Zipcodes from "./components/Zipcodes";

function App() {
  const getResults = async (city) => {
    try {
      let response = await fetch(
        `http://ctp-zip-api.herokuapp.com/city/${city}`
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Invalid city");
      }
      let data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };
  // NOTE FOR SELF: since getResults is asynchronous, this function must be too, otherwise it will return before
  // getResults has finished (why async and await must be used here)
  const displayResults = async () => {
    const city = document.querySelector("#city-input").value.toUpperCase();

    const data = await getResults(city);
    //console.log("result", data[0]);
    if (!data) {
      alert("Invalid City");
      return;
    }

    const resultDiv = document.querySelector("#results");
    let zipcodes = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      zipcodes.push(<li>{data[i]}</li>);
    }
    const results = <Zipcodes cityName={city} zipcodes={zipcodes}></Zipcodes>;

    reactDOM.render(results, resultDiv);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>City search</h1>
      </div>
      <div className="app-body">
        <div className="submit-area">
          <label for="city-input">Name of city </label>
          <input type="text" id="city-input" name="city-input"></input>
        </div>
        <button onClick={displayResults}>Search</button>
        <div id="results"></div>
      </div>
    </div>
  );
}

export default App;
