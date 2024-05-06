const router = require("express").Router();
const { formValidate, verifyjwt } = require("../../middleware");
const {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../../controllers/todos");
const {
  addTodoSchema,
  updateTodoSchema,
  getTodosSchema,
  deleteTodoSchema,
} = require("../../yupschemas");

const { errorHOC } = require("../../utils");

router.post("/add", verifyjwt, formValidate(addTodoSchema), errorHOC(addTodo));
router.get("/", verifyjwt, formValidate(getTodosSchema), errorHOC(getTodos));
router.post(
  "/update",
  verifyjwt,
  formValidate(updateTodoSchema),
  errorHOC(updateTodo)
);
router.post(
  "/delete",
  verifyjwt,
  formValidate(deleteTodoSchema),
  errorHOC(deleteTodo)
);

module.exports = router;
