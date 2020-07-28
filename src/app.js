const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
require('dotenv/config');

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.USUARIO}:${process.env.SENHA}@cluster0-dje6c.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
