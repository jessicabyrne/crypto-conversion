import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { AxiosResponse, AxiosError } from 'axios';

// initialize configuration
dotenv.config();

const app: Application = express();

app.use(morgan('tiny')); // logging
app.use(cors({ credentials: true, origin: true }));

app.get('/v1/*', (req: Request, res: Response) => {
  // Possible improvement: parse url data
  const url = `https://pro-api.coinmarketcap.com${req.originalUrl}`;

  axios
    .get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then((response: AxiosResponse) => {
      const data = response['data'].data;
      const cryptoType = Object.keys(data)[0];
      const price = data[cryptoType].quote.USD.price;
      res.json({ price: price });
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return res
          .status(error.response.status)
          .send(error.response.statusText);
      }
      res.send(error.message);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ', port);
});
