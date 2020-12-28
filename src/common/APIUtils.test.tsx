import fetch from "jest-fetch-mock";
import { fetchExchangeRates, fetchCryptoToUSD } from "./APIUtils";

const fakeRates = {
  rates: {
    EUR: 0.8219628473,
    AUD: 1.3248397172,
    BRL: 5.167433832,
    GBP: 0.7455203025,
  },
  base: "USD",
  date: "2020-12-23",
};
const fakeUSDPrice = {
  price: 23426.29596373085,
};

describe("APIUtils", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe("fetchExchangeRates", () => {
    it("finds exchange rate", async () => {
      fetch.mockResponseOnce(JSON.stringify(fakeRates));
      await fetchExchangeRates();
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchCryptoToUSD", () => {
    it("finds fetches price per USD", async () => {
      fetch.mockResponseOnce(JSON.stringify(fakeUSDPrice));
      await fetchCryptoToUSD("BTC");
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
