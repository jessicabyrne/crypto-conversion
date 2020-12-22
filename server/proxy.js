const https = require("https")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: true }));

app.get("/v1/*", (req, res) => {
  let url = `https://pro-api.coinmarketcap.com${req.originalUrl}`;

  axios
    .get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      })
    })
    .then((response) => { 
      const data = response.data.data
      const cryptoType = Object.keys(data)[0]
      const price = data[cryptoType].quote.USD.price
      res.json({price: price});
    })
    .catch((err) => {
      console.log("error", err);
      res.send(err.response);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port ", port);
});
