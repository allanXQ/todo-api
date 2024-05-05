require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { messages } = require("../../config");

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  if (!token || !password) {
    return res.status(400).json({ message: messages.badRequest });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: messages.invalidToken });
  }

  const user = await User.findOne({
    where: { id: decoded.id, passwordResetToken: token },
  });
  if (!user) {
    return res.status(400).json({ message: messages.invalidToken });
  }

  user.password = await bcrypt.hash(password, 10);
  user.passwordResetToken = "";
  await user.save();

  return res.status(200).json({ message: messages.passwordResetSuccessful });
};

module.exports = { resetPassword };
