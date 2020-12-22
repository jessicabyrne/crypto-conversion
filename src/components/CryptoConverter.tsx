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
  // const [exchangeRate, setExchangeRate] = useState<ExchangeRates>(number);
  const [conversionRateToUSD, setConversionRateToUSD] = useState<
    CryptoPriceInUSD
  >();
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async (userInput: string) => {
    const USDPrice = await fetchCryptoToUSD(userInput);
    console.log(USDPrice);

    // fetchExchangeRates().then((json: Cryptos) => {
    // setExchangeRate(json);
    // }

    setConversionRateToUSD(USDPrice);

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
          {conversionRateToUSD}
          {/* {cryptos &&
            conversionRateToUSD &&
            Object.entries(cryptos).map(([key, currencyRateToUSD], index) => (
              <li key={index}>
                {key}: {currencyRateToUSD * conversionRateToUSD}
              </li>
            ))} */}
        </ul>
      </div>
    </>
  );
}
