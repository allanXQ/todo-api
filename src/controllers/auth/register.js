const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { messages } = require("../../config");
const { sendBadRequest, sendSuccess } = require("../../utils");

function generateApiKey() {
  return require("crypto").randomBytes(16).toString("hex");
}

const register = async (req, res) => {
  const { email, password: plainPassword } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return sendBadRequest(res, messages.userExists);
  }
  const password = await bcrypt.hash(plainPassword, 10);
  await User.create({
    email,
    password,
    apiKey: generateApiKey(),
    authMethod: "local",
  });
  return sendSuccess(res, null, messages.userCreatedSuccessfully);
};

module.exports = { register };
