require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("@models");
const { messages } = require("@config");
const { setCookies, generateTokens } = require("@utils");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: messages.invalidCredentials });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return res.status(400).json({ message: messages.invalidCredentials });
  }
  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();
  setCookies(res, tokens);
  return res.status(200).json({
    message: messages.loginSuccess,
  });
};

module.exports = { login };
