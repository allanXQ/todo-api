const yup = require("yup");
const { messages } = require("../config");

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

const regSchema = yup.object().shape({
  email: yup
    .string(messages.invalidString)
    .email(messages.invalidEmail)
    .required(messages.emailRequired),
  password: yup
    .string(messages.invalidString)
    .matches(passwordRegexp, messages.passwordRegex)
    .required(messages.passwordRequired),
});

const loginSchema = yup.object().shape({
  email: yup
    .string(messages.invalidString)
    .email(messages.invalidEmail)
    .required(messages.emailRequired),
  password: yup
    .string(messages.invalidString)
    .required(messages.passwordRequired),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string(messages.invalidString)
    .email(messages.invalidEmail)
    .required(messages.emailRequired),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string(messages.invalidString)
    .matches(passwordRegexp, messages.passwordRegex)
    .required(messages.passwordRequired),
});

const titleSchema = yup
  .string(messages.invalidString)
  .trim()
  .required(messages.todoTitleRequired);
const descriptionSchema = yup.string(messages.invalidString).trim().nullable();

const addTodoSchema = yup.object().shape({
  title: titleSchema,
  description: descriptionSchema,
});

const updateTodoSchema = yup.object().shape({
  id: yup.number().integer().positive().required(messages.todoIdRequired),
  title: titleSchema.notRequired(),
  description: descriptionSchema.notRequired(),
});

const getTodosSchema = yup.object().shape({
  filter: yup.string(messages.invalidString).trim().nullable(),
  sort: yup
    .string(messages.invalidString)
    .oneOf(["createdAt", "title"], messages.invalidSortField)
    .default("createdAt"),
  order: yup
    .string(messages.invalidString)
    .oneOf(["ASC", "DESC"], messages.invalidSortOrder)
    .default("ASC"),
  page: yup.number().integer().positive().default(1),
  pageSize: yup.number().integer().positive().default(10),
});

const deleteTodoSchema = yup.object().shape({
  id: yup.number().integer().positive().required(messages.todoIdRequired),
});

module.exports = {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  addTodoSchema,
  updateTodoSchema,
  getTodosSchema,
  deleteTodoSchema,
};
