import React, { useState } from "react";
import "./CryptoConverter.css";

export default function CryptoConverter() {
  const [cryptos, setCryptos] = useState([]);
  const [currencyQuote, setCurrencyQuote] = useState({});
  const [userInput, setUserInput] = useState("");

  const fetchExchangeRates = async () => {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,BRL,EUR,AUD`
    )
      .then((response) => response.json())
      .then((json) => {
        setCryptos(json.rates);
      });
  };

  const fetchCryptoToUSD = async (userInput: string) => {
    const response = await fetch(
      `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=${userInput}`
    );
    console.log(response);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    setCurrencyQuote(body);
  };

  const handleSubmit = async (userInput: string) => {
    await fetchCryptoToUSD(userInput);
    await fetchExchangeRates();

    const conversionRateToUSD = currencyQuote?.data?.quote.USD.price;
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(userInput)}>
        <label htmlFor="cryptoType">Enter a cryptocurrency type</label>
        <input
          value={userInput}
          id="cryptoType"
          placeholder="ex: BTC"
          onChange={(event) => setUserInput(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      <h1>Cryptocurrency Exchange Rates</h1>
      <h2>Fetch a list from an API and display it</h2>

      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchExchangeRates}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="cryptos">
        <ul>
          {conversionRateToUSD &&
            Object.entries(cryptos).map(([key, currencyRateToUSD], index) => (
              <li key={index}>
                {key}: {currencyRateToUSD * conversionRateToUSD}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
