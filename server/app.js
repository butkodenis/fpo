const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const { MONGO_URL, NODE_PORT } = process.env;
const port = NODE_PORT || 4001;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

app.use(morgan('tiny'));
app.use(
  cors({
    origin: ['http://192.168.0.16:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', require('./Routes/userRoute'));
app.use('/api', require('./Routes/studentRoute'));
app.use('/api', require('./Routes/courseRoute'));
app.use('/api', require('./Routes/contractRoute'));
app.use('/api', require('./Routes/studentsBalanceRoute'));
app.use('/api', require('./Routes/paymentRoute'));

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
