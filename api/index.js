const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error:
      err.message || `There was some error while execting the server ${err}`,
  });
});

const listener = app.listen(
  process.env.API_PORT,
  process.env.API_HOST,
  async function () {
    console.log(
      `Server Started at ${listener.address().address}:${
        listener.address().port
      }`
    );
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`Db successfully connected`);
    } catch (error) {
      console.log(`There was some error while connecting to db ${error}`);
    }
  }
);
