import React, { useState } from "react";
import "./CryptoConverter.css";

export default function CryptoConverter() {
  const [cryptos, setCryptos] = useState<Object>({});
  const [conversionRateToUSD, setConversionRateToUSD] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");

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
    setConversionRateToUSD(body?.data?.quote?.USD?.price || 0);
  };

  const handleSubmit = async (userInput: string) => {
    await fetchCryptoToUSD(userInput);
    await fetchExchangeRates();

    console.log("cryptos", cryptos);
    console.log("conversionRateToUSD", conversionRateToUSD);
  };

  return (
    <>
      <form onSubmit={() => handleSubmit(userInput)}>
        <label htmlFor="cryptoType">Cryptocurrency Exchange Rates</label>
        <input
          value={userInput}
          id="cryptoType"
          placeholder="ex: BTC"
          onChange={(event) => setUserInput(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      {/* Display data from API */}
      <div className="cryptos">
        <ul>
          {cryptos &&
            conversionRateToUSD &&
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
