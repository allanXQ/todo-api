const router = require("express").Router();
const { formValidate } = require("../../middleware");
const {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
} = require("../../controllers/auth");
const {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../../yupschemas");
const { errorHOC } = require("../../utils");

router.post("/register", formValidate(regSchema), errorHOC(register));
router.post("/login", formValidate(loginSchema), errorHOC(login));
router.post(
  "/forgot-password",
  formValidate(forgotPasswordSchema),
  errorHOC(forgotPassword)
);
router.post(
  "/reset-password/:token",
  formValidate(resetPasswordSchema),
  errorHOC(resetPassword)
);
router.post("/logout", errorHOC(logout));

module.exports = router;
