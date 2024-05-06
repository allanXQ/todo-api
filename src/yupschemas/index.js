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

const titleSchema = yup.string().trim().required(messages.todoTitleRequired);
const descriptionSchema = yup.string().trim().nullable();

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
  filter: yup.string().trim().nullable(),
  sort: yup
    .string()
    .oneOf(["createdAt", "title"], messages.invalidSortField)
    .default("createdAt"),
  order: yup
    .string()
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
