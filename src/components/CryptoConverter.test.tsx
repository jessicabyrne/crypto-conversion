import React from "react";
import { render, screen } from "@testing-library/react";
import CryptoConverter from "./CryptoConverter";

test("renders input field with placeholder text", () => {
  render(<CryptoConverter />);
  const linkElement = screen.getByPlaceholderText(/eg: BTC/i);
  expect(linkElement).toBeInTheDocument();
});
