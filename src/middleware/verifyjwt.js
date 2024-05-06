const jwt = require("jsonwebtoken");
const { messages } = require("../config");
const { logger, sendUnauthorized } = require("../utils");

const verifyjwt = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      logger.log("error", messages.tokenRequired);
      return sendUnauthorized(res, messages.tokenRequired);
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: messages.invalidToken });
      }
      req.userId = user.userId;
      next();
    });
  } catch (error) {
    return res.status(403).json({ message: messages.serverError });
  }
};

module.exports = verifyjwt;
