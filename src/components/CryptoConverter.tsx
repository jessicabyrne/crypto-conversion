import React, { useState } from 'react';
import {
  fetchCryptoToUSD,
  fetchExchangeRates,
  Rate,
} from '../common/APIUtils';
import './CryptoConverter.css';

export default function CryptoConverter(): React.ReactElement {
  const [exchangeRate, setExchangeRate] = useState<Rate>();
  const [conversionRateToUSD, setConversionRateToUSD] = useState<
    number | undefined
  >(undefined);
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError(false);
    // get exchange rate of user inputted crypto to USD
    try {
      const [USDPrice, exchangeRates] = await Promise.all([
        fetchCryptoToUSD(userInput),
        fetchExchangeRates(),
      ]);
      setConversionRateToUSD(USDPrice);
      setExchangeRate(exchangeRates.rates);
    } catch (e) {
      setError(true);
    }
  };

  const exchangeRateDisplay = (exchangeRate: Rate) => {
    if (!conversionRateToUSD) return;
    return Object.entries(exchangeRate).map(
      ([currencyType, currencyRateToUSD], index) => (
        <li key={index}>
          {currencyType}:{' '}
          {(currencyRateToUSD * conversionRateToUSD).toLocaleString(
            'en-US',
            {
              maximumFractionDigits: 2,
            },
          )}
        </li>
      ),
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cryptoType">
          Cryptocurrency Exchange Rates
        </label>
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
