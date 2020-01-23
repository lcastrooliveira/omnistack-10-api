const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();

dotenv.config();
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASS;

mongoose.connect(
  `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0-nlq7r.mongodb.net/omnistack10?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Informar para e expresse interpretar requisicao JSON

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
