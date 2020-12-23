import React, { useState } from "react";
import { fetchCryptoToUSD, fetchExchangeRates } from "../common/APIUtils";
import "./CryptoConverter.css";

interface ExchangeRates {
  rates: Rate;
}

type Rate = {
  [key: string]: number;
};

// Testing thoughts
/* 
start with states: empty state, filled state for input field
edge states: things exists, don't exist, fewer/more/etc. 
what happens if api response comes back null/empty
coverage tool! 
- if API comes back with different states - sending 500, 400, etc. 
- error states
*/

export default function CryptoConverter(): React.ReactElement {
  const [exchangeRate, setExchangeRate] = useState<Rate>();
  const [conversionRateToUSD, setConversionRateToUSD] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    // get exchange rate of common currencies to USD
    fetchCryptoToUSD(userInput)
      .then((USDPrice) => {
        USDPrice ? setConversionRateToUSD(USDPrice) : new Error("Whoops!");
      })
      .catch((err) => {
        setError(true);
      });

    fetchExchangeRates()
      .then((json: ExchangeRates) => {
        setExchangeRate(json.rates);
      })
      .catch(() => setError(true));
  };
  // get exchange rate of user inputted crypto to USD

  const exchangeRateDisplay = (exchangeRate: Rate) => {
    return Object.entries(exchangeRate).map(
      ([currencyType, currencyRateToUSD], index) => (
        <li key={index}>
          {currencyType}: {(currencyRateToUSD * conversionRateToUSD).toFixed(2)}
        </li>
      )
    );
  };

  // sanitize user input! * () >< html, sql injection!
  // enumerate user input to match a crypto type - or think about doing a drop down instead of user input
  console.log("hrkwehrwkejhr", error);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cryptoType">Cryptocurrency Exchange Rates</label>
        <input
          value={userInput}
          id="cryptoType"
          placeholder="eg: BTC"
          maxLength={5}
          pattern="[a-zA-Z]*"
          title="Please enter a valid cryptocurrency symbol"
          onChange={(event) => setUserInput(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      {/* Display data from API */}
      {!error ? (
        <div className="cryptos">
          <ul>
            {exchangeRate &&
              conversionRateToUSD &&
              exchangeRateDisplay(exchangeRate)}
          </ul>
        </div>
      ) : (
        <div> No results found :( </div>
      )}
    </>
  );
}
