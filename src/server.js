require("module-alias/register");
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize, messages } = require("./config");
const { errorHandler, rateLimiter } = require("./middleware");
const { logger } = require("./utils");

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/todos", require("./routes/todo"));

app.use("*", (req, res) => {
  res.status(404).json({ message: messages.notFound });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
let server;

function startServer() {
  server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

async function gracefulShutdown(signal) {
  logger.info(`Received ${signal}, initiating graceful shutdown...`);

  server.close(() => {
    logger.info("Closed remaining connections.");
  });

  try {
    await sequelize.close();
    logger.info("Database connection closed.");

    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
}

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connection established successfully.");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    logger.info("Database synced.");
    startServer();
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});
