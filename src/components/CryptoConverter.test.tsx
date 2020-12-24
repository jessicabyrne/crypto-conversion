import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CryptoConverter from "./CryptoConverter";
import fetchMock from "fetch-mock";

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

const fakeUSDPrice = {
  price: 23426.29596373085,
};

describe("CryptoConverter", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it("Verifies if currency is retrieved on button click - success", async () => {
    fetchMock.mock(
      `https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,BRL,EUR,AUD`,
      {
        body: fakeRates,
        status: 200,
      }
    );

    fetchMock.mock(
      `http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=BTC`,
      {
        body: fakeUSDPrice,
        status: 200,
      }
    );

    // Render the App
    const { getByText, getByPlaceholderText } = render(<CryptoConverter />);

    const linkElement = getByPlaceholderText(/eg: BTC/i);
    const submitButton = getByText("Submit");

    fireEvent.click(linkElement);
    fireEvent.change(linkElement, {
      target: { value: "BTC" },
    });
    fireEvent.click(submitButton);

    // The above statement will result in an async action, so we need to wait a bit
    const currency = await waitFor(() => getByText(/GBP/));
    expect(currency).toBeInTheDocument();
  });
});
