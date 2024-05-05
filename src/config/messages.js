const Messages = {
  serverError: "An Error Occurred",
  badRequest: "Bad Request",
  forbidden: "Forbidden",
  notFound: "Not Found",

  requestSuccessful: "Request successful",
  requestFailed: "Request failed! Try again",
  updateSuccess: "Update successful",
  updateFailed: "Update failed! Try again",

  invalidToken: "Invalid Token",
  invalidRefreshToken: "Invalid Refresh Token",
  tokenRefreshed: "Token Refreshed",
  tokenRefreshFailed: "Token Refresh Failed",
  tokenExpired: "Token Expired",
  refreshTokenExpired: "Refresh Token Expired",

  invalidUsername: "Invalid username",
  invalidEmail: "Invalid email",
  invalidPassword: "Invalid password",
  incorrectPassword: "Incorrect password",
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
  todoDeleteSuccess: "Todo deleted successfully",
};

module.exports = Messages;
