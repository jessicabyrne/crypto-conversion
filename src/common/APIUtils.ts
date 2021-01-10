import { Number, Record, Dictionary, Static } from 'runtypes';

const Rate = Dictionary(Number);
const ExchangeRates = Record({
  rates: Rate,
});

// eslint-disable-next-line
export type Rate = Static<typeof Rate>;
// eslint-disable-next-line
export type ExchangeRates = Static<typeof ExchangeRates>;

export const fetchExchangeRates = () => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,BRL,EUR,AUD`,
  )
    .then((response) => response.json())
    .then(ExchangeRates.check);
};

export const fetchCryptoToUSD = (
  userInput: string,
): Promise<number> => {
  return fetch(
    `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=${userInput}`,
  )
    .then((response) => response.json())
    .then((response) => {
      return response.price;
    });
};
