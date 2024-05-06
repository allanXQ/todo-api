const Messages = {
  serverError: "An Error Occurred",
  badRequest: "Bad Request",
  forbidden: "Forbidden",
  notFound: "Not Found",
  urlNotFound: "URL Not Found",

  requestSuccessful: "Request successful",
  requestFailed: "Request failed! Try again",
  updateSuccess: "Update successful",
  updateFailed: "Update failed! Try again",
  deleteSuccess: "Delete successful",
  deleteFailed: "Delete failed! Try again",
  invalidString: "Invalid string",

  //auth
  invalidToken: "Invalid Access Token",
  tokenExpired: "Access Token Expired",
  tokenRequired: "Access Token is required",
  invalidEmail: "Invalid email",
  emailRequired: "Email is required",
  passwordRequired: "Password is required",
  invalidPassword: "Invalid password",
  passwordRegex:
    "Password must be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and can contain special characters",
  invalidCredentials: "Invalid credentials",
  userCreatedSuccessfully: "User created successfully",
  errorCreatingUser: "Error creating user! Try again",
  loginSuccess: "Login successful",
  loginFailed: "Login failed",
  logOutSuccess: "Logged out successfully",
  logOutFailed: "Logout failed",
  passwordResetSuccessful: "Password reset successful",
  passwordResetFailed: "Password reset failed. Try again",
  passwordResetEmailSent: "Psasword reset email sent",

  userNotFound: "User Not Found",
  userExists: "Credentials already in use",

  //todos
  createTodoSuccess: "Todo created successfully",
  createTodoFail: "Failed to create todo. Try Again!",
  getTodoSuccess: "Todos retrieved successfully",
  getTodoFail: "Failed to retrieve todos. Try Again!",
  todoNotFound: "Todo not found",
  todoUpdateSuccess: "Todo updated successfully",
  todoUpdateFail: "Failed to update todo. Try Again!",
  todoDeleteSuccess: "Todo deleted successfully",
  todoDeleteFail: "Failed to delete todo. Try Again!",
  todoIdRequired: "Todo ID is required",
  todoTitleRequired: "Todo title is required",
  invalidSortField: "Invalid sort field",
  invalidSortOrder: "Invalid sort order",

  rateLimit: "Too many requests from this IP, try again after 15 minutes",
};

module.exports = Messages;
