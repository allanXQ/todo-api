import Router from "express";
import { formValidate } from "../../middleware";
import {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
  logout,
} from "../../controllers/auth";
import {
  regSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../yupschemas";

import { errorHOC } from "../../utils";

const router = Router();

// routes
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
router.post("/refresh-token", errorHOC(refreshToken));
router.post("/logout", errorHOC(logout));

module.exports = router;
