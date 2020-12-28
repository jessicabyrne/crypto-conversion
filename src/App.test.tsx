import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders header", () => {
    render(<App />);
    const linkElement = screen.getByText(/Cryptocurrency Exchange Rates/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders input field with placeholder text", () => {
    render(<App />);
    const linkElement = screen.getByPlaceholderText(/eg: BTC/i);
    expect(linkElement).toBeInTheDocument();
  });
});
