# crypto-convert

Calculates the latest quotes in a user submitted cryptocurrency code (e.g. BTC)

## Set up

First, make sure you get an API key from [CoinMarketCapAPI](https://coinmarketcap.com/api/)
Then in the root of the directory, create a new file called `.env` and add your API key in that file like so: `CMC_API_KEY=YOUR_API_KEY_GOES_HERE`

```shell
nvm use // set the local node version to 14.15.1
```

```shell
yarn // install dependencies
```

```shell
yarn dev // runs the server and front end concurrently
```

See the app at [http://localhost:3000/](http://localhost:3000/)

## Tests

```shell
yarn test
```

Output should look like this:

```shell
 PASS  src/common/APIUtils.test.tsx
 PASS  src/index.test.tsx
 PASS  src/App.test.tsx
 PASS  src/components/CryptoConverter.test.tsx
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |     100 |      100 |     100 |     100 |
 src                  |     100 |      100 |     100 |     100 |
  App.tsx             |     100 |      100 |     100 |     100 |
  index.tsx           |     100 |      100 |     100 |     100 |
 src/common           |     100 |      100 |     100 |     100 |
  APIUtils.ts         |     100 |      100 |     100 |     100 |
 src/components       |     100 |      100 |     100 |     100 |
  CryptoConverter.tsx |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       7 passed, 7 total

```
