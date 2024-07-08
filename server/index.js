require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const modelsRelative = require("./models");
const errorMiddleware = require("./middleware/error-middleware");
const router = require("./router");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URl + ":" + process.env.CLIENT_PORT,
  }),
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    console.log("start", {
      credentials: true,
      origin: process.env.CLIENT_URl + ":" + process.env.CLIENT_PORT,
    });
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
