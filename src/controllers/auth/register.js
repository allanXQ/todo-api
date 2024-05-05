const bcrypt = require("bcrypt");
const { User } = require("@models");
const { messages } = require("@config");

function generateApiKey() {
  return require("crypto").randomBytes(16).toString("hex");
}

const register = async (req, res) => {
  const { email, password: plainPassword } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: messages.userExists });
  }
  const password = await bcrypt.hash(plainPassword, 10);
  await User.create({
    email,
    password,
    apiKey: generateApiKey(),
    authMethod: "local",
  });
  return res.status(200).json({ message: messages.userCreatedSuccessfully });
};

module.exports = { register };
