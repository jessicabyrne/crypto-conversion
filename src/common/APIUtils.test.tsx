import fetch from "jest-fetch-mock";
import { fetchExchangeRates, fetchCryptoToUSD } from "./APIUtils";

const fakeRates = {
  rates: {
    USD: 1,
    EUR: 0.8219628473,
    AUD: 1.3248397172,
    BRL: 5.167433832,
    GBP: 0.7455203025,
  },
  base: "USD",
  date: "2020-12-23",
};

describe("fetchExchangeRates", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("finds exchange rate", async () => {
    fetch.mockResponseOnce(JSON.stringify(fakeRates));
    await fetchExchangeRates();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("returns null when exception", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    const rate = await fetchExchangeRates();

    expect(rate).toEqual(Error("API is down"));
    expect(fetch).toHaveBeenCalledWith(
      "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,BRL,EUR,AUD"
    );
  });
});

describe("fetchCryptoToUSD", () => {
  it("returns null when exception", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    const rate = await fetchCryptoToUSD("BTC");
    expect(rate).toEqual(Error("API is down"));
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=BTC"
    );
  });
});
