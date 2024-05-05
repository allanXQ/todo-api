require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { messages } = require("../../config");
const { generateTokens, setCookies } = require("../../utils");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: messages.invalidRefreshToken });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return res.status(401).json({ message: messages.invalidRefreshToken });
  }

  const user = await User.findOne({ where: { refreshToken } });
  if (!user) {
    return res.status(401).json({ message: messages.invalidRefreshToken });
  }

  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();
  setCookies(res, tokens);

  return res.status(200).json({ message: messages.tokenRefreshed });
};

module.exports = { refreshToken };
