import React, { useState } from "react";
import { fetchCryptoToUSD, fetchExchangeRates } from "../common/APIUtils";
import "./CryptoConverter.css";

interface ExchangeRates {
  rates: {
    [key: string]: number;
  };
}
interface CryptoPriceInUSD {
  price: number;
}

export default function CryptoConverter() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRates>();
  const [conversionRateToUSD, setConversionRateToUSD] = useState<
    CryptoPriceInUSD
  >();
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async (userInput: string) => {
    const USDPrice = await fetchCryptoToUSD(userInput);

    fetchExchangeRates().then((json: ExchangeRates) => {
      setExchangeRate(json);
    });

    setConversionRateToUSD(USDPrice);
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
          {conversionRateToUSD}
          {/* {exchangeRate &&
            conversionRateToUSD &&
            Object.entries(exchangeRate).map(([key, currencyRateToUSD], index) => (
              <li key={index}>
                {key}: {currencyRateToUSD * conversionRateToUSD}
              </li>
            ))} */}
        </ul>
      </div>
    </>
  );
}
