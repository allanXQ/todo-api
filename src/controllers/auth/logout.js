const { User } = require("../../models"); // Updated to match typical Sequelize model import
const { messages } = require("../../config");
const { clearTokens } = require("../../utils");

const logout = async (req, res) => {
  const userId = req.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    clearTokens(res);
    return res.status(401).json({ message: messages.invalidToken });
  }

  user.refreshToken = null;
  await user.save();

  clearTokens(res);
  return res.status(200).json({ message: messages.logOutSuccess });
};

module.exports = { logout };
