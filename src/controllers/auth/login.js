require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { messages } = require("../../config");
const { setCookies, generateTokens } = require("../../utils");
const { sendBadRequest, sendSuccess } = require("../../utils");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return sendBadRequest(res, messages.invalidCredentials);
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    return sendBadRequest(res, messages.invalidCredentials);
  }
  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();
  setCookies(res, tokens);
  return sendSuccess(res, null, messages.loginSuccess);
};

module.exports = { login };
