export const fetchExchangeRates = () => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,BRL,EUR,AUD`
  )
    .then((response) => response.json())
    .catch((error) => new Error(error));
};

export const fetchCryptoToUSD = (userInput: string) => {
  return fetch(
    `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=${userInput}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response.price;
    })
    .catch((error) => new Error(error));
};
