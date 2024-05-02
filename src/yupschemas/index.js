const yup = require("yup");
const { messages } = require("../config");

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

const regSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(passwordRegexp, messages.passwordRegex)
    .required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRegexp, messages.passwordRegex)
    .required(),
});

module.exports = {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
