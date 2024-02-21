const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from server' });
});

const port = process.env.NODE_PORT || 4000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
