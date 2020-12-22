export const fetchUSDExchangeRates = async () => {
  await fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,BRL,EUR,AUD`
  ).then((response) => response.json());
};
