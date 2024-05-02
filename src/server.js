require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/user");
const Todo = require("./models/todo");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Database synced");
    startServer();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
