import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CryptoConverter from './CryptoConverter';
import * as utils from '../common/APIUtils';
import fetch from 'jest-fetch-mock';

const fakeRates = {
  rates: {
    USD: 1,
    EUR: 0.8219628473,
    AUD: 1.3248397172,
    BRL: 5.167433832,
    GBP: 0.7455203025,
  },
  base: 'USD',
  date: '2020-12-23',
};

const fakeUSDPrice = 23426.29596373085;

let mockFetchCryptoToUSD = jest.spyOn(utils, 'fetchCryptoToUSD');
let mockFetchExchangeRates = jest.spyOn(utils, 'fetchExchangeRates');

describe('CryptoConverter', () => {
  beforeEach(() => {
    mockFetchCryptoToUSD = jest.spyOn(utils, 'fetchCryptoToUSD');
    mockFetchExchangeRates = jest.spyOn(utils, 'fetchExchangeRates');
  });
  afterEach(() => {
    fetch.resetMocks();
  });
  it('Verifies if currency is retrieved on button click - success', async () => {
    // Render the App
    mockFetchCryptoToUSD.mockImplementation(() =>
      Promise.resolve(fakeUSDPrice),
    );
    mockFetchExchangeRates.mockImplementation(() =>
      Promise.resolve(fakeRates),
    );

    const { getByText, getByPlaceholderText } = render(
      <CryptoConverter />,
    );

    const linkElement = getByPlaceholderText(/eg: BTC/i);
    const submitButton = getByText('Submit');

    fireEvent.click(linkElement);
    fireEvent.change(linkElement, {
      target: { value: 'BTC' },
    });
    fireEvent.click(submitButton);

    expect(mockFetchCryptoToUSD).toHaveBeenCalledWith('BTC');
    expect(mockFetchExchangeRates).toHaveBeenCalledTimes(1);
    // The above statement will result in an async action, so we need to wait a bit
    const currency = await waitFor(() => getByText(/GBP/));
    expect(currency).toBeInTheDocument();
  });

  it('Verifies if error is shown on button click - failure', async () => {
    mockFetchCryptoToUSD.mockImplementation(() =>
      Promise.reject('API is down'),
    );

    mockFetchExchangeRates.mockImplementation(() =>
      Promise.reject('API is down'),
    );
    // Render the App
    const { getByText, getByPlaceholderText } = render(
      <CryptoConverter />,
    );

    const linkElement = getByPlaceholderText(/eg: BTC/i);
    const submitButton = getByText('Submit');

    fireEvent.click(linkElement);
    fireEvent.change(linkElement, {
      target: { value: 'ETH' },
    });
    fireEvent.click(submitButton);

    expect(mockFetchCryptoToUSD).toHaveBeenCalledWith('ETH');
    expect(mockFetchExchangeRates).toHaveBeenCalledTimes(1);
    // The above statement will result in an async action, so we need to wait a bit
    const currency = await waitFor(() =>
      getByText(/No results found/),
    );
    expect(currency).toBeInTheDocument();
  });
});
