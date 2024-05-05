import Router from "express";
import { formValidate } from "../../middleware";
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../../controllers/todos";
import {
  addTodoSchema,
  updateTodoSchema,
  getTodosSchema,
  deleteTodoSchema,
} from "../../yupschemas";

import { errorHOC } from "../../utils";

const router = Router();

router.post("/add", formValidate(addTodoSchema), errorHOC(addTodo));
router.get("/", formValidate(getTodosSchema), errorHOC(getTodos));
router.post("/update", formValidate(updateTodoSchema), errorHOC(updateTodo));
router.post("/delete", formValidate(deleteTodoSchema), errorHOC(deleteTodo));

module.exports = router;
