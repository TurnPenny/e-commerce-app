const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//MIDDLEWARES
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;
const port = process.env.PORT;

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'name',
    image: 'url',
  };
  res.send(product);
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('database is ready');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port || 3000, () => {
  console.log(api);
  console.log('server is running');
});
