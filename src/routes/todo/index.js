const router = require("express").Router();
const { formValidate } = require("../../middleware");
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

router.post("/add", formValidate(addTodoSchema), errorHOC(addTodo));
router.get("/", formValidate(getTodosSchema), errorHOC(getTodos));
router.post("/update", formValidate(updateTodoSchema), errorHOC(updateTodo));
router.post("/delete", formValidate(deleteTodoSchema), errorHOC(deleteTodo));

module.exports = router;
