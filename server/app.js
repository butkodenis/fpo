const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require('dotenv').config();



const { MONGO_URL, NODE_PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

  

app.use(morgan('tiny'));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from server' });
});



const port = NODE_PORT || 4001;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
