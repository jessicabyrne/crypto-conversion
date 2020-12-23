import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CryptoConverter from "./CryptoConverter";
// Testing thoughts
/* 
start with states: empty state, filled state for input field
edge states: things exists, don't exist, fewer/more/etc. 
what happens if api response comes back null/empty
coverage tool! 
- if API comes back with different states - sending 500, 400, etc. 
- error states
*/
test("renders input field with placeholder text", () => {
  render(<CryptoConverter />);
  const linkElement = screen.getByPlaceholderText(/eg: BTC/i);
  expect(linkElement).toBeInTheDocument();
});

test("displays currencies when cryptocurrency is inputted", async () => {
  render(<CryptoConverter />);
  const linkElement = screen.getByPlaceholderText(/eg: BTC/i);
  const submitButton = screen.getByText("Submit");

  fireEvent.click(linkElement);
  fireEvent.change(linkElement, {
    target: { value: "bad" },
  });
  fireEvent.click(submitButton);

  await waitFor(() =>
    expect(screen.getByText(/No results found/i)).toBeInTheDocument()
  );
});
