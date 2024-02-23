const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const { MONGO_URL, NODE_PORT } = process.env;
const port = NODE_PORT || 4001;

const userRoute = require('./Routes/userRoute');

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api', userRoute);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
