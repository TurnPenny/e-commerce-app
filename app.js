const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const api = process.env.API_URL;
const port = process.env.PORT;
//MIDDLEWARES
app.use(bodyParser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

const Product = mongoose.model('Products', productSchema);

app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }

  res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
  const { name, image, countInStock } = req.body;
  const product = new Product({
    name,
    image,
    countInStock,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
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
