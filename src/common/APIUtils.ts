export const fetchExchangeRates = () => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,BRL,EUR,AUD`
  ).then((response) => response.json());
};

export const fetchCryptoToUSD = (userInput: string) => {
  return fetch(
    `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=${userInput}`
  )
    .then((response) => response.json())
    .then((response) => {
      return response.price;
    });
};
