/* Example in Node.js ES6 using request-promise */
//Each HTTP request must contain the header Accept: application/json. 
//You should also send an Accept-Encoding: deflate, gzip header to receive data fast and efficiently.

// const apiKey = "e9f54e1c-6649-40ff-9fd7-97cc7cf05139";
const rp = require("request-promise");
const requestOptions = {
  method: "GET",
  uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
  qs: {
    start: "1",
    limit: "10",
    convert: "USD",
  },
  headers: {
    "X-CMC_PRO_API_KEY": "e9f54e1c-6649-40ff-9fd7-97cc7cf05139",
    "Accept": "application/json",
  },
  json: true,
  gzip: true,
};

rp(requestOptions)
  .then((response) => {
    console.log("API call response:", response);
  })
  .catch((err) => {
    console.log("API call error:", err.message);
  });
