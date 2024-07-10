require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const modelsRelative = require("./models");
const errorMiddleware = require("./middleware/error-middleware");
const router = require("./router");

const PORT = process.env.SERVER_PORT || 3001;
const URL = process.env.URL || "localhost";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: `http://${URL}:8888`,
  }),
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
