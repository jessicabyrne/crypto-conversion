import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";


function App() {
  const [cryptos, setCryptos] = useState([]);

  const fetchData = async () => {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,BRL,EUR,AUD`
    )
      .then((response) => response.json())
      .then((json) => {
        setCryptos(json.rates);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label htmlFor="cryptoType">Enter a cryptocurrency type</label>
        <input id="cryptoType" placeholder="ex: BTC" onBlur={() => {}} />
        <h1>Cryptocurrency Exchange Rates</h1>
        <h2>Fetch a list from an API and display it</h2>

        {/* Fetch data from API */}
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
          </button>
          <br />
        </div>

        {/* Display data from API */}
        <div className="cryptos">
          <ul>
            {cryptos &&
              Object.keys(cryptos).map((crypto, index) => (
                <li key={index}>
                  {crypto} : {cryptos[crypto]}
                </li>
              ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
