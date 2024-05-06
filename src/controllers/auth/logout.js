const { User } = require("../../models");
const { messages } = require("../../config");
const { clearTokens } = require("../../utils");
const { sendSuccess } = require("../../utils");

const logout = async (req, res) => {
  const userId = req.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    clearTokens(res);
    return sendSuccess(res, null, messages.logOutSuccess);
  }

  user.refreshToken = null;
  await user.save();

  clearTokens(res);
  return sendSuccess(res, null, messages.logOutSuccess);
};

module.exports = { logout };
