const https = require("https");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

app.get("/*", (req, res) => {
  let url = `https://pro-api.coinmarketcap.com/v1${req.originalUrl}`;

  axios
    .get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        Accept: "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then((response) => {
      console.log("response", response);
      res.send(response.data);
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
