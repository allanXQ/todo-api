require("dotenv").config();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { messages } = require("../../config");
const {
  sendEmail,
  sendSuccess,
  sendServerError,
  sendBadRequest,
} = require("../../utils");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return sendBadRequest(res, messages.userNotFound);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  user.passwordResetToken = token;
  await user.save();

  const link = `${process.env.APP_URL}/api/v1/auth/reset-password/${token}`;

  try {
    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: `<h3>Password Reset</h3>
             <p>We have received a request to reset your password.</p>
             <p><a href="${link}">Reset Password</a></p>
             <p>This link expires in 15 minutes.</p>
             <p>If this wasn't you, contact the admin immediately.</p>`,
    });
    sendSuccess(res, null, messages.passwordResetEmailSent);
  } catch (e) {
    sendServerError(res, messages.requestFailed);
  }
};

module.exports = { forgotPassword };
