require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { messages } = require("../../config");
const {
  sendBadRequest,
  sendUnauthorized,
  sendSuccess,
} = require("../../utils");

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token) {
    return sendBadRequest(res, messages.tokenRequired);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return sendUnauthorized(res, messages.invalidToken);
  }

  const user = await User.findOne({
    where: { id: decoded.id, passwordResetToken: token },
  });
  if (!user) {
    return sendBadRequest(res, messages.badRequest);
  }

  user.password = await bcrypt.hash(password, 10);
  user.passwordResetToken = "";
  await user.save();
  return sendSuccess(res, null, messages.passwordResetSuccessful);
};

module.exports = { resetPassword };
