import Router from "express";
import { formValidate } from "../../middleware";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../../controllers/todos";
// import {
//   regSchema,
//   loginSchema,
//   forgotPasswordSchema,
//   resetPasswordSchema,
// } from "../../yupschemas";

import { errorHOC } from "../../utils";

const router = Router();

// routes
router.post("/add", errorHOC(addTodo));
router.get("/", errorHOC(getTodos));
router.post("/:id", errorHOC(updateTodo));
router.post("/:id", errorHOC(deleteTodo));

module.exports = router;
