const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
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
app.use(express.json());

const port = NODE_PORT || 4001;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
