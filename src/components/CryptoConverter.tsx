import React, { useState } from "react";
import { fetchCryptoToUSD, fetchExchangeRates } from "../common/APIUtils";
import "./CryptoConverter.css";

interface ExchangeRates {
  rates: Rate;
}

type Rate = {
  [key: string]: number;
};

export default function CryptoConverter(): React.ReactElement {
  const [exchangeRate, setExchangeRate] = useState<Rate>();
  const [conversionRateToUSD, setConversionRateToUSD] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    // get exchange rate of user inputted crypto to USD
    fetchCryptoToUSD(userInput)
      .then((USDPrice) => {
        setConversionRateToUSD(USDPrice);
      })
      .catch(() => setError(true));

    // get exchange rate of common currencies to USD
    fetchExchangeRates()
      .then((json: ExchangeRates) => {
        setExchangeRate(json.rates);
      })
      .catch(() => setError(true));
  };

  const exchangeRateDisplay = (exchangeRate: Rate) => {
    return Object.entries(exchangeRate).map(
      ([currencyType, currencyRateToUSD], index) => (
        <li key={index}>
          {currencyType}:{" "}
          {(currencyRateToUSD * conversionRateToUSD).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}
        </li>
      )
    );
  };

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
      {!error && conversionRateToUSD !== 0 ? (
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
