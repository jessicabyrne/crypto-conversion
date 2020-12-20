import React, { useEffect, useState } from "react";
import { fetchUSDExchangeRates } from "./fetchcrypto1";

export const ConvertCrypto = (query: string) => {
  return {};
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    async function fetchCryptoConversions() {
      try {
        setLoading(true);

        fetchUSDExchangeRates()
          .then((json) => {
            console.log(json);
            //setExchangeRates(json.rates);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));

        console.log(exchangeRates, crypto);
      } catch (error) {
        setLoading(false);
      }
      setResult([...exchangeRates, ...crypto]);
    }
    console.log(result);

    if (query !== "") {
      fetchCryptoConversions();
    }
  }, [query]);

  return [result, loading];
};
