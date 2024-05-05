require("module-alias/register");
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { sequelize, messages } = require("@config");
const { errorHandler } = require("@middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/todos", require("./routes/todo"));
app.use("*", (req, res) => {
  res.status(404).json({ message: messages.notFound });
});

app.use(errorHandler);

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
