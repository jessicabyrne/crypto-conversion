# crypto-convert

Calculates the latest quotes in a user submitted cryptocurrency code (e.g. BTC)

## Set up

First, make sure you get an API key from [CoinMarketCapAPI](https://coinmarketcap.com/api/)
Then in the root of the directory, create a new file called `.env` and add your API key in that file like so: `CMC_API_KEY=YOUR_API_KEY_GOES_HERE`

```shell
nvm use // set the local node version to 14.15.1
```

```shell
yarn dev // runs the server and front end concurrently
```

## Tests

```shell
yarn test
```

Output should look like this:

```shell
 PASS  src/common/APIUtils.test.tsx
 PASS  src/App.test.tsx
 PASS  src/components/CryptoConverter.test.tsx

Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        2.343 s, estimated 4 s
Ran all test suites.

Watch Usage: Press w to show more.
```
