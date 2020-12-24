# crypto-convert

Calculates the latest quotes in a user submitted cryptocurrency code (e.g. BTC)

## Set up

First, make sure you get an API key from [CoinMarketCapAPI](https://coinmarketcap.com/api/)
Then in the root of the directory, create a new file called `.env` and add your API key in that file like so: `CMC_API_KEY=YOUR_API_KEY_GOES_HERE`

```
nvm use // set the local node version to 14.15.1
```

```
yarn dev // runs the server and front end concurrently
```

## Tests

```
yarn test
```
