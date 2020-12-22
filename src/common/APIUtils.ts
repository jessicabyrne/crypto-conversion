export const fetchExchangeRates = async () => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,BRL,EUR,AUD`
  ).then((response) => response.json());
};

/*{
  "base": "EUR",
  "date": "2018-04-08",
  "rates": {
    "CAD": 1.565,
    "CHF": 1.1798,
    "GBP": 0.87295,
    "SEK": 10.2983,
    "EUR": 1.092,
    "USD": 1.2234,
    ...
  }
} */

export const fetchCryptoToUSD = async (userInput: string) => {
  const response = await fetch(
    `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=${userInput}`
  );
  const body = await response.json();
  console.log(JSON.stringify(body));
  return body?.price || null;
};

/*
{
"data": [
{
"id": 1,
"name": "Bitcoin",
"symbol": "BTC",
"date_added": "2013-04-28T00:00:00.000Z",
"tags": [
"mineable"
],
"platform": null,
"quote": {
"USD": {
"price": 9283.92,
}
*/
