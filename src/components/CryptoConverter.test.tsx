import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import CryptoConverter from "./CryptoConverter";
import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});
act(() => {
  describe("CryptoConverter", () => {
    describe("when clicking submit button", () => {
      it("shows currency types when fetch exchange rates is called", async () => {
        const { getByText, getByPlaceholderText } = render(<CryptoConverter />);
        const linkElement = getByPlaceholderText(/eg: BTC/i);
        const submitButton = getByText("Submit");

        fireEvent.click(linkElement);
        fireEvent.change(linkElement, {
          target: { value: "BTC" },
        });
        fireEvent.click(submitButton);
        expect(fetch).toHaveBeenCalledWith(
          "http://localhost:5000/v1/cryptocurrency/quotes/latest?symbol=BTC"
        );
      });
    });
  });
});
